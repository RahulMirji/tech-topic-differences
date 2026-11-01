/* ===== Topic library demo: one pair per visual type. Rules shown here:
   1. NOTHING is pre-placed: every element enters at the moment it is spoken (times are the creator's words, estimated at 3 words/s).
   2. When the diagram would crowd, a reflow stack() shrinks the earlier elements toward the top as each new one arrives.
   3. Something changes at least every ~0.6 s; held states keep moving (packets, spinners, meters). Motion carries the meaning. ===== */
window.DURATION=118;
/* pairFrame: the measured state machine (names, yellow label, cut, focus-swap, settle) around two explanations of dA and dB seconds */
function pairFrame(P,o){const c=P+2.85,fb=c+o.dA,neu=fb+o.dB,next=neu+1.5;
 if(o.first){boxPop('L',P);boxPop('R',P+.75);tile('L',P,o.tl[0],'white',o.tl[1],{fit:o.tl[2]||.8});tile('R',P+.75,o.tr[0],'white',o.tr[1],{fit:o.tr[2]||.8})}
 else{add('L',{at:P+.1,kind:'pop',x:70,y:70,w:140,h:140,html:o.hl});add('R',{at:P+.85,kind:'pop',x:70,y:70,w:140,h:140,html:o.hr})}
 label('L',P+.12+(o.first?0:.2),o.L,{dur:.25,until:P+2.0});label('R',P+.87,o.R,{dur:.25,until:P+2.0});wtd(P+2.0,c);cut(c);
 focus('L',c);label('L',c+.45,o.L,{dur:.3,until:fb+.3,out:.25});focus('R',fb);label('R',fb+.4,o.R,{dur:.3});
 neutral(neu);label('L',neu+.25,o.L,{dur:.3});cut(next);
 return{c,fb,neu,next,a:t=>c+t,b:t=>fb+t}}
