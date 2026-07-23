const FESTIVAL_REMINDERS = [
  {
    key: 'mahalaya',
    name: 'মহালয়া',
    date: '2026-10-10T00:00:00+06:00',
    message: 'আগামীকাল মহালয়া। ভোরে চণ্ডীপাঠ শুনতে ভুলবেন না।',
  },
  {
    key: 'shashthi',
    name: 'ষষ্ঠী',
    date: '2026-10-17T00:00:00+06:00',
    message: 'আগামীকাল ষষ্ঠী। মায়ের বোধন ও আমন্ত্রণের প্রস্তুতি নিন।',
  },
  {
    key: 'ashtami',
    name: 'অষ্টমী',
    date: '2026-10-19T00:00:00+06:00',
    message: 'আগামীকাল অষ্টমী। পুষ্পাঞ্জলি ও সন্ধিপূজার সময় দেখে রাখুন।',
  },
  {
    key: 'bisarjan',
    name: 'বিসর্জন',
    date: '2026-10-21T00:00:00+06:00',
    message: 'আগামীকাল দশমী ও বিসর্জন। সিঁদুর খেলা আর বিদায়ের প্রস্তুতি নিন।',
  },
]

const getBangladeshDate = (now: Date) =>
  new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Dhaka' }))

const getBangladeshDayKey = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
    date.getDate()
  ).padStart(2, '0')}`

const getReminderSendDateKey = (festivalDate: string) => {
  const [year, month, day] = festivalDate
    .slice(0, 10)
    .split('-')
    .map(Number)
  const date = new Date(year, month - 1, day)
  date.setDate(date.getDate() - 1)

  return getBangladeshDayKey(date)
}

export const getDailyNotification = (now = new Date()) => {
  const todayKey = getBangladeshDayKey(getBangladeshDate(now))
  const reminders = FESTIVAL_REMINDERS.filter(
    (festival) => getReminderSendDateKey(festival.date) === todayKey
  )

  if (reminders.length === 0) {
    return null
  }

  return {
    title: 'agomoni',
    body: reminders.map((festival) => festival.message).join(' • '),
    events: reminders.map((festival) => festival.name),
  }
}
