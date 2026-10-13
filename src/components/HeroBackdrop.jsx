/**
 * Decorative backdrop for the hero's intro row: a soft oval + circle sitting
 * behind the eyebrow column, and a slow wave loop running along the bottom.
 * Everything reads off the shared colour tokens (currentColor / text-* /
 * fill-*), so it re-themes automatically in dark mode. Kept behind the text
 * (negative z-index) and low-opacity/blurred so nothing fights for contrast.
 */
export default function HeroBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="blob-a absolute -left-24 top-6 h-72 w-72 rounded-full bg-sky opacity-50 blur-3xl md:h-96 md:w-96" />
      <div className="blob-b absolute -left-10 top-40 h-56 w-80 rounded-[50%] bg-mint opacity-60 blur-3xl md:h-64 md:w-[26rem]" />
      <div className="blob-a absolute right-[-4rem] top-0 h-64 w-64 rounded-full bg-mint opacity-40 blur-3xl [animation-delay:-6s] md:h-80 md:w-80" />

      <svg
        className="absolute inset-x-0 bottom-0 w-full text-olive/[0.07]"
        viewBox="0 0 2400 160"
        preserveAspectRatio="none"
        style={{ height: 'clamp(60px, 10vw, 130px)' }}
      >
        <g className="wave-loop">
          <path
            d="M0 96C120 40 240 40 360 96S600 152 720 96 960 40 1080 96 1320 152 1440 96 1680 40 1800 96 2040 152 2160 96 2400 40 2400 96V160H0Z"
            fill="currentColor"
          />
          <path
            transform="translate(2400 0)"
            d="M0 96C120 40 240 40 360 96S600 152 720 96 960 40 1080 96 1320 152 1440 96 1680 40 1800 96 2040 152 2160 96 2400 40 2400 96V160H0Z"
            fill="currentColor"
          />
        </g>
      </svg>
    </div>
  )
}
