import React from 'react';

/**
 * 1. Main Menu Landscape Background
 * Flat 2D vector Thai countryside, pastel blue sky, coconut trees, sandy beach, cute traditional wooden boat, warm sun.
 */
export const MainMenuBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      <svg
        className="w-full h-full object-cover"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#BFE8F5" />
            <stop offset="60%" stopColor="#DDF4FC" />
            <stop offset="100%" stopColor="#FFF6DD" />
          </linearGradient>
          <linearGradient id="seaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7CD1E8" />
            <stop offset="100%" stopColor="#48B4D4" />
          </linearGradient>
          <linearGradient id="sandGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFEAA7" />
            <stop offset="100%" stopColor="#FDCB6E" />
          </linearGradient>
          <linearGradient id="sunGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF275" />
            <stop offset="100%" stopColor="#FFA502" />
          </linearGradient>
          <linearGradient id="goldRoof" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F9CA24" />
            <stop offset="100%" stopColor="#E056FD" />
          </linearGradient>
        </defs>

        {/* Sky */}
        <rect width="1200" height="800" fill="url(#skyGrad)" />

        {/* Sun Rays and Glowing Sun */}
        <g opacity="0.45">
          <circle cx="1000" cy="180" r="140" fill="#FFF8C9" />
          <circle cx="1000" cy="180" r="100" fill="#FFF275" />
        </g>
        <circle cx="1000" cy="180" r="60" fill="url(#sunGrad)" />

        {/* Distant Mountains / Hills */}
        <path
          d="M0,520 Q180,420 380,480 T800,450 T1200,480 L1200,800 L0,800 Z"
          fill="#A8E6CF"
          opacity="0.55"
        />
        <path
          d="M0,550 Q250,470 520,530 T1050,490 T1200,530 L1200,800 L0,800 Z"
          fill="#88D8B0"
          opacity="0.65"
        />

        {/* Distant Thai Temple Spire silhouette */}
        <g transform="translate(720, 390) scale(0.65)">
          <path d="M50,0 L60,40 L75,70 L25,70 L40,40 Z" fill="#F6B93B" />
          <rect x="35" y="70" width="30" height="40" fill="#FA8231" rx="4" />
          <polygon points="50,0 45,20 55,20" fill="#FFF" />
          {/* Temple Tiered Roofs */}
          <path d="M10,110 L90,110 L80,90 L20,90 Z" fill="#EB3B5A" />
          <path d="M0,135 L100,135 L90,110 L10,110 Z" fill="#FA8231" />
          <rect x="15" y="135" width="70" height="45" fill="#FFF" rx="3" />
          {/* Windows */}
          <rect x="25" y="145" width="12" height="20" rx="6" fill="#F6B93B" />
          <rect x="63" y="145" width="12" height="20" rx="6" fill="#F6B93B" />
        </g>

        {/* Fluffy Floating Clouds */}
        <g fill="#FFFFFF" opacity="0.85">
          {/* Cloud 1 */}
          <path d="M120,160 a30,30 0 0,1 50,-10 a40,40 0 0,1 70,10 a30,30 0 0,1 20,30 a30,30 0 0,1 -30,30 l-90,0 a30,30 0 0,1 -20,-60 z" />
          {/* Cloud 2 */}
          <path d="M520,110 a25,25 0 0,1 40,-10 a35,35 0 0,1 60,10 a25,25 0 0,1 15,25 a25,25 0 0,1 -25,25 l-75,0 a25,25 0 0,1 -15,-50 z" opacity="0.9" />
          {/* Cloud 3 */}
          <path d="M840,240 a20,20 0 0,1 35,-8 a28,28 0 0,1 45,8 a20,20 0 0,1 15,20 a20,20 0 0,1 -20,20 l-60,0 a20,20 0 0,1 -15,-40 z" opacity="0.8" />
        </g>

        {/* Sea / Water Area */}
        <path
          d="M0,600 C300,580 600,620 1200,590 L1200,800 L0,800 Z"
          fill="url(#seaGrad)"
        />

        {/* Gentle Waves */}
        <path
          d="M0,625 C200,615 400,635 600,620 C800,605 1000,630 1200,615 L1200,630 C1000,645 800,620 600,635 C400,650 200,630 0,640 Z"
          fill="#FFFFFF"
          opacity="0.45"
        />

        {/* Sandy Beach Shore */}
        <path
          d="M0,670 C350,640 700,710 1200,660 L1200,800 L0,800 Z"
          fill="url(#sandGrad)"
        />
        <path
          d="M0,720 C400,690 800,750 1200,710 L1200,800 L0,800 Z"
          fill="#E5B95F"
          opacity="0.3"
        />

        {/* Cute Traditional Wooden Boat near shore (เรือหางยาว/เรือไม้ไทย) */}
        <g transform="translate(680, 600) scale(0.95)">
          {/* Water reflection */}
          <ellipse cx="100" cy="80" rx="90" ry="12" fill="#3AA8C1" opacity="0.4" />
          {/* Boat hull */}
          <path
            d="M10,65 Q80,90 190,65 Q170,85 100,85 Q30,85 10,65 Z"
            fill="#8A5026"
          />
          {/* Boat inner & rim */}
          <path
            d="M10,65 Q80,75 190,65 Q180,60 100,62 Q20,60 10,65 Z"
            fill="#D38345"
          />
          {/* Traditional colorful cloth ribbons on bow (ผ้าแพร 3 สีหัวเรือ) */}
          <path d="M185,63 L205,52 L200,48 L180,60 Z" fill="#EE5253" />
          <path d="M188,65 L208,56 L204,53 L184,62 Z" fill="#10AC84" />
          <path d="M191,67 L211,60 L208,57 L187,64 Z" fill="#FECA57" />
          {/* Wooden Oar */}
          <line x1="80" y1="40" x2="130" y2="85" stroke="#573318" strokeWidth="4" strokeLinecap="round" />
          <ellipse cx="135" cy="90" rx="10" ry="5" fill="#8A5026" />
        </g>

        {/* Gentle Coconut Trees on Left Beach */}
        <g transform="translate(40, 360)">
          {/* Trunk 1 */}
          <path
            d="M80,380 Q95,250 130,120 Q122,250 105,380 Z"
            fill="#8E583E"
          />
          {/* Rings */}
          <path d="M90,320 Q105,325 112,320" stroke="#6F422D" strokeWidth="3" fill="none" />
          <path d="M96,260 Q110,265 118,260" stroke="#6F422D" strokeWidth="3" fill="none" />
          <path d="M106,200 Q120,205 125,200" stroke="#6F422D" strokeWidth="3" fill="none" />
          {/* Coconuts */}
          <circle cx="125" cy="120" r="10" fill="#71802E" />
          <circle cx="138" cy="125" r="9" fill="#5D6B24" />
          {/* Palm Leaves */}
          <path d="M130,115 Q170,80 220,110 Q170,105 130,115 Z" fill="#2ED573" />
          <path d="M130,115 Q150,50 190,40 Q155,75 130,115 Z" fill="#26AF5F" />
          <path d="M130,115 Q100,50 60,70 Q95,85 130,115 Z" fill="#2ED573" />
          <path d="M130,115 Q70,90 30,130 Q80,120 130,115 Z" fill="#1E824C" />
          <path d="M130,115 Q110,130 90,170 Q115,140 130,115 Z" fill="#2ED573" />
          <path d="M130,115 Q160,130 180,170 Q155,140 130,115 Z" fill="#1E824C" />

          {/* Trunk 2 (Smaller, leaning) */}
          <path
            d="M30,380 Q45,280 20,190 Q30,280 48,380 Z"
            fill="#7B4A34"
          />
          {/* Leaves for tree 2 */}
          <g transform="translate(20, 190)">
            <path d="M0,0 Q40,-30 80,0 Q40,-10 0,0 Z" fill="#2ED573" />
            <path d="M0,0 Q10,-50 40,-60 Q15,-30 0,0 Z" fill="#1E824C" />
            <path d="M0,0 Q-30,-40 -60,-20 Q-30,-15 0,0 Z" fill="#2ED573" />
            <path d="M0,0 Q-40,10 -70,30 Q-35,15 0,0 Z" fill="#1E824C" />
          </g>
        </g>

        {/* Small cute Starfish and Shells on Beach */}
        <g transform="translate(420, 720) scale(0.6)">
          <path
            d="M30,0 L36,18 L55,20 L40,32 L45,50 L30,39 L15,50 L20,32 L5,20 L24,18 Z"
            fill="#FF6B6B"
            stroke="#D63031"
            strokeWidth="2"
          />
        </g>
        <g transform="translate(260, 740) scale(0.5)">
          <path
            d="M0,20 Q15,0 30,20 Q15,10 0,20 Z"
            fill="#FFEAA7"
            stroke="#FDCB6E"
            strokeWidth="2"
          />
        </g>
      </svg>
    </div>
  );
};

