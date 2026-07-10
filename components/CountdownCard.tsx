'use client';

import { useEffect, useState } from 'react';
import { motion, type Variants } from 'framer-motion';

interface CountdownValue {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownCardProps {
  title: string;
  targetDate: Date;
  subtitle?: string;
}

export function CountdownCard({
  title,
  targetDate,
  subtitle,
}: CountdownCardProps) {
  const [countdown, setCountdown] = useState<CountdownValue>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const calculateCountdown = () => {
      // Create dates in Asia/Dhaka timezone
      const now = new Date();
      const dhakaNow = new Date(
        now.toLocaleString('en-US', { timeZone: 'Asia/Dhaka' })
      );
      const dhakaBerlin = new Date(
        targetDate.toLocaleString('en-US', { timeZone: 'Asia/Dhaka' })
      );

      const difference = dhakaBerlin.getTime() - dhakaNow.getTime();

      if (difference <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (difference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds });
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const containerVariants: Variants = {
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

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: 'easeOut',
      },
    }),
  };

  if (!mounted) {
    return null;
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      <div className="backdrop-blur-md bg-card/40 border border-border rounded-2xl p-8 md:p-10 hover:border-primary/40 transition-colors duration-300">
        {/* Title Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2 text-balance">
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm md:text-base text-muted-foreground">
              {subtitle}
            </p>
          )}
        </div>

        {/* Countdown Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {[
            { label: 'Days', value: countdown.days },
            { label: 'Hours', value: countdown.hours },
            { label: 'Minutes', value: countdown.minutes },
            { label: 'Seconds', value: countdown.seconds },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              variants={itemVariants}
              custom={i}
              initial="hidden"
              animate="visible"
              className="relative"
            >
              <div className="backdrop-blur-sm bg-background/50 border border-primary/20 rounded-lg p-3 md:p-4 text-center group hover:border-primary/40 transition-all duration-300">
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl bg-primary/20" />

                <div className="text-2xl md:text-4xl font-bold text-primary font-mono tabular-nums">
                  {String(item.value).padStart(2, '0')}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground mt-1 uppercase tracking-wider">
                  {item.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
