'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

export function AudioControl() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const playAudio = () => {
      if (audioRef.current) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch(() => {
              // Autoplay was prevented, wait for user interaction
              const handleInteraction = () => {
                const playPromise2 = audioRef.current?.play();
                if (playPromise2 !== undefined) {
                  playPromise2
                    .then(() => setIsPlaying(true))
                    .catch(() => setIsPlaying(false));
                }
                document.removeEventListener('click', handleInteraction);
                document.removeEventListener('touchstart', handleInteraction);
              };
              
              document.addEventListener('click', handleInteraction);
              document.addEventListener('touchstart', handleInteraction);
            });
        }
      }
    };

    // Try to play audio immediately
    playAudio();
  }, []);

  const toggleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch(() => {
              setIsPlaying(false);
            });
        }
      }
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/shuvo_shuvo.mp3"
        loop
        crossOrigin="anonymous"
      />

      <motion.button
        onClick={toggleAudio}
        className="fixed bottom-8 right-8 z-50 group"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative">
          {/* Outer glow */}
          <div
            className={`absolute inset-0 rounded-full blur-lg transition-all duration-300 ${
              isPlaying
                ? 'bg-primary/50 scale-125'
                : 'bg-primary/20 scale-100'
            }`}
          />

          {/* Button */}
          <div
            className={`relative w-14 h-14 rounded-full backdrop-blur-md border-2 flex items-center justify-center transition-all duration-300 ${
              isPlaying
                ? 'bg-primary/30 border-primary text-primary'
                : 'bg-card/40 border-primary/30 text-primary/60 hover:border-primary hover:text-primary'
            }`}
          >
            <AnimatePresence mode="wait">
              {isPlaying ? (
                <motion.div
                  key="playing"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  className="absolute"
                >
                  <Volume2 className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="muted"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  className="absolute"
                >
                  <VolumeX className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="backdrop-blur-md bg-card/80 border border-primary/20 rounded-lg px-3 py-2 text-sm text-primary whitespace-nowrap">
            {isPlaying ? 'Mute' : 'Unmute'}
          </div>
        </div>
      </motion.button>
    </>
  );
}
