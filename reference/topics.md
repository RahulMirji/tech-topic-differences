# Topic guide: 64 pairs, one visual plan each

Every plan uses ONLY kit builders. Each side = 6 to 9 beats, one every <= 0.7 s; every element enters when it is spoken; use a reflow `stack()` when the diagram gets crowded; hold states keep moving (packets, spinners, meters). `demo` points to the worked example in `kit/examples/`.

## Visual types

- **FLOW**: components + arrows + packets travelling between them (use a trail/cascade stack when it gets long)
- **TIME**: something that happens over time (handshakes, requests, timelines): packets with chips, counters, toggles
- **SPEED**: the same action at different speed/cost: packet speed, meters filling, counters ticking
- **SHAPE**: two structures side by side (tables vs documents, layers, stacks): pieces pop in, one rule is broken to show the difference
- **ROLE**: who does what (human vs AI): a trail of steps, each step badge-ed with who acts
- **TEXT**: prompts, rules, context: bubbles, prompt cards, dashed frames, chips arriving one by one
- **RISK**: outcome and danger: green check vs red cross, shield, attacker, warning badges
- **LOOP**: cycles and repetition: ring/cycle icons, spinners, counters, repeated steps

## Pairs

| # | pair | type | left side | right side | assets | demo |
|---|---|---|---|---|---|---|
| 1 | Docker vs Kubernetes | FLOW | window(application) > arrow > container | 4 containers pop one by one > arrows > servers | logos: docker, kubernetes (tiles) | docker_vs_k8s #1 |
| 2 | Container vs Pod | SHAPE | container hero > Application arrow > Instance caption | 2 pod outlines > containers drop inside one by one | IC.container, IC.pod | docker_vs_k8s #2 |
| 3 | CI vs CD | LOOP | cycle hero (orange) > title > Code Pushed > Build > Test (stepRow) | cycle hero (purple) > title > Same Code > Deploy > Production (stepRow) | IC.cycle, stepRow | patterns_demo #1 |
| 4 | Horizontal scaling vs Vertical scaling | SHAPE | bracket > towers pop 1,2,3 > double arrow | small tower > text > arrow > bigger tower | IC.tower, IC.bracket, IC.dbl | patterns_demo #2 |
| 5 | Load balancer vs Reverse proxy | FLOW | 3 users pop > balancer node > servers pop; packets go round-robin, one colour per server > say "Spreads traffic" | client > shield proxy > server dims behind it > cache + TLS chips pop > say "Speaks for the server" | IC.tree, IC.avatar, IC.badge(shield), logo nginx |  |
| 6 | REST vs gRPC | SHAPE | logo row (browsers) > http red lock vs https green lock | binary chip > two gears > double arrow | tileHTML(IC.rest), tile(grpc), logoRow | patterns_demo #4 |
| 7 | Stateless vs Stateful | TIME | client > server; request "cart:1 item" > server blinks memory-off > client resends EVERYTHING each time (growing chip) > say "Sends it all again" | client > server + db; session chip > db cylinder fills with the item > second request is tiny > say "Remembers you" | IC.avatar, IC.tower, IC.db, CHIP, pkt |  |
| 8 | Logging vs Monitoring | SHAPE | terminal card with coloured log levels | 3 skeleton cards pop > fill: CPU ring, rate sparkline, health check | IC.terminal, IC.skel, IC.cpu/rate/health | patterns_demo #3 |
| 9 | Terraform vs Ansible | FLOW | tile intro (brand purple / black) > .tf file > terraform logo > servers pop one by one > say "Creates infrastructure" | ansible logo > existing servers > gears spin > checklist ticks > say "Configures it" | logos: terraform, ansible; IC.tower, IC.bare(settings, list-checks) |  |
| 10 | DevOps vs MLOps | LOOP | blue cycle ring CODE BUILD TEST DEPLOY MONITOR, spinner in the centre | purple ring DATA TRAIN EVALUATE DEPLOY MONITOR RETRAIN; model node + data docs feed it | IC.cycle (two colours), IC.docs, IC.avatar(brain) |  |
| 11 | SQL vs NoSQL | SHAPE | table header + rows slide in > row with an extra column is rejected (shake, red cross) > "Fixed schema" | 3 JSON cards with different shapes > new doc with an extra field slides in and fits (green check) > "Any shape fits" | logos postgresql, mongodb; ROW, IC.json | topics_demo #1 |
| 12 | Cache vs Database | SPEED | user > cache tile; fast orange packets + "~1 ms" chip + meter fills in 0.35 s | user > database; slow blue packet + "~50 ms" chip + meter crawls 1.7 s | IC.cache, IC.db, pkt, meter | topics_demo #2 |
| 13 | Monolith vs Microservices | SHAPE | ONE big box; feature chips (Auth, Cart, Pay) pop INSIDE it; a change makes the whole box pulse red (rebuild everything) | small services pop one by one in a re-tiling grid, each with its own db; one fails (shake, red cross) and the rest keep their green checks | stack grid, IC.container/IC.db, CHIP, IC.no/ok |  |
| 14 | Sync vs Async | TIME | client > server; hourglass spins, "waiting..." blinks; reply returns, then the next request | 3 packets leave in parallel; "doing other work" meter keeps filling; replies arrive later with checks | IC.bare(hourglass), pkt, meter | topics_demo #3 |
| 15 | Message queue vs Pub/Sub | FLOW | producer > tube; envelopes enter; each goes to ONE consumer (alternating) and gets a check | publisher > topic node; each message splits into copies; EVERY subscriber gets one | IC.tube, IC.env, IC.node, path fx | topics_demo #4 |
| 16 | Replication vs Sharding | SHAPE | one db > identical copies pop with sync arrows > "same data everywhere" | one big db splits into 3 parts labelled A-H / I-P / Q-Z > "different data per node" | IC.db (3 colours), CHIP, IC.dbl |  |
| 17 | Consistency vs Availability (CAP) | SHAPE | triangle C+P lit; network cut (dashed, red cross); node answers "error" until it is in sync | triangle A+P lit; both nodes answer but one shows an older value chip (v1 vs v2) | IC.tri, IC.node, CHIP |  |
| 18 | Latency vs Throughput | SPEED | ONE packet makes one trip; ms counter ticks up (countNum) | many packets stream through a pipe; req/s counter climbs | pkt (n:6), countNum, IC.tube |  |
| 19 | CDN vs Origin server | FLOW | far-away origin; packet takes a long slow path; "200 ms" counter | user + nearby edge nodes (globe); one copy flies origin > edge once; packet is short and fast "20 ms" | IC.hero(globe), IC.tower, pkt, countNum |  |
| 20 | Rate limiting vs Throttling | TIME | requests stream; counter hits the limit; a door closes; extra requests bounce with a "429" chip | requests keep coming but the packet period lengthens (slows); all are served, slowly | pkt (period changes via 2 pkts), CHIP, IC.badge(lock) |  |
| 21 | HTTP vs HTTPS | RISK | packet carries "password: 1234" in plain sight; attacker avatar (bug) reads it, red cross | same packet shows a padlock and "8f3a..." gibberish; attacker blocked | IC.secure, CHIP, IC.avatar(bug) |  |
| 22 | TCP vs UDP | TIME | SYN, SYN-ACK, ACK chips cross; connected check; data + confirmations; one packet lost, "resend" | "No handshake"; 4 fast packets; one lost with a red cross and NO resend | CHIP, pkt, IC.no | topics_demo #5 |
| 23 | WebSocket vs HTTP polling | TIME | (polling) client asks "new?" > "no" > "no" > "yes": alternating packets, request counter climbs | one open tube; messages pushed both ways instantly (envelopes) | pkt both directions, countNum, IC.tube |  |
| 24 | Forward proxy vs Reverse proxy | FLOW | dashed frame "your network" around the CLIENTS; shield proxy in front of them; arrows to the internet | dashed frame around the SERVERS; shield proxy in front of them; arrows from the internet | FRAME, IC.badge(shield), IC.avatar, IC.tower |  |
| 25 | API gateway vs Load balancer | FLOW | front door: Auth, Routing, Rate-limit chips pop; routes to 3 DIFFERENT services | balancer spreads packets over 3 COPIES of one service | CHIP, IC.tree, IC.tower, pkt |  |
| 26 | Authentication vs Authorization | RISK | trail: You > Show ID > Verified | trail: Logged in > Profile (open) > Billing (closed) > Admin (locked) | stack trail, IC.step | topics_demo #6 |
| 27 | Cookies vs JWT | SHAPE | browser stores a cookie with a session id; server looks it up in a session db on every request (lookup arrows) | token chip with 3 coloured parts travels with the request; server verifies the signature (key); db is dimmed, no lookup | IC.bare(cookie), IC.db, CHIP, IC.badge(key) |  |
| 28 | VM vs Container | SHAPE | layers pop: hardware > host OS > hypervisor > 2 VMs each with its OWN guest OS; heavy meter | hardware > host OS > runtime > containers sharing one OS; small meter | stack cascade, IC.container, meter |  |
| 29 | Docker image vs Container | SHAPE | image = locked read-only blueprint (docs stack + lock) | container with a play spinner; copies pop from one image | IC.docs, IC.badge(lock), IC.container, spin fx |  |
| 30 | Blue-green vs Canary | TIME | blue env live, green ready; traffic arrow flips 100% to green in one move | traffic split 95/5 (mostly one lane) > 50/50 > 100/0 with a growing meter | pkt (lanes), meter, IC.tower (blue/green) |  |
| 31 | Serverless vs Servers | SPEED | function icon pops ONLY when a request arrives and vanishes after; coin counter ticks per run | server always on (LED blinks), idle; cost counter keeps ticking | IC.bare(zap), IC.tower, countNum, blink fx |  |
| 32 | Helm vs Kustomize | SHAPE | template with placeholders > values file fills them > manifests typed out | base yaml + overlay patch cards merge > final manifests | logo helm; typeText, IC.hero(layers/merge) |  |
| 33 | Git merge vs Rebase | TIME | two branch lines with commit dots; feature merges back with a merge commit (diamond) | feature commits slide on top of main (path fx) > straight line history | IC.node, IC.dbl/line draws, path fx |  |
| 34 | Observability vs Monitoring | SHAPE | dashboards + a bell for KNOWN questions | logs + metrics + traces pillars > search > a "why?" chip drills down to the cause | IC.cpu/rate, IC.bare(bell,search), CHIP |  |
| 35 | Metrics vs Traces | SHAPE | sparkline chart + number counting up (req/s) | waterfall: bars grow one after another across services with timing chips | IC.rate, countNum, grow bars (meter) |  |
| 36 | Training vs Inference | LOOP | docs > brain; spinner; epoch counter; accuracy meter fills | locked brain answers two questions with chat bubbles | IC.docs, IC.avatar(brain), BUB, countNum, meter | topics_demo #7 |
| 37 | RAG vs Fine-tuning | FLOW | question > search docs > snippet attached to the prompt > LLM answers (model locked) | dataset > weights update (brain recolours) > new model; "knowledge baked in" | IC.docs, IC.bare(search), BUB, IC.avatar(brain) |  |
| 38 | LLM vs AI agent | ROLE | prompt > one text answer bubble, nothing else | goal > plan checklist > tool icons (search, code, api) used in a loop > result | BUB, stack trail, IC.step, list-checks |  |
| 39 | Vector DB vs Traditional DB | SHAPE | scatter plot with clusters; query dot > nearest cluster ringed "similar meaning" | table; WHERE id = 3 highlights ONE row "exact match" | IC.scatter, ROW, logos postgresql |  |
| 40 | Prompt engineering vs Fine-tuning | TEXT | vague prompt retypes into a detailed one (typeText); model stays locked; cheap and fast meters | dataset trains the model (weights change); expensive and slow meters | typeText, PROMPT, meter, IC.avatar(brain) |  |
| 41 | Vibe coding vs Traditional coding | ROLE | trail: prompt > AI writes > code > Accept | you type code line by line; a highlight bar reads each line; understood check | stack trail, IC.code, PROMPT | topics_demo #8 |
| 42 | Vibe coding vs AI-assisted coding | ROLE | AI generates; Accept-all button pulses; no review | AI proposes a diff; you review (red/green lines), edit (pencil), steer, accept selectively | BTN, IC.code (diff), IC.bare(pencil, eye) |  |
| 43 | Prompt vs Context | TEXT | one prompt bubble: what you type | dashed "Context window" frame fills with file, history and rules chips one by one | PROMPT, FRAME, CHIP, stack grid |  |
| 44 | Chat vs Agent | ROLE | answer with code in a bubble; copy icon; snippet flies into a file by hand | agent bot; 3 files get sparkles; terminal runs npm test; "all green" | BUB, IC.code, path fx, IC.badge(sparkles) | topics_demo #9 |
| 45 | Autocomplete vs Agentic coding | ROLE | one line types, grey ghost text completes it, Tab check | plan checklist > files change > tests > done (trail) | typeText, IC.code, stack trail |  |
| 46 | Zero-shot vs Few-shot | TEXT | prompt with no examples > unsure answer (question mark chip) | 2 or 3 example cards stack in one by one > prompt > answer in the right format | PROMPT, stack grid/trail, BUB |  |
| 47 | Vague prompt vs Specific prompt | TEXT | "make a login page" > a generic, off-target result window | chips pop one by one (stack, behaviour, edge cases, constraints) > precise result | PROMPT, CHIP, IC.win, stack trail |  |
| 48 | Plan mode vs Build mode | TIME | checklist of steps pops; you approve with a thumbs-up BEFORE any code changes | code window changes at once; "files changed" counter climbs | list items, BTN, countNum, IC.code |  |
| 49 | System prompt vs User prompt | TEXT | standing rules card pinned on top (pin/lock) and stays for every request | a new bubble each time; the old one is replaced | PROMPT, IC.badge(lock), BUB |  |
| 50 | Context window vs Memory | TEXT | dashed window fills with items; meter reaches full; the oldest item scrolls off the top and fades | notebook icon: session 1 writes a note; session 2 reads it back | FRAME, meter, IC.bare(book-open), path fx |  |
| 51 | Rules file vs Prompt | TEXT | rules.md tag attached to three requests in a row (permanent) | one-off prompt used once, then gone; next request has no tag | IC.bare(file-text), PROMPT, CHIP |  |
| 52 | One big prompt vs Small iterative prompts | LOOP | giant wall of text > one messy output with red crosses | small prompt > check > next prompt > check; blocks stack into a tower | typeText (long), stack cascade, IC.ok/no |  |
| 53 | IDE-based AI vs Terminal-based AI | FLOW | editor window with a side chat panel (logo cursor) | terminal window; command typed; AI replies in the terminal (logo claude) | logos cursor, claude; IC.code, IC.terminal |  |
| 54 | Prototype vs Production app | RISK | laptop shows the app: "works on my machine" check | checklist ticks one by one: users, errors, security, monitoring | IC.avatar(laptop), IC.step, IC.ok |  |
| 55 | MCP vs API | FLOW | AI > one standard plug > many tools plug into the same port | AI > tangled hand-wired lines to each tool, "custom code" chips | IC.bare(plug), logos github etc, CHIP |  |
| 56 | Hallucination vs Bug | RISK | AI writes import fastjson-pro > registry search > "does not exist" red cross | real code with a logic error > test fails red > magnifier > fix check | IC.code, IC.bare(search), IC.no/ok |  |
| 57 | Git checkpoint vs Undo | TIME | timeline of commit dots; click an earlier one; state restores (check) | undo stack counter runs 5 > 0; "cannot go back" red cross | IC.node, countNum, IC.no |  |
| 58 | Code generation vs Code review | ROLE | AI writes code (code window types) | diff with comment bubbles on lines; Approve / Request changes buttons | IC.code, BUB, BTN |  |
| 59 | Working code vs Secure code | RISK | code runs: play > check > "It runs" | key in env, input checked; attacker packets hit a shield and bounce | IC.code, IC.badge(shield-check), pkt | topics_demo #10 |
| 60 | Demo vs Deployed app | RISK | polished window with hard-coded data: "looks good" | needs env vars, database, hosting, domain; one is missing > crash > fixed | IC.win, IC.db, IC.hero(cloud), IC.ok/no |  |
| 61 | Understanding the code vs Trusting the code | RISK | dev reads, finds the bug, fixes it (magnifier + wrench, check) | error popup, "?" bubbles, spinner going in circles | IC.bare(search, wrench), BUB, spin fx |  |
| 62 | Skills vs Prompts | SHAPE | a packaged skill folder reused by three requests (arrows to the same card) | the same long prompt typed again and again; hourglass | IC.bare(folder-open), typeText, stack |  |
| 63 | Single agent vs Multi-agent | ROLE | one bot, task chips queued: plan, code, test, docs; one long meter | orchestrator + 4 bots with separate jobs; their meters fill in parallel and finish sooner | IC.avatar(bot), CHIP, meter |  |
| 64 | Human in the loop vs Fully autonomous | ROLE | each step waits for Approve / Deny buttons; human clicks; steps check off | steps run on their own (spinner, fast); a risky step slips through (red warning) | BTN, stack trail, IC.warn, spin fx |  |
