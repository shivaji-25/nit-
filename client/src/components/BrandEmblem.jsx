import React from 'react';

export const BrandEmblem = ({ size = 46 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="brand-emblem-svg"
  >
    {/* Top-Left Parallelogram (Vibrant Electric Blue) */}
    <path
      d="M26 8L44 8L30 30L12 30L26 8Z"
      fill="#0070F3"
    />
    {/* Bottom-Right Overlapping Parallelogram (Deep Royal Indigo) */}
    <path
      d="M34 22L52 22L38 44L20 44L34 22Z"
      fill="#2563EB"
    />
  </svg>
);
