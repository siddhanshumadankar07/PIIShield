export interface SpartanWarriorProps {
  className?: string
}

/**
 * Brushed-silver and graphite Spartan guardian with crested Greek helmet,
 * round lambda shield, and spear. Restrained vertical float with soft shadow.
 */
export function SpartanWarrior({ className = '' }: SpartanWarriorProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none animate-warrior-float ${className}`}
    >
      <svg
        viewBox="0 0 520 720"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full drop-shadow-[0_18px_36px_rgba(0,0,0,0.65)]"
      >
        <defs>
          <linearGradient id="warriorSilver" x1="160" y1="60" x2="360" y2="680" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F1F3F5" />
            <stop offset="55%" stopColor="#BFC7D1" />
            <stop offset="100%" stopColor="#737C87" />
          </linearGradient>
          <linearGradient id="warriorGraphite" x1="200" y1="180" x2="340" y2="680" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#8E96A0" />
            <stop offset="100%" stopColor="#343A42" />
          </linearGradient>
          <linearGradient id="spearSilver" x1="70" y1="690" x2="450" y2="25" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#525964" />
            <stop offset="50%" stopColor="#D9E0E8" />
            <stop offset="100%" stopColor="#F1F3F5" />
          </linearGradient>
        </defs>

        {/* Long Spear */}
        <line
          x1="78"
          y1="700"
          x2="448"
          y2="28"
          stroke="url(#spearSilver)"
          strokeWidth="5.5"
          strokeLinecap="round"
        />
        {/* Spearhead */}
        <polygon
          points="448,28 466,6 458,42 436,36"
          fill="#F1F3F5"
          stroke="#BFC7D1"
          strokeWidth="1.5"
        />
        <line x1="448" y1="28" x2="462" y2="11" stroke="#737C87" strokeWidth="1.5" />

        {/* Flowing Cloak */}
        <path
          d="M215 225 C165 280, 128 410, 112 580 L195 620 L235 440 Z"
          fill="url(#warriorGraphite)"
          opacity="0.86"
        />

        {/* Helmet Crest */}
        <path
          d="M242 52 C210 42, 166 64, 152 112 C178 96, 206 94, 232 104 C226 84, 236 66, 252 62 C276 58, 304 72, 316 102 C320 76, 294 46, 242 52 Z"
          fill="url(#warriorSilver)"
        />
        <path
          d="M242 52 C214 48, 178 68, 162 104"
          stroke="#D9E0E8"
          strokeWidth="1.5"
          strokeOpacity="0.65"
          fill="none"
        />

        {/* Corinthian Helmet */}
        <path
          d="M236 96 C236 72, 294 70, 302 106 L306 146 L292 178 L272 178 L272 146 L256 146 L256 178 L236 174 L228 134 Z"
          fill="url(#warriorSilver)"
        />
        {/* Visor Cutout */}
        <path
          d="M254 128 L294 128 L288 142 L268 142 L268 172 L258 172 L258 142 L248 140 Z"
          fill="#111315"
        />
        <path
          d="M268 78 L272 126"
          stroke="#737C87"
          strokeWidth="2"
          strokeOpacity="0.65"
        />

        {/* Neck & Shoulders */}
        <path d="M242 174 L286 174 L300 208 L226 208 Z" fill="url(#warriorGraphite)" />

        {/* Cuirass */}
        <path
          d="M204 206 C236 196, 296 196, 326 212 L316 356 C284 370, 242 370, 212 356 Z"
          fill="url(#warriorSilver)"
        />
        <path
          d="M232 238 Q264 252 298 238 M264 244 L264 334 M236 286 Q264 294 292 286"
          stroke="#737C87"
          strokeWidth="1.75"
          strokeOpacity="0.5"
          fill="none"
        />

        {/* Right Arm */}
        <path d="M322 214 L366 254 L344 282 L306 248 Z" fill="url(#warriorSilver)" />
        <circle cx="352" cy="264" r="14" fill="#F1F3F5" stroke="#A0A7B0" strokeWidth="1.5" />

        {/* Pteruges */}
        <path d="M210 354 L318 354 L334 446 L194 446 Z" fill="url(#warriorGraphite)" />
        <path
          d="M228 354 L224 446 M252 354 L250 446 M276 354 L278 446 M300 354 L304 446"
          stroke="#111315"
          strokeWidth="2"
          strokeOpacity="0.45"
        />

        {/* Legs */}
        <path d="M206 446 L248 446 L238 690 L188 690 Z" fill="url(#warriorSilver)" />
        <path d="M278 446 L320 446 L346 690 L296 690 Z" fill="url(#warriorSilver)" />
        <path
          d="M204 548 L242 548 M288 548 L332 548"
          stroke="#737C87"
          strokeWidth="2.5"
          strokeOpacity="0.55"
        />

        {/* Round Spartan Shield */}
        <circle
          cx="188"
          cy="322"
          r="92"
          fill="url(#warriorSilver)"
          stroke="#D9E0E8"
          strokeWidth="2.5"
        />
        <circle
          cx="188"
          cy="322"
          r="76"
          fill="#111315"
          fillOpacity="0.16"
          stroke="#737C87"
          strokeWidth="1.75"
          strokeOpacity="0.55"
        />
        {/* Lambda Emblem */}
        <path
          d="M156 364 L188 278 L220 364"
          stroke="#111315"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.8"
        />
      </svg>
    </div>
  )
}
