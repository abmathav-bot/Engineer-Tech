/**
 * A handful of things on this page do real, synchronous main-thread work when
 * they change state: the theme toggle re-styles the whole document via CSS
 * variables, for one. If that lands on the same frame as the 3D scene
 * rendering or the marquee's animation, they compete for the main thread and
 * the page stutters — not because any one of them is slow, but because they
 * all wanted the thread at once. Anything that's about to do that kind of
 * work calls `requestHeavyPause()`; anything that runs continuously (a
 * render loop, a CSS animation) checks `isHeavyPaused()` and sits out the
 * brief window instead of competing.
 */
let pausedUntil = 0

export function requestHeavyPause(ms = 400) {
  pausedUntil = Math.max(pausedUntil, performance.now() + ms)
}

export function isHeavyPaused() {
  return performance.now() < pausedUntil
}

if (typeof window !== 'undefined') {
  window.addEventListener('et:heavy-pause', (e) => requestHeavyPause(e?.detail?.ms ?? 400))
}
