import React, { useState, useEffect } from 'react';

const slidesData = [
  {
    tag: 'OMS Platform',
    title: 'Seamless work experience',
    desc: 'Everything you need in an easily customizable dashboard',
    badge1: 'Live Batch #204',
    badge1Sub: '1,250 kg processed',
    badge2: 'Ledger Audit',
    badge2Sub: 'Strict FIFO traceability',
  },
  {
    tag: 'Recipe Batching',
    title: 'Automated recipe scaling',
    desc: 'Raw material batching with gram-level precision & lot tracking',
    badge1: 'Formula Synced',
    badge1Sub: 'Zero manual calculation',
    badge2: 'Stock Control',
    badge2Sub: 'Derived strictly via ledger',
  },
  {
    tag: 'Role Security',
    title: 'Multi-role cryptographic audit',
    desc: 'Isolated role portals with tamper-evident audit records',
    badge1: 'Vault Verified',
    badge1Sub: 'Protected ledger hashes',
    badge2: 'Access Guard',
    badge2Sub: 'Isolated collection folders',
  },
];

export const LoginHeroBanner = ({ role = 'user' }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slidesData.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slidesData[currentSlide];

  return (
    <div className={`auth-hero-panel ${role}-hero`}>
      <div className="auth-hero-glass-card">
        {/* Animated Scene with Hanging Lamp and Working Character */}
        <div className="auth-scene-container">
          {/* Ceiling Cord and Hanging Lamp */}
          <div className="scene-lamp-wrapper">
            <div className="scene-lamp-cord"></div>
            <div className="scene-lamp-shade"></div>
            <div className="scene-lamp-glow"></div>
          </div>

          {/* Floating Live Badge 1 */}
          <div className="floating-badge badge-top-left">
            <div className="badge-pulse-dot"></div>
            <div className="badge-text-group">
              <span className="badge-title">{slide.badge1}</span>
              <span className="badge-sub">{slide.badge1Sub}</span>
            </div>
          </div>

          {/* Floating Live Badge 2 */}
          <div className="floating-badge badge-bottom-right">
            <div className="badge-check-icon">✓</div>
            <div className="badge-text-group">
              <span className="badge-title">{slide.badge2}</span>
              <span className="badge-sub">{slide.badge2Sub}</span>
            </div>
          </div>

          {/* 3D-Styled Working Character SVG Illustration */}
          <svg
            className="scene-illustration"
            viewBox="0 0 320 260"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="beanbagGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2c303c" />
                <stop offset="50%" stopColor="#1e222d" />
                <stop offset="100%" stopColor="#111319" />
              </linearGradient>
              <linearGradient id="screenGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#818cf8" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="laptopBody" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e2e8f0" />
                <stop offset="100%" stopColor="#94a3b8" />
              </linearGradient>
            </defs>

            {/* Ambient Shadow under Beanbag */}
            <ellipse cx="160" cy="235" rx="100" ry="20" fill="rgba(0,0,0,0.35)" />

            {/* Cozy Charcoal Beanbag Chair */}
            <path
              d="M85 175C75 140 90 95 140 85C195 75 240 105 245 155C250 195 225 225 180 230C130 235 90 205 85 175Z"
              fill="url(#beanbagGrad)"
            />
            {/* Beanbag stitch creases */}
            <path
              d="M100 160C125 180 170 195 220 185"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M130 115C140 145 155 185 160 215"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* Character Legs / Trousers (Dark charcoal) */}
            <path
              d="M150 170L195 195L185 208L140 185Z"
              fill="#181a20"
            />
            <path
              d="M165 175L215 205L205 218L155 190Z"
              fill="#0f1115"
            />

            {/* White Sneakers */}
            <ellipse cx="192" cy="207" rx="14" ry="8" fill="#ffffff" />
            <ellipse cx="212" cy="216" rx="15" ry="8" fill="#f8fafc" />
            <path d="M182 208C185 205 195 205 200 208" stroke="#cbd5e1" strokeWidth="1.5" />
            <path d="M202 217C205 214 215 214 220 217" stroke="#cbd5e1" strokeWidth="1.5" />

            {/* Character Torso / Dark Sweater */}
            <path
              d="M135 125C135 110 150 105 165 105C180 105 195 112 195 130L185 175C170 178 145 178 135 175Z"
              fill="#2d3139"
            />

            {/* Character Neck */}
            <rect x="160" y="96" width="10" height="12" rx="4" fill="#fbcfe8" />

            {/* Character Head & Friendly Facial Profile */}
            <circle cx="165" cy="85" r="15" fill="#fbcfe8" />
            {/* Stylish Hair (Brown wavy volume) */}
            <path
              d="M150 82C150 70 162 65 175 66C185 67 190 74 188 82C185 80 178 77 172 79C166 81 160 84 150 82Z"
              fill="#78350f"
            />
            <path
              d="M150 82C148 88 152 92 155 93C155 88 153 84 150 82Z"
              fill="#5c2608"
            />
            {/* Eye & Smile */}
            <circle cx="171" cy="84" r="1.5" fill="#1e293b" />
            <path d="M172 90C170 92 168 92 166 91" stroke="#1e293b" strokeWidth="1" strokeLinecap="round" />

            {/* Left & Right Arms holding Laptop */}
            <path
              d="M140 135C140 135 150 155 165 158"
              stroke="#2d3139"
              strokeWidth="9"
              strokeLinecap="round"
            />
            <path
              d="M180 135C180 135 175 155 160 158"
              stroke="#262a31"
              strokeWidth="9"
              strokeLinecap="round"
            />
            <circle cx="164" cy="158" r="4.5" fill="#fbcfe8" />

            {/* Laptop Base */}
            <polygon points="145,160 185,160 180,165 140,165" fill="url(#laptopBody)" />

            {/* Laptop Screen Open at Angle */}
            <polygon points="146,160 142,128 178,124 182,156" fill="#f1f5f9" />
            <polygon points="148,158 145,131 176,128 179,155" fill="#0f172a" />
            {/* Glowing Screen Light Cone */}
            <polygon points="148,158 145,131 176,128 179,155" fill="url(#screenGlow)" />
            {/* Apple / Brand logo dot on back of lid */}
            <circle cx="160" cy="142" r="2.5" fill="#ffffff" />
          </svg>
        </div>

        {/* Text Section */}
        <div className="auth-hero-text">
          <span className="auth-hero-tag">{slide.tag}</span>
          <h2 className="auth-hero-title">{slide.title}</h2>
          <p className="auth-hero-desc">{slide.desc}</p>
        </div>

        {/* Interactive Carousel Dots */}
        <div className="auth-carousel-dots">
          {slidesData.map((_, idx) => (
            <button
              key={idx}
              type="button"
              className={`carousel-dot ${idx === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
