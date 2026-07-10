'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
}

const generateParticles = (count: number, seed: number = 0): Particle[] => {
  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    // Use deterministic values based on index instead of Math.random()
    const id = seed + i;
    const x = (id * 37.5) % 100; // Deterministic distribution
    const y = (id * 62.3) % 100;
    const duration = 3 + ((id * 1.3) % 4);
    const delay = (id * 0.3) % 2;
    
    particles.push({ id, x, y, duration, delay });
  }
  return particles;
};

export function AnimatedBackground() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const particles = generateParticles(15, 0);
  const diyas = generateParticles(8, 100);
  const shiuli = generateParticles(6, 200);
  const dhunuchiSmoke = generateParticles(20, 300);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src="/bg_image.png"
          alt="Durga Puja Background"
          className="w-full h-full object-cover"
        />
        {/* Dark red-gold overlay - lighter for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/8 via-secondary/3 to-primary/8" />
      </div>

      {/* Animated particles (floating dust/smoke) */}
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <motion.div
            key={`particle-${particle.id}`}
            className="absolute w-2 h-2 rounded-full bg-primary/20 blur-sm"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [0, -100, -200],
              opacity: [0, 0.5, 0],
              x: [0, Math.sin(particle.id) * 50, 0],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Floating diyas */}
      <div className="absolute inset-0">
        {diyas.map((diya) => (
          <motion.div
            key={`diya-${diya.id}`}
            className="absolute"
            style={{
              left: `${diya.x}%`,
              top: `${diya.y}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: diya.duration + 2,
              delay: diya.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <svg
              className="w-6 h-6 text-primary/40 drop-shadow-lg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12c0 .55.45 1 1 1h2c.55 0 1-.45 1-1 0-3.86 3.14-7 7-7s7 3.14 7 7c0 .55.45 1 1 1h2c.55 0 1-.45 1-1 0-5.52-4.48-10-10-10zm9 11h-2c-.55 0-1 .45-1 1 0 3.86-3.14 7-7 7s-7-3.14-7-7c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1 0 5.52 4.48 10 10 10s10-4.48 10-10c0-.55-.45-1-1-1z" />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Falling shiuli flowers */}
      <div className="absolute inset-0">
        {shiuli.map((flower) => (
          <motion.div
            key={`shiuli-${flower.id}`}
            className="absolute"
            style={{
              left: `${flower.x}%`,
              top: `-10px`,
            }}
            animate={{
              y: 'calc(100vh + 10px)',
              x: Math.sin(flower.id) * 100,
              rotate: [0, 360],
              opacity: [1, 0.8, 0.5, 0],
            }}
            transition={{
              duration: 8 + ((flower.id * 0.8) % 4),
              delay: flower.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {/* Simple flower shape */}
            <svg
              className="w-4 h-4 text-secondary/60 drop-shadow-lg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <circle cx="12" cy="12" r="3" />
              <circle cx="12" cy="4" r="2" />
              <circle cx="20" cy="12" r="2" />
              <circle cx="12" cy="20" r="2" />
              <circle cx="4" cy="12" r="2" />
              <circle cx="18" cy="6" r="1.5" />
              <circle cx="18" cy="18" r="1.5" />
              <circle cx="6" cy="18" r="1.5" />
              <circle cx="6" cy="6" r="1.5" />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Subtle alpana pattern borders */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        <svg viewBox="0 0 1000 200" className="w-full h-full text-primary">
          <defs>
            <pattern id="alpana" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path
                d="M50 10 Q60 20 50 30 Q40 20 50 10 M30 50 L70 50 M50 30 L50 70 M25 75 Q50 85 75 75"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
            </pattern>
          </defs>
          <rect width="1000" height="200" fill="url(#alpana)" />
        </svg>
      </motion.div>

      {/* Dhunuchi smoke puffs - main incense effect */}
      <div className="absolute inset-0">
        {dhunuchiSmoke.map((smoke) => (
          <motion.div
            key={`dhunuchi-${smoke.id}`}
            className="absolute rounded-full blur-2xl pointer-events-none"
            style={{
              left: `${smoke.x}%`,
              top: `${smoke.y}%`,
              width: '60px',
              height: '60px',
              background: 'radial-gradient(circle, rgba(232,183,107,0.7) 0%, rgba(212,165,116,0.4) 30%, rgba(164,62,49,0.2) 60%, transparent 80%)',
            }}
            animate={{
              y: [0, -160, -320],
              x: [0, Math.sin(smoke.id * 0.5) * 60, Math.cos(smoke.id * 0.7) * 80],
              opacity: [0.6, 0.8, 0],
              scale: [0.8, 1.5, 2.2],
            }}
            transition={{
              duration: smoke.duration + 2,
              delay: smoke.delay * 0.8,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
        ))}
      </div>

      {/* Smoke effect in corners */}
      <div className="absolute inset-0">
        {[
          { top: '20%', left: '5%' },
          { top: '70%', right: '8%' },
          { top: '40%', right: '3%' },
          { bottom: '10%', left: '10%' },
          { top: '50%', right: '10%' },
        ].map((pos, i) => (
          <motion.div
            key={`smoke-${i}`}
            className="absolute rounded-full blur-3xl pointer-events-none"
            style={{
              width: i < 3 ? '40px' : '50px',
              height: i < 3 ? '40px' : '50px',
              background: 'radial-gradient(circle, rgba(232,183,107,0.25) 0%, rgba(212,165,116,0.15) 40%, transparent 75%)',
              ...pos,
            }}
            animate={{
              opacity: [0.3, 0.7, 0.2],
              scale: [1, 1.4, 0.9],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 4 + i * 0.5,
              delay: i * 0.3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </div>
  );
}
