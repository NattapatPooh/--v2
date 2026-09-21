import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Map, 
  BookOpen, 
  RotateCcw, 
  Lightbulb, 
  Volume2, 
  Check, 
  Sparkles,
  HelpCircle,
  Trophy,
  ArrowRight,
  Sparkle,
  Camera
} from 'lucide-react';
import { wordDatabase } from './data/wordDatabase';
import { LevelProgress } from './types';
import { sound } from './utils/audio';
import { MainMenuBackground, GameplayBackground } from './components/ThaiIllustrations';
import { WordSlotRenderer, parseThaiDisplayPattern } from './components/WordSlotRenderer';
import { ChoiceButton } from './components/ChoiceButton';
import { TimerBar } from './components/TimerBar';
import { ResultModal } from './components/ResultModal';
import { GameOverModal } from './components/GameOverModal';
import { CategorySelectModal } from './components/CategorySelectModal';
import { ThaiPatternHeader } from './components/ThaiPatternHeader';
import { ThaiTropicalHomeMenu } from './components/ThaiTropicalHomeMenu';
import { RealWordPhotoCard } from './components/RealWordPhotoCard';
import { LoginScreen } from './components/LoginScreen';
import { KodakThaiGameplayScreen } from './components/KodakThaiGameplayScreen';
import { BubbleTransitionOverlay } from './components/BubbleTransitionOverlay';

const STORAGE_KEY = 'thai_word_game_p3_progress_v1';
const PLAYER_STORAGE_KEY = 'thai_word_game_player_v1';
const TIMER_SECONDS = 30;

