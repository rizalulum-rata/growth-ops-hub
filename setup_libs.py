"""
Growth Ops Hub — Library Setup
Jalankan sekali untuk download semua JS/CSS ke folder libs/
Tidak butuh pip install apapun — pakai Python bawaan.
"""

import urllib.request
import os
import sys

FILES = {
    "libs/mermaid.min.js": (
        "https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js",
        "Mermaid.js — flow & process diagrams"
    ),
    "libs/echarts.min.js": (
        "https://cdn.jsdelivr.net/npm/echarts@5/dist/echarts.min.js",
        "ECharts — charts, KPI visual, tree diagram"
    ),
    "libs/cytoscape.min.js": (
        "https://cdn.jsdelivr.net/npm/cytoscape@3/dist/cytoscape.min.js",
        "Cytoscape.js — GSheet dependency map, network graph"
    ),
    "libs/jquery.min.js": (
        "https://cdn.jsdelivr.net/npm/jquery@3/dist/jquery.min.js",
        "jQuery — diperlukan DataTables"
    ),
    "libs/datatables.min.js": (
        "https://cdn.datatables.net/1.13.7/js/jquery.dataTables.min.js",
        "DataTables — tabel interaktif (sort, filter, search)"
    ),
    "libs/datatables.min.css": (
        "https://cdn.datatables.net/1.13.7/css/jquery.dataTables.min.css",
        "DataTables CSS"
    ),
}

FOLDERS = ["libs", "assets/images"]


def setup():
    base = os.path.dirname(os.path.abspath(__file__))

    # Buat folder
    for folder in FOLDERS:
        path = os.path.join(base, folder)
        os.makedirs(path, exist_ok=True)
        print(f"✓ Folder siap: {folder}/")

    print()

    # Download files
    total = len(FILES)
    for i, (rel_path, (url, label)) in enumerate(FILES.items(), 1):
        dest = os.path.join(base, rel_path.replace("/", os.sep))
        print(f"[{i}/{total}] {label}")
        print(f"      → {rel_path}")
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
            with urllib.request.urlopen(req, timeout=30) as r:
                data = r.read()
            with open(dest, "wb") as f:
                f.write(data)
            size_kb = len(data) / 1024
            print(f"      ✓ {size_kb:.0f} KB\n")
        except Exception as e:
            print(f"      ✗ Gagal: {e}\n")

    print("=" * 50)
    print("Selesai. Struktur folder:")
    print()
    print("  growth-ops-hub/")
    print("  ├── index.html")
    print("  ├── data.js")
    print("  ├── setup_libs.py  (file ini)")
    print("  ├── assets/")
    print("  │   └── images/    ← taruh gambar/screenshot di sini")
    print("  └── libs/")
    for rel_path in FILES:
        fname = rel_path.split("/")[-1]
        print(f"      ├── {fname}")
    print()
    print("Selanjutnya: buka index.html di browser.")


if __name__ == "__main__":
    setup()
