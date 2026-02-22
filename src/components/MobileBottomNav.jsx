import React from 'react';
import useWindowStore from '#store/window.js';

const mobileApps = [
  { id: 'finder', name: 'Finder', icon: 'finder.png' },
  { id: 'safari', name: 'Articles', icon: 'safari.png' },
  { id: 'photos', name: 'Gallery', icon: 'photos.png' },
  { id: 'contact', name: 'Contact', icon: 'contact.png' },
];

const MobileBottomNav = () => {
  const { openWindow, closeWindow, windows } = useWindowStore();
  const isAnyWindowOpen = Object.values(windows).some((windowItem) => windowItem?.isOpen);

  const handleToggle = (appId) => {
    const windowItem = windows[appId];
    if (!windowItem) return;

    if (windowItem.isOpen) {
      closeWindow(appId);
      return;
    }

    openWindow(appId);
  };

  if (isAnyWindowOpen) return null;

  return (
    <section className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[88vw] max-w-88">
      <div className="flex items-center justify-center gap-3 rounded-[1.6rem] border border-white/30 bg-white/25 px-3 py-2.5 shadow-lg backdrop-blur-xl">
        {mobileApps.map((app) => {
          const isOpen = windows[app.id]?.isOpen;

          return (
            <button
              key={app.id}
              type="button"
              aria-label={app.name}
              onClick={() => handleToggle(app.id)}
              className="relative flex h-14 w-14 items-center justify-center rounded-xl transition active:scale-95"
            >
              <img src={`/images/${app.icon}`} alt={app.name} className="h-13 w-13 object-contain" />
              {isOpen && <span className="absolute -bottom-1 h-1.5 w-1.5 rounded-full bg-white" />}
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default MobileBottomNav;