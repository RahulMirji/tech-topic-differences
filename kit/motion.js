/* ===== motion.js: extended motion for the topic library. ADDITIVE: the original kinds (pop, wipe, draw, fade, static) are untouched. =====
   1. more entrance kinds  : slide, grow, type, count, drop
   2. persistent fx (item.fx): path, loop, pulse, bob, shake, blink, spin, dim   (what keeps a box alive between entrances)
   3. REFLOW STACKS        : stack(side,{mode}) .add({at,w,h,html}) : every element enters when it is SPOKEN; the ones already there shrink and slide away
   4. helpers              : say, pkt, meter, countNum, typeText, thinking */
Object.assign(DUR,{slide:.4,grow:.45,count:.8,drop:.5});
const fmt=n=>Math.round(n).toLocaleString('en-US');
KINDS_EXT.slide=(el,p,o)=>{const d=o.dist||34,v={left:[-d,0],right:[d,0],up:[0,-d],down:[0,d]}[o.from||'down'],e=E.oc(p);el.style.opacity=cl(p/.35);el.style.transform=`translate(${(1-e)*v[0]}px,${(1-e)*v[1]}px)`;el.style.filter=`blur(${(1-e)*3}px)`};
KINDS_EXT.grow=(el,p,o)=>{const e=E.oc(p),x=(o.axis||'x')==='x';el.style.transformOrigin=o.origin||(x?'0% 50%':'50% 100%');el.style.transform=x?`scaleX(${e})`:`scaleY(${e})`;el.style.opacity=1};
KINDS_EXT.drop=(el,p,o)=>{const d=o.dist||46,e=E.ob(p,2.2);el.style.opacity=cl(p/.25);el.style.transform=`translateY(${-(1-e)*d}px)`};
KINDS_EXT.type=(el,p,o)=>{const t=el.querySelector('.ty');if(t){const n=Math.floor(p*o.text.length+1e-4);t.textContent=o.text.slice(0,n)+(p<1?'\u258D':'')}el.style.opacity=1};
KINDS_EXT.count=(el,p,o)=>{const t=el.querySelector('.cn');if(t)t.textContent=(o.pre||'')+fmt(lerp(o.from||0,o.to,E.oc(p)))+(o.suf||'');el.style.opacity=cl(p/.2)};
/* ---------- persistent fx ---------- */
applyFx=function(it,t){let dx=0,dy=0,sc=1,rot=0,op=1;
 for(const f of it.fx){
  if(f.t==='path'){const P=f.pts;if(t<P[0][0]){dx+=P[0][1];dy+=P[0][2];sc*=P[0][3]==null?1:P[0][3];rot+=P[0][4]||0}else{let i=0;while(i<P.length-1&&t>=P[i+1][0])i++;const a=P[i],b=P[Math.min(i+1,P.length-1)],k=b===a?0:E.io(cl((t-a[0])/(b[0]-a[0])));
   dx+=lerp(a[1],b[1],k);dy+=lerp(a[2],b[2],k);sc*=lerp(a[3]==null?1:a[3],b[3]==null?1:b[3],k);rot+=lerp(a[4]||0,b[4]||0,k)}}
  else if(f.t==='loop'){const end=f.until==null?nextCut(f.from):Math.min(f.until,nextCut(f.from));if(t<f.from||t>=end)op=0;else{const q=((t-f.from)/f.period)%1;dx+=f.dx*q;dy+=f.dy*q;op*=Math.min(q/.12,1)*Math.min((1-q)/.12,1)}}
  else if(f.t==='pulse'){if(t>=f.from)sc*=1+(f.amp||.08)*(.5-.5*Math.cos(2*Math.PI*(t-f.from)/(f.period||.8)))}
  else if(f.t==='bob'){dy+=(f.amp||3)*Math.sin(2*Math.PI*t/(f.period||2))}
  else if(f.t==='shake'){const p=(t-f.from)/(f.dur||.4);if(p>=0&&p<=1)dx+=(f.amp||6)*Math.sin(p*Math.PI*(f.n||6))*(1-p)}
  else if(f.t==='blink'){if(t>=f.from)op*=Math.floor((t-f.from)/((f.period||.6)/2))%2===0?1:.18}
  else if(f.t==='spin'){if(t>=f.from)rot+=360*(t-f.from)/(f.period||1.6)}
  else if(f.t==='dim'){op*=lerp(1,f.to==null?.25:f.to,pr(t,f.from,f.dur||.35))}
  else if(f.t==='hide'){if(t>=f.from)op=0}
 }
 const base=it.el.style.transform==='none'||!it.el.style.transform?'':it.el.style.transform+' ';
 it.el.style.transform=base+`translate(${dx}px,${dy}px) rotate(${rot}deg) scale(${sc})`;
 const o0=it.el.style.opacity===''?1:parseFloat(it.el.style.opacity);it.el.style.opacity=o0*op};
