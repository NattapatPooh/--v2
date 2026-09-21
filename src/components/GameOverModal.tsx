import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { RotateCcw, ArrowLeft, Volume2, HelpCircle } from 'lucide-react';
import { LevelData, CategoryData } from '../types';
import { sound } from '../utils/audio';
import scoreSummaryBg from '../assets/images/thai_score_summary_bg_1788941199285.jpg';

interface GameOverModalProps {
  level: LevelData;
  category: CategoryData;
  reason: 'timeout' | 'wrong';
  assembledWord?: string;
  onRetry: () => void;
  onBackToMenu: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  level,
  category,
  reason,
  assembledWord,
  onRetry,
  onBackToMenu,
}) => {
  useEffect(() => {
    sound.playWrong();
    // Gentle Thai voice encouraging
    const speechTimeout = setTimeout(() => {
      sound.speakThai('แพ้แล้วจ้า ลองเล่นใหม่อีกครั้งนึงนะ สู้ๆ');
    }, 400);
    return () => clearTimeout(speechTimeout);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden font-['Kanit',sans-serif] select-none animate-in fade-in duration-300">
      {/* Fullscreen Illustrated Thai Riverside Village Background (matches user mockup) */}
      <div className="absolute inset-0 z-0">
        <img
          src={scoreSummaryBg}
          alt="Thai Riverside Village"
          className="w-full h-full object-cover"
        />
        {/* Subtle warm overlay to keep text highly legible */}
        <div className="absolute inset-0 bg-black/15 backdrop-blur-[0.5px]" />
      </div>

      {/* Floating Sky Lanterns (โคมลอย) Ambient Animation */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ y: [0, -18, 0], x: [0, 6, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-12 left-1/4 w-7 h-10 rounded-t-lg bg-[#FFEAA7]/40 blur-[1px]"
        />
        <motion.div
          animate={{ y: [0, -25, 0], x: [0, -8, 0] }}
          transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-8 right-1/3 w-6 h-9 rounded-t-lg bg-[#FEEAA7]/40 blur-[1px]"
        />
      </div>

      {/* Top Navigation Bar: Back Button & Sound Control */}
      <header className="absolute top-3 sm:top-5 left-3 sm:left-6 right-3 sm:right-6 z-30 flex items-center justify-between pointer-events-auto">
        {/* Back to Level Map Button */}
        <button
          type="button"
          onClick={() => {
            sound.playPop();
            onBackToMenu();
          }}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-white/90 hover:bg-white text-[#5D3A1A] font-bold text-xs sm:text-sm border-2 sm:border-3 border-[#8A6248] shadow-[0_3px_0_#5D3A1A] active:translate-y-0.5 active:shadow-xs cursor-pointer transition-all"
          title="กลับไปหน้าเลือกด่าน"
        >
          <ArrowLeft className="w-4 h-4 stroke-[3]" />
          <span>เลือกด่าน</span>
        </button>

        {/* Level badge */}
        <div className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-white/90 text-xs sm:text-sm font-semibold border border-white/20">
          หมวด{category.categoryName} • ด่าน {level.levelId}
        </div>
      </header>

      {/* Main Center Content Container - Precisely matching user's uploaded image */}
      <motion.main
        initial={{ scale: 0.85, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 260 }}
        className="relative z-20 flex flex-col items-center justify-center text-center px-4 max-w-2xl w-full"
      >
        {/* 1. Warm Cream Card with "แพ้แล้วจ้า!!!" Bubble Typography */}
        <motion.div
          animate={{ y: [-4, 4, -4] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="relative px-6 xs:px-8 sm:px-14 md:px-16 py-3 xs:py-4 sm:py-5 rounded-3xl sm:rounded-4xl bg-[#F8E8D2]/95 border-3 sm:border-4 border-[#E5CCA8] shadow-[0_12px_28px_rgba(0,0,0,0.35)] flex items-center justify-center"
        >
          <h1
            className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-black tracking-normal leading-none select-none"
            style={{
              WebkitTextStroke: '3px #FFFFFF',
              paintOrder: 'stroke fill',
              color: '#FF4D6D',
              textShadow:
                '0 0 16px rgba(255, 77, 109, 0.4), 0 5px 0 #C92A4E, 0 8px 16px rgba(0,0,0,0.35)',
            }}
          >
            แพ้แล้วจ้า!!!
          </h1>
        </motion.div>

        {/* 2. Subtitle: "ลองเล่นใหม่อีกครั้งนึงนะสู้ๆ" in Sky Blue with Crisp White Stroke */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-3 xs:mt-4 sm:mt-6 text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black tracking-normal select-none"
          style={{
            WebkitTextStroke: '2.5px #FFFFFF',
            paintOrder: 'stroke fill',
            color: '#4DA3FF',
            textShadow:
              '0 0 14px rgba(77, 163, 255, 0.45), 0 4px 0 #1E6BB8, 0 8px 14px rgba(0,0,0,0.4)',
          }}
        >
          ลองเล่นใหม่อีกครั้งนึงนะสู้ๆ
        </motion.p>

        {/* 3. "เริ่มใหม่" Hot Pink / Rose Pill Button */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.25, type: 'spring', stiffness: 320 }}
          className="mt-4 xs:mt-5 sm:mt-7"
        >
          <motion.button
            type="button"
            onClick={() => {
              sound.playPop();
              onRetry();
            }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92, y: 4 }}
            className="px-8 xs:px-12 sm:px-16 py-2.5 xs:py-3 sm:py-4 rounded-full bg-[#FF477E] hover:bg-[#FF3366] active:bg-[#E61E53] border-3 sm:border-4 border-[#1C1C1E] shadow-[0_6px_0_#9E1A3D] active:shadow-[0_2px_0_#9E1A3D] cursor-pointer transition-all duration-150 flex items-center justify-center gap-2"
            title="กดเพื่อเริ่มเล่นด่านนี้ใหม่อีกครั้ง"
          >
            <span
              className="text-2xl xs:text-3xl sm:text-4xl font-black text-white leading-none select-none"
              style={{
                WebkitTextStroke: '1px #8A1534',
                paintOrder: 'stroke fill',
                textShadow: '0 2px 4px rgba(0,0,0,0.35)',
              }}
            >
              เริ่มใหม่
            </span>
          </motion.button>
        </motion.div>

        {/* 4. Helpful Educational Feedback Pill (Discreet & Encouraging) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-4 sm:mt-6 px-4 py-1.5 rounded-2xl bg-white/85 backdrop-blur-md border border-[#8A6248]/30 shadow-md text-xs sm:text-sm font-semibold text-[#5D3A1A] flex items-center gap-2 max-w-md"
        >
          {reason === 'timeout' ? (
            <span>⏰ หมดเวลา 30 วินาที ไม่เป็นไรนะ มาสะกดคำว่า &quot;<b>{level.correctWord}</b>&quot; กันใหม่!</span>
          ) : (
            <span>❌ ที่เลือกคือ &quot;{assembledWord}&quot; คำตอบที่ถูกคือ &quot;<b>{level.correctWord}</b>&quot;</span>
          )}
          <button
            type="button"
            onClick={() => {
              sound.playPop();
              sound.speakThai(`คำตอบคือ ${level.correctWord}`);
            }}
            className="p-1 rounded-lg bg-amber-100 text-amber-700 hover:bg-amber-200 cursor-pointer ml-auto"
            title="ฟังเสียงคำตอบ"
          >
            <Volume2 className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      </motion.main>
    </div>
  );
};