/**
 * 2. Result Scene Illustration
 * Featuring:
 * - 3 cute little baby elephants (ช้างน้อย 3 ตัว) with decorative Thai headdresses/flowers & cheerful poses
 * - Golden Grand Thai Temple (วัดใหญ่สีทองอร่าม) in community backdrop
 * - Smiling Monk (พระสงฆ์ยิ้มเมตตา), Thai school kids/community villagers
 * - Bodhi trees, lotus pond, floating lanterns, cheerful sunshine
 */
export const ThaiCommunityResultScene: React.FC<{ stars: number }> = ({ stars }) => {
  return (
    <div className="relative w-full h-56 sm:h-64 rounded-3xl overflow-hidden shadow-inner border-4 border-[#F6B93B]/40 bg-gradient-to-b from-[#BFE8F5] via-[#DFF4FC] to-[#FFF6DD]">
      <svg
        className="w-full h-full object-cover"
        viewBox="0 0 900 450"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="templeGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF275" />
            <stop offset="50%" stopColor="#F9CA24" />
            <stop offset="100%" stopColor="#F0932B" />
          </linearGradient>
          <linearGradient id="monkRobe" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FF9F43" />
            <stop offset="100%" stopColor="#E67E22" />
          </linearGradient>
          <linearGradient id="elephantSkin" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#A4B0BE" />
            <stop offset="100%" stopColor="#747D8C" />
          </linearGradient>
        </defs>

        {/* Sky with light sparkles */}
        <rect width="900" height="450" fill="#BFE8F5" />
        <circle cx="450" cy="100" r="280" fill="#FFF9D2" opacity="0.4" />
        <circle cx="450" cy="100" r="180" fill="#FFE59A" opacity="0.5" />

        {/* Golden Sun */}
        <circle cx="450" cy="90" r="45" fill="url(#templeGold)" />

        {/* Fluffy clouds */}
        <g fill="#FFFFFF" opacity="0.9">
          <path d="M80,70 a20,20 0 0,1 30,-8 a26,26 0 0,1 45,8 a20,20 0 0,1 15,18 l-95,0 z" />
          <path d="M720,60 a22,22 0 0,1 35,-9 a30,30 0 0,1 50,9 a22,22 0 0,1 18,20 l-110,0 z" />
        </g>

        {/* Grand Thai Temple (วัดใหญ่ชุมชน) in the center background */}
        <g transform="translate(320, 80) scale(0.9)">
          {/* Main Pagoda / Chedi Spire */}
          <path d="M145,-20 L155,60 L180,120 L120,120 L140,60 Z" fill="url(#templeGold)" stroke="#D48806" strokeWidth="2" />
          <polygon points="150,-25 145,-10 155,-10" fill="#FFF" />
          {/* Tiered Temple Roofs */}
          <path d="M60,170 Q150,130 240,170 L225,145 Q150,115 75,145 Z" fill="#EB3B5A" stroke="#C0392B" strokeWidth="2" />
          <path d="M40,200 Q150,160 260,200 L245,175 Q150,145 55,175 Z" fill="#FA8231" stroke="#D35400" strokeWidth="2" />
          <path d="M20,230 Q150,190 280,230 L265,205 Q150,175 35,205 Z" fill="#EB3B5A" stroke="#C0392B" strokeWidth="2" />
          {/* Golden Gable End / ช่อฟ้า ใบระกา */}
          <path d="M25,230 Q15,200 8,190 Q20,210 35,225 Z" fill="#F9CA24" />
          <path d="M275,230 Q285,200 292,190 Q280,210 265,225 Z" fill="#F9CA24" />
          {/* Temple Sanctuary Hall */}
          <rect x="50" y="230" width="200" height="90" fill="#FFFFFF" stroke="#E0E0E0" strokeWidth="2" rx="4" />
          {/* Columns */}
          <rect x="70" y="235" width="16" height="85" fill="#F9CA24" rx="2" />
          <rect x="110" y="235" width="16" height="85" fill="#F9CA24" rx="2" />
          <rect x="174" y="235" width="16" height="85" fill="#F9CA24" rx="2" />
          <rect x="214" y="235" width="16" height="85" fill="#F9CA24" rx="2" />
          {/* Golden Arched Door */}
          <path d="M135,320 L135,260 Q150,245 165,260 L165,320 Z" fill="#B33939" stroke="#F9CA24" strokeWidth="3" />
        </g>

        {/* Lush Greenery Hills & Bodhi Tree */}
        <path d="M0,280 Q250,220 500,270 T900,260 L900,450 L0,450 Z" fill="#78E08F" />
        <path d="M0,320 Q400,270 900,310 L900,450 L0,450 Z" fill="#38ADA9" opacity="0.35" />

        {/* Bodhi Tree on Right */}
        <g transform="translate(730, 160)">
          <path d="M70,220 Q85,140 60,60 Q95,140 90,220 Z" fill="#6F422D" />
          {/* Crown Leaves */}
          <circle cx="60" cy="50" r="55" fill="#2ED573" />
          <circle cx="100" cy="65" r="45" fill="#10AC84" />
          <circle cx="30" cy="70" r="40" fill="#26AF5F" />
          <circle cx="65" cy="20" r="35" fill="#7BED9F" />
        </g>

        {/* Bodhi Tree on Left */}
        <g transform="translate(40, 170)">
          <path d="M60,210 Q45,130 65,50 Q40,130 40,210 Z" fill="#6F422D" />
          <circle cx="60" cy="45" r="50" fill="#2ED573" />
          <circle cx="20" cy="65" r="40" fill="#10AC84" />
          <circle cx="95" cy="65" r="42" fill="#26AF5F" />
        </g>

        {/* Peaceful Monk (พระสงฆ์ยิ้มเมตตา) on the left side */}
        <g transform="translate(180, 240) scale(0.85)">
          {/* Aura */}
          <circle cx="45" cy="40" r="28" fill="#FFF275" opacity="0.6" />
          {/* Head (Shaved head) */}
          <circle cx="45" cy="40" r="20" fill="#FFDFC4" stroke="#E0AC69" strokeWidth="1.5" />
          {/* Friendly face */}
          <circle cx="39" cy="38" r="2" fill="#2C3E50" />
          <circle cx="51" cy="38" r="2" fill="#2C3E50" />
          <path d="M40,46 Q45,51 50,46" stroke="#C0392B" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Ears with long lobes */}
          <path d="M23,38 Q22,46 25,48" stroke="#E0AC69" strokeWidth="2" fill="none" />
          <path d="M67,38 Q68,46 65,48" stroke="#E0AC69" strokeWidth="2" fill="none" />
          {/* Saffron Robe (จีวรสีส้มสง่างาม) */}
          <path d="M25,60 Q45,55 65,60 L75,140 L15,140 Z" fill="url(#monkRobe)" stroke="#D35400" strokeWidth="2" />
          {/* Robe fold sash (สังฆาฏิ) */}
          <path d="M25,60 L45,140 L55,140 L35,60 Z" fill="#D35400" opacity="0.6" />
          {/* Alms Bowl (บาตรพระ) */}
          <ellipse cx="45" cy="95" rx="14" ry="11" fill="#2C3E50" stroke="#7F8C8D" strokeWidth="2" />
          <path d="M31,95 Q45,115 59,95" fill="#34495E" />
        </g>

        {/* Happy Thai School Children (เด็กนักเรียนไทยพนมมือไหว้) on the right side */}
        <g transform="translate(640, 255) scale(0.85)">
          {/* Girl in Thai uniform / costume */}
          {/* Head & cute twin buns */}
          <circle cx="20" cy="18" r="10" fill="#2C3E50" />
          <circle cx="50" cy="18" r="10" fill="#2C3E50" />
          <circle cx="35" cy="28" r="18" fill="#FFDFC4" stroke="#E0AC69" strokeWidth="1.5" />
          {/* Eyes & Smile */}
          <circle cx="29" cy="26" r="2" fill="#2C3E50" />
          <circle cx="41" cy="26" r="2" fill="#2C3E50" />
          <path d="M30,34 Q35,38 40,34" stroke="#EE5253" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Pink blush */}
          <circle cx="26" cy="31" r="3" fill="#FF8080" opacity="0.6" />
          <circle cx="44" cy="31" r="3" fill="#FF8080" opacity="0.6" />
          {/* Thai Traditional Sabai / Shirt */}
          <path d="M20,46 Q35,42 50,46 L55,100 L15,100 Z" fill="#F78FB3" stroke="#E77F67" strokeWidth="2" />
          {/* Wai hands (พนมมือ) */}
          <polygon points="35,50 31,68 39,68" fill="#FFDFC4" stroke="#E0AC69" strokeWidth="1" />
          {/* Sarong (ผ้านุ่งโจงกระเบน) */}
          <path d="M15,100 Q35,95 55,100 L58,135 Q35,145 12,135 Z" fill="#786FA6" />
        </g>

        {/* 3 CUTE LITTLE BABY ELEPHANTS (รูปช้างน้อย 3 ตัว) in the foreground! */}
        {/* Baby Elephant 1 (Left - Cheerful Waving Trunk) */}
        <g transform="translate(260, 275) scale(0.88)">
          {/* Shadow */}
          <ellipse cx="60" cy="125" rx="45" ry="12" fill="#2C3E50" opacity="0.25" />
          {/* Legs */}
          <rect x="25" y="80" width="18" height="42" rx="8" fill="#747D8C" />
          <rect x="75" y="80" width="18" height="42" rx="8" fill="#747D8C" />
          {/* Body */}
          <ellipse cx="55" cy="75" rx="40" ry="32" fill="url(#elephantSkin)" />
          {/* Cute Thai Decorative Saddle Cloth (ผ้าคลุมหลังช้างลายไทย) */}
          <path d="M30,55 Q55,48 80,55 L85,82 Q55,75 25,82 Z" fill="#EE5253" stroke="#F9CA24" strokeWidth="2" />
          <circle cx="55" cy="65" r="4" fill="#F9CA24" />
          {/* Head */}
          <circle cx="85" cy="50" r="26" fill="url(#elephantSkin)" />
          {/* Big cute Ear */}
          <ellipse cx="65" cy="48" rx="16" ry="22" fill="#A4B0BE" stroke="#747D8C" strokeWidth="2" />
          <ellipse cx="65" cy="48" rx="10" ry="14" fill="#F8A5C2" opacity="0.7" />
          {/* Big sparkly eyes */}
          <circle cx="92" cy="44" r="5" fill="#2C3E50" />
          <circle cx="94" cy="42" r="2" fill="#FFFFFF" />
          {/* Rosy Cheeks */}
          <circle cx="85" cy="54" r="4" fill="#FF8080" opacity="0.7" />
          {/* Happy Raised Trunk (ชูงวงพ่นความสุข) */}
          <path
            d="M100,56 Q120,60 125,45 Q128,30 115,25 Q108,22 110,32 Q112,45 96,62"
            fill="url(#elephantSkin)"
            stroke="#747D8C"
            strokeWidth="2"
          />
          {/* Cute Thai Flower Garland on head */}
          <circle cx="82" cy="26" r="5" fill="#F9CA24" />
          <circle cx="88" cy="24" r="4" fill="#FF4757" />
          <circle cx="94" cy="26" r="5" fill="#F9CA24" />
        </g>

        {/* Baby Elephant 2 (Center - Star Leader with Golden Crown/Chada) */}
        <g transform="translate(390, 250) scale(1.05)">
          {/* Shadow */}
          <ellipse cx="60" cy="138" rx="52" ry="14" fill="#2C3E50" opacity="0.25" />
          {/* Legs */}
          <rect x="22" y="90" width="22" height="48" rx="9" fill="#747D8C" />
          <rect x="76" y="90" width="22" height="48" rx="9" fill="#747D8C" />
          {/* Round Chubby Body */}
          <ellipse cx="60" cy="85" rx="46" ry="38" fill="url(#elephantSkin)" />
          {/* Royal Thai Golden Blanket (ผ้าทิพย์ลายไทยสีทอง) */}
          <path d="M30,65 Q60,55 90,65 L95,95 Q60,88 25,95 Z" fill="#F9CA24" stroke="#EA2027" strokeWidth="2.5" />
          <circle cx="60" cy="78" r="6" fill="#EA2027" />
          <circle cx="45" cy="78" r="3" fill="#009432" />
          <circle cx="75" cy="78" r="3" fill="#009432" />
          {/* Head */}
          <circle cx="60" cy="50" r="32" fill="url(#elephantSkin)" />
          {/* Left Ear */}
          <ellipse cx="30" cy="48" rx="18" ry="24" fill="#A4B0BE" stroke="#747D8C" strokeWidth="2" />
          <ellipse cx="30" cy="48" rx="11" ry="15" fill="#F8A5C2" opacity="0.75" />
          {/* Right Ear */}
          <ellipse cx="90" cy="48" rx="18" ry="24" fill="#A4B0BE" stroke="#747D8C" strokeWidth="2" />
          <ellipse cx="90" cy="48" rx="11" ry="15" fill="#F8A5C2" opacity="0.75" />
          {/* Sparkly Eyes */}
          <circle cx="48" cy="46" r="6" fill="#2C3E50" />
          <circle cx="50" cy="44" r="2.5" fill="#FFFFFF" />
          <circle cx="72" cy="46" r="6" fill="#2C3E50" />
          <circle cx="74" cy="44" r="2.5" fill="#FFFFFF" />
          {/* Cute Smile / Cheek */}
          <circle cx="40" cy="56" r="5" fill="#FF8080" opacity="0.8" />
          <circle cx="80" cy="56" r="5" fill="#FF8080" opacity="0.8" />
          {/* Cute Trunk with Star/Flower */}
          <path
            d="M54,58 Q60,82 68,78 Q74,74 66,58"
            fill="url(#elephantSkin)"
            stroke="#747D8C"
            strokeWidth="2"
          />
          {/* Cute Golden Little Crown / Chada */}
          <polygon points="60,10 50,26 70,26" fill="url(#templeGold)" stroke="#D48806" strokeWidth="1.5" />
          <circle cx="60" cy="8" r="3" fill="#EE5253" />
          <rect x="48" y="24" width="24" height="6" rx="2" fill="#F9CA24" />
        </g>

        {/* Baby Elephant 3 (Right - Waving ear & Joyful hop) */}
        <g transform="translate(520, 275) scale(0.88)">
          {/* Shadow */}
          <ellipse cx="60" cy="125" rx="45" ry="12" fill="#2C3E50" opacity="0.25" />
          {/* Legs */}
          <rect x="25" y="80" width="18" height="42" rx="8" fill="#747D8C" />
          <rect x="75" y="80" width="18" height="42" rx="8" fill="#747D8C" />
          {/* Body */}
          <ellipse cx="65" cy="75" rx="40" ry="32" fill="url(#elephantSkin)" />
          {/* Cute Thai Decorative Saddle Cloth (เขียวมรกต) */}
          <path d="M40,55 Q65,48 90,55 L95,82 Q65,75 35,82 Z" fill="#10AC84" stroke="#F9CA24" strokeWidth="2" />
          <circle cx="65" cy="65" r="4" fill="#F9CA24" />
          {/* Head */}
          <circle cx="35" cy="50" r="26" fill="url(#elephantSkin)" />
          {/* Big cute Ear */}
          <ellipse cx="55" cy="48" rx="16" ry="22" fill="#A4B0BE" stroke="#747D8C" strokeWidth="2" />
          <ellipse cx="55" cy="48" rx="10" ry="14" fill="#F8A5C2" opacity="0.7" />
          {/* Big sparkly eyes */}
          <circle cx="28" cy="44" r="5" fill="#2C3E50" />
          <circle cx="26" cy="42" r="2" fill="#FFFFFF" />
          {/* Rosy Cheeks */}
          <circle cx="35" cy="54" r="4" fill="#FF8080" opacity="0.7" />
          {/* Happy Raised Trunk (ชูงวงไปทางซ้าย) */}
          <path
            d="M20,56 Q0,60 -5,45 Q-8,30 5,25 Q12,22 10,32 Q8,45 24,62"
            fill="url(#elephantSkin)"
            stroke="#747D8C"
            strokeWidth="2"
          />
          {/* Cute Thai Flower Garland on head */}
          <circle cx="38" cy="26" r="5" fill="#F9CA24" />
          <circle cx="32" cy="24" r="4" fill="#0ABDE3" />
          <circle cx="26" cy="26" r="5" fill="#F9CA24" />
        </g>

        {/* Lotus blossoms in the foreground grass */}
        <g transform="translate(130, 380) scale(0.6)">
          <ellipse cx="30" cy="20" rx="25" ry="8" fill="#10AC84" />
          <path d="M30,0 C20,15 15,25 30,28 C45,25 40,15 30,0 Z" fill="#F78FB3" />
          <path d="M18,10 C10,20 15,28 28,28 C22,22 18,15 18,10 Z" fill="#FFB8B8" />
          <path d="M42,10 C50,20 45,28 32,28 C38,22 42,15 42,10 Z" fill="#FFB8B8" />
        </g>
        <g transform="translate(720, 375) scale(0.65)">
          <ellipse cx="30" cy="20" rx="25" ry="8" fill="#10AC84" />
          <path d="M30,0 C20,15 15,25 30,28 C45,25 40,15 30,0 Z" fill="#F78FB3" />
          <path d="M18,10 C10,20 15,28 28,28 C22,22 18,15 18,10 Z" fill="#FFB8B8" />
          <path d="M42,10 C50,20 45,28 32,28 C38,22 42,15 42,10 Z" fill="#FFB8B8" />
        </g>

        {/* Golden Celebration Sparkles & Stars floating */}
        {stars >= 1 && (
          <g fill="#F9CA24" opacity="0.85">
            <polygon points="120,120 124,130 134,134 124,138 120,148 116,138 106,134 116,130" />
            <polygon points="780,110 784,120 794,124 784,128 780,138 776,128 766,124 776,120" />
            <polygon points="450,40 453,48 461,51 453,54 450,62 447,54 439,51 447,48" />
          </g>
        )}
      </svg>
    </div>
  );
};

