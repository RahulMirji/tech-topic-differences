Kit for the tech-topic-differences skill (top-half A vs B reels).
  cp -r <skill>/kit ~/work && cd ~/work                      # never edit the skill folder itself
  python3 tools/logo.py docker kubernetes ... --out assets/logos
  python3 build.py config.js scene.html                       # engine.tpl.html + config.js + assets -> scene.html
  python3 preview.py pv/a.png 0.5 2.2 3.5 ...                 # contact sheet of the top half (prints page errors)
  python3 tools/compare.py ref.mp4 pv/cmp.png 1.0:1.0 ...      # side-by-side with a reference video
  (setsid nohup python3 render.py scene.html out.mp4 > render.log 2>&1 < /dev/null &)
  python3 tools/qa.py out.mp4                                 # size, no audio, flat bottom half, static holds
  python3 tools/plan.py script.txt                            # script -> timed config skeleton (estimates)
  python3 tools/lint.py scene.html                            # layout lint (must print OK)
Files: engine.tpl.html (engine, animation primitives, focus-swap), motion.js (extra kinds, fx, reflow stack(), pkt/meter/say helpers), builders.js (pattern builders C-J, stepRow, tileHTML), builders2.js (system design / networking / AI pieces, pairFrame), topics.json (64-pair recipes for plan.py), examples/docker_vs_k8s + patterns_demo + topics_demo configs (16 pairs worked out),
assets/fonts (Poppins 500-900), assets/logos (official marks), assets/icons (43 Lucide), tools/ (logo, compare, qa).
