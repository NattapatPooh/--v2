import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { sound } from '../utils/audio';

interface BubbleTransitionOverlayProps {
  show: boolean;
  onFinished?: () => void;
  title?: string;
}

interface BubbleConfig {
  id: number;
  size: number;
  left: string;
  top: string;
  color: string;
  glowColor: string;
  delay: number;
  face?: 'happy' | 'cute' | 'wink' | 'sparkle';
  floatDuration: number;
  xOffset: number[];
  yOffset: number[];
}

const BUBBLE_CONFIGS: BubbleConfig[] = [
  // Big Center Hero Bubble
  {
    id: 1,
    size: 130,
    left: '50%',
    top: '46%',
    color: 'from-[#4DEEEA]/90 via-[#70E000]/70 to-[#38B000]/60',
    glowColor: 'rgba(77, 238, 234, 0.65)',
    delay: 0,
    face: 'happy',
    floatDuration: 0.75,
    xOffset: [0, -12, 10, -5, 0],
    yOffset: [130, -35, 12, -6, 0],
  },
  // Left Pink Cute Bubble
  {
    id: 2,
    size: 105,
    left: '26%',
    top: '40%',
    color: 'from-[#FF6B9E]/90 via-[#FF85A1]/75 to-[#FFA3B5]/60',
    glowColor: 'rgba(255, 107, 158, 0.65)',
    delay: 0.05,
    face: 'cute',
    floatDuration: 0.8,
    xOffset: [-40, 10, -6, 2, 0],
    yOffset: [150, -28, 10, -4, 0],
  },
  // Right Golden Sunny Bubble
  {
    id: 3,
    size: 110,
    left: '73%',
    top: '42%',
    color: 'from-[#FFD166]/90 via-[#F7B05B]/80 to-[#F28482]/60',
    glowColor: 'rgba(255, 209, 102, 0.65)',
    delay: 0.08,
    face: 'wink',
    floatDuration: 0.82,
    xOffset: [40, -10, 6, -2, 0],
    yOffset: [140, -30, 10, -5, 0],
  },
  // Top Left Lavender Bubble
  {
    id: 4,
    size: 78,
    left: '18%',
    top: '25%',
    color: 'from-[#C77DFF]/85 via-[#9D4EDD]/70 to-[#7B2CBF]/50',
    glowColor: 'rgba(199, 125, 255, 0.55)',
    delay: 0.1,
    face: 'sparkle',
    floatDuration: 0.7,
    xOffset: [-20, 8, -5, 0],
    yOffset: [90, -20, 6, 0],
  },
  // Top Right Cyan Bubble
  {
    id: 5,
    size: 82,
    left: '80%',
    top: '24%',
    color: 'from-[#00E5FF]/85 via-[#00B4D8]/70 to-[#0077B6]/50',
    glowColor: 'rgba(0, 229, 255, 0.55)',
    delay: 0.12,
    face: 'cute',
    floatDuration: 0.72,
    xOffset: [20, -8, 5, 0],
    yOffset: [90, -18, 6, 0],
  },
  // Bottom Left Turquoise Bubble
  {
    id: 6,
    size: 70,
    left: '36%',
    top: '68%',
    color: 'from-[#38EF7D]/85 via-[#11998E]/70 to-[#0F7C73]/50',
    glowColor: 'rgba(56, 239, 125, 0.55)',
    delay: 0.06,
    face: 'sparkle',
    floatDuration: 0.78,
    xOffset: [0, 8, -4, 0],
    yOffset: [110, -18, 5, 0],
  },
  // Bottom Right Peach Bubble
  {
    id: 7,
    size: 75,
    left: '64%',
    top: '66%',
    color: 'from-[#FF9E79]/90 via-[#FF6F59]/75 to-[#E0533C]/50',
    glowColor: 'rgba(255, 158, 121, 0.55)',
    delay: 0.07,
    face: 'happy',
    floatDuration: 0.76,
    xOffset: [0, -8, 4, 0],
    yOffset: [110, -20, 5, 0],
  },
  // Extra Mini Bubbles
  {
    id: 8,
    size: 42,
    left: '42%',
    top: '22%',
    color: 'from-[#48CAE4]/80 to-[#0096C7]/60',
    glowColor: 'rgba(72, 202, 228, 0.4)',
    delay: 0.14,
    floatDuration: 0.65,
    xOffset: [0, -6, 3, 0],
    yOffset: [80, -15, 0],
  },
  {
    id: 9,
    size: 38,
    left: '58%',
    top: '20%',
    color: 'from-[#FFB5A7]/80 to-[#FCD5CE]/60',
    glowColor: 'rgba(255, 181, 167, 0.4)',
    delay: 0.15,
    floatDuration: 0.65,
    xOffset: [0, 6, -3, 0],
    yOffset: [80, -15, 0],
  },
];