/**
 * 3. Minimalist Gameplay Background
 * Soft pastel yellow & light green palette, subtle nature patterns, clean empty center.
 */
export const GameplayBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      <svg
        className="w-full h-full object-cover"
        viewBox="0 0 800 1200"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="gameplaySky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFF9E6" />
            <stop offset="50%" stopColor="#FFF2D6" />
            <stop offset="100%" stopColor="#EBF8E3" />
          </linearGradient>
          <radialGradient id="sunGlow" cx="50%" cy="15%" r="60%">
            <stop offset="0%" stopColor="#FFEAA7" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#FFF9E6" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="800" height="1200" fill="url(#gameplaySky)" />
        <rect width="800" height="1200" fill="url(#sunGlow)" />

        {/* Subtle decorative clouds at top */}
        <g fill="#FFFFFF" opacity="0.7">
          <path d="M-30,80 a40,40 0 0,1 60,-15 a55,55 0 0,1 90,15 a40,40 0 0,1 30,35 l-180,0 z" />
          <path d="M620,120 a35,35 0 0,1 50,-12 a45,45 0 0,1 70,12 a35,35 0 0,1 25,30 l-145,0 z" />
        </g>

        {/* Subtle Thai Floral Petal/Leaf motifs floating */}
        <g fill="#C7E8B4" opacity="0.45">
          {/* Leaf 1 */}
          <path d="M100,280 Q130,250 140,290 Q110,320 100,280 Z" />
          {/* Leaf 2 */}
          <path d="M720,380 Q690,350 680,390 Q710,420 720,380 Z" />
          {/* Leaf 3 */}
          <path d="M80,820 Q110,790 120,830 Q90,860 80,820 Z" />
          {/* Leaf 4 */}
          <path d="M700,900 Q670,870 660,910 Q690,940 700,900 Z" />
        </g>

        {/* Tiny stars */}
        <g fill="#FDCB6E" opacity="0.5">
          <circle cx="220" cy="180" r="3" />
          <circle cx="580" cy="220" r="4" />
          <circle cx="150" cy="740" r="3.5" />
          <circle cx="680" cy="710" r="3" />
          <circle cx="380" cy="1120" r="4" />
        </g>

        {/* Soft bottom landscape wave */}
        <path
          d="M0,1130 Q200,1090 400,1120 T800,1110 L800,1200 L0,1200 Z"
          fill="#D4EDDA"
          opacity="0.7"
        />
        <path
          d="M0,1160 Q300,1130 600,1170 T800,1150 L800,1200 L0,1200 Z"
          fill="#C3E6CB"
          opacity="0.8"
        />
      </svg>
    </div>
  );
};

