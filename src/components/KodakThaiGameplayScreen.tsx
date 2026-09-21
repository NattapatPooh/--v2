import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Volume2, Lightbulb, CheckCircle2, HelpCircle } from 'lucide-react';
import { CategoryData, LevelData } from '../types';
import { sound, THAI_CONSONANT_NAMES } from '../utils/audio';
import { getRealWordImage } from '../data/realWordImages';
import { WordSlotRenderer } from './WordSlotRenderer';
import { GameSoundControl } from './GameSoundControl';
import templeBg from '../assets/images/thai_temple_wat_1788939827364.jpg';
import {
  DiamondBackButton,
  RetroAlarmClock,
  PlumeriaFlower,
} from './KodakThaiGameTheme';

interface KodakThaiGameplayScreenProps {
  currentCategory: CategoryData;
  currentLevel: LevelData;
  userAnswers: Record<number, string>;
  activeSlotIndex: number;
  onSlotClick: (slotIndex: number) => void;
  onChoiceClick: (char: string) => void;
  onClearAnswers: () => void;
  onGoHome: () => void;
  timeLeft: number;
  maxTime: number;
  isWrongShake: boolean;
  isCorrectCelebration: boolean;
  soundEnabled: boolean;
  onToggleSound: () => void;
  bgmEnabled: boolean;
  onToggleBgm: () => void;
}

const COMMON_THAI_CONSONANTS = [
  'ก', 'ข', 'ค', 'ง', 'จ', 'ช', 'ด', 'ต', 'ถ', 'ท', 'น', 'บ', 'ป', 'ผ', 'พ', 'ฟ', 'ม', 'ย', 'ร', 'ล', 'ว', 'ส', 'ห', 'อ',
];

// The 5 Exact Pastel Circle Styles from User's Mockup:
const PASTEL_CIRCLE_STYLES = [
  {
    name: 'pink',
    bg: 'bg-[#FF8EA8]',
    hoverBg: 'hover:bg-[#FF7A99]',
    activeBg: 'active:bg-[#FF6589]',
    border: 'border-[#E86F8A]',
    shadow: 'shadow-[0_6px_0_#D95A75]',
    activeShadow: 'active:shadow-[0_2px_0_#D95A75]',
    ring: 'focus:ring-[#FFCCD7]',
  },
  {
    name: 'purple',
    bg: 'bg-[#A78BFA]',
    hoverBg: 'hover:bg-[#9975F8]',
    activeBg: 'active:bg-[#8B5EF7]',
    border: 'border-[#8C6EDA]',
    shadow: 'shadow-[0_6px_0_#7553C8]',
    activeShadow: 'active:shadow-[0_2px_0_#7553C8]',
    ring: 'focus:ring-[#DDD6FE]',
  },
  {
    name: 'blue',
    bg: 'bg-[#76BAEC]',
    hoverBg: 'hover:bg-[#62ACE0]',
    activeBg: 'active:bg-[#4E9ED4]',
    border: 'border-[#559DCE]',
    shadow: 'shadow-[0_6px_0_#3D85B8]',
    activeShadow: 'active:shadow-[0_2px_0_#3D85B8]',
    ring: 'focus:ring-[#BAE6FD]',
  },
  {
    name: 'yellow',
    bg: 'bg-[#FFE082]',
    hoverBg: 'hover:bg-[#FED869]',
    activeBg: 'active:bg-[#FDD050]',
    border: 'border-[#E3B838]',
    shadow: 'shadow-[0_6px_0_#C99E22]',
    activeShadow: 'active:shadow-[0_2px_0_#C99E22]',
    ring: 'focus:ring-[#FEF08A]',
  },
  {
    name: 'mint',
    bg: 'bg-[#7BE3B1]',
    hoverBg: 'hover:bg-[#68DBA3]',
    activeBg: 'active:bg-[#55D395]',
    border: 'border-[#59C490]',
    shadow: 'shadow-[0_6px_0_#43A877]',
    activeShadow: 'active:shadow-[0_2px_0_#43A877]',
    ring: 'focus:ring-[#A7F3D0]',
  },
];

