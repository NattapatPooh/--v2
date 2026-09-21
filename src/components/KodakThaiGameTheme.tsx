import React from 'react';

/**
 * 1. Diamond Rhombus Back Button (ปุ่มย้อนกลับทรงสี่เหลี่ยมข้าวหลามตัด)
 * Rotated 45 degrees, rounded corners, soft blue with bold dark chevron arrow.
 */
export const DiamondBackButton: React.FC<{ onClick: () => void; className?: string }> = ({
  onClick,
  className = '',
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative w-11 h-11 sm:w-14 sm:h-14 rounded-2xl bg-[#7FB3D8] hover:bg-[#6EA5CB] active:bg-[#5D94B8] border-3 border-[#5382A2] shadow-[0_4px_12px_rgba(0,0,0,0.35)] flex items-center justify-center rotate-45 cursor-pointer transition-all duration-150 active:scale-95 select-none ${className}`}
      title="กลับสู่หน้าหลัก"
    >
      <div className="-rotate-45 text-[#1B364E] flex items-center justify-center">
        <svg
          className="w-5 h-5 sm:w-7 sm:h-7"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="14 18 8 12 14 6" />
        </svg>
      </div>
    </button>
  );
};

/**
 * 2. Retro Blue Alarm Clock (นาฬิกาปลุกสีน้ำเงิน)
 */
export const RetroAlarmClock: React.FC<{ className?: string; isUrgent?: boolean }> = ({
  className = 'w-12 h-12',
  isUrgent = false,
}) => {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`${className} ${isUrgent ? 'animate-bounce' : ''}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Twin Bells */}
      <ellipse cx="25" cy="24" rx="14" ry="9" fill="#4B6FD8" transform="rotate(-30 25 24)" />
      <ellipse cx="75" cy="24" rx="14" ry="9" fill="#4B6FD8" transform="rotate(30 75 24)" />
      {/* Top Hammer / Handle */}
      <rect x="47" y="10" width="6" height="12" rx="3" fill="#2E4A9E" />
      <circle cx="50" cy="10" r="4" fill="#6C8EF8" />

      {/* Clock Feet */}
      <rect x="22" y="78" width="8" height="16" rx="4" fill="#2E4A9E" transform="rotate(25 26 86)" />
      <rect x="70" y="78" width="8" height="16" rx="4" fill="#2E4A9E" transform="rotate(-25 74 86)" />

      {/* Main Clock Outer Ring */}
      <circle cx="50" cy="54" r="38" fill="#243C88" />
      <circle cx="50" cy="54" r="34" fill="#3B5FCD" />
      {/* Clock Face (White) */}
      <circle cx="50" cy="54" r="28" fill="#FFFFFF" />

      {/* Hour ticks */}
      <circle cx="50" cy="30" r="2.5" fill="#243C88" />
      <circle cx="74" cy="54" r="2.5" fill="#243C88" />
      <circle cx="50" cy="78" r="2.5" fill="#243C88" />
      <circle cx="26" cy="54" r="2.5" fill="#243C88" />

      {/* Hands */}
      {/* Hour hand */}
      <line x1="50" y1="54" x2="62" y2="42" stroke="#243C88" strokeWidth="4" strokeLinecap="round" />
      {/* Minute hand */}
      <line x1="50" y1="54" x2="50" y2="34" stroke="#4B6FD8" strokeWidth="3" strokeLinecap="round" />
      {/* Center cap */}
      <circle cx="50" cy="54" r="3.5" fill="#E74C3C" />
    </svg>
  );
};

/**
 * 3. Cute Baby Elephant holding Thai Flag (ลูกช้างโบกธงไตรรงค์ไทย)
 * Styled exactly like the mockup: seated happily, trunk raised holding the Thai national flag.
 */
export const FlagHoldingElephant: React.FC<{ className?: string }> = ({
  className = 'w-24 h-24',
}) => {
  return (
    <svg viewBox="0 0 160 140" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Flagpole */}
      <line x1="52" y1="12" x2="52" y2="82" stroke="#5D3A1A" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="52" cy="11" r="3" fill="#F1C40F" />

      {/* Thai Flag (Waving stripes: Red, White, Blue, White, Red) */}
      <g transform="translate(52, 12)">
        {/* Red Top */}
        <path d="M0,0 Q24,-3 48,0 L48,7 Q24,4 0,7 Z" fill="#EF4444" />
        {/* White */}
        <path d="M0,7 Q24,4 48,7 L48,14 Q24,11 0,14 Z" fill="#FFFFFF" />
        {/* Blue (Double height) */}
        <path d="M0,14 Q24,11 48,14 L48,28 Q24,25 0,28 Z" fill="#2563EB" />
        {/* White */}
        <path d="M0,28 Q24,25 48,28 L48,35 Q24,32 0,35 Z" fill="#FFFFFF" />
        {/* Red Bottom */}
        <path d="M0,35 Q24,32 48,35 L48,42 Q24,39 0,42 Z" fill="#EF4444" />
      </g>

      {/* Tail on right */}
      <path d="M128,102 Q138,98 136,110" fill="none" stroke="#9DB2CE" strokeWidth="3" strokeLinecap="round" />
      <circle cx="137" cy="111" r="2.5" fill="#7D93AF" />

      {/* Elephant Body */}
      <ellipse cx="104" cy="100" rx="26" ry="22" fill="#B3C4DB" />

      {/* Back foot */}
      <ellipse cx="122" cy="118" rx="8" ry="6" fill="#9DB2CE" />
      {/* Front feet */}
      <rect x="88" y="104" width="12" height="18" rx="6" fill="#9DB2CE" />
      <rect x="106" y="104" width="12" height="18" rx="6" fill="#9DB2CE" />
      {/* Toenails */}
      <circle cx="91" cy="120" r="2" fill="#FFFFFF" opacity="0.8" />
      <circle cx="95" cy="121" r="2" fill="#FFFFFF" opacity="0.8" />
      <circle cx="109" cy="120" r="2" fill="#FFFFFF" opacity="0.8" />
      <circle cx="113" cy="121" r="2" fill="#FFFFFF" opacity="0.8" />

      {/* Left Ear */}
      <ellipse cx="64" cy="74" rx="14" ry="18" fill="#A5B7CF" transform="rotate(-15 64 74)" />
      <ellipse cx="64" cy="74" rx="9" ry="13" fill="#FFAAA6" opacity="0.75" transform="rotate(-15 64 74)" />

      {/* Elephant Head */}
      <circle cx="92" cy="72" r="22" fill="#BCCCE2" />

      {/* Right Ear */}
      <ellipse cx="118" cy="72" rx="14" ry="18" fill="#A5B7CF" transform="rotate(15 118 72)" />
      <ellipse cx="118" cy="72" rx="9" ry="13" fill="#FFAAA6" opacity="0.75" transform="rotate(15 118 72)" />

      {/* Cute Eyes with sparkles */}
      <ellipse cx="82" cy="69" rx="3.5" ry="4.5" fill="#2C3A47" />
      <ellipse cx="100" cy="69" rx="3.5" ry="4.5" fill="#2C3A47" />
      <circle cx="83.5" cy="67.5" r="1.5" fill="#FFFFFF" />
      <circle cx="101.5" cy="67.5" r="1.5" fill="#FFFFFF" />

      {/* Cheerful Blush */}
      <ellipse cx="75" cy="76" rx="5" ry="3.5" fill="#FF8E9E" opacity="0.7" />
      <ellipse cx="107" cy="76" rx="5" ry="3.5" fill="#FF8E9E" opacity="0.7" />

      {/* Happy Smile */}
      <path d="M88,77 Q92,82 96,77" fill="none" stroke="#2C3A47" strokeWidth="2" strokeLinecap="round" />

      {/* Trunk curled holding flagpole */}
      <path
        d="M87,74 C78,78 62,80 54,68 C50,62 52,56 56,58 C60,60 58,66 64,68 C72,70 82,72 87,74 Z"
        fill="#A5B7CF"
        stroke="#8FA2BA"
        strokeWidth="1"
      />
    </svg>
  );
};

/**
 * 4. Plumeria / Frangipani Flowers (ดอกลีลาวดี)
 * - Yellow / Cream for Left Side
 * - Pink / Pastel for Right Side
 */
export const PlumeriaFlower: React.FC<{
  colorScheme?: 'yellow' | 'pink';
  size?: number;
  rotation?: number;
}> = ({ colorScheme = 'yellow', size = 52, rotation = 0 }) => {
  const isYellow = colorScheme === 'yellow';
  const petalFill = isYellow ? '#FFFFFF' : '#FFB6C8';
  const petalStroke = isYellow ? '#FFF3B0' : '#FFA0BA';
  const centerFill = isYellow ? '#FDCB6E' : '#FF7675';
  const centerCore = isYellow ? '#FFA502' : '#E84118';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={{ transform: `rotate(${rotation}deg)` }}
      xmlns="http://www.w3.org/2000/svg"
      className="filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)] select-none pointer-events-none"
    >
      <defs>
        <radialGradient id={`petalGrad-${colorScheme}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={petalFill} />
          <stop offset="75%" stopColor={petalFill} />
          <stop offset="100%" stopColor={petalStroke} />
        </radialGradient>
      </defs>

      {/* 5 Overlapping Petals */}
      {[0, 72, 144, 216, 288].map((angle, i) => (
        <path
          key={i}
          d="M50,50 C40,28 36,8 50,4 C64,8 60,28 50,50 Z"
          fill={`url(#petalGrad-${colorScheme})`}
          stroke={isYellow ? '#FFF' : '#FFCCD7'}
          strokeWidth="1"
          transform={`rotate(${angle} 50 50)`}
        />
      ))}

      {/* Flower Center with yellow/golden glow */}
      <circle cx="50" cy="50" r="14" fill={centerFill} opacity="0.9" />
      <circle cx="50" cy="50" r="7" fill={centerCore} />
    </svg>
  );
};

