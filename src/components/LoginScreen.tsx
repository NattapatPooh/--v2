import React, { useState } from 'react';
import { motion } from 'motion/react';
import loginMountainBg from '../assets/images/login_mountain_bg_1789027655706.jpg';
import { sound } from '../utils/audio';
import { GameSoundControl } from './GameSoundControl';

interface LoginScreenProps {
  onStartGame: (playerInfo: { fullName: string; nickname: string }) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  bgmEnabled: boolean;
  onToggleBgm: () => void;
  initialPlayer?: { fullName: string; nickname: string };
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onStartGame,
  soundEnabled,
  onToggleSound,
  bgmEnabled,
  onToggleBgm,
  initialPlayer,
}) => {
  const [fullName, setFullName] = useState<string>(initialPlayer?.fullName || '');
  const [nickname, setNickname] = useState<string>(initialPlayer?.nickname || '');
  const [errorPrompt, setErrorPrompt] = useState<string>('');

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const trimmedFull = fullName.trim();
    const trimmedNick = nickname.trim();

    if (!trimmedFull && !trimmedNick) {
      sound.playWrong();
      setErrorPrompt('กรุณากรอกชื่อหรือชื่อเล่นก่อนเข้าเล่นนะจ๊ะ');
      setTimeout(() => setErrorPrompt(''), 3500);
      return;
    }

    sound.playCorrect();
    if (bgmEnabled) {
      sound.playBGM();
    }
    onStartGame({
      fullName: trimmedFull || trimmedNick,
      nickname: trimmedNick || trimmedFull,
    });
  };

  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center font-prompt select-none">
      {/* ================= Background Image (Phu Thap Boek Mountains) ================= */}
      <div className="absolute inset-0 z-0">
        <img
          src={loginMountainBg}
          alt="Scenic Mountain Background"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center"
        />
        {/* Soft Vignette Overlay for Crisp Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-400/15 via-transparent to-black/25 pointer-events-none" />
      </div>

      {/* Floating Sound Control (Draggable small button) */}
      <div className="fixed top-4 right-4 z-50 pointer-events-auto">
        <GameSoundControl
          soundEnabled={soundEnabled}
          onToggleSound={onToggleSound}
          bgmEnabled={bgmEnabled}
          onToggleBgm={onToggleBgm}
          compact={true}
        />
      </div>

      {/* ================= Main Container matching user design ================= */}
      <div className="relative z-10 w-full max-w-2xl px-4 sm:px-6 flex flex-col items-center">
        {/* Title: "ลงชื่อก่อนเล่นเกมนะ!!!" */}
        <div className="relative mb-6 sm:mb-8 text-center">
          <motion.h1
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 14, stiffness: 220 }}
            className="text-3xl sm:text-5xl md:text-6xl font-black tracking-wide text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.4)] leading-tight flex items-center justify-center"
            style={{
              WebkitTextStroke: '2.5px #E84118',
              textShadow: '0 4px 0 #C23616, 0 6px 12px rgba(0,0,0,0.35)',
            }}
          >
            ลงชื่อก่อนเล่นเกมนะ!!!
          </motion.h1>
        </div>

        {/* Form Area */}
        <div className="relative w-full max-w-lg sm:max-w-xl flex flex-col items-center">
          <form onSubmit={handleSubmit} className="w-full space-y-4 sm:space-y-5">
            {/* Input 1: ชื่อ - นามสกุล (Full Name) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="relative w-full"
            >
              <div className="w-full rounded-full p-[3px] bg-gradient-to-r from-[#FFAFCB] via-[#FFC5E3] to-[#FFAFCB] shadow-[0_6px_16px_rgba(0,0,0,0.22)]">
                <div className="w-full rounded-full border-2 sm:border-3 border-dashed border-white/90 bg-[#FFD1EB] hover:bg-[#FFDBEE] focus-within:bg-[#FFE3F3] focus-within:border-white transition-all px-6 sm:px-8 py-3.5 sm:py-4 flex items-center">
                  <input
                    id="player-fullname-input"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="ชื่อ - นามสกุล"
                    className="w-full bg-transparent text-[#4A1525] font-black text-lg sm:text-2xl outline-none placeholder:text-[#A85876] placeholder:font-bold tracking-wide"
                    autoComplete="off"
                  />
                </div>
              </div>
            </motion.div>

            {/* Input 2: ชื่อเล่น (Nickname) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative w-full"
            >
              <div className="w-full rounded-full p-[3px] bg-gradient-to-r from-[#FFAFCB] via-[#FFC5E3] to-[#FFAFCB] shadow-[0_6px_16px_rgba(0,0,0,0.22)]">
                <div className="w-full rounded-full border-2 sm:border-3 border-dashed border-white/90 bg-[#FFD1EB] hover:bg-[#FFDBEE] focus-within:bg-[#FFE3F3] focus-within:border-white transition-all px-6 sm:px-8 py-3.5 sm:py-4 flex items-center">
                  <input
                    id="player-nickname-input"
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder="ชื่อเล่น"
                    className="w-full bg-transparent text-[#4A1525] font-black text-lg sm:text-2xl outline-none placeholder:text-[#A85876] placeholder:font-bold tracking-wide"
                    autoComplete="off"
                  />
                </div>
              </div>
            </motion.div>

            {/* Error prompt if empty */}
            {errorPrompt && (
              <motion.p
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center text-sm sm:text-base font-black text-[#D63031] bg-white/90 px-4 py-1.5 rounded-full border-2 border-[#FF7675] shadow-sm"
              >
                ⚠️ {errorPrompt}
              </motion.p>
            )}

            {/* Submit Button: "เล่นเลย" with Black Dashed Border */}
            <div className="flex justify-center pt-2 sm:pt-4">
              <motion.button
                id="login-play-button"
                type="submit"
                whileHover={{ scale: 1.07, y: -2 }}
                whileTap={{ scale: 0.94, y: 2 }}
                className="relative px-10 sm:px-14 py-3 sm:py-4 rounded-full bg-gradient-to-b from-[#F9CA24] via-[#F0932B] to-[#E67E22] border-3 sm:border-4 border-dashed border-[#1E1E1E] shadow-[0_8px_20px_rgba(0,0,0,0.35)] cursor-pointer active:shadow-[0_2px_6px_rgba(0,0,0,0.35)] transition-all"
              >
                {/* 3D Gloss highlight */}
                <div className="absolute top-1 left-4 right-4 h-2 rounded-full bg-white/50 pointer-events-none" />

                <span
                  className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-wider block"
                  style={{
                    WebkitTextStroke: '2px #1E1E1E',
                    textShadow: '0 3px 0 #1E1E1E, 0 5px 8px rgba(0,0,0,0.3)',
                  }}
                >
                  เล่นเลย
                </span>
              </motion.button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