/**
 * 4. Cute Thai Elephant Character (ช้างไทยตัวน้อยน่ารัก)
 */
export const CuteThaiElephant: React.FC<{ className?: string }> = ({ className = "w-20 h-20" }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Body */}
    <ellipse cx="50" cy="58" rx="28" ry="24" fill="#A4B0BE" />
    {/* Head */}
    <circle cx="50" cy="40" r="22" fill="#CED6E0" />
    {/* Big Cute Ears */}
    <ellipse cx="24" cy="38" rx="14" ry="18" fill="#A4B0BE" />
    <ellipse cx="24" cy="38" rx="9" ry="12" fill="#FFB8B8" />
    <ellipse cx="76" cy="38" rx="14" ry="18" fill="#A4B0BE" />
    <ellipse cx="76" cy="38" rx="9" ry="12" fill="#FFB8B8" />
    {/* Head crown / Chada decor */}
    <polygon points="50,12 45,26 55,26" fill="#F9CA24" stroke="#E67E22" strokeWidth="1" />
    <circle cx="50" cy="11" r="3" fill="#FF4757" />
    <rect x="42" y="24" width="16" height="4" rx="2" fill="#F9CA24" />
    {/* Eyes */}
    <circle cx="41" cy="38" r="4" fill="#2F3542" />
    <circle cx="59" cy="38" r="4" fill="#2F3542" />
    <circle cx="42.5" cy="36.5" r="1.5" fill="#FFFFFF" />
    <circle cx="60.5" cy="36.5" r="1.5" fill="#FFFFFF" />
    {/* Blush */}
    <ellipse cx="34" cy="45" rx="4.5" ry="3" fill="#FF7675" opacity="0.6" />
    <ellipse cx="66" cy="45" rx="4.5" ry="3" fill="#FF7675" opacity="0.6" />
    {/* Trunk curled upward happily */}
    <path d="M46,45 C44,55 42,62 50,65 C56,66 60,60 58,55 C57,52 54,54 53,56 C52,58 50,59 47,56 C46,54 48,46 48,45 Z" fill="#CED6E0" stroke="#A4B0BE" strokeWidth="1.2" />
    {/* Cute Tusks */}
    <path d="M42,50 Q36,54 36,46" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
    <path d="M58,50 Q64,54 64,46" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
    {/* Feet */}
    <circle cx="36" cy="80" r="7" fill="#A4B0BE" />
    <circle cx="64" cy="80" r="7" fill="#A4B0BE" />
    <circle cx="49" cy="81" r="6.5" fill="#747D8C" />
  </svg>
);

