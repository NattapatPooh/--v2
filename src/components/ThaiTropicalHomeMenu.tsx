import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Star } from 'lucide-react';
import { sound } from '../utils/audio';
import { GameSoundControl } from './GameSoundControl';
import thaiBeachBg from '../assets/images/thai_beach_background_1788938774631.jpg';

interface ThaiTropicalHomeMenuProps {
  onStartGame: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  bgmEnabled: boolean;
  onToggleBgm: () => void;
  player?: { fullName: string; nickname: string } | null;
  onSwitchPlayer?: () => void;
}

/**
 * 1. ว่าวไทย (Thai Kite - จุฬา / ปักเป้า) with streaming tail ribbons
 */
const ThaiKiteGraphic: React.FC = () => (
  <motion.div
    animate={{
      y: [-8, 8, -8],
      x: [-4, 6, -4],
      rotate: [-6, 6, -6],
    }}
    transition={{
      duration: 4.2,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
    className="relative select-none pointer-events-none drop-shadow-lg"
  >
    <svg viewBox="0 0 120 160" className="w-16 h-20 sm:w-24 sm:h-32" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="kiteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF9FF3" />
          <stop offset="50%" stopColor="#FECA57" />
          <stop offset="100%" stopColor="#54A0FF" />
        </linearGradient>
      </defs>
      {/* Kite Diamond Body */}
      <polygon points="60,10 95,55 60,100 25,55" fill="url(#kiteGrad)" stroke="#FFFFFF" strokeWidth="2.5" />
      {/* Bamboo Frame Sticks */}
      <line x1="60" y1="10" x2="60" y2="100" stroke="#8A5026" strokeWidth="2" strokeLinecap="round" />
      <path d="M25,55 Q60,70 95,55" stroke="#8A5026" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Decorative Inner Patterns */}
      <polygon points="60,25 80,55 60,85 40,55" fill="#FFFFFF" opacity="0.3" />
      {/* Flying String */}
      <path d="M60,65 Q45,110 30,150" stroke="#FFFFFF" strokeWidth="1.2" strokeDasharray="3 3" fill="none" opacity="0.75" />
      {/* Fluttering Tail Ribbons */}
      <path d="M60,100 Q75,115 65,130 T60,155" stroke="#EE5253" strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="70" cy="116" r="3.5" fill="#FECA57" />
      <circle cx="63" cy="138" r="3.5" fill="#10AC84" />
      <circle cx="61" cy="154" r="3.5" fill="#FF9FF3" />
    </svg>
  </motion.div>
);

/**
 * 2. พระสงฆ์นั่งสมาธิ (Peaceful Seated Monk in Saffron Robes)
 */
const ThaiMonkGraphic: React.FC = () => (
  <motion.div
    animate={{
      y: [-5, 5, -5],
      scale: [1, 1.02, 1],
    }}
    transition={{
      duration: 3.8,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
    className="relative select-none pointer-events-none drop-shadow-xl"
  >
    <svg viewBox="0 0 140 160" className="w-20 h-24 sm:w-28 sm:h-34" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="auraGlow" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#FFF275" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#FFA502" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#FFA502" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="monkCloth" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFA502" />
          <stop offset="60%" stopColor="#FF7F50" />
          <stop offset="100%" stopColor="#D35400" />
        </linearGradient>
      </defs>
      {/* Peaceful Aura Glow */}
      <circle cx="70" cy="55" r="46" fill="url(#auraGlow)" />
      {/* Seated Crossed Legs Base */}
      <ellipse cx="70" cy="132" rx="48" ry="18" fill="url(#monkCloth)" stroke="#B33939" strokeWidth="1.5" />
      {/* Main Body Torso in Saffron Robe */}
      <path d="M42,75 Q70,68 98,75 L108,130 L32,130 Z" fill="url(#monkCloth)" stroke="#B33939" strokeWidth="1.5" />
      {/* Sanghati Sash Fold (สังฆาฏิพาดบ่า) */}
      <path d="M45,75 L62,130 L76,130 L55,75 Z" fill="#D35400" />
      <line x1="58" y1="78" x2="74" y2="130" stroke="#C0392B" strokeWidth="1.5" />
      {/* Meditation Hands in Lap (ปางสมาธิ) */}
      <ellipse cx="70" cy="118" rx="16" ry="7" fill="#FFDFC4" stroke="#E0AC69" strokeWidth="1.2" />
      {/* Peaceful Shaved Head */}
      <circle cx="70" cy="48" r="23" fill="#FFDFC4" stroke="#E0AC69" strokeWidth="1.5" />
      {/* Long Ear Lobes */}
      <path d="M46,45 Q44,57 48,59" stroke="#E0AC69" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M94,45 Q96,57 92,59" stroke="#E0AC69" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Serene Closed Eyes in Meditation */}
      <path d="M59,48 Q64,52 69,48" stroke="#57606F" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M71,48 Q76,52 81,48" stroke="#57606F" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      {/* Gentle Smile */}
      <path d="M66,57 Q70,61 74,57" stroke="#EE5253" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Rosy Soft Blush */}
      <ellipse cx="58" cy="54" rx="4" ry="2.5" fill="#FF7675" opacity="0.55" />
      <ellipse cx="82" cy="54" rx="4" ry="2.5" fill="#FF7675" opacity="0.55" />
    </svg>
  </motion.div>
);

/**
 * 3. ดอกลีลาวดี / ลั่นทมขาวเกสรเหลือง (Plumeria / Frangipani Flower)
 */
const ThaiPlumeriaFlower: React.FC = () => (
  <motion.div
    animate={{
      rotate: [0, 4, -4, 0],
      scale: [1, 1.05, 1],
    }}
    transition={{
      duration: 5,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
    className="relative select-none pointer-events-none drop-shadow-2xl"
  >
    <svg viewBox="0 0 160 160" className="w-24 h-24 sm:w-32 sm:h-32" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="plumeriaCenter" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF9F43" />
          <stop offset="40%" stopColor="#FED330" />
          <stop offset="80%" stopColor="#FFF475" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* 5 Petals */}
      <g transform="translate(80, 80)">
        {[0, 72, 144, 216, 288].map((angle, i) => (
          <path
            key={i}
            d="M0,0 C-18,-35 -15,-65 0,-75 C15,-65 24,-35 0,0 Z"
            transform={`rotate(${angle})`}
            fill="#FFFFFF"
            stroke="#F1F2F6"
            strokeWidth="1.2"
          />
        ))}
        {/* Soft Golden Yellow Center Gradient */}
        <circle cx="0" cy="0" r="32" fill="url(#plumeriaCenter)" />
        <circle cx="0" cy="0" r="14" fill="#FFA502" opacity="0.6" />
      </g>
    </svg>
  </motion.div>
);

/**
 * 4. นางรำไทยน่ารักสวมชฎาทอง (Graceful Thai Classical Dancer)
 */
const ThaiDancerGraphic: React.FC = () => (
  <motion.div
    animate={{
      y: [-6, 6, -6],
      rotate: [-3, 4, -3],
    }}
    transition={{
      duration: 3.2,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
    className="relative select-none pointer-events-none drop-shadow-xl"
  >
    <svg viewBox="0 0 150 170" className="w-22 h-26 sm:w-30 sm:h-36" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="chadaGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFEAA7" />
          <stop offset="50%" stopColor="#F9CA24" />
          <stop offset="100%" stopColor="#E67E22" />
        </linearGradient>
      </defs>
      {/* Golden Chada Headdress (ชฎาทองยอดแหลม) */}
      <polygon points="75,2 66,35 84,35" fill="url(#chadaGold)" stroke="#B7791F" strokeWidth="1.2" />
      <circle cx="75" cy="3" r="3" fill="#EE5253" />
      <circle cx="75" cy="16" r="3" fill="#2ED573" />
      <rect x="58" y="32" width="34" height="9" rx="3" fill="#F1C40F" stroke="#D35400" strokeWidth="1" />
      <circle cx="75" cy="36.5" r="2.5" fill="#E74C3C" />
      {/* Traditional Hair Bun with Red Flower */}
      <path d="M48,46 C48,35 102,35 102,46 C102,55 108,68 108,74 C102,70 98,62 98,54 C90,60 60,60 52,54 C52,62 48,70 42,74 C42,68 48,55 48,46 Z" fill="#2F3542" />
      <circle cx="102" cy="46" r="6" fill="#EE5253" />
      <circle cx="102" cy="46" r="2.5" fill="#FFEAA7" />
      {/* Face */}
      <ellipse cx="75" cy="56" rx="22" ry="20" fill="#FFEAA7" stroke="#E0AC69" strokeWidth="1" />
      {/* Beautiful Eyes with Eyelashes */}
      <ellipse cx="67" cy="55" rx="3" ry="4" fill="#2F3542" />
      <ellipse cx="83" cy="55" rx="3" ry="4" fill="#2F3542" />
      <circle cx="68" cy="53" r="1.2" fill="#FFFFFF" />
      <circle cx="84" cy="53" r="1.2" fill="#FFFFFF" />
      {/* Sweet Smile */}
      <path d="M70,65 Q75,70 80,65" stroke="#D63031" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      {/* Rosy Cheeks */}
      <ellipse cx="60" cy="62" rx="4.5" ry="3" fill="#FF7675" opacity="0.65" />
      <ellipse cx="90" cy="62" rx="4.5" ry="3" fill="#FF7675" opacity="0.65" />
      {/* Sabai (Thai Traditional Red & Gold Sash) */}
      <path d="M58,74 L92,74 L100,125 L50,125 Z" fill="#EE5253" stroke="#B33939" strokeWidth="1.5" />
      <path d="M58,74 L82,74 L92,125 L76,125 Z" fill="#F9CA24" opacity="0.9" />
      {/* Golden Belt */}
      <rect x="54" y="86" width="42" height="6" rx="2.5" fill="#F1C40F" stroke="#B7791F" strokeWidth="1" />
      <circle cx="75" cy="89" r="3.5" fill="#E74C3C" />
      {/* Traditional Thai Dance Gesture Arms & Hands (ท่ารำจีบหงายมือ) */}
      {/* Left Arm (raised curved) */}
      <path d="M52,78 C38,70 28,60 30,52 C32,48 38,50 36,56 C35,60 45,76 54,80 Z" fill="#FFEAA7" stroke="#E67E22" strokeWidth="1" />
      {/* Right Arm (raised high graceful) */}
      <path d="M96,80 C108,76 122,60 120,52 C118,48 112,50 114,56 C115,60 105,70 94,78 Z" fill="#FFEAA7" stroke="#E67E22" strokeWidth="1" />
      {/* Golden Bangles */}
      <rect x="31" y="55" width="5" height="3" rx="1" fill="#F9CA24" />
      <rect x="114" y="55" width="5" height="3" rx="1" fill="#F9CA24" />
    </svg>
  </motion.div>
);

/**
 * 5. ข้าวเหนียวมะม่วงบนใบตอง (Mango Sticky Rice on Banana Leaf)
 */
const ThaiMangoStickyRiceGraphic: React.FC = () => (
  <motion.div
    animate={{
      y: [-5, 5, -5],
      rotate: [-3, 3, -3],
    }}
    transition={{
      duration: 3.5,
      repeat: Infinity,
      ease: 'easeInOut',
      delay: 0.3,
    }}
    className="relative select-none pointer-events-none drop-shadow-xl"
  >
    <svg viewBox="0 0 140 120" className="w-20 h-18 sm:w-26 sm:h-22" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2ED573" />
          <stop offset="100%" stopColor="#10AC84" />
        </linearGradient>
        <linearGradient id="mangoSliceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF275" />
          <stop offset="50%" stopColor="#FFA502" />
          <stop offset="100%" stopColor="#FF7F50" />
        </linearGradient>
      </defs>
      {/* Banana Leaf Bed */}
      <ellipse cx="70" cy="75" rx="60" ry="32" fill="url(#leafGrad)" stroke="#1E824C" strokeWidth="2" />
      {/* Leaf ribs */}
      <path d="M20,75 Q70,68 120,75" stroke="#166534" strokeWidth="1.5" fill="none" opacity="0.6" />
      <path d="M40,65 L50,85" stroke="#166534" strokeWidth="1.2" opacity="0.4" />
      <path d="M70,63 L75,87" stroke="#166534" strokeWidth="1.2" opacity="0.4" />
      <path d="M95,66 L102,85" stroke="#166534" strokeWidth="1.2" opacity="0.4" />
      {/* Sticky Rice Mound (ก้อนข้าวเหนียวมูน) */}
      <ellipse cx="90" cy="62" rx="26" ry="19" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
      {/* Coconut Milk drizzle on rice */}
      <path d="M80,50 Q90,56 100,50 Q105,58 95,64 Q85,58 80,50 Z" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="0.8" />
      {/* Golden Crispy Mung Beans topping */}
      <circle cx="88" cy="54" r="1.8" fill="#F59E0B" />
      <circle cx="94" cy="56" r="1.8" fill="#F59E0B" />
      <circle cx="89" cy="60" r="1.8" fill="#F59E0B" />
      {/* Coconut Milk dipping cup (ถ้วยกะทิ) */}
      <ellipse cx="55" cy="46" rx="14" ry="9" fill="#4A3728" stroke="#2B1D0E" strokeWidth="1.5" />
      <ellipse cx="55" cy="45" rx="11" ry="6" fill="#FFFFFF" />
      {/* Sliced Ripe Mango Slices (มะม่วงสุกหั่นเป็นริ้วสีทอง) */}
      <g transform="translate(25, 45)">
        <path d="M12,30 C6,18 20,4 36,4 C48,4 56,16 52,28 C46,40 24,42 12,30 Z" fill="url(#mangoSliceGrad)" stroke="#D97706" strokeWidth="1.5" />
        {/* Slice score cuts */}
        <path d="M18,12 L44,28" stroke="#B45309" strokeWidth="1.2" opacity="0.75" />
        <path d="M26,8 L48,22" stroke="#B45309" strokeWidth="1.2" opacity="0.75" />
        <path d="M36,6 L50,16" stroke="#B45309" strokeWidth="1.2" opacity="0.75" />
      </g>
    </svg>
  </motion.div>
);

/**
 * 6. ผัดไทยกุ้งสด (Delicious Thai Pad Thai Dish with Jumbo Shrimp)
 */
const ThaiPadThaiGraphic: React.FC = () => (
  <motion.div
    animate={{
      y: [-5, 5, -5],
      rotate: [3, -3, 3],
    }}
    transition={{
      duration: 3.6,
      repeat: Infinity,
      ease: 'easeInOut',
      delay: 0.4,
    }}
    className="relative select-none pointer-events-none drop-shadow-xl"
  >
    <svg viewBox="0 0 140 120" className="w-20 h-18 sm:w-26 sm:h-22" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bowlGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10AC84" />
          <stop offset="100%" stopColor="#057A55" />
        </linearGradient>
        <linearGradient id="noodleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="60%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
      </defs>
      {/* Thai Ceramic Bowl / Plate */}
      <ellipse cx="70" cy="74" rx="58" ry="28" fill="url(#bowlGrad)" stroke="#046C4E" strokeWidth="2" />
      <ellipse cx="70" cy="70" rx="52" ry="24" fill="#FEF3C7" />
      {/* Noodles Heap (เส้นผัดไทยคลุกซอส) */}
      <path d="M30,70 Q70,45 110,70 Q105,82 70,82 Q35,82 30,70 Z" fill="url(#noodleGrad)" stroke="#B45309" strokeWidth="1.2" />
      {/* Tofu Cubes & Chives */}
      <rect x="42" y="65" width="8" height="6" rx="1.5" fill="#FEF08A" stroke="#CA8A04" strokeWidth="0.8" />
      <rect x="85" y="68" width="8" height="6" rx="1.5" fill="#FEF08A" stroke="#CA8A04" strokeWidth="0.8" />
      <line x1="50" y1="62" x2="62" y2="60" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="75" y1="64" x2="88" y2="62" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" />
      {/* Lime Wedge (มะนาวฝาน) */}
      <path d="M96,52 A10,10 0 0,0 110,64 L100,64 Z" fill="#84CC16" stroke="#4D7C0F" strokeWidth="1" />
      <circle cx="102" cy="60" r="1.5" fill="#FEF08A" />
      {/* Big Succulent Prawn / Shrimp (กุ้งสดตัวโตสีส้มแดง) */}
      <g transform="translate(52, 42)">
        <path d="M6,22 C0,12 10,2 24,4 C34,6 40,16 35,26 C30,32 20,30 18,24" fill="#FF6B6B" stroke="#DC2626" strokeWidth="1.5" />
        <path d="M24,4 Q28,14 20,20" stroke="#FFFFFF" strokeWidth="1.2" fill="none" opacity="0.6" />
        {/* Prawn Tail */}
        <polygon points="6,22 0,28 8,30" fill="#EE5253" />
        {/* Prawn Antenna */}
        <path d="M35,16 Q45,10 50,14" stroke="#DC2626" strokeWidth="1" fill="none" />
      </g>
    </svg>
  </motion.div>
);

/**
 * 7. Twinkling Golden Star Particle (ประกายดาววิบวับ)
 */
const GoldenStarSparkle: React.FC<{
  className?: string;
  size?: number;
  delay?: number;
}> = ({ className = '', size = 28, delay = 0 }) => (
  <motion.div
    animate={{
      scale: [0.8, 1.25, 0.8],
      rotate: [0, 45, 0],
      opacity: [0.75, 1, 0.75],
    }}
    transition={{
      duration: 2.2,
      repeat: Infinity,
      ease: 'easeInOut',
      delay,
    }}
    className={`absolute pointer-events-none select-none ${className}`}
  >
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="starShine" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFDF0" />
          <stop offset="35%" stopColor="#FED330" />
          <stop offset="100%" stopColor="#FF9F43" />
        </radialGradient>
      </defs>
      {/* 4-point Diamond Star with long beams */}
      <path
        d="M50,0 Q50,42 8,50 Q50,50 50,100 Q50,58 92,50 Q50,50 50,0 Z"
        fill="url(#starShine)"
        stroke="#E67E22"
        strokeWidth="1.5"
      />
      <circle cx="50" cy="50" r="10" fill="#FFFFFF" opacity="0.9" />
    </svg>
  </motion.div>
);

export const ThaiTropicalHomeMenu: React.FC<ThaiTropicalHomeMenuProps> = ({
  onStartGame,
  soundEnabled,
  onToggleSound,
  bgmEnabled,
  onToggleBgm,
  player,
  onSwitchPlayer,
}) => {
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  React.useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const toggleFullscreen = async () => {
    sound.playPop();
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
          setIsFullscreen(false);
        }
      }
    } catch {
      // ignore fullscreen errors
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center select-none font-['Kanit',sans-serif]">
      {/* 1. Realistic Thai Beach Background Image with Soft Ambient Motion */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img
          src={thaiBeachBg}
          alt="Tropical Thai Beach with Longtail Boat"
          animate={{
            scale: [1, 1.03, 1],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="w-full h-full object-cover object-center pointer-events-none"
        />
        {/* Soft Sun Vignette overlay for visual comfort */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-400/20 via-transparent to-black/30 pointer-events-none" />
      </div>

      {/* Top-Left: Player Nickname Badge (Small, clean & clear icon badge) */}
      {player && (
        <div className="fixed top-3 sm:top-5 left-3 sm:left-6 z-50 flex items-center pointer-events-auto">
          <motion.button
            type="button"
            onClick={() => {
              sound.playPop();
              if (onSwitchPlayer) onSwitchPlayer();
            }}
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-white/90 hover:bg-white border-2 border-[#8A6248] text-[#5D3A1A] shadow-[0_2px_0_#8A6248] cursor-pointer text-xs font-black transition-all backdrop-blur-xs select-none"
            title="ผู้เล่น (แตะเพื่อสลับชื่อ)"
          >
            <span className="text-sm sm:text-base leading-none">🧒</span>
            <span className="tracking-wide">
              {player.nickname.startsWith('น้อง') ? player.nickname : `น้อง${player.nickname}`}
            </span>
          </motion.button>
        </div>
      )}

      {/* 2. Top-Right Floating Controls (Game Sound & Fullscreen) */}
      <div className="fixed top-3 sm:top-5 right-3 sm:right-6 z-50 flex items-center gap-2 pointer-events-auto">
        <GameSoundControl
          soundEnabled={soundEnabled}
          onToggleSound={onToggleSound}
          bgmEnabled={bgmEnabled}
          onToggleBgm={onToggleBgm}
          compact={false}
        />

        <motion.button
          type="button"
          onClick={toggleFullscreen}
          whileHover={{ scale: 1.06, y: -2 }}
          whileTap={{ scale: 0.92, y: 2 }}
          className="flex items-center gap-1.5 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-2xl bg-gradient-to-b from-[#FFFDF0] via-[#E8F4FD] to-[#D0E9FD] border-3 border-[#2E86DE] text-[#1B6CA8] shadow-[0_4px_0_#1B6CA8] active:shadow-[0_1px_0_#1B6CA8] font-black text-xs sm:text-sm cursor-pointer transition-colors"
          title={isFullscreen ? 'ออกจากโหมดเต็มจอ' : 'หมุนแนวนอน / โหมดเต็มจอ'}
        >
          <span className="text-[#2E86DE] font-bold">⛶</span>
          <span className="text-xs font-bold">เต็มจอ</span>
        </motion.button>
      </div>

      {/* 3. Center Creative Content Canvas */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 py-6 flex flex-col items-center justify-center">
        {/* Top Decorative Floating Elements Row */}
        <div className="w-full flex items-end justify-between px-2 sm:px-12 mb-1 sm:mb-2 pointer-events-none">
          {/* Left: Kite & Monk */}
          <div className="flex items-center gap-2 sm:gap-4 -mb-2">
            <ThaiKiteGraphic />
            <div className="hidden xs:block">
              <ThaiMonkGraphic />
            </div>
          </div>

          {/* Center: White Plumeria Flower */}
          <div className="-mb-4 sm:-mb-6">
            <ThaiPlumeriaFlower />
          </div>

          {/* Right: Thai Classical Dancer */}
          <div className="flex items-center gap-2 -mb-2">
            <ThaiDancerGraphic />
          </div>
        </div>

        {/* Golden Twinkling Stars surrounding the Title */}
        <div className="relative w-full flex flex-col items-center text-center">
          <GoldenStarSparkle className="-top-6 left-12 sm:left-28" size={32} delay={0} />
          <GoldenStarSparkle className="top-1 right-10 sm:right-24" size={38} delay={0.6} />
          <GoldenStarSparkle className="bottom-2 -left-2 sm:left-14" size={26} delay={1.2} />
          <GoldenStarSparkle className="bottom-1 -right-2 sm:right-16" size={34} delay={0.9} />

          {/* Main 3D Bubble Typography Title (เกมทายคำศัพท์ไทย) */}
          <motion.div
            animate={{
              y: [-4, 4, -4],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="flex flex-col items-center"
          >
            <h1
              className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-black tracking-tight select-none"
              style={{
                WebkitTextStroke: '2.5px #FFFFFF',
                paintOrder: 'stroke fill',
                color: '#FFAEC9',
                textShadow:
                  '0 0 16px rgba(255, 174, 201, 0.7), 0 7px 0 #D86B91, 0 10px 16px rgba(0, 0, 0, 0.35)',
              }}
            >
              เกมทายคำศัพท์ไทย
            </h1>

            {/* Slogan 2: มหาสนุก in soft pastel blue bubble */}
            <span
              className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-black tracking-tight -mt-1 sm:-mt-2 select-none"
              style={{
                WebkitTextStroke: '2px #FFFFFF',
                paintOrder: 'stroke fill',
                color: '#8AD7FF',
                textShadow:
                  '0 0 14px rgba(138, 215, 255, 0.7), 0 6px 0 #2E86DE, 0 8px 14px rgba(0, 0, 0, 0.32)',
              }}
            >
              มหาสนุก
            </span>
          </motion.div>

          {/* Middle Row: Thai Foods (Mango Sticky Rice & Pad Thai) flanking the Green Curved Slogan Banner */}
          <div className="relative w-full max-w-2xl flex items-center justify-between mt-2 sm:mt-3 px-2 sm:px-6">
            {/* Left Food: ข้าวเหนียวมะม่วง */}
            <div className="flex-shrink-0 -mr-4 sm:mr-0 z-20">
              <ThaiMangoStickyRiceGraphic />
            </div>

            {/* Center Curved Banner: มารู้จักคำศัพท์สไตล์ไทยๆกันนะ */}
            <motion.div
              whileHover={{ scale: 1.04 }}
              animate={{
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative z-10 px-4 sm:px-7 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-[#10AC84] via-[#2ED573] to-[#10AC84] border-3 border-white shadow-[0_6px_0_#166534,0_10px_16px_rgba(0,0,0,0.35)] flex items-center justify-center gap-1.5 sm:gap-2 mx-1 sm:mx-4"
            >
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFEAA7] fill-[#FFEAA7] animate-spin" style={{ animationDuration: '6s' }} />
              <span className="text-sm xs:text-base sm:text-lg md:text-xl font-black text-white tracking-wide drop-shadow-sm whitespace-nowrap">
                มารู้จักคำศัพท์สไตล์ไทยๆกันนะ
              </span>
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFEAA7] fill-[#FFEAA7] animate-spin" style={{ animationDuration: '6s' }} />
            </motion.div>

            {/* Right Food: ผัดไทย */}
            <div className="flex-shrink-0 -ml-4 sm:ml-0 z-20">
              <ThaiPadThaiGraphic />
            </div>
          </div>

          {/* 4. The Cute Playful ⭐ เล่นเกม ⭐ Button */}
          <div className="mt-5 sm:mt-7 flex flex-col items-center">
            <motion.button
              type="button"
              onClick={() => {
                sound.playPop();
                onStartGame();
              }}
              whileHover={{ scale: 1.08, y: -3 }}
              whileTap={{ scale: 0.94, y: 3 }}
              animate={{
                scale: [1, 1.04, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative group flex items-center justify-center gap-2.5 sm:gap-3 px-8 sm:px-12 py-3 sm:py-4 rounded-full bg-gradient-to-r from-[#FF9FF3] via-[#F368E0] to-[#FF9FF3] border-4 border-[#2F3542] shadow-[0_8px_0_#2F3542,0_12px_20px_rgba(0,0,0,0.35)] active:shadow-[0_2px_0_#2F3542] cursor-pointer transition-all"
            >
              {/* Top Gloss Highlight */}
              <div className="absolute top-1 left-4 right-4 h-2 rounded-full bg-white/40 pointer-events-none" />

              {/* Left Gold Star */}
              <Star className="w-5 h-5 sm:w-7 sm:h-7 text-[#FED330] fill-[#FED330] stroke-[#8A5026] stroke-[1.5] drop-shadow-xs animate-bounce" />

              {/* Main Button Text */}
              <span className="text-xl sm:text-3xl font-black text-[#2F3542] tracking-wider drop-shadow-xs">
                เล่นเกม
              </span>

              {/* Right Gold Star */}
              <Star className="w-5 h-5 sm:w-7 sm:h-7 text-[#FED330] fill-[#FED330] stroke-[#8A5026] stroke-[1.5] drop-shadow-xs animate-bounce" />
            </motion.button>

            {/* Sub-hint indicator */}
            <motion.p
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-3 text-xs sm:text-sm font-bold text-white/95 px-3 py-1 rounded-full bg-black/40 backdrop-blur-xs shadow-xs drop-shadow-sm"
            >
              ✨ กดเพื่อเลือกหมวดหมู่และเริ่มตะลุย 120 ด่าน ✨
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  );
};
