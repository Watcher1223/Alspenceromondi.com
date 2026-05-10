export function Cheetah() {
  return (
    <div className="cheetahDeck" aria-label="Animated cheetah signal">
      <div className="scanlines" />
      <div className="radar">
        <span />
        <span />
        <span />
      </div>
      <svg className="cheetahSvg" viewBox="0 0 780 360" role="img" aria-label="Running cheetah">
        <defs>
          <linearGradient id="cheetahCoat" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#ffd46b" />
            <stop offset="52%" stopColor="#ff7a18" />
            <stop offset="100%" stopColor="#b83212" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g className="tail">
          <path
            d="M174 172C85 161 52 101 103 61c40-31 92-16 118 25"
            fill="none"
            stroke="#050505"
            strokeWidth="27"
            strokeLinecap="round"
          />
          <path
            d="M174 172C91 160 64 108 107 73"
            fill="none"
            stroke="#ff7a18"
            strokeWidth="14"
            strokeLinecap="round"
          />
        </g>
        <g className="body">
          <path
            d="M185 168C258 80 463 75 598 139c51 24 57 77 7 107-112 67-337 48-437-14-31-19-31-43 17-64Z"
            fill="url(#cheetahCoat)"
          />
          <path
            d="M570 139c72-27 143 3 174 55-34 10-72 4-117-17Z"
            fill="#ff7a18"
          />
          <path
            d="M732 191c27-1 43 13 48 34-25 3-51-9-72-30Z"
            fill="#050505"
          />
          <circle cx="708" cy="167" r="6" fill="#050505" />
          <path d="M686 194c20 16 44 17 66 7" fill="none" stroke="#050505" strokeWidth="5" strokeLinecap="round" />
        </g>
        <g className="spots">
          {[
            [238, 154, 9],
            [286, 121, 7],
            [331, 158, 11],
            [374, 120, 8],
            [427, 163, 8],
            [487, 132, 11],
            [536, 181, 8],
            [255, 215, 8],
            [349, 224, 11],
            [448, 219, 8],
            [621, 160, 6],
            [657, 168, 5],
          ].map(([cx, cy, r]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} />
          ))}
        </g>
        <g className="legs rearLegs">
          <path d="M296 228C250 263 208 296 157 340" fill="none" stroke="#050505" strokeWidth="20" strokeLinecap="round" />
          <path d="M350 232C377 264 400 300 428 340" fill="none" stroke="#050505" strokeWidth="20" strokeLinecap="round" />
        </g>
        <g className="legs frontLegs">
          <path d="M533 219C584 252 627 290 677 340" fill="none" stroke="#050505" strokeWidth="20" strokeLinecap="round" />
          <path d="M594 214C557 256 510 292 462 340" fill="none" stroke="#050505" strokeWidth="20" strokeLinecap="round" />
        </g>
        <path className="signal" d="M70 307H725" stroke="#ff7a18" strokeWidth="2" strokeDasharray="18 12" filter="url(#glow)" />
      </svg>
      <div className="hud">
        <span>VELOCITY: HIGH</span>
        <span>ORIGIN: KENYA / HMC</span>
        <span>MODE: BUILD</span>
      </div>
    </div>
  );
}