/**
 * 5. Traditional Thai Temple Pagoda Silhouette (เงาวัดไทย มณฑป/ปรางค์)
 */
export const ThaiTempleSilhouette: React.FC<{ className?: string }> = ({
  className = 'w-24 h-24',
}) => {
  return (
    <svg viewBox="0 0 120 120" className={className} xmlns="http://www.w3.org/2000/svg">
      <g fill="#383434" opacity="0.95">
        {/* Central Spire */}
        <polygon points="60,6 57,26 63,26" />
        <circle cx="60" cy="5" r="2.5" />
        <rect x="55" y="26" width="10" height="6" rx="2" />
        {/* Tiered Main Roof */}
        <polygon points="60,32 40,48 80,48" />
        <polygon points="60,46 32,64 88,64" />
        <polygon points="60,62 24,80 96,80" />
        {/* Curved Roof Tips */}
        <path d="M24,80 Q16,74 18,68" stroke="#383434" strokeWidth="3" fill="none" />
        <path d="M96,80 Q104,74 102,68" stroke="#383434" strokeWidth="3" fill="none" />
        {/* Main Base & Pillars */}
        <rect x="28" y="80" width="64" height="34" rx="2" />
        {/* Arched Doorway */}
        <path d="M52,114 L52,94 A8,8 0 0,1 68,94 L68,114 Z" fill="#222020" />
        {/* Side Pillars */}
        <rect x="34" y="84" width="6" height="26" fill="#222020" rx="1" />
        <rect x="80" y="84" width="6" height="26" fill="#222020" rx="1" />
      </g>
    </svg>
  );
};

