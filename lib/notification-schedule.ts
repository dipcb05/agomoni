const FESTIVALS = [
  { name: 'Mahalaya', date: '2026-10-10T00:00:00+06:00' },
  { name: 'Durga Puja', date: '2026-10-18T00:00:00+06:00' },
]

const banglaMonthCount = (months: number) => {
  if (months === 1) {
    return '১ মাস'
  }

  if (months === 2) {
    return '২ মাস'
  }

  return `${months} মাস`
}

export const getDailyNotification = (now = new Date()) => {
  const bangladeshDate = new Date(
    now.toLocaleString('en-US', { timeZone: 'Asia/Dhaka' })
  )
  const dayOfMonth = bangladeshDate.getDate()

  if (dayOfMonth !== 10 && dayOfMonth !== 18) {
    return null
  }

  const upcoming = FESTIVALS.map((festival) => {
    const target = new Date(festival.date)
    const months =
      (target.getUTCFullYear() - bangladeshDate.getUTCFullYear()) * 12 +
      target.getUTCMonth() -
      bangladeshDate.getUTCMonth()

    return { ...festival, months }
  }).filter((festival) => festival.months > 0)

  if (upcoming.length === 0) {
    return null
  }

  const lines = upcoming.map((festival) => {
    const prefix = festival.name === 'Mahalaya' ? 'মহালয়ার' : 'পূজোর'
    return `আর ${banglaMonthCount(festival.months)} আছে ${prefix}`
  })

  return {
    title: 'মা আসছেন',
    body: lines.join(' • '),
  }
}
