import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { PLAY_STORE_URL, APP_STORE_URL } from "../lib/links";

// Detect the visitor's mobile platform so "Get the App" points to the right store.
// Returns "ios", "android", or null (desktop / unknown).
function detectPlatform() {
  if (typeof navigator === "undefined") return null;
  const ua = navigator.userAgent || navigator.vendor || "";
  if (/iPhone|iPad|iPod/i.test(ua)) return "ios";
  // iPadOS 13+ masquerades as macOS; treat touch-capable Macs as iOS.
  if (/Macintosh/i.test(ua) && navigator.maxTouchPoints > 1) return "ios";
  if (/Android/i.test(ua)) return "android";
  return null;
}

const BTN_STYLE = { background: "linear-gradient(135deg,#0D6B6E,#3EC6C8)" };

export default function GetAppButton({ fullWidth = false, onNavigate }) {
  const [platform] = useState(detectPlatform);
  const [menuOpen, setMenuOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("keydown", (e) => e.key === "Escape" && setMenuOpen(false));
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  const btnClass = `cta-btn px-5 py-2.5 rounded-full text-sm font-semibold text-white ${
    fullWidth ? "w-full" : ""
  } inline-flex items-center justify-center gap-1.5`;

  // Known mobile platform → direct link to the matching store.
  if (platform === "ios" || platform === "android") {
    const url = platform === "ios" ? APP_STORE_URL : PLAY_STORE_URL;
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onNavigate}
        className={btnClass}
        style={BTN_STYLE}
      >
        Get the App
      </a>
    );
  }

  // Desktop / unknown → let the visitor pick a store.
  const stores = [
    { label: "App Store", url: APP_STORE_URL },
    { label: "Google Play", url: PLAY_STORE_URL },
  ];

  return (
    <div ref={ref} className={`relative ${fullWidth ? "w-full" : "inline-block"}`}>
      <button
        type="button"
        onClick={() => setMenuOpen((v) => !v)}
        className={btnClass}
        style={BTN_STYLE}
        aria-haspopup="menu"
        aria-expanded={menuOpen}
      >
        Get the App
        <ChevronDown className={`w-4 h-4 transition-transform ${menuOpen ? "rotate-180" : ""}`} />
      </button>

      {menuOpen && (
        <div
          role="menu"
          className={`absolute right-0 mt-2 ${
            fullWidth ? "w-full" : "w-48"
          } bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50`}
        >
          {stores.map(({ label, url }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              role="menuitem"
              onClick={() => {
                setMenuOpen(false);
                onNavigate?.();
              }}
              className="block px-4 py-3 text-sm font-medium text-navy hover:bg-gray-50 transition-colors"
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