/**
 * 6. Royal Decorated Elephants (แม่ช้างและลูกช้างเครื่องทรงพระคชาธาร)
 * Traditional Thai royal ceremonial elephants adorned in red and gold cloths.
 */
export const RoyalDecoratedElephants: React.FC<{ className?: string }> = ({
  className = 'w-36 h-28',
}) => {
  return (
    <svg viewBox="0 0 200 130" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* ================= MOTHER ELEPHANT (RIGHT) ================= */}
      <g transform="translate(45, 0)">
        {/* Tail */}
        <path d="M125,75 Q135,70 132,85" fill="none" stroke="#7F8C8D" strokeWidth="3" strokeLinecap="round" />

        {/* Elephant Body */}
        <ellipse cx="80" cy="72" rx="42" ry="34" fill="#95A5A6" />

        {/* Back Legs */}
        <rect x="100" y="78" width="16" height="36" rx="7" fill="#7F8C8D" />
        <rect x="78" y="80" width="15" height="34" rx="7" fill="#7F8C8D" />

        {/* Front Legs */}
        <rect x="42" y="80" width="16" height="36" rx="7" fill="#88989A" />
        <rect x="24" y="78" width="15" height="36" rx="7" fill="#7F8C8D" />

        {/* Traditional Royal Red & Gold Saddle Blanket (ผ้าคลุมหลังช้างทรง) */}
        <path
          d="M52,50 Q80,46 108,50 L104,78 Q80,74 56,78 Z"
          fill="#D63031"
          stroke="#F1C40F"
          strokeWidth="3.5"
        />
        {/* Golden Tassels / Diamond embroidery */}
        <circle cx="64" cy="64" r="3" fill="#F1C40F" />
        <circle cx="80" cy="64" r="4" fill="#FEEAA7" stroke="#F1C40F" strokeWidth="1.5" />
        <circle cx="96" cy="64" r="3" fill="#F1C40F" />
        <path d="M58,78 Q80,82 102,78" fill="none" stroke="#F39C12" strokeWidth="2.5" strokeDasharray="3,3" />

        {/* Head */}
        <circle cx="28" cy="52" r="24" fill="#A4B0BE" />

        {/* Royal Headpiece / Frontlet (ตาข่ายหน้าช้าง) */}
        <path d="M16,42 Q28,34 38,44" fill="none" stroke="#F1C40F" strokeWidth="3" />
        <circle cx="28" cy="38" r="4" fill="#E74C3C" stroke="#F1C40F" strokeWidth="1.5" />

        {/* Ear */}
        <ellipse cx="40" cy="56" rx="14" ry="18" fill="#88989A" transform="rotate(10 40 56)" />
        <ellipse cx="40" cy="56" rx="9" ry="12" fill="#FFAAA6" opacity="0.6" transform="rotate(10 40 56)" />

        {/* Eye */}
        <circle cx="20" cy="48" r="3.5" fill="#2C3A47" />
        <circle cx="21" cy="46.5" r="1.2" fill="#FFFFFF" />

        {/* Tusk */}
        <path d="M16,62 Q8,66 6,56" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />

        {/* Trunk swinging forward */}
        <path
          d="M18,56 C14,64 4,70 -8,66 C-14,62 -12,56 -6,58 C0,60 -2,64 6,60 C12,56 16,52 18,56 Z"
          fill="#95A5A6"
          stroke="#7F8C8D"
          strokeWidth="1.2"
        />
      </g>

      {/* ================= BABY ELEPHANT (LEFT) ================= */}
      <g transform="translate(0, 48) scale(0.6)">
        <ellipse cx="80" cy="72" rx="38" ry="30" fill="#BDC3C7" />
        <rect x="94" y="76" width="14" height="28" rx="6" fill="#95A5A6" />
        <rect x="74" y="78" width="13" height="26" rx="6" fill="#95A5A6" />
        <rect x="44" y="78" width="14" height="28" rx="6" fill="#A6B3B5" />
        <rect x="28" y="76" width="13" height="28" rx="6" fill="#95A5A6" />

        {/* Baby's Red Saddle */}
        <path d="M54,54 Q78,50 102,54 L98,74 Q78,70 58,74 Z" fill="#D63031" stroke="#F1C40F" strokeWidth="3" />
        <circle cx="78" cy="64" r="3" fill="#FEEAA7" />

        {/* Baby Head & Ear */}
        <circle cx="32" cy="54" r="20" fill="#CFD8DC" />
        <ellipse cx="42" cy="56" rx="11" ry="14" fill="#A6B3B5" />
        <ellipse cx="42" cy="56" rx="7" ry="9" fill="#FFAAA6" opacity="0.6" />

        {/* Baby Eye & Smile */}
        <circle cx="24" cy="50" r="3" fill="#2C3A47" />
        <circle cx="25" cy="49" r="1" fill="#FFFFFF" />

        {/* Baby Trunk */}
        <path
          d="M22,58 C16,66 6,70 -2,66 C-6,62 -4,58 0,60 C4,62 6,64 12,60 Z"
          fill="#BDC3C7"
          stroke="#95A5A6"
          strokeWidth="1"
        />
      </g>
    </svg>
  );
};

