import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, Music, Bell, BellOff, X } from 'lucide-react';
import { sound } from '../utils/audio';

interface GameSoundControlProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  bgmEnabled: boolean;
  onToggleBgm: () => void;
  className?: string;
  compact?: boolean;
}

/**
 * Clean & Streamlined Sound Control:
 * - 2-row clean toggle interface (BGM music & SFX sound effects)
 * - Removed volume slider presets, BGM file manager, and bottom submit button as requested
 * - Easy X close button and backdrop tap
 */
export const GameSoundControl: React.FC<GameSoundControlProps> = ({
  soundEnabled,
  onToggleSound,
  bgmEnabled,
  onToggleBgm,
  className = '',
  compact = false,
}) => {
  const [showModal, setShowModal] = useState(false);

  const isAnyAudioActive = soundEnabled || bgmEnabled;

  const handleOpenModal = () => {
    sound.playPop();
    setShowModal(true);
  };

  const handleCloseModal = () => {
    sound.playPop();
    setShowModal(false);
  };

  const modalNode = (
    <AnimatePresence>
      {showModal && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
          onClick={handleCloseModal}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm bg-gradient-to-b from-[#FFFDF8] via-[#FFF9EE] to-[#FFF2D8] rounded-3xl border-4 border-[#8A6248] shadow-[0_16px_36px_rgba(0,0,0,0.35)] p-5 sm:p-6 text-[#5D3A1A] select-none"
          >
            {/* Header with Title and Close (X) button */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-[#E8D4B8]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-[#2ED573] border-2 border-[#1E824C] flex items-center justify-center text-white shadow-xs">
                  <Volume2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#5D3A1A] leading-tight">
                    ตั้งค่าเสียง
                  </h3>
                  <p className="text-[11px] font-bold text-[#8A6248] opacity-80">
                    เปิด-ปิด เสียงเพลงและเสียงเอฟเฟกต์
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCloseModal}
                className="w-8 h-8 rounded-xl bg-white hover:bg-[#FFEAA7] border-2 border-[#8A6248] text-[#5D3A1A] flex items-center justify-center cursor-pointer transition-colors shadow-xs active:scale-90"
                title="ปิดหน้าต่าง"
              >
                <X className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>

            {/* Exactly 2 Rows: 1. เพลงประกอบ (BGM) & 2. เสียงเอฟเฟกต์ (SFX) */}
            <div className="space-y-3">
              {/* Row 1: BGM Toggle Switch */}
              <div
                onClick={() => {
                  sound.playPop();
                  onToggleBgm();
                }}
                className={`p-3 sm:p-3.5 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                  bgmEnabled
                    ? 'bg-[#E3FCF2] border-[#00B894] text-[#006266] shadow-[0_3px_0_#00B894]'
                    : 'bg-[#F1F2F6] border-[#B2BEC3] text-[#636E72]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-white border-2 shadow-xs ${
                      bgmEnabled ? 'bg-[#00B894] border-[#009879]' : 'bg-[#95A5A6] border-[#7F8C8D]'
                    }`}
                  >
                    <Music className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-black">เพลงประกอบ (BGM)</div>
                    <div className="text-xs font-bold opacity-85">
                      {bgmEnabled ? 'เปิดเพลงอยู่ 🎵' : 'ปิดเพลง 🔇'}
                    </div>
                  </div>
                </div>

                {/* Sliding Switch Indicator */}
                <div
                  className={`w-13 h-7 rounded-full p-1 transition-colors flex items-center ${
                    bgmEnabled ? 'bg-[#00B894] justify-end' : 'bg-[#B2BEC3] justify-start'
                  }`}
                >
                  <motion.div
                    layout
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className="w-5 h-5 rounded-full bg-white shadow-md"
                  />
                </div>
              </div>

              {/* Row 2: SFX Toggle Switch */}
              <div
                onClick={() => {
                  sound.playPop();
                  onToggleSound();
                }}
                className={`p-3 sm:p-3.5 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                  soundEnabled
                    ? 'bg-[#FFEAA7] border-[#E17055] text-[#6C3428] shadow-[0_3px_0_#D63031]'
                    : 'bg-[#F1F2F6] border-[#B2BEC3] text-[#636E72]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-white border-2 shadow-xs ${
                      soundEnabled ? 'bg-[#FF7675] border-[#D63031]' : 'bg-[#95A5A6] border-[#7F8C8D]'
                    }`}
                  >
                    {soundEnabled ? (
                      <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                      <BellOff className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </div>
                  <div>
                    <div className="text-sm font-black">เสียงเอฟเฟกต์ (SFX)</div>
                    <div className="text-xs font-bold opacity-85">
                      {soundEnabled ? 'เปิดเอฟเฟกต์อยู่ 🔔' : 'ปิดเอฟเฟกต์ 🔕'}
                    </div>
                  </div>
                </div>

                {/* Sliding Switch Indicator */}
                <div
                  className={`w-13 h-7 rounded-full p-1 transition-colors flex items-center ${
                    soundEnabled ? 'bg-[#E17055] justify-end' : 'bg-[#B2BEC3] justify-start'
                  }`}
                >
                  <motion.div
                    layout
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className="w-5 h-5 rounded-full bg-white shadow-md"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {/* ================= STABLE, EASY-TO-CLICK SOUND BUTTON ================= */}
      <motion.button
        type="button"
        id="sound-control-trigger-button"
        onClick={handleOpenModal}
        whileHover={{ scale: 1.06, y: -2 }}
        whileTap={{ scale: 0.94 }}
        className={`relative z-30 flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-2xl border-3 font-black text-xs sm:text-sm cursor-pointer transition-all select-none shadow-[0_4px_0_#8A6248] active:shadow-[0_1px_0_#8A6248] active:translate-y-0.5 ${
          isAnyAudioActive
            ? 'bg-gradient-to-b from-[#FFFDF0] via-[#FFEAA7] to-[#FED330] border-[#8A6248] text-[#5D3A1A]'
            : 'bg-gradient-to-b from-[#F1F2F6] to-[#CED6E0] border-[#747D8C] text-[#57606F] shadow-[0_4px_0_#57606F] active:shadow-[0_1px_0_#57606F]'
        } ${className}`}
        title="กดเพื่อตั้งค่าเสียง (เปิด/ปิดเพลงประกอบ และเสียงเอฟเฟกต์)"
      >
        {/* Speaker Icon with status badge */}
        <div
          className={`w-5 h-5 sm:w-6 sm:h-6 rounded-xl flex items-center justify-center text-white shadow-xs ${
            isAnyAudioActive ? 'bg-[#2ED573]' : 'bg-[#FF4757]'
          }`}
        >
          {isAnyAudioActive ? (
            <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
          ) : (
            <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
          )}
        </div>

        {/* Text Label */}
        <span className="font-extrabold tracking-wide">
          {compact ? 'เสียง' : isAnyAudioActive ? 'เปิดเสียง' : 'ปิดเสียง'}
        </span>

        {/* Musical note floating indicator when BGM is active */}
        {bgmEnabled && (
          <motion.span
            animate={{ y: [-1, -3, -1], rotate: [-8, 8, -8] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="text-xs pointer-events-none"
          >
            🎵
          </motion.span>
        )}
      </motion.button>

      {/* Render modal directly in document.body so it's never clipped by parent styles */}
      {typeof document !== 'undefined' ? createPortal(modalNode, document.body) : modalNode}
    </>
  );
};
