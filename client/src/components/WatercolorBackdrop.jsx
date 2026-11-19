import React from 'react';

export const WatercolorBackdrop = () => {
  return (
    <div className="untitled-scenic-viewport-bg">
      <svg
        className="watercolor-svg"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Sky Gradient */}
          <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#d5dce2" />
            <stop offset="35%" stopColor="#dfd7cb" />
            <stop offset="70%" stopColor="#e3dbce" />
            <stop offset="100%" stopColor="#d4c5b3" />
          </linearGradient>

          {/* Distant Mountains */}
          <linearGradient id="distantMtn" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#a3b1ba" stopOpacity="0.75" />
            <stop offset="50%" stopColor="#b6bebe" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#c7c5b7" stopOpacity="0.9" />
          </linearGradient>

          {/* Midground Warm Sienna Mountains */}
          <linearGradient id="midMtnWarm" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#a8896c" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#96775d" />
            <stop offset="80%" stopColor="#82664e" />
            <stop offset="100%" stopColor="#6d5440" />
          </linearGradient>

          {/* Foreground Deep Terracotta Ridges */}
          <linearGradient id="foreMtnDark" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7a604c" />
            <stop offset="50%" stopColor="#674f3e" />
            <stop offset="100%" stopColor="#533e31" />
          </linearGradient>

          {/* Valley / Lake Wash */}
          <linearGradient id="lakeWater" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#b2c2c5" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#a1b4b7" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#8fa4a8" />
          </linearGradient>
        </defs>

        {/* Sky */}
        <rect width="1440" height="900" fill="url(#skyGrad)" />

        {/* Soft clouds & texture washes */}
        <ellipse cx="720" cy="180" rx="600" ry="120" fill="#ffffff" opacity="0.35" filter="blur(40px)" />
        <ellipse cx="300" cy="120" rx="350" ry="90" fill="#eedfd0" opacity="0.4" filter="blur(30px)" />
        <ellipse cx="1100" cy="150" rx="400" ry="100" fill="#d9e0e5" opacity="0.45" filter="blur(30px)" />

        {/* Far Distant Peaks */}
        <path
          d="M 0 380 Q 220 320, 480 340 T 960 310 Q 1200 330, 1440 370 L 1440 900 L 0 900 Z"
          fill="url(#distantMtn)"
          opacity="0.75"
        />

        {/* Intermediate Ridge Layer */}
        <path
          d="M 0 460 Q 280 390, 620 440 T 1140 400 Q 1300 420, 1440 470 L 1440 900 L 0 900 Z"
          fill="url(#midMtnWarm)"
          opacity="0.85"
        />

        {/* Left Scenic Bluffs (as in Jordan Hughes image) */}
        <path
          d="M -50 490 Q 150 430, 340 520 Q 260 620, 0 740 Z"
          fill="url(#foreMtnDark)"
        />

        {/* Right Mountain Slope (as in Jordan Hughes image) */}
        <path
          d="M 1080 430 Q 1260 510, 1490 620 L 1490 900 L 980 900 Q 1040 680, 1080 430 Z"
          fill="url(#foreMtnDark)"
        />

        {/* Lake / River Valley */}
        <path
          d="M 0 680 Q 420 620, 780 660 T 1440 700 L 1440 900 L 0 900 Z"
          fill="url(#lakeWater)"
        />

        {/* Shoreline details */}
        <path
          d="M 0 780 Q 360 740, 720 790 T 1440 820 L 1440 900 L 0 900 Z"
          fill="#6d5543"
          opacity="0.7"
        />
      </svg>
    </div>
  );
};