const HERO=(name,color='#1D6AE5',bg='#E8F1FD')=>IC.hero(name,color,bg);
/* ---------- 1. SQL vs NoSQL (structure): rigid table rejects a new field, flexible documents accept it ---------- */
let T=pairFrame(0,{first:true,L:'SQL',R:'NoSQL',tl:['postgresql','#4169E1',.8],tr:['mongodb','#47A248',.72],dA:5.8,dB:5.8});
say('L',T.a(.45),'Tables, rows, columns',{size:17,y:12,w:250});
add('L',{at:T.a(.9),kind:'slide',from:'left',x:22,y:46,w:236,h:30,html:ROW(['id','name','age'],{head:true,size:14})});
[['1','Ana','28'],['2','Raj','31'],['3','Eli','25']].forEach((r,i)=>add('L',{at:T.a(1.4+i*.5),kind:'slide',from:'left',x:22,y:76+i*30,w:236,h:30,html:ROW(r,{size:14})}));
add('L',{at:T.a(3.1),kind:'slide',from:'right',dist:70,x:22,y:178,w:236,h:30,html:ROW(['4','Kim','22','kim@x.io'],{bg:'#FDECEA',color:RED,size:13}),until:T.a(4.4),fx:[{t:'path',pts:[[T.a(3.1),0,0],[T.a(3.7),0,-26]]},{t:'shake',from:T.a(3.7),dur:.5,amp:7}]});
add('L',{at:T.a(3.75),kind:'pop',x:220,y:136,w:40,h:40,html:IC.no(),until:T.a(4.6)});
say('L',T.a(4.4),'Fixed schema',{size:20,y:226,color:RED,w:240});
say('R',T.b(.45),'Flexible documents',{size:17,y:12,w:250});
[[0,16],[1,100],[2,184]].forEach(([v,x],i)=>add('R',{at:T.b(1.0+i*.5),kind:'pop',x,y:48,w:80,h:88,html:IC.json(false,v)}));
add('R',{at:T.b(3.0),kind:'slide',from:'right',dist:90,x:100,y:148,w:80,h:88,html:IC.json(true,1)});
add('R',{at:T.b(3.8),kind:'pop',x:186,y:160,w:40,h:40,html:IC.ok()});
say('R',T.b(4.4),'Any shape fits',{size:20,y:238,color:GRN,w:240});
/* ---------- 2. Cache vs Database (speed): the SAME request, shown by how fast the packet travels ---------- */
T=pairFrame(T.next,{L:'Cache',R:'Database',hl:IC.cache(),hr:IC.db(),dA:5.2,dB:5.8});
add('L',{at:T.a(.4),kind:'pop',x:20,y:84,w:60,h:60,html:IC.avatar('user')});
add('L',{at:T.a(.9),kind:'pop',x:200,y:80,w:64,h:64,html:IC.cache()});
add('L',{at:T.a(1.3),kind:'draw',dir:'right',x:94,y:104,w:92,h:30,html:IC.arrow('right',ORG)});
pkt('L',{at:T.a(1.7),from:[88,114],to:[196,114],period:.45,n:2,color:ORG,size:14});
add('L',{at:T.a(2.2),kind:'pop',x:92,y:150,w:96,h:36,html:CHIP('~1 ms','#fff',ORG,22)});
meter('L',{at:T.a(2.8),x:30,y:208,w:220,h:20,pct:100,color:ORG,fillDur:.35});
say('L',T.a(3.8),'In memory = fast',{size:19,y:240,w:240});
add('R',{at:T.b(.4),kind:'pop',x:20,y:84,w:60,h:60,html:IC.avatar('user')});
add('R',{at:T.b(.9),kind:'pop',x:200,y:76,w:60,h:70,html:IC.db()});
add('R',{at:T.b(1.3),kind:'draw',dir:'right',x:94,y:104,w:92,h:30,html:IC.arrow('right',BLU)});
pkt('R',{at:T.b(1.7),from:[88,114],to:[196,114],period:1.5,n:1,color:BLU,size:14});
add('R',{at:T.b(2.2),kind:'pop',x:92,y:150,w:96,h:36,html:CHIP('~50 ms','#fff',BLD,22)});
meter('R',{at:T.b(2.8),x:30,y:208,w:220,h:20,pct:100,color:BLU,fillDur:1.7});
say('R',T.b(4.2),'On disk = durable',{size:19,y:240,w:240});
/* ---------- 3. Sync vs Async (timeline): waiting vs carrying on ---------- */
T=pairFrame(T.next,{L:'Sync',R:'Async',hl:HERO('hourglass',ORG,'#FFF3DB'),hr:HERO('send'),dA:5.6,dB:6.0});
add('L',{at:T.a(.4),kind:'pop',x:20,y:90,w:56,h:56,html:IC.avatar('laptop')});add('L',{at:T.a(.8),kind:'pop',x:200,y:76,w:56,h:84,html:IC.tower()});
add('L',{at:T.a(1.1),kind:'draw',dir:'right',x:88,y:108,w:100,h:28,html:IC.arrow('right',NAVY)});
pkt('L',{at:T.a(1.4),from:[84,122],to:[196,122],period:1.3,n:1,color:BLU,size:14,until:T.a(3.0)});
add('L',{at:T.a(1.5),kind:'pop',x:30,y:40,w:36,h:42,html:IC.bare('hourglass',ORG,2),until:T.a(3.3),fx:[{t:'spin',from:T.a(1.7),period:1.2}]});
say('L',T.a(1.9),'waiting...',{size:16,y:166,w:120,x:2,color:'#7A869A',until:T.a(3.3),fx:[{t:'blink',from:T.a(1.9),period:.7}]});
add('L',{at:T.a(3.3),kind:'pop',x:30,y:40,w:36,h:36,html:IC.ok()});
pkt('L',{at:T.a(3.0),from:[196,132],to:[84,132],period:.5,n:1,color:GRN,size:14,until:T.a(3.5)});
say('L',T.a(4.0),'One thing at a time',{size:19,y:226,w:250});
add('R',{at:T.b(.4),kind:'pop',x:20,y:90,w:56,h:56,html:IC.avatar('laptop')});add('R',{at:T.b(.8),kind:'pop',x:200,y:76,w:56,h:84,html:IC.tower()});
add('R',{at:T.b(1.1),kind:'draw',dir:'right',x:88,y:108,w:100,h:28,html:IC.arrow('right',NAVY)});
pkt('R',{at:T.b(1.3),from:[84,122],to:[196,122],period:.9,n:3,color:BLU,size:14,until:T.b(3.0)});
add('R',{at:T.b(1.6),kind:'pop',x:20,y:164,w:240,h:30,html:`<div style="display:flex;align-items:center;gap:8px;height:100%">${IC.bare('list-checks',BLU,2).replace('<svg','<svg style="width:26px;height:26px;flex:none"')}<div class="tx" style="font-size:16px;font-weight:700">doing other work</div></div>`});
meter('R',{at:T.b(2.0),x:26,y:200,w:228,h:18,pct:100,color:BLU,fillDur:3.4});
[2.4,2.8,3.2].forEach((t,i)=>add('R',{at:T.b(t),kind:'pop',x:84+i*34,y:34,w:28,h:28,html:IC.ok()}));
say('R',T.b(4.2),'Replies arrive later',{size:19,y:232,w:250});
/* ---------- 4. Message queue vs Pub/Sub (flow): ONE consumer takes each message vs EVERY subscriber gets a copy ---------- */
T=pairFrame(T.next,{L:'Queue',R:'Pub/Sub',hl:HERO('inbox'),hr:HERO('rss'),dA:6.0,dB:6.0});
add('L',{at:T.a(.4),kind:'pop',x:12,y:100,w:50,h:50,html:IC.avatar('user')});add('L',{at:T.a(.8),kind:'pop',x:72,y:108,w:124,h:34,html:IC.tube()});
add('L',{at:T.a(1.2),kind:'pop',x:216,y:52,w:50,h:50,html:IC.avatar('bot',PUR,'#F0EDFF')});add('L',{at:T.a(1.5),kind:'pop',x:216,y:150,w:50,h:50,html:IC.avatar('bot',PUR,'#F0EDFF')});
[[2.0,-53,3.1,254,44],[2.5,45,3.6,254,142],[3.2,-53,4.3,254,44]].forEach(([t,dy,tEnd,bx,by],i)=>{
 add('L',{at:T.a(t),kind:'pop',x:84,y:119,w:30,h:22,html:IC.env(),until:T.a(tEnd+.1),fx:[{t:'path',pts:[[T.a(t),0,0],[T.a(t+.6),70,0],[T.a(tEnd),140,dy]]}]});
 add('L',{at:T.a(tEnd),kind:'pop',x:bx,y:by,w:26,h:26,html:IC.ok(),until:T.a(tEnd+.8)})});