/* ---------- REFLOW STACKS ----------
   stack('L',{mode:'trail'|'cascade'|'grid', area:{x,y,w,h}, hist:.5, dur:.55}).add({at,w,h,html,kind,arrow})
   trail   : the newest element is big in the middle; everything before it shrinks into a row along the TOP (with small arrows)
   cascade : the newest element is big at the bottom; the earlier ones shrink and stack upward
   grid    : all elements share a grid that re-tiles (cells shrink) every time one more arrives
   An element is built at its natural size (w x h) and scaled by transform, so SVG and text shrink together. */
const STACKS=[];
function stack(side,o={}){const S={side,mode:o.mode||'trail',A:Object.assign({x:6,y:8,w:268,h:266},o.area||{}),hist:o.hist||.5,dur:o.dur||.55,lead:o.lead==null?.2:o.lead,gap:o.gap||12,arrows:o.arrows!==false,ac:o.arrowColor||'#1D6AE5',E:[]};STACKS.push(S);
 S.add=e=>{const wrap=document.createElement('div');wrap.style.cssText=`position:absolute;left:0;top:0;width:${e.w}px;height:${e.h}px;transform-origin:0 0`;$('in'+side).appendChild(wrap);
  add(side,Object.assign({kind:'pop'},e,{parent:wrap,x:0,y:0}));const ent={at:e.at,w0:e.w,h0:e.h,wrap,arrow:null};
  if(S.arrows&&S.E.length&&e.arrow!==false){const aw=document.createElement('div');aw.style.cssText='position:absolute;left:0;top:0;width:40px;height:24px;transform-origin:50% 50%;opacity:0';$('in'+side).appendChild(aw);
   add(side,{at:e.at-.2,kind:'draw',dir:'right',w:40,h:24,x:0,y:0,html:IC.arrow('right',S.ac),parent:aw,until:e.until});ent.arrow=aw}
  S.E.push(ent);return S};return S}