/**
 * 5. Cute Thai Dancer Character (นางรำไทยน่ารัก)
 */
export const CuteThaiDancer: React.FC<{ className?: string }> = ({ className = "w-20 h-20" }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Chada (Golden Crown) */}
    <path d="M50,4 L44,24 L56,24 Z" fill="#F9CA24" stroke="#D35400" strokeWidth="1" />
    <polygon points="50,2 47,12 53,12" fill="#F1C40F" />
    <circle cx="50" cy="2" r="2.5" fill="#E74C3C" />
    <rect x="38" y="22" width="24" height="6" rx="3" fill="#F39C12" />
    <circle cx="50" cy="25" r="2" fill="#2ECC71" />
    {/* Hair */}
    <path d="M32,32 C32,24 68,24 68,32 C68,38 72,46 72,50 C68,48 66,42 66,36 C60,40 40,40 34,36 C34,42 32,48 28,50 C28,46 32,38 32,32 Z" fill="#2C3A47" />
    {/* Head / Face */}
    <ellipse cx="50" cy="38" rx="16" ry="15" fill="#FFEAA7" />
    {/* Flower by Ear */}
    <circle cx="67" cy="32" r="4.5" fill="#FF7675" />
    <circle cx="67" cy="32" r="2" fill="#FFF275" />
    {/* Eyes */}
    <ellipse cx="44" cy="37" rx="2.5" ry="3" fill="#2C3A47" />
    <ellipse cx="56" cy="37" rx="2.5" ry="3" fill="#2C3A47" />
    <circle cx="45" cy="35.5" r="1" fill="#FFFFFF" />
    <circle cx="57" cy="35.5" r="1" fill="#FFFFFF" />
    {/* Smile & Blush */}
    <path d="M46,43 Q50,47 54,43" fill="none" stroke="#D63031" strokeWidth="1.5" strokeLinecap="round" />
    <ellipse cx="38" cy="41" rx="3" ry="2" fill="#FF7675" opacity="0.65" />
    <ellipse cx="62" cy="41" rx="3" ry="2" fill="#FF7675" opacity="0.65" />
    {/* Sabai (Thai Traditional Sash Dress) */}
    <path d="M38,52 L62,52 L68,84 L32,84 Z" fill="#EE5253" />
    <path d="M38,52 L56,52 L64,84 L52,84 Z" fill="#F9CA24" opacity="0.9" />
    <line x1="38" y1="62" x2="62" y2="62" stroke="#F1C40F" strokeWidth="2" />
    {/* Dancing Hands (Traditional Thai Jeeb Gesture) */}
    <path d="M34,55 C26,50 20,44 22,38 C24,36 28,38 27,42 C26,45 32,56 36,58 Z" fill="#FFEAA7" stroke="#E67E22" strokeWidth="0.8" />
    <path d="M66,58 C70,56 76,45 75,42 C74,38 78,36 80,38 C82,44 76,50 68,55 Z" fill="#FFEAA7" stroke="#E67E22" strokeWidth="0.8" />
    {/* Golden Bracelets */}
    <rect x="23" y="42" width="4" height="2" rx="1" fill="#F9CA24" />
    <rect x="75" y="42" width="4" height="2" rx="1" fill="#F9CA24" />
    {/* Golden Belt */}
    <rect x="36" y="60" width="28" height="4" rx="2" fill="#F1C40F" stroke="#B7791F" strokeWidth="0.8" />
    <circle cx="50" cy="62" r="3" fill="#E74C3C" />
  </svg>
);

