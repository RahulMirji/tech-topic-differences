/* ===== Example 2: four pairs that use the pattern builders (C step rows, D scaling diagrams, E terminal + dashboard, F semantic contrast, G brand tiles, H logo rows, I cycle hero icons).
   Boxes persist across pairs, so pairs 2-4 start with hero icons popping into the empty boxes (no boxPop). Absolute seconds. ===== */
window.DURATION=53;
/* ---------- PAIR 1: CI vs CD  (cycle hero icons, title + step rows) ---------- */
boxPop('L',0.00);boxPop('R',0.75);
add('L',{at:0.00,kind:'static',x:34,y:34,w:212,h:212,html:IC.cycle({colors:['#F59E0B'],labels:['CODE','BUILD','TEST'],center:'code-xml',centerColor:'#1B2547'})});
add('R',{at:0.75,kind:'static',x:34,y:34,w:212,h:212,html:IC.cycle({colors:['#7C4DFF'],labels:['DEPLOY','OPERATE','MONITOR'],center:'rocket',centerColor:'#7C4DFF'})});
label('L',0.12,'CI',{until:1.80});label('R',0.87,'CD',{until:1.80});wtd(1.84,2.68);cut(2.68);
focus('L',2.68);label('L',3.05,'CI',{until:7.55,out:.25});
add('L',{at:3.30,kind:'wipe',x:40,y:18,w:200,h:64,html:TXL('Continuous\nIntegration',27)});
stepRow('L',{at:4.30,every:.7,y:112,steps:[{icon:'code-xml',cap:'Code\nPushed'},{icon:'cog',cap:'Build'},{icon:'circle-check',cap:'Test',color:'#1E9E55',bg:'#E3F7EA'}]});
focus('R',7.50);label('R',7.90,'CD',{dur:.3});
add('R',{at:8.10,kind:'wipe',x:40,y:18,w:200,h:64,html:TXL('Continuous\nDelivery',27)});
stepRow('R',{at:9.10,every:.7,y:112,steps:[{icon:'git-branch',cap:'Same\nCode',color:'#1D6AE5',bg:'#E8F1FD'},{icon:'rocket',cap:'Deploy'},{icon:'server',cap:'Production\nServers',color:'#1E9E55',bg:'#E3F7EA'}]});
neutral(11.8);label('L',12.05,'CI',{dur:.3});cut(13.2);
/* ---------- PAIR 2: Horizontal vs Vertical Scaling (towers, bracket, double arrows) ---------- */
add('L',{at:13.30,kind:'pop',x:100,y:62,w:80,h:120,html:IC.tower()});add('L',{at:13.30,kind:'pop',x:14,y:104,w:60,h:22,html:IC.dbl('h')});add('L',{at:13.30,kind:'pop',x:206,y:104,w:60,h:22,html:IC.dbl('h')});
label('L',13.55,'Horizontal\nScaling',{dur:.25,until:15.55});
add('R',{at:14.55,kind:'pop',x:96,y:76,w:88,h:132,html:IC.tower()});add('R',{at:14.55,kind:'pop',x:128,y:8,w:24,h:62,html:IC.dbl('v')});add('R',{at:14.55,kind:'pop',x:128,y:212,w:24,h:62,html:IC.dbl('v')});
label('R',14.55,'Vertical\nScaling',{dur:.25,until:15.55});
wtd(15.55,16.45);cut(16.45);
focus('L',16.45);label('L',16.90,'Horizontal\nScaling',{dur:.3,until:21.0,out:.25});
add('L',{at:17.10,kind:'wipe',x:50,y:20,w:180,h:24,html:TX('Load Distributed',19,700)});add('L',{at:17.50,kind:'draw',dir:'right',x:34,y:50,w:212,h:30,html:IC.bracket()});
[[17.80,20],[18.15,108],[18.50,196]].forEach(([at,x])=>add('L',{at,kind:'pop',x,y:92,w:64,h:96,html:IC.tower()}));
add('L',{at:19.30,kind:'draw',dir:'right',x:30,y:206,w:220,h:30,html:IC.dbl('h')});
focus('R',20.90);label('R',21.30,'Vertical\nScaling',{dur:.3});
add('R',{at:21.40,kind:'pop',x:30,y:130,w:54,h:80,html:IC.tower()});
add('R',{at:21.80,kind:'wipe',x:40,y:22,w:200,h:54,html:TXL('Adding\nResources & Memory',20,700)});
add('R',{at:22.90,kind:'draw',dir:'right',x:92,y:158,w:54,h:30,html:IC.arrow('right',NAVY)});add('R',{at:23.30,kind:'pop',x:152,y:96,w:100,h:150,html:IC.tower()});
neutral(25.20);label('L',25.45,'Horizontal\nScaling',{dur:.3});cut(26.60);
/* ---------- PAIR 3: Logging vs Monitoring (terminal card; skeleton cards then fill) ---------- */
add('L',{at:26.70,kind:'pop',x:70,y:70,w:140,h:140,html:IC.hero('file-text')});label('L',26.95,'Logging',{dur:.25,until:28.75});
add('R',{at:27.95,kind:'pop',x:70,y:70,w:140,h:140,html:IC.hero('gauge')});label('R',27.95,'Monitoring',{dur:.25,until:28.75});
wtd(28.75,29.65);cut(29.65);
focus('L',29.65);label('L',30.10,'Logging',{dur:.3,until:34.0,out:.25});
add('L',{at:30.35,kind:'pop',x:12,y:50,w:256,h:154,html:IC.terminal([['10:15:23','INFO','User login successful'],['10:15:24','WARN','Disk space running low'],['10:15:25','ERROR','Failed to connect to DB'],['10:15:26','INFO','Request GET /api/orders'],['10:15:27','DEBUG','Cache miss for user 123'],['10:15:28','INFO','Response 200 OK']])});
focus('R',33.9);label('R',34.30,'Monitoring',{dur:.3});
add('R',{at:34.50,kind:'pop',x:78,y:16,w:124,h:124,html:IC.skel('blue')});add('R',{at:34.75,kind:'pop',x:14,y:146,w:124,h:124,html:IC.skel('grey')});add('R',{at:35.00,kind:'pop',x:142,y:146,w:124,h:124,html:IC.skel('green')});
add('R',{at:35.80,kind:'fade',x:78,y:16,w:124,h:124,html:IC.cpu(65),z:2});add('R',{at:36.25,kind:'fade',x:14,y:146,w:124,h:124,html:IC.rate(),z:2});add('R',{at:36.70,kind:'fade',x:142,y:146,w:124,h:124,html:IC.health(),z:2});
neutral(38.6);label('L',38.85,'Logging',{dur:.3});cut(40.0);
/* ---------- PAIR 4: REST API vs gRPC (brand tiles; logo row; semantic locks; binary + gears) ---------- */
tileHTML('L',40.10,'#0A66F5',IC.rest(),{kind:'pop'});tile('R',41.10,'grpc','brand','#244C5A',{kind:'pop',fit:.74});
label('L',40.30,'REST API',{dur:.25,until:42.2});label('R',41.10,'gRPC',{dur:.25,until:42.2});
wtd(42.2,43.1);cut(43.1);
focus('L',43.1);label('L',43.55,'REST API',{dur:.3,until:47.4,out:.25});
add('L',{at:43.80,kind:'pop',x:46,y:44,w:188,h:52,html:logoRow(['googlechrome','firefox','safari'],48,22)});
add('L',{at:44.60,kind:'pop',x:24,y:128,w:100,h:92,html:IC.secure(false,'http://')});add('L',{at:45.30,kind:'pop',x:156,y:128,w:100,h:92,html:IC.secure(true,'https://')});
focus('R',47.3);label('R',47.70,'gRPC',{dur:.3});
add('R',{at:47.90,kind:'pop',x:56,y:34,w:168,h:84,html:`<div style="display:flex;align-items:center;justify-content:center;width:100%;height:100%">${CHIP('01010101<br>10101101<br>01010101','#3A4256','#ECEEF2',22)}</div>`});
add('R',{at:48.80,kind:'pop',x:20,y:152,w:60,h:60,html:IC.bare('settings','#244C5A',1.6)});add('R',{at:49.15,kind:'pop',x:200,y:152,w:60,h:60,html:IC.bare('settings','#244C5A',1.6)});add('R',{at:49.50,kind:'draw',dir:'right',x:92,y:170,w:96,h:24,html:IC.dbl('h','#244C5A')});
neutral(51.3);label('L',51.55,'REST API',{dur:.3});
