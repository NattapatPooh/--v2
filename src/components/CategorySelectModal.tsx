import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Star, 
  Lock, 
  ArrowLeft, 
  CheckCircle2, 
  Utensils, 
  Cat, 
  MapPin, 
  Briefcase, 
  BookOpen, 
  HeartHandshake,
  Sparkles
} from 'lucide-react';
import { CategoryData, LevelProgress } from '../types';
import { wordDatabase } from '../data/wordDatabase';
import { sound } from '../utils/audio';

interface CategorySelectModalProps {
  onSelectLevel: (categoryId: string, levelId: number) => void;
  onClose: () => void;
  progress: Record<string, Record<number, LevelProgress>>;
  initialCategoryId?: string;
}

export const CategorySelectModal: React.FC<CategorySelectModalProps> = ({
  onSelectLevel,
  onClose,
  progress,
  initialCategoryId = 'food',
}) => {
  const [selectedCatId, setSelectedCatId] = useState<string>(initialCategoryId);

  const activeCategory = wordDatabase.categories.find((c) => c.id === selectedCatId) || wordDatabase.categories[0];

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Utensils': return <Utensils className="w-5 h-5" />;
      case 'Cat': return <Cat className="w-5 h-5" />;
      case 'MapPin': return <MapPin className="w-5 h-5" />;
      case 'Briefcase': return <Briefcase className="w-5 h-5" />;
      case 'BookOpen': return <BookOpen className="w-5 h-5" />;
      case 'HeartHandshake': return <HeartHandshake className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  const getCategoryTotalStars = (catId: string) => {
    const catProg: Record<number, LevelProgress> = progress[catId] || {};
    let total = 0;
    Object.values(catProg).forEach((p: LevelProgress) => {
      total += p.stars || 0;
    });
    return total;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-300">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-2xl h-[90vh] max-h-[720px] rounded-3xl bg-[#FFFDF7] border-4 border-[#8A6248] shadow-[0_12px_0_#5D3A1A] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#FF9F43] via-[#EE5253] to-[#FF9F43] border-b-3 border-[#8A6248] text-white shadow-sm flex-shrink-0">
          <button
            type="button"
            onClick={() => {
              sound.playPop();
              onClose();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white/20 hover:bg-white/30 border-2 border-white/50 font-bold text-xs sm:text-sm cursor-pointer active:scale-95 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>กลับ</span>
          </button>

          <h2 className="text-lg sm:text-xl font-black tracking-wide drop-shadow-sm">
            เลือกหมวดหมู่และด่าน
          </h2>

          <div className="w-16" />
        </div>

        {/* Categories Bar / Tabs */}
        <div className="flex gap-2 p-2.5 overflow-x-auto bg-[#FFF2D6] border-b-2 border-[#8A6248]/30 flex-shrink-0 scrollbar-thin">
          {wordDatabase.categories.map((cat: CategoryData) => {
            const isSelected = cat.id === selectedCatId;
            const starsEarned = getCategoryTotalStars(cat.id);
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  sound.playPop();
                  setSelectedCatId(cat.id);
                }}
                className={`flex items-center gap-2 px-3 py-2 rounded-2xl font-extrabold text-xs sm:text-sm border-2 transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-b from-[#FFFDF0] to-[#FFE59A] border-[#8A6248] shadow-[0_3px_0_#8A6248] text-[#5D3A1A] scale-105'
                    : 'bg-white/80 border-[#8A6248]/40 text-[#8A6248] hover:bg-white'
                }`}
              >
                <span>{getCategoryIcon(cat.icon)}</span>
                <span>{cat.categoryName}</span>
                <span className="flex items-center text-[11px] font-bold text-[#E67E22] bg-white/80 px-1.5 py-0.5 rounded-lg border border-[#E67E22]/30">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400 mr-0.5" />
                  {starsEarned}/60
                </span>
              </button>
            );
          })}
        </div>

        {/* Category Info Header Banner */}
        <div className="px-4 py-2 bg-[#FFF9EE] border-b border-[#8A6248]/20 flex items-center justify-between text-xs sm:text-sm font-semibold text-[#8A6248] flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: activeCategory.color.primary }} />
            <span className="font-extrabold text-[#5D3A1A] text-sm sm:text-base">
              หมวด {activeCategory.categoryName} ({activeCategory.englishName})
            </span>
          </div>
          <span className="text-xs font-bold text-[#10AC84]">
            มีทั้งหมด 20 ด่าน
          </span>
        </div>

        {/* Level Grid Map (1 - 20) */}
        <div className="flex-1 p-4 sm:p-5 overflow-y-auto bg-gradient-to-b from-[#FFFDF7] to-[#FFF6E5]">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCatId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-4 sm:grid-cols-5 gap-3 sm:gap-4"
            >
              {activeCategory.levels.map((level) => {
                const lvlProg = progress[selectedCatId]?.[level.levelId];
                const isCompleted = lvlProg?.completed || false;
                const stars = lvlProg?.stars || 0;

                // First level is always unlocked; subsequent levels are unlocked if previous is completed or default open
                const isUnlocked = level.levelId === 1 || isCompleted || (progress[selectedCatId]?.[level.levelId - 1]?.completed);

                return (
                  <motion.button
                    key={level.levelId}
                    type="button"
                    onClick={() => {
                      if (!isUnlocked) return;
                      sound.playPop();
                      onSelectLevel(selectedCatId, level.levelId);
                    }}
                    disabled={!isUnlocked}
                    whileHover={isUnlocked ? { scale: 1.08, y: -2 } : {}}
                    whileTap={isUnlocked ? { scale: 0.94 } : {}}
                    className={`relative flex flex-col items-center justify-center h-20 sm:h-24 rounded-2xl sm:rounded-3xl border-3 transition-all select-none ${
                      !isUnlocked
                        ? 'bg-gray-100 border-gray-300 opacity-60 cursor-not-allowed'
                        : isCompleted
                        ? 'bg-gradient-to-b from-[#EAFAF1] via-[#D5F5E3] to-[#ABEBC6] border-[#27AE60] shadow-[0_4px_0_#1E824C] cursor-pointer'
                        : 'bg-gradient-to-b from-[#FFFDF0] to-[#FFE59A] border-[#8A6248] shadow-[0_4px_0_#8A6248] cursor-pointer'
                    }`}
                  >
                    {/* Level Number */}
                    <div className="text-xl sm:text-2xl font-black text-[#5D3A1A]">
                      {level.levelId}
                    </div>

                    {/* Lock or Stars */}
                    {!isUnlocked ? (
                      <div className="mt-1 flex items-center text-gray-400">
                        <Lock className="w-4 h-4" />
                      </div>
                    ) : isCompleted ? (
                      <div className="flex items-center gap-0.5 mt-1">
                        {[1, 2, 3].map((s) => (
                          <Star
                            key={s}
                            className={`w-3.5 h-3.5 ${
                              s <= stars
                                ? 'fill-amber-400 text-amber-400'
                                : 'fill-gray-200 text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    ) : (
                      <span className="text-[11px] font-bold text-[#E67E22] mt-1 bg-white/70 px-1.5 py-0.2 rounded-md">
                        เริ่มเล่น
                      </span>
                    )}

                    {/* Completed Check icon */}
                    {isCompleted && (
                      <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#27AE60] text-white flex items-center justify-center shadow-xs border border-white">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </motion.button>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Summary */}
        <div className="p-3 bg-[#FFF2D6] border-t-2 border-[#8A6248]/30 flex items-center justify-center text-xs sm:text-sm font-bold text-[#8A6248] text-center">
          <span>🌟 สะสมดาวครบ 3 ดวงในแต่ละด่านเพื่อเป็นแชมป์สะกดคำ!</span>
        </div>
      </motion.div>
    </div>
  );
};