export default function App() {
  // Player state: { fullName, nickname }
  const [player, setPlayer] = useState<{ fullName: string; nickname: string } | null>(() => {
    try {
      const saved = localStorage.getItem(PLAYER_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return null;
  });

  // Screen state: 'login' | 'menu' | 'playing'
  const [screen, setScreen] = useState<'login' | 'menu' | 'playing'>('login');

  // Game state
  const [currentCategoryId, setCurrentCategoryId] = useState<string>('food');
  const [currentLevelId, setCurrentLevelId] = useState<number>(1);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [activeSlotIndex, setActiveSlotIndex] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(TIMER_SECONDS);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const [isWrongShake, setIsWrongShake] = useState<boolean>(false);
  const [isCorrectCelebration, setIsCorrectCelebration] = useState<boolean>(false);

  // Modals
  const [showResultModal, setShowResultModal] = useState<boolean>(false);
  const [showGameOverModal, setShowGameOverModal] = useState<boolean>(false);
  const [gameOverReason, setGameOverReason] = useState<'timeout' | 'wrong'>('wrong');
  const [showCategoryModal, setShowCategoryModal] = useState<boolean>(false);
  const [showHintCard, setShowHintCard] = useState<boolean>(false);
  const [earnedStars, setEarnedStars] = useState<number>(3);
  const [timeSpent, setTimeSpent] = useState<number>(0);

  // Cute Bouncing Bubble Transition Scene State (Level enter & Win/Loss/Home exit transitions)
  const [bubbleTransition, setBubbleTransition] = useState<{
    show: boolean;
    title: string;
  }>({
    show: false,
    title: 'เย้! ป๊อบบับเบิ้ล~ ✨',
  });
  const transitionActionRef = useRef<(() => void) | null>(null);

  const triggerBubbleTransition = useCallback((title: string, action: () => void) => {
    transitionActionRef.current = action;
    setBubbleTransition({
      show: true,
      title,
    });

    // Mid-transition handoff at 320ms while screen is enveloped in cute bouncing bubbles
    setTimeout(() => {
      if (transitionActionRef.current) {
        transitionActionRef.current();
        transitionActionRef.current = null;
      }
    }, 320);
  }, []);

  const handleBubbleFinished = useCallback(() => {
    setBubbleTransition((prev) => ({ ...prev, show: false }));
  }, []);

  // Sound settings (BGM and Sound EFX are completely separated)
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => sound.isSoundEnabled());
  const [bgmEnabled, setBgmEnabled] = useState<boolean>(() => sound.isBgmEnabled());

  // Ensure BGM plays smoothly when enabled across screens and initial load
  useEffect(() => {
    if (bgmEnabled) {
      sound.playBGM();
    } else {
      sound.pauseBGM();
    }
  }, [bgmEnabled, screen]);

  // Progress: categoryId -> levelId -> LevelProgress
  const [progress, setProgress] = useState<Record<string, Record<number, LevelProgress>>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return {
      food: { 1: { stars: 0, bestTime: 0, completed: false, attempts: 0 } },
    };
  });

  // Save progress
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // ignore
    }
  }, [progress]);

  // Current category and level objects
  const currentCategory = useMemo(() => {
    return wordDatabase.categories.find((c) => c.id === currentCategoryId) || wordDatabase.categories[0];
  }, [currentCategoryId]);

  const currentLevel = useMemo(() => {
    return (
      currentCategory.levels.find((l) => l.levelId === currentLevelId) ||
      currentCategory.levels[0]
    );
  }, [currentCategory, currentLevelId]);

  // Blank slots list for current level
  const blankSegments = useMemo(() => {
    const segments = parseThaiDisplayPattern(currentLevel.displayPattern, currentLevel.correctWord);
    return segments.filter((s) => s.type === 'blank');
  }, [currentLevel]);

  // Total stars calculated
  const totalStars = useMemo(() => {
    let count = 0;
    Object.values(progress).forEach((catMap) => {
      Object.values(catMap).forEach((lvl) => {
        count += lvl.stars || 0;
      });
    });
    return count;
  }, [progress]);

  // Start or reset a level
  const loadLevel = useCallback((categoryId: string, levelId: number) => {
    setCurrentCategoryId(categoryId);
    setCurrentLevelId(levelId);
    setUserAnswers({});
    setActiveSlotIndex(0);
    setTimeLeft(TIMER_SECONDS);
    setIsTimerActive(true);
    setIsWrongShake(false);
    setIsCorrectCelebration(false);
    setShowResultModal(false);
    setShowGameOverModal(false);
    setShowHintCard(false);
    setScreen('playing');
  }, []);

  // 30-Second Countdown Timer Effect
  useEffect(() => {
    if (screen !== 'playing' || !isTimerActive || showResultModal || showGameOverModal) {
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsTimerActive(false);
          setGameOverReason('timeout');
          setShowGameOverModal(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [screen, isTimerActive, showResultModal, showGameOverModal]);

  // Construct assembled word from user's answers and check correctness
  const assembledWordResult = useMemo(() => {
    const segments = parseThaiDisplayPattern(currentLevel.displayPattern, currentLevel.correctWord);
    let assembled = '';
    let isAllFilled = true;

    for (const seg of segments) {
      if (seg.type === 'fixed') {
        assembled += seg.text;
      } else {
        const slotIdx = seg.slotIndex ?? 0;
        const char = userAnswers[slotIdx];
        if (!char) {
          isAllFilled = false;
          break;
        }
        if (seg.leadVowel) {
          assembled += seg.leadVowel;
        }
        assembled += char;
        if (seg.vowelAbove) {
          assembled += seg.vowelAbove;
        }
        if (seg.vowelBelow) {
          assembled += seg.vowelBelow;
        }
      }
    }

    return { assembled, isAllFilled };
  }, [currentLevel, userAnswers]);

  // Check answer function
  const checkAnswer = useCallback((currentAnswers: Record<number, string>) => {
    const segments = parseThaiDisplayPattern(currentLevel.displayPattern, currentLevel.correctWord);
    let assembled = '';
    let isAllFilled = true;

    for (const seg of segments) {
      if (seg.type === 'fixed') {
        assembled += seg.text;
      } else {
        const slotIdx = seg.slotIndex ?? 0;
        const char = currentAnswers[slotIdx];
        if (!char) {
          isAllFilled = false;
          break;
        }
        if (seg.leadVowel) {
          assembled += seg.leadVowel;
        }
        assembled += char;
        if (seg.vowelAbove) {
          assembled += seg.vowelAbove;
        }
        if (seg.vowelBelow) {
          assembled += seg.vowelBelow;
        }
      }
    }

    if (!isAllFilled) return;

    const normalizedAssembled = assembled.trim();
    const normalizedCorrect = currentLevel.correctWord.trim();

    if (normalizedAssembled === normalizedCorrect) {
      // Correct!
      setIsTimerActive(false);
      setIsCorrectCelebration(true);
      const secondsUsed = TIMER_SECONDS - timeLeft;
      setTimeSpent(secondsUsed);

      // Star calculation based on countdown timer (30-second countdown to 0):
      // 3 ดาว: เวลานับถอยหลังตั้งแต่ 30 ถึง 15 วินาที (timeLeft >= 15)
      // 2 ดาว: เวลานับถอยหลังตั้งแต่ 15 ถึง 5 วินาที (timeLeft >= 5 && timeLeft < 15)
      // 1 ดาว: เวลานับถอยหลังตั้งแต่ 5 ถึง 1 วินาที (timeLeft < 5)
      let stars = 1;
      if (timeLeft >= 15) {
        stars = 3;
      } else if (timeLeft >= 5) {
        stars = 2;
      } else {
        stars = 1;
      }
      setEarnedStars(stars);

      // Update progress in state & storage
      setProgress((prev) => {
        const catMap = prev[currentCategoryId] || {};
        const oldLvl = catMap[currentLevelId] || { stars: 0, bestTime: 999, completed: false, attempts: 0 };
        return {
          ...prev,
          [currentCategoryId]: {
            ...catMap,
            [currentLevelId]: {
              stars: Math.max(oldLvl.stars, stars),
              bestTime: Math.min(oldLvl.bestTime || 999, secondsUsed),
              completed: true,
              attempts: oldLvl.attempts + 1,
            },
          },
        };
      });

      setTimeout(() => {
        setShowResultModal(true);
      }, 450);
    } else {
      // Wrong answer!
      setIsWrongShake(true);
      setTimeout(() => {
        setIsWrongShake(false);
        setIsTimerActive(false);
        setGameOverReason('wrong');
        setShowGameOverModal(true);
      }, 550);
    }
  }, [currentLevel, currentCategoryId, currentLevelId, timeLeft]);

  // Handle letter choice click
  const handleChoiceClick = (char: string) => {
    // Fill the active slot with char
    const newAnswers = {
      ...userAnswers,
      [activeSlotIndex]: char,
    };
    setUserAnswers(newAnswers);

    // Auto-advance to next empty slot if available
    const totalBlanks = blankSegments.length;
    let nextEmpty = -1;
    for (let i = 0; i < totalBlanks; i++) {
      if (!newAnswers[i] && i !== activeSlotIndex) {
        nextEmpty = i;
        break;
      }
    }

    if (nextEmpty !== -1) {
      setActiveSlotIndex(nextEmpty);
    }

    // If all blank slots are now filled, check answer automatically!
    const filledCount = Object.keys(newAnswers).filter((k) => !!newAnswers[Number(k)]).length;
    if (filledCount >= totalBlanks) {
      checkAnswer(newAnswers);
    }
  };

  // Handle slot tap (select as active or clear if tapped again)
  const handleSlotClick = (slotIdx: number) => {
    sound.playPop();
    if (userAnswers[slotIdx]) {
      // Clear this slot
      const newAnswers = { ...userAnswers };
      delete newAnswers[slotIdx];
      setUserAnswers(newAnswers);
    }
    setActiveSlotIndex(slotIdx);
  };

  // Sound EFX toggle (does NOT affect background music)
  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sound.setSoundEnabled(next);
    if (next) {
      sound.playPop();
    }
  };

  // Background Music (BGM) toggle (does NOT affect sound effects)
  const handleToggleBgm = () => {
    const next = !bgmEnabled;
    setBgmEnabled(next);
    sound.setBgmEnabled(next);
    if (soundEnabled) {
      sound.playPop();
    }
  };

  // Next level navigation
  const handleNextLevel = () => {
    if (currentLevelId < currentCategory.levels.length) {
      loadLevel(currentCategoryId, currentLevelId + 1);
    } else {
      // Completed all 20 levels in this category!
      const catIdx = wordDatabase.categories.findIndex((c) => c.id === currentCategoryId);
      if (catIdx !== -1 && catIdx + 1 < wordDatabase.categories.length) {
        loadLevel(wordDatabase.categories[catIdx + 1].id, 1);
      } else {
        setShowCategoryModal(true);
        setShowResultModal(false);
      }
    }
  };

  const hasNextLevel = currentLevelId < currentCategory.levels.length;

  const handleLoginSubmit = (playerInfo: { fullName: string; nickname: string }) => {
    setPlayer(playerInfo);
    try {
      localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(playerInfo));
    } catch {
      // ignore
    }
    if (bgmEnabled) {
      sound.playBGM();
    }
    setScreen('menu');
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden font-['Kanit',sans-serif] bg-[#BFE8F5] text-[#2C3E50]">
      {screen === 'login' ? (
        /* =================== AUTHENTIC LOGIN SCREEN (MATCHING USER MOCKUP) =================== */
        <LoginScreen
          onStartGame={handleLoginSubmit}
          soundEnabled={soundEnabled}
          onToggleSound={handleToggleSound}
          bgmEnabled={bgmEnabled}
          onToggleBgm={handleToggleBgm}
          initialPlayer={player || undefined}
        />
      ) : screen === 'menu' ? (
        /* =================== TROPICAL MAIN MENU SCREEN =================== */
        <ThaiTropicalHomeMenu
          onStartGame={() => setShowCategoryModal(true)}
          soundEnabled={soundEnabled}
          onToggleSound={handleToggleSound}
          bgmEnabled={bgmEnabled}
          onToggleBgm={handleToggleBgm}
          player={player}
          onSwitchPlayer={() => setScreen('login')}
        />
      ) : (
        /* =================== AUTHENTIC KODAK THAI THEME GAMEPLAY SCREEN (ALL CATEGORIES & LEVELS) =================== */
        <KodakThaiGameplayScreen
          currentCategory={currentCategory}
          currentLevel={currentLevel}
          userAnswers={userAnswers}
          activeSlotIndex={activeSlotIndex}
          onSlotClick={handleSlotClick}
          onChoiceClick={handleChoiceClick}
          onClearAnswers={() => {
            setUserAnswers({});
            setActiveSlotIndex(0);
          }}
          onGoHome={() => {
            triggerBubbleTransition('กำลังกลับสู่หน้าหลัก~ 🏠', () => {
              setScreen('menu');
            });
          }}
          timeLeft={timeLeft}
          maxTime={TIMER_SECONDS}
          isWrongShake={isWrongShake}
          isCorrectCelebration={isCorrectCelebration}
          soundEnabled={soundEnabled}
          onToggleSound={handleToggleSound}
          bgmEnabled={bgmEnabled}
          onToggleBgm={handleToggleBgm}
        />
      )}

      {/* Result Modal: 1-3 Stars Reward with Next, Replay, Exit, and Vocab Library buttons */}
      {showResultModal && (
        <ResultModal
          level={currentLevel}
          category={currentCategory}
          stars={earnedStars}
          timeSpent={timeSpent}
          timeLeft={timeLeft}
          onNextLevel={() => {
            triggerBubbleTransition('ไปด่านต่อไปกันเลย! 🫧✨', () => {
              handleNextLevel();
            });
          }}
          onReplay={() => {
            triggerBubbleTransition('เล่นด่านนี้อีกรอบ! 🔄', () => {
              loadLevel(currentCategoryId, currentLevelId);
            });
          }}
          onBackToMenu={() => {
            triggerBubbleTransition('ออกจากด่าน กลับสู่หน้าเลือกด่าน~ 🫧', () => {
              setShowResultModal(false);
              setShowCategoryModal(true);
            });
          }}
          hasNextLevel={hasNextLevel}
        />
      )}

      {/* Game Over / Try Again Modal on Wrong answer or 30-sec Timeout with Exit button */}
      {showGameOverModal && (
        <GameOverModal
          level={currentLevel}
          category={currentCategory}
          reason={gameOverReason}
          assembledWord={assembledWordResult.assembled}
          onRetry={() => {
            triggerBubbleTransition('เริ่มเล่นใหม่ สู้ๆ! 💪🫧', () => {
              loadLevel(currentCategoryId, currentLevelId);
            });
          }}
          onBackToMenu={() => {
            triggerBubbleTransition('ออกจากด่าน กลับสู่หน้าเลือกด่าน~ 🫧', () => {
              setShowGameOverModal(false);
              setShowCategoryModal(true);
            });
          }}
        />
      )}

      {/* 6-Category & 120-Level Selection Modal */}
      {showCategoryModal && (
        <CategorySelectModal
          progress={progress}
          initialCategoryId={currentCategoryId}
          onSelectLevel={(catId, lvlId) => {
            const catObj = wordDatabase.categories.find((c) => c.id === catId);
            setShowCategoryModal(false);
            triggerBubbleTransition(`เข้าสู่หมวด${catObj?.categoryName || ''} ด่าน ${lvlId} 🫧`, () => {
              loadLevel(catId, lvlId);
            });
          }}
          onClose={() => setShowCategoryModal(false)}
        />
      )}

      {/* Cute Bouncing Bubble Scene Transition Overlay */}
      <BubbleTransitionOverlay
        show={bubbleTransition.show}
        title={bubbleTransition.title}
        onFinished={handleBubbleFinished}
      />
    </div>
  );
}
