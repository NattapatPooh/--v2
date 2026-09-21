import React from 'react';
import { motion } from 'motion/react';
import { sound, THAI_CONSONANT_NAMES } from '../utils/audio';

interface ChoiceButtonProps {
  char: string;
  onClick: (char: string) => void;
  disabled?: boolean;
  index: number;
}

export const ChoiceButton: React.FC<ChoiceButtonProps> = ({
  char,
  onClick,
  disabled = false,
  index,
}) => {
  const handleClick = () => {
    if (disabled) return;
    sound.playPop();
    sound.speakConsonant(char);
    onClick(char);
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: index * 0.06, type: 'spring', stiffness: 400, damping: 20 }}
      whileHover={!disabled ? { scale: 1.08, y: -2 } : {}}
      whileTap={!disabled ? { scale: 0.92, y: 3 } : {}}
      className={`relative flex items-center justify-center w-16 sm:w-20 h-16 sm:h-20 rounded-2xl sm:rounded-3xl border-3 border-[#8A6248] shadow-[0_6px_0_#8A6248] transition-all select-none cursor-pointer ${
        disabled
          ? 'bg-gray-200 opacity-50 cursor-not-allowed shadow-[0_2px_0_#8A6248]'
          : 'bg-gradient-to-b from-[#FFF9A6] via-[#FFE59A] to-[#FFD152] active:shadow-[0_2px_0_#8A6248] active:translate-y-1'
      }`}
    >
      {/* 3D Glossy Toy Shine Highlight */}
      <div className="absolute top-1.5 left-2.5 right-2.5 h-3 bg-white/60 rounded-full pointer-events-none" />

      {/* Button Character */}
      <span className="text-3xl sm:text-4xl font-extrabold text-[#5D3A1A] drop-shadow-xs">
        {char}
      </span>

      {/* Little corner sparkle dot */}
      <div className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-white/80" />
    </motion.button>
  );
};
