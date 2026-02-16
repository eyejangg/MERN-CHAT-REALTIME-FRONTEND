import { create } from "zustand";
import { THEMES } from "../constants/themes";

const applyTheme = (themeName) => {
    const found = THEMES.find((t) => t.name === themeName);
    if (!found) return;
    const root = document.documentElement;
    root.style.setProperty("--color-base-100", found.colors[0]);
    root.style.setProperty("--color-base-200", found.colors[1]);
    root.style.setProperty("--color-base-300", found.colors[2]);
    root.style.setProperty("--color-base-content", found.colors[3]);
    root.style.setProperty("--color-primary", found.colors[4]);
};

export const useThemeStore = create((set) => ({
    theme: localStorage.getItem("chat-theme") || "dark",

    setTheme: (themeName) => {
        localStorage.setItem("chat-theme", themeName);
        applyTheme(themeName);
        set({ theme: themeName });
    },

    initTheme: () => {
        const saved = localStorage.getItem("chat-theme") || "dark";
        applyTheme(saved);
    },
}));