function rfLayout(S,k){const A=S.A,E=S.E,n=k+1,cur=E[k],g=S.gap;
 if(n===1){const s=Math.min(1,A.w/cur.w0,A.h/cur.h0);return[{x:A.x+(A.w-cur.w0*s)/2,y:A.y+(A.h-cur.h0*s)/2,s}]}
 if(S.mode==='grid'){const cols=n<=1?1:n<=4?2:3,rows=Math.ceil(n/cols),cw=(A.w-(cols-1)*g)/cols,ch=(A.h-(rows-1)*g)/rows,R=[];
  for(let i=0;i<n;i++){const e=E[i],s=Math.min(1,cw/e.w0,ch/e.h0),c=i%cols,r=Math.floor(i/cols),inRow=r===rows-1?n-(rows-1)*cols:cols,off=(cols-inRow)*(cw+g)/2;
   R.push({x:A.x+off+c*(cw+g)+(cw-e.w0*s)/2,y:A.y+r*(ch+g)+(ch-e.h0*s)/2,s})}return R}
 const H=E.slice(0,k),R=[];let sh=S.hist;
 if(S.mode==='trail'){const gH=()=>30*sh,tot=()=>H.reduce((a,e)=>a+e.w0*sh,0)+(H.length-1)*gH();while(tot()>A.w&&sh>.1)sh-=.01;
  const rowH=Math.max(...H.map(e=>e.h0*sh)),gv=26,availH=A.h-rowH-gv,sc=Math.min(1,A.w/cur.w0,availH/cur.h0);let x=A.x+(A.w-tot())/2;
  for(const e of H){R.push({x,y:A.y+(rowH-e.h0*sh)/2,s:sh});x+=e.w0*sh+gH()}
  R.push({x:A.x+(A.w-cur.w0*sc)/2,y:A.y+rowH+gv+(availH-cur.h0*sc)/2,s:sc});return R}
 /* cascade */
 const gv=()=>22+14*sh,hh=()=>H.reduce((a,e)=>a+e.h0*sh,0)+H.length*gv();let sc;
 for(;;){sc=Math.min(1,A.w/cur.w0,(A.h-hh())/cur.h0);if(sc>=.55||sh<=.2)break;sh-=.02}
 let y=A.y;for(const e of H){R.push({x:A.x+(A.w-e.w0*sh)/2,y,s:sh});y+=e.h0*sh+gv()}
 R.push({x:A.x+(A.w-cur.w0*sc)/2,y:A.y+A.h-cur.h0*sc,s:sc});return R}
function rfK(S,t,kmax){let k=-1;for(let j=0;j<=Math.min(kmax,S.E.length-1);j++)if(S.E[j].at-S.lead<=t)k=j;return k}
function rfRect(S,i,t,kmax){const k=rfK(S,t,kmax);if(k<0||i>k)return null;
 const L=rfLayout(S,k)[i];if(k===0||i===k)return L;const t0=S.E[k].at-S.lead,from=rfRect(S,i,t0,k-1),p=E.io(pr(t,t0,S.dur));
 return{x:lerp(from.x,L.x,p),y:lerp(from.y,L.y,p),s:lerp(from.s,L.s,p)}}
applyReflow=function(t){for(const S of STACKS){const R=S.E.map((e,i)=>rfRect(S,i,t,1e9)),k=rfK(S,t,1e9),pk=k>=0?E.io(pr(t,S.E[k].at-S.lead,S.dur)):1;
 S.E.forEach((e,i)=>{const r=R[i];if(r)e.wrap.style.transform=`translate(${r.x}px,${r.y}px) scale(${r.s})`;
  if(!e.arrow)return;const a=R[i-1],b=r;if(!a||!b){e.arrow.style.opacity=0;return}
  const pe=S.E[i-1],ca=[a.x+pe.w0*a.s/2,a.y+pe.h0*a.s/2],cb=[b.x+e.w0*b.s/2,b.y+e.h0*b.s/2],dx=cb[0]-ca[0],dy=cb[1]-ca[1],d=Math.hypot(dx,dy)||1,ux=dx/d,uy=dy/d,
   ext=(r_,w_,h_)=>Math.abs(ux)*w_*r_.s/2+Math.abs(uy)*h_*r_.s/2,e1=ext(a,pe.w0,pe.h0),e2=ext(b,e.w0,e.h0),L=d-e1-e2-8;
  const chain={L,mx:ca[0]+ux*(e1+4+L/2),my:ca[1]+uy*(e1+4+L/2),ang:Math.atan2(dy,dx)*180/Math.PI};
  let X=chain;
  if(S.mode==='trail'&&i<=k+0&&(i===k||i===k-1)){   // into the newest element: straight DOWN from the shrunk row, blending into the row's chain arrows when it is demoted
   let rb=-1e9;for(let j=0;j<i;j++)rb=Math.max(rb,R[j].y+S.E[j].h0*R[j].s);const cx=S.A.x+S.A.w/2,Lc=b.y-rb-8,cur={L:Lc,mx:cx,my:(rb+b.y)/2,ang:90};
   X=i===k?cur:{L:lerp(cur.L,chain.L,pk),mx:lerp(cur.mx,chain.mx,pk),my:lerp(cur.my,chain.my,pk),ang:lerp(cur.ang,chain.ang,pk)}}
  if(X.L<12){e.arrow.style.opacity=0;return}
  e.arrow.style.opacity=1;e.arrow.style.transform=`translate(${X.mx-20}px,${X.my-12}px) rotate(${X.ang}deg) scale(${Math.min(1.05,X.L/40)})`})}};
