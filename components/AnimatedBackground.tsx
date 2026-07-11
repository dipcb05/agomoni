'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { useMemo } from 'react';

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
    const id = seed + i;
    const x = (id * 37.5) % 100;
    const y = (id * 62.3) % 100;
    const duration = 3 + ((id * 1.3) % 4);
    const delay = (id * 0.3) % 2;

    particles.push({ id, x, y, duration, delay });
  }
  return particles;
};

export function AnimatedBackground() {
  const prefersReducedMotion = useReducedMotion();
  const particles = useMemo(() => generateParticles(8, 0), []);
  const diyas = useMemo(() => generateParticles(4, 100), []);
  const shiuli = useMemo(() => generateParticles(3, 200), []);
  const dhunuchiSmoke = useMemo(() => generateParticles(6, 300), []);
  const shouldAnimate = !prefersReducedMotion;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 contain-paint">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <Image
          src="/bg_image.png"
          alt="Durga Puja Background"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          quality={60}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/8 via-secondary/3 to-primary/8" />
      </div>

      {shouldAnimate && (
        <>
          {/* Animated particles (floating dust/smoke) */}
          <div className="absolute inset-0 hidden sm:block">
            {particles.map((particle) => (
              <motion.div
                key={`particle-${particle.id}`}
                className="absolute w-2 h-2 rounded-full bg-primary/20 blur-sm will-change-transform"
                style={{ left: `${particle.x}%`, top: `${particle.y}%` }}
                animate={{
                  y: [0, -80, -160],
                  opacity: [0, 0.45, 0],
                  x: [0, Math.sin(particle.id) * 40, 0],
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
          <div className="absolute inset-0 hidden md:block">
            {diyas.map((diya) => (
              <motion.div
                key={`diya-${diya.id}`}
                className="absolute will-change-transform"
                style={{ left: `${diya.x}%`, top: `${diya.y}%` }}
                animate={{ y: [0, -24, 0], opacity: [0.3, 0.65, 0.3] }}
                transition={{
                  duration: diya.duration + 2,
                  delay: diya.delay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <svg className="w-6 h-6 text-primary/40 drop-shadow-lg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 .55.45 1 1 1h2c.55 0 1-.45 1-1 0-3.86 3.14-7 7-7s7 3.14 7 7c0 .55.45 1 1 1h2c.55 0 1-.45 1-1 0-5.52-4.48-10-10-10zm9 11h-2c-.55 0-1 .45-1 1 0 3.86-3.14 7-7 7s-7-3.14-7-7c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1 0 5.52 4.48 10 10 10s10-4.48 10-10c0-.55-.45-1-1-1z" />
                </svg>
              </motion.div>
            ))}
          </div>

          {/* Falling shiuli flowers */}
          <div className="absolute inset-0 hidden md:block">
            {shiuli.map((flower) => (
              <motion.div
                key={`shiuli-${flower.id}`}
                className="absolute will-change-transform"
                style={{ left: `${flower.x}%`, top: '-10px' }}
                animate={{
                  y: 'calc(100vh + 10px)',
                  x: Math.sin(flower.id) * 80,
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
                <svg className="w-4 h-4 text-secondary/60 drop-shadow-lg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <circle cx="12" cy="12" r="3" />
                  <circle cx="12" cy="4" r="2" />
                  <circle cx="20" cy="12" r="2" />
                  <circle cx="12" cy="20" r="2" />
                  <circle cx="4" cy="12" r="2" />
                </svg>
              </motion.div>
            ))}
          </div>
        </>
      )}

      {/* Subtle alpana pattern borders */}
      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 pointer-events-none opacity-15">
        <svg viewBox="0 0 1000 200" className="w-full h-full text-primary" aria-hidden="true">
          <defs>
            <pattern id="alpana" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M50 10 Q60 20 50 30 Q40 20 50 10 M30 50 L70 50 M50 30 L50 70 M25 75 Q50 85 75 75" stroke="currentColor" strokeWidth="2" fill="none" />
            </pattern>
          </defs>
          <rect width="1000" height="200" fill="url(#alpana)" />
        </svg>
      </div>

      {shouldAnimate && (
        <>
          {/* Dhunuchi smoke puffs - desktop/tablet only because blur animations are expensive on phones */}
          <div className="absolute inset-0 hidden sm:block">
            {dhunuchiSmoke.map((smoke) => (
              <motion.div
                key={`dhunuchi-${smoke.id}`}
                className="absolute rounded-full blur-2xl pointer-events-none will-change-transform"
                style={{
                  left: `${smoke.x}%`,
                  top: `${smoke.y}%`,
                  width: '48px',
                  height: '48px',
                  background: 'radial-gradient(circle, rgba(232,183,107,0.55) 0%, rgba(212,165,116,0.3) 35%, rgba(164,62,49,0.16) 60%, transparent 80%)',
                }}
                animate={{
                  y: [0, -120, -240],
                  x: [0, Math.sin(smoke.id * 0.5) * 45, Math.cos(smoke.id * 0.7) * 60],
                  opacity: [0.45, 0.7, 0],
                  scale: [0.8, 1.3, 1.8],
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
        </>
      )}
    </div>
  );
}
