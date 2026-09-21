import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Clock } from 'lucide-react';
import { sound } from '../utils/audio';

interface TimerBarProps {
  timeLeft: number;       // 0 to 30
  maxTime?: number;      // default 30
  isPaused?: boolean;
}

export const TimerBar: React.FC<TimerBarProps> = ({
  timeLeft,
  maxTime = 30,
  isPaused = false,
}) => {
  const percentage = Math.max(0, Math.min(100, (timeLeft / maxTime) * 100));

  // Determine color based on time left
  let barGradient = 'from-[#10AC84] to-[#2ED573]';
  let barBorder = '#10AC84';
  let clockBg = 'bg-[#E8F8F5] text-[#10AC84] border-[#10AC84]';

  if (timeLeft <= 7) {
    barGradient = 'from-[#EE5253] to-[#FF6B6B] animate-pulse';
    barBorder = '#C0392B';
    clockBg = 'bg-[#FFEAEA] text-[#EE5253] border-[#EE5253] animate-bounce';
  } else if (timeLeft <= 15) {
    barGradient = 'from-[#FF9F43] to-[#FECA57]';
    barBorder = '#E67E22';
    clockBg = 'bg-[#FFF6E5] text-[#FF9F43] border-[#FF9F43]';
  }

  // Play tick sound when low on time
  useEffect(() => {
    if (!isPaused && timeLeft <= 5 && timeLeft > 0) {
      sound.playTick();
    }
  }, [timeLeft, isPaused]);

  return (
    <div className="w-full flex items-center gap-2.5 my-2">
      {/* Cute Clock Badge */}
      <div
        className={`flex items-center gap-1.5 px-3 py-1 rounded-2xl border-2 font-black text-sm shadow-xs ${clockBg}`}
      >
        <Clock className="w-4 h-4" />
        <span className="tabular-nums">{timeLeft}s</span>
      </div>

      {/* Progress Track */}
      <div className="relative flex-1 h-5 bg-white/80 rounded-full border-2 border-[#8A6248]/40 p-0.5 shadow-inner overflow-hidden">
        {/* Fill Bar */}
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${barGradient} shadow-xs`}
          style={{ width: `${percentage}%` }}
          animate={{ width: `${percentage}%` }}
          transition={{ ease: 'linear', duration: 0.3 }}
        />

        {/* 3-Star Benchmark Markers */}
        {/* 3 Stars marker at 18s (60%) */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white/80 z-10"
          style={{ left: '60%' }}
          title="3 ดาวเมื่อเหลือมากกว่า 18 วิ"
        />
        {/* 2 Stars marker at 8s (26.6%) */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white/80 z-10"
          style={{ left: '26.6%' }}
          title="2 ดาวเมื่อเหลือมากกว่า 8 วิ"
        />
      </div>

      {/* Star target preview indicator */}
      <div className="flex items-center text-xs font-bold text-[#8A6248] bg-white/80 px-2 py-1 rounded-xl border border-[#8A6248]/30">
        {timeLeft >= 18 ? '⭐️⭐️⭐️' : timeLeft >= 8 ? '⭐️⭐️' : '⭐️'}
      </div>
    </div>
  );
};
