"""
notion_to_blocks.py
─────────────────────────────────────────────────────────────────
Konversi file HTML export Notion → blocks siap paste ke data.js

CARA PAKAI:
  python notion_to_blocks.py "Nama File Notion.html"

OUTPUT:
  File .js dengan array blocks yang bisa langsung di-paste ke data.js

CONTOH:
  python notion_to_blocks.py "Panduan Daily Report Siang & Sore V2.html"
  → menghasilkan "Panduan Daily Report Siang & Sore V2_blocks.js"

Lalu di data.js, paste hasilnya:
  "SOP": {
    blocks: [
      ... (paste isi file _blocks.js di sini)
    ]
  }
─────────────────────────────────────────────────────────────────
"""

import sys
import os
import json
import re
from html.parser import HTMLParser


# ── HTML PARSER ──────────────────────────────────────────────────
class NotionParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.blocks     = []
        self.skip_tags  = {'style', 'script', 'head'}
        self.skip       = 0
        self.in_body    = False
        # state
        self.cur_tag    = None
        self.cur_text   = ''
        self.cur_attrs  = {}
        # table state
        self.in_table   = False
        self.table_rows = []
        self.cur_row    = []
        self.cur_cell   = ''
        self.is_th      = False
        self.headers    = []
        # list state
        self.in_list    = False
        self.list_items = []
        self.cur_li     = ''
        # callout/toggle
        self.in_callout = False
        self.callout_text = ''
        # properties block (skip first table = Notion metadata)
        self.prop_skipped = False
        self.prop_depth   = 0

    def handle_starttag(self, tag, attrs):
        attrs_d = dict(attrs)

        if tag in self.skip_tags:
            self.skip += 1; return
        if self.skip: return

        if tag == 'body':
            self.in_body = True; return

        if not self.in_body: return

        cls = attrs_d.get('class', '')

        # skip Notion property block (first collection-content table)
        if 'collection-content' in cls:
            self.prop_depth += 1; return
        if self.prop_depth > 0:
            if tag == 'table': self.prop_depth += 1
            return

        # callout
        if 'callout' in cls:
            self.in_callout = True; self.callout_text = ''; return

        # table
        if tag == 'table' and not self.in_callout:
            self.in_table = True; self.table_rows = []; self.headers = []; return
        if tag == 'tr': self.cur_row = []; self.is_th = False; return
        if tag == 'th': self.is_th = True; self.cur_cell = ''; return
        if tag == 'td': self.cur_cell = ''; return

        # list
        if tag in ('ul', 'ol') and not self.in_table:
            self.in_list = True; self.list_items = []; return
        if tag == 'li':
            self.cur_li = ''; return

        # heading / paragraph
        if tag in ('h1','h2','h3','h4','h5','p'):
            self.cur_tag = tag; self.cur_text = ''; return

    def handle_endtag(self, tag):
        if tag in self.skip_tags:
            self.skip -= 1; return
        if self.skip: return
        if not self.in_body: return

        if self.prop_depth > 0:
            if tag == 'table': self.prop_depth -= 1
            return

        # callout end
        if tag == 'div' and self.in_callout:
            txt = self.callout_text.strip()
            if txt:
                self.blocks.append({'type': 'alert', 'level': 'info', 'html': f'<p>{self._esc(txt)}</p>'})
            self.in_callout = False; return

        # table cells
        if tag == 'th':
            self.headers.append(self.cur_cell.strip()); return
        if tag == 'td':
            self.cur_row.append(self.cur_cell.strip()); return
        if tag == 'tr':
            if self.cur_row: self.table_rows.append(self.cur_row); return
        if tag == 'table':
            self._flush_table(); return

        # list item
        if tag == 'li':
            if self.cur_li.strip():
                self.list_items.append(self.cur_li.strip()); return
        if tag in ('ul', 'ol'):
            self._flush_list(); return

        # headings & paragraphs
        if tag in ('h1','h2','h3','h4','h5'):
            txt = self.cur_text.strip()
            if txt and not self._is_noise(txt):
                self.blocks.append({'type': 'heading', 'text': self._esc(txt)})
            self.cur_tag = None; return

        if tag == 'p':
            txt = self.cur_text.strip()
            if txt and not self._is_noise(txt):
                # merge consecutive text blocks
                if self.blocks and self.blocks[-1]['type'] == 'text':
                    self.blocks[-1]['html'] += f'<p>{self._esc(txt)}</p>'
                else:
                    self.blocks.append({'type': 'text', 'html': f'<p>{self._esc(txt)}</p>'})
            self.cur_tag = None; return

    def handle_data(self, data):
        if self.skip or not self.in_body: return
        if self.prop_depth > 0: return

        text = data  # keep whitespace for now

        if self.in_callout:
            self.callout_text += text; return
        if self.in_table:
            if self.is_th: self.headers[-1] = (self.headers[-1] if self.headers else '') + text.strip() if self.headers else None
            self.cur_cell += text.strip(); return
        if self.in_list:
            self.cur_li += text; return
        if self.cur_tag:
            self.cur_text += text; return

    def _flush_table(self):
        self.in_table = False
        rows = [r for r in self.table_rows if any(c.strip() for c in r)]
        if not rows: return

        # first row treated as headers if no explicit th
        if not self.headers and rows:
            self.headers = rows[0]
            rows = rows[1:]

        if not rows: return

        self.blocks.append({
            'type': 'table',
            'columns': [self._esc(h) for h in self.headers],
            'rows': [[self._esc(c) for c in r] for r in rows]
        })
        self.table_rows = []; self.headers = []

    def _flush_list(self):
        self.in_list = False
        items = [i for i in self.list_items if i.strip()]
        if not items: return

        # Check if it looks like a steps list (numbered / sequential)
        step_items = []
        is_steps = len(items) >= 3 and all(len(i) > 10 for i in items[:3])

        if is_steps:
            for item in items:
                parts = item.split('\n', 1)
                step_items.append({
                    'title': self._esc(parts[0].strip()),
                    'desc':  self._esc(parts[1].strip()) if len(parts) > 1 else ''
                })
            self.blocks.append({'type': 'steps', 'items': step_items})
        else:
            html = '<ul>' + ''.join(f'<li>{self._esc(i)}</li>' for i in items) + '</ul>'
            if self.blocks and self.blocks[-1]['type'] == 'text':
                self.blocks[-1]['html'] += html
            else:
                self.blocks.append({'type': 'text', 'html': html})
        self.list_items = []

    def _is_noise(self, txt):
        noise = {'daftar isi', 'table of contents', 'created by', 'last edited',
                 'assignee', 'doc type', 'doc status', 'versi:', 'original file'}
        return txt.lower().strip() in noise or len(txt.strip()) <= 1

    def _esc(self, s):
        return s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;').replace('"', '&quot;')


