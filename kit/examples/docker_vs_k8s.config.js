/* ===== Example: Docker vs Kubernetes, then Container vs Pod, with the FOCUS-SWAP explanation motion. =====
   Intro (names + WHAT'S THE DIFFERENCE?) is the reference format, unchanged. After it, each tool's box GROWS to cover the top half while it is
   explained; at the other tool's turn the boxes swap (the first glides back to its slot, the second scales up into the same central spot).
   Interior coordinates of a box: 280 x 280 u (contents scale with the box). Absolute seconds. */
window.DURATION=23.6;
const NAME={dur:.3},NAME_FAST={dur:.15};
/* ---------- PAIR 1: Docker vs Kubernetes (official logo tiles) ---------- */
boxPop('L',0.00);boxPop('R',0.75);
tile('L',0.00,'docker','white','#1D63ED',{fit:.86});tile('R',0.75,'kubernetes','white','#326CE5',{fit:.75});
label('L',0.12,'Docker',{until:1.80});label('R',0.87,'Kubernetes',{until:1.80});
wtd(1.84,2.68);cut(2.68);
/* "Docker runs your application in a container"  -> Docker box grows to cover the top half */
focus('L',2.68);
label('L',3.05,'Docker',{dur:.3,until:5.95,out:.25});
add('L',{at:3.20,kind:'pop',x:97,y:56,w:75,h:62,html:IC.win('box')});
add('L',{at:3.32,kind:'wipe',x:65,y:21,w:150,h:24,html:TX('application',19,600)});
add('L',{at:4.30,kind:'draw',dir:'down',x:118,y:120,w:24,h:40,html:IC.arrow('down')});
add('L',{at:4.70,kind:'pop',x:61,y:161,w:144,h:90,html:IC.container('docker')});
/* "whereas Kubernetes runs and scales multiple containers across servers" -> swap: Docker glides back left, Kubernetes scales up into its place */
focus('R',5.70);
label('R',6.10,'Kubernetes',{dur:.3});
[[6.30,38,38],[6.80,158,38],[7.10,38,100],[7.40,158,100]].forEach(([at,x,y])=>add('R',{at,kind:'pop',x,y,w:84,h:52.5,html:IC.container('docker')}));
add('R',{at:7.85,kind:'draw',dir:'down',x:66,y:153,w:22,h:37,html:IC.arrow('down')});add('R',{at:7.97,kind:'draw',dir:'down',x:186,y:153,w:22,h:37,html:IC.arrow('down')});
add('R',{at:8.45,kind:'wipe',x:100,y:158,w:80,h:20,html:TX('servers',16,500,'#222')});
add('R',{at:8.35,kind:'pop',x:30,y:192,w:94,h:68,html:IC.server(2)});add('R',{at:8.55,kind:'pop',x:150,y:192,w:94,h:68,html:IC.server(2)});
neutral(9.70);label('L',9.95,'Docker',{dur:.3});                // both finished boxes glide back side by side (the comparison); Docker's name returns
cut(10.90);
/* ---------- PAIR 2: Container vs Pod (hero icons, boxes persist) ---------- */
add('L',{at:11.00,kind:'pop',x:40,y:78,w:200,h:125,html:IC.container('docker')});label('L',11.25,'Container',{dur:.25,until:13.25});
add('R',{at:12.25,kind:'pop',x:92,y:66,w:96,h:146,html:IC.pod(2)});label('R',12.25,'Pod',{dur:.25,until:13.25});
wtd(13.25,14.15);cut(14.15);
focus('L',14.15);
add('L',{at:14.70,kind:'pop',x:52,y:70,w:176,h:110,html:IC.container('docker')});label('L',14.50,'Container',{dur:.3,until:17.55,out:.25});
add('L',{at:15.30,kind:'wipe',x:70,y:196,w:140,h:26,html:TX('Instance',20,700)});
add('L',{at:16.20,kind:'wipe',x:60,y:20,w:160,h:26,html:TX('Application',20,700)});add('L',{at:16.55,kind:'draw',dir:'down',x:128,y:44,w:20,h:30,html:IC.arrow('down')});
focus('R',17.50);label('R',17.90,'Pod',{dur:.3});
const podBox=(l)=>`<svg viewBox="0 0 120 210"><rect x="3" y="3" width="114" height="204" rx="13" fill="#fff" stroke="#2B2B2B" stroke-width="2.6"/><text x="60" y="26" text-anchor="middle" font-family="Poppins" font-weight="800" font-size="15" fill="#1B1B1B">${l}</text></svg>`;
add('R',{at:18.10,kind:'pop',x:18,y:36,w:112,h:196,html:podBox('pod-1')});add('R',{at:18.40,kind:'pop',x:150,y:36,w:112,h:196,html:podBox('pod-2')});
[[19.00,26,76],[19.30,26,144],[19.60,158,76],[19.90,158,144]].forEach(([at,x,y])=>add('R',{at,kind:'pop',x,y,w:96,h:60,html:IC.container('docker')}));
neutral(21.2);label('L',21.45,'Container',{dur:.3});
