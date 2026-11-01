/* ===== Git vs GitHub (A vs B reel config) =====
   Intro: Git vs GitHub logos + WHAT'S THE DIFFERENCE?
   Focus L: Git (Local Version Control, commits, branches, offline)
   Focus R: GitHub (Cloud Hosting, Pull Requests, collaboration)
   Neutral: Settle comparison side by side
*/
window.DURATION = 13.0;

/* ---------- 1. INTRO: Git vs GitHub ---------- */
boxPop('L', 0.00);
boxPop('R', 0.75);
tile('L', 0.00, 'git', 'white', '#F05032', { fit: 0.78 });
tile('R', 0.75, 'github', 'white', '#24292F', { fit: 0.78 });

label('L', 0.12, 'Git', { until: 1.80 });
label('R', 0.87, 'GitHub', { until: 1.80 });

wtd(1.84, 2.68);
cut(2.68);

/* ---------- 2. FOCUS LEFT: Git (Local Version Control) ---------- */
focus('L', 2.68);
label('L', 3.00, 'Git', { dur: 0.3, until: 6.20, out: 0.25 });

// Title
add('L', {
  at: 3.10,
  kind: 'wipe',
  x: 20,
  y: 18,
  w: 240,
  h: 30,
  html: TX('Local Version Control', 21, 800, '#191919')
});

// Git commit timeline diagram
const gitTimelineSVG = `<svg viewBox="0 0 240 76" style="width:100%;height:100%">
  <rect x="2" y="2" width="236" height="72" rx="12" fill="#FFF5F2" stroke="#F05032" stroke-width="2.2"/>
  <line x1="28" y1="46" x2="200" y2="46" stroke="#F05032" stroke-width="3.5" stroke-linecap="round"/>
  <!-- Commit 1 -->
  <circle cx="42" cy="46" r="11" fill="#fff" stroke="#F05032" stroke-width="3.5"/>
  <circle cx="42" cy="46" r="4.5" fill="#F05032"/>
  <text x="42" y="65" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="9" fill="#666">C1</text>
  <!-- Commit 2 -->
  <circle cx="110" cy="46" r="11" fill="#fff" stroke="#F05032" stroke-width="3.5"/>
  <circle cx="110" cy="46" r="4.5" fill="#F05032"/>
  <text x="110" y="65" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="9" fill="#666">C2</text>
  <!-- Commit 3 -->
  <circle cx="180" cy="46" r="11" fill="#fff" stroke="#F05032" stroke-width="3.5"/>
  <circle cx="180" cy="46" r="4.5" fill="#F05032"/>
  <text x="180" y="65" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="9" fill="#666">main</text>
  <!-- Branch -->
  <path d="M110 46 Q135 22 165 22 H192" fill="none" stroke="#1D6AE5" stroke-width="3" stroke-linecap="round" stroke-dasharray="3 3"/>
  <circle cx="192" cy="22" r="7" fill="#1D6AE5"/>
  <text x="192" y="14" text-anchor="middle" font-family="Poppins" font-weight="800" font-size="9" fill="#1D6AE5">feature</text>
</svg>`;

add('L', {
  at: 3.50,
  kind: 'pop',
  x: 20,
  y: 62,
  w: 240,
  h: 76,
  html: gitTimelineSVG
});

// Badges / feature chips
add('L', {
  at: 4.20,
  kind: 'pop',
  x: 22,
  y: 154,
  w: 236,
  h: 36,
  html: CHIP('Installed on your computer', '#fff', '#F05032', 14)
});

add('L', {
  at: 4.75,
  kind: 'pop',
  x: 22,
  y: 196,
  w: 236,
  h: 36,
  html: CHIP('Runs 100% Offline (CLI)', '#fff', '#191919', 14)
});

add('L', {
  at: 5.30,
  kind: 'pop',
  x: 22,
  y: 238,
  w: 236,
  h: 34,
  html: CHIP('Tracks code history & snapshots', '#fff', '#1D6AE5', 13)
});

cut(6.20);

/* ---------- 3. FOCUS RIGHT: GitHub (Cloud Hosting & Collab) ---------- */
focus('R', 6.20);
label('R', 6.55, 'GitHub', { dur: 0.3, until: 9.80, out: 0.25 });

// Title
add('R', {
  at: 6.65,
  kind: 'wipe',
  x: 15,
  y: 18,
  w: 250,
  h: 30,
  html: TX('Cloud Hosting & Collab', 21, 800, '#191919')
});

