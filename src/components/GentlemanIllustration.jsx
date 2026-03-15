const GentlemanIllustration = () => (
  <svg viewBox="0 0 180 420" fill="none" xmlns="http://www.w3.org/2000/svg" className="dresscode-svg">
    <defs>
      <linearGradient id="suitGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#0D3B66" />
        <stop offset="100%" stopColor="#1a5276" />
      </linearGradient>
      <linearGradient id="suitShine" x1="0" y1="0" x2="1" y2="0.5">
        <stop offset="0%" stopColor="#fff" stopOpacity="0.12" />
        <stop offset="100%" stopColor="#fff" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="vestGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#7F9DB1" />
        <stop offset="100%" stopColor="#6CA6CD" />
      </linearGradient>
    </defs>

    {/* Hair */}
    <path d="M72 45 Q72 22 82 16 Q90 12 93 12 Q96 12 104 16 Q114 22 114 45 Q114 38 110 30 Q106 24 93 22 Q80 24 76 30 Q72 38 72 45" fill="#1F1510" />
    {/* Hair top volume */}
    <path d="M74 35 Q74 18 85 14 Q93 11 101 14 Q112 18 112 35" fill="#2C1D14" />
    {/* Hair part */}
    <path d="M88 14 Q93 12 98 14" stroke="#1F1510" strokeWidth="0.8" fill="none" />

    {/* Head */}
    <ellipse cx="93" cy="48" rx="19" ry="22" fill="#EFCFB5" />

    {/* Ears */}
    <ellipse cx="74" cy="48" rx="3.5" ry="5.5" fill="#E0BFA3" />
    <ellipse cx="112" cy="48" rx="3.5" ry="5.5" fill="#E0BFA3" />

    {/* Eyes */}
    <path d="M84 44 Q87 42.5 90 44.5" stroke="#2C1810" strokeWidth="1.6" strokeLinecap="round" fill="none" />
    <path d="M96 44.5 Q99 42.5 102 44" stroke="#2C1810" strokeWidth="1.6" strokeLinecap="round" fill="none" />
    <circle cx="87" cy="45" r="1" fill="#2C1810" />
    <circle cx="99" cy="45" r="1" fill="#2C1810" />

    {/* Eyebrows - thicker */}
    <path d="M83 40 Q87 38 91 39.5" stroke="#2C1810" strokeWidth="1.2" fill="none" />
    <path d="M95 39.5 Q99 38 103 40" stroke="#2C1810" strokeWidth="1.2" fill="none" />

    {/* Nose */}
    <path d="M92 48 Q91 52 93 53 Q95 52 94 48" stroke="#D9B49A" strokeWidth="0.7" fill="none" />

    {/* Mouth */}
    <path d="M88 58 Q93 60 98 58" stroke="#C08A7A" strokeWidth="1" fill="none" strokeLinecap="round" />

    {/* Neck */}
    <path d="M85 67 L85 82 Q85 85 88 86 L98 86 Q101 85 101 82 L101 67" fill="#EFCFB5" />

    {/* White shirt collar */}
    <path d="M76 92 L85 86 L93 102 L101 86 L110 92 L108 100 Q100 106 93 108 Q86 106 78 100 Z" fill="#F8F4F0" />
    {/* Collar shadow */}
    <path d="M80 95 L85 88" stroke="#E8E0D8" strokeWidth="0.5" fill="none" />
    <path d="M106 95 L101 88" stroke="#E8E0D8" strokeWidth="0.5" fill="none" />

    {/* Tie */}
    <path d="M89 100 L93 96 L97 100 L95 140 L93 142 L91 140 Z" fill="#0D3B66" />
    {/* Tie knot */}
    <path d="M90 98 L93 95 L96 98 L95 102 L91 102 Z" fill="#0A3055" />
    {/* Tie shine */}
    <path d="M91.5 102 L92.5 130" stroke="#7F9DB1" strokeWidth="0.5" fill="none" opacity="0.3" />

    {/* Suit jacket */}
    <path d="M50 100 Q55 90 76 92 L78 100 Q86 108 93 110 Q100 108 108 100 L110 92 Q131 90 136 100 L140 125 Q142 160 140 200 L138 265 Q120 260 93 260 Q66 260 48 265 L46 200 Q44 160 46 125 Z" fill="url(#suitGrad)" />

    {/* Jacket shine */}
    <path d="M55 105 Q58 130 56 180 Q54 220 50 260" fill="url(#suitShine)" />

    {/* Lapels */}
    <path d="M76 92 L78 100 Q82 106 86 110 L82 140 L60 108 Z" fill="#0A3055" />
    <path d="M110 92 L108 100 Q104 106 100 110 L104 140 L126 108 Z" fill="#0A3055" />
    {/* Lapel edges */}
    <path d="M76 92 L60 108 L82 140" stroke="#7F9DB1" strokeWidth="0.5" fill="none" opacity="0.25" />
    <path d="M110 92 L126 108 L104 140" stroke="#7F9DB1" strokeWidth="0.5" fill="none" opacity="0.25" />

    {/* Vest */}
    <path d="M82 110 L93 108 L104 110 L104 148 Q100 150 93 150 Q86 150 82 148 Z" fill="url(#vestGrad)" opacity="0.4" />

    {/* Shirt front */}
    <path d="M86 110 L93 108 L100 110 L100 150 Q97 151 93 151 Q89 151 86 150 Z" fill="#F8F4F0" />

    {/* Shirt buttons */}
    <circle cx="93" cy="120" r="1.2" fill="#E0D8D0" />
    <circle cx="93" cy="132" r="1.2" fill="#E0D8D0" />
    <circle cx="93" cy="144" r="1.2" fill="#E0D8D0" />

    {/* Pocket square */}
    <path d="M114 118 L120 116 Q122 120 121 126 L116 128 Z" fill="#B0E0E6" />
    <path d="M116 118 L119 117" stroke="#87CEEB" strokeWidth="0.5" fill="none" opacity="0.6" />

    {/* Left jacket pocket */}
    <path d="M62 162 Q70 160 78 162" stroke="#7F9DB1" strokeWidth="0.6" fill="none" opacity="0.3" />

    {/* Right jacket pocket */}
    <path d="M108 162 Q116 160 124 162" stroke="#7F9DB1" strokeWidth="0.6" fill="none" opacity="0.3" />

    {/* Arms */}
    <path d="M50 100 Q40 120 38 155 Q37 180 40 210 Q42 225 45 240" fill="url(#suitGrad)" />
    <path d="M136 100 Q146 120 148 155 Q149 180 146 210 Q144 225 141 240" fill="url(#suitGrad)" />

    {/* Shirt cuffs */}
    <rect x="40" y="234" width="12" height="5" rx="2" fill="#F8F4F0" />
    <rect x="134" y="234" width="12" height="5" rx="2" fill="#F8F4F0" />

    {/* Hands */}
    <path d="M42 240 Q40 245 42 250 Q44 252 48 250 Q52 248 52 244 Q52 240 48 238 Q44 237 42 240" fill="#EFCFB5" />
    <path d="M144 240 Q142 245 144 250 Q146 252 150 250 Q154 248 154 244 Q154 240 150 238 Q146 237 144 240" fill="#EFCFB5" />

    {/* Watch */}
    <rect x="38" y="230" width="8" height="6" rx="2" fill="#7F9DB1" opacity="0.6" />

    {/* Belt */}
    <rect x="62" y="256" width="62" height="7" rx="2" fill="#1A1510" />
    <rect x="88" y="257" width="10" height="5" rx="1.5" fill="#7F9DB1" opacity="0.7" />

    {/* Pants */}
    <path d="M48 265 Q52 260 66 260 L86 260 L84 395 L56 395 Q52 360 48 320 Q46 290 48 265 Z" fill="url(#suitGrad)" />
    <path d="M138 265 Q134 260 120 260 L100 260 L102 395 L130 395 Q134 360 138 320 Q140 290 138 265 Z" fill="url(#suitGrad)" />

    {/* Pants creases */}
    <path d="M70 270 L68 395" stroke="#7F9DB1" strokeWidth="0.5" fill="none" opacity="0.15" />
    <path d="M116 270 L118 395" stroke="#7F9DB1" strokeWidth="0.5" fill="none" opacity="0.15" />

    {/* Shoes */}
    <path d="M52 393 Q56 386 70 386 Q80 386 83 393 Q82 400 70 402 Q56 402 52 397 Z" fill="#1A1510" />
    <path d="M103 393 Q106 386 120 386 Q130 386 133 393 Q132 400 120 402 Q106 402 103 397 Z" fill="#1A1510" />
    {/* Shoe detail */}
    <path d="M58 395 Q66 393 76 395" stroke="#2C1D14" strokeWidth="0.5" fill="none" opacity="0.4" />
    <path d="M108 395 Q116 393 126 395" stroke="#2C1D14" strokeWidth="0.5" fill="none" opacity="0.4" />

    {/* Boutonniere */}
    <circle cx="116" cy="112" r="3.5" fill="#B0E0E6" opacity="0.7" />
    <circle cx="116" cy="112" r="2" fill="#fff" opacity="0.5" />
    <path d="M116 115 L116 122" stroke="#6CA6CD" strokeWidth="0.6" fill="none" opacity="0.5" />
  </svg>
)

export default GentlemanIllustration
