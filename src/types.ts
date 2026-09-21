export interface LevelData {
  levelId: number;              // 1 to 20
  displayPattern: string;       // e.g. "ส้_โ_", "ข้_วผั_", "ต้_ยำกุ้_"
  correctWord: string;          // e.g. "ส้มโอ", "ข้าวผัด", "ต้มยำกุ้ง"
  choices: string[];            // 4 consonant options e.g. ["อ", "ม", "ส", "น"]
  hint: string;                 // e.g. "ผลไม้รสหวานอมเปรี้ยว มีกลีบเนื้อสีชมพูหรือขาว"
  meaning: string;              // Word definition for kids
  phoneticParts?: {
    text: string;
    isBlank: boolean;
    correctChar?: string;
    upperMark?: string;         // e.g. ้, ิ, ี, ั, ่, ๊, ๋, ์
    lowerMark?: string;         // e.g. ุ, ู
    leadVowel?: string;         // e.g. เ, แ, โ, ใ, ไ
  }[];
}

export interface CategoryData {
  id: string;
  categoryName: string;         // e.g. "อาหาร", "สัตว์", "สถานที่", "อาชีพ", "หลักภาษา", "มารยาท"
  englishName: string;         // e.g. "Food", "Animals", "Places", "Occupations", "Language", "Manners"
  icon: string;                 // Lucide icon name
  color: {
    primary: string;
    secondary: string;
    border: string;
    badge: string;
    gradient: string;
  };
  levels: LevelData[];
}

export interface WordDatabase {
  categories: CategoryData[];
}

export interface LevelProgress {
  stars: number;                // 0 to 3
  bestTime: number;             // seconds taken
  completed: boolean;
  attempts: number;
}

export interface GameProgress {
  categoryProgress: Record<string, Record<number, LevelProgress>>; // categoryId -> levelId -> LevelProgress
  totalScore: number;
  unlockedCategories: string[];
}
