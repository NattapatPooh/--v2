import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { sound } from '../utils/audio';

export interface WordCartoonIllustrationProps {
  word: string;
  category?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  celebrating?: boolean;
  interactive?: boolean;
  className?: string;
}

// Particle burst component when tapped
interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  char: string;
}

export const WordCartoonIllustration: React.FC<WordCartoonIllustrationProps> = ({
  word,
  category = 'general',
  size = 'md',
  celebrating = false,
  interactive = true,
  className = '',
}) => {
  const [tapCount, setTapCount] = useState(0);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [speechBubble, setSpeechBubble] = useState<string | null>(null);

  // Size dimensions
  const sizeClasses = {
    sm: 'w-14 h-14',
    md: 'w-24 h-24 sm:w-28 sm:h-28',
    lg: 'w-32 h-32 sm:w-40 sm:h-40',
    xl: 'w-44 h-44 sm:w-52 sm:h-52',
  }[size];

  const handleTap = (e: React.MouseEvent) => {
    if (!interactive) return;
    sound.playPop();
    setTapCount((prev) => prev + 1);

    // Spawn 5 fun floating particles
    const emojis = ['✨', '⭐', '💖', '🌟', '🎉', '🍀'];
    const colors = ['#FFD32A', '#FF5E57', '#0BE881', '#0FB9B1', '#FFA801', '#575FCC'];
    const newParticles: Particle[] = Array.from({ length: 5 }).map((_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 60,
      y: -20 - Math.random() * 40,
      color: colors[Math.floor(Math.random() * colors.length)],
      char: emojis[Math.floor(Math.random() * emojis.length)],
    }));

    setParticles((prev) => [...prev, ...newParticles]);
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newParticles.includes(p)));
    }, 900);

    // Cute voice speech bubble
    const reactionPhrases: Record<string, string[]> = {
      food: ['อร่อยจัง! 😋', 'หอมกรุ่น! 🍲', 'น่ากินมาก! 🥢', 'ชิมเลย! 🥄'],
      animals: ['ดึ๋งๆ! 🐰', 'น่ารักจัง! 🐾', 'แฮปปี้! 💖', 'จุ๊บๆ! 🐶'],
      places: ['ไปเที่ยวกัน! 🎒', 'สวยจัง! 🏰', 'วิวดีมาก! 🏞️', 'ลุยเลย! 🗺️'],
      occupations: ['เก่งจังเลย! 🌟', 'ยอดเยี่ยม! 🎖️', 'สู้ๆ นะ! 💼', 'ฮีโร่เลย! 🦸'],
      language: ['สุดยอดมาก! 🏆', 'ดีเลิศ! ✨', 'เยี่ยมที่สุด! 💯', 'มีพลัง! 💪'],
      manners: ['น่ารักสุภาพ! 🌸', 'ไหว้สวยจัง! 🙏', 'ขอบคุณนะ! 💖', 'ใจดีมาก! 💐'],
    };

    const phrases = reactionPhrases[category] || ['สุดยอด! ⭐', 'เก่งมาก! 🎉', 'เย้ๆ! 🎈'];
    const phrase = phrases[Math.floor(Math.random() * phrases.length)];
    setSpeechBubble(phrase);
    setTimeout(() => setSpeechBubble(null), 1400);
  };

  return (
    <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
      {/* Speech Bubble Reaction when child taps */}
      <AnimatePresence>
        {speechBubble && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: -18, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.8 }}
            className="absolute -top-6 z-40 px-2.5 py-1 rounded-full bg-white border-2 border-[#8A6248] shadow-[0_3px_0_#8A6248] text-[11px] sm:text-xs font-black text-[#5D3A1A] whitespace-nowrap pointer-events-none"
          >
            {speechBubble}
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 bg-white border-b-2 border-r-2 border-[#8A6248] rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Sparkle Particles */}
      {particles.map((p) => (
        <motion.span
          key={p.id}
          initial={{ opacity: 1, scale: 0.6, x: 0, y: 0 }}
          animate={{ opacity: 0, scale: 1.3, x: p.x, y: p.y }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="absolute z-30 text-xs sm:text-sm font-black pointer-events-none"
        >
          {p.char}
        </motion.span>
      ))}

      {/* Celebration Halo Rings when word is solved correctly */}
      {celebrating && (
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            rotate: [0, 180, 360],
            opacity: [0.6, 0.9, 0.6],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          className="absolute -inset-3 rounded-full bg-gradient-to-r from-amber-300/40 via-yellow-200/50 to-pink-300/40 blur-xs pointer-events-none z-0"
        />
      )}

      {/* Main Cartoon Vector Illustration Container */}
      <motion.div
        onClick={handleTap}
        whileHover={interactive ? { scale: 1.08, rotate: [0, -2, 2, 0] } : undefined}
        whileTap={interactive ? { scale: 0.9, y: 3 } : undefined}
        animate={
          celebrating
            ? {
                y: [-6, 6, -6],
                scale: [1, 1.08, 1],
                rotate: [-3, 3, -3],
              }
            : {
                y: [-3, 3, -3],
                scale: [1, 1.02, 1],
              }
        }
        transition={{
          duration: celebrating ? 1.6 : 3.2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        key={tapCount}
        className={`relative z-10 flex items-center justify-center ${sizeClasses} ${
          interactive ? 'cursor-pointer' : ''
        }`}
      >
        <WordVectorArtwork word={word} category={category} celebrating={celebrating} />
      </motion.div>
    </div>
  );
};

/**
 * Custom High-Quality Vector Cartoon Artworks for Thai Vocabulary Words
 */
const WordVectorArtwork: React.FC<{ word: string; category: string; celebrating: boolean }> = ({
  word,
  category,
}) => {
  // 1. Specific Food Category Vector Artworks
  if (word === 'ส้มโอ') {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        <defs>
          <radialGradient id="pomeloGrad" cx="45%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#A8E063" />
            <stop offset="70%" stopColor="#56AB2F" />
            <stop offset="100%" stopColor="#3B7A1C" />
          </radialGradient>
        </defs>
        {/* Leaf */}
        <path d="M50,15 C62,2 75,10 70,22 C62,22 55,18 50,15 Z" fill="#2ECC71" stroke="#27AE60" strokeWidth="1.5" />
        <path d="M50,15 Q60,16 70,22" stroke="#27AE60" strokeWidth="1" fill="none" />
        {/* Brown Stem */}
        <rect x="47" y="12" width="6" height="8" rx="2" fill="#795548" />
        {/* Big Round Pomelo Body */}
        <circle cx="50" cy="55" r="38" fill="url(#pomeloGrad)" stroke="#2E7D32" strokeWidth="2" />
        {/* Soft Highlight */}
        <ellipse cx="38" cy="40" rx="14" ry="8" fill="#FFFFFF" opacity="0.3" transform="rotate(-20 38 40)" />
        {/* Juicy Pink Slice Overlay */}
        <g transform="translate(42, 48)">
          <path d="M0,28 A24,24 0 0,0 32,8 L8,0 Z" fill="#FF7675" stroke="#D63031" strokeWidth="1.5" />
          <path d="M4,24 A20,20 0 0,0 28,8 L10,3 Z" fill="#FAB1A0" />
          <circle cx="16" cy="14" r="1.5" fill="#FFEAA7" />
          <circle cx="20" cy="18" r="1.5" fill="#FFEAA7" />
        </g>
        {/* Kawaii Face */}
        <circle cx="34" cy="56" r="3.5" fill="#2C3E50" />
        <circle cx="35" cy="55" r="1.2" fill="#FFFFFF" />
        <path d="M37,64 Q42,68 47,64" stroke="#2C3E50" strokeWidth="2" fill="none" strokeLinecap="round" />
        <ellipse cx="28" cy="62" rx="3.5" ry="2" fill="#FF7675" opacity="0.6" />
      </svg>
    );
  }

  if (word === 'ข้าวผัด') {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        <defs>
          <linearGradient id="friedRiceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF275" />
            <stop offset="60%" stopColor="#FFA502" />
            <stop offset="100%" stopColor="#E67E22" />
          </linearGradient>
        </defs>
        {/* Steam */}
        <path d="M35,18 Q40,12 35,6" stroke="#B2BEC3" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7" />
        <path d="M50,16 Q55,10 50,4" stroke="#B2BEC3" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7" />
        <path d="M65,18 Q70,12 65,6" stroke="#B2BEC3" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7" />
        {/* Blue Ceramic Bowl */}
        <path d="M12,50 C12,85 88,85 88,50 Z" fill="#0984E3" stroke="#0652DD" strokeWidth="2.5" />
        <ellipse cx="50" cy="50" rx="38" ry="12" fill="#74B9FF" stroke="#0652DD" strokeWidth="2" />
        {/* Rice Mound */}
        <ellipse cx="50" cy="46" rx="34" ry="18" fill="url(#friedRiceGrad)" stroke="#D35400" strokeWidth="1.5" />
        {/* Peas and diced carrots */}
        <circle cx="36" cy="42" r="2.5" fill="#2ECC71" />
        <circle cx="64" cy="44" r="2.5" fill="#2ECC71" />
        <rect x="42" y="46" width="4" height="4" rx="1" fill="#E17055" />
        <rect x="56" y="40" width="4" height="4" rx="1" fill="#E17055" />
        {/* Sunny side up egg on top */}
        <ellipse cx="48" cy="38" rx="14" ry="9" fill="#FFFFFF" stroke="#DFE6E9" strokeWidth="1.2" />
        <circle cx="48" cy="37" r="5" fill="#F1C40F" stroke="#D35400" strokeWidth="1" />
        {/* Cute smiling face on bowl */}
        <circle cx="38" cy="65" r="3" fill="#FFFFFF" />
        <circle cx="62" cy="65" r="3" fill="#FFFFFF" />
        <path d="M45,72 Q50,76 55,72" stroke="#FFFFFF" strokeWidth="2" fill="none" strokeLinecap="round" />
      </svg>
    );
  }

  if (word === 'ก๋วยเตี๋ยว' || word === 'บะหมี่ขาว') {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        {/* Chopsticks lifting noodles */}
        <line x1="88" y1="8" x2="36" y2="34" stroke="#8A5026" strokeWidth="3" strokeLinecap="round" />
        <line x1="90" y1="12" x2="38" y2="38" stroke="#8A5026" strokeWidth="3" strokeLinecap="round" />
        {/* Lifted wavy noodles */}
        <path d="M42,34 Q38,44 45,54" stroke="#FEEAA7" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <path d="M46,34 Q42,46 50,54" stroke="#FEEAA7" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        {/* Red Bowl */}
        <path d="M15,50 C15,86 85,86 85,50 Z" fill="#EE5253" stroke="#D63031" strokeWidth="2.5" />
        <ellipse cx="50" cy="50" rx="35" ry="12" fill="#FFEAA7" stroke="#D63031" strokeWidth="2" />
        {/* Meatball & Vegetables */}
        <circle cx="34" cy="48" r="6" fill="#F8C291" stroke="#E55039" strokeWidth="1" />
        <circle cx="62" cy="46" r="6" fill="#F8C291" stroke="#E55039" strokeWidth="1" />
        <circle cx="48" cy="44" r="4.5" fill="#2ECC71" />
        {/* Cute Face on Bowl */}
        <circle cx="40" cy="65" r="2.8" fill="#FFFFFF" />
        <circle cx="60" cy="65" r="2.8" fill="#FFFFFF" />
        <path d="M46,71 Q50,75 54,71" stroke="#FFFFFF" strokeWidth="2" fill="none" strokeLinecap="round" />
        <circle cx="33" cy="68" r="3" fill="#FF7675" opacity="0.6" />
        <circle cx="67" cy="68" r="3" fill="#FF7675" opacity="0.6" />
      </svg>
    );
  }

  if (word === 'ต้มยำกุ้ง' || word === 'กุ้งเผา') {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        <defs>
          <linearGradient id="soupGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF7675" />
            <stop offset="60%" stopColor="#D63031" />
            <stop offset="100%" stopColor="#C0392B" />
          </linearGradient>
          <linearGradient id="prawnGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFA502" />
            <stop offset="50%" stopColor="#FF6348" />
            <stop offset="100%" stopColor="#EB2F06" />
          </linearGradient>
        </defs>
        {/* Hot Clay Pot / Bowl */}
        <path d="M14,54 C14,88 86,88 86,54 Z" fill="#6C5CE7" stroke="#4834D4" strokeWidth="2.5" />
        <ellipse cx="50" cy="54" rx="36" ry="13" fill="url(#soupGrad)" stroke="#B33939" strokeWidth="2" />
        {/* Giant Curly River Prawn */}
        <path
          d="M32,45 C24,28 42,12 58,16 C70,18 78,32 72,46 C66,54 50,52 46,44"
          fill="url(#prawnGrad)"
          stroke="#B33939"
          strokeWidth="2"
        />
        {/* Prawn Antennae */}
        <path d="M72,24 Q86,14 94,18" stroke="#EB2F06" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <path d="M74,28 Q90,26 95,34" stroke="#EB2F06" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        {/* Prawn Cute Eye */}
        <circle cx="68" cy="24" r="2.8" fill="#2C3E50" />
        <circle cx="69" cy="23" r="1" fill="#FFFFFF" />
        {/* Lime Wedge & Mushroom */}
        <path d="M22,46 A9,9 0 0,0 36,56 L27,56 Z" fill="#2ED573" stroke="#10AC84" strokeWidth="1.2" />
        <circle cx="48" cy="56" r="4.5" fill="#F8C291" stroke="#E55039" strokeWidth="1" />
      </svg>
    );
  }

  if (word === 'ผัดไทย') {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        {/* Banana leaf platter */}
        <ellipse cx="50" cy="58" rx="42" ry="24" fill="#2ED573" stroke="#10AC84" strokeWidth="2" />
        {/* Fried Noodles Mound */}
        <ellipse cx="50" cy="52" rx="34" ry="16" fill="#F5CD79" stroke="#E15F41" strokeWidth="1.5" />
        {/* Prawn on top */}
        <path d="M42,34 C48,26 62,28 66,38 C60,46 50,44 44,40" fill="#FF6B6B" stroke="#D63031" strokeWidth="1.8" />
        {/* Tofu & Lime & Chives */}
        <rect x="32" y="48" width="6" height="5" rx="1" fill="#FFEAA7" stroke="#F39C12" strokeWidth="0.8" />
        <rect x="58" y="52" width="6" height="5" rx="1" fill="#FFEAA7" stroke="#F39C12" strokeWidth="0.8" />
        <line x1="28" y1="46" x2="38" y2="44" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" />
        <path d="M68,44 A8,8 0 0,0 80,54 L72,54 Z" fill="#84CC16" stroke="#4D7C0F" strokeWidth="1" />
      </svg>
    );
  }

  if (word === 'ส้มตำ') {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        {/* Wooden Mortar (ครกไม้) */}
        <path d="M22,38 L30,82 L70,82 L78,38 Z" fill="#A0522D" stroke="#5C2E0B" strokeWidth="2.5" />
        <ellipse cx="50" cy="38" rx="28" ry="10" fill="#D2691E" stroke="#5C2E0B" strokeWidth="2" />
        {/* Wooden Pestle (สากไม้) leaning */}
        <line x1="68" y1="12" x2="48" y2="48" stroke="#8A4B08" strokeWidth="8" strokeLinecap="round" />
        {/* Papaya shreds & Tomatoes */}
        <path d="M38,36 Q50,30 62,38" stroke="#A8E6CF" strokeWidth="2.5" fill="none" />
        <path d="M40,40 Q52,34 60,42" stroke="#DCEDC1" strokeWidth="2.5" fill="none" />
        <circle cx="44" cy="36" r="3.5" fill="#FF6B6B" />
        <circle cx="56" cy="38" r="3.5" fill="#FF6B6B" />
        <circle cx="50" cy="42" r="2" fill="#F1C40F" />
      </svg>
    );
  }

  if (word === 'ข้าวมันไก่') {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        {/* White Plate */}
        <ellipse cx="50" cy="60" rx="42" ry="22" fill="#FFFFFF" stroke="#DFE6E9" strokeWidth="2" />
        {/* Golden Fragrant Rice */}
        <ellipse cx="40" cy="56" rx="22" ry="14" fill="#FFEAA7" stroke="#FDCB6E" strokeWidth="1.2" />
        {/* Sliced Tender Chicken Slices */}
        <path d="M48,46 C56,42 74,44 76,56 C68,62 52,60 48,46 Z" fill="#FDFEFE" stroke="#E67E22" strokeWidth="1.5" />
        <line x1="56" y1="46" x2="60" y2="58" stroke="#E67E22" strokeWidth="1" />
        <line x1="64" y1="46" x2="68" y2="58" stroke="#E67E22" strokeWidth="1" />
        {/* Dipping Sauce Cup (ถ้วยน้ำจิ้ม) */}
        <ellipse cx="26" cy="62" rx="10" ry="6" fill="#6C5CE7" />
        <ellipse cx="26" cy="61" rx="8" ry="4" fill="#381D07" />
      </svg>
    );
  }

  if (word === 'แกงเขียวหวาน') {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        {/* White Ceramic Bowl with green curry */}
        <path d="M16,50 C16,84 84,84 84,50 Z" fill="#FFFFFF" stroke="#10AC84" strokeWidth="2.5" />
        <ellipse cx="50" cy="50" rx="34" ry="12" fill="#A3E4D7" stroke="#10AC84" strokeWidth="1.8" />
        {/* Green Eggplants (มะเขือเปราะ) */}
        <circle cx="38" cy="48" r="6" fill="#2ECC71" stroke="#27AE60" strokeWidth="1" />
        <circle cx="62" cy="46" r="6" fill="#2ECC71" stroke="#27AE60" strokeWidth="1" />
        {/* Red Chili strips & Basil */}
        <path d="M46,42 Q52,38 56,46" stroke="#E74C3C" strokeWidth="2" fill="none" strokeLinecap="round" />
        <circle cx="50" cy="52" r="3.5" fill="#16A085" />
      </svg>
    );
  }

  if (word === 'ข้าวเหนียว') {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        {/* Woven Bamboo Container (กระติบข้าวเหนียว) */}
        <rect x="25" y="38" width="50" height="42" rx="8" fill="#F9CA24" stroke="#D35400" strokeWidth="2" />
        {/* Bamboo Weave Lines */}
        <line x1="25" y1="50" x2="75" y2="50" stroke="#E67E22" strokeWidth="1.5" />
        <line x1="25" y1="64" x2="75" y2="64" stroke="#E67E22" strokeWidth="1.5" />
        <line x1="40" y1="38" x2="40" y2="80" stroke="#E67E22" strokeWidth="1.5" />
        <line x1="60" y1="38" x2="60" y2="80" stroke="#E67E22" strokeWidth="1.5" />
        {/* Fluffy Sticky Rice Puffing from Top */}
        <ellipse cx="50" cy="36" rx="22" ry="12" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
        <circle cx="42" cy="30" r="8" fill="#FFFFFF" />
        <circle cx="56" cy="30" r="8" fill="#FFFFFF" />
        {/* Cute Face on Kratip */}
        <circle cx="42" cy="56" r="2.5" fill="#2C3E50" />
        <circle cx="58" cy="56" r="2.5" fill="#2C3E50" />
        <path d="M46,62 Q50,65 54,62" stroke="#2C3E50" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      </svg>
    );
  }

  if (word === 'ลูกชิ้น') {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        {/* Bamboo Skewer (ไม้ย่าง) */}
        <line x1="50" y1="12" x2="50" y2="92" stroke="#B7791F" strokeWidth="3" strokeLinecap="round" />
        {/* 3 Golden Meatballs on Skewer */}
        <circle cx="50" cy="30" r="14" fill="#F8C291" stroke="#E55039" strokeWidth="1.5" />
        <circle cx="50" cy="52" r="14" fill="#F8C291" stroke="#E55039" strokeWidth="1.5" />
        <circle cx="50" cy="74" r="14" fill="#F8C291" stroke="#E55039" strokeWidth="1.5" />
        {/* Sweet Chili Glaze Sauce Drops */}
        <path d="M46,24 Q54,28 50,34" stroke="#EA2027" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M44,48 Q54,50 48,58" stroke="#EA2027" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        {/* Kawaii Face on Top Meatball */}
        <circle cx="46" cy="28" r="1.8" fill="#2C3E50" />
        <circle cx="54" cy="28" r="1.8" fill="#2C3E50" />
        <path d="M48,32 Q50,34 52,32" stroke="#2C3E50" strokeWidth="1.2" fill="none" />
      </svg>
    );
  }

  if (word === 'ขนมปัง') {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        {/* Golden Toast / Bread Loaf */}
        <path
          d="M26,38 C26,22 74,22 74,38 C80,38 82,78 72,78 L28,78 C18,78 20,38 26,38 Z"
          fill="#F5CD79"
          stroke="#E67E22"
          strokeWidth="2.5"
        />
        <path
          d="M30,40 C30,26 70,26 70,40 C74,40 76,74 68,74 L32,74 C24,74 26,40 30,40 Z"
          fill="#FFEAA7"
        />
        {/* Melting Butter on Top */}
        <rect x="42" y="38" width="16" height="12" rx="3" fill="#F9CA24" stroke="#D35400" strokeWidth="1.2" />
        {/* Kawaii Smiling Face */}
        <circle cx="42" cy="56" r="3" fill="#2C3E50" />
        <circle cx="58" cy="56" r="3" fill="#2C3E50" />
        <circle cx="43" cy="55" r="1" fill="#FFFFFF" />
        <circle cx="59" cy="55" r="1" fill="#FFFFFF" />
        <path d="M46,63 Q50,68 54,63" stroke="#2C3E50" strokeWidth="2" fill="none" strokeLinecap="round" />
        <ellipse cx="36" cy="62" rx="3.5" ry="2" fill="#FF7675" opacity="0.6" />
        <ellipse cx="64" cy="62" rx="3.5" ry="2" fill="#FF7675" opacity="0.6" />
      </svg>
    );
  }

  if (word === 'ชาไทย' || word === 'น้ำหวาน') {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        {/* Striped Straw */}
        <line x1="58" y1="10" x2="48" y2="45" stroke="#EE5253" strokeWidth="4" strokeLinecap="round" />
        <line x1="55" y1="15" x2="57" y2="18" stroke="#FFFFFF" strokeWidth="3" />
        {/* Cup */}
        <path d="M30,35 L36,86 L64,86 L70,35 Z" fill="#FFA502" stroke="#E67E22" strokeWidth="2" />
        {/* Creamy Milk layer on top */}
        <ellipse cx="50" cy="36" rx="20" ry="7" fill="#FFFFFF" stroke="#DFE6E9" strokeWidth="1.5" />
        {/* Ice Cubes */}
        <rect x="42" y="44" width="9" height="9" rx="2" fill="#FFFFFF" opacity="0.75" />
        <rect x="52" y="54" width="8" height="8" rx="2" fill="#FFFFFF" opacity="0.75" />
        {/* Kawaii Eyes on Cup */}
        <circle cx="44" cy="66" r="2.5" fill="#2C3E50" />
        <circle cx="56" cy="66" r="2.5" fill="#2C3E50" />
        <path d="M48,72 Q50,75 52,72" stroke="#2C3E50" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      </svg>
    );
  }

  // 2. Animals Category Vector Artworks
  if (word === 'ช้าง') {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        <defs>
          <linearGradient id="eleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A4B0BE" />
            <stop offset="100%" stopColor="#747D8C" />
          </linearGradient>
        </defs>
        {/* Big Floppy Ears */}
        <ellipse cx="26" cy="46" rx="16" ry="20" fill="#A4B0BE" stroke="#57606F" strokeWidth="1.5" />
        <ellipse cx="26" cy="46" rx="10" ry="13" fill="#F8A5C2" opacity="0.7" />
        <ellipse cx="74" cy="46" rx="16" ry="20" fill="#A4B0BE" stroke="#57606F" strokeWidth="1.5" />
        <ellipse cx="74" cy="46" rx="10" ry="13" fill="#F8A5C2" opacity="0.7" />
        {/* Round Chubby Head & Body */}
        <circle cx="50" cy="52" r="28" fill="url(#eleGrad)" stroke="#57606F" strokeWidth="2" />
        {/* Little Golden Chada Crown */}
        <polygon points="50,14 42,26 58,26" fill="#F9CA24" stroke="#D35400" strokeWidth="1.2" />
        <circle cx="50" cy="12" r="2.5" fill="#EE5253" />
        {/* Cute Sparkly Eyes */}
        <circle cx="41" cy="48" r="4.5" fill="#2C3E50" />
        <circle cx="42" cy="46" r="1.5" fill="#FFFFFF" />
        <circle cx="59" cy="48" r="4.5" fill="#2C3E50" />
        <circle cx="60" cy="46" r="1.5" fill="#FFFFFF" />
        {/* Rosy Cheeks */}
        <circle cx="34" cy="56" r="3.5" fill="#FF7675" opacity="0.7" />
        <circle cx="66" cy="56" r="3.5" fill="#FF7675" opacity="0.7" />
        {/* Waving Happy Trunk (งวงช้างน่ารัก) */}
        <path d="M46,58 Q50,78 58,74 Q64,70 56,58" fill="url(#eleGrad)" stroke="#57606F" strokeWidth="1.8" />
        {/* White Tusks (งาช้าง) */}
        <path d="M44,62 Q40,68 38,62" stroke="#FFFFFF" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M56,62 Q60,68 62,62" stroke="#FFFFFF" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </svg>
    );
  }

  if (word === 'กระต่าย') {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        {/* Long Bunny Ears */}
        <ellipse cx="38" cy="24" rx="8" ry="20" fill="#FFFFFF" stroke="#DFE6E9" strokeWidth="1.5" />
        <ellipse cx="38" cy="24" rx="4" ry="14" fill="#FF7675" opacity="0.5" />
        <ellipse cx="62" cy="24" rx="8" ry="20" fill="#FFFFFF" stroke="#DFE6E9" strokeWidth="1.5" />
        <ellipse cx="62" cy="24" rx="4" ry="14" fill="#FF7675" opacity="0.5" />
        {/* Fluffy Head */}
        <circle cx="50" cy="54" r="26" fill="#FFFFFF" stroke="#DFE6E9" strokeWidth="2" />
        {/* Big Cute Eyes */}
        <circle cx="41" cy="50" r="4" fill="#2C3E50" />
        <circle cx="42" cy="48" r="1.5" fill="#FFFFFF" />
        <circle cx="59" cy="50" r="4" fill="#2C3E50" />
        <circle cx="60" cy="48" r="1.5" fill="#FFFFFF" />
        {/* Pink Nose & Whiskers */}
        <polygon points="50,56 47,53 53,53" fill="#FF7675" />
        <path d="M47,58 Q50,62 53,58" stroke="#2C3E50" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <line x1="32" y1="54" x2="22" y2="52" stroke="#B2BEC3" strokeWidth="1.2" />
        <line x1="32" y1="58" x2="22" y2="60" stroke="#B2BEC3" strokeWidth="1.2" />
        <line x1="68" y1="54" x2="78" y2="52" stroke="#B2BEC3" strokeWidth="1.2" />
        <line x1="68" y1="58" x2="78" y2="60" stroke="#B2BEC3" strokeWidth="1.2" />
        {/* Crunchy Carrot */}
        <g transform="translate(48, 66) rotate(-25)">
          <polygon points="0,0 20,6 20,-6" fill="#FF793F" stroke="#CD6133" strokeWidth="1" />
          <path d="M20,0 L26,-3 M20,0 L26,3" stroke="#2ECC71" strokeWidth="1.5" />
        </g>
      </svg>
    );
  }

  if (word === 'กระรอก') {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        {/* Big Bushy Tail */}
        <path d="M46,65 C20,70 12,25 36,18 C46,14 50,30 38,38" fill="#E67E22" stroke="#D35400" strokeWidth="2" />
        {/* Head & Body */}
        <ellipse cx="60" cy="54" rx="20" ry="24" fill="#F39C12" stroke="#D35400" strokeWidth="2" />
        <circle cx="54" cy="38" r="7" fill="#E67E22" />
        {/* Sparkly Eyes */}
        <circle cx="68" cy="48" r="4.5" fill="#2C3E50" />
        <circle cx="70" cy="46" r="1.5" fill="#FFFFFF" />
        {/* Acorn in Paws */}
        <ellipse cx="74" cy="62" rx="7" ry="8" fill="#8A5026" stroke="#5C2E0B" strokeWidth="1" />
        <ellipse cx="74" cy="56" rx="8" ry="4" fill="#5C2E0B" />
      </svg>
    );
  }

  if (word === 'ผีเสื้อ') {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        {/* Rainbow Wings Left */}
        <path d="M48,46 C20,18 10,42 22,54 C12,64 22,82 46,62 Z" fill="#FF9FF3" stroke="#F368E0" strokeWidth="1.8" />
        <circle cx="30" cy="38" r="5" fill="#54A0FF" />
        <circle cx="30" cy="64" r="4" fill="#FECA57" />
        {/* Rainbow Wings Right */}
        <path d="M52,46 C80,18 90,42 78,54 C88,64 78,82 54,62 Z" fill="#FF9FF3" stroke="#F368E0" strokeWidth="1.8" />
        <circle cx="70" cy="38" r="5" fill="#54A0FF" />
        <circle cx="70" cy="64" r="4" fill="#FECA57" />
        {/* Body & Antennae */}
        <ellipse cx="50" cy="52" rx="5" ry="18" fill="#57606F" />
        <path d="M48,35 Q42,20 36,24" stroke="#57606F" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <path d="M52,35 Q58,20 64,24" stroke="#57606F" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      </svg>
    );
  }

  if (word === 'ปลาดาว') {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        {/* 5-pointed cute Starfish */}
        <path
          d="M50,14 L58,38 L84,40 L64,56 L70,82 L50,68 L30,82 L36,56 L16,40 L42,38 Z"
          fill="#FF9F43"
          stroke="#EE5A24"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* Cute Face */}
        <circle cx="44" cy="48" r="3" fill="#2C3E50" />
        <circle cx="56" cy="48" r="3" fill="#2C3E50" />
        <path d="M47,56 Q50,60 53,56" stroke="#2C3E50" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <ellipse cx="39" cy="54" rx="3" ry="1.8" fill="#FF7675" opacity="0.7" />
        <ellipse cx="61" cy="54" rx="3" ry="1.8" fill="#FF7675" opacity="0.7" />
      </svg>
    );
  }

  if (word === 'โลมา') {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        {/* Leaping Dolphin */}
        <path
          d="M18,65 C26,35 60,20 82,34 C76,46 64,54 45,62 C34,66 24,72 18,65 Z"
          fill="#54A0FF"
          stroke="#2E86DE"
          strokeWidth="2"
        />
        {/* Dorsal Fin */}
        <path d="M52,26 C58,16 66,22 62,30 Z" fill="#2E86DE" />
        {/* Tail flukes */}
        <path d="M18,65 L10,58 L14,74 Z" fill="#2E86DE" />
        {/* Eye and smile */}
        <circle cx="72" cy="36" r="3" fill="#2C3E50" />
        <circle cx="73" cy="35" r="1" fill="#FFFFFF" />
        <path d="M72,42 Q78,44 80,40" stroke="#2C3E50" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* Water drops */}
        <circle cx="78" cy="20" r="2.5" fill="#74B9FF" />
        <circle cx="86" cy="26" r="2" fill="#74B9FF" />
      </svg>
    );
  }

  // 3. Places Category Vector Artworks
  if (word === 'โรงเรียน') {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        {/* School Building Base */}
        <rect x="20" y="42" width="60" height="42" rx="3" fill="#FFEAA7" stroke="#F39C12" strokeWidth="2" />
        {/* Triangular Red Roof */}
        <polygon points="50,14 14,42 86,42" fill="#EE5253" stroke="#D63031" strokeWidth="2" />
        {/* Clock Tower / Thai Flag on Mast */}
        <line x1="50" y1="14" x2="50" y2="4" stroke="#8A5026" strokeWidth="2" />
        <rect x="50" y="4" width="12" height="7" fill="#EE5253" />
        {/* Clock */}
        <circle cx="50" cy="32" r="6" fill="#FFFFFF" stroke="#D63031" strokeWidth="1.2" />
        <line x1="50" y1="32" x2="50" y2="29" stroke="#2C3E50" strokeWidth="1" />
        <line x1="50" y1="32" x2="53" y2="32" stroke="#2C3E50" strokeWidth="1" />
        {/* Blue Door and Windows */}
        <rect x="44" y="62" width="12" height="22" rx="2" fill="#0984E3" />
        <rect x="26" y="50" width="10" height="10" rx="2" fill="#74B9FF" />
        <rect x="64" y="50" width="10" height="10" rx="2" fill="#74B9FF" />
      </svg>
    );
  }

  if (word === 'วัด') {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        {/* Tiered Temple Roofs */}
        <polygon points="50,6 44,22 56,22" fill="#F9CA24" stroke="#D35400" strokeWidth="1.2" />
        <path d="M25,40 Q50,26 75,40 L70,30 Q50,22 30,30 Z" fill="#EE5253" stroke="#C0392B" strokeWidth="1.5" />
        <path d="M15,56 Q50,38 85,56 L80,44 Q50,32 20,44 Z" fill="#FA8231" stroke="#D35400" strokeWidth="1.5" />
        {/* Sanctuary Hall */}
        <rect x="26" y="56" width="48" height="30" fill="#FFFFFF" stroke="#E0E0E0" strokeWidth="1.5" />
        {/* Columns & Golden Door */}
        <rect x="32" y="58" width="6" height="28" fill="#F9CA24" />
        <rect x="62" y="58" width="6" height="28" fill="#F9CA24" />
        <path d="M44,86 L44,66 Q50,60 56,66 L56,86 Z" fill="#B33939" stroke="#F9CA24" strokeWidth="1.5" />
      </svg>
    );
  }

  if (word === 'ทะเล') {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        {/* Golden Sun */}
        <circle cx="75" cy="28" r="14" fill="#FFD32A" />
        {/* Curved Coconut Tree */}
        <path d="M22,76 Q34,45 28,26 Q24,46 16,76 Z" fill="#8A5026" />
        {/* Coconut Fronds */}
        <path d="M28,26 Q12,18 2,24" stroke="#2ED573" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M28,26 Q38,14 46,22" stroke="#2ED573" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M28,26 Q22,8 26,2" stroke="#2ED573" strokeWidth="4" fill="none" strokeLinecap="round" />
        {/* Turquoise Ocean Waves */}
        <path d="M0,64 Q25,58 50,64 T100,64 L100,92 L0,92 Z" fill="#00D2D3" />
        <path d="M0,74 Q25,68 50,74 T100,74 L100,92 L0,92 Z" fill="#01A3A4" />
        {/* Sandy Beach */}
        <path d="M0,82 Q40,78 100,86 L100,100 L0,100 Z" fill="#FECA57" />
      </svg>
    );
  }

  // 4. Occupations Category Vector Artworks
  if (word === 'ครู') {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        {/* Blackboard in Background */}
        <rect x="15" y="15" width="70" height="42" rx="3" fill="#10AC84" stroke="#8A5026" strokeWidth="3" />
        <text x="24" y="32" fill="#FFFFFF" fontSize="10" fontWeight="bold">ก ข ค</text>
        <line x1="24" y1="42" x2="45" y2="42" stroke="#FFEAA7" strokeWidth="1.5" />
        {/* Kind Teacher Smiling */}
        <circle cx="65" cy="46" r="16" fill="#FFEAA7" stroke="#E0AC69" strokeWidth="1.5" />
        {/* Hair Bun with Pen */}
        <circle cx="65" cy="30" r="9" fill="#2C3E50" />
        {/* Glasses & Smile */}
        <circle cx="59" cy="45" r="4" fill="none" stroke="#2C3E50" strokeWidth="1.5" />
        <circle cx="71" cy="45" r="4" fill="none" stroke="#2C3E50" strokeWidth="1.5" />
        <line x1="63" y1="45" x2="67" y2="45" stroke="#2C3E50" strokeWidth="1.5" />
        <path d="M62,53 Q65,57 68,53" stroke="#EE5253" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* Shirt Collar */}
        <path d="M48,62 L82,62 L86,88 L44,88 Z" fill="#F8C291" stroke="#E55039" strokeWidth="1.5" />
      </svg>
    );
  }

  if (word === 'หมอ') {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        {/* Kind Doctor Head */}
        <circle cx="50" cy="38" r="18" fill="#FFEAA7" stroke="#E0AC69" strokeWidth="1.5" />
        {/* Hair */}
        <path d="M32,34 C32,22 68,22 68,34 C68,28 32,28 32,34 Z" fill="#2C3E50" />
        {/* Friendly Eyes and Smile */}
        <circle cx="43" cy="38" r="2.5" fill="#2C3E50" />
        <circle cx="57" cy="38" r="2.5" fill="#2C3E50" />
        <path d="M46,46 Q50,50 54,46" stroke="#EE5253" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* White Coat & Stethoscope */}
        <path d="M30,56 L70,56 L74,90 L26,90 Z" fill="#FFFFFF" stroke="#DFE6E9" strokeWidth="2" />
        <path d="M42,56 Q42,72 50,72 Q58,72 58,56" stroke="#2E86DE" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <circle cx="50" cy="74" r="3.5" fill="#A4B0BE" stroke="#2E86DE" strokeWidth="1" />
        {/* Medical Red Cross Badge */}
        <circle cx="36" cy="68" r="5" fill="#EE5253" />
        <rect x="34.5" y="65" width="3" height="6" fill="#FFFFFF" />
        <rect x="33" y="66.5" width="6" height="3" fill="#FFFFFF" />
      </svg>
    );
  }

  if (word === 'ตำรวจ') {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        {/* Police Cap (หมวกตำรวจ) */}
        <polygon points="50,14 26,30 74,30" fill="#8A5026" stroke="#5C2E0B" strokeWidth="1.5" />
        <rect x="24" y="28" width="52" height="6" rx="2" fill="#2C3E50" />
        <circle cx="50" cy="24" r="3" fill="#F9CA24" />
        {/* Face */}
        <circle cx="50" cy="46" r="17" fill="#FFEAA7" stroke="#E0AC69" strokeWidth="1.5" />
        <circle cx="43" cy="44" r="2.5" fill="#2C3E50" />
        <circle cx="57" cy="44" r="2.5" fill="#2C3E50" />
        <path d="M46,52 Q50,56 54,52" stroke="#2C3E50" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* Brown Uniform & Golden Badge */}
        <path d="M30,63 L70,63 L74,90 L26,90 Z" fill="#A0522D" stroke="#5C2E0B" strokeWidth="2" />
        <polygon points="38,70 42,75 38,80 34,75" fill="#F9CA24" />
      </svg>
    );
  }

  // 5. Language / Values Category Vector Artworks
  if (word === 'ออมสิน') {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        {/* Piggy Bank Body */}
        <ellipse cx="50" cy="54" rx="28" ry="22" fill="#FF9FF3" stroke="#F368E0" strokeWidth="2" />
        {/* Coin Slot on top */}
        <rect x="42" y="32" width="16" height="3" rx="1.5" fill="#D980FA" />
        {/* Shiny Golden Coin dropping in */}
        <circle cx="50" cy="22" r="8" fill="#F9CA24" stroke="#D35400" strokeWidth="1.5" />
        <text x="47" y="26" fill="#D35400" fontSize="9" fontWeight="bold">฿</text>
        {/* Snout & Cute Face */}
        <ellipse cx="68" cy="54" rx="8" ry="6" fill="#FF7675" stroke="#E84118" strokeWidth="1.5" />
        <circle cx="66" cy="54" r="1.5" fill="#FFFFFF" />
        <circle cx="70" cy="54" r="1.5" fill="#FFFFFF" />
        <circle cx="54" cy="46" r="3" fill="#2C3E50" />
        <circle cx="55" cy="45" r="1" fill="#FFFFFF" />
        {/* Curly Tail & Feet */}
        <path d="M22,54 Q14,50 16,44 Q20,40 18,48" stroke="#F368E0" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <rect x="36" y="74" width="8" height="10" rx="3" fill="#F368E0" />
        <rect x="56" y="74" width="8" height="10" rx="3" fill="#F368E0" />
      </svg>
    );
  }

  if (word === 'เก่งกาจ' || word === 'สำเร็จ') {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        {/* Golden Trophy Cup */}
        <path d="M30,25 L70,25 L65,55 C60,65 40,65 35,55 Z" fill="#F9CA24" stroke="#D35400" strokeWidth="2" />
        {/* Trophy Handles */}
        <path d="M30,30 C16,30 16,48 32,50" stroke="#D35400" strokeWidth="3" fill="none" />
        <path d="M70,30 C84,30 84,48 68,50" stroke="#D35400" strokeWidth="3" fill="none" />
        {/* Stem and Pedestal */}
        <rect x="45" y="62" width="10" height="12" fill="#D35400" />
        <rect x="32" y="74" width="36" height="12" rx="3" fill="#6C5CE7" stroke="#4834D4" strokeWidth="1.5" />
        {/* Big Star on Cup */}
        <polygon points="50,34 53,42 61,42 55,47 57,55 50,50 43,55 45,47 39,42 47,42" fill="#FFFFFF" />
      </svg>
    );
  }

  // 6. Manners Category Vector Artworks
  if (word === 'สวัสดี' || word === 'ไหว้สวย') {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        {/* Head */}
        <circle cx="50" cy="32" r="18" fill="#FFEAA7" stroke="#E0AC69" strokeWidth="1.5" />
        <path d="M32,28 C32,16 68,16 68,28 Z" fill="#2C3E50" />
        <circle cx="43" cy="30" r="2.5" fill="#2C3E50" />
        <circle cx="57" cy="30" r="2.5" fill="#2C3E50" />
        <path d="M46,38 Q50,42 54,38" stroke="#EE5253" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* Thai Sabai / Costume */}
        <path d="M32,50 L68,50 L72,85 L28,85 Z" fill="#FF7675" stroke="#D63031" strokeWidth="1.5" />
        {/* Beautiful Pressed Hands in "Wai" (พนมมือ) */}
        <g transform="translate(50, 56)">
          <polygon points="0,-14 -9,12 9,12" fill="#FFEAA7" stroke="#E0AC69" strokeWidth="1.5" />
          <line x1="0" y1="-14" x2="0" y2="12" stroke="#D35400" strokeWidth="1" />
        </g>
        {/* Jasmine Flower Garland Aura */}
        <circle cx="34" cy="58" r="3" fill="#2ED573" />
        <circle cx="66" cy="58" r="3" fill="#2ED573" />
      </svg>
    );
  }

  if (word === 'ขอบคุณ' || word === 'กตัญญู') {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        {/* Beautiful Jasmine Garland (พวงมาลัย) with ribbon */}
        <circle cx="50" cy="46" r="24" fill="none" stroke="#FFFFFF" strokeWidth="12" strokeDasharray="5 2" />
        <circle cx="50" cy="46" r="24" fill="none" stroke="#2ED573" strokeWidth="1.5" />
        {/* Golden Ribbon Bow */}
        <path d="M50,18 C40,8 32,24 50,26 C68,24 60,8 50,18 Z" fill="#F9CA24" stroke="#D35400" strokeWidth="1.5" />
        <line x1="44" y1="26" x2="38" y2="40" stroke="#F9CA24" strokeWidth="3" strokeLinecap="round" />
        <line x1="56" y1="26" x2="62" y2="40" stroke="#F9CA24" strokeWidth="3" strokeLinecap="round" />
        {/* Hanging Flower Tassel */}
        <circle cx="50" cy="74" r="5" fill="#EE5253" />
        <circle cx="45" cy="82" r="3" fill="#F9CA24" />
        <circle cx="55" cy="82" r="3" fill="#F9CA24" />
      </svg>
    );
  }

  if (word === 'ยีราฟ') {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        {/* Long Neck */}
        <path d="M42,90 L42,36 L58,36 L58,90 Z" fill="#F1C40F" stroke="#D35400" strokeWidth="1.5" />
        <circle cx="50" cy="55" r="4" fill="#E67E22" />
        <circle cx="48" cy="75" r="4" fill="#E67E22" />
        {/* Head */}
        <ellipse cx="50" cy="30" rx="14" ry="12" fill="#F1C40F" stroke="#D35400" strokeWidth="1.5" />
        {/* Cute Ossicones (Horns) */}
        <line x1="44" y1="20" x2="44" y2="12" stroke="#D35400" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="44" cy="11" r="2.5" fill="#E67E22" />
        <line x1="56" y1="20" x2="56" y2="12" stroke="#D35400" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="56" cy="11" r="2.5" fill="#E67E22" />
        {/* Ears */}
        <ellipse cx="36" cy="28" rx="5" ry="3" fill="#F1C40F" stroke="#D35400" strokeWidth="1" />
        <ellipse cx="64" cy="28" rx="5" ry="3" fill="#F1C40F" stroke="#D35400" strokeWidth="1" />
        {/* Sparkly Eyes */}
        <circle cx="45" cy="28" r="2.5" fill="#2C3E50" />
        <circle cx="55" cy="28" r="2.5" fill="#2C3E50" />
        <circle cx="46" cy="27" r="1" fill="#FFFFFF" />
        <circle cx="56" cy="27" r="1" fill="#FFFFFF" />
        {/* Muzzle and Smile */}
        <ellipse cx="50" cy="36" rx="9" ry="6" fill="#FCE97F" />
        <circle cx="47" cy="35" r="1" fill="#D35400" />
        <circle cx="53" cy="35" r="1" fill="#D35400" />
        <path d="M48,39 Q50,41 52,39" stroke="#D35400" strokeWidth="1.2" fill="none" />
      </svg>
    );
  }

  if (word === 'สิงโต') {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        {/* Fluffy Golden Sunburst Mane */}
        <circle cx="50" cy="50" r="38" fill="#E67E22" stroke="#D35400" strokeWidth="2" strokeDasharray="14 6" />
        <circle cx="50" cy="50" r="32" fill="#F39C12" />
        {/* Cute Lion Face */}
        <circle cx="50" cy="50" r="24" fill="#FFEAA7" stroke="#D35400" strokeWidth="1.5" />
        {/* Ears */}
        <circle cx="32" cy="30" r="8" fill="#E67E22" />
        <circle cx="32" cy="30" r="4.5" fill="#FCE97F" />
        <circle cx="68" cy="30" r="8" fill="#E67E22" />
        <circle cx="68" cy="30" r="4.5" fill="#FCE97F" />
        {/* Eyes */}
        <circle cx="42" cy="46" r="3.5" fill="#2C3E50" />
        <circle cx="58" cy="46" r="3.5" fill="#2C3E50" />
        <circle cx="43" cy="45" r="1.2" fill="#FFFFFF" />
        <circle cx="59" cy="45" r="1.2" fill="#FFFFFF" />
        {/* Nose and Smile */}
        <polygon points="50,52 46,48 54,48" fill="#D35400" />
        <path d="M46,55 Q50,59 54,55" stroke="#2C3E50" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <ellipse cx="36" cy="52" rx="3.5" ry="2" fill="#FF7675" opacity="0.6" />
        <ellipse cx="64" cy="52" rx="3.5" ry="2" fill="#FF7675" opacity="0.6" />
      </svg>
    );
  }

  if (word === 'หมูอ้วน') {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        {/* Chubby Pink Piglet Head */}
        <circle cx="50" cy="52" r="34" fill="#FFB8B8" stroke="#FF7675" strokeWidth="2" />
        {/* Floppy Triangle Ears */}
        <polygon points="22,30 36,22 32,42" fill="#FF7675" stroke="#D63031" strokeWidth="1.5" />
        <polygon points="78,30 64,22 68,42" fill="#FF7675" stroke="#D63031" strokeWidth="1.5" />
        {/* Cute Sparkly Eyes */}
        <circle cx="38" cy="46" r="3.5" fill="#2C3E50" />
        <circle cx="62" cy="46" r="3.5" fill="#2C3E50" />
        <circle cx="39" cy="45" r="1.2" fill="#FFFFFF" />
        <circle cx="63" cy="45" r="1.2" fill="#FFFFFF" />
        {/* Big Snout */}
        <ellipse cx="50" cy="58" rx="14" ry="10" fill="#FF7675" stroke="#D63031" strokeWidth="1.5" />
        <ellipse cx="45" cy="58" rx="2.5" ry="4" fill="#2C3E50" />
        <ellipse cx="55" cy="58" rx="2.5" ry="4" fill="#2C3E50" />
        {/* Rosy Cheeks */}
        <circle cx="28" cy="56" r="4" fill="#FF4757" opacity="0.5" />
        <circle cx="72" cy="56" r="4" fill="#FF4757" opacity="0.5" />
      </svg>
    );
  }

  if (word === 'เป็ดน้อย') {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        {/* Yellow Duck Body */}
        <ellipse cx="50" cy="62" rx="30" ry="22" fill="#FFD32A" stroke="#FFA801" strokeWidth="2" />
        {/* Cute Little Duck Head */}
        <circle cx="60" cy="38" r="18" fill="#FFD32A" stroke="#FFA801" strokeWidth="2" />
        {/* Sparkly Eye */}
        <circle cx="64" cy="34" r="3" fill="#2C3E50" />
        <circle cx="65" cy="33" r="1" fill="#FFFFFF" />
        {/* Orange Beak */}
        <path d="M74,38 Q86,40 76,46 Z" fill="#FF5E57" stroke="#D63031" strokeWidth="1.2" />
        {/* Wing */}
        <ellipse cx="44" cy="62" rx="14" ry="9" fill="#FFA801" opacity="0.7" />
        {/* Water Ripples */}
        <path d="M12,82 Q30,78 50,82 T90,82" stroke="#4BCFFA" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M22,88 Q40,84 60,88 T80,88" stroke="#0ABDE3" strokeWidth="2" fill="none" strokeLinecap="round" />
      </svg>
    );
  }

  if (word === 'ภูเขา') {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        {/* Sun */}
        <circle cx="50" cy="24" r="12" fill="#FFD32A" />
        {/* Distant Blue Mountain */}
        <polygon points="50,22 10,84 90,84" fill="#74B9FF" stroke="#0984E3" strokeWidth="1.5" />
        {/* Snow / Mist Cap */}
        <polygon points="50,22 40,40 46,38 50,44 54,38 60,40" fill="#FFFFFF" />
        {/* Foreground Green Hill */}
        <polygon points="28,42 0,90 64,90" fill="#2ED573" stroke="#10AC84" strokeWidth="1.5" />
        <polygon points="72,48 40,90 100,90" fill="#26AF5F" stroke="#10AC84" strokeWidth="1.5" />
        {/* Cute Pine Tree */}
        <polygon points="28,64 22,76 34,76" fill="#1E824C" />
        <polygon points="72,68 66,80 78,80" fill="#1E824C" />
      </svg>
    );
  }

  if (word === 'โรงพยาบาล') {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        {/* Hospital Building */}
        <rect x="20" y="28" width="60" height="60" rx="4" fill="#FFFFFF" stroke="#DFE6E9" strokeWidth="2.5" />
        {/* Red Cross Badge on Top */}
        <circle cx="50" cy="42" r="10" fill="#FF4757" />
        <rect x="47.5" y="36" width="5" height="12" fill="#FFFFFF" />
        <rect x="44" y="39.5" width="12" height="5" fill="#FFFFFF" />
        {/* Glass Windows */}
        <rect x="28" y="56" width="10" height="10" rx="2" fill="#74B9FF" />
        <rect x="62" y="56" width="10" height="10" rx="2" fill="#74B9FF" />
        {/* Automatic Sliding Glass Door */}
        <rect x="44" y="68" width="12" height="20" rx="2" fill="#0984E3" />
      </svg>
    );
  }

  if (word === 'บ้าน') {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        {/* Chimney with cute smoke puff */}
        <rect x="66" y="24" width="8" height="16" fill="#D63031" />
        <circle cx="70" cy="18" r="4" fill="#DFE6E9" opacity="0.8" />
        <circle cx="74" cy="12" r="5" fill="#DFE6E9" opacity="0.8" />
        {/* Red Triangle Roof */}
        <polygon points="50,18 12,48 88,48" fill="#FF5E57" stroke="#D63031" strokeWidth="2" />
        {/* Warm Cream Wall */}
        <rect x="20" y="48" width="60" height="42" fill="#FFEAA7" stroke="#F39C12" strokeWidth="2" />
        {/* Cozy Wooden Door */}
        <rect x="44" y="62" width="14" height="28" rx="2" fill="#8A5026" stroke="#5C2E0B" strokeWidth="1.5" />
        <circle cx="54" cy="76" r="1.5" fill="#F9CA24" />
        {/* Cute Window with light */}
        <rect x="26" y="56" width="12" height="12" rx="2" fill="#74B9FF" stroke="#0984E3" strokeWidth="1" />
        <line x1="32" y1="56" x2="32" y2="68" stroke="#0984E3" strokeWidth="1" />
        <line x1="26" y1="62" x2="38" y2="62" stroke="#0984E3" strokeWidth="1" />
      </svg>
    );
  }

  if (word === 'ชาวนา') {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        {/* Traditional Thai Conical Straw Hat (งอบชาวนา) */}
        <polygon points="50,14 16,38 84,38" fill="#F9CA24" stroke="#D35400" strokeWidth="2" />
        {/* Face */}
        <circle cx="50" cy="46" r="16" fill="#FFEAA7" stroke="#E0AC69" strokeWidth="1.5" />
        <circle cx="43" cy="44" r="2.5" fill="#2C3E50" />
        <circle cx="57" cy="44" r="2.5" fill="#2C3E50" />
        <path d="M46,52 Q50,56 54,52" stroke="#EE5253" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* Traditional Indigo Shirt (เสื้อม่อฮ่อม) */}
        <path d="M28,62 L72,62 L76,90 L24,90 Z" fill="#1E3799" stroke="#0C2461" strokeWidth="2" />
        {/* Golden Rice Sheaf (รวงข้าวสีทอง) */}
        <path d="M68,54 Q82,46 84,32" stroke="#F1C40F" strokeWidth="3" fill="none" strokeLinecap="round" />
        <circle cx="82" cy="36" r="3" fill="#F1C40F" />
        <circle cx="78" cy="42" r="3" fill="#F1C40F" />
      </svg>
    );
  }

  if (word === 'เชฟ') {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        {/* Tall White Toque Chef Hat */}
        <path
          d="M32,32 C26,20 40,8 50,10 C60,8 74,20 68,32 Z"
          fill="#FFFFFF"
          stroke="#DFE6E9"
          strokeWidth="2"
        />
        <rect x="32" y="30" width="36" height="8" rx="2" fill="#FFFFFF" stroke="#DFE6E9" strokeWidth="1.5" />
        {/* Face */}
        <circle cx="50" cy="48" r="16" fill="#FFEAA7" stroke="#E0AC69" strokeWidth="1.5" />
        {/* Moustache & Smile */}
        <path d="M42,50 Q46,46 50,50 Q54,46 58,50" stroke="#2C3E50" strokeWidth="2" fill="none" />
        <circle cx="43" cy="44" r="2.5" fill="#2C3E50" />
        <circle cx="57" cy="44" r="2.5" fill="#2C3E50" />
        {/* White Chef Double-Breasted Jacket */}
        <path d="M28,64 L72,64 L76,90 L24,90 Z" fill="#FFFFFF" stroke="#DFE6E9" strokeWidth="2" />
        <circle cx="46" cy="72" r="1.8" fill="#2C3E50" />
        <circle cx="54" cy="72" r="1.8" fill="#2C3E50" />
        <circle cx="46" cy="80" r="1.8" fill="#2C3E50" />
        <circle cx="54" cy="80" r="1.8" fill="#2C3E50" />
      </svg>
    );
  }

  if (word === 'ดีใจ' || word === 'ความสุข') {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        {/* Jumping Joyful Kid with Open Arms */}
        <circle cx="50" cy="34" r="18" fill="#FFEAA7" stroke="#E0AC69" strokeWidth="1.5" />
        {/* Big Happy Anime Smile & Cheerful Eyes */}
        <path d="M41,32 Q44,28 47,32" stroke="#2C3E50" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M53,32 Q56,28 59,32" stroke="#2C3E50" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M44,40 Q50,48 56,40 Z" fill="#FF5E57" />
        <circle cx="36" cy="38" r="3.5" fill="#FF7675" opacity="0.6" />
        <circle cx="64" cy="38" r="3.5" fill="#FF7675" opacity="0.6" />
        {/* Raised Victory Arms */}
        <path d="M26,38 Q34,50 42,56" stroke="#FFEAA7" strokeWidth="7" fill="none" strokeLinecap="round" />
        <path d="M74,38 Q66,50 58,56" stroke="#FFEAA7" strokeWidth="7" fill="none" strokeLinecap="round" />
        {/* Colorful Floating Balloons / Confetti */}
        <circle cx="22" cy="18" r="7" fill="#FF5E57" />
        <circle cx="78" cy="16" r="7" fill="#54A0FF" />
        <polygon points="50,6 52,12 58,12 53,16 55,22 50,18 45,22 47,16 42,12 48,12" fill="#FFD32A" />
      </svg>
    );
  }

  if (word === 'ขยัน') {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        {/* Cute Hardworking Honeybee */}
        {/* Translucent Wings */}
        <ellipse cx="38" cy="32" rx="14" ry="8" fill="#DFF9FB" stroke="#7ED6DF" strokeWidth="1.5" transform="rotate(-30 38 32)" />
        <ellipse cx="62" cy="32" rx="14" ry="8" fill="#DFF9FB" stroke="#7ED6DF" strokeWidth="1.5" transform="rotate(30 62 32)" />
        {/* Striped Bee Body */}
        <ellipse cx="50" cy="56" rx="24" ry="20" fill="#FFD32A" stroke="#FFA801" strokeWidth="2" />
        <line x1="42" y1="38" x2="42" y2="74" stroke="#2C3E50" strokeWidth="4" />
        <line x1="56" y1="38" x2="56" y2="74" stroke="#2C3E50" strokeWidth="4" />
        {/* Stinger */}
        <polygon points="76,56 70,52 70,60" fill="#2C3E50" />
        {/* Face */}
        <circle cx="34" cy="52" r="3.5" fill="#2C3E50" />
        <circle cx="35" cy="51" r="1.2" fill="#FFFFFF" />
        <path d="M30,58 Q34,62 38,58" stroke="#2C3E50" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <circle cx="28" cy="56" r="2.5" fill="#FF7675" opacity="0.6" />
        {/* Honey Pot / Drop */}
        <circle cx="50" cy="84" r="5" fill="#FFA801" />
      </svg>
    );
  }

  if (word === 'สดใส') {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        {/* Bright Radiant Smiling Sun with Sunglasses */}
        <circle cx="50" cy="50" r="26" fill="#FFD32A" stroke="#FFA801" strokeWidth="2" />
        {/* Radiating Rays */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * 45 * Math.PI) / 180;
          const x1 = 50 + Math.cos(angle) * 32;
          const y1 = 50 + Math.sin(angle) * 32;
          const x2 = 50 + Math.cos(angle) * 42;
          const y2 = 50 + Math.sin(angle) * 42;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#FF9F43" strokeWidth="4" strokeLinecap="round" />;
        })}
        {/* Cool Sunglasses */}
        <rect x="34" y="44" width="13" height="9" rx="3" fill="#2C3E50" />
        <rect x="53" y="44" width="13" height="9" rx="3" fill="#2C3E50" />
        <line x1="47" y1="47" x2="53" y2="47" stroke="#2C3E50" strokeWidth="2" />
        {/* Big Smile */}
        <path d="M44,58 Q50,65 56,58" stroke="#D35400" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </svg>
    );
  }

  if (word === 'ยิ้มแย้ม') {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        {/* Giant Kawaii Smiling Emoji Face */}
        <circle cx="50" cy="50" r="38" fill="#FFD32A" stroke="#FFA801" strokeWidth="2.5" />
        {/* Happy Arc Eyes */}
        <path d="M34,42 Q42,32 50,42" stroke="#2C3E50" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <path d="M50,42 Q58,32 66,42" stroke="#2C3E50" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        {/* Big Happy Open Mouth */}
        <path d="M36,52 Q50,76 64,52 Z" fill="#EE5253" stroke="#D63031" strokeWidth="2" />
        <path d="M42,64 Q50,56 58,64" fill="#FF7979" />
        {/* Rosy Cheeks with Sparkles */}
        <circle cx="28" cy="50" r="5" fill="#FF7675" opacity="0.7" />
        <circle cx="72" cy="50" r="5" fill="#FF7675" opacity="0.7" />
      </svg>
    );
  }

  // Fallback Dynamic Cartoon Vector Theme based on Category
  const categoryThemes: Record<string, { bg: string; icon: string; border: string }> = {
    food: { bg: '#FF9F43', icon: '🍲', border: '#EE5A24' },
    animals: { bg: '#10AC84', icon: '🐾', border: '#1DD1A1' },
    places: { bg: '#54A0FF', icon: '🏞️', border: '#2E86DE' },
    occupations: { bg: '#5F27CD', icon: '💼', border: '#341F97' },
    language: { bg: '#FF6B6B', icon: '⭐', border: '#EE5253' },
    manners: { bg: '#0ABDE3', icon: '💖', border: '#00A8FF' },
  };

  const currentTheme = categoryThemes[category] || { bg: '#FF9F43', icon: '✨', border: '#EE5A24' };

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
      <circle cx="50" cy="50" r="44" fill={currentTheme.bg} stroke={currentTheme.border} strokeWidth="3" />
      <circle cx="50" cy="50" r="36" fill="#FFFFFF" opacity="0.25" />
      {/* Cartoon Gimmick Badge Icon */}
      <text x="50" y="58" fontSize="34" textAnchor="middle" dominantBaseline="middle">
        {currentTheme.icon}
      </text>
      {/* Cute Little Sparkle */}
      <circle cx="70" cy="28" r="3.5" fill="#FFF275" />
    </svg>
  );
};
