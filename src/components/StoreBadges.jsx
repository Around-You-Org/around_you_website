import { PLAY_STORE_URL } from "../lib/links";

function GooglePlayLogo({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="gp-a" x1="315.3" y1="90.6" x2="-4.6" y2="410.4" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#00a0ff" />
          <stop offset=".26" stopColor="#00beff" />
          <stop offset=".51" stopColor="#00d2ff" />
          <stop offset=".76" stopColor="#00dfff" />
          <stop offset="1" stopColor="#00e3ff" />
        </linearGradient>
        <linearGradient id="gp-b" x1="411" y1="256" x2="12.4" y2="256" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ffe000" />
          <stop offset=".41" stopColor="#ffbd00" />
          <stop offset=".78" stopColor="#ffa500" />
          <stop offset="1" stopColor="#ff9c00" />
        </linearGradient>
        <linearGradient id="gp-c" x1="360.9" y1="293.9" x2="-52.7" y2="707.4" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ff3a44" />
          <stop offset="1" stopColor="#c31162" />
        </linearGradient>
        <linearGradient id="gp-d" x1="-27.2" y1="-108.1" x2="157.4" y2="76.5" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#32a071" />
          <stop offset=".07" stopColor="#2da771" />
          <stop offset=".48" stopColor="#15cf74" />
          <stop offset=".8" stopColor="#06e775" />
          <stop offset="1" stopColor="#00f076" />
        </linearGradient>
      </defs>
      <path fill="url(#gp-a)" d="M25.5 17.4C20 23.6 16.7 33.1 16.7 45.5v421c0 12.4 3.3 21.9 8.8 28.1l1.4 1.4 236-236v-5.6L26.9 16z" />
      <path fill="url(#gp-b)" d="M341.7 337.6l-78.8-78.8v-5.6l78.8-78.8 1.8 1 93.4 53c26.7 15.2 26.7 40 0 55.2l-93.4 53z" />
      <path fill="url(#gp-c)" d="M343.5 336.6L262.9 256 25.5 493.4c8.8 9.3 23.4 10.5 39.8 1.2l278.2-158z" />
      <path fill="url(#gp-d)" d="M343.5 175.4L65.3 17.4c-16.4-9.3-31-8.1-39.8 1.2L262.9 256z" />
    </svg>
  );
}

function AppleLogo({ size = 22, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 384 512" xmlns="http://www.w3.org/2000/svg" fill={color} aria-hidden="true">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  );
}

// A pair of app-store badges. Google Play links to the live listing;
// the App Store badge is shown as "Coming soon" and is non-interactive.
export default function StoreBadges({ className = "" }) {
  return (
    <div className={`flex flex-col sm:flex-row gap-3 ${className}`}>
      <a
        href={PLAY_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Get AroundYou on Google Play"
        className="inline-flex items-center gap-3 rounded-xl px-5 py-2.5 bg-black text-white border border-white/25 transition-all hover:border-white/50 hover:-translate-y-0.5"
      >
        <GooglePlayLogo />
        <span className="flex flex-col leading-tight text-left">
          <span className="text-[10px] uppercase tracking-wide text-gray-300">Get it on</span>
          <span className="text-lg font-semibold">Google Play</span>
        </span>
      </a>

      <div
        aria-label="AroundYou on the App Store, coming soon"
        className="relative inline-flex items-center gap-3 rounded-xl px-5 py-2.5 bg-black/70 text-white/70 border border-white/15 cursor-default select-none"
      >
        <AppleLogo color="rgba(255,255,255,0.7)" />
        <span className="flex flex-col leading-tight text-left">
          <span className="text-[10px] uppercase tracking-wide text-gray-400">Coming soon</span>
          <span className="text-lg font-semibold">App Store</span>
        </span>
      </div>
    </div>
  );
}