/**
 * 7. Cute Sprouting Tulips / Pastel Flowers around the bottom decor
 */
export const SproutingPastelFlowers: React.FC<{ color?: 'pink' | 'yellow'; size?: number }> = ({
  color = 'yellow',
  size = 28,
}) => {
  const isYellow = color === 'yellow';
  const petalColor = isYellow ? '#FFEAA7' : '#FFB8D2';
  const stemColor = '#78B884';

  return (
    <svg width={size} height={size * 1.3} viewBox="0 0 40 52" xmlns="http://www.w3.org/2000/svg" className="select-none pointer-events-none">
      {/* Green Stem */}
      <path d="M20,24 Q18,38 20,52" fill="none" stroke={stemColor} strokeWidth="3.5" strokeLinecap="round" />
      {/* Leaves */}
      <path d="M20,38 Q10,34 12,28 Q18,34 20,38 Z" fill={stemColor} />
      <path d="M20,44 Q30,40 28,34 Q22,40 20,44 Z" fill={stemColor} />
      {/* Flower Petals (Tulip shape) */}
      <path d="M12,12 C8,22 14,26 20,26 C26,26 32,22 28,12 C24,18 20,8 20,8 C20,8 16,18 12,12 Z" fill={petalColor} stroke="#E29578" strokeWidth="1" />
    </svg>
  );
};
