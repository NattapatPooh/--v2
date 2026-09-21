import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { X, Sparkles } from 'lucide-react';
import { LevelData, CategoryData } from '../types';
import { sound } from '../utils/audio';
import scoreSummaryBg from '../assets/images/thai_score_summary_bg_1788941199285.jpg';

interface ResultModalProps {
  level: LevelData;
  category: CategoryData;
  stars: number;
  timeSpent: number;
  timeLeft?: number;
  onNextLevel: () => void;
  onReplay: () => void;
  onBackToMenu: () => void;
  hasNextLevel: boolean;
}

/**
 * 3D Faceted Golden Star SVG
 * Precisely mirrors the faceted jewel stars shown in the user's reference design
 */
const Faceted3DStar: React.FC<{
  size?: number;
  earned?: boolean;
  delay?: number;
  isCenter?: boolean;
}> = ({ size = 90, earned = true, delay = 0, isCenter = false }) => {
  // Pre-calculated coordinates for a 100x100 5-pointed star
  // Center: (50, 50), Outer R: 46, Inner r: 19.5
  const center = { x: 50, y: 50 };
  const outerTips = [
    { x: 50, y: 4 }, // 0: Top
    { x: 93.75, y: 35.79 }, // 1: Right-top
    { x: 77.04, y: 87.22 }, // 2: Right-bottom
    { x: 22.96, y: 87.22 }, // 3: Left-bottom
    { x: 6.25, y: 35.79 }, // 4: Left-top
  ];
  const innerValleys = [
    { x: 61.46, y: 34.22 }, // 0: Top-right
    { x: 68.54, y: 56.03 }, // 1: Bottom-right
    { x: 50, y: 69.5 }, // 2: Bottom-center
    { x: 31.46, y: 56.03 }, // 3: Bottom-left
    { x: 38.54, y: 34.22 }, // 4: Top-left
  ];

  return (
    <motion.div
      initial={{ scale: 0, rotate: -20 }}
      animate={{
        scale: earned ? 1 : 0.85,
        rotate: 0,
        y: isCenter ? -8 : 0,
      }}
      transition={{
        delay,
        type: 'spring',
        stiffness: 350,
        damping: 18,
      }}
      className={`relative select-none ${
        earned ? 'drop-shadow-[0_8px_10px_rgba(212,130,7,0.35)]' : 'opacity-40 grayscale'
      }`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
        <defs>
          {/* Gold gradients for lighted facets */}
          <linearGradient id="goldFacetLight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF285" />
            <stop offset="60%" stopColor="#F9CA24" />
            <stop offset="100%" stopColor="#F0932B" />
          </linearGradient>
          {/* Gold gradients for shaded facets */}
          <linearGradient id="goldFacetDark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F0932B" />
            <stop offset="70%" stopColor="#E58E26" />
            <stop offset="100%" stopColor="#B76B09" />
          </linearGradient>
          {/* Gray gradients for unearned stars */}
          <linearGradient id="grayFacetLight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F1F2F6" />
            <stop offset="100%" stopColor="#CED6E0" />
          </linearGradient>
          <linearGradient id="grayFacetDark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A4B0BE" />
            <stop offset="100%" stopColor="#747D8C" />
          </linearGradient>
        </defs>

        {/* 10 Facets (5 arms * 2 halves each) */}
        {outerTips.map((tip, i) => {
          const valleyLeft = innerValleys[(i + 4) % 5];
          const valleyRight = innerValleys[i];

          const pathLeft = `M ${center.x} ${center.y} L ${tip.x} ${tip.y} L ${valleyLeft.x} ${valleyLeft.y} Z`;
          const pathRight = `M ${center.x} ${center.y} L ${tip.x} ${tip.y} L ${valleyRight.x} ${valleyRight.y} Z`;

          return (
            <g key={`facet-pair-${i}`}>
              {/* Highlighted half-facet */}
              <path
                d={pathLeft}
                fill={earned ? 'url(#goldFacetLight)' : 'url(#grayFacetLight)'}
                stroke={earned ? '#D48207' : '#747D8C'}
                strokeWidth="0.5"
                strokeLinejoin="round"
              />
              {/* Shaded half-facet */}
              <path
                d={pathRight}
                fill={earned ? 'url(#goldFacetDark)' : 'url(#grayFacetDark)'}
                stroke={earned ? '#B76B09' : '#57606F'}
                strokeWidth="0.5"
                strokeLinejoin="round"
              />
            </g>
          );
        })}

        {/* Outer outline border for crisp cartoon definition */}
        <polygon
          points={outerTips
            .map((tip, i) => `${tip.x},${tip.y} ${innerValleys[i].x},${innerValleys[i].y}`)
            .join(' ')}
          fill="none"
          stroke={earned ? '#B76B09' : '#57606F'}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Specular sparkle gleam on the top tip */}
        {earned && (
          <circle cx="50" cy="12" r="2.5" fill="#FFFFFF" opacity="0.85" />
        )}
      </svg>
    </motion.div>
  );
};

