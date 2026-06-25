🎵 BACKGROUND MUSIC
===================

To add background music, drop an audio file here named exactly:

    bg.mp3

That's it — the little ♪ button on the site will play/pause it, and it will
start automatically the first time Aparna taps the postbox (phones block
autoplay until the first tap, so this is on purpose).

Tips:
- Keep it small (a 2–4 MB mp3 loops fine and loads fast on phones).
- Use a track you have the right to use (royalty-free / your own).
- Want a different name or format (.ogg)? Change the path in
  src/hooks/useSound.js  ->  MUSIC_SRC.

If no bg.mp3 is present, the site still works perfectly — the ♪ button just
won't have anything to play, and the cute UI sound effects (taps, whooshes,
sparkles) still work because those are generated in-browser, no files needed.