/**
 * 6. Cute Thai Mango Character (มะม่วงอกร่องน่ารัก)
 */
export const CuteThaiMango: React.FC<{ className?: string }> = ({ className = "w-20 h-20" }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="mangoGoldenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF275" />
        <stop offset="60%" stopColor="#FFA502" />
        <stop offset="100%" stopColor="#FF7F50" />
      </linearGradient>
    </defs>
    {/* Green Leaf on Stem */}
    <path d="M50,18 C40,8 30,12 32,24 C34,30 48,22 50,18 Z" fill="#2ED573" stroke="#26AF5F" strokeWidth="1.2" />
    <path d="M33,22 Q42,16 48,19" fill="none" stroke="#26AF5F" strokeWidth="0.8" />
    {/* Stem */}
    <path d="M50,22 Q52,14 56,12" fill="none" stroke="#795548" strokeWidth="3.5" strokeLinecap="round" />
    {/* Mango Body (Teardrop shape) */}
    <path d="M50,22 C68,22 82,38 82,58 C82,78 64,88 50,88 C32,88 22,72 22,54 C22,34 36,22 50,22 Z" fill="url(#mangoGoldenGrad)" stroke="#E67E22" strokeWidth="1.5" />
    {/* Highlighting Shine */}
    <ellipse cx="36" cy="38" rx="6" ry="10" transform="rotate(-25 36 38)" fill="#FFFFFF" opacity="0.45" />
    {/* Cute Big Eyes */}
    <circle cx="42" cy="52" r="4.5" fill="#2F3542" />
    <circle cx="62" cy="52" r="4.5" fill="#2F3542" />
    <circle cx="44" cy="50" r="1.8" fill="#FFFFFF" />
    <circle cx="64" cy="50" r="1.8" fill="#FFFFFF" />
    {/* Rosy Cheeks */}
    <ellipse cx="34" cy="59" rx="5" ry="3.5" fill="#FF4757" opacity="0.6" />
    <ellipse cx="70" cy="59" rx="5" ry="3.5" fill="#FF4757" opacity="0.6" />
    {/* Big Happy Smile */}
    <path d="M46,60 Q52,68 58,60" fill="none" stroke="#2F3542" strokeWidth="2.5" strokeLinecap="round" />
    {/* Little Open Mouth */}
    <path d="M47,60 Q52,67 57,60 Z" fill="#D63031" />
  </svg>
);