say('L',T.a(4.6),'Each message: ONE consumer',{size:17,y:232,w:268,x:6});
add('R',{at:T.b(.4),kind:'pop',x:12,y:100,w:50,h:50,html:IC.avatar('megaphone')});add('R',{at:T.b(.8),kind:'pop',x:98,y:100,w:50,h:50,html:IC.node('T',PUR)});
say('R',T.b(1.0),'topic',{size:15,y:154,w:70,x:88,color:PUR});
[[1.1,34],[1.4,104],[1.7,174]].forEach(([t,y])=>add('R',{at:T.b(t),kind:'pop',x:216,y,w:50,h:50,html:IC.avatar('user')}));
add('R',{at:T.b(2.2),kind:'pop',x:36,y:114,w:30,h:22,html:IC.env(),until:T.b(2.95),fx:[{t:'path',pts:[[T.b(2.2),0,0],[T.b(2.8),70,0]]}]});
[[34,-66],[104,4],[174,74]].forEach(([y,dy],i)=>{add('R',{at:T.b(2.9),kind:'pop',x:108,y:114,w:30,h:22,html:IC.env(PUR),until:T.b(3.75),fx:[{t:'path',pts:[[T.b(2.9),0,0],[T.b(3.6),112,dy]]}]});
 add('R',{at:T.b(3.65),kind:'pop',x:244,y:y-6,w:26,h:26,html:IC.ok()})});
