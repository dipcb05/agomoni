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

        {/* Countdown Section */}
        <motion.section
          variants={itemVariants}
          className="w-full max-w-4xl rounded-3xl border border-border bg-card/80 p-5 shadow-2xl shadow-black/30 sm:p-8 md:p-10 sm:backdrop-blur-md"
        >
          <div className="mb-6 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.28em] text-muted-foreground">
              আগমনী সময়
            </p>
            <h2 className="text-2xl font-bold text-primary md:text-3xl">
              উৎসবের কাউন্টডাউন
            </h2>
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            <CountdownCard
              title="দুর্গাপূজার আর বাকি"
              targetDate={durgaPujaDate}
            />
            <CountdownCard
              title="মহালয়ার আর বাকি"
              targetDate={mahalayaDate}
            />
          </div>
        </motion.section>

        {/* Puja Features */}
        <motion.section
          variants={itemVariants}
          className="w-full max-w-4xl rounded-3xl border border-border bg-card/80 p-5 shadow-2xl shadow-black/30 sm:p-8 md:p-10 sm:backdrop-blur-md"
        >
          <div className="mb-8 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.28em] text-muted-foreground">
              পূজার প্রস্তুতি
            </p>
            <h2 className="text-2xl font-bold text-primary md:text-4xl">
              agomoni-তে যা থাকছে
            </h2>
          </div>

          <div className="grid gap-5">
            <article className="rounded-2xl border border-primary/15 bg-background/55 p-5">
              <div className="mb-4 flex items-center gap-3">
                <span className="text-3xl" aria-hidden="true">📅</span>
                <div>
                  <h3 className="text-2xl font-bold text-primary">পূজার দিনপঞ্জি</h3>
                  <p className="text-sm text-muted-foreground">ষষ্ঠী থেকে দশমী পর্যন্ত তিথি, সময় আর ছোট্ট নোট।</p>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {[
                  { day: 'ষষ্ঠী', date: '১৭ অক্টোবর', time: 'সন্ধ্যা', note: 'বোধন ও আমন্ত্রণ' },
                  { day: 'সপ্তমী', date: '১৮ অক্টোবর', time: 'সকাল', note: 'নবপত্রিকা স্নান' },
                  { day: 'অষ্টমী', date: '১৯ অক্টোবর', time: 'সকাল/সন্ধ্যা', note: 'পুষ্পাঞ্জলি ও সন্ধিপূজা' },
                  { day: 'নবমী', date: '২০ অক্টোবর', time: 'দিনভর', note: 'মহানবমী পূজা' },
                  { day: 'দশমী', date: '২১ অক্টোবর', time: 'বিকেল', note: 'সিঁদুর খেলা ও বিসর্জন' },
                ].map((item) => (
                  <div key={item.day} className="rounded-xl border border-primary/15 bg-card/60 p-4 text-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">{item.date}</p>
                    <h4 className="my-2 text-xl font-bold text-primary">{item.day}</h4>
                    <p className="mb-2 text-xs font-semibold text-accent">সময়: {item.time}</p>
                    <p className="text-sm leading-6 text-muted-foreground">{item.note}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-2xl border border-primary/15 bg-background/55 p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl" aria-hidden="true">🔔</span>
                  <div>
                    <h3 className="text-2xl font-bold text-primary">দিনভিত্তিক রিমাইন্ডার</h3>
                    <p className="text-sm leading-6 text-muted-foreground">মহালয়া, ষষ্ঠী, অষ্টমী আর বিসর্জনের আগে আলাদা নোটিফিকেশন পাঠানো হবে।</p>
                  </div>
                </div>
                <p className="rounded-full border border-primary/20 bg-card/70 px-4 py-2 text-sm font-semibold text-primary">
                  🔔 Notification on করুন
                </p>
              </div>
            </article>

            <article className="rounded-2xl border border-primary/15 bg-background/55 p-5">
              <div className="mb-4 flex items-center gap-3">
                <span className="text-3xl" aria-hidden="true">🎧</span>
                <div>
                  <h3 className="text-2xl font-bold text-primary">মহালয়া শুনুন</h3>
                  <p className="text-sm text-muted-foreground">চণ্ডীপাঠ শুনতে নিচের প্লেয়ার চালু করুন।</p>
                </div>
              </div>
              <div className="overflow-hidden rounded-2xl border border-primary/15 bg-black/40">
                <iframe
                  className="aspect-video w-full"
                  src="https://www.youtube.com/embed/AnrGifI3WHk"
                  title="মহালয়া শুনুন - চণ্ডীপাঠ"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </article>

            <article className="rounded-2xl border border-primary/15 bg-background/55 p-5">
              <div className="mb-4 flex items-center gap-3">
                <span className="text-3xl" aria-hidden="true">🌺</span>
                <div>
                  <h3 className="text-2xl font-bold text-primary">পুষ্পাঞ্জলির মন্ত্র</h3>
                  <p className="text-sm text-muted-foreground">যেখানে দরকার সেখানে খুলে মন্ত্র দেখুন।</p>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { title: 'আচমন ও বিষ্ণুস্মরণ', text: `আচমন: বাঁ হাতে জল নিয়ে ডান হাতের সমস্ত আঙ্গুলের অগ্রভাগ বাঁ হাতের জলে ডুবিয়ে মুখে ৩ /১ বার ছিটাতে হয়।\n\nনমঃ বিষ্ণুঃ নমঃ বিষ্ণু নমঃ বিষ্ণু\n\nবিষ্ণুস্মরণ: হাত জোরকরে\n\nনমঃ অপবিত্রঃ পবিত্রো বা সর্বাবস্থাং গতো হপি বা।\n\nযঃ স্মরেত্ পুন্ডরীকাক্ষং সবাহ্যাভ্যন্তরঃ শুচিঃ।।\n\nনমঃ সর্বমঙ্গলমঙ্গল্যং বরেণ্যং বরদং শুভম্।\n\nনারায়ণং নমস্কৃত্য সর্বকর্ম্মাণি কারয়েত্।।` },
                  { title: 'সপ্তমী', text: `সচন্দনপুষ্প ও বিল্বপত্র নিয়ে বলুন\n\n১. নমঃ আয়ুর্দ্দেহি যশো দেহি ভাগ্যং ভগবতি দেহি মে | পুত্রান্ দেহি ধনং দেহি সর্ব্বান্ কামাশ্চ দেহি মে ||\n\n২. হর পাপং হর ক্লেশং হর শোকং হরাসুখম্। হর রোগং হর ক্ষোভং হর মারীং হরপ্রিয়ে।। এষ সচন্দন-পুষ্পবিল্বপত্রাঞ্জলিঃ নমঃ দক্ষযঞ্জ বিনাশিন্যে মহাঘোরায়ৈ যোগিনী কোটিপরিবৃতায়ৈ ভদ্রকাল্যৈ ভগবত্যৈ দুর্গায়ৈ নমঃ।।\n\n৩. সংগ্রামে বিজয়ং দেহি ধনং দেহি সদা গৃহে | ধর্ম্মার্থকামসম্পত্তিং দেহি দেবী নমোস্তু তে।। এষ সচন্দন-পুষ্পবিল্বপত্রাঞ্জলিঃ নমঃ দক্ষযজ্ঞ বিনাশিন্যে মহাঘোরায়ৈ যোগিনী কোটিপরিবৃতায়ৈ ভদ্রকাল্যৈ ভগবত্যৈ দুর্গায়ৈ নমঃ।।\n\nপ্রণাম মন্ত্র:\nসর্বমঙ্গলমঙ্গল্যে শিবে সর্বাথসাধিকে।\nশরণ্যে ত্র্যম্বকে গৌরি নারায়ণি নমোস্তু তে।।` },
                  { title: 'অষ্টমী', text: `১. নমঃ মহিষগ্নি মহামায়ে চামুন্ডে মুন্ডমালিনি। আয়ুরারোগ্য বিজয়ং দেহি দেবী নমোস্তুতে।।\n২. নমঃ সৃষ্টিস্তিতিবিনাশানাং শক্তিভূতে সনাতনি। গুণাশ্রয়ে গুণময়ে নারায়ণি নমোস্তু তে।।\n৩. নমঃ শরণাগতদীর্নাত পরিত্রাণপরায়ণে। সর্বস্যাতিহরে দেবী নারায়ণি নমোস্তু তে।।\nএষ সচন্দন-পুষ্পবিল্বপত্রাঞ্জলিঃ নমঃ দক্ষযজ্ঞ বিনাশিন্যে মহাঘোরায়ৈ যোগিনী কোটিপরিবৃতায়ৈ ভদ্রকাল্যৈ ভগবত্যৈ দুর্গায়ৈ নমঃ।।\n\nপ্রণাম মন্ত্র: জয়ন্তী মঙ্গলা কালী ভদ্রকালী কপালিনী | দুর্গা শিবা ক্ষমা ধাত্রী স্বাহা স্বধা নমোস্তু তে।।` },
                  { title: 'নবমী', text: `১. কালি কালি মহাকালি কালিকে কালরাত্রিকে | ধম্মকামপ্রদে দেবি নারায়ণি নমোস্তু তে ||\n২. লক্ষ্মি লজ্জে মহাবিদ্যে শ্রদ্ধে পুষ্টি স্বধে ধ্রুবে | মহারাত্রি মহামায়ে নারায়ণি নমোস্তু তে ||\n৩. কলাকাষ্ঠাদিরূপেণ পরিণামপ্রদায়িনি | বিশ্বস্যোপরতৌ শক্তে নারায়ণি নমোস্তু তে ||\nএষ সচন্দন-পুষ্পবিল্বপত্রাঞ্জলিঃ নমঃ দক্ষযঞ্জ বিনাশিন্যে মহাঘোরায়ৈ যোগিনী কোটিপরিবৃতায়ৈ ভদ্রকাল্যৈ ভগবত্যৈ দুর্গায়ৈ নমঃ ||\n\nপ্রনাম মন্ত্র :- সর্বস্বরূপে সর্বেশে সর্বশক্তিসমন্বি তে | ভয়েভ্যস্ত্রাহি নো দেবি দুর্গে দেবি নমোস্তু তে ||` },
                ].map((section) => (
                  <details key={section.title} className="group rounded-xl border border-primary/15 bg-card/60 p-4">
                    <summary className="cursor-pointer list-none text-lg font-semibold text-primary">
                      <span className="mr-2 inline-block transition-transform group-open:rotate-90">›</span>
                      {section.title}
                    </summary>
                    <p className="mt-4 whitespace-pre-line text-sm leading-7 text-muted-foreground">{section.text}</p>
                  </details>
                ))}
              </div>
            </article>
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
