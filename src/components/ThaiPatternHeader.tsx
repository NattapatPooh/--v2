import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Maximize2, Minimize2, Home, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';
import { GameSoundControl } from './GameSoundControl';

interface ThaiPatternHeaderProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  bgmEnabled: boolean;
  onToggleBgm: () => void;
  onGoHome?: () => void;
  showHomeButton?: boolean;
  isMenuScreen?: boolean;
}

export const ThaiPatternHeader: React.FC<ThaiPatternHeaderProps> = ({
  soundEnabled,
  onToggleSound,
  bgmEnabled,
  onToggleBgm,
  onGoHome,
  showHomeButton = false,
  isMenuScreen = false,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
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
        if (
          'screen' in window &&
          'orientation' in window.screen &&
          'lock' in (window.screen.orientation as unknown as { lock: (orientation: string) => Promise<void> })
        ) {
          try {
            await (window.screen.orientation as unknown as { lock: (orientation: string) => Promise<void> }).lock('landscape');
          } catch {
            // Safe to ignore in restrictive browser environments
          }
        }
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

  // If on the Main Menu screen, show floating top-right HUD (No redundant duplicate top header!)
  if (isMenuScreen) {
    return (
      <div className="fixed top-3 sm:top-5 right-3 sm:right-6 z-40 flex items-center gap-2 pointer-events-auto">
        {/* Creative 3D Game Sound Control Buttons (BGM + SFX) */}
        <GameSoundControl
          soundEnabled={soundEnabled}
          onToggleSound={onToggleSound}
          bgmEnabled={bgmEnabled}
          onToggleBgm={onToggleBgm}
          compact={false}
        />

        {/* Creative 3D Fullscreen / Landscape Toggle */}
        <motion.button
          type="button"
          onClick={toggleFullscreen}
          whileHover={{ scale: 1.06, y: -2 }}
          whileTap={{ scale: 0.92, y: 2 }}
          className="flex items-center gap-1.5 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-2xl bg-gradient-to-b from-[#FFFDF0] via-[#E8F4FD] to-[#D0E9FD] border-3 border-[#2E86DE] text-[#1B6CA8] shadow-[0_4px_0_#1B6CA8] active:shadow-[0_1px_0_#1B6CA8] font-black text-xs sm:text-sm cursor-pointer transition-colors"
          title={isFullscreen ? 'ออกจากโหมดเต็มจอ' : 'หมุนแนวนอน / โหมดเต็มจอ'}
        >
          {isFullscreen ? (
            <>
              <Minimize2 className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#2E86DE]" />
              <span className="hidden sm:inline text-xs">ย่อจอ</span>
            </>
          ) : (
            <>
              <Maximize2 className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#2E86DE]" />
              <span className="hidden sm:inline text-xs">เต็มจอ</span>
            </>
          )}
        </motion.button>
      </div>
    );
  }

  // When playing the game, render a sleek, game-native top bar (always visible at top)
  return (
    <header className="sticky top-0 w-full px-3 py-2 sm:px-6 bg-[#FFF8E7] border-b-3 border-[#8A6248] shadow-sm z-40 flex items-center justify-between">
      {/* Left: Home / Exit to Menu Button */}
      <div className="flex items-center gap-2">
        {showHomeButton && onGoHome && (
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              sound.playPop();
              onGoHome();
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl bg-gradient-to-b from-[#FFFDF0] to-[#FFE59A] border-3 border-[#8A6248] shadow-[0_3px_0_#8A6248] text-[#5D3A1A] font-black text-xs sm:text-sm active:translate-y-0.5 cursor-pointer transition-all"
          >
            <Home className="w-4 h-4 text-[#8A6248]" />
            <span>หน้าหลัก</span>
          </motion.button>
        )}
      </div>

      {/* Right: Sound Control & Fullscreen Button */}
      <div className="flex items-center gap-1.5 sm:gap-2">
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
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 sm:px-2.5 sm:py-2 rounded-2xl bg-white hover:bg-[#FFF9EE] border-3 border-[#8A6248] shadow-[0_3px_0_#8A6248] text-[#5D3A1A] active:translate-y-0.5 cursor-pointer transition-all flex items-center gap-1"
          title={isFullscreen ? 'ออกจากโหมดเต็มจอ' : 'หมุนแนวนอน / เต็มจอ'}
        >
          {isFullscreen ? (
            <Minimize2 className="w-4 h-4 text-[#54A0FF]" />
          ) : (
            <Maximize2 className="w-4 h-4 text-[#54A0FF]" />
          )}
        </motion.button>
      </div>
    </header>
  );
};
