import { INITIAL_Z_INDEX, WINDOW_CONFIG } from '#constants';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

const useWindowStore = create(immer((set) => ({ // Changed to return an object directly
    windows: WINDOW_CONFIG,
    nextZIndex: INITIAL_Z_INDEX + 1,

    openWindow: (windowKey, data = null) => set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;
        const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

        if (isMobile) {
            Object.keys(state.windows).forEach((key) => {
                if (key !== windowKey) {
                    state.windows[key].isOpen = false;
                }
            });
        }

        win.isOpen = true;
        if (!isMobile) {
            win.zIndex = state.nextZIndex;
            state.nextZIndex ++;
        }
        win.data = data ?? win.data;
    }), 

    closeWindow: (windowKey) => set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;
        win.isOpen = false;
        win.zIndex = INITIAL_Z_INDEX;
        win.data = null;
    }), 

    focusWindow: (windowKey) => set((state) => {
        if (typeof window !== 'undefined' && window.innerWidth < 768) return;
        const win = state.windows[windowKey];
        win.zIndex = state.nextZIndex++;
    }), 
    toggleMaximize: (windowKey) => set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;
        if (!win.isMaximized) {
            // save current bounds so we can restore later
            win.prevBounds = win.bounds ?? null;
            win.isMaximized = true;
        } else {
            win.isMaximized = false;
            if (win.prevBounds) {
                win.bounds = win.prevBounds;
                win.prevBounds = null;
            }
        }
    }),

    setWindowBounds: (windowKey, bounds) => set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;
        win.bounds = bounds;
    }),
}))); 

export default useWindowStore;