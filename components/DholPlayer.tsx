'use client';

import { motion, type Variants } from 'framer-motion';

export function DholPlayer() {
  // Animation for drumstick hits with beat pattern
  const drumBeatPattern: Variants = {
    animate: (side: 'left' | 'right') => ({
      rotate: side === 'left' 
        ? [0, -35, -10, -40, -5, 0]
        : [0, 35, 10, 40, 5, 0],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        repeatDelay: 0.1,
        ease: 'easeInOut',
      },
    }),
  };

  // Dhunuchi smoke puffs
  const smokePuffs = [0, 1, 2, 3, 4].map((i) => ({
    id: i,
    delay: i * 0.15,
  }));

  return (
    <motion.div
      className="flex items-center justify-center relative"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      {/* Dhunuchi smoke effect behind dhol */}
      <div className="absolute inset-0 flex items-center justify-center">
        {smokePuffs.map((puff) => (
          <motion.div
            key={`smoke-${puff.id}`}
            className="absolute w-24 h-24 rounded-full blur-2xl"
            style={{
              background: 'radial-gradient(circle, rgba(212,165,116,0.4) 0%, rgba(232,183,107,0.1) 50%, transparent 70%)',
              left: '50%',
              top: '50%',
              x: '-50%',
              y: '-50%',
            }}
            animate={{
              y: [-80, -150, -200],
              x: ['-50%', '-45%', '-55%'],
              opacity: [0.6, 0.3, 0],
              scale: [0.8, 1.2, 1.5],
            }}
            transition={{
              duration: 2.5,
              delay: puff.delay,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
        ))}
      </div>

      <div className="relative w-56 h-56 flex items-center justify-center">
        {/* Dhol drum body - more detailed */}
        <svg
          className="absolute w-full h-full text-primary"
          viewBox="0 0 240 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* 3D drum body effect with gradient */}
          <defs>
            <linearGradient id="drumGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
              <stop offset="50%" stopColor="currentColor" stopOpacity="0.15" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.25" />
            </linearGradient>
          </defs>

          {/* Main drum body - wooden texture */}
          <ellipse
            cx="120"
            cy="120"
            rx="70"
            ry="85"
            fill="url(#drumGradient)"
            stroke="currentColor"
            strokeWidth="3"
          />

          {/* Top drum head with shine */}
          <ellipse
            cx="120"
            cy="50"
            rx="70"
            ry="22"
            fill="currentColor"
            opacity="0.3"
            stroke="currentColor"
            strokeWidth="3"
          />
          <ellipse
            cx="120"
            cy="48"
            rx="65"
            ry="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            opacity="0.6"
          />

          {/* Bottom drum head */}
          <ellipse
            cx="120"
            cy="190"
            rx="70"
            ry="22"
            fill="currentColor"
            opacity="0.2"
            stroke="currentColor"
            strokeWidth="3"
          />

          {/* Decorative rope rings (jingles) */}
          <circle cx="120" cy="100" r="55" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.4" />
          <circle cx="120" cy="120" r="65" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />

          {/* Ornamental metal bands */}
          <rect x="55" y="85" width="130" height="6" rx="2" fill="currentColor" opacity="0.5" />
          <rect x="55" y="149" width="130" height="6" rx="2" fill="currentColor" opacity="0.5" />
          <rect x="50" y="115" width="140" height="4" rx="2" fill="currentColor" opacity="0.3" />

          {/* Jingles/bells on left side */}
          {[60, 85, 135, 160].map((y, i) => (
            <g key={`bell-left-${i}`}>
              <circle cx="40" cy={y} r="7" fill="currentColor" opacity="0.5" />
              <circle cx="40" cy={y} r="4" fill="currentColor" opacity="0.2" />
            </g>
          ))}

          {/* Jingles/bells on right side */}
          {[60, 85, 135, 160].map((y, i) => (
            <g key={`bell-right-${i}`}>
              <circle cx="200" cy={y} r="7" fill="currentColor" opacity="0.5" />
              <circle cx="200" cy={y} r="4" fill="currentColor" opacity="0.2" />
            </g>
          ))}

          {/* Center decorative symbol */}
          <circle cx="120" cy="120" r="8" fill="currentColor" opacity="0.6" />
          <circle cx="120" cy="120" r="5" fill="currentColor" opacity="0.3" />
        </svg>

        {/* Left drumstick with enhanced animation */}
        <motion.div
          className="absolute"
          style={{
            left: '30px',
            top: '20px',
            originX: '16px',
            originY: '4px',
          }}
          variants={drumBeatPattern}
          animate="animate"
          custom="left"
        >
          <svg
            className="w-14 h-14 text-secondary"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Arm */}
            <rect x="9" y="8" width="6" height="12" rx="3" fill="currentColor" opacity="0.7" />
            {/* Drumstick shaft - longer and more detailed */}
            <rect x="10" y="0" width="4" height="18" fill="currentColor" rx="2" opacity="0.9" />
            {/* Drumstick head - rounded */}
            <circle cx="12" cy="-2" r="4" fill="currentColor" />
            {/* Wrap/binding */}
            <rect x="9" y="14" width="6" height="2" fill="currentColor" opacity="0.5" />
          </svg>
        </motion.div>

        {/* Right drumstick with enhanced animation */}
        <motion.div
          className="absolute"
          style={{
            right: '30px',
            top: '20px',
            originX: '-16px',
            originY: '4px',
          }}
          variants={drumBeatPattern}
          animate="animate"
          custom="right"
        >
          <svg
            className="w-14 h-14 text-secondary"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Arm */}
            <rect x="9" y="8" width="6" height="12" rx="3" fill="currentColor" opacity="0.7" />
            {/* Drumstick shaft */}
            <rect x="10" y="0" width="4" height="18" fill="currentColor" rx="2" opacity="0.9" />
            {/* Drumstick head */}
            <circle cx="12" cy="-2" r="4" fill="currentColor" />
            {/* Wrap/binding */}
            <rect x="9" y="14" width="6" height="2" fill="currentColor" opacity="0.5" />
          </svg>
        </motion.div>

        {/* Impact glow on drum hit */}
        <motion.div
          className="absolute top-1/3 left-1/2 -translate-x-1/2"
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0.8, 1.3, 0.8],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatDelay: 0.1,
            ease: 'easeOut',
          }}
        >
          <div className="w-20 h-16 rounded-full blur-xl" style={{
            background: 'radial-gradient(circle, rgba(232,183,107,0.6) 0%, transparent 70%)',
          }} />
        </motion.div>

        {/* Main pulsing glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(212,165,116,0.25) 0%, transparent 75%)',
          }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    </motion.div>
  );
}
