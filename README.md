# মা আসছেন — Durga Puja 2026 Countdown

A polished Bengali festival countdown web app for Durga Puja 2026 and Mahalaya 2026. The app combines a live countdown, animated Durga Puja-inspired visuals, dhol animation, optional devotional audio, and a distraction-free full-screen festival experience.

## ✨ Features

- Live countdown cards for:
  - **Mahalaya 2026** — October 10, 2026
  - **Durga Puja 2026** — October 16, 2026
- Bengali-first visual identity with the headline **মা আসছেন**.
- Animated background with particles, diyas, shiuli flowers, alpana details, smoke, and festive decorations.
- Dhol player animation built with SVG and Framer Motion.
- Optional looping audio control using `public/shuvo_shuvo.mp3`.
- Install prompts are intentionally disabled so visitors are not interrupted by browser install banners.
- Responsive layout for mobile, tablet, and desktop screens.

## 🧰 Tech Stack

- [Next.js](https://nextjs.org/) 16 App Router
- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) 4
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide React](https://lucide.dev/)
- [Vercel Analytics](https://vercel.com/analytics)

## 📁 Project Structure

```text
app/
  layout.tsx        App metadata, viewport, analytics, and global layout
  page.tsx          Main countdown page
  globals.css       Theme tokens, Tailwind imports, and global styles
components/
  AnimatedBackground.tsx
  AudioControl.tsx
  CountdownCard.tsx
  DholPlayer.tsx
  DisableInstallPrompt.tsx
public/
  bg_image.png      Main background image
  icon.png          App icon
  shuvo_shuvo.mp3   Audio track
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20 or newer recommended
- pnpm 9 or newer recommended

### Install Dependencies

```bash
pnpm install
```

### Run the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
pnpm build
```

### Start the Production Server

```bash
pnpm start
```

### Lint

```bash
pnpm lint
```

## 🛠️ Notes for Development

Browser install prompts and stale service workers are disabled. This avoids install popups and stale cached Next.js development chunks that can trigger HMR issues such as:

```text
Internal Next.js error: Router action dispatched before initialization.
```

If you previously opened an older build in the same browser and still see an install prompt, clear site data once from DevTools → Application → Storage.

## 🎨 Customization

- Update festival dates in `app/page.tsx`.
- Replace `public/bg_image.png` to change the main background artwork.
- Replace `public/shuvo_shuvo.mp3` to change the audio track.
- Adjust colors and tokens in `app/globals.css`.
- Update metadata in `app/layout.tsx`.

## 📄 License

This project is licensed under the MIT License. See [LICENSE](./LICENSE) for details.
