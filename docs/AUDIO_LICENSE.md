# Music provenance and release gate

The site plays `apps/web/public/audio/duarte-playlist.mp3` in this order, then loops: Spanish Romance, Chopin's Nocturne op. 9 no. 2, and Bach BWV 1007. The portfolio's sound control starts enabled, subject to the browser's audible-autoplay restrictions, and can be muted. The audio is set to 0.65 rather than 0.5; the source recordings were level-matched near -20 LUFS to avoid a large jump between tracks. The single streamed file avoids a network gap at each track boundary. This playlist is included in Git and deployments.

The source recordings were supplied locally by Duarte, who reports having permission from the creators of all three videos to use them in this portfolio. Keep the scope and written proof of that permission privately; it is not stored in this repository. Their original video links are also disclosed in the footer's collapsed “Music credits” section:

- Spanish Romance — Ilona Guitar: https://www.youtube.com/watch?v=aazYwcjYPdQ
- Chopin, Nocturne op. 9 no. 2 — Ilona Guitar: https://www.youtube.com/watch?v=gIrNZxDOYUY
- Bach, BWV 1007 — 방구석 클래식 · 정승원의 On Air: https://www.youtube.com/watch?v=H0wvexNmX9U

To reproduce the local preview from authorized source files, use FFmpeg with the files above as inputs `0`, `1` and `2` in that order, at 48 kHz stereo. The filter is `[0:a]volume=4.2dB[a0];[1:a]anull[a1];[2:a]volume=10dB[a2];[a0][a1][a2]concat=n=3:v=0:a=1[out]`; map `[out]` to `libmp3lame` at `128k`. The output is approximately 10:28, -20.4 LUFS with a -1.7 dBFS true peak. It is streamed as one file with native `loop`, not three independently fetched tracks.

The repository is intended to remain private until launch. The three recordings' creators are credited, but credit alone is not a licence. Before making the website or repository public, confirm the permissions cover public web streaming and redistribution of this combined MP3, not just a private preview. If they do not, replace the playlist with suitably licensed recordings and update both the footer credits and this document.

Only `duarte-playlist.mp3` is excepted from the audio ignore rule, so it is included in Git and in a GitHub/Vercel build. The old unused audio file and the original recordings remain local only. A successful code build does not by itself prove that audio playback works; verify the deployed asset and browser playback before launch.

The previous local `apps/web/public/audio/duarte-music.mp3` is unreferenced but retained; it was supplied as “Andrey Psyche chill instrumental”, credited by Pixabay to `freesound_community` (https://pixabay.com/sound-effects/search/chill%20instrumental/). It must not be treated as the current playlist. The speaker symbols are user-supplied Icons8 assets; confirm their attribution terms before public launch.