/**
 * 7. Trio Celebration Component (ช้าง + นางรำ + มะม่วง)
 */
export const CuteThaiCelebrationTrio: React.FC = () => (
  <div className="flex items-center justify-center gap-3 sm:gap-6 py-2 px-3 rounded-2xl bg-gradient-to-r from-[#FFF9E6] via-[#FFE8D6] to-[#FFF9E6] border-2 border-[#F6B93B]/70 shadow-xs">
    <div className="flex flex-col items-center hover:scale-105 transition-transform">
      <CuteThaiElephant className="w-16 h-16 sm:w-20 sm:h-20 drop-shadow-md" />
      <span className="text-[11px] sm:text-xs font-black text-[#5D3A1A] mt-0.5">น้องช้าง</span>
    </div>
    <div className="flex flex-col items-center hover:scale-105 transition-transform -mt-2">
      <CuteThaiDancer className="w-18 h-18 sm:w-22 sm:h-22 drop-shadow-md" />
      <span className="text-[11px] sm:text-xs font-black text-[#EE5253] mt-0.5">พี่นางรำ</span>
    </div>
    <div className="flex flex-col items-center hover:scale-105 transition-transform">
      <CuteThaiMango className="w-16 h-16 sm:w-20 sm:h-20 drop-shadow-md" />
      <span className="text-[11px] sm:text-xs font-black text-[#E67E22] mt-0.5">น้องมะม่วง</span>
    </div>
  </div>
);