// GitHub Pull Request Card
const prCardSVG = `<svg viewBox="0 0 240 76" style="width:100%;height:100%">
  <rect x="2" y="2" width="236" height="72" rx="12" fill="#F6F8FA" stroke="#24292F" stroke-width="2.2"/>
  <!-- Status badge -->
  <rect x="14" y="14" width="26" height="26" rx="6" fill="#E8F8EE" stroke="#1E9E55" stroke-width="1.8"/>
  <path d="M21 27L25 31L33 21" fill="none" stroke="#1E9E55" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="48" y="25" font-family="Poppins" font-weight="800" font-size="12" fill="#191919">Pull Request #108</text>
  <text x="48" y="36" font-family="Poppins" font-weight="600" font-size="9" fill="#656D76">main &lt;- feature-branch</text>
  <!-- Avatars / team -->
  <circle cx="27" cy="54" r="9" fill="#CFE1FA" stroke="#1459C4" stroke-width="1.2"/>
  <text x="27" y="57" text-anchor="middle" font-family="Poppins" font-weight="800" font-size="8" fill="#1459C4">Dev</text>
  <circle cx="45" cy="54" r="9" fill="#FFE2DC" stroke="#F05032" stroke-width="1.2"/>
  <text x="45" y="57" text-anchor="middle" font-family="Poppins" font-weight="800" font-size="8" fill="#F05032">Lead</text>
  <rect x="142" y="44" width="82" height="20" rx="10" fill="#1E9E55"/>
  <text x="183" y="58" text-anchor="middle" font-family="Poppins" font-weight="800" font-size="10" fill="#fff">MERGED</text>
</svg>`;

add('R', {
  at: 7.00,
  kind: 'pop',
  x: 20,
  y: 62,
  w: 240,
  h: 76,
  html: prCardSVG
});

// Badges / feature chips
add('R', {
  at: 7.60,
  kind: 'pop',
  x: 22,
  y: 154,
  w: 236,
  h: 36,
  html: CHIP('Cloud Website & Service', '#fff', '#24292F', 14)
});

add('R', {
  at: 8.15,
  kind: 'pop',
  x: 22,
  y: 196,
  w: 236,
  h: 36,
  html: CHIP('Code Review & Pull Requests', '#fff', '#1E9E55', 14)
});

add('R', {
  at: 8.70,
  kind: 'pop',
  x: 22,
  y: 238,
  w: 236,
  h: 34,
  html: CHIP('CI/CD Actions & Remote Backup', '#fff', '#7C4DFF', 13)
});

cut(9.80);

/* ---------- 4. SETTLE SUMMARY: Side by Side Neutral ---------- */
neutral(9.80);
label('L', 10.05, 'Git', { dur: 0.3 });
label('R', 10.05, 'GitHub', { dur: 0.3 });

// Left Box Summary: Hero Laptop + Info
add('L', {
  at: 10.15,
  kind: 'pop',
  x: 80,
  y: 28,
  w: 120,
  h: 120,
  html: IC.hero('laptop', '#F05032', '#FFF5F2')
});
add('L', {
  at: 10.35,
  kind: 'wipe',
  x: 20,
  y: 162,
  w: 240,
  h: 26,
  html: TX('Local Tool', 20, 800, '#191919')
});
add('L', {
  at: 10.50,
  kind: 'wipe',
  x: 20,
  y: 190,
  w: 240,
  h: 22,
  html: TX('Runs offline on machine', 14, 600, '#666666')
});
add('L', {
  at: 10.65,
  kind: 'pop',
  x: 45,
  y: 224,
  w: 190,
  h: 32,
  html: CHIP('CLI & COMMITS', '#fff', '#F05032', 13)
});

// Right Box Summary: Hero Cloud + Info
add('R', {
  at: 10.15,
  kind: 'pop',
  x: 80,
  y: 28,
  w: 120,
  h: 120,
  html: IC.hero('cloud', '#24292F', '#F6F8FA')
});
add('R', {
  at: 10.35,
  kind: 'wipe',
  x: 20,
  y: 162,
  w: 240,
  h: 26,
  html: TX('Cloud Platform', 20, 800, '#191919')
});
add('R', {
  at: 10.50,
  kind: 'wipe',
  x: 20,
  y: 190,
  w: 240,
  h: 22,
  html: TX('Remote hosting & team', 14, 600, '#666666')
});
add('R', {
  at: 10.65,
  kind: 'pop',
  x: 35,
  y: 224,
  w: 210,
  h: 32,
  html: CHIP('WEB & PULL REQUESTS', '#fff', '#24292F', 13)
});