# ── BLOCKS → JS STRING ───────────────────────────────────────────
def blocks_to_js(blocks, indent=6):
    pad  = ' ' * indent
    pad2 = ' ' * (indent + 2)
    lines = ['[']

    for b in blocks:
        t = b['type']

        if t == 'heading':
            lines.append(f"{pad}{{ type: 'heading', text: {json.dumps(b['text'], ensure_ascii=False)} }},")

        elif t == 'text':
            lines.append(f"{pad}{{")
            lines.append(f"{pad2}type: 'text',")
            lines.append(f"{pad2}html: {json.dumps(b['html'], ensure_ascii=False)}")
            lines.append(f"{pad}}},")

        elif t == 'alert':
            lines.append(f"{pad}{{")
            lines.append(f"{pad2}type: 'alert', level: '{b['level']}',")
            lines.append(f"{pad2}html: {json.dumps(b['html'], ensure_ascii=False)}")
            lines.append(f"{pad}}},")

        elif t == 'table':
            cols = json.dumps(b['columns'], ensure_ascii=False)
            lines.append(f"{pad}{{")
            lines.append(f"{pad2}type: 'table',")
            lines.append(f"{pad2}columns: {cols},")
            lines.append(f"{pad2}rows: [")
            for row in b['rows']:
                lines.append(f"{pad2}  {json.dumps(row, ensure_ascii=False)},")
            lines.append(f"{pad2}]")
            lines.append(f"{pad}}},")

        elif t == 'steps':
            lines.append(f"{pad}{{")
            lines.append(f"{pad2}type: 'steps',")
            lines.append(f"{pad2}items: [")
            for item in b['items']:
                lines.append(f"{pad2}  {{ title: {json.dumps(item['title'], ensure_ascii=False)}, desc: {json.dumps(item['desc'], ensure_ascii=False)} }},")
            lines.append(f"{pad2}]")
            lines.append(f"{pad}}},")

    lines.append(' ' * (indent-2) + ']')
    return '\n'.join(lines)


# ── MAIN ─────────────────────────────────────────────────────────
def convert(input_path):
    if not os.path.exists(input_path):
        print(f"✗ File tidak ditemukan: {input_path}")
        sys.exit(1)

    with open(input_path, encoding='utf-8') as f:
        html = f.read()

    parser = NotionParser()
    parser.feed(html)
    blocks = parser.blocks

    # filter empty blocks
    blocks = [b for b in blocks if b]

    # output path
    base = os.path.splitext(input_path)[0]
    out_path = base + '_blocks.js'

    js_out = f"""// ─────────────────────────────────────────────────────────
// Hasil konversi dari: {os.path.basename(input_path)}
// Paste isi array di bawah ke dalam blocks: [...] di data.js
// ─────────────────────────────────────────────────────────

const BLOCKS = {blocks_to_js(blocks)};
"""
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(js_out)

    print(f"\n✓ Selesai — {len(blocks)} blocks ditemukan")
    print(f"  Output: {out_path}")
    print(f"\nCara pakai:")
    print(f"  1. Buka {os.path.basename(out_path)} di VS Code")
    print(f"  2. Copy isi array BLOCKS (dari [ sampai ])")
    print(f"  3. Paste ke data.js di section yang sesuai:")
    print(f'     "SOP": {{ blocks: [ ...paste di sini... ] }}')


if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Cara pakai: python notion_to_blocks.py \"NamaFile.html\"")
        print("\nContoh:")
        print("  python notion_to_blocks.py \"Panduan Daily Report Siang & Sore V2.html\"")
        sys.exit(0)
    convert(sys.argv[1])