/**
 * 8. Cute Sad Elephant Illustration for Defeat/Timeout Screen (ช้างน้อยให้กำลังใจ)
 */
export const CuteSadElephant: React.FC<{ className?: string }> = ({ className = 'w-20 h-20' }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Body */}
    <ellipse cx="50" cy="60" rx="26" ry="22" fill="#A4B0BE" />
    {/* Head */}
    <circle cx="50" cy="42" r="20" fill="#CED6E0" />
    {/* Droopy Sad Ears */}
    <ellipse cx="26" cy="46" rx="12" ry="16" fill="#A4B0BE" transform="rotate(12 26 46)" />
    <ellipse cx="26" cy="46" rx="7" ry="11" fill="#FFB8B8" transform="rotate(12 26 46)" />
    <ellipse cx="74" cy="46" rx="12" ry="16" fill="#A4B0BE" transform="rotate(-12 74 46)" />
    <ellipse cx="74" cy="46" rx="7" ry="11" fill="#FFB8B8" transform="rotate(-12 74 46)" />
    {/* Sad Band-aid on Forehead */}
    <rect x="42" y="26" width="16" height="6" rx="2" fill="#FFEAA7" stroke="#E67E22" strokeWidth="0.8" transform="rotate(15 50 29)" />
    <rect x="47" y="23" width="6" height="12" rx="1.5" fill="#FFEAA7" stroke="#E67E22" strokeWidth="0.8" transform="rotate(15 50 29)" />
    {/* Sad Eyes */}
    <circle cx="42" cy="42" r="3.5" fill="#2F3542" />
    <circle cx="58" cy="42" r="3.5" fill="#2F3542" />
    <circle cx="43" cy="41" r="1.2" fill="#FFFFFF" />
    <circle cx="59" cy="41" r="1.2" fill="#FFFFFF" />
    {/* Little Tear */}
    <path d="M62,44 Q66,48 63,52 Q60,48 62,44 Z" fill="#54A0FF" />
    {/* Droopy Sad Trunk */}
    <path d="M48,46 C48,56 46,68 50,72 C52,73 54,71 53,66 C52,60 52,54 52,46 Z" fill="#CED6E0" stroke="#A4B0BE" strokeWidth="1" />
    {/* Feet */}
    <circle cx="38" cy="80" r="6" fill="#A4B0BE" />
    <circle cx="62" cy="80" r="6" fill="#A4B0BE" />
  </svg>
);



