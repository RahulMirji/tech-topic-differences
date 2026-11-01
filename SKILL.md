---
name: tech-topic-differences
description: Use this skill when the user gives a script that explains the difference between two tech things (Docker vs Kubernetes, CI vs CD, REST vs gRPC, Terraform vs Ansible, stateless vs stateful ...) and wants the 'A vs B' motion-graphics reel with their webcam. Works for ANY 'A vs B' tech topic (DevOps, system design, networking, cloud, AI/ML, vibe coding, prompting; a 64-pair topic guide is built in). Output is a silent 1080x1920 MP4 where ONLY the top half carries graphics (two persistent white boxes with hard black shadows, official logo tiles, names under the boxes, the yellow WHAT'S THE DIFFERENCE? label, then each tool's box grows to cover the top half and builds its explanation piece by piece with premium pop/wipe/draw animations) and the bottom half is left empty for the creator's cam. Never uses full screen. Pulls accurate official logos. Colours: blue primary, cream background.
---

# Tech Topic Differences (A vs B reels)

Reverse-engineered frame by frame from a reference reel (10 pairs in 120 s: Docker/Kubernetes, Container/Pod, CI/CD, Horizontal/Vertical scaling, Load balancer/Reverse proxy, REST/gRPC, Terraform/Ansible, Logging/Monitoring, Stateless/Stateful, DevOps/MLOps), then extended with the creator's own **focus-swap** motion (section 6). Everything measured is in `reference/measurements.json`; 13 reference frames are in `reference/frames/`.

**Gold standard.** The visuals made for Docker vs Kubernetes, Container vs Pod, CI vs CD, Horizontal vs Vertical scaling, REST vs gRPC and Logging vs Monitoring are the quality bar and stay exactly as they are (verified pixel-identical after every engine change). Every new topic must match them: same colours, Poppins, official logos at the same tile sizes, same box/shadow/label details, one idea per element, simple and clean.

This skill is **self-contained**. It borrows only the background colour (#F7F5EF) and working habits from `script-to-motion-graphics-new`, which stays read-only and is never edited. Unlike that skill, **there is no full-screen mode here**: every frame is HALF.

## 0. Hard rules
1. **Top half only.** Graphics live in the top 720u x 640u (1080x960 px). The bottom half of the 1080x1920 frame is a flat `#F7F5EF` fill for the creator's cam. Nothing is ever drawn below y=640u (no captions, no watermark, no shadows that spill).
2. **No audio.** Silent MP4 (`-an`). The creator adds all sound.
3. **Real logos.** Every named tool gets its official mark via `kit/tools/logo.py` (section 8). Never redraw a brand logo by hand and never use an emoji. Concept icons (container, server, window, arrow, pod) are drawn by the kit in the reference style.
4. **The two boxes persist** for the whole video. Only their contents, labels and size change. They pop in once at the very start.
5. **State changes are hard cuts** (clear the boxes, swap labels). Things appear with pop / wipe / draw; they are never faded out slowly.
6. **Verify facts** before they go on screen (web search for what each tool does and the correct names).
7. **Nothing is pre-placed.** Every element (logo, service, icon, caption) enters at the moment it is spoken, never all at once at the start. When the diagram would crowd, the elements already on screen shrink and slide away (reflow, section 7b) so the new one gets the stage.
8. **Something moves every ~0.5 s** inside the big box (an entrance, a packet, a spinner, a meter, a reflow). The viewer must understand the concept from the motion alone, without reading; `tools/lint.py` warns on any stretch longer than ~1 s where nothing moves.
9. **No numbers or claims invented.** If the creator's script says it, it is on screen; icons illustrate, they do not add facts.

## 1. Inputs
A script for one or more **pairs**. Per pair the creator says, in this order (the reference format):
1. the two names ("Docker ... Kubernetes"), 2. "What's the difference?", 3. what A is or does, 4. what B is or does. Optionally real voice-over timestamps. If there are none, estimate at **3.0 words per second** and say so in the delivery. A pair lasts about 10 to 14 s.

## 2. Canvas and design tokens
Stage 720u x 640u, scaled 1.5 to 1080x960 (1u = 1.5 px). Colours: `--bg #F7F5EF` (from the existing skill), box `#FFFFFF`, ink/line `#0A0A0A`, text ink `#191919`.
**Blue family (primary, sampled from the reference):** `--blue #1D6AE5`, `--blue-d #1459C4` (outlines), `--blue-m #4C94F4`, `--blue-l #CFE1FA`, `--blue-xl #E8F1FD`; official marks keep their own colours (Docker `#1D63ED`, Kubernetes `#326CE5`). **Colour hierarchy:** black = names, blue = the drawings, **yellow = only the WHAT'S THE DIFFERENCE? question** (the single attention moment of a pair; never use yellow for names). Accents are semantic only: green `#1E9E55` (yes/stateful/https), red `#D3392F` (no/bad/http), orange `#F5A00B` and purple `#7C4DFF` (paired concepts such as CI vs CD), navy `#0F2A5C` (servers, arrows), yellow `#F8EC00` (only the WHAT'S THE DIFFERENCE? label).
**Font: Poppins** (800 for names, 900 for the yellow label, 500-700 inside boxes), bundled in `kit/assets/fonts`.

