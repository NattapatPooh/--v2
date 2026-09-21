import React from 'react';
import { motion } from 'motion/react';

interface WordSlotRendererProps {
  displayPattern: string;
  correctWord: string;
  userAnswers: Record<number, string>; // slotIndex -> selected character
  activeSlotIndex: number;
  onSlotClick: (slotIndex: number) => void;
  isWrongShake?: boolean;
  isCorrectCelebration?: boolean;
}

export interface ParsedSegment {
  type: 'fixed' | 'blank';
  text: string;           // The character or combination (e.g. "ต้", "ยำ", "กุ้")
  slotIndex?: number;     // Index of blank slot if type === 'blank'
  vowelAbove?: string;    // Any tone mark/vowel above attached to blank, e.g. "้", "ิ", "ั", "่", "๊", "์"
  vowelBelow?: string;    // Any vowel below attached to blank, e.g. "ุ", "ู"
  leadVowel?: string;     // Any leading vowel, e.g. "เ", "แ", "โ", "ใ", "ไ"
  targetChar?: string;    // The actual correct character for this slot
}

/**
 * Intelligent Thai Word Tokenizer that breaks displayPattern (with '_' placeholders)
 * into interactive tiles with perfectly anchored Thai vowels and tone marks.
 */
export function parseThaiDisplayPattern(displayPattern: string, correctWord: string): ParsedSegment[] {
  const segments: ParsedSegment[] = [];
  let blankCounter = 0;

  // Let's match tokens in displayPattern.
  // We can look at characters or clusters.
  const isUpperMark = (c: string) => /[\u0E31\u0E34-\u0E3A\u0E47-\u0E4E]/.test(c); // ั, ิ, ี, ึ, ื, ็, ่, ้, ๊, ๋, ์
  const isLowerMark = (c: string) => /[\u0E38\u0E39\u0E3A]/.test(c); // ุ, ู
  const isLeadVowel = (c: string) => /[\u0E40-\u0E44]/.test(c); // เ, แ, โ, ใ, ไ

  let i = 0;
  while (i < displayPattern.length) {
    const char = displayPattern[i];

    if (char === '_') {
      // Check if there are attached marks immediately following '_'
      let upper = '';
      let lower = '';
      let nextIdx = i + 1;
      while (nextIdx < displayPattern.length && (isUpperMark(displayPattern[nextIdx]) || isLowerMark(displayPattern[nextIdx]))) {
        if (isUpperMark(displayPattern[nextIdx])) {
          upper += displayPattern[nextIdx];
        } else if (isLowerMark(displayPattern[nextIdx])) {
          lower += displayPattern[nextIdx];
        }
        nextIdx++;
      }

      segments.push({
        type: 'blank',
        text: '_',
        slotIndex: blankCounter++,
        vowelAbove: upper,
        vowelBelow: lower,
      });

      i = nextIdx;
    } else {
      // Check if this is a leading vowel
      if (isLeadVowel(char)) {
        // Look ahead: does it lead to a blank '_' or a normal consonant?
        if (i + 1 < displayPattern.length && displayPattern[i + 1] === '_') {
          // Leading vowel before a blank!
          let nextIdx = i + 2;
          let upper = '';
          let lower = '';
          while (nextIdx < displayPattern.length && (isUpperMark(displayPattern[nextIdx]) || isLowerMark(displayPattern[nextIdx]))) {
            if (isUpperMark(displayPattern[nextIdx])) {
              upper += displayPattern[nextIdx];
            } else if (isLowerMark(displayPattern[nextIdx])) {
              lower += displayPattern[nextIdx];
            }
            nextIdx++;
          }
          segments.push({
            type: 'blank',
            text: '_',
            leadVowel: char,
            slotIndex: blankCounter++,
            vowelAbove: upper,
            vowelBelow: lower,
          });
          i = nextIdx;
          continue;
        }
      }

      // Collect fixed character and its attached marks
      let token = char;
      let nextIdx = i + 1;
      while (nextIdx < displayPattern.length && (isUpperMark(displayPattern[nextIdx]) || isLowerMark(displayPattern[nextIdx]))) {
        token += displayPattern[nextIdx];
        nextIdx++;
      }

      segments.push({
        type: 'fixed',
        text: token,
      });
      i = nextIdx;
    }
  }

  return segments;
}

