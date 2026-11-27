export function HeroVisual() {
  return (
    <div
      aria-hidden="true"
      className="relative flex aspect-square w-full max-w-md items-center justify-center rounded-lg border border-border-subtle bg-surface/90 p-8 shadow-[0_16px_40px_rgba(0,0,0,0.4)]"
    >
      <svg
        viewBox="0 0 320 320"
        className="h-full w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="24" y="24" width="272" height="272" stroke="#343A42" strokeWidth="1" />
        <rect x="56" y="56" width="208" height="208" stroke="#737C87" strokeOpacity="0.45" strokeWidth="1" />
        <path
          d="M160 64L236 96V160C236 208 202 246 160 262C118 246 84 208 84 160V96L160 64Z"
          stroke="#D9E0E8"
          strokeWidth="2"
          fill="#181B1F"
        />
        <line x1="112" y1="138" x2="208" y2="138" stroke="#BFC7D1" strokeWidth="4" />
        <line x1="112" y1="160" x2="188" y2="160" stroke="#737C87" strokeWidth="4" />
        <line x1="112" y1="182" x2="172" y2="182" stroke="#343A42" strokeWidth="4" />
      </svg>
      <span className="absolute bottom-3 right-4 font-mono text-[11px] uppercase tracking-widest text-subtle">
        Local-Only Sanitization
      </span>
    </div>
  )
}