## 3. Geometry (measured in the reference, 720-wide frame)
| thing | value |
|---|---|
| box | 286u square, border 3u `#0A0A0A`, radius 3u, fill white |
| hard shadow | offset (-5u, +8u), blur 0, same black: it falls to the **lower left** |
| left box outer | x 56..341, right box x 379..664, gap 37u, top y 103u (bottom 389u) |
| interior | 280u x 280u; item coordinates are interior coordinates |
| name label | centred under its box, top 19u below the box, **plain black** `#0A0A0A` Poppins 800 about 47u, tracking -0.035em, **no outline, no pill, no shadow** (creator decision: the reference's white+outline labels sat on a dark camera feed and vanish on cream); two lines allowed for long names (use `\n`, size 40) |
| yellow label | `WHAT'S THE DIFFERENCE?` Poppins 900, tracking **+0.015em** (the reference's -0.078em made letters fuse; creator asked for a little space), fitted to 572u wide (about 43u), `#F8EC00`, black outline, hard shadow (3u,4u), centred at x 358 |
| FOCUS box (`BIG`) | x 56..664, y 52..548 (608 x 496u): the same side margins as the neutral state. Border 5u, shadow (-8u,+13u); label 6% larger below it |
Top margin of 103u in the neutral state keeps the boxes clear of the platform's top UI.

## 4. Anatomy of one pair (state machine, times in s, measured)
```
NEUTRAL (two boxes side by side)
 0.00  box 1 pops (0.25 s)        0.12 name 1 fades in
 0.75  box 2 pops                 0.87 name 2 fades in
 hold  ... until the narrator says "What's the difference?"
 1.80  names HARD CUT  ->  1.84 yellow label pops (0.17 s, 0.78->1.12->1.0)   hold ~0.8 s
 2.68  CUT: both boxes clear in one frame
FOCUS-SWAP explanation  (section 6)
 2.68  focus('L'): box A glides to BIG; first element pops ~0.5 s later
       A's pieces build one after another (0.3 to 1.2 s apart, paced by the narration)
 5.70  focus('R'): A glides back left, B scales up into the same central spot; B builds
 9.70  neutral(): B glides back right: both finished boxes side by side (the comparison); A's name returns
 10.9  CUT -> next pair (boxes persist; hero icons pop into the empty boxes; labels fade in)
```
**Two intro types.** (a) **Logo tile** (pair 1 when both are real tools): the box is filled by the official logo (box pops with it). (b) **Hero icon** (later pairs, concepts): the box is empty and a single hero icon pops in the box, 0.75 s before the other box's hero, each with its name label. Both are followed by the yellow label and the cut.
**Intro timing:** names at ~0.12 s and ~0.87 s after each box; the yellow label as soon as the narrator asks the question.

## 5. Animation primitives (measured at 24 fps; implemented in `kit/engine.tpl.html`)
| primitive | spec |
|---|---|
| box pop | scale easeOutBack (c1 1.8) from 0, 0.25 s, blur 4px to 0. Measured widths 0.5, 0.9, 1.10, 1.07, 1.015, 0.99 |
| element pop (`kind:'pop'`) | scale 0.5 + 0.5*easeOutBack(c1 2.6), 0.26 s, opacity 0 to 1 in 0.1 s, blur 4px to 0; peak 1.10 to 1.12 at 0.12 s |
| text wipe (`'wipe'`) | left-to-right clip reveal with blur 3px to 0, 0.45 s (one phrase) |
| arrow draw (`'draw'`, `dir`) | directional clip wipe 0.15 s |
| fade (`'fade'`) | opacity + blur 0.3 s |
| name label | opacity + blur 6px to 0 + scale 0.92 to 1, 0.3 s (0.15 s after a cut); plain black text |
| yellow label | pop 0.17 s with 12% overshoot; fitted on the first seek, after fonts load, always measured while visible |
| focus / neutral move | easeInOutCubic, 0.9 s, incoming box starts 0.05 s later (section 6) |
Hold a finished state while the narrator talks (2 to 4 s is normal). Longer than 4 s needs a small idle move (an arrow pulse, an LED blink); `tools/qa.py` flags it.

## 6. Focus-swap (the creator's custom explanation motion) 
After "What's the difference?" the explanation is not side by side:
1. **Box A grows.** At the cut, A's box glides from its slot to `BIG` (cover the top half); border and hard shadow scale up with it (3u to 5u, (-5,8) to (-8,13)); contents scale uniformly and stay centred; A's name follows the box's bottom edge. B's box is covered. A's pieces build inside the big box starting about 0.5 s after the move starts, so they land on an almost finished box.
2. **Swap.** When the narrator moves to B ("whereas Kubernetes ..."), exactly the opposite happens in one 0.9 s move: A's box shrinks and glides **back left to its slot** while B's box **scales up into the same central spot A stood in**. A's name fades out (0.25 s), B's name fades in under the growing box. A ends hidden behind B (the engine hides a fully covered box).
3. **Settle (optional, recommended).** At the end of the pair call `neutral(t)`: B glides back right, A reappears with its finished drawing, and both names are shown, so the viewer sees the two finished boxes side by side before the next pair's hard cut. Remove it if the creator wants to cut straight from the big box.
Premium details already built in: one easing curve for both boxes, incoming box 0.05 s late, scale-linked border and shadow, label tracking, content scaling by real size, covered-box hiding. Never use bounce on the focus move; overshoot is only for pops.
API: `focus('L'|'R', t, {dur, delay})`, `neutral(t, {dur})`, constant `BIG` (change its numbers if the creator wants a smaller big box).

## 7. Box content design system
Contents are authored once in 280u interior coordinates and scale with the box, so write for the **neutral size** and they read well at 1.74x in the focus state.
**Style of the reference illustrations:** flat, rounded, light-blue fills (`#E9F2FF`) with 3 to 3.8u `#1459C4` outlines, solid `#1D6AE5` for headers and sides, isometric 3-face objects (front light, top lighter, right side solid blue with 5 to 6 vertical ribs), white window cards with a blue header bar and three white dots, LED dots (green, orange) on servers, thick rounded arrows (stroke 6.4 in a 24x40 box, round caps). Text inside: Poppins 600 to 800, **title 25 to 28u, label 16 to 20u, caption min 15u** (the reference used 13u, too small on phones). At most 3 to 4 elements per box; one idea per element.
**Layout rule:** vertical flow is the default (text, icon, arrow, result); use a 2 x 2 grid for "many of the same" (4 containers) with arrows to the layer below; a three-step row for pipelines with captions under each icon.
**Patterns seen in the reference (reuse them):**
- A. *Vertical flow with arrows* (Docker: "application" text, window icon, arrow, container).
- B. *Fan-out grid* (Kubernetes: four containers, two arrows, two servers, the word "servers" between the arrows).
- C. *Title + step row* (CI/CD: bold title "Continuous Integration" in two lines wiped in word by word, then 3 steps: Code Pushed, Build, Test; the pair uses an orange vs purple accent).
- D. *Scaling diagrams* (navy server icons, a bracket with "Load Distributed" over three servers popping one by one, a double-headed arrow drawing outward from the centre; the other box: one small server then text "Adding Resources & Memory" then an arrow to a bigger server).
- E. *Terminal card* (dark navy window, three traffic-light dots, log lines with coloured levels INFO green, WARN yellow, ERROR red, DEBUG blue) and *dashboard cards*: three empty coloured rounded cards pop first (blue, grey, green), then their content fills in (65% ring, sparkline, a check mark and "Healthy").
- F. *Semantic contrast* (http:// red with a closed red lock vs https:// green with a green lock; Stateless "no memory" red vs Stateful "Always Stores Data" green).
- G. *Brand-tile intros* (REST API white cloud on blue `#0A66F5`, gRPC white wordmark on `#244C5A`, Terraform on `#5C4EE5`, Ansible on `#1A1918`).
- H. *Logo rows* (browser logos Chrome, Edge, Safari side by side; tool logos around a diagram, e.g. Terraform at the top with arrows to Server, Network, Storage).
- I. *Cycle diagrams* (DevOps vs MLOps: blue vs purple loops with labelled segments).
- J. *Tree diagrams* (load balancer: users on top, a node, branches to servers).
**Skeleton-then-fill:** for dashboards and cards, pop the empty shapes first, then add their content 0.25 to 0.4 s later; this reads as premium.
**Cadence:** items appear 0.3 to 1.2 s apart, each **0 to 200 ms before** the word that names it. Arrows draw right after the thing they leave. The last element lands about 1 s before the narrator moves on.
**Builders in the kit** (`kit/engine.tpl.html` + `kit/builders.js`; all return SVG/HTML sized by the item's `w`/`h`):
| pattern | builders |
|---|---|
| A vertical flow | `IC.win(glyph)`, `IC.arrow(dir,color)`, `IC.container(logo)`, `TX(text,size,weight,color)`, `TXL('line1\nline2',size)` |
| B fan-out grid | `IC.container`, `IC.arrow`, `IC.server(n)`, `IC.pod(n)` |
| C title + step row | `TXL` title, `stepRow(side,{at,every,y,steps:[{icon,cap,color,bg}]})` (auto-fits 280u, draws arrows between steps), `IC.step(icon,cap,color,bg)` |
| D scaling diagrams | `IC.tower(color)`, `IC.dbl('h'|'v',color)` double arrow, `IC.bracket(color)` |
| E terminal + dashboard | `IC.terminal([[time,'INFO|WARN|ERROR|DEBUG',message],...])`, `IC.skel('blue|grey|green')` then `IC.cpu(65)`, `IC.rate()`, `IC.health()` (skeleton first, content `kind:'fade'` 0.8 s later with `z:2`) |
| F semantic contrast | `IC.secure(ok,'https://')` (green closed lock / red open lock), `CHIP(text,fg,bg,size)` |
| G brand tiles | `tile(side,at,slug,'white'|'brand',hex,{fit,kind})` for real logos (colour-only marks such as gRPC are turned white automatically on a brand tile), `tileHTML(side,at,bg,html,{kind})` for custom art, `IC.rest()` (REST API cloud + gear) |
| H logo rows | `logoRow(['googlechrome','firefox','safari'],size,gap)` (official multi-colour marks), `IC.logo(slug,color)`, `IC.logoc(slug)` |
| I cycle hero | `IC.cycle({colors,labels,center,centerColor})` ring with curved upright labels (3 to 6 segments) |
| J tree | `IC.tree(n)` (users, node, n servers) |
| generic | `IC.hero(lucideName,color,bg)` big rounded concept tile (intro of concept pairs), `IC.glyph(name)`, `IC.bare(name,color,sw)`, `lu(name,x,y,size,color)` inside any SVG |
Anything else comes from the 43 bundled Lucide icons in `kit/assets/icons`, or write a new SVG builder in the same style (flat, 3u outlines, light fills, blue family) and put it at the top of `config.js`.
**More builders** (`kit/builders2.js`, for system design, networking, cloud and AI topics): `IC.avatar(icon,color,bg)` (person, bot, laptop, server tiles), `IC.badge(icon,color)`, `IC.ok/no/warn`, `IC.db(color)` cylinder, `IC.cache()`, `IC.env(color)` envelope, `IC.tube()`, `IC.node(letter,color)`, `IC.tri(labels,hi)` (CAP triangle), `IC.docs(n)`, `IC.scatter(hiCluster)` (vectors), `IC.json(extra,variant)`, `IC.code(lines,title)` (syntax-coloured editor/terminal), and HTML pieces `BUB(text,'user'|'ai')`, `PROMPT(text)`, `FRAME(label,color)` (dashed container), `BTN(text,'ok'|'no'|'neutral'|'ghost')`, `ROW(cells,{head,bg,hi})`, plus `pairFrame(P,opts)` (the whole measured pair state machine in one call; see `examples/topics_demo.config.js`).
Examples: `kit/examples/docker_vs_k8s.config.js` (logo tiles, containers, servers, pods), `kit/examples/patterns_demo.config.js` (CI/CD, scaling, logging/monitoring, REST/gRPC) and `kit/examples/topics_demo.config.js` (ten new topics with reflow stacks, packets, meters and fx).

## 7b. Progressive reveal and reflow (how every element enters)
The deeper flow: the diagram is **built while it is spoken**, and the stage is reused, not filled up.
`stack(side,{mode,area,hist,dur,lead,arrows}).add({at,w,h,html,kind})` places elements by itself (you never compute x/y):
- **`trail`** (default for sequences): the newest element is big in the middle; everything before it shrinks (about 50%) and slides into a **row along the top** with small arrows; a straight arrow points from the row into the newest. Perfect for flows (user > gateway > service > database), auth steps, vibe-coding steps.
- **`cascade`**: the newest is big at the bottom; earlier ones shrink and stack upward (top to bottom story).
- **`grid`**: all elements share a grid that **re-tiles** (cells shrink, last row centred) every time one more arrives. For "many of the same" (services, replicas, subscribers): `arrows:false`.
Details that make it feel premium: elements are built at natural size and scaled by transform (SVG and text shrink together); the reflow starts `lead` = 0.2 s **before** the new element pops so its slot is already clear; the reflow takes 0.55 s with easeInOutCubic; arrows rotate and re-attach smoothly when an element is demoted into the row. Give history-worthy elements a caption inside their own html (`IC.step(icon,caption)`), so the shrunken row stays readable. Use `trail` for at most 4 to 5 elements per side, `grid` up to 9.
Rule of thumb: if two things are on screen and a third is about to be spoken, use a stack; if the explanation is one picture that fills in (a table, a terminal), place items directly.

## 7c. Motion vocabulary and the beat budget
Each side has **6 to 9 beats, one every <= 0.7 s** (a beat = anything that visibly changes). Break every explanation into small frames: show the thing, show the action, show the result, show the consequence.
- **Entrance kinds** (`kind`): `pop` (default, measured spring), `wipe`, `draw`, `fade`, `static` (original) plus `slide` (`from:'left'|'right'|'up'|'down'`, `dist`), `grow` (`axis`, meters and bars), `drop`, `type` (typewriter, use `typeText()`), `count` (number ticker, use `countNum()`).
- **Persistent fx** (`fx:[...]` on any item; they keep a box alive between entrances): `path` (keyframes `[time,dx,dy,scale,rot]`, eased: envelopes flying, snippets being copied, a highlight bar reading lines), `loop` (a packet travelling an arrow again and again), `pulse`, `bob`, `shake` (rejection), `blink` ("waiting..."), `spin` (loading, training), `dim`, `hide`.
- **Helpers:** `say(side,at,text,{y,size,color})` (centered caption), `pkt(side,{at,from,to,period,n,color,until})` (packets, `n` staggered copies; fast vs slow packets show speed difference), `meter(side,{at,x,y,w,pct,color,fillDur})` (fill speed shows cost), `countNum`, `typeText`, `thinking`.
- **Meaning by motion:** speed = packet period or meter fill time; waiting = spinner + blink; rejection = shake + red cross; parallel = several packets at once; reuse = one item feeding many arrows; permanence = lock badge; change over time = path fx.
- **Cadence:** each element appears 0 to 200 ms **before** its word; a caption wipes in last, naming the idea in <= 4 words ("Fixed schema", "Replies arrive later").

## 7d. Topic library: 64 pairs, 8 visual types
`reference/topics.md` (and `topics.json`, read by `tools/plan.py`) gives every pair a type and a beat-by-beat plan for both sides, using only kit builders. Pick the type, then adapt the plan to the creator's sentences.
| type | idea | typical builders |
|---|---|---|
| FLOW | components, arrows, packets between them | `stack` trail/grid, `IC.tower/db/cache/tree/node`, `pkt` |
| TIME | what happens over time (handshakes, waits, requests) | `pkt`, `CHIP` (SYN/ACK), spin/blink fx, `countNum` |
| SPEED | same action, different speed or cost | `pkt` period, `meter` fillDur, `countNum`, `IC.cache` |
| SHAPE | two structures side by side, one rule broken to show the difference | `ROW`, `IC.json/docs/scatter/tri`, `stack` grid, `FRAME` |
| ROLE | who acts (human vs AI), a trail of steps | `stack` trail, `IC.step`, `IC.avatar(user/bot)`, `BTN`, `IC.code` |
| TEXT | prompts, rules, context | `PROMPT`, `BUB`, `FRAME`, `CHIP`, `typeText` |
| RISK | outcome and danger | `IC.ok/no/warn/badge`, `IC.secure`, shield, attacker avatar, `pkt` red |
| LOOP | cycles and repetition | `IC.cycle`, `spin`, `countNum`, repeated steps |
Colour convention: human = blue, AI/agent = purple (`#7C4DFF`), speed/warning = orange, safe/yes = green, risk/no = red, servers/data = navy; yellow stays reserved for the question label. Official logos wherever a real tool is named (`logo.py`); pieces for tools without a logo are generic icons, never fake marks.
Worked examples per type (all lint-clean and rendered): `kit/examples/topics_demo.config.js` covers SQL/NoSQL, Cache/Database, Sync/Async, Queue/Pub-Sub, TCP/UDP, Authentication/Authorization, Training/Inference, Vibe coding/Traditional, Chat/Agent, Working/Secure code.

## 8. Assets: accurate logos (the part the creator cares most about)
`python3 tools/logo.py docker kubernetes terraform ansible grpc chrome safari firefox postgres redis nginx github --out assets/logos`
- Resolves the name (aliases such as `k8s`, `postgres`, `chrome`) in **simple-icons** (official paths + official brand hex), **devicon** (multi-colour official marks) and **lobe-icons** (AI brands) by sparse-cloning them from GitHub (reachable from the sandbox). Writes `<slug>.svg` (mono, filled with the brand hex) and `<slug>.color.svg` (multi-colour) and prints JSON with the recommended **tile** (`white` = coloured glyph on white, `brand` = white glyph on a brand-colour tile) and the `fit` (glyph size inside the box).
- Marks are the sources' own paths: never edit, recolour (except the official hex), stretch or redraw. Cite trademark use as editorial.
- Tile rules measured from the reference: Docker `white` `#1D63ED` fit 0.86 (whale = 86% of the box width); Kubernetes `white` `#326CE5` fit 0.75; others default fit 0.72. Ansible `brand #1A1918`, Terraform `brand #5C4EE5`, gRPC `brand #244C5A`. The engine fits the glyph by its **real bounding box**, not its viewBox.
- Not available (the tool says so and suggests names): Microsoft Edge, many cloud-vendor product icons, "REST API" (generic). Tell the creator which marks are missing, offer a text wordmark, and ask for a download if they want the real one. Product screenshots and photos can only come from the creator (the sandbox cannot fetch company sites).
- Use `logoc` (colour) for small multi-colour marks (Chrome, Safari, Firefox); use mono + hex for tiles and for logos on illustrations.
`kit/assets/logos` already holds docker, kubernetes, terraform, ansible, grpc, chrome (`googlechrome`), safari, firefox, postgresql, redis, nginx, github, python, typescript, react.

## 9. Workflow
1. **Read the script, split it into pairs** and each pair into four segments: names, question, A, B. Verify names and facts (web search). Decide per pair: tile intro (real tools with logos) or hero intro (concepts).
2. **Plan the timeline.** Put the script in a text file (`# A vs B` header, then the names/question line, what A does, what B does) and run `python3 tools/plan.py script.txt` (add `--wps` or use the creator's timestamps): it prints the estimated times and writes `config.skeleton.js` with the whole state machine (names, yellow label, cut, focus L, swap, settle, next pair) and TODO pieces spaced through each explanation. The skeleton also prints the matching **recipe from the 64-pair topic guide** (type, left and right beats, assets). Then the **storyboard table** (one row per piece, 6 to 9 beats per side, each element entering at its spoken word): time (estimated at 3 wps, or the creator's timestamps), spoken words, box, element (pattern A to J), builder or asset, kind (pop/wipe/draw/fade), interior x,y,w,h. Mark the focus and settle moments. One idea per box; if a box needs more than 4 elements, simplify the sentence.
3. **Assets**: run `logo.py`; list which marks are real and which are placeholders.
4. **Project setup** (note: the tool shell may be plain `sh`; never use brace expansion in `mkdir`/`cp`, write explicit paths):
   `cp -r /mnt/skills/plugins/tech-topic-differences/kit /home/claude/work && cd /home/claude/work` (the skill folder itself stays read-only).
5. **Write `config.js`** with the API below (use `pairFrame()` and `stack()`; place nothing before it is spoken) (start from `config.skeleton.js` or one of the two examples). Set `window.DURATION`.
6. `python3 build.py config.js scene.html`, then `python3 tools/lint.py` (must print `OK`: it samples every 0.2 s for items outside the 280u interior, labels below y=640u or overlapping, boxes overlapping, a wrong yellow-label width), then `python3 preview.py pv/a.png t1 t2 ...` (prints page errors; view the sheet; check intro, the grow, the swap, the finished boxes). Fix overlaps, label overflow, icon sizes.
7. **Compare with the reference** when it is available: `python3 tools/compare.py reference.mp4 pv/cmp.png ref_t:our_t ...`.
8. **Render** (resumable, detached): `(setsid nohup python3 render.py scene.html out.mp4 > render.log 2>&1 < /dev/null &)` then poll: `for i in $(seq 1 20); do grep -q "^done" render.log && break; sleep 6; done`. About 700 frames take under a minute. To fix a few frames delete only those jpgs in `frames/` and rerun.
9. `python3 tools/qa.py out.mp4`: size 1080x1920, 0 audio streams, flat bottom half, no static hold longer than 4 s. View `pv/final.png`.
10. **Deliver** `out.mp4` plus a zip of the source (config.js, scene.html, build.py, render.py, assets). Reply in 2 to 3 sentences: duration, how many pairs, timing assumption (3 wps or the creator's timestamps), which logos are official marks and which are missing or placeholders, and one line that the bottom half is empty for the cam.

### Config API (absolute seconds; sides are 'L' and 'R')
```js
window.DURATION = 23.6;
boxPop('L',0.00); boxPop('R',0.75);                         // only once, at the start of the video
tile('L',0.00,'docker','white','#1D63ED',{fit:.86});         // official logo tile (pair intro type a)
label('L',0.12,'Docker',{until:1.80});                       // name; \n for two lines; opts: dur, until, out (fade-out s), size
wtd(1.84,2.68);                                              // yellow WHAT'S THE DIFFERENCE? (hard cut of names at 1.80)
cut(2.68);                                                   // clears every item and label in both boxes in one frame
focus('L',2.68);                                             // A grows to cover the top half; focus('R',t) swaps
add('L',{at:3.2,kind:'pop',x:97,y:56,w:75,h:62,html:IC.win('box')});
add('L',{at:3.3,kind:'wipe',x:65,y:21,w:150,h:24,html:TX('application',19,600)});
add('L',{at:4.3,kind:'draw',dir:'down',x:118,y:120,w:24,h:40,html:IC.arrow('down')});
neutral(9.7); label('L',9.95,'Docker',{dur:.3});             // settle: both finished boxes side by side
cut(10.9);                                                   // next pair; boxes persist
```
To correct a name as the narrator speaks (REST then REST API): end the first label with `until`, start the second label at that time with `dur:.01`.

## 10. QA checklist
- Pacing: no `PACE` warning from the lint on the new topics (something moves at least every ~1 s while a box is big); every element enters at its spoken word; crowded diagrams use a stack.
- `python3 tools/lint.py` prints `OK` (it already catches interior overflow, label collisions, anything below the half line).
- Page errors: none (preview prints them). Fonts loaded (Poppins), not a fallback.
- Geometry: boxes at the measured positions; the grow ends exactly on `BIG`; the covered box is hidden (no sliver at the right edge); name labels never clipped by y=640u.
- Name labels are plain black with no outline or pill; the yellow label is the only coloured text.
- Real assets: logos are the resolver's own paths; each tile uses its recommended style and fit.
- Text legible at phone size (captions 15u or larger); no element crosses the box border in the neutral state.
- Motion: pops overshoot about 10%, the focus move is smooth (check `geoAt` values are monotonic), hard cuts are single-frame.
- Output: 1080x1920, no audio, bottom half flat, nothing in the bottom half.

## 11. Gotchas learned while building this skill
- **Shell:** `mkdir -p kit/{a,b}` in plain `sh` creates one folder literally named `{a,b}`. Use explicit paths.
- **Name label colour:** white text with an outline (the reference look) is invisible-ish on the cream background; six options were rendered and compared and the creator chose plain black text (no pill, no outline). Only the yellow question label keeps `-webkit-text-stroke` plus `paint-order: stroke fill` (a stroke heavier than 7u makes Poppins look blobby).
- **Yellow label fit:** measure an inner inline-block span (`offsetWidth`), not the 720u wide container, or the text comes out tiny.
- **Logo size:** fit by the glyph's real bbox (`getBBox`), because the same 24-unit viewBox holds very different shapes (whale 86% wide, wheel 75%).
- **Uncovered sliver:** a covered box peeks by 1 to 3u at the edge; hide it once the focused box is fully grown.
- **Two-line labels:** `white-space: pre-line`, size 40, keep them inside the 640u line.
- **Timing source:** the reference was 23.98 fps; render at 30 fps from times in seconds, never in frames.
- **Pair length:** about 10 to 14 s; more than 4 s of nothing moving needs an idle move.
- **Measure visible:** `display:none` elements report width 0, so a label fitted while hidden got a 25,000px font (it only worked for the first pair by luck). All fits now run on the first seek, inside `meas()` which makes the element visible-but-hidden first.
- **Wipe clip:** a finished `wipe` must remove its clip-path, or text wider than its item is cut ("Resources & Mer").
- **Two-line names:** two lines run past y=640u in the big state, so every `\n` name has a single-line twin that cross-fades in as the box grows.
- **Step rows:** 3 steps of 84u with 24u gaps are 300u wide and overflow the 280u interior; `stepRow` now auto-fits.
- **Colour-only logos:** gRPC has no mono mark; on a brand tile the engine applies `filter:brightness(0) invert(1)` to the colour logo to get the white glyph.
- **Yellow label tracking:** negative tracking below about -0.03em fuses the outlined letters; keep it slightly positive.
- **Number formatting:** `count` uses `fmt()`, defined in `motion.js`.
- **Regression proof:** after any engine change, snapshot the old examples before and after and diff them; the extensions here left 24 sampled frames pixel-identical.
- **Reflow lead:** start the reflow slightly before the new element pops (`lead`), otherwise it pops while older items still glide through its slot.
- **Trail arrows:** the arrow into the newest element is drawn vertically from the row's bottom, not from the last small item (that slanted).
- **Do not:** pre-place elements that are not yet spoken, leave a box static for more than ~1 s, use full screen, draw below the half line, add audio, redraw logos, show more than 4 elements per box, fade out slowly instead of hard cutting, bounce the focus move.
