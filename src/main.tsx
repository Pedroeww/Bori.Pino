import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Suppress benign Vite WebSocket / HMR errors from triggering unhandled promise rejection overlays
const shouldSuppress = (msg: string): boolean => {
  const lowerMsg = msg.toLowerCase();
  return (
    lowerMsg.includes("websocket") ||
    lowerMsg.includes("[vite]") ||
    lowerMsg.includes("web socket") ||
    lowerMsg.includes("failed to connect to websocket")
  );
};

window.addEventListener("unhandledrejection", (event) => {
  const reason = event.reason;
  const msg = reason?.message || String(reason || "");
  if (shouldSuppress(msg)) {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
  }
}, true);

window.addEventListener("error", (event) => {
  const msg = event.message || "";
  if (shouldSuppress(msg)) {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
  }
}, true);

// Clean up console outputs as well for a seamless development experience
const originalConsoleError = console.error;
console.error = (...args: any[]) => {
  const msg = args.map(arg => String(arg?.message || arg || "")).join(" ");
  if (shouldSuppress(msg)) {
    return;
  }
  originalConsoleError.apply(console, args);
};

const originalConsoleWarn = console.warn;
console.warn = (...args: any[]) => {
  const msg = args.map(arg => String(arg?.message || arg || "")).join(" ");
  if (shouldSuppress(msg)) {
    return;
  }
  originalConsoleWarn.apply(console, args);
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