export const KodakThaiGameplayScreen: React.FC<KodakThaiGameplayScreenProps> = ({
  currentCategory,
  currentLevel,
  userAnswers,
  activeSlotIndex,
  onSlotClick,
  onChoiceClick,
  onClearAnswers,
  onGoHome,
  timeLeft,
  maxTime,
  isWrongShake,
  isCorrectCelebration,
  soundEnabled,
  onToggleSound,
  bgmEnabled,
  onToggleBgm,
}) => {
  const [showHint, setShowHint] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Get real photo for this level's word
  const photoInfo = useMemo(() => {
    return getRealWordImage(currentLevel.correctWord, currentCategory.id);
  }, [currentLevel.correctWord, currentCategory.id]);

  // Compute exactly 5 choices (the 4 level choices + 1 clever distractor)
  const fiveChoices = useMemo(() => {
    if (currentLevel.choices.length >= 5) {
      return currentLevel.choices.slice(0, 5);
    }
    const distractors = COMMON_THAI_CONSONANTS.filter(
      (c) => !currentLevel.choices.includes(c)
    );
    const extraChar =
      distractors[(currentLevel.levelId * 7) % distractors.length] || 'อ';
    return [...currentLevel.choices, extraChar];
  }, [currentLevel.choices, currentLevel.levelId]);

  // Time calculation
  const timeFraction = Math.max(0, Math.min(1, timeLeft / maxTime));
  const isTimeUrgent = timeLeft <= 8;

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden font-['Kanit',sans-serif] select-none">
      {/* ================= BACKGROUND: TWILIGHT CHAO PHRAYA TEMPLE ================= */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src={templeBg}
          alt="Bangkok Temple Twilight"
          className="w-full h-full object-cover filter blur-[2.5px] brightness-[0.62] contrast-[1.05] scale-105"
        />
        {/* Soft twilight dark gradient overlay for optimal focus */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-transparent to-black/50" />
      </div>

      {/* ================= TOP BAR: NAVIGATION & CONTROLS ================= */}
      <header className="relative z-30 w-full px-3 sm:px-6 pt-3 sm:pt-4 flex items-center justify-between">
        {/* Top-Left: Diamond Back Button */}
        <div className="flex items-center gap-3">
          <DiamondBackButton onClick={onGoHome} />

          {/* Category & Level Badge (Discreet & Clean) */}
          <div className="hidden xs:flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-white/90 backdrop-blur-md border-2 border-[#8A6248] shadow-md text-[#5D3A1A]">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: currentCategory.color.primary }}
            />
            <span className="text-xs sm:text-sm font-black">
              หมวด{currentCategory.categoryName}
            </span>
            <span className="text-xs font-bold text-[#8A6248] bg-[#FFF2D8] px-2 py-0.5 rounded-lg border border-[#8A6248]/30">
              ด่าน {currentLevel.levelId}/20
            </span>
          </div>
        </div>

        {/* Top-Right: Sound Control & Alarm Clock Timer Pill Bar */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Sound Control Button */}
          <GameSoundControl
            soundEnabled={soundEnabled}
            onToggleSound={onToggleSound}
            bgmEnabled={bgmEnabled}
            onToggleBgm={onToggleBgm}
            compact={true}
          />

          {/* Alarm Clock + Pastel Peach Countdown Pill Bar (matching user's mockup) */}
          <div className="flex items-center">
            {/* Pastel Peach/Coral Pill Bar */}
            <div className="relative h-10 sm:h-12 w-28 sm:w-44 md:w-52 rounded-full bg-[#FBCBB8] border-3 border-[#E5A893] shadow-md overflow-hidden flex items-center px-3 sm:px-4 z-10 -mr-3 sm:-mr-4">
              {/* Animated fill progress */}
              <div
                className={`absolute left-0 top-0 bottom-0 transition-all duration-300 ${
                  isTimeUrgent
                    ? 'bg-gradient-to-r from-red-500 to-rose-400 animate-pulse'
                    : 'bg-gradient-to-r from-[#F6B93B] to-[#FED330]'
                }`}
                style={{ width: `${timeFraction * 100}%` }}
              />

              {/* Countdown Numbers */}
              <div className="relative z-10 w-full flex items-center justify-between font-black text-xs sm:text-sm text-[#4A2D1B]">
                <span className="hidden sm:inline opacity-85">เวลา</span>
                <span className={`text-sm sm:text-base ${isTimeUrgent ? 'text-red-700 animate-ping' : ''}`}>
                  {timeLeft} วิ
                </span>
              </div>
            </div>

            {/* Blue Retro Alarm Clock */}
            <div className="relative z-20 flex-shrink-0 filter drop-shadow-md">
              <RetroAlarmClock className="w-12 h-12 sm:w-15 sm:h-15" isUrgent={isTimeUrgent} />
            </div>
          </div>
        </div>
      </header>

      {/* ================= MAIN CONTENT CONTAINER ================= */}
      <main className="relative z-20 flex-1 w-full max-w-4xl mx-auto px-2 sm:px-4 py-2 sm:py-3 flex flex-col items-center justify-center">
        {/* ================= 1. KODAK PORTRA 400 FILM CLUE CARD ================= */}
        <div className="relative w-full max-w-[340px] xs:max-w-[380px] sm:max-w-[440px] md:max-w-[480px] select-none">
          {/* Film Frame Box */}
          <div className="relative w-full rounded-2xl bg-black p-2 sm:p-2.5 pb-2 border-3 sm:border-4 border-[#1C1C1E] shadow-[0_16px_36px_rgba(0,0,0,0.6)]">
            {/* Top Kodak Portra Film Markings */}
            <div className="flex items-center justify-between text-[#F1E7C4] text-[9px] sm:text-[11px] font-mono tracking-widest px-2 py-0.5 opacity-90">
              <span>. 400</span>
              <span>53</span>
              <span className="font-bold">KODAK PORTRA 400</span>
            </div>

            {/* Clue Photo Display Inside Film Frame */}
            <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-gradient-to-b from-[#87CEEB] via-[#BFE8F5] to-[#88D8B0] flex items-center justify-center border-2 border-black/40">
              {/* Real Photograph with fallback to lush meadow illustration */}
              {photoInfo?.imageUrl ? (
                <img
                  src={photoInfo.imageUrl}
                  alt={photoInfo.photoTitle || currentLevel.correctWord}
                  referrerPolicy="no-referrer"
                  loading="eager"
                  onLoad={() => setImageLoaded(true)}
                  className={`w-full h-full object-cover transition-transform duration-500 ${
                    isCorrectCelebration ? 'scale-110' : 'scale-100'
                  }`}
                />
              ) : (
                /* Fallback stylized green meadow if no photo */
                <svg viewBox="0 0 400 300" className="w-full h-full object-cover" xmlns="http://www.w3.org/2000/svg">
                  <rect width="400" height="300" fill="#BFE8F5" />
                  <ellipse cx="200" cy="90" rx="40" ry="24" fill="#FFFFFF" opacity="0.9" />
                  <ellipse cx="230" cy="95" rx="35" ry="20" fill="#FFFFFF" opacity="0.9" />
                  <ellipse cx="170" cy="98" rx="28" ry="18" fill="#FFFFFF" opacity="0.9" />
                  <path d="M0,190 Q120,150 240,180 T400,170 L400,300 L0,300 Z" fill="#9CD877" />
                  <path d="M0,210 Q160,180 300,220 T400,200 L400,300 L0,300 Z" fill="#78B854" />
                </svg>
              )}

              {/* Skeleton loading icon */}
              {!imageLoaded && (
                <div className="absolute inset-0 bg-[#A8D8EA]/40 backdrop-blur-xs flex items-center justify-center">
                  <Camera className="w-8 h-8 text-white/70 animate-pulse" />
                </div>
              )}

              {/* Celebratory Checkmark Overlay on Success */}
              {isCorrectCelebration && (
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className="absolute inset-0 bg-emerald-600/30 flex items-center justify-center backdrop-blur-xs"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-500 border-4 border-white text-white flex items-center justify-center shadow-2xl animate-bounce">
                    <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 stroke-[3]" />
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* ================= 2. MINT GREEN WORD DISPLAY CONTAINER ================= */}
        <div className="relative w-full max-w-[340px] xs:max-w-[380px] sm:max-w-[460px] md:max-w-[500px] mt-3 sm:mt-4 z-20">
          {/* Left Decorative Yellow Plumeria Flowers */}
          <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-5 z-30 pointer-events-none flex flex-col -space-y-3 sm:-space-y-4">
            <PlumeriaFlower colorScheme="yellow" size={44} rotation={-15} />
            <div className="translate-x-1 sm:translate-x-2">
              <PlumeriaFlower colorScheme="yellow" size={38} rotation={25} />
            </div>
          </div>

          {/* Right Decorative Pink Plumeria Flowers */}
          <div className="absolute -top-3 -right-2 sm:-top-4 sm:-right-3 z-30 pointer-events-none flex flex-col -space-y-3 sm:-space-y-4">
            <PlumeriaFlower colorScheme="pink" size={42} rotation={18} />
            <div className="-translate-x-1 sm:-translate-x-2">
              <PlumeriaFlower colorScheme="pink" size={36} rotation={-20} />
            </div>
            <div className="translate-x-1">
              <PlumeriaFlower colorScheme="pink" size={30} rotation={45} />
            </div>
          </div>

          {/* Mint Green Board Body */}
          <div className="w-full px-4 py-3 sm:px-6 sm:py-4 rounded-3xl bg-[#98E2C6] border-4 border-[#76C9AA] shadow-[0_8px_20px_rgba(0,0,0,0.3)] flex flex-col items-center">
            {/* Word Slot Renderer */}
            <div className="w-full flex justify-center py-1">
              <WordSlotRenderer
                displayPattern={currentLevel.displayPattern}
                correctWord={currentLevel.correctWord}
                userAnswers={userAnswers}
                activeSlotIndex={activeSlotIndex}
                onSlotClick={onSlotClick}
                isWrongShake={isWrongShake}
                isCorrectCelebration={isCorrectCelebration}
              />
            </div>

            {/* Quick Action bar: Hint */}
            <div className="w-full flex items-center justify-end mt-2 pt-2 border-t border-[#76C9AA]/50 text-xs font-bold">
              <button
                type="button"
                onClick={() => {
                  sound.playPop();
                  sound.speakThai(currentLevel.hint);
                  setShowHint(!showHint);
                }}
                className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-white/80 hover:bg-white text-[#1B6CA8] border border-[#2E86DE]/40 shadow-xs cursor-pointer active:scale-95 transition-all"
                title="ฟังและดูคำใบ้"
              >
                <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                <span>คำใบ้</span>
              </button>
            </div>

            {/* Hint Box (when opened) */}
            <AnimatePresence>
              {showHint && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="w-full mt-2 p-2 rounded-xl bg-[#FFF9E6] border border-[#F6B93B] text-[11px] sm:text-xs text-[#7F5330] flex items-start gap-1.5"
                >
                  <HelpCircle className="w-4 h-4 text-[#E67E22] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#E67E22]">คำใบ้: </span>
                    {currentLevel.hint}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ================= 3. THE 5 PASTEL CIRCULAR CHOICE BUTTONS ================= */}
        <div className="relative w-full max-w-[340px] xs:max-w-[380px] sm:max-w-[480px] md:max-w-[540px] mt-4 sm:mt-5 z-20">
          <div className="flex items-center justify-center gap-2 xs:gap-2.5 sm:gap-3.5 md:gap-4.5 w-full">
            {fiveChoices.map((char, index) => {
              const style = PASTEL_CIRCLE_STYLES[index % PASTEL_CIRCLE_STYLES.length];
              return (
                <motion.button
                  key={`pastel-choice-${char}-${index}`}
                  type="button"
                  onClick={() => {
                    sound.playPop();
                    sound.speakConsonant(char);
                    onChoiceClick(char);
                  }}
                  whileHover={{ scale: 1.08, y: -3 }}
                  whileTap={{ scale: 0.92, y: 2 }}
                  className={`relative w-14 h-14 xs:w-15 xs:h-15 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-full border-3 ${style.bg} ${style.hoverBg} ${style.activeBg} ${style.border} ${style.shadow} ${style.activeShadow} ${style.ring} flex items-center justify-center cursor-pointer transition-all select-none`}
                  title={`เลือกพยัญชนะ ${char} (${THAI_CONSONANT_NAMES[char] || char})`}
                >
                  {/* Glossy highlight at top of circle */}
                  <div className="absolute top-1 left-2 right-2 h-2.5 sm:h-3 rounded-full bg-white/40 pointer-events-none" />

                  {/* Consonant Typography in bold dark color */}
                  <span className="relative z-10 text-2xl xs:text-3xl sm:text-4xl md:text-4xl font-black text-[#2D3436] drop-shadow-xs leading-none">
                    {char}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};