/**
 * Cute bouncing bubble SVG component
 */
const BouncingBubble: React.FC<{
  config: BubbleConfig;
}> = ({ config }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.2,
        x: '-50%',
        y: '-50%',
      }}
      animate={{
        opacity: [0, 1, 1, 0.95],
        scale: [0.2, 1.22, 0.92, 1.08, 1],
        x: ['-50%', '-50%'],
        y: ['-50%', '-50%'],
      }}
      transition={{
        duration: 0.55,
        delay: config.delay,
        times: [0, 0.45, 0.7, 0.88, 1],
        ease: 'easeOut',
      }}
      className="absolute flex items-center justify-center pointer-events-none select-none z-30"
      style={{
        left: config.left,
        top: config.top,
        width: config.size,
        height: config.size,
      }}
    >
      {/* Wobble / Bounce Physics Layer */}
      <motion.div
        animate={{
          y: config.yOffset.map((v) => v * 0.35),
          x: config.xOffset.map((v) => v * 0.4),
          rotate: [-6, 6, -4, 3, 0],
          scaleY: [0.88, 1.14, 0.94, 1.05, 1],
          scaleX: [1.14, 0.88, 1.06, 0.96, 1],
        }}
        transition={{
          duration: config.floatDuration,
          delay: config.delay + 0.05,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        className="relative w-full h-full rounded-full flex items-center justify-center"
        style={{
          background: `radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.4) 22%, transparent 58%), linear-gradient(135deg, ${config.glowColor} 0%, rgba(255,255,255,0.1) 100%)`,
          boxShadow: `inset 0 -8px 16px rgba(0, 0, 0, 0.12), inset 0 6px 12px rgba(255, 255, 255, 0.85), 0 10px 24px ${config.glowColor}`,
          border: '2.5px solid rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(2px)',
        }}
      >
        {/* Shiny Top-Left Crescent Highlight */}
        <div className="absolute top-[12%] left-[14%] w-[32%] h-[20%] rounded-full bg-white/90 transform -rotate-35 filter blur-[0.6px]" />
        {/* Shiny Bottom-Right Glow Refraction */}
        <div className="absolute bottom-[10%] right-[12%] w-[24%] h-[15%] rounded-full bg-white/45 transform -rotate-30 filter blur-[1px]" />

        {/* Kawaii Faces on Main Bubbles */}
        {config.face === 'happy' && (
          <div className="relative flex flex-col items-center justify-center pointer-events-none">
            {/* Eyes */}
            <div className="flex items-center gap-4 text-[#1B4332] font-black">
              {/* Left Eye: Curved happy arch */}
              <div className="w-2.5 h-2.5 rounded-full bg-[#1B4332] shadow-xs" />
              {/* Right Eye */}
              <div className="w-2.5 h-2.5 rounded-full bg-[#1B4332] shadow-xs" />
            </div>
            {/* Mouth */}
            <div className="w-3.5 h-2 border-b-3 border-[#1B4332] rounded-full mt-0.5" />
            {/* Rosy Blushes */}
            <div className="absolute -left-1 top-2.5 w-2.5 h-1.5 rounded-full bg-pink-400/80 filter blur-[0.5px]" />
            <div className="absolute -right-1 top-2.5 w-2.5 h-1.5 rounded-full bg-pink-400/80 filter blur-[0.5px]" />
          </div>
        )}

        {config.face === 'cute' && (
          <div className="relative flex flex-col items-center justify-center pointer-events-none">
            <div className="flex items-center gap-3.5 text-[#590D22]">
              {/* Big sparkling cute eyes */}
              <div className="relative w-3 h-3 rounded-full bg-[#590D22] flex items-start justify-end p-0.5">
                <div className="w-1.2 h-1.2 rounded-full bg-white" />
              </div>
              <div className="relative w-3 h-3 rounded-full bg-[#590D22] flex items-start justify-end p-0.5">
                <div className="w-1.2 h-1.2 rounded-full bg-white" />
              </div>
            </div>
            {/* Tiny cute 'w' mouth */}
            <div className="text-[12px] font-black text-[#590D22] leading-none -mt-0.5">
              ω
            </div>
            {/* Blushes */}
            <div className="absolute -left-2 top-2.5 w-2.5 h-1.5 rounded-full bg-rose-400/90 filter blur-[0.5px]" />
            <div className="absolute -right-2 top-2.5 w-2.5 h-1.5 rounded-full bg-rose-400/90 filter blur-[0.5px]" />
          </div>
        )}

        {config.face === 'wink' && (
          <div className="relative flex flex-col items-center justify-center pointer-events-none">
            <div className="flex items-center gap-3.5 text-[#7F4F24]">
              {/* Wink left eye: > */}
              <div className="text-[13px] font-black leading-none">{`>`}</div>
              {/* Open round eye right */}
              <div className="w-2.5 h-2.5 rounded-full bg-[#7F4F24] relative">
                <div className="absolute top-0.5 right-0.5 w-1 h-1 rounded-full bg-white" />
              </div>
            </div>
            {/* Open smile */}
            <div className="w-3 h-1.5 bg-[#7F4F24] rounded-b-full mt-0.5" />
            {/* Peach blushes */}
            <div className="absolute -left-1 top-2.5 w-2.5 h-1.5 rounded-full bg-amber-400/80 filter blur-[0.5px]" />
            <div className="absolute -right-1 top-2.5 w-2.5 h-1.5 rounded-full bg-amber-400/80 filter blur-[0.5px]" />
          </div>
        )}

        {config.face === 'sparkle' && (
          <div className="text-white/90 text-sm font-black drop-shadow-md select-none">
            ✨
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export const BubbleTransitionOverlay: React.FC<BubbleTransitionOverlayProps> = ({
  show,
  onFinished,
  title = 'เย้! ป๊อบบับเบิ้ล~ ✨',
}) => {
  useEffect(() => {
    if (show) {
      sound.playBubbleTransition();

      // Total transition lasts ~780ms (fast, cute, snappy as requested: "แป๊บเดียว")
      const timer = setTimeout(() => {
        if (onFinished) {
          onFinished();
        }
      }, 780);

      return () => clearTimeout(timer);
    }
  }, [show, onFinished]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="bubble-scene-transition"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.26, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden pointer-events-auto select-none"
          style={{
            background: 'radial-gradient(circle at 50% 45%, rgba(191, 232, 245, 0.94) 0%, rgba(135, 206, 235, 0.96) 60%, rgba(94, 184, 219, 0.98) 100%)',
            backdropFilter: 'blur(8px)',
          }}
        >
          {/* Subtle playful polka-dot decorative background overlay */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#ffffff 2.5px, transparent 2.5px)',
              backgroundSize: '28px 28px',
            }}
          />

          {/* Render Bouncing Cartoon Bubbles */}
          {BUBBLE_CONFIGS.map((config) => (
            <BouncingBubble key={config.id} config={config} />
          ))}

          {/* Cheerful Floating Sparkles */}
          {[
            { top: '15%', left: '30%', delay: 0.1, size: 'text-xl' },
            { top: '18%', left: '70%', delay: 0.18, size: 'text-2xl' },
            { top: '55%', left: '15%', delay: 0.12, size: 'text-lg' },
            { top: '60%', left: '85%', delay: 0.22, size: 'text-xl' },
            { top: '78%', left: '48%', delay: 0.15, size: 'text-2xl' },
          ].map((sp, idx) => (
            <motion.div
              key={idx}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1.3, 1],
                opacity: [0, 1, 0.85],
                rotate: [0, 180, 360],
              }}
              transition={{
                delay: sp.delay,
                duration: 0.6,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
              className={`absolute text-amber-200 pointer-events-none drop-shadow-md ${sp.size}`}
              style={{ top: sp.top, left: sp.left }}
            >
              ✦
            </motion.div>
          ))}

          {/* Cute Center Status Pill */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.45, type: 'spring', stiffness: 340, damping: 16 }}
            className="relative z-40 mt-64 sm:mt-72 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-white/95 border-3 sm:border-4 border-[#2C3E50] shadow-[0_6px_0_#2C3E50] flex items-center justify-center gap-2.5"
          >
            {/* Tiny bouncing bubble icon */}
            <motion.div
              animate={{ y: [-3, 3, -3], scale: [1, 1.15, 1] }}
              transition={{ repeat: Infinity, duration: 0.6 }}
              className="w-4 h-4 rounded-full bg-gradient-to-tr from-sky-400 to-cyan-300 border border-sky-600 shadow-xs"
            />
            <span
              className="text-base sm:text-lg font-black text-[#2C3E50] tracking-wide"
              style={{ fontFamily: "'Prompt', sans-serif" }}
            >
              {title}
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
