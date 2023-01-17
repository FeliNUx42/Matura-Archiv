import { darkMode } from "./stores.js"

export const initMode = () => {
  if ("theme" in localStorage) {
    darkMode.set(localStorage.theme === "dark")
    return;
  };

  let dark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  darkMode.set(dark)
  localStorage.theme = dark ? "dark" : "light";
}

export const toggleMode = () => {
  darkMode.update(n => {
    localStorage.theme = !n ? "dark" : "light";
    return !n;
  });
}