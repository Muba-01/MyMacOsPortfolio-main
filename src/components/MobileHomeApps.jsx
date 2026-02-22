import React from 'react';
import useWindowStore from '#store/window.js';

const homeApps = [
  { id: 'terminal', label: 'Terminal', icon: '/images/terminal.png' },
  { id: 'resume', label: 'Resume', icon: '/images/pages.png' },
];

const MobileHomeApps = () => {
  const { openWindow, windows } = useWindowStore();
  const isAnyWindowOpen = Object.values(windows).some((windowItem) => windowItem?.isOpen);

  if (isAnyWindowOpen) return null;

  return (
    <section className="md:hidden fixed top-20 left-0 right-0 px-3 z-10">
      <div className="grid grid-cols-4 gap-y-7 gap-x-2 justify-items-center">
        {homeApps.map((app) => (
          <button
            key={app.id}
            type="button"
            onClick={() => openWindow(app.id)}
            className="flex flex-col items-center gap-2 active:scale-95 transition"
            aria-label={app.label}
          >
            <span className="flex h-17 w-17 items-center justify-center rounded-2xl bg-white/20 shadow-lg backdrop-blur-sm">
              <img src={app.icon} alt={app.label} className="h-13 w-13 object-contain" />
            </span>
            <span className="text-sm text-white font-medium">{app.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default MobileHomeApps;