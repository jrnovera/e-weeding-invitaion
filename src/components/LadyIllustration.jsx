const LadyIllustration = () => (
  <svg viewBox="0 0 180 420" fill="none" xmlns="http://www.w3.org/2000/svg" className="dresscode-svg">
    <defs>
      <linearGradient id="dressGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#B0E0E6" />
        <stop offset="100%" stopColor="#87CEEB" />
      </linearGradient>
      <linearGradient id="dressShine" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#fff" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#fff" stopOpacity="0" />
      </linearGradient>
    </defs>

    {/* Hair - flowing waves */}
    <path d="M68 60 Q65 30 75 18 Q85 8 90 10 Q95 5 100 8 Q110 5 115 12 Q125 20 122 50 Q124 65 120 80 Q118 90 115 92 Q112 78 110 68" fill="#3B2417" />
    <path d="M68 60 Q66 75 68 88 Q70 92 72 90 Q74 78 76 68" fill="#3B2417" />
    {/* Hair highlights */}
    <path d="M78 20 Q85 14 95 12" stroke="#5C3D2E" strokeWidth="1.5" fill="none" opacity="0.5" />
    <path d="M108 15 Q115 20 118 35" stroke="#5C3D2E" strokeWidth="1.5" fill="none" opacity="0.5" />

    {/* Head */}
    <ellipse cx="93" cy="55" rx="18" ry="22" fill="#FADEC9" />

    {/* Ears */}
    <ellipse cx="75" cy="56" rx="3" ry="5" fill="#F0CEAF" />
    <ellipse cx="111" cy="56" rx="3" ry="5" fill="#F0CEAF" />

    {/* Eyes - elegant lashes */}
    <path d="M83 50 Q86 48 89 50" stroke="#2C1810" strokeWidth="1.8" strokeLinecap="round" fill="none" />
    <path d="M97 50 Q100 48 103 50" stroke="#2C1810" strokeWidth="1.8" strokeLinecap="round" fill="none" />
    <circle cx="86" cy="51" r="1" fill="#2C1810" />
    <circle cx="100" cy="51" r="1" fill="#2C1810" />

    {/* Eyebrows */}
    <path d="M82 46 Q86 44 90 45.5" stroke="#3B2417" strokeWidth="0.8" fill="none" />
    <path d="M96 45.5 Q100 44 104 46" stroke="#3B2417" strokeWidth="0.8" fill="none" />

    {/* Nose */}
    <path d="M92 55 Q91 58 93 59" stroke="#E8C0A8" strokeWidth="0.8" fill="none" />

    {/* Smile */}
    <path d="M88 63 Q93 66 98 63" stroke="#D4908A" strokeWidth="1" fill="none" strokeLinecap="round" />

    {/* Neck */}
    <path d="M86 74 L86 90 Q86 94 90 95 L96 95 Q100 94 100 90 L100 74" fill="#FADEC9" />
    {/* Necklace */}
    <path d="M84 86 Q93 92 102 86" stroke="#B0E0E6" strokeWidth="0.8" fill="none" />
    <circle cx="93" cy="90" r="2" fill="#B0E0E6" />

    {/* Shoulders */}
    <path d="M65 108 Q72 95 86 94 L100 94 Q114 95 121 108" fill="#FADEC9" />

    {/* Dress bodice - elegant V-neck */}
    <path d="M58 115 Q62 100 74 96 L86 94 L93 108 L100 94 L112 96 Q124 100 128 115 L126 170 Q120 175 93 175 Q66 175 60 170 Z" fill="url(#dressGrad)" />
    {/* V-neck detail */}
    <path d="M86 94 L93 112 L100 94" stroke="#6CA6CD" strokeWidth="0.6" fill="none" opacity="0.4" />
    {/* Bodice shine */}
    <path d="M65 105 Q75 108 80 130 Q78 150 70 170" fill="url(#dressShine)" />

    {/* Waist */}
    <path d="M60 170 Q75 168 93 168 Q111 168 126 170" stroke="#6CA6CD" strokeWidth="1.5" fill="none" opacity="0.5" />
    {/* Belt accent */}
    <rect x="85" y="166" width="16" height="6" rx="3" fill="#6CA6CD" opacity="0.3" />

    {/* Arms */}
    <path d="M58 115 Q48 135 46 160 Q45 175 48 195" stroke="#FADEC9" strokeWidth="8" fill="none" strokeLinecap="round" />
    <path d="M128 115 Q138 135 140 160 Q141 175 138 195" stroke="#FADEC9" strokeWidth="8" fill="none" strokeLinecap="round" />
    {/* Hands */}
    <ellipse cx="48" cy="198" rx="5" ry="4" fill="#FADEC9" />
    <ellipse cx="138" cy="198" rx="5" ry="4" fill="#FADEC9" />

    {/* Skirt - flowing A-line */}
    <path d="M60 170 Q50 230 38 300 Q30 345 25 395 L161 395 Q156 345 148 300 Q136 230 126 170 Q111 168 93 168 Q75 168 60 170 Z" fill="url(#dressGrad)" />

    {/* Skirt fabric folds */}
    <path d="M55 200 Q48 260 38 330" stroke="#87CEEB" strokeWidth="1.2" fill="none" opacity="0.35" />
    <path d="M72 185 Q60 260 48 360" stroke="#87CEEB" strokeWidth="0.8" fill="none" opacity="0.25" />
    <path d="M93 175 Q93 280 93 395" stroke="#87CEEB" strokeWidth="0.6" fill="none" opacity="0.15" />
    <path d="M114 185 Q126 260 138 360" stroke="#87CEEB" strokeWidth="0.8" fill="none" opacity="0.25" />
    <path d="M131 200 Q138 260 148 330" stroke="#87CEEB" strokeWidth="1.2" fill="none" opacity="0.35" />

    {/* Skirt shading */}
    <path d="M60 170 Q52 220 42 290 Q48 270 65 190" fill="#6CA6CD" opacity="0.08" />
    <path d="M126 170 Q134 220 144 290 Q138 270 121 190" fill="#6CA6CD" opacity="0.08" />

    {/* Skirt hem detail */}
    <path d="M25 393 Q55 388 93 388 Q131 388 161 393" stroke="#ADD8E6" strokeWidth="1" fill="none" opacity="0.5" />

    {/* Shoes */}
    <path d="M65 393 Q68 388 78 388 Q85 388 87 393 Q86 398 78 399 Q68 399 65 396 Z" fill="#87CEEB" />
    <path d="M99 393 Q102 388 112 388 Q119 388 121 393 Q120 398 112 399 Q102 399 99 396 Z" fill="#87CEEB" />

    {/* Earrings */}
    <circle cx="74" cy="62" r="1.5" fill="#B0E0E6" />
    <circle cx="74" cy="66" r="2" fill="#ADD8E6" opacity="0.7" />
    <circle cx="112" cy="62" r="1.5" fill="#B0E0E6" />
    <circle cx="112" cy="66" r="2" fill="#ADD8E6" opacity="0.7" />
  </svg>
)

export default LadyIllustration
