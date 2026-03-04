# My macOS Portfolio

## Overview

This project is an interactive portfolio experience that recreates a macOS-inspired desktop environment in the browser, with a dedicated mobile adaptation that mirrors iOS interaction patterns.

On desktop, users interact with draggable app windows, a dock, and Finder-like navigation. On mobile, the interface switches to a full-screen app flow with a notch/status bar, bottom app launcher, and touch-first navigation.

## Features

### Desktop Features

- macOS-style desktop layout with wallpaper, top navbar, dock, and floating app windows.
- Draggable windows powered by GSAP Draggable for Finder, Safari, Photos, Contact, Terminal, Resume, and file previews.
- Window lifecycle and layering (open/close/focus/z-index) managed through centralized Zustand state.
- Finder-style project navigation with folder hierarchy and file interactions (open text/image preview, open links, open PDF resume).
- Dock with hover magnification animation and quick app toggling.
- Window open/maximize/restore animations using GSAP.

### Mobile Features

- iOS-style visual adaptation with a notch/status region and mobile bottom app launcher.
- Full-screen app windows for touch-first interaction.
- Mobile Finder flow with stack-based folder navigation and back behavior.
- Mobile app home shortcuts (e.g., Terminal and Resume) displayed when no app window is active.
- Responsive Resume viewer optimized for viewport width with mobile close/back controls.

## Tech Stack

### React

React is used to build all UI layers as reusable components (desktop shell, mobile shell, windows, and shared controls). It also drives conditional rendering between desktop and mobile views through runtime viewport logic.

### Vite

Vite provides the development server, fast rebuild pipeline, and production bundling. The project also uses Vite alias resolution (`#components`, `#store`, `#windows`, etc.) to keep imports clean and maintainable.

### Tailwind CSS (v4)

Tailwind is the primary styling framework. The project uses utility classes and custom layers/utilities in `src/index.css` to implement macOS/iOS-like UI primitives (window headers, dock visuals, layout behavior, and responsive rules).

### GSAP + Draggable

GSAP powers motion across the interface:

- Window entrance and maximize/restore transitions.
- Dock icon hover dynamics.
- Typography hover animation in the welcome section.
- Window dragging via `Draggable` in the window wrapper and draggable home folder icons.

### react-pdf + pdfjs-dist

The Resume app uses `react-pdf` with a `pdfjs-dist` worker to render `/public/files/resume.pdf` pages directly inside the windowed UI. A browser `iframe` fallback is implemented when PDF rendering fails.

### State Management (Zustand + Immer)

Two dedicated stores coordinate app behavior:

- `window` store: open/close/focus, z-index ordering, maximize state, and file payload data.
- `location` store: active Finder location/folder context.

`immer` middleware enables concise immutable updates for nested state.

### Additional Dependencies

- `lucide-react`: icon system across windows and controls.
- `react-tooltip`: dock tooltips.
- `dayjs`: live clock formatting for navbar/notch time.
- `clsx`: conditional class management in Finder and home icons.

## Architecture Explanation

### Desktop vs Mobile Layout Separation

- `useIsMobile` (`< 768px`) determines runtime behavior and rendering mode.
- Desktop mode uses floating windows with draggable/focus/z-index behavior.
- Mobile mode uses full-screen app surfaces with explicit back navigation and hidden dock/home while windows are open.

### Component Structure

- `App.jsx` composes the shell and mounts all window modules.
- `src/components` contains shared desktop/mobile shell components (`Navbar`, `Dock`, `Home`, `MobileNotch`, `MobileBottomNav`, `MobileHomeApps`, `WindowControls`).
- `src/windows` encapsulates app content modules (`Finder`, `Safari`, `Photos`, `Terminal`, `Resume`, `Contact`, `text`, `image`).
- `src/hoc/WindowWrapper.jsx` provides shared window lifecycle behavior (visibility, animation, drag, maximize behavior).

### Window Management Logic

Window state lives in `src/store/window.js`:

- `openWindow`: opens a target window and assigns top z-index; on mobile, closes other windows for a single-active-window model.
- `closeWindow`: hides and resets a window.
- `focusWindow`: updates z-index to bring selected window to front (desktop only).
- `toggleMaximize`: toggles maximize state and restores previous bounds.
- `setWindowBounds`: supports storing/restoring geometry.

### Finder Folder Navigation Logic

- Finder content is data-driven by `locations` in `src/constants/index.js`.
- Desktop Finder uses `activeLocation` from `location` store for sidebar/content rendering.
- Item behavior:
	- folder → set active location
	- pdf → open Resume window
	- external url/fig link → open in new tab
	- text/image file → open corresponding preview window with payload data
- Mobile Finder maintains a local `mobilePath` stack to support drill-down and back navigation.

## Installation Instructions

### 1) Clone

```bash
git clone https://github.com/Muba-01/MyMacOsPortfolio-main.git
cd MyMacOsPortfolio-main
```

### 2) Install dependencies

```bash
npm install
```

### 3) Run development server

```bash
npm run dev
```

### 4) Build for production

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Folder Structure Overview

```text
.
├── public/
│   ├── files/          # Static assets such as resume PDF
│   ├── icons/
│   └── images/
├── src/
│   ├── components/     # Shell UI and shared UI pieces
│   ├── constants/      # Dock/nav data, Finder tree, window config
│   ├── hoc/            # Window wrapper behavior (drag/animation/display)
│   ├── hooks/          # Responsive utility hooks
│   ├── store/          # Zustand stores (window + location)
│   ├── windows/        # App window modules (Finder, Safari, Resume, etc.)
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── vite.config.js
└── package.json
```

## Future Improvements

- Persist window/layout state and last opened context across sessions.
- Add keyboard shortcuts for window/app navigation and accessibility parity.
- Improve Finder search/filtering and richer file metadata previews.
- Introduce theme variations (e.g., dark mode) while preserving platform-inspired aesthetics.
- Expand automated testing coverage for store logic and key interactive flows.