export const ResultModal: React.FC<ResultModalProps> = ({
  level,
  category,
  stars,
  timeSpent,
  timeLeft,
  onNextLevel,
  onReplay,
  onBackToMenu,
  hasNextLevel,
}) => {
  const remainingSeconds = timeLeft !== undefined ? timeLeft : Math.max(0, 30 - timeSpent);

  useEffect(() => {
    // 1. Play joyful victory celebratory fanfare
    sound.playVictory();

    // 2. Pronounce the correct word for pedagogical enrichment
    const timerSpeak = setTimeout(() => {
      sound.speakThai(level.correctWord);
    }, 600);

    // 3. Trigger colorful celebratory confetti
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#FFE59A', '#FF4757', '#00D2D3', '#FF9FF3', '#54A0FF', '#FECA57'],
      });
    } catch {
      // ignore
    }

    // 4. Play star chime sounds sequentially
    for (let i = 0; i < stars; i++) {
      setTimeout(() => {
        sound.playStarPop(i);
      }, 350 + i * 200);
    }

    return () => clearTimeout(timerSpeak);
  }, [stars, level.correctWord]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-300">
      {/* 
        Main Result Screen Container:
        Faithfully matches the composition of the user-provided "สรุปคะแนน.png"
      */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', damping: 22, stiffness: 300 }}
        className="relative w-full max-w-4xl aspect-[16/9] min-h-[460px] sm:min-h-[520px] max-h-[95vh] rounded-3xl sm:rounded-4xl border-4 sm:border-6 border-[#4A2810] shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col items-center justify-between p-4 sm:p-6"
      >
        {/* Authentic Thai Village Illustration Background (Identical visual theme from image) */}
        <img
          src={scoreSummaryBg}
          alt="Thai Riverside Village"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
        />

        {/* Gentle Lighting Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/25 pointer-events-none" />

        {/* 
          ปุ่มกากบาทเพื่อกดออก (Top-Right Exit / Close X Button)
          Requested by user: "แต่ขอให้ใส่ปุ่มกากบาทเพื่อกดออกจะได้ไม่ซ้ำกับอันที่เราสร้างตอนแรกๆ มันงงๆ"
        */}
        <motion.button
          type="button"
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => {
            sound.playPop();
            onBackToMenu();
          }}
          className="absolute top-3 right-3 sm:top-5 sm:right-5 z-40 w-10 h-10 sm:w-13 sm:h-13 rounded-full bg-white hover:bg-red-50 text-[#2D3436] hover:text-[#D63031] border-3 sm:border-4 border-black shadow-[0_4px_0_#000000] flex items-center justify-center cursor-pointer active:translate-y-1 active:shadow-none transition-all"
          title="กดออก (กลับหน้าเลือกด่าน)"
          aria-label="กดออก"
        >
          <X className="w-6 h-6 sm:w-8 sm:h-8 stroke-[3.5]" />
        </motion.button>

        {/* ============================================================ */}
        {/* TOP SECTION: "เก่งมากจ้า!!!" (White text with Red Outline)   */}
        {/* ============================================================ */}
        <div className="relative z-20 pt-2 sm:pt-4 w-full flex justify-center">
          <motion.div
            initial={{ scale: 0.8, y: -20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 300, damping: 16 }}
            className="w-full flex justify-center"
          >
            <svg
              viewBox="0 0 600 85"
              className="w-full max-w-[340px] sm:max-w-[480px] md:max-w-[560px] h-auto drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]"
            >
              <text
                x="300"
                y="62"
                textAnchor="middle"
                fill="#FFFFFF"
                stroke="#FF3838"
                strokeWidth="14"
                strokeLinejoin="round"
                paintOrder="stroke fill"
                className="font-black select-none text-[42px] sm:text-[48px]"
                style={{
                  fontFamily: "'Prompt', 'Mali', system-ui, sans-serif",
                  letterSpacing: '0.04em',
                }}
              >
                เก่งมากจ้า!!!
              </text>
            </svg>
          </motion.div>
        </div>

        {/* ============================================================ */}
        {/* MIDDLE SECTION: 3 Faceted Golden Stars on Cream Platform      */}
        {/* ============================================================ */}
        <div className="relative z-20 flex flex-col items-center my-auto">
          {/* Cream Rounded Platform */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 280, damping: 18 }}
            className="relative px-6 sm:px-12 py-2 sm:py-3 rounded-[28px] sm:rounded-[36px] bg-[#EFE3C3]/90 border-3 sm:border-4 border-[#D9C49A] shadow-[0_6px_16px_rgba(0,0,0,0.18)] flex items-center justify-center gap-4 sm:gap-8"
          >
            {/* Left Star */}
            <div className="transform -rotate-6">
              <Faceted3DStar
                size={window.innerWidth < 640 ? 68 : 88}
                earned={stars >= 1}
                delay={0.3}
              />
            </div>

            {/* Middle Star (Raised slightly higher, larger, with sparkles) */}
            <div className="transform -translate-y-2 sm:-translate-y-3 scale-110">
              <Faceted3DStar
                size={window.innerWidth < 640 ? 82 : 105}
                earned={stars >= 2}
                delay={0.5}
                isCenter={true}
              />
              {stars >= 2 && (
                <motion.div
                  animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                  className="absolute -top-3 -right-2 text-amber-300 pointer-events-none"
                >
                  <Sparkles className="w-5 h-5 drop-shadow-md" />
                </motion.div>
              )}
            </div>

            {/* Right Star */}
            <div className="transform rotate-6">
              <Faceted3DStar
                size={window.innerWidth < 640 ? 68 : 88}
                earned={stars >= 3}
                delay={0.7}
              />
            </div>
          </motion.div>

          {/* Subtitle Message: "ด่านต่อไปพวกเรารออยู่นะ" (White with Sky-Blue Outline) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, type: 'spring' }}
            className="w-full flex justify-center mt-2 sm:mt-3"
          >
            <svg
              viewBox="0 0 600 68"
              className="w-full max-w-[320px] sm:max-w-[440px] md:max-w-[520px] h-auto drop-shadow-[0_4px_6px_rgba(0,0,0,0.35)]"
            >
              <text
                x="300"
                y="50"
                textAnchor="middle"
                fill="#FFFFFF"
                stroke="#00A8FF"
                strokeWidth="11"
                strokeLinejoin="round"
                paintOrder="stroke fill"
                className="font-black select-none text-[34px] sm:text-[40px]"
                style={{
                  fontFamily: "'Prompt', 'Mali', system-ui, sans-serif",
                  letterSpacing: '0.02em',
                }}
              >
                ด่านต่อไปพวกเรารอยู่นะ
              </text>
            </svg>
          </motion.div>

          {/* Countdown timer remaining and star tier indicator */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-2 px-3.5 py-1 rounded-full bg-black/45 backdrop-blur-xs border border-white/25 text-white text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-xs select-none"
            title={`กติกาดาว: 30-15 วินาที = 3 ดาว, 15-5 วินาที = 2 ดาว, 5-1 วินาที = 1 ดาว (นับถอยหลัง)`}
          >
            <span>⏱️ เวลานับถอยหลังคงเหลือ: <span className="font-extrabold text-amber-300">{remainingSeconds}</span> วินาที</span>
            <span className="text-amber-200">({stars} ดาว ⭐)</span>
          </motion.div>
        </div>

        {/* ============================================================ */}
        {/* BOTTOM SECTION: The 2 Buttons: "เล่นอีกรอบ" & "ถัดไป"          */}
        {/* ============================================================ */}
        <div className="relative z-20 pb-3 sm:pb-5 w-full flex items-center justify-center gap-3 sm:gap-6">
          {/* Button 1: เล่นอีกรอบ (Teal Turquoise Pill Button) */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              sound.playPop();
              onReplay();
            }}
            className="group relative flex items-center justify-center px-6 sm:px-9 py-2.5 sm:py-3.5 rounded-full bg-[#00D2D3] hover:bg-[#00E5E5] border-3 sm:border-4 border-black shadow-[0_5px_0_#000000] active:translate-y-1 active:shadow-[0_1px_0_#000000] cursor-pointer transition-all"
            title="เล่นด่านนี้ใหม่อีกรอบ"
          >
            <span
              className="text-white font-black text-lg sm:text-2xl tracking-wide select-none drop-shadow-[0_2px_2px_rgba(0,0,0,0.4)]"
              style={{ fontFamily: "'Prompt', sans-serif" }}
            >
              เล่นอีกรอบ
            </span>
          </motion.button>

          {/* Button 2: ถัดไป (Bright Pink Pill Button) */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              sound.playPop();
              if (hasNextLevel) {
                onNextLevel();
              } else {
                onBackToMenu();
              }
            }}
            className="group relative flex items-center justify-center px-8 sm:px-12 py-2.5 sm:py-3.5 rounded-full bg-[#FF477E] hover:bg-[#FF5E8E] border-3 sm:border-4 border-black shadow-[0_5px_0_#000000] active:translate-y-1 active:shadow-[0_1px_0_#000000] cursor-pointer transition-all"
            title="ไปเล่นด่านถัดไป"
          >
            <span
              className="text-white font-black text-lg sm:text-2xl tracking-wide select-none drop-shadow-[0_2px_2px_rgba(0,0,0,0.4)]"
              style={{ fontFamily: "'Prompt', sans-serif" }}
            >
              ถัดไป
            </span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};
