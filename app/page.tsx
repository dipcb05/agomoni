'use client';

import { motion, type Variants } from 'framer-motion';
import { CountdownCard } from '@/components/CountdownCard';
import { AudioControl } from '@/components/AudioControl';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { DholPlayer } from '@/components/DholPlayer';
import { NotificationSubscribe } from '@/components/NotificationSubscribe';
import { Footer } from '@/components/Footer';

export default function Home() {
  // Durga Puja 2026 main day (Maha Saptami): October 18, 2026
  const durgaPujaDate = new Date('2026-10-18T00:00:00+06:00');
  // Mahalaya 2026: October 10, 2026
  const mahalayaDate = new Date('2026-10-10T00:00:00+06:00');

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
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
        <NotificationSubscribe />

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
            মা আসছেন!
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
            title="মহালয়ার আর বাকি"
            targetDate={mahalayaDate}
          />
        </motion.div>

        {/* Feature Suggestions */}
        <motion.section
          variants={itemVariants}
          className="w-full max-w-2xl rounded-2xl border border-border bg-card/75 p-5 sm:p-8 md:p-10 sm:backdrop-blur-md"
        >
          <div className="mb-6 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              আরো ফিচার আইডিয়া
            </p>
            <h2 className="text-2xl font-bold text-primary md:text-3xl">
              agomoni-তে এরপর যা যোগ করা যায়
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { icon: '📅', title: 'পূজার দিনপঞ্জি', text: 'ষষ্ঠী থেকে দশমী পর্যন্ত তিথি, সময় আর ছোট্ট নোট।' },
              { icon: '🔔', title: 'দিনভিত্তিক রিমাইন্ডার', text: 'মহালয়া, ষষ্ঠী, অষ্টমী আর বিসর্জনের আগে আলাদা নোটিফিকেশন।' },
              { icon: '🥁', title: 'ঢাক ও মন্ত্র সাউন্ডবোর্ড', text: 'ঢাক, শঙ্খ, উলুধ্বনি আর চণ্ডীপাঠের ছোট অডিও ক্লিপ।' },
              { icon: '🗺️', title: 'প্যান্ডেল প্ল্যানার', text: 'পছন্দের প্যান্ডেল সেভ করে নিজের ঘোরার রুট বানানো।' },
            ].map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-primary/15 bg-background/55 p-4 transition-colors duration-300 hover:border-primary/40"
              >
                <div className="mb-3 text-2xl" aria-hidden="true">
                  {feature.icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-primary">
                  {feature.title}
                </h3>
                <p className="text-sm leading-6 text-muted-foreground">
                  {feature.text}
                </p>
              </div>
            ))}
          </div>
        </motion.section>


      </motion.div>

      <Footer />

      {/* Conch shell decoration - top left */}
      <motion.div
        className="fixed top-12 left-4 sm:left-8 hidden sm:block text-3xl sm:text-4xl md:text-5xl opacity-20 pointer-events-none will-change-transform"
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
        className="fixed top-12 right-4 sm:right-8 hidden sm:block text-3xl sm:text-4xl md:text-5xl opacity-20 pointer-events-none will-change-transform"
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
        className="fixed bottom-20 left-8 hidden sm:block text-3xl md:text-4xl opacity-20 pointer-events-none will-change-transform"
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
        className="fixed bottom-20 right-8 hidden sm:block text-3xl md:text-4xl opacity-20 pointer-events-none will-change-transform"
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
