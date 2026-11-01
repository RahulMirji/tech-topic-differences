#!/usr/bin/env python3
"""Layout lint for scene.html. usage: python3 tools/lint.py [scene.html]   (exit 1 when something is wrong)
Checks every 0.2 s: items inside the 280u interior; name labels not below y=640u, not overlapping each other, not wider than 600u;
nothing drawn below the top-half line; yellow label width ~572u; items scheduled after DURATION; boxes never overlap in neutral state."""
import sys, os, glob
from playwright.sync_api import sync_playwright
f = sys.argv[1] if len(sys.argv) > 1 else 'scene.html'
def launch(p):
    for pat in ('/opt/pw-browsers/chromium-*/chrome-linux/chrome', '/opt/pw-browsers/chromium_headless_shell-*/chrome-linux/headless_shell'):
        g = glob.glob(pat)
        if g: return p.chromium.launch(executable_path=g[0])
    return p.chromium.launch()
JS = """() => { const out=[]; const D=window.DURATION;
 const R=e=>{const r=e.getBoundingClientRect();return {l:r.left/1.5,t:r.top/1.5,r:r.right/1.5,b:r.bottom/1.5}};
 for(let t=0;t<=D;t+=0.2){ window.seek(t);
  for(const it of ITEMS){ if(it.el.style.display==='none'||it.kind==='static'&&it.w>=286) continue; if(it.w>=286) continue;
    if(it.x<-1||it.y<-1||it.x+it.w>281||it.y+it.h>281) out.push({t:+t.toFixed(1),issue:'item outside the 280u interior',x:it.x,y:it.y,w:it.w,h:it.h}); }
  const vis=LABS.filter(l=>l.el.style.display!=='none').flatMap(l=>[l.el,l.alt].filter(e=>e&&e.style.display!=='none').map(e=>({e,side:l.side})));
  for(const v of vis){const r=R(v.e.firstChild||v.e); if(r.b>640.5) out.push({t:+t.toFixed(1),issue:'name label below y=640u',bottom:Math.round(r.b)}); if(r.r-r.l>600) out.push({t:+t.toFixed(1),issue:'name label wider than 600u'});}
  const Ls=vis.filter(v=>v.side==='L'&&+v.e.style.opacity>.5),Rs=vis.filter(v=>v.side==='R'&&+v.e.style.opacity>.5);
  for(const a of Ls)for(const b of Rs){const ra=R(a.e.firstChild||a.e),rb=R(b.e.firstChild||b.e);if(ra.l<rb.r&&rb.l<ra.r&&ra.t<rb.b&&rb.t<ra.b)out.push({t:+t.toFixed(1),issue:'left and right name labels overlap'})}
  for(const w of WTDS){ if(w.el.style.display!=='none'&&t>=w.at+.3){const r=R(w.el.firstChild); if(Math.abs((r.r-r.l)-572)>14) out.push({t:+t.toFixed(1),issue:'yellow label width != 572u',width:Math.round(r.r-r.l)}); if(r.b>640.5) out.push({t:+t.toFixed(1),issue:'yellow label below y=640u'});}}
  for(const id of ['boxL','boxR']){const r=R(document.getElementById(id)); if(r.b>640) out.push({t:+t.toFixed(1),issue:id+' below y=640u'})}
  const gl=GEO.L,gr=GEO.R; if(gl.w<300&&gr.w<300&&gl.x+gl.w>gr.x) out.push({t:+t.toFixed(1),issue:'neutral boxes overlap'});
 }
 if(typeof STACKS!=='undefined'){for(let t=0;t<=D;t+=0.2){for(const S of STACKS){S.E.forEach((e,i)=>{const r=rfRect(S,i,t,1e9);if(!r||t<e.at+.1)return;
   const itm=ITEMS.find(it=>it.parent===e.wrap);if(itm&&(t>=Math.min(itm.until==null?Infinity:itm.until,nextCut(itm.at))))return;
   if(r.x<-3||r.y<-3||r.x+e.w0*r.s>283||r.y+e.h0*r.s>283)out.push({t:+t.toFixed(1),issue:'stack item outside the 280u interior',x:Math.round(r.x),y:Math.round(r.y)})})}}}
 /* PACING: while a box is big, something must move at least every ~0.9 s (entrance, packet, spinner, meter, reflow...). Warning only (the older demos hold longer). */
 const iv=[];for(const it of ITEMS){const dur=it.dur||DUR[it.kind]||.3;iv.push([it.at,it.at+dur+.15]);for(const f of (it.fx||[])){
   if(f.t==='path')iv.push([f.pts[0][0],f.pts[f.pts.length-1][0]]);else if(['loop','spin','pulse','blink','bob'].includes(f.t)){const st=f.from==null?it.at:f.from,end=Math.min(f.until==null?Infinity:f.until,it.until==null?Infinity:it.until,nextCut(st));iv.push([st,end])}else if(f.t==='shake')iv.push([f.from,f.from+(f.dur||.4)])}}
 if(typeof STACKS!=='undefined')for(const S of STACKS)for(const e of S.E)iv.push([e.at-S.lead,e.at-S.lead+S.dur]);
 const warn=[];let run=0,start=0;for(let t=0;t<=D;t+=0.1){window.seek(t);const big=Math.max(GEO.L.w,GEO.R.w)>560;const nb=nextCut(t),alive=iv.some(v=>t>=v[0]&&t<=v[1]);
  const settling=KF.L.concat(KF.R).some(k=>t>=k.t0&&t<=k.t0+k.dur+.1);
  if(big&&!alive&&!settling){if(run===0)start=t;run+=.1}else{if(run>=1.0)warn.push({issue:'PACE: nothing moves for '+run.toFixed(1)+' s',from:+start.toFixed(1)});run=0}}
 for(const w of warn)out.push(Object.assign({warn:true},w));
 for(const it of ITEMS) if(it.at>=D) out.push({issue:'item scheduled after DURATION',at:it.at});
 for(const l of LABS) if(l.at>=D) out.push({issue:'label scheduled after DURATION',at:l.at});
 return out; }"""
with sync_playwright() as p:
    b = launch(p); pg = b.new_page(viewport={'width': 1080, 'height': 960}); pg.on('pageerror', lambda e: print('PAGE ERROR', e))
    pg.goto('file://' + os.path.abspath(f)); pg.evaluate('Promise.all([...document.fonts].map(f=>f.load()))'); out = pg.evaluate(JS); b.close()
hard=[o for o in out if not o.get('warn')]; seen = set(); n = 0
for o in out:
    k = (o['issue'], o.get('x'), o.get('y'), o.get('w'), o.get('at'))
    if k in seen: continue
    seen.add(k); n += 1; print('LINT', o)
print('lint:', ('OK, no layout problems' if not out else 'OK (layout), with pacing warnings') if not hard else f'{len([o for o in hard])} problem(s)'); sys.exit(1 if hard else 0)
