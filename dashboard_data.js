const DASHBOARD_BLOCKS = [{ type: 'text', html: `

<style>
/* ── Reset scoped ── */
.dg *{box-sizing:border-box}

/* ── Layout ── */
.dg-dbbar{display:flex;align-items:center;justify-content:space-between;padding:8px 14px;background:var(--b2);border:1px solid var(--sep);border-radius:8px;margin-bottom:14px}
.dg-dot{width:7px;height:7px;border-radius:50%;background:var(--t3);display:inline-block;margin-right:7px}

/* ── Brand Tabs ── */
.dg-tabs{display:flex;gap:6px;margin-bottom:16px;padding:0;flex-wrap:wrap}
.dg-tab{padding:7px 16px;border-radius:7px;border:1px solid var(--sep);background:transparent;color:var(--t3);font-size:11px;font-weight:700;letter-spacing:.04em;cursor:pointer;transition:all .15s}
.dg-tab:hover:not(.act){background:var(--b3);color:var(--t2)}
.dg-tab.act{color:#fff}

/* ── Section header ── */
.dg-sec{font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--t3);display:flex;align-items:center;gap:8px;margin:16px 0 10px}
.dg-sec::after{content:'';flex:1;height:1px;background:var(--sep)}
.dg-sub{font-size:11px;color:var(--t3);margin-top:-6px;margin-bottom:10px}

/* ── KPI Grid ── */
.dg-kgrid{display:grid;gap:8px;margin-bottom:14px}
.dg-k6{grid-template-columns:repeat(6,1fr)}
.dg-k4{grid-template-columns:repeat(4,1fr)}

.dg-kc{padding:13px 15px;background:var(--b2);border:1px solid var(--sep);border-radius:10px;border-left:3px solid var(--dg-brand,var(--act));box-shadow:0 1px 4px rgba(0,0,0,.12);transition:transform .15s}
.dg-kc:hover{transform:translateY(-2px)}
.dg-kc.ok{border-left-color:#22c55e}
.dg-kc.warn{border-left-color:#f59e0b}
.dg-kc.bad{border-left-color:#ef4444}
.dg-kl{font-size:10px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--t3);margin-bottom:4px}
.dg-kv{font-size:21px;font-weight:800;color:var(--t1);line-height:1.1}
.dg-ks{font-size:10px;color:var(--t3);margin-top:3px}
.dg-kbadge{display:inline-flex;align-items:center;gap:3px;font-size:10px;font-weight:700;padding:2px 7px;border-radius:20px;margin-top:5px}
.dg-kb-ok{background:rgba(34,197,94,.12);color:#22c55e}
.dg-kb-warn{background:rgba(245,158,11,.12);color:#f59e0b}
.dg-kb-bad{background:rgba(239,68,68,.12);color:#ef4444}

/* ── Pipeline ── */
.dg-pipe-wrap{margin-bottom:14px}
.dg-pipe{display:flex;align-items:stretch;border-radius:10px;overflow:hidden;border:1px solid var(--sep)}
.dg-ps{flex:1;padding:12px 10px;background:var(--b3);text-align:center;position:relative;transition:background .12s}
.dg-ps:hover{background:#3d5068}
.dg-ps:first-child{border-left:3px solid var(--dg-brand,var(--act))}
.dg-ps:last-child{border-right:3px solid var(--dg-brand,var(--act))}
.dg-ps + .dg-ps{border-left:1px solid var(--sep)}
.dg-pl{font-size:9px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:var(--t3);margin-bottom:2px}
.dg-pv{font-size:22px;font-weight:800;color:var(--t1);line-height:1}
.dg-pt{font-size:9px;color:var(--t3);margin-top:2px}
.dg-pb{display:inline-block;padding:2px 7px;border-radius:4px;font-size:9px;font-weight:800;margin-top:4px}
.dg-pb.g{background:rgba(34,197,94,.15);color:#22c55e}
.dg-pb.y{background:rgba(245,158,11,.15);color:#f59e0b}
.dg-pb.r{background:rgba(239,68,68,.15);color:#ef4444}
.dg-pa{display:flex;flex-direction:column;align-items:center;justify-content:center;min-width:44px;background:var(--b3);border-left:1px solid var(--sep)}
.dg-pa .ar{font-size:16px;color:var(--t3)}
.dg-pa .cv{font-size:10px;font-weight:800;color:var(--dg-brand,var(--act))}
.dg-pa .ct{font-size:9px;color:var(--t3)}

/* ── Charts 2-col ── */
.dg-chart-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px}
.dg-chart-box{background:var(--b2);border:1px solid var(--sep);border-radius:10px;padding:16px 18px;box-shadow:0 1px 4px rgba(0,0,0,.12)}
.dg-chart-h3{font-size:13px;font-weight:700;color:var(--t1);margin-bottom:2px}
.dg-chart-sub{font-size:11px;color:var(--t3);margin-bottom:12px}

/* ── Table ── */
.dg-tbl-wrap{background:var(--b2);border:1px solid var(--sep);border-radius:10px;overflow:hidden;margin-bottom:12px;box-shadow:0 1px 4px rgba(0,0,0,.1)}
.dg-t{width:100%;border-collapse:collapse}
.dg-t th{font-size:10px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;color:var(--t3);padding:8px 12px;border-bottom:2px solid var(--sep);text-align:left;background:var(--b3)}
.dg-t td{padding:7px 12px;border-bottom:1px solid var(--sep);font-size:12px;color:var(--t2)}
.dg-t tr:last-child td{border-bottom:none}
.dg-t tr:hover td{background:rgba(255,255,255,.025)}
.dg-badge{display:inline-block;padding:2px 7px;border-radius:4px;font-size:10px;font-weight:700}
.dg-badge.g{background:rgba(34,197,94,.15);color:#22c55e}
.dg-badge.y{background:rgba(245,158,11,.15);color:#f59e0b}
.dg-badge.r{background:rgba(239,68,68,.15);color:#ef4444}

/* ── Accordion drilldown ── */
.dg-acc{border:1px solid var(--sep);border-radius:10px;overflow:hidden;margin-bottom:8px}
.dg-acc summary{padding:12px 16px;cursor:pointer;display:flex;align-items:center;justify-content:space-between;background:var(--b2);font-size:12px;font-weight:600;color:var(--t1);list-style:none;user-select:none}
.dg-acc summary::-webkit-details-marker{display:none}
.dg-acc-arr{font-size:15px;color:var(--t3);transition:transform .2s;margin-left:auto;flex-shrink:0}
.dg-acc[open] .dg-acc-arr{transform:rotate(45deg)}
.dg-acc[open] summary{border-bottom:1px solid var(--sep)}
.dg-acc-body{background:var(--b2)}

/* ── Responsive ── */
@media(max-width:960px){.dg-k6,.dg-k4{grid-template-columns:repeat(3,1fr)};.dg-chart-grid{grid-template-columns:1fr}}
@media(max-width:600px){.dg-k6,.dg-k4{grid-template-columns:repeat(2,1fr)}}
</style>

<!-- ══ STATUS BAR ══════════════════════════════════════════════════ -->
<div class="dg-dbbar">
  <div style="display:flex;align-items:center;gap:6px">
    <span class="dg-dot"></span>
    <span style="font-size:11px;font-weight:600;color:var(--t2)">Sample Data</span>
    <span style="font-size:10px;color:var(--t3)">· Apr 2026 MTD · [GROWTH] NEW DASHBOARD.xlsx</span>
  </div>
  <a href="https://docs.google.com/spreadsheets/d/1R-o96TKNnfxSR75BgKWFYLfydrTvK4qbzvwd2gokzxE/edit#gid=2144181734"
     target="_blank" style="font-size:11px;font-weight:600;padding:4px 12px;border-radius:6px;border:1px solid var(--sep);color:var(--t3);text-decoration:none">📊 Sheets ↗</a>
</div>

<!-- ══ BRAND TABS ══════════════════════════════════════════════════ -->
<div class="dg-tabs" id="dg-tabs">
  <button class="dg-tab act" onclick="dgBrand(this,'all')" style="background:#7c3aed;border-color:#7c3aed">ALL BRAND</button>
  <button class="dg-tab" onclick="dgBrand(this,'rata')" style="border-color:#dc2626">🦷 RATA</button>
  <button class="dg-tab" onclick="dgBrand(this,'tanam')" style="border-color:#15803d">🔩 TANAM</button>
  <button class="dg-tab" onclick="dgBrand(this,'vinir')" style="border-color:#2563eb">💎 VINIR</button>
</div>

<!-- ══ INIT JS (img onload trick) ════════════════════════════════ -->
<img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" style="display:none"
  onload="var BC={all:'#7c3aed',rata:'#dc2626',tanam:'#15803d',vinir:'#2563eb'};
window.dgBrand=function(el,b){
  document.querySelectorAll('.dgp').forEach(function(p){p.style.display='none'});
  document.getElementById('dgp-'+b).style.display='';
  document.querySelectorAll('#dg-tabs .dg-tab').forEach(function(t){t.classList.remove('act');t.style.background='transparent';t.style.color=''});
  el.classList.add('act');el.style.background=BC[b];el.style.color='#fff';
  document.documentElement.style.setProperty('--dg-brand',BC[b]);
  document.documentElement.style.setProperty('--act',BC[b]);
};
document.documentElement.style.setProperty('--dg-brand','#7c3aed');
if(window.echarts){
  var LG=function(c,op){return{type:'linear',x:0,y:0,x2:0,y2:1,colorStops:[{offset:0,color:c.replace(')',','+op+')')},{offset:1,color:c.replace(')',',0.15)')}]}};
  var TCLR='rgba(74,222,128,0.75)',RCLR='rgba(248,113,113,0.8)',VCLR='rgba(96,165,250,0.8)';
  var grid_opt={backgroundColor:'transparent',animation:true,tooltip:{trigger:'axis',axisPointer:{type:'shadow'},backgroundColor:'var(--b3)',borderColor:'var(--sep)',textStyle:{color:'var(--t1)',fontSize:11}}};
  var xa_opt={type:'category',axisLine:{lineStyle:{color:'var(--sep)'}},axisTick:{show:false},axisLabel:{color:'#64748b',fontSize:10}};
  var ya_opt={type:'value',splitLine:{lineStyle:{color:'var(--sep)',type:'dashed'}},axisLabel:{color:'#64748b',fontSize:9}};

  // Funnel Volume
  var cf=document.getElementById('dg-cf');
  if(cf){var c1=echarts.init(cf);c1.setOption(Object.assign({},grid_opt,{
    legend:{data:['TANAM','RATA','VINIR'],bottom:0,textStyle:{fontSize:10,color:'#94a3b8'},itemWidth:10,itemHeight:10},
    grid:{left:'0%',right:'2%',bottom:'14%',top:'4%',containLabel:true},
    xAxis:Object.assign({},xa_opt,{data:['Chat','Prospect','Booking','Visit','Buy']}),
    yAxis:Object.assign({},ya_opt),
    series:[
      {name:'TANAM',type:'bar',barMaxWidth:24,itemStyle:{color:TCLR,borderRadius:[3,3,0,0]},emphasis:{itemStyle:{opacity:1}},data:[68858,768,1411,838,604]},
      {name:'RATA', type:'bar',barMaxWidth:24,itemStyle:{color:RCLR,borderRadius:[3,3,0,0]},data:[15500,3002,460,453,0]},
      {name:'VINIR',type:'bar',barMaxWidth:24,itemStyle:{color:VCLR,borderRadius:[3,3,0,0]},data:[6648,911,163,94,56]}
    ]
  }));window.addEventListener('resize',function(){c1.resize()})}

  // CR% Comparison
  var ccr=document.getElementById('dg-ccr');
  if(ccr){var c2=echarts.init(ccr);c2.setOption(Object.assign({},grid_opt,{
    legend:{data:['TANAM','RATA','VINIR'],bottom:0,textStyle:{fontSize:10,color:'#94a3b8'},itemWidth:10,itemHeight:10},
    grid:{left:'14%',right:'14%',bottom:'14%',top:'6%'},
    yAxis:Object.assign({},xa_opt,{data:['%V→B','%B→V','%C→P']}),
    xAxis:Object.assign({},ya_opt,{max:100,axisLabel:{color:'#64748b',fontSize:9,formatter:function(v){return v+'%'}}}),
    series:[
      {name:'TANAM',type:'bar',barMaxWidth:16,itemStyle:{color:TCLR,borderRadius:[0,3,3,0]},
       label:{show:true,position:'right',fontSize:9,color:'#94a3b8',formatter:function(p){return p.value+'%'}},data:[72.1,59.4,1.1]},
      {name:'RATA', type:'bar',barMaxWidth:16,itemStyle:{color:RCLR,borderRadius:[0,3,3,0]},
       label:{show:true,position:'right',fontSize:9,color:'#94a3b8',formatter:function(p){return p.value?p.value+'%':''}},data:[null,98.5,19.4]},
      {name:'VINIR',type:'bar',barMaxWidth:16,itemStyle:{color:VCLR,borderRadius:[0,3,3,0]},
       label:{show:true,position:'right',fontSize:9,color:'#94a3b8',formatter:function(p){return p.value+'%'}},data:[59.6,57.7,13.7]}
    ]
  }));window.addEventListener('resize',function(){c2.resize()})}

  // Revenue vs Target
  var crev=document.getElementById('dg-crev');
  if(crev){var c3=echarts.init(crev);c3.setOption(Object.assign({},grid_opt,{
    legend:{data:['Actual','Target'],bottom:0,textStyle:{fontSize:10,color:'#94a3b8'},itemWidth:10,itemHeight:10},
    grid:{left:'2%',right:'2%',bottom:'16%',top:'8%',containLabel:true},
    xAxis:Object.assign({},xa_opt,{data:['TANAM','RATA (12hr)','VINIR']}),
    yAxis:Object.assign({},ya_opt,{axisLabel:{color:'#64748b',fontSize:9,formatter:function(v){return v>=1e9?(v/1e9).toFixed(1)+'M':v>=1e6?(v/1e6).toFixed(0)+'jt':v}}}),
    series:[
      {name:'Actual',type:'bar',barMaxWidth:40,
       itemStyle:{color:{type:'linear',x:0,y:0,x2:0,y2:1,colorStops:[{offset:0,color:'rgba(74,222,128,0.9)'},{offset:1,color:'rgba(74,222,128,0.4)'}]},borderRadius:[5,5,0,0]},
       label:{show:true,position:'top',fontSize:9,color:'#94a3b8',formatter:function(p){return p.value?(p.value/1e9).toFixed(2)+'M':''}},
       data:[1829835000,2771000000,null]},
      {name:'Target',type:'bar',barMaxWidth:40,
       itemStyle:{color:'transparent',borderColor:'rgba(148,163,184,0.5)',borderWidth:2,borderRadius:[5,5,0,0]},
       label:{show:true,position:'top',fontSize:9,color:'#64748b',formatter:function(p){return p.value?(p.value/1e9).toFixed(2)+'M':''}},
       data:[1590000000,null,null]}
    ]
  }));window.addEventListener('resize',function(){c3.resize()})}

  // Budget & Cost/Chat
  var cbud=document.getElementById('dg-cbud');
  if(cbud){var c4=echarts.init(cbud);c4.setOption(Object.assign({},grid_opt,{
    legend:{data:['Budget','Cost/Chat'],bottom:0,textStyle:{fontSize:10,color:'#94a3b8'},itemWidth:10,itemHeight:10},
    grid:{left:'2%',right:'8%',bottom:'16%',top:'8%',containLabel:true},
    xAxis:Object.assign({},xa_opt,{data:['TANAM','RATA','VINIR']}),
    yAxis:[
      Object.assign({},ya_opt,{axisLabel:{color:'#64748b',fontSize:9,formatter:function(v){return (v/1e6).toFixed(0)+'jt'}}}),
      {type:'value',splitLine:{show:false},axisLabel:{color:'#64748b',fontSize:9,formatter:function(v){return 'Rp '+v.toLocaleString('id-ID')}}}
    ],
    series:[
      {name:'Budget',type:'bar',barMaxWidth:40,yAxisIndex:0,
       itemStyle:{color:{type:'linear',x:0,y:0,x2:0,y2:1,colorStops:[{offset:0,color:'rgba(148,163,184,0.7)'},{offset:1,color:'rgba(148,163,184,0.25)'}]},borderRadius:[5,5,0,0]},
       data:[1829835000,268600000,212600000]},
      {name:'Cost/Chat',type:'line',yAxisIndex:1,smooth:true,
       lineStyle:{color:'#fbbf24',width:2.5},
       itemStyle:{color:'#fbbf24'},symbol:'circle',symbolSize:8,
       areaStyle:{color:{type:'linear',x:0,y:0,x2:0,y2:1,colorStops:[{offset:0,color:'rgba(251,191,36,0.25)'},{offset:1,color:'rgba(251,191,36,0)'}]}},
       label:{show:true,position:'top',fontSize:9,color:'#fbbf24',formatter:function(p){return 'Rp '+p.value.toLocaleString('id-ID')}},
       data:[26574,17329,31979]}
    ]
  }));window.addEventListener('resize',function(){c4.resize()})}
}">

<!-- ══ ALL BRAND PANEL ════════════════════════════════════════════ -->
<div id="dgp-all" class="dgp">

  <div class="dg-sec">KPI Aggregate — Apr 2026 MTD</div>
  <div class="dg-kgrid dg-k6">
    <div class="dg-kc"><div class="dg-kl">Total Chat</div><div class="dg-kv">91.006</div><div class="dg-ks">T:68.858 · R:15.500 · V:6.648</div></div>
    <div class="dg-kc"><div class="dg-kl">Prospect</div><div class="dg-kv">4.681</div><div class="dg-ks">T:768 · R:3.002 · V:911</div></div>
    <div class="dg-kc"><div class="dg-kl">Booking</div><div class="dg-kv">2.034</div><div class="dg-ks">T:1.411 · R:460 · V:163</div></div>
    <div class="dg-kc"><div class="dg-kl">Visit</div><div class="dg-kv">1.385</div><div class="dg-ks">T:838 · R:453 · V:94</div></div>
    <div class="dg-kc warn"><div class="dg-kl">Buy</div><div class="dg-kv">660+</div><div class="dg-ks">T:604 · R:TBD · V:56</div></div>
    <div class="dg-kc"><div class="dg-kl">Cost / Chat</div><div class="dg-kv" style="font-size:15px">Rp 25.394</div><div class="dg-ks">Blended 3 brand</div></div>
  </div>

  <div class="dg-sec">Pipeline Conversion — All Brand MTD</div>
  <div class="dg-pipe-wrap"><div class="dg-pipe">
    <div class="dg-ps"><div class="dg-pl">Chat</div><div class="dg-pv">91.006</div><div class="dg-pt">Semua brand</div></div>
    <div class="dg-pa"><span class="ar" style="font-size:14px;color:var(--t3)">→</span><span class="cv dg-pb y">5,1%</span><span class="ct" style="font-size:9px;color:var(--t3)">C→P</span></div>
    <div class="dg-ps"><div class="dg-pl">Prospect</div><div class="dg-pv">4.681</div></div>
    <div class="dg-pa"><span class="ar" style="font-size:14px;color:var(--t3)">→</span><span class="dg-pb g">43,5%</span><span class="ct" style="font-size:9px;color:var(--t3)">P→B</span></div>
    <div class="dg-ps"><div class="dg-pl">Booking</div><div class="dg-pv">2.034</div></div>
    <div class="dg-pa"><span class="ar" style="font-size:14px;color:var(--t3)">→</span><span class="dg-pb g">68,1%</span><span class="ct" style="font-size:9px;color:var(--t3)">B→V</span></div>
    <div class="dg-ps"><div class="dg-pl">Visit</div><div class="dg-pv">1.385</div></div>
    <div class="dg-pa"><span class="ar" style="font-size:14px;color:var(--t3)">→</span><span class="dg-pb g">47,7%</span><span class="ct" style="font-size:9px;color:var(--t3)">V→B</span></div>
    <div class="dg-ps"><div class="dg-pl">Buy</div><div class="dg-pv">660+</div></div>
  </div></div>

  <div class="dg-sec">Charts</div>
  <div class="dg-chart-grid">
    <div class="dg-chart-box">
      <div class="dg-chart-h3">Funnel Volume per Brand</div>
      <div class="dg-chart-sub">Volume di tiap tahap pipeline, per brand</div>
      <div id="dg-cf" style="height:220px"></div>
    </div>
    <div class="dg-chart-box">
      <div class="dg-chart-h3">Conversion Rate Comparison</div>
      <div class="dg-chart-sub">% C→P, % B→V, % V→B antar brand</div>
      <div id="dg-ccr" style="height:220px"></div>
    </div>
  </div>
  <div class="dg-chart-grid">
    <div class="dg-chart-box">
      <div class="dg-chart-h3">Revenue Performance vs Target</div>
      <div class="dg-chart-sub">Aktual vs target bulan Apr 2026</div>
      <div id="dg-crev" style="height:220px"></div>
    </div>
    <div class="dg-chart-box">
      <div class="dg-chart-h3">Budget & Cost / Chat</div>
      <div class="dg-chart-sub">Spend ads vs efisiensi per chat</div>
      <div id="dg-cbud" style="height:220px"></div>
    </div>
  </div>

  <div class="dg-sec">Metrics per Brand — Snapshot</div>
  <div class="dg-tbl-wrap"><table class="dg-t">
    <thead><tr>
      <th>Metric</th>
      <th style="text-align:right;color:#15803d">🔩 TANAM</th>
      <th style="text-align:right;color:#dc2626">🦷 RATA</th>
      <th style="text-align:right;color:#2563eb">💎 VINIR</th>
    </tr></thead>
    <tbody>
      <tr><td style="color:var(--t3);font-size:10px">Periode</td><td style="text-align:right;font-size:10px;color:var(--t3)">1–26 Apr</td><td style="text-align:right;font-size:10px;color:var(--t3)">1–12 Apr</td><td style="text-align:right;font-size:10px;color:var(--t3)">1–29 Apr</td></tr>
      <tr><td>Budget Ads</td><td style="text-align:right;font-weight:700;color:var(--t1)">Rp 1,83M</td><td style="text-align:right;font-weight:700;color:var(--t1)">Rp 268,6jt</td><td style="text-align:right;font-weight:700;color:var(--t1)">Rp 212,6jt</td></tr>
      <tr><td>Chat</td><td style="text-align:right;font-weight:700;color:var(--t1)">68.858</td><td style="text-align:right;font-weight:700;color:var(--t1)">15.500</td><td style="text-align:right;font-weight:700;color:var(--t1)">6.648</td></tr>
      <tr><td>Cost / Chat</td><td style="text-align:right;font-weight:700;color:var(--t1)">Rp 26.574</td><td style="text-align:right"><span class="dg-badge g">Rp 17.329 ✓</span></td><td style="text-align:right"><span class="dg-badge r">Rp 31.979 ↑</span></td></tr>
      <tr><td>% C→P</td><td style="text-align:right;font-weight:700;color:var(--t1)">1,1%</td><td style="text-align:right"><span class="dg-badge g">19,4% ✓</span></td><td style="text-align:right;font-weight:700;color:var(--t1)">13,7%</td></tr>
      <tr><td>Prospect</td><td style="text-align:right;font-weight:700;color:var(--t1)">768</td><td style="text-align:right;font-weight:700;color:var(--t1)">3.002</td><td style="text-align:right;font-weight:700;color:var(--t1)">911</td></tr>
      <tr><td>Booking</td><td style="text-align:right;font-weight:700;color:var(--t1)">1.411</td><td style="text-align:right;font-weight:700;color:var(--t1)">460</td><td style="text-align:right;font-weight:700;color:var(--t1)">163</td></tr>
      <tr><td>% B→V</td><td style="text-align:right;font-weight:700;color:var(--t1)">59,4%</td><td style="text-align:right"><span class="dg-badge g">98,5% ✓</span></td><td style="text-align:right;font-weight:700;color:var(--t1)">57,7%</td></tr>
      <tr><td>Visit</td><td style="text-align:right;font-weight:700;color:var(--t1)">838</td><td style="text-align:right;font-weight:700;color:var(--t1)">453</td><td style="text-align:right;font-weight:700;color:var(--t1)">94</td></tr>
      <tr><td>% V→B</td><td style="text-align:right;font-weight:700;color:var(--t1)">72,1%</td><td style="text-align:right;font-size:11px;color:var(--t3)">in-process</td><td style="text-align:right;font-weight:700;color:var(--t1)">59,6%</td></tr>
      <tr><td>Buy</td>
        <td style="text-align:right"><span style="font-weight:700;color:var(--t1)">604</span> <span class="dg-badge r">−18% vs target</span></td>
        <td style="text-align:right;font-size:11px;color:var(--t3)">— TBD</td>
        <td style="text-align:right;font-weight:700;color:var(--t1)">56</td></tr>
      <tr><td>Basket Size</td><td style="text-align:right;font-weight:700;color:var(--t1)">Rp 26,5jt</td><td style="text-align:right;font-size:11px;color:var(--t3)">—</td><td style="text-align:right"><span class="dg-badge g">Rp 32,2jt ✓</span></td></tr>
      <tr><td style="font-weight:700;color:var(--t1)">Revenue</td>
        <td style="text-align:right"><div style="font-weight:700;color:#4ade80">Rp 1,83M</div><div style="font-size:9px;color:var(--t3)">+15% vs target</div></td>
        <td style="text-align:right"><div style="font-weight:700;color:var(--t1)">Rp 2,77M</div><div style="font-size:9px;color:var(--t3)">12 hari data</div></td>
        <td style="text-align:right;font-size:11px;color:var(--t3)">—</td></tr>
    </tbody>
  </table></div>


  <div class="dg-sec">Weekly Breakdown — All Brand <span style="font-size:9px;font-weight:400;color:var(--t3);margin-left:6px">Apr 2026 · Sample pending DB</span></div>
  <div class="dg-tbl-wrap"><table class="dg-t">
    <thead><tr>
      <th>Periode</th>
      <th style="text-align:right">Chat</th>
      <th style="text-align:right">Prospect</th>
      <th style="text-align:right">Booking</th>
      <th style="text-align:right">Visit</th>
      <th style="text-align:right">Buy</th>
      <th style="text-align:right">Revenue</th>
    </tr></thead>
    <tbody>
      <tr><td style="font-weight:700;color:var(--t1)">W1 · 1–7 Apr</td><td style="text-align:right">~24.100</td><td style="text-align:right">~1.210</td><td style="text-align:right">~520</td><td style="text-align:right">~350</td><td style="text-align:right">~165</td><td style="text-align:right;color:var(--t3)">—</td></tr>
      <tr><td style="font-weight:700;color:var(--t1)">W2 · 8–14 Apr</td><td style="text-align:right">~25.800</td><td style="text-align:right">~1.340</td><td style="text-align:right">~560</td><td style="text-align:right">~380</td><td style="text-align:right">~170</td><td style="text-align:right;color:var(--t3)">—</td></tr>
      <tr><td style="font-weight:700;color:var(--t1)">W3 · 15–21 Apr</td><td style="text-align:right">~23.500</td><td style="text-align:right">~1.100</td><td style="text-align:right">~500</td><td style="text-align:right">~340</td><td style="text-align:right">~175</td><td style="text-align:right;color:var(--t3)">—</td></tr>
      <tr><td style="font-weight:700;color:var(--t1)">W4 · 22–29 Apr</td><td style="text-align:right">~17.600</td><td style="text-align:right">~1.031</td><td style="text-align:right">~454</td><td style="text-align:right">~315</td><td style="text-align:right">~150</td><td style="text-align:right;color:var(--t3)">—</td></tr>
      <tr style="background:var(--b3)"><td style="font-weight:800;color:var(--t1)">MTD Total</td><td style="text-align:right;font-weight:800;color:var(--t1)">91.006</td><td style="text-align:right;font-weight:800;color:var(--t1)">4.681</td><td style="text-align:right;font-weight:800;color:var(--t1)">2.034</td><td style="text-align:right;font-weight:800;color:var(--t1)">1.385</td><td style="text-align:right;font-weight:800;color:var(--t1)">660+</td><td style="text-align:right;font-weight:800;color:#4ade80">Rp 4,6M+</td></tr>
    </tbody>
  </table></div>

</div><!-- end #dgp-all -->

<!-- ══ RATA PANEL ══════════════════════════════════════════════════ -->
<div id="dgp-rata" class="dgp" style="display:none">
  <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;padding:12px 16px;background:rgba(220,38,38,.06);border:1px solid rgba(220,38,38,.2);border-radius:10px;border-left:4px solid #dc2626">
    <span style="font-size:18px">🦷</span>
    <div><div style="font-size:14px;font-weight:800;color:#f87171">RATA</div><div style="font-size:11px;color:var(--t3)">1–12 Apr 2026 · Aligner</div></div>
  </div>

  <div class="dg-sec">KPI — RATA Apr 2026</div>
  <div class="dg-kgrid dg-k6">
    <div class="dg-kc ok" style="border-left-color:#dc2626"><div class="dg-kl">Revenue</div><div class="dg-kv" style="font-size:17px">Rp 2,77M</div><div class="dg-ks">12 hari data Apr</div><div class="dg-kbadge dg-kb-warn">📅 Partial</div></div>
    <div class="dg-kc" style="border-left-color:#dc2626"><div class="dg-kl">Chat</div><div class="dg-kv">15.500</div><div class="dg-ks">Budget Rp 268,6jt</div></div>
    <div class="dg-kc ok" style="border-left-color:#dc2626"><div class="dg-kl">Cost / Chat</div><div class="dg-kv" style="font-size:17px">Rp 17.329</div><div class="dg-ks">Terbaik antar brand</div><div class="dg-kbadge dg-kb-ok">✓ Best</div></div>
    <div class="dg-kc ok" style="border-left-color:#dc2626"><div class="dg-kl">% C→P</div><div class="dg-kv">19,4%</div><div class="dg-ks">Prospect 3.002</div><div class="dg-kbadge dg-kb-ok">✓ Best</div></div>
    <div class="dg-kc" style="border-left-color:#dc2626"><div class="dg-kl">Booking</div><div class="dg-kv">460</div><div class="dg-ks">Dari 3.002 prospect</div></div>
    <div class="dg-kc ok" style="border-left-color:#dc2626"><div class="dg-kl">% B→V</div><div class="dg-kv">98,5%</div><div class="dg-ks">Visit 453 / Booking 460</div><div class="dg-kbadge dg-kb-ok">✓ Best</div></div>
  </div>

  <div class="dg-sec">Pipeline — RATA</div>
  <div class="dg-pipe-wrap"><div class="dg-pipe" style="--dg-brand:#dc2626">
    <div class="dg-ps" style="border-left-color:#dc2626"><div class="dg-pl">Chat</div><div class="dg-pv">15.500</div><div class="dg-pt">Budget: Rp 268,6jt</div></div>
    <div class="dg-pa" style="--dg-brand:#dc2626"><span style="font-size:14px;color:var(--t3)">→</span><span class="dg-pb g">19,4%</span><span style="font-size:9px;color:var(--t3)">C→P</span></div>
    <div class="dg-ps"><div class="dg-pl">Prospect</div><div class="dg-pv">3.002</div></div>
    <div class="dg-pa" style="--dg-brand:#dc2626"><span style="font-size:14px;color:var(--t3)">→</span><span class="dg-pb y">15,3%</span><span style="font-size:9px;color:var(--t3)">P→B</span></div>
    <div class="dg-ps"><div class="dg-pl">Booking</div><div class="dg-pv">460</div></div>
    <div class="dg-pa" style="--dg-brand:#dc2626"><span style="font-size:14px;color:var(--t3)">→</span><span class="dg-pb g">98,5%</span><span style="font-size:9px;color:var(--t3)">B→V</span></div>
    <div class="dg-ps"><div class="dg-pl">Visit</div><div class="dg-pv">453</div></div>
    <div class="dg-pa" style="--dg-brand:#dc2626"><span style="font-size:14px;color:var(--t3)">→</span><span class="dg-pb y">—</span><span style="font-size:9px;color:var(--t3)">V→B</span></div>
    <div class="dg-ps" style="border-right-color:#dc2626"><div class="dg-pl">Buy</div><div class="dg-pv" style="font-size:16px">TBD</div><div class="dg-pt">In-process AE</div></div>
  </div></div>

  <div class="dg-sec">Weekly Breakdown — RATA <span style="font-size:9px;font-weight:400;color:var(--t3);margin-left:6px">1–12 Apr · partial month</span></div>
  <div class="dg-tbl-wrap"><table class="dg-t">
    <thead><tr>
      <th>Periode</th>
      <th style="text-align:right">Chat</th>
      <th style="text-align:right">Prospect</th>
      <th style="text-align:right">Booking</th>
      <th style="text-align:right">Visit</th>
      <th style="text-align:right">Revenue</th>
    </tr></thead>
    <tbody>
      <tr><td style="font-weight:700;color:var(--t1)">W1 · 1–7 Apr</td><td style="text-align:right">~9.000</td><td style="text-align:right">~1.740</td><td style="text-align:right">~265</td><td style="text-align:right">~262</td><td style="text-align:right;color:var(--t3)">—</td></tr>
      <tr><td style="font-weight:700;color:var(--t1)">W2 · 8–12 Apr</td><td style="text-align:right">~6.500</td><td style="text-align:right">~1.262</td><td style="text-align:right">~195</td><td style="text-align:right">~191</td><td style="text-align:right;color:var(--t3)">—</td></tr>
      <tr><td style="font-weight:400;color:var(--t3)">W3–W4</td><td style="text-align:right;color:var(--t3)" colspan="5">— Data tidak tersedia (hanya 12 hari)</td></tr>
      <tr style="background:var(--b3)"><td style="font-weight:800;color:var(--t1)">MTD (12 hr)</td><td style="text-align:right;font-weight:800;color:var(--t1)">15.500</td><td style="text-align:right;font-weight:800;color:var(--t1)">3.002</td><td style="text-align:right;font-weight:800;color:var(--t1)">460</td><td style="text-align:right;font-weight:800;color:var(--t1)">453</td><td style="text-align:right;font-weight:800;color:#4ade80">Rp 2,77M</td></tr>
    </tbody>
  </table></div>

  <details class="dg-acc">
    <summary><span>📋 Detail Metrics RATA <span style="font-weight:400;color:var(--t3);font-size:11px;margin-left:6px">· source sheet reference</span></span><span class="dg-acc-arr">＋</span></summary>
    <div class="dg-acc-body"><table class="dg-t">
      <thead><tr><th>Metric</th><th style="text-align:right">Actual</th><th>Sumber Sheet</th><th>Catatan</th></tr></thead>
      <tbody>
        <tr><td>Budget Ads</td><td style="text-align:right;font-weight:700;color:var(--t1)">Rp 268.600.000</td><td style="font-size:10px;color:var(--t3)">chat_budget_rata col H+</td><td style="font-size:10px;color:var(--t3)">Supermetrics</td></tr>
        <tr><td>Chat</td><td style="text-align:right;font-weight:700;color:var(--t1)">15.500</td><td style="font-size:10px;color:var(--t3)">chat_budget_rata col C</td><td style="font-size:10px;color:var(--t3)">—</td></tr>
        <tr><td>Cost / Chat</td><td style="text-align:right"><span class="dg-badge g">Rp 17.329</span></td><td style="font-size:10px;color:var(--t3)">Budget ÷ Chat · RATA row 7</td><td style="font-size:10px;color:#4ade80">Terbaik antar brand</td></tr>
        <tr><td>% C→P</td><td style="text-align:right"><span class="dg-badge g">19,4%</span></td><td style="font-size:10px;color:var(--t3)">RATA sheet row 9</td><td style="font-size:10px;color:#4ade80">Terbaik antar brand</td></tr>
        <tr><td>Prospect</td><td style="text-align:right;font-weight:700;color:var(--t1)">3.002</td><td style="font-size:10px;color:var(--t3)">raw_compile rata · RATA row 10</td><td style="font-size:10px;color:var(--t3)">—</td></tr>
        <tr><td>Booking</td><td style="text-align:right;font-weight:700;color:var(--t1)">460</td><td style="font-size:10px;color:var(--t3)">raw_sch_rata · RATA row 12</td><td style="font-size:10px;color:var(--t3)">—</td></tr>
        <tr><td>% B→V</td><td style="text-align:right"><span class="dg-badge g">98,5%</span></td><td style="font-size:10px;color:var(--t3)">RATA row 13</td><td style="font-size:10px;color:#4ade80">Terbaik antar brand</td></tr>
        <tr><td>Visit</td><td style="text-align:right;font-weight:700;color:var(--t1)">453</td><td style="font-size:10px;color:var(--t3)">raw_compile rata · RATA row 14</td><td style="font-size:10px;color:var(--t3)">—</td></tr>
        <tr><td>Buy</td><td style="text-align:right;color:var(--t3)">— (in-process)</td><td style="font-size:10px;color:var(--t3)">raw_compile col F = "upgrade"</td><td style="font-size:10px;color:#f59e0b">Dikonfirmasi AE</td></tr>
        <tr><td>Revenue</td><td style="text-align:right;font-weight:700;color:var(--t1)">Rp 2.771.000.000</td><td style="font-size:10px;color:var(--t3)">Planned Order col W · RATA row 6</td><td style="font-size:10px;color:var(--t3)">12 hari data</td></tr>
      </tbody>
    </table></div>
  </details>
</div><!-- end #dgp-rata -->

<!-- ══ TANAM PANEL ═════════════════════════════════════════════════ -->
<div id="dgp-tanam" class="dgp" style="display:none">
  <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;padding:12px 16px;background:rgba(21,128,61,.06);border:1px solid rgba(21,128,61,.2);border-radius:10px;border-left:4px solid #15803d">
    <span style="font-size:18px">🌿</span>
    <div><div style="font-size:14px;font-weight:800;color:#4ade80">TANAM</div><div style="font-size:11px;color:var(--t3)">1–26 Apr 2026 · Implant Gigi</div></div>
  </div>

  <div class="dg-sec">KPI — TANAM Apr 2026</div>
  <div class="dg-kgrid dg-k6">
    <div class="dg-kc ok" style="border-left-color:#15803d"><div class="dg-kl">Revenue</div><div class="dg-kv" style="font-size:17px">Rp 1,83M</div><div class="dg-ks">Target: Rp 1,59M</div><div class="dg-kbadge dg-kb-ok">▲ +15%</div></div>
    <div class="dg-kc" style="border-left-color:#15803d"><div class="dg-kl">Chat</div><div class="dg-kv">68.858</div><div class="dg-ks">Budget Rp 1,83M</div></div>
    <div class="dg-kc" style="border-left-color:#15803d"><div class="dg-kl">Cost / Chat</div><div class="dg-kv" style="font-size:17px">Rp 26.574</div><div class="dg-ks">Budget ÷ Chat</div></div>
    <div class="dg-kc warn" style="border-left-color:#15803d"><div class="dg-kl">% C→P</div><div class="dg-kv">1,1%</div><div class="dg-ks">Prospect 768</div><div class="dg-kbadge dg-kb-warn">↓ Terendah</div></div>
    <div class="dg-kc bad" style="border-left-color:#15803d"><div class="dg-kl">Buy</div><div class="dg-kv">604</div><div class="dg-ks">Target: 735</div><div class="dg-kbadge dg-kb-bad">▼ −18%</div></div>
    <div class="dg-kc ok" style="border-left-color:#15803d"><div class="dg-kl">% V→B</div><div class="dg-kv">72,1%</div><div class="dg-ks">Visit 838 → Buy 604</div><div class="dg-kbadge dg-kb-ok">✓ Strong</div></div>
  </div>

  <div class="dg-sec">Pipeline — TANAM</div>
  <div class="dg-pipe-wrap"><div class="dg-pipe" style="--dg-brand:#15803d">
    <div class="dg-ps" style="border-left-color:#15803d"><div class="dg-pl">Chat</div><div class="dg-pv">68.858</div><div class="dg-pt">Budget Rp 1,83M</div></div>
    <div class="dg-pa" style="--dg-brand:#15803d"><span style="font-size:14px;color:var(--t3)">→</span><span class="dg-pb r">1,1%</span><span style="font-size:9px;color:var(--t3)">C→P</span></div>
    <div class="dg-ps"><div class="dg-pl">Prospect</div><div class="dg-pv">768</div></div>
    <div class="dg-pa"><span style="font-size:14px;color:var(--t3)">→</span><span class="dg-pb g">↑ High</span><span style="font-size:9px;color:var(--t3)">P→B</span></div>
    <div class="dg-ps"><div class="dg-pl">Booking</div><div class="dg-pv">1.411</div></div>
    <div class="dg-pa"><span style="font-size:14px;color:var(--t3)">→</span><span class="dg-pb y">59,4%</span><span style="font-size:9px;color:var(--t3)">B→V</span></div>
    <div class="dg-ps"><div class="dg-pl">Visit</div><div class="dg-pv">838</div></div>
    <div class="dg-pa"><span style="font-size:14px;color:var(--t3)">→</span><span class="dg-pb g">72,1%</span><span style="font-size:9px;color:var(--t3)">V→B</span></div>
    <div class="dg-ps" style="border-right-color:#15803d"><div class="dg-pl">Buy</div><div class="dg-pv">604</div><div class="dg-pt">Target 735</div><span class="dg-pb r">−18%</span></div>
  </div></div>

  <div class="dg-sec">Weekly Breakdown — TANAM <span style="font-size:9px;font-weight:400;color:var(--t3);margin-left:6px">1–26 Apr · 4 minggu data</span></div>
  <div class="dg-tbl-wrap"><table class="dg-t">
    <thead><tr>
      <th>Periode</th>
      <th style="text-align:right">Chat</th>
      <th style="text-align:right">Booking</th>
      <th style="text-align:right">Visit</th>
      <th style="text-align:right">Buy</th>
      <th style="text-align:right">Revenue</th>
    </tr></thead>
    <tbody>
      <tr><td style="font-weight:700;color:var(--t1)">W1 · 1–7 Apr</td><td style="text-align:right">~18.600</td><td style="text-align:right">~380</td><td style="text-align:right">~225</td><td style="text-align:right">~163</td><td style="text-align:right">~Rp 494jt</td></tr>
      <tr><td style="font-weight:700;color:var(--t1)">W2 · 8–14 Apr</td><td style="text-align:right">~19.200</td><td style="text-align:right">~392</td><td style="text-align:right">~232</td><td style="text-align:right">~168</td><td style="text-align:right">~Rp 510jt</td></tr>
      <tr><td style="font-weight:700;color:var(--t1)">W3 · 15–21 Apr</td><td style="text-align:right">~17.800</td><td style="text-align:right">~362</td><td style="text-align:right">~215</td><td style="text-align:right">~155</td><td style="text-align:right">~Rp 472jt</td></tr>
      <tr><td style="font-weight:700;color:var(--t1)">W4 · 22–26 Apr</td><td style="text-align:right">~13.258</td><td style="text-align:right">~277</td><td style="text-align:right">~166</td><td style="text-align:right">~118</td><td style="text-align:right">~Rp 354jt</td></tr>
      <tr style="background:var(--b3)"><td style="font-weight:800;color:var(--t1)">MTD Total</td><td style="text-align:right;font-weight:800;color:var(--t1)">68.858</td><td style="text-align:right;font-weight:800;color:var(--t1)">1.411</td><td style="text-align:right;font-weight:800;color:var(--t1)">838</td><td style="text-align:right;font-weight:800;color:var(--t1)">604 <span class="dg-badge r">−18%</span></td><td style="text-align:right;font-weight:800;color:#4ade80">Rp 1,83M</td></tr>
    </tbody>
  </table></div>

  <details class="dg-acc">
    <summary><span>📋 Detail Metrics TANAM <span style="font-weight:400;color:var(--t3);font-size:11px;margin-left:6px">· 19 metrics + source reference</span></span><span class="dg-acc-arr">＋</span></summary>
    <div class="dg-acc-body"><table class="dg-t">
      <thead><tr><th>Metric</th><th style="text-align:right">Actual</th><th style="text-align:right">Target</th><th style="text-align:right">vs Target</th><th>Sumber Sheet</th></tr></thead>
      <tbody>
        <tr><td>Budget Ads</td><td style="text-align:right;font-weight:700;color:var(--t1)">Rp 1.829.835.000</td><td style="text-align:right;color:var(--t3)">—</td><td style="text-align:right;color:var(--t3)">—</td><td style="font-size:10px;color:var(--t3)">chat_budget_tanam col H+</td></tr>
        <tr><td>Chat</td><td style="text-align:right;font-weight:700;color:var(--t1)">68.858</td><td style="text-align:right;color:var(--t3)">—</td><td style="text-align:right;color:var(--t3)">—</td><td style="font-size:10px;color:var(--t3)">chat_budget_tanam col C</td></tr>
        <tr><td>Cost / Chat</td><td style="text-align:right;font-weight:700;color:var(--t1)">Rp 26.574</td><td style="text-align:right;color:var(--t3)">—</td><td style="text-align:right;color:var(--t3)">—</td><td style="font-size:10px;color:var(--t3)">Budget ÷ Chat · TANAM row 7</td></tr>
        <tr><td>% C→P</td><td style="text-align:right;font-weight:700;color:var(--t1)">1,1%</td><td style="text-align:right;color:var(--t3)">—</td><td style="text-align:right;color:var(--t3)">—</td><td style="font-size:10px;color:var(--t3)">TANAM sheet row 9</td></tr>
        <tr><td>Prospect</td><td style="text-align:right;font-weight:700;color:var(--t1)">768</td><td style="text-align:right;color:var(--t3)">—</td><td style="text-align:right;color:var(--t3)">—</td><td style="font-size:10px;color:var(--t3)">prospek_tanam · row 10</td></tr>
        <tr><td>Booking</td><td style="text-align:right;font-weight:700;color:var(--t1)">1.411</td><td style="text-align:right;color:var(--t3)">—</td><td style="text-align:right;color:var(--t3)">—</td><td style="font-size:10px;color:var(--t3)">sr_fb_tanam (Free Booking + DP) · row 12</td></tr>
        <tr><td>% B→V</td><td style="text-align:right;font-weight:700;color:var(--t1)">59,4%</td><td style="text-align:right;color:var(--t3)">—</td><td style="text-align:right;color:var(--t3)">—</td><td style="font-size:10px;color:var(--t3)">TANAM row 13</td></tr>
        <tr><td>Visit</td><td style="text-align:right;font-weight:700;color:var(--t1)">838</td><td style="text-align:right;color:var(--t3)">—</td><td style="text-align:right;color:var(--t3)">—</td><td style="font-size:10px;color:var(--t3)">raw_pasien hadir_tanam · row 14</td></tr>
        <tr><td>% V→B</td><td style="text-align:right;font-weight:700;color:var(--t1)">72,1%</td><td style="text-align:right;color:var(--t3)">—</td><td style="text-align:right;color:var(--t3)">—</td><td style="font-size:10px;color:var(--t3)">TANAM row 15</td></tr>
        <tr><td>Buy</td><td style="text-align:right;font-weight:700;color:var(--t1)">604</td><td style="text-align:right;color:var(--t3)">735</td><td style="text-align:right"><span class="dg-badge r">−18%</span></td><td style="font-size:10px;color:var(--t3)">raw_pasien col F ≠ "No Upgrade"</td></tr>
        <tr><td>Basket Size</td><td style="text-align:right;font-weight:700;color:var(--t1)">Rp 26.500.000</td><td style="text-align:right;color:var(--t3)">—</td><td style="text-align:right;color:var(--t3)">—</td><td style="font-size:10px;color:var(--t3)">TANAM row 18</td></tr>
        <tr><td>Revenue Perf.</td><td style="text-align:right"><span class="dg-badge g">Rp 1.829.835.000</span></td><td style="text-align:right;color:var(--t3)">Rp 1.590.000.000</td><td style="text-align:right"><span class="dg-badge g">+15%</span></td><td style="font-size:10px;color:var(--t3)">Planned Order col W · row 23</td></tr>
        <tr><td>% Lunas</td><td style="text-align:right;color:var(--t3)">—</td><td style="text-align:right;color:var(--t3)">—</td><td style="text-align:right;color:var(--t3)">—</td><td style="font-size:10px;color:var(--t3)">raw_pasien col G="LUNAS" / Buy · row 17</td></tr>
        <tr><td>Total Implant</td><td style="text-align:right;color:var(--t3)">—</td><td style="text-align:right;color:var(--t3)">—</td><td style="text-align:right;color:var(--t3)">—</td><td style="font-size:10px;color:var(--t3)">Planned Order col G (SUMIFS qty) · row 19</td></tr>
        <tr><td>Avg Price / Implant</td><td style="text-align:right;color:var(--t3)">—</td><td style="text-align:right;color:var(--t3)">—</td><td style="text-align:right;color:var(--t3)">—</td><td style="font-size:10px;color:var(--t3)">Planned Order col W / qty (excl ALL IN & OD) · row 20</td></tr>
        <tr><td>Total Rahang</td><td style="text-align:right;color:var(--t3)">—</td><td style="text-align:right;color:var(--t3)">—</td><td style="text-align:right;color:var(--t3)">—</td><td style="font-size:10px;color:var(--t3)">Planned Order col R (ALL IN + OD) · row 22</td></tr>
        <tr><td>Cash In TC</td><td style="text-align:right;color:var(--t3)">—</td><td style="text-align:right;color:var(--t3)">—</td><td style="text-align:right;color:var(--t3)">—</td><td style="font-size:10px;color:var(--t3)">raw_pasien col I (excl Tidak Indikasi) · row 25</td></tr>
        <tr><td>Cash In AE</td><td style="text-align:right;color:var(--t3)">—</td><td style="text-align:right;color:var(--t3)">—</td><td style="text-align:right;color:var(--t3)">—</td><td style="font-size:10px;color:var(--t3)">Existing Revenue (AE) → [AE] Shortcall · row 26</td></tr>
      </tbody>
    </table></div>
  </details>
</div><!-- end #dgp-tanam -->

<!-- ══ VINIR PANEL ═════════════════════════════════════════════════ -->
<div id="dgp-vinir" class="dgp" style="display:none">
  <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;padding:12px 16px;background:rgba(37,99,235,.06);border:1px solid rgba(37,99,235,.2);border-radius:10px;border-left:4px solid #2563eb">
    <span style="font-size:18px">💎</span>
    <div><div style="font-size:14px;font-weight:800;color:#60a5fa">VINIR</div><div style="font-size:11px;color:var(--t3)">1–29 Apr 2026 · Veneer</div></div>
  </div>

  <div class="dg-sec">KPI — VINIR Apr 2026</div>
  <div class="dg-kgrid dg-k6">
    <div class="dg-kc" style="border-left-color:#2563eb"><div class="dg-kl">Chat</div><div class="dg-kv">6.648</div><div class="dg-ks">Budget Rp 212,6jt</div></div>
    <div class="dg-kc bad" style="border-left-color:#2563eb"><div class="dg-kl">Cost / Chat</div><div class="dg-kv" style="font-size:17px">Rp 31.979</div><div class="dg-ks">Tertinggi antar brand</div><div class="dg-kbadge dg-kb-bad">↑ Tertinggi</div></div>
    <div class="dg-kc" style="border-left-color:#2563eb"><div class="dg-kl">% C→P</div><div class="dg-kv">13,7%</div><div class="dg-ks">Prospect 911</div></div>
    <div class="dg-kc" style="border-left-color:#2563eb"><div class="dg-kl">Booking → Visit</div><div class="dg-kv" style="font-size:17px">57,7%</div><div class="dg-ks">163 booking → 94 visit</div></div>
    <div class="dg-kc" style="border-left-color:#2563eb"><div class="dg-kl">Buy</div><div class="dg-kv">56</div><div class="dg-ks">Dari 94 visit · %V→B 59,6%</div></div>
    <div class="dg-kc ok" style="border-left-color:#2563eb"><div class="dg-kl">Basket Size</div><div class="dg-kv" style="font-size:17px">Rp 32,2jt</div><div class="dg-ks">Tertinggi antar brand</div><div class="dg-kbadge dg-kb-ok">✓ Best</div></div>
  </div>

  <div class="dg-sec">Pipeline — VINIR</div>
  <div class="dg-pipe-wrap"><div class="dg-pipe" style="--dg-brand:#2563eb">
    <div class="dg-ps" style="border-left-color:#2563eb"><div class="dg-pl">Chat</div><div class="dg-pv">6.648</div><div class="dg-pt">Budget Rp 212,6jt</div></div>
    <div class="dg-pa"><span style="font-size:14px;color:var(--t3)">→</span><span class="dg-pb y">13,7%</span><span style="font-size:9px;color:var(--t3)">C→P</span></div>
    <div class="dg-ps"><div class="dg-pl">Prospect</div><div class="dg-pv">911</div></div>
    <div class="dg-pa"><span style="font-size:14px;color:var(--t3)">→</span><span class="dg-pb y">17,9%</span><span style="font-size:9px;color:var(--t3)">P→B</span></div>
    <div class="dg-ps"><div class="dg-pl">Booking</div><div class="dg-pv">163</div></div>
    <div class="dg-pa"><span style="font-size:14px;color:var(--t3)">→</span><span class="dg-pb y">57,7%</span><span style="font-size:9px;color:var(--t3)">B→V</span></div>
    <div class="dg-ps"><div class="dg-pl">Visit</div><div class="dg-pv">94</div></div>
    <div class="dg-pa"><span style="font-size:14px;color:var(--t3)">→</span><span class="dg-pb g">59,6%</span><span style="font-size:9px;color:var(--t3)">V→B</span></div>
    <div class="dg-ps" style="border-right-color:#2563eb"><div class="dg-pl">Buy</div><div class="dg-pv">56</div><div class="dg-pt">Basket Rp 32,2jt</div></div>
  </div></div>

  <div class="dg-sec">Weekly Breakdown — VINIR <span style="font-size:9px;font-weight:400;color:var(--t3);margin-left:6px">1–29 Apr · penuh</span></div>
  <div class="dg-tbl-wrap"><table class="dg-t">
    <thead><tr>
      <th>Periode</th>
      <th style="text-align:right">Chat</th>
      <th style="text-align:right">Prospect</th>
      <th style="text-align:right">Booking</th>
      <th style="text-align:right">Visit</th>
      <th style="text-align:right">Buy</th>
    </tr></thead>
    <tbody>
      <tr><td style="font-weight:700;color:var(--t1)">W1 · 1–7 Apr</td><td style="text-align:right">~1.605</td><td style="text-align:right">~220</td><td style="text-align:right">~39</td><td style="text-align:right">~23</td><td style="text-align:right">~14</td></tr>
      <tr><td style="font-weight:700;color:var(--t1)">W2 · 8–14 Apr</td><td style="text-align:right">~1.907</td><td style="text-align:right">~261</td><td style="text-align:right">~46</td><td style="text-align:right">~27</td><td style="text-align:right">~16</td></tr>
      <tr><td style="font-weight:700;color:var(--t1)">W3 · 15–21 Apr</td><td style="text-align:right">~1.761</td><td style="text-align:right">~241</td><td style="text-align:right">~43</td><td style="text-align:right">~25</td><td style="text-align:right">~15</td></tr>
      <tr><td style="font-weight:700;color:var(--t1)">W4 · 22–29 Apr</td><td style="text-align:right">~1.375</td><td style="text-align:right">~189</td><td style="text-align:right">~35</td><td style="text-align:right">~19</td><td style="text-align:right">~11</td></tr>
      <tr style="background:var(--b3)"><td style="font-weight:800;color:var(--t1)">MTD Total</td><td style="text-align:right;font-weight:800;color:var(--t1)">6.648</td><td style="text-align:right;font-weight:800;color:var(--t1)">911</td><td style="text-align:right;font-weight:800;color:var(--t1)">163</td><td style="text-align:right;font-weight:800;color:var(--t1)">94</td><td style="text-align:right;font-weight:800;color:var(--t1)">56</td></tr>
    </tbody>
  </table></div>

  <details class="dg-acc">
    <summary><span>📋 Detail Metrics VINIR <span style="font-weight:400;color:var(--t3);font-size:11px;margin-left:6px">· source sheet reference</span></span><span class="dg-acc-arr">＋</span></summary>
    <div class="dg-acc-body"><table class="dg-t">
      <thead><tr><th>Metric</th><th style="text-align:right">Actual</th><th>Sumber Sheet</th><th>Catatan</th></tr></thead>
      <tbody>
        <tr><td>Budget Ads</td><td style="text-align:right;font-weight:700;color:var(--t1)">Rp 212.600.000</td><td style="font-size:10px;color:var(--t3)">chat_budget_vinir col H+</td><td style="font-size:10px;color:var(--t3)">Supermetrics</td></tr>
        <tr><td>Chat</td><td style="text-align:right;font-weight:700;color:var(--t1)">6.648</td><td style="font-size:10px;color:var(--t3)">chat_budget_vinir col C</td><td style="font-size:10px;color:var(--t3)">—</td></tr>
        <tr><td>Cost / Chat</td><td style="text-align:right"><span class="dg-badge r">Rp 31.979</span></td><td style="font-size:10px;color:var(--t3)">Budget ÷ Chat · VINIR row 7</td><td style="font-size:10px;color:#f87171">Tertinggi antar brand</td></tr>
        <tr><td>% C→P</td><td style="text-align:right;font-weight:700;color:var(--t1)">13,7%</td><td style="font-size:10px;color:var(--t3)">VINIR sheet row 9</td><td style="font-size:10px;color:var(--t3)">—</td></tr>
        <tr><td>Prospect</td><td style="text-align:right;font-weight:700;color:var(--t1)">911</td><td style="font-size:10px;color:var(--t3)">raw_pasien visit vinir · row 10</td><td style="font-size:10px;color:var(--t3)">—</td></tr>
        <tr><td>Booking</td><td style="text-align:right;font-weight:700;color:var(--t1)">163</td><td style="font-size:10px;color:var(--t3)">simply_vinir · VINIR row 12</td><td style="font-size:10px;color:var(--t3)">—</td></tr>
        <tr><td>% B→V</td><td style="text-align:right;font-weight:700;color:var(--t1)">57,7%</td><td style="font-size:10px;color:var(--t3)">VINIR row 13</td><td style="font-size:10px;color:var(--t3)">—</td></tr>
        <tr><td>Visit</td><td style="text-align:right;font-weight:700;color:var(--t1)">94</td><td style="font-size:10px;color:var(--t3)">raw_pasien visit vinir · row 14</td><td style="font-size:10px;color:var(--t3)">—</td></tr>
        <tr><td>% V→B</td><td style="text-align:right;font-weight:700;color:var(--t1)">59,6%</td><td style="font-size:10px;color:var(--t3)">VINIR row 15</td><td style="font-size:10px;color:var(--t3)">—</td></tr>
        <tr><td>Buy</td><td style="text-align:right;font-weight:700;color:var(--t1)">56</td><td style="font-size:10px;color:var(--t3)">raw_pasien col F = "Upgrade"</td><td style="font-size:10px;color:var(--t3)">—</td></tr>
        <tr><td>Basket Size</td><td style="text-align:right"><span class="dg-badge g">Rp 32.200.000</span></td><td style="font-size:10px;color:var(--t3)">VINIR row 18</td><td style="font-size:10px;color:#4ade80">Tertinggi antar brand</td></tr>
      </tbody>
    </table></div>
  </details>
</div><!-- end #dgp-vinir -->

`}];
