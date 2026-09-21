import React, { useState } from 'react';
import { Camera, CheckCircle2 } from 'lucide-react';
import { getRealWordImage } from '../data/realWordImages';

interface RealWordPhotoCardProps {
  word: string;
  category?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  celebrating?: boolean;
  interactive?: boolean;
  showCaption?: boolean;
}

/**
 * Clean Real Word Photo Display:
 * - Shows high-quality photograph clue
 * - No cheat captions/subtitles under the photo
 * - No cheat magnifying glass or popup showing the answer
 */
export const RealWordPhotoCard: React.FC<RealWordPhotoCardProps> = ({
  word,
  category,
  size = 'md',
  celebrating = false,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const photoInfo = getRealWordImage(word, category);

  const sizeClasses = {
    sm: 'w-14 h-14 rounded-xl',
    md: 'w-24 h-24 sm:w-28 sm:h-28 rounded-2xl',
    lg: 'w-44 h-44 sm:w-56 sm:h-56 rounded-3xl',
    xl: 'w-64 h-64 sm:w-72 sm:h-72 rounded-3xl',
  };

  return (
    <div className="flex flex-col items-center select-none">
      {/* Main Photo Container - Clean, crisp, no cheat overlays */}
      <div
        className={`relative overflow-hidden border-3 sm:border-4 border-[#8A6248] shadow-[0_6px_0_#8A6248] bg-[#F7EFE5] transition-all duration-300 ${
          sizeClasses[size]
        } ${celebrating ? 'scale-105 ring-4 ring-[#F6B93B] shadow-[0_0_24px_rgba(246,185,59,0.7)]' : ''}`}
      >
        {/* Skeleton placeholder while loading */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-amber-100 to-amber-200 animate-pulse flex items-center justify-center">
            <Camera className="w-6 h-6 text-amber-600/50 animate-bounce" />
          </div>
        )}

        {/* Real Photo */}
        <img
          src={photoInfo.imageUrl}
          alt={photoInfo.photoTitle}
          referrerPolicy="no-referrer"
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className="w-full h-full object-cover select-none pointer-events-none"
        />

        {/* Celebrating Ribbon Overlay when player completes word */}
        {celebrating && (
          <div className="absolute inset-0 bg-amber-400/25 flex items-center justify-center pointer-events-none">
            <div className="p-2 rounded-full bg-emerald-500 text-white shadow-lg animate-pulse">
              <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