say('R',T.b(4.6),'EVERY subscriber gets a copy',{size:17,y:236,w:268,x:6});
/* ---------- 5. TCP vs UDP (reliability): handshake and confirmations vs fire and forget ---------- */
T=pairFrame(T.next,{L:'TCP',R:'UDP',hl:HERO('link'),hr:HERO('radio'),dA:6.2,dB:5.4});
add('L',{at:T.a(.4),kind:'pop',x:10,y:100,w:50,h:50,html:IC.avatar('laptop')});add('L',{at:T.a(.6),kind:'pop',x:220,y:100,w:50,h:50,html:IC.avatar('server',NAVY,'#E6EAF5')});
add('L',{at:T.a(.9),kind:'pop',x:66,y:80,w:56,h:26,html:CHIP('SYN','#fff',BLU,15),until:T.a(1.7),fx:[{t:'path',pts:[[T.a(.9),0,0],[T.a(1.6),90,0]]}]});
add('L',{at:T.a(1.7),kind:'pop',x:150,y:80,w:92,h:26,html:CHIP('SYN-ACK','#fff',GRN,15),until:T.a(2.6),fx:[{t:'path',pts:[[T.a(1.7),0,0],[T.a(2.5),-90,0]]}]});
add('L',{at:T.a(2.6),kind:'pop',x:70,y:80,w:56,h:26,html:CHIP('ACK','#fff',BLU,15),until:T.a(3.4),fx:[{t:'path',pts:[[T.a(2.6),0,0],[T.a(3.3),90,0]]}]});
add('L',{at:T.a(3.3),kind:'pop',x:122,y:40,w:36,h:36,html:IC.ok()});
pkt('L',{at:T.a(3.5),from:[66,126],to:[216,126],period:.9,n:2,color:BLU,size:13,until:T.a(5.4)});
pkt('L',{at:T.a(3.9),from:[216,146],to:[66,146],period:.9,n:2,color:GRN,size:11,until:T.a(5.4)});
add('L',{at:T.a(4.3),kind:'pop',x:130,y:156,w:30,h:30,html:IC.no(),until:T.a(5.0)});add('L',{at:T.a(4.7),kind:'pop',x:100,y:190,w:80,h:26,html:CHIP('resend','#fff',ORG,15)});
say('L',T.a(5.2),'Reliable: every packet confirmed',{size:16,y:240,w:268,x:6});
add('R',{at:T.b(.4),kind:'pop',x:10,y:100,w:50,h:50,html:IC.avatar('laptop')});add('R',{at:T.b(.6),kind:'pop',x:220,y:100,w:50,h:50,html:IC.avatar('server',NAVY,'#E6EAF5')});
say('R',T.b(.9),'No handshake',{size:17,y:44,w:200,x:40});
pkt('R',{at:T.b(1.2),from:[66,126],to:[216,126],period:.75,n:4,color:BLU,size:13,until:T.b(4.1)});
[2.0,3.2].forEach(t=>add('R',{at:T.b(t),kind:'pop',x:130,y:112,w:30,h:30,html:IC.no(),until:T.b(t+.6)}));
say('R',T.b(4.3),'Fast: no confirmation',{size:17,y:224,w:268,x:6});
/* ---------- 6. Authentication vs Authorization (identity then permissions): trail stacks ---------- */
T=pairFrame(T.next,{L:'Authentication',R:'Authorization',hl:HERO('fingerprint'),hr:HERO('key'),dA:5.4,dB:6.4});
const SA=stack('L',{mode:'trail',area:{x:6,y:8,w:268,h:224}});
SA.add({at:T.a(.6),w:96,h:108,html:IC.step('user','You',BLU,BLX)});SA.add({at:T.a(1.9),w:96,h:108,html:IC.step('id-card','Show ID',BLU,BLX)});SA.add({at:T.a(3.2),w:96,h:108,html:IC.step('badge-check','Verified',GRN,'#E3F7EA')});
say('L',T.a(4.3),'Who are you?',{size:20,y:240,w:240});
const SB=stack('R',{mode:'trail',area:{x:6,y:8,w:268,h:224}});
SB.add({at:T.b(.6),w:96,h:108,html:IC.step('user-check','Logged in',GRN,'#E3F7EA')});SB.add({at:T.b(1.9),w:96,h:108,html:IC.step('door-open','Profile',GRN,'#E3F7EA')});
SB.add({at:T.b(3.2),w:96,h:108,html:IC.step('door-closed','Billing',RED,'#FDECEA')});SB.add({at:T.b(4.5),w:96,h:108,html:IC.step('lock','Admin',RED,'#FDECEA')});
say('R',T.b(5.4),'What can you do?',{size:20,y:240,w:240});
/* ---------- 7. Training vs Inference (learning loop vs answering): counters, meters and chat ---------- */
T=pairFrame(T.next,{L:'Training',R:'Inference',hl:HERO('graduation-cap',PUR,'#F0EDFF'),hr:HERO('message-square'),dA:6.0,dB:5.4});
add('L',{at:T.a(.5),kind:'pop',x:12,y:84,w:74,h:66,html:IC.docs(3)});add('L',{at:T.a(.9),kind:'draw',dir:'right',x:92,y:104,w:36,h:22,html:IC.arrow('right',PUR)});
add('L',{at:T.a(1.2),kind:'pop',x:134,y:80,w:70,h:70,html:IC.avatar('brain',PUR,'#F0EDFF')});add('L',{at:T.a(1.6),kind:'pop',x:214,y:96,w:38,h:38,html:IC.bare('refresh-cw',PUR,2),fx:[{t:'spin',from:T.a(1.8),period:1.4}]});
countNum('L',T.a(1.9),{from:1,to:5,pre:'epoch ',x:50,y:164,w:180,size:24,color:PUR,dur:2.6});
meter('L',{at:T.a(2.2),x:30,y:208,w:220,h:20,pct:92,color:PUR,fillDur:2.6});
say('L',T.a(4.7),'Learns from data',{size:19,y:238,w:240});
add('R',{at:T.b(.5),kind:'slide',from:'right',x:96,y:14,w:170,h:38,html:BUB('Capital of France?','user',14)});
add('R',{at:T.b(1.1),kind:'pop',x:12,y:96,w:64,h:64,html:IC.avatar('brain',PUR,'#F0EDFF')});add('R',{at:T.b(1.5),kind:'pop',x:56,y:92,w:28,h:28,html:IC.badge('lock',NAVY)});
add('R',{at:T.b(2.0),kind:'slide',from:'left',x:96,y:70,w:170,h:38,html:BUB('Paris','ai',14)});
add('R',{at:T.b(3.0),kind:'slide',from:'right',x:96,y:130,w:170,h:38,html:BUB('Largest planet?','user',14)});
add('R',{at:T.b(3.6),kind:'slide',from:'left',x:96,y:186,w:170,h:38,html:BUB('Jupiter','ai',14)});
say('R',T.b(4.4),'Answers. No learning.',{size:18,y:240,w:250,x:15});
/* ---------- 8. Vibe coding vs Traditional coding: AI writes and you accept vs you write and read every line ---------- */
T=pairFrame(T.next,{L:'Vibe coding',R:'Traditional',hl:HERO('wand-sparkles',PUR,'#F0EDFF'),hr:HERO('code-xml'),dA:6.0,dB:6.2});
const SV=stack('L',{mode:'trail',area:{x:6,y:8,w:268,h:226}});
SV.add({at:T.a(.6),w:210,h:56,html:PROMPT('Build me a login page',15)});SV.add({at:T.a(1.7),w:96,h:108,html:IC.step('bot','AI writes',PUR,'#F0EDFF')});
SV.add({at:T.a(2.9),kind:'wipe',dur:.7,w:230,h:88,html:IC.code(['<form onSubmit={login}>','  <input type="email" />','</form>'],'Login.jsx')});SV.add({at:T.a(4.4),w:96,h:108,html:IC.step('thumbs-up','Accept',GRN,'#E3F7EA')});
say('L',T.a(5.2),'You describe, AI writes',{size:18,y:244,w:260,x:10});
add('R',{at:T.b(.4),kind:'pop',x:12,y:70,w:50,h:50,html:IC.avatar('user')});
const L3=['function login(user) {','  const ok = check(user)','  return ok ? go() : fail()'];
[1,2,3].forEach(n=>add('R',{at:T.b(.8+(n-1)*.7),kind:n===1?'pop':'static',x:60,y:66,w:212,h:212*(44+n*17)/250,html:IC.code(L3.slice(0,n),'login.js'),until:n<3?T.b(.8+n*.7):undefined}));
add('R',{at:T.b(3.0),kind:'pop',x:62,y:90,w:208,h:15,html:`<div style="width:100%;height:100%;border:2px solid ${BLU};border-radius:5px;background:${BLU}33"></div>`,fx:[{t:'path',pts:[[T.b(3.0),0,0],[T.b(3.6),0,0],[T.b(3.85),0,14],[T.b(4.3),0,14],[T.b(4.55),0,28]]}]});
add('R',{at:T.b(3.0),kind:'pop',x:22,y:140,w:34,h:34,html:IC.bare('scan-eye',BLU,2),fx:[{t:'pulse',from:T.b(3.0),period:.6,amp:.14}]});
add('R',{at:T.b(2.2),kind:'pop',x:226,y:60,w:30,h:30,html:IC.bare('code-xml',BLU,2),fx:[{t:'blink',from:T.b(2.2),period:.6}],until:T.b(3.0)});
add('R',{at:T.b(4.7),kind:'pop',x:226,y:176,w:40,h:40,html:IC.ok()});
say('R',T.b(5.0),'You write, you understand',{size:18,y:244,w:268,x:6});
/* ---------- 9. Chat vs Agent: you copy and paste vs the AI edits files and runs commands itself ---------- */
T=pairFrame(T.next,{L:'Chat',R:'Agent',hl:HERO('message-square'),hr:HERO('bot',PUR,'#F0EDFF'),dA:6.0,dB:6.0});
add('L',{at:T.a(.5),kind:'slide',from:'right',x:70,y:8,w:200,h:34,html:BUB('Fix the login bug','user',14)});
add('L',{at:T.a(1.3),kind:'slide',from:'left',x:10,y:46,w:200,h:30,html:BUB('Here is the fix:','ai',14)});
add('L',{at:T.a(2.0),kind:'wipe',x:30,y:82,w:200,h:200*(44+2*17)/250,html:IC.code(['if (!user) return','login(user)'],'chat')});
add('L',{at:T.a(2.8),kind:'pop',x:236,y:92,w:30,h:30,html:IC.bare('copy',BLU,2),fx:[{t:'pulse',from:T.a(2.8),period:.5,amp:.18}]});
add('L',{at:T.a(3.2),kind:'static',x:30,y:82,w:200,h:200*(44+2*17)/250,html:IC.code(['if (!user) return','login(user)'],'chat'),until:T.a(4.2),fx:[{t:'path',pts:[[T.a(3.2),0,0],[T.a(4.0),10,92,.7]]},{t:'hide',from:T.a(4.15)}]});
add('L',{at:T.a(3.6),kind:'pop',x:40,y:176,w:200,h:200*(44+17)/250,html:IC.code(['// login.js'],'editor')});
add('L',{at:T.a(4.3),kind:'pop',x:40,y:176,w:200,h:200*(44+2*17)/250,html:IC.code(['if (!user) return','login(user)'],'login.js')});
say('L',T.a(5.1),'You copy and paste',{size:19,y:244,w:250,x:15});
add('R',{at:T.b(.5),kind:'pop',x:112,y:10,w:56,h:56,html:IC.avatar('bot',PUR,'#F0EDFF')});
[[1.2,36],[1.6,118],[2.0,200]].forEach(([t,x])=>add('R',{at:T.b(t),kind:'pop',x,y:88,w:44,h:44,html:IC.bare('file-code',BLU,1.8)}));
[[2.3,36],[2.7,118],[3.1,200]].forEach(([t,x])=>add('R',{at:T.b(t),kind:'pop',x:x+26,y:80,w:24,h:24,html:IC.badge('sparkles',PUR)}));
add('R',{at:T.b(3.5),kind:'wipe',dur:.6,x:30,y:146,w:220,h:220*(44+2*17)/250,html:IC.code(['$ npm test','✓ 12 passed'],'terminal')});
add('R',{at:T.b(4.4),kind:'pop',x:92,y:222,w:96,h:28,html:CHIP('all green','#fff',GRN,16)});
say('R',T.b(5.0),'Edits files, runs commands',{size:17,y:252,w:268,x:6});
/* ---------- 10. Working code vs Secure code (risk): it runs vs it cannot be broken into ---------- */
T=pairFrame(T.next,{L:'Working',R:'Secure',hl:HERO('circle-check',GRN,'#E3F7EA'),hr:HERO('shield-check',GRN,'#E3F7EA'),dA:5.4,dB:6.4});
add('L',{at:T.a(.6),kind:'pop',x:24,y:34,w:232,h:232*(44+2*17)/250,html:IC.code(['const KEY = "sk-123"','app.get("/user", show)'],'app.js')});
add('L',{at:T.a(1.5),kind:'pop',x:108,y:132,w:46,h:46,html:IC.badge('play',BLU)});
add('L',{at:T.a(2.3),kind:'pop',x:108,y:132,w:46,h:46,html:IC.ok()});add('L',{at:T.a(2.8),kind:'pop',x:90,y:188,w:100,h:30,html:CHIP('It runs','#fff',GRN,17)});
say('L',T.a(4.2),'It runs. That is all.',{size:19,y:238,w:250,x:15});
add('R',{at:T.b(.5),kind:'pop',x:24,y:30,w:232,h:232*(44+2*17)/250,html:IC.code(['const KEY = process.env.KEY','check(input)'],'app.js')});
add('R',{at:T.b(1.2),kind:'pop',x:236,y:20,w:30,h:30,html:IC.badge('lock',GRN)});
add('R',{at:T.b(1.7),kind:'pop',x:206,y:166,w:54,h:54,html:IC.avatar('bug',RED,'#FDECEA'),fx:[{t:'shake',from:T.b(3.3),dur:.5,amp:6}]});
pkt('R',{at:T.b(2.0),from:[210,172],to:[160,96],period:.8,n:2,color:RED,size:13,until:T.b(3.3)});
add('R',{at:T.b(2.5),kind:'pop',x:130,y:112,w:46,h:46,html:IC.badge('shield-check',GRN)});
add('R',{at:T.b(3.3),kind:'pop',x:186,y:150,w:30,h:30,html:IC.no()});
say('R',T.b(4.8),'Keys hidden. Input checked.',{size:17,y:240,w:268,x:6});
window.DURATION=T.neu+1.3;