/* ---------- helpers ---------- */
function say(side,at,text,o={}){const w=o.w||240,sz=o.size||18;add(side,{at,kind:o.kind||'wipe',x:o.x!=null?o.x:(280-w)/2,y:o.y==null?20:o.y,w,h:o.h||sz*1.45,html:TX(text,sz,o.weight||700,o.color||'#191919'),until:o.until,fx:o.fx})}
function typeText(side,at,text,o={}){const sz=o.size||17,w=o.w||240,cps=o.cps||26;add(side,{at,kind:'type',text,dur:text.length/cps,x:o.x!=null?o.x:(280-w)/2,y:o.y||20,w,h:o.h||sz*1.5,html:`<div class="tx" style="font-size:${sz}px;font-weight:${o.weight||700};color:${o.color||'#191919'};text-align:${o.align||'center'};white-space:pre"><span class="ty"></span></div>`,until:o.until,fx:o.fx})}
function countNum(side,at,o){add(side,{at,kind:'count',from:o.from||0,to:o.to,pre:o.pre,suf:o.suf,dur:o.dur||.9,x:o.x,y:o.y,w:o.w||100,h:o.h||(o.size||34)*1.3,until:o.until,fx:o.fx,html:`<div class="tx cn" style="font-size:${o.size||34}px;font-weight:${o.weight||800};color:${o.color||'#1D6AE5'}">${(o.pre||'')+(o.from||0)+(o.suf||'')}</div>`})}
function pkt(side,o){const n=o.n||1,sz=o.size||12;for(let i=0;i<n;i++)add(side,{at:o.at,kind:'static',x:o.from[0]-sz/2,y:o.from[1]-sz/2,w:sz,h:sz,until:o.until,z:6,
  html:`<div style="width:100%;height:100%;border-radius:50%;background:${o.color||'#1D6AE5'};border:2px solid #fff;box-sizing:border-box;box-shadow:0 0 0 2px ${(o.color||'#1D6AE5')}33"></div>`,
  fx:[{t:'loop',from:(o.start||o.at)+i*(o.period||.9)/n,period:o.period||.9,dx:o.to[0]-o.from[0],dy:o.to[1]-o.from[1],until:o.until}]})}
function meter(side,o){const h=o.h||18;add(side,{at:o.at,kind:'pop',x:o.x,y:o.y,w:o.w,h,html:`<div style="width:100%;height:100%;border:3px solid #1459C4;border-radius:${h}px;background:#fff;box-sizing:border-box"></div>`,until:o.until});
 add(side,{at:o.at+(o.delay==null?.15:o.delay),kind:'grow',axis:'x',dur:o.fillDur||.7,x:o.x+3,y:o.y+3,w:(o.w-6)*o.pct/100,h:h-6,until:o.until,html:`<div style="width:100%;height:100%;border-radius:${h}px;background:${o.color||'#1D6AE5'}"></div>`})}
function thinking(side,at,x,y,o={}){[0,1,2].forEach(i=>add(side,{at,kind:'pop',x:x+i*12,y,w:8,h:8,until:o.until,html:`<div style="width:100%;height:100%;border-radius:50%;background:${o.color||'#7C4DFF'}"></div>`,fx:[{t:'bob',amp:3,period:.6,ph:i}]}))}
