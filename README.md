# মা আসছেন — Durga Puja 2026 Countdown

A polished Bengali festival countdown web app for Durga Puja 2026 and Mahalaya 2026. The app combines a live countdown, animated Durga Puja-inspired visuals, dhol animation, optional devotional audio, and installable PWA metadata.

## ✨ Features

- Live countdown cards for:
  - **Mahalaya 2026** — October 10, 2026
  - **Durga Puja 2026** — October 16, 2026
- Bengali-first visual identity with the headline **মা আসছেন**.
- Animated background with particles, diyas, shiuli flowers, alpana details, smoke, and festive decorations.
- Dhol player animation built with SVG and Framer Motion.
- Optional looping audio control using `public/shuvo_shuvo.mp3`.
- PWA manifest and production-only service worker registration, with the automatic install prompt suppressed.
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
  PWAInstallPrompt.tsx
public/
  bg_image.png      Main background image
  icon.png          App icon
  manifest.json     PWA manifest
  shuvo_shuvo.mp3   Audio track
  sw.js             Production service worker
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

The app keeps its PWA manifest and production service worker, but suppresses the browser's automatic install prompt so visitors do not see an Install/Not Now dialog. Development still unregisters stale service workers to avoid cached Next.js chunks and HMR issues such as:

```text
Internal Next.js error: Router action dispatched before initialization.
```

If you previously opened an older development build in the same browser, clear site data once or unregister any old service worker from DevTools → Application → Service Workers.

## 🎨 Customization

- Update festival dates in `app/page.tsx`.
- Replace `public/bg_image.png` to change the main background artwork.
- Replace `public/shuvo_shuvo.mp3` to change the audio track.
- Adjust colors and tokens in `app/globals.css`.
- Update app install metadata in `public/manifest.json` and `app/layout.tsx`.

## 📄 License

This project is licensed under the MIT License. See [LICENSE](./LICENSE) for details.