export const WordSlotRenderer: React.FC<WordSlotRendererProps> = ({
  displayPattern,
  correctWord,
  userAnswers,
  activeSlotIndex,
  onSlotClick,
  isWrongShake = false,
  isCorrectCelebration = false,
}) => {
  const segments = React.useMemo(() => {
    return parseThaiDisplayPattern(displayPattern, correctWord);
  }, [displayPattern, correctWord]);

  return (
    <motion.div
      className="flex flex-wrap items-center justify-center gap-2 sm:gap-3.5 my-4 px-2 py-4 rounded-3xl bg-white/70 backdrop-blur-sm border-2 border-[#8A6248]/30 shadow-sm"
      animate={
        isWrongShake
          ? { x: [-12, 12, -10, 10, -5, 5, 0], transition: { duration: 0.45 } }
          : isCorrectCelebration
          ? { scale: [1, 1.05, 1], transition: { duration: 0.4 } }
          : {}
      }
    >
      {segments.map((seg, idx) => {
        if (seg.type === 'fixed') {
          // Fixed Letter Slot (Pastel Purple / Cream with warm border)
          return (
            <div
              key={`fixed-${idx}`}
              className="relative flex items-center justify-center min-w-[46px] sm:min-w-[58px] h-[58px] sm:h-[70px] px-2.5 rounded-2xl bg-gradient-to-b from-[#E7DCFC] to-[#CDB9F3] border-3 border-[#8A6248] shadow-[0_4px_0_#8A6248] select-none"
            >
              {/* Glossy top shine */}
              <div className="absolute top-1 left-2 right-2 h-2.5 bg-white/40 rounded-full pointer-events-none" />
              <span className="text-2xl sm:text-3xl font-bold text-[#341F97] drop-shadow-xs tracking-tight">
                {seg.text}
              </span>
            </div>
          );
        }

        // Blank Answer Slot
        const slotIdx = seg.slotIndex ?? 0;
        const filledValue = userAnswers[slotIdx];
        const isActive = activeSlotIndex === slotIdx;

        return (
          <motion.button
            key={`blank-${slotIdx}`}
            type="button"
            onClick={() => onSlotClick(slotIdx)}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            className={`relative flex flex-col items-center justify-center min-w-[52px] sm:min-w-[64px] h-[58px] sm:h-[70px] px-2.5 rounded-2xl border-3 transition-colors cursor-pointer select-none ${
              isActive
                ? 'bg-[#FFF275] border-[#E67E22] shadow-[0_4px_0_#D35400] ring-4 ring-[#FFEAA7]'
                : filledValue
                ? 'bg-gradient-to-b from-[#FFFDF0] to-[#FFE59A] border-[#8A6248] shadow-[0_4px_0_#8A6248]'
                : 'bg-[#FFF9EE] border-dashed border-[#F7B6C8] shadow-[0_4px_0_#E8A0B3]'
            }`}
          >
            {/* Glossy highlight */}
            <div className="absolute top-1 left-2 right-2 h-2.5 bg-white/50 rounded-full pointer-events-none" />

            {/* Active pointer arrow indicator */}
            {isActive && (
              <motion.div
                animate={{ y: [-4, 0, -4] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="absolute -top-6 text-base font-bold text-[#E67E22]"
              >
                ▼
              </motion.div>
            )}

            {/* Display compound glyph: LeadVowel + (Filled or Blank '_') + Upper/Lower Marks */}
            <div className="relative flex items-center justify-center text-2xl sm:text-3xl font-extrabold text-[#2C3E50] leading-none">
              {seg.leadVowel && (
                <span className="text-[#EE5253] mr-0.5">{seg.leadVowel}</span>
              )}

              <div className="relative inline-flex flex-col items-center justify-center">
                {/* Vowel or Tone mark above */}
                {seg.vowelAbove && (
                  <span className="absolute -top-4 text-xl sm:text-2xl font-bold text-[#EE5253] pointer-events-none">
                    {seg.vowelAbove}
                  </span>
                )}

                {/* Base Consonant / Filled Letter or Empty line */}
                {filledValue ? (
                  <span className="text-[#2C3E50] font-black">{filledValue}</span>
                ) : (
                  <span className="text-[#F78FB3] font-bold tracking-widest text-xl opacity-80">
                    __
                  </span>
                )}

                {/* Vowel below */}
                {seg.vowelBelow && (
                  <span className="absolute -bottom-4 text-xl sm:text-2xl font-bold text-[#EE5253] pointer-events-none">
                    {seg.vowelBelow}
                  </span>
                )}
              </div>
            </div>

            {/* Clear tap helper indicator on filled button */}
            {filledValue && (
              <span className="absolute -bottom-2 text-[9px] font-semibold text-[#8A6248] bg-white/90 px-1 rounded-full border border-[#8A6248]/30">
                แตะเพื่อลบ
              </span>
            )}
          </motion.button>
        );
      })}
    </motion.div>
  );
};
