'use client';

import { motion } from 'framer-motion';
import { CountdownCard } from '@/components/CountdownCard';
import { AudioControl } from '@/components/AudioControl';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { DholPlayer } from '@/components/DholPlayer';

export default function Home() {
  // Durga Puja 2026: October 16, 2026
  const durgaPujaDate = new Date('2026-10-16T00:00:00');
  // Mahalaya 2026: October 10, 2026
  const mahalayaDate = new Date('2026-10-10T00:00:00');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  return (
    <>
      {/* Background - fixed behind everything */}
      <AnimatedBackground />

      <main className="relative min-h-screen w-full overflow-x-hidden">
        {/* Audio control */}
        <AudioControl />

        {/* Main content container - scrollable above background */}
        <motion.div
          className="relative z-20 w-full flex flex-col items-center px-3 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-20 space-y-8 sm:space-y-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
        {/* Hero Section */}
        <motion.div
          variants={itemVariants}
          className="text-center mb-6 sm:mb-8 md:mb-12"
        >
          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-2 sm:mb-3 text-balance"
          >
            মা আসছেন
          </motion.h1>
        </motion.div>

        {/* Dhol Player Animation */}
        <motion.div
          variants={itemVariants}
          className="mb-8 sm:mb-10 md:mb-16"
        >
          <DholPlayer />
        </motion.div>

        {/* Primary Countdown - Durga Puja */}
        <motion.div
          variants={itemVariants}
          className="w-full max-w-2xl mb-6 sm:mb-8"
        >
          <CountdownCard
            title="দুর্গাপূজার আর বাকি"
            targetDate={durgaPujaDate}
          />
        </motion.div>

        {/* Secondary Countdown - Mahalaya */}
        <motion.div
          variants={itemVariants}
          className="w-full max-w-2xl mb-6 sm:mb-8"
        >
          <CountdownCard
            title="শুভ মহালয়া"
            targetDate={mahalayaDate}
          />
        </motion.div>


      </motion.div>

      {/* Conch shell decoration - top left */}
      <motion.div
        className="fixed top-12 left-4 sm:left-8 text-3xl sm:text-4xl md:text-5xl opacity-20 pointer-events-none"
        animate={{
          rotate: [0, -5, 5, 0],
          y: [0, -10, 10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        🐚
      </motion.div>

      {/* Temple bell - top right */}
      <motion.div
        className="fixed top-12 right-4 sm:right-8 text-3xl sm:text-4xl md:text-5xl opacity-20 pointer-events-none"
        animate={{
          rotate: [0, 5, -5, 0],
          y: [0, -10, 10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.3,
        }}
      >
        🔔
      </motion.div>

      {/* Incense/dhunuchi - bottom left */}
      <motion.div
        className="fixed bottom-20 left-8 text-3xl md:text-4xl opacity-20 pointer-events-none"
        animate={{
          x: [-5, 5, -5],
          y: [-5, 0, -5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        🪧
      </motion.div>

      {/* Marigold garland - bottom right */}
      <motion.div
        className="fixed bottom-20 right-8 text-3xl md:text-4xl opacity-20 pointer-events-none"
        animate={{
          x: [5, -5, 5],
          y: [-5, 0, -5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.2,
        }}
      >
        🧡
      </motion.div>
      </main>
    </>
  );
}
