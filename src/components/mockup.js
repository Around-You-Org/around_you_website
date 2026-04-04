
const MobiledashboardHTML = `
<!DOCTYPE html>
<html class="light" lang="en">
<head>
  <meta charset="utf-8" />
  <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport" />
  <title>Saved Professionals - Around You</title>
  <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
  <style>
    .material-symbols-outlined {
      font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
    }
    body {
      font-family: 'Inter', sans-serif;
      overscroll-behavior: none;
      -webkit-tap-highlight-color: transparent;
    }
    h1, h2, h3, .brand-font { font-family: 'Manrope', sans-serif; }

    /* Horizontal scroll snap for cards */
    .snap-scroll {
      scroll-snap-type: x mandatory;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
    }
    .snap-scroll::-webkit-scrollbar { display: none; }
    .snap-item { scroll-snap-align: start; }

    @keyframes ping-slow {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.8); opacity: 0; }
    }
    .animate-ping-slow { animation: ping-slow 2s ease-in-out infinite; }

    /* Bottom nav safe area */
    .bottom-nav {
      padding-bottom: env(safe-area-inset-bottom, 0px);
    }
  </style>
  <script id="tailwind-config">
    tailwind.config = {
      darkMode: "class",
      theme: {
        extend: {
          colors: {
            "surface-container-highest": "#e0e3e5",
            "on-tertiary": "#ffffff",
            "inverse-on-surface": "#eff1f3",
            "on-primary-fixed": "#001c3a",
            "surface-container": "#eceef0",
            "tertiary-fixed": "#b2f2bb",
            "outline-variant": "#c4c6cf",
            "on-secondary-fixed-variant": "#004f56",
            "on-secondary": "#ffffff",
            "inverse-surface": "#2d3133",
            "surface-container-lowest": "#ffffff",
            "surface-tint": "#476083",
            "on-primary": "#ffffff",
            "on-error": "#ffffff",
            "secondary-fixed": "#9ff0fb",
            "primary-fixed-dim": "#afc8f0",
            "error-container": "#ffdad6",
            "tertiary-fixed-dim": "#96d5a0",
            "primary": "#000613",
            "tertiary": "#000802",
            "primary-fixed": "#d4e3ff",
            "on-tertiary-fixed": "#00210b",
            "on-tertiary-fixed-variant": "#145129",
            "surface-container-high": "#e6e8ea",
            "primary-container": "#001f3f",
            "error": "#ba1a1a",
            "surface-bright": "#f7f9fb",
            "on-primary-container": "#6f88ad",
            "secondary-fixed-dim": "#82d3de",
            "on-surface": "#191c1e",
            "on-background": "#191c1e",
            "background": "#f7f9fb",
            "inverse-primary": "#afc8f0",
            "surface-dim": "#d8dadc",
            "outline": "#74777f",
            "surface-container-low": "#f2f4f6",
            "on-primary-fixed-variant": "#2f486a",
            "on-error-container": "#93000a",
            "secondary": "#006972",
            "on-secondary-container": "#066f79",
            "tertiary-container": "#00250d",
            "on-surface-variant": "#43474e",
            "surface": "#f7f9fb",
            "secondary-container": "#9ff0fb",
            "on-tertiary-container": "#589364",
            "surface-variant": "#e0e3e5",
            "on-secondary-fixed": "#001f23"
          },
        },
      },
    }
  </script>
</head>

<body class="bg-surface text-on-surface max-w-sm mx-auto relative" style="min-height: 100svh;">

  <!-- Status Bar Spacer -->
  <div class="h-safe-top"></div>

  <!-- Sticky Top App Bar -->
  <header class="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-100 px-4 py-3">
    <div class="flex items-center justify-between mb-3">
      <div>
        <p class="text-[10px] font-bold tracking-widest text-secondary uppercase">Around You</p>
        <h1 class="text-lg font-extrabold text-primary-container leading-tight" style="font-family:'Manrope',sans-serif;">Saved Pros</h1>
      </div>
      <div class="flex items-center gap-3">
        <button class="relative text-slate-500">
          <span class="material-symbols-outlined text-[22px]">notifications</span>
          <span class="absolute top-0 right-0 h-2 w-2 bg-secondary rounded-full border border-white"></span>
        </button>
        <div class="h-9 w-9 rounded-full overflow-hidden border-2 border-secondary-container shadow-sm">
          <img alt="Profile" class="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcN9BXZir4fhCqVlIPORCfy2NnpsxfkXDur56zyVy-Tf11P-pToTxFFGIuUk7r7ogFnmXhQ-aFvIN7yREjJYZxjrY9_ym9Pt7GIZJPN0oOOKmTLmSubK7hHAcz7V2CGs8iEoOz8Npa8qoQRMYIZY4xmgwuGbzwS3nX5tX57V1dw1MbdapQo-DGZ5YkxWjVNgCup2rbZHxpdrBrjmRnfMrOhVMAq2saizkUPaXq6AltoRqsOTrDTM-IyhgEqmMsAwg7f1m3Ar_nuQ" />
        </div>
      </div>
    </div>
    <!-- Search Bar -->
    <div class="relative">
      <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined text-[18px]">search</span>
      <input
        class="w-full bg-surface-container-low border-none rounded-full pl-9 pr-4 py-2 text-sm focus:ring-2 focus:ring-secondary transition-all"
        placeholder="Search saved pros..." type="text" />
    </div>
  </header>

  <!-- Scrollable Content -->
  <main class="pb-28 px-0">

    <!-- Featured / Recommended Card - Full Width -->
    <div class="mx-4 mt-4 rounded-2xl overflow-hidden relative shadow-xl" style="height:200px; background:#001f3f;">
      <img alt="Dr. Sarah Adekunle"
        class="absolute inset-0 w-full h-full object-cover object-top opacity-60"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxbKXaYM6Iue5s-YTUV_EgQaOv4XwZolQ8RFbJHjHWz2ejN9c8TBIt-FXJ66H7tagvbcsCr-hu0LQ-4i_DdTqlKm4RIPkLouke9nfQ3JbDhvs1m3N-rj57Hj2AhP6cbSrS88JTQORBmvhcIDDj_r7p8NkBTWZsqSVB0-IBrUK8TQj_Onit17ZHFsDy2hQGlGfEDlWUf7fYH3Q2ggKTleRA4jmym9IfhnsFspH7jD389sspI7lHnYYeNe9cECKk1-JMomQwZ2eZtg" />
      <!-- Gradient overlay -->
      <div class="absolute inset-0" style="background: linear-gradient(to top, #001f3f 40%, transparent 100%);"></div>
      <!-- Content -->
      <div class="absolute bottom-0 left-0 right-0 p-5">
        <span class="text-[9px] font-bold tracking-widest text-secondary-fixed uppercase">⭐ Recommended</span>
        <h3 class="text-white font-black text-xl mt-0.5 leading-tight" style="font-family:'Manrope',sans-serif;">Dr. Sarah Adekunle</h3>
        <p class="text-primary-fixed-dim text-xs mb-3">Holistic Pet Care Specialist</p>
        <div class="flex items-center justify-between">
          <div class="flex gap-4 text-white">
            <div>
              <p class="font-bold text-base leading-tight">12</p>
              <p class="text-[9px] text-primary-fixed-dim opacity-70 uppercase">Bookings</p>
            </div>
            <div class="w-px bg-white/20"></div>
            <div>
              <p class="font-bold text-base leading-tight text-secondary-fixed">5.0</p>
              <p class="text-[9px] text-primary-fixed-dim opacity-70 uppercase">Rating</p>
            </div>
          </div>
          <button class="bg-secondary-container text-on-secondary-container text-xs font-bold px-4 py-2 rounded-xl active:scale-95 transition-transform">
            Book Checkup
          </button>
        </div>
      </div>
    </div>

    <!-- Section: Saved Professionals (Horizontal Scroll) -->
    <div class="mt-6">
      <div class="flex items-center justify-between px-4 mb-3">
        <h2 class="font-extrabold text-base text-primary-container" style="font-family:'Manrope',sans-serif;">Your Saved Pros</h2>
        <button class="text-secondary text-xs font-bold flex items-center gap-0.5">
          See All <span class="material-symbols-outlined text-sm">chevron_right</span>
        </button>
      </div>

      <!-- Horizontal Scroll Cards -->
      <div class="flex gap-3 snap-scroll overflow-x-auto pl-4 pr-4 pb-1">

        <!-- Card 1 -->
        <div class="snap-item flex-none w-52 bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm border border-slate-100 active:scale-95 transition-transform">
          <div class="h-32 overflow-hidden relative">
            <img alt="Amara Okafor"
              class="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHoJCFcEr8mhAOl70x0HK8KtJXdg24i534S0AYGJFKsb48lfk-kU0eUfO2LxQlGpRZt1yb4C77Z3aAxOJoFyD4-9O8d-_KdYeeiRbx4T4qcqiSHXqDR4VaqvlJ6on_etI3SPszo8RQY3EzPvwB2wyNzQGAh0GFDFizJ6S7aJ22DyOffx0JaNTeSmw_2JuE-OptpoRJcLqkVf1j4z9dE8wFFS8fH40IAxL-jMLUowDag7EGdqrDTWwXLBqulC1x1Tn7PH_Kaauixw" />
            <!-- Favorite badge -->
            <div class="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur rounded-full p-1.5 text-secondary shadow-sm">
              <span class="material-symbols-outlined text-[16px]" style="font-variation-settings:'FILL' 1;">favorite</span>
            </div>
            <!-- Rating badge -->
            <div class="absolute bottom-2 left-2 flex items-center bg-tertiary-fixed-dim px-2 py-0.5 rounded-full">
              <span class="material-symbols-outlined text-[11px] text-on-tertiary-fixed mr-0.5" style="font-variation-settings:'FILL' 1;">star</span>
              <span class="text-on-tertiary-fixed font-bold text-xs">4.9</span>
            </div>
          </div>
          <div class="p-3">
            <h3 class="font-bold text-sm text-primary-container leading-tight" style="font-family:'Manrope',sans-serif;">Amara Okafor</h3>
            <p class="text-[10px] text-secondary font-semibold uppercase tracking-tight mt-0.5">Home Cleaning</p>
            <div class="flex items-center gap-1.5 mt-2 mb-3">
              <div class="relative h-1.5 w-1.5 flex-none">
                <div class="absolute inset-0 bg-secondary-fixed-dim rounded-full animate-ping-slow"></div>
                <div class="relative bg-secondary rounded-full h-1.5 w-1.5"></div>
              </div>
              <span class="text-[10px] font-semibold text-secondary">Available Today</span>
            </div>
            <button class="w-full bg-primary-container text-white text-xs font-bold py-2 rounded-lg active:scale-95 transition-transform">
              Book Now
            </button>
          </div>
        </div>

        <!-- Card 2 -->
        <div class="snap-item flex-none w-52 bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm border border-slate-100 active:scale-95 transition-transform">
          <div class="h-32 overflow-hidden relative">
            <img alt="Chidi Benson"
              class="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlCgfEs-Nn0tqyBFFJEwiwP2Ra0vwFpVGfB1fBzhIMU_ayQRKQdG4rs1Ry9Ieqd4kG3xaP0Upoie-ESYsD4E9fWL9plvvbgfdEyA7eKap74uLM9lPjfIIdxbvi3eMFELWy8CHqDP9X0qF5MMgZ9ec5O5UDKRL7OvQgWBe_CuLzy-mI1pk_WsFAhgwdrVz8E5HZMpvUzxPHJKtXmoVeicT4f4tpeK9JOnVYI_qiO92aQRZ3L_-N-9xWzVd2Cn9Z-GG0dYL3HNuZWQ" />
            <div class="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur rounded-full p-1.5 text-secondary shadow-sm">
              <span class="material-symbols-outlined text-[16px]" style="font-variation-settings:'FILL' 1;">favorite</span>
            </div>
            <div class="absolute bottom-2 left-2 flex items-center bg-tertiary-fixed-dim px-2 py-0.5 rounded-full">
              <span class="material-symbols-outlined text-[11px] text-on-tertiary-fixed mr-0.5" style="font-variation-settings:'FILL' 1;">star</span>
              <span class="text-on-tertiary-fixed font-bold text-xs">5.0</span>
            </div>
          </div>
          <div class="p-3">
            <h3 class="font-bold text-sm text-primary-container leading-tight" style="font-family:'Manrope',sans-serif;">Chidi Benson</h3>
            <p class="text-[10px] text-secondary font-semibold uppercase tracking-tight mt-0.5">Electrician</p>
            <div class="flex items-center gap-1.5 mt-2 mb-3">
              <div class="bg-surface-variant rounded-full h-1.5 w-1.5 flex-none"></div>
              <span class="text-[10px] font-semibold text-slate-400">Next: Tuesday</span>
            </div>
            <button class="w-full bg-primary-container text-white text-xs font-bold py-2 rounded-lg active:scale-95 transition-transform">
              Book Now
            </button>
          </div>
        </div>

        <!-- Card 3 -->
        <div class="snap-item flex-none w-52 bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm border border-slate-100 active:scale-95 transition-transform">
          <div class="h-32 overflow-hidden relative">
            <img alt="Ibrahim Musa"
              class="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdYDKItgg5d2KXAYKW2ZXeSOo2wL4jtk2TMqF1DvjP1PZVvrIOmuJuRC6gsZt0UZGvbEh8w2wSz1vd_Cri7wrC2tCqZnoqu-E4AXD3OGKdSOYyn7lpP6jOIM33V4NJmaOlluUCzk73BvQuCdmuU51uokLo9Cko_CpjfbkVM2HWeRdzG9_te0gGqTBvoqjVZSovho4H6w9vJPR8MawYdrjfb3ZWkxarnjEFn9m_lvmYpOoXFoRKS9ZcVDsHcb8A2Xcrgg44sROhHQ" />
            <div class="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur rounded-full p-1.5 text-secondary shadow-sm">
              <span class="material-symbols-outlined text-[16px]" style="font-variation-settings:'FILL' 1;">favorite</span>
            </div>
            <div class="absolute bottom-2 left-2 flex items-center bg-tertiary-fixed-dim px-2 py-0.5 rounded-full">
              <span class="material-symbols-outlined text-[11px] text-on-tertiary-fixed mr-0.5" style="font-variation-settings:'FILL' 1;">star</span>
              <span class="text-on-tertiary-fixed font-bold text-xs">4.8</span>
            </div>
          </div>
          <div class="p-3">
            <h3 class="font-bold text-sm text-primary-container leading-tight" style="font-family:'Manrope',sans-serif;">Ibrahim Musa</h3>
            <p class="text-[10px] text-secondary font-semibold uppercase tracking-tight mt-0.5">Master Plumber</p>
            <div class="flex items-center gap-1.5 mt-2 mb-3">
              <div class="relative h-1.5 w-1.5 flex-none">
                <div class="absolute inset-0 bg-secondary-fixed-dim rounded-full animate-ping-slow"></div>
                <div class="relative bg-secondary rounded-full h-1.5 w-1.5"></div>
              </div>
              <span class="text-[10px] font-semibold text-secondary">Available Today</span>
            </div>
            <button class="w-full bg-primary-container text-white text-xs font-bold py-2 rounded-lg active:scale-95 transition-transform">
              Book Now
            </button>
          </div>
        </div>

        <!-- Find More Card -->
        <div class="snap-item flex-none w-44 bg-secondary-container rounded-2xl p-4 flex flex-col justify-between border-2 border-dashed border-secondary/30 active:scale-95 transition-transform">
          <div>
            <span class="material-symbols-outlined text-secondary text-4xl">add_circle</span>
            <h3 class="font-black text-sm text-on-secondary-container mt-2 leading-tight" style="font-family:'Manrope',sans-serif;">Find More Pros</h3>
            <p class="text-secondary text-[10px] mt-1 leading-relaxed">Browse top-rated professionals near you.</p>
          </div>
          <button class="mt-4 bg-white text-secondary text-xs font-bold px-3 py-2 rounded-lg flex items-center gap-1">
            Explore <span class="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>

      </div>
    </div>

    <!-- Section: Recently Contacted -->
    <div class="mt-6 px-4">
      <div class="flex items-center justify-between mb-3">
        <h2 class="font-extrabold text-base text-primary-container" style="font-family:'Manrope',sans-serif;">Recently Contacted</h2>
        <button class="text-secondary text-xs font-bold flex items-center gap-0.5">
          View All <span class="material-symbols-outlined text-sm">chevron_right</span>
        </button>
      </div>

      <div class="space-y-3">
        <!-- List Item 1 -->
        <div class="flex items-center justify-between p-3.5 bg-surface-container-lowest rounded-2xl shadow-sm border border-slate-100 active:bg-surface-container transition-colors">
          <div class="flex items-center gap-3">
            <div class="h-11 w-11 rounded-full overflow-hidden border-2 border-white shadow-sm flex-none">
              <img alt="Kola Olatunji" class="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDam-BFFflGZ7-MNXglNugzPr-688uq7Y7vioG9yp6Ob_DrRVKPSbb6iKaqgi4BXBZTNtBIre0-GbLriWKMTaW5K5E91Vwnz-_8CaMl_VjmTJ29j4rwybp3FadwYxC0VR55nv9xbVcWsZkLN0sUuqnE2QPirAz7PRdgBS0e-8isIpB5UWSXWjeMBD_rG8-wIWGiMRJx8B0FE58b9vefuREPV7R1o0p5xuwhAhctC2XwPJ7a1N_vA6oclP22gmMAdJ6QLamRsvkt8Q" />
            </div>
            <div>
              <h4 class="font-bold text-sm text-primary-container" style="font-family:'Manrope',sans-serif;">Kola Olatunji</h4>
              <p class="text-[10px] text-on-surface-variant">Landscape Designer • 2 days ago</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button class="p-2 text-slate-400">
              <span class="material-symbols-outlined text-[20px]">chat_bubble</span>
            </button>
            <button class="bg-primary-container text-white text-[11px] font-bold px-3 py-1.5 rounded-lg active:scale-95 transition-transform">
              Book
            </button>
          </div>
        </div>

        <!-- List Item 2 -->
        <div class="flex items-center justify-between p-3.5 bg-surface-container-lowest rounded-2xl shadow-sm border border-slate-100 active:bg-surface-container transition-colors">
          <div class="flex items-center gap-3">
            <div class="h-11 w-11 rounded-full overflow-hidden border-2 border-white shadow-sm flex-none">
              <img alt="Blessing Eke" class="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDL7UKbgpP9WV2IUxocJSCw91gynFSNqS6MIqc_kLCX-8aMIS0PKGPSzkyVif63Ob4J1ZyKx50neMwXiZJ3wxMsEzGBsOvx9W4ts1nLbdpdNu2Wr0r-a5mT8a717CcSXr_uaXFNsEAoxuRBWgRG9V7oG-iPTr41RXJ0R2ol8fgES0Rm1l2t31_54dYhC-QEvGhxIAa1oJkEGzjEekP38q_fLCBk42Pwx0aHQtVXhSsWKb6TzEcsIeFZw4tlWyKYlZHpV7zfwMBR6Q" />
            </div>
            <div>
              <h4 class="font-bold text-sm text-primary-container" style="font-family:'Manrope',sans-serif;">Blessing Eke</h4>
              <p class="text-[10px] text-on-surface-variant">Private Tutor • 1 week ago</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button class="p-2 text-slate-400">
              <span class="material-symbols-outlined text-[20px]">chat_bubble</span>
            </button>
            <button class="bg-primary-container text-white text-[11px] font-bold px-3 py-1.5 rounded-lg active:scale-95 transition-transform">
              Book
            </button>
          </div>
        </div>
      </div>
    </div>

  </main>

  <!-- Bottom Navigation Bar -->
  <nav class="bottom-nav fixed bottom-0 left-0 right-0 max-w-sm mx-auto bg-white border-t border-slate-100 z-50 px-2 pt-2 pb-4">
    <div class="flex items-center justify-around">
      <button class="flex flex-col items-center gap-0.5 px-4 py-1">
        <span class="material-symbols-outlined text-[22px] text-slate-400">home</span>
        <span class="text-[9px] text-slate-400 font-medium">Home</span>
      </button>
      <button class="flex flex-col items-center gap-0.5 px-4 py-1">
        <span class="material-symbols-outlined text-[22px] text-slate-400">search</span>
        <span class="text-[9px] text-slate-400 font-medium">Explore</span>
      </button>
      <!-- Center Book Button -->
      <button class="flex flex-col items-center -mt-5">
        <div class="h-14 w-14 rounded-full bg-primary-container flex items-center justify-center shadow-xl shadow-primary-container/30 border-4 border-surface active:scale-95 transition-transform">
          <span class="material-symbols-outlined text-white text-[22px]">add</span>
        </div>
        <span class="text-[9px] text-secondary font-bold mt-1">Book</span>
      </button>
      <button class="flex flex-col items-center gap-0.5 px-4 py-1">
        <span class="material-symbols-outlined text-[22px] text-secondary" style="font-variation-settings:'FILL' 1;">bookmark</span>
        <span class="text-[9px] text-secondary font-bold">Saved</span>
      </button>
      <button class="flex flex-col items-center gap-0.5 px-4 py-1">
        <span class="material-symbols-outlined text-[22px] text-slate-400">person</span>
        <span class="text-[9px] text-slate-400 font-medium">Profile</span>
      </button>
    </div>
  </nav>

</body>
</html>

`;

// ── Desktop Dashboard HTML ─────────────────────────────────────────────────────
const DesktopdashboardHTML = `
<!DOCTYPE html>

<html class="light" lang="en">

<head>
  <meta charset="utf-8" />
  <meta content="width=device-width, initial-scale=1.0" name="viewport" />
  <title>Saved Professionals - Around You</title>
  <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
  <link
    href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&amp;family=Inter:wght@400;500;600&amp;display=swap"
    rel="stylesheet" />
  <link
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap"
    rel="stylesheet" />
  <link
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap"
    rel="stylesheet" />
  <style>
    .material-symbols-outlined {
      font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
    }

    body {
      font-family: 'Inter', sans-serif;
    }

    h1,
    h2,
    h3,
    .brand-font {
      font-family: 'Manrope', sans-serif;
    }
  </style>
  <script id="tailwind-config">
    tailwind.config = {
      darkMode: "class",
      theme: {
        extend: {
          "colors": {
            "surface-container-highest": "#e0e3e5",
            "on-tertiary": "#ffffff",
            "inverse-on-surface": "#eff1f3",
            "on-primary-fixed": "#001c3a",
            "surface-container": "#eceef0",
            "tertiary-fixed": "#b2f2bb",
            "outline-variant": "#c4c6cf",
            "on-secondary-fixed-variant": "#004f56",
            "on-secondary": "#ffffff",
            "inverse-surface": "#2d3133",
            "surface-container-lowest": "#ffffff",
            "surface-tint": "#476083",
            "on-primary": "#ffffff",
            "on-error": "#ffffff",
            "secondary-fixed": "#9ff0fb",
            "primary-fixed-dim": "#afc8f0",
            "error-container": "#ffdad6",
            "tertiary-fixed-dim": "#96d5a0",
            "primary": "#000613",
            "tertiary": "#000802",
            "primary-fixed": "#d4e3ff",
            "on-tertiary-fixed": "#00210b",
            "on-tertiary-fixed-variant": "#145129",
            "surface-container-high": "#e6e8ea",
            "primary-container": "#001f3f",
            "error": "#ba1a1a",
            "surface-bright": "#f7f9fb",
            "on-primary-container": "#6f88ad",
            "secondary-fixed-dim": "#82d3de",
            "on-surface": "#191c1e",
            "on-background": "#191c1e",
            "background": "#f7f9fb",
            "inverse-primary": "#afc8f0",
            "surface-dim": "#d8dadc",
            "outline": "#74777f",
            "surface-container-low": "#f2f4f6",
            "on-primary-fixed-variant": "#2f486a",
            "on-error-container": "#93000a",
            "secondary": "#006972",
            "on-secondary-container": "#066f79",
            "tertiary-container": "#00250d",
            "on-surface-variant": "#43474e",
            "surface": "#f7f9fb",
            "secondary-container": "#9ff0fb",
            "on-tertiary-container": "#589364",
            "surface-variant": "#e0e3e5",
            "on-secondary-fixed": "#001f23"
          },
          "borderRadius": {
            "DEFAULT": "0.25rem",
            "lg": "0.5rem",
            "xl": "0.75rem",
            "full": "9999px"
          },
          "fontFamily": {
            "headline": ["Manrope"],
            "body": ["Inter"],
            "label": ["Inter"]
          }
        },
      },
    }
  </script>
</head>

<body class="bg-surface text-on-surface">
  
  <!-- Main Content Canvas -->
  <main class="m-auto min-h-screen bg-surface">
    <!-- Top App Bar -->
    <header
      class="w-full h-16 sticky top-0 z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl flex items-center justify-between px-8 border-b border-slate-100 dark:border-slate-800">
      <div class="flex items-center gap-4">
        <div class="relative">
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined"
            data-icon="search">search</span>
          <input
            class="bg-surface-container-low border-none rounded-full pl-10 pr-4 py-2 text-sm w-64 focus:ring-2 focus:ring-secondary transition-all"
            placeholder="Search saved pros..." type="text" />
        </div>
      </div>
      <div class="flex items-center gap-6">
        <button class="text-slate-500 hover:text-primary transition-colors">
          <span class="material-symbols-outlined" data-icon="notifications">notifications</span>
        </button>
        <button class="text-slate-500 hover:text-primary transition-colors">
          <span class="material-symbols-outlined" data-icon="help_outline">help_outline</span>
        </button>
        <div class="h-8 w-8 rounded-full overflow-hidden border-2 border-secondary-container">
          <img alt="Customer profile picture"
            data-alt="close-up portrait of a professional woman with a warm smile, wearing business casual attire in a modern bright office environment"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcN9BXZir4fhCqVlIPORCfy2NnpsxfkXDur56zyVy-Tf11P-pToTxFFGIuUk7r7ogFnmXhQ-aFvIN7yREjJYZxjrY9_ym9Pt7GIZJPN0oOOKmTLmSubK7hHAcz7V2CGs8iEoOz8Npa8qoQRMYIZY4xmgwuGbzwS3nX5tX57V1dw1MbdapQo-DGZ5YkxWjVNgCup2rbZHxpdrBrjmRnfMrOhVMAq2saizkUPaXq6AltoRqsOTrDTM-IyhgEqmMsAwg7f1m3Ar_nuQ" />
        </div>
      </div>
    </header>
    <!-- Page Content -->
    <section class="p-10 max-w-7xl mx-auto">
      <div class="mb-12">
        <span class="text-secondary font-bold tracking-widest text-xs uppercase mb-2 block">Curated Network</span>
        <h2 class="text-4xl font-extrabold text-primary-container tracking-tight">Saved Professionals</h2>
        <p class="text-on-surface-variant mt-2 text-lg">Your handpicked team of local service experts.</p>
      </div>
      <!-- Bento-style Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Professional Card 1 -->
        <div
          class="group bg-surface-container-lowest rounded-xl overflow-hidden hover:-translate-y-1 transition-all duration-300 shadow-sm border border-transparent hover:border-secondary/20">
          <div class="h-48 overflow-hidden relative">
            <img alt="Professional worker"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              data-alt="Professional cleaner in uniform standing in a sparkling clean modern kitchen with natural morning light streaming through windows"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHoJCFcEr8mhAOl70x0HK8KtJXdg24i534S0AYGJFKsb48lfk-kU0eUfO2LxQlGpRZt1yb4C77Z3aAxOJoFyD4-9O8d-_KdYeeiRbx4T4qcqiSHXqDR4VaqvlJ6on_etI3SPszo8RQY3EzPvwB2wyNzQGAh0GFDFizJ6S7aJ22DyOffx0JaNTeSmw_2JuE-OptpoRJcLqkVf1j4z9dE8wFFS8fH40IAxL-jMLUowDag7EGdqrDTWwXLBqulC1x1Tn7PH_Kaauixw" />
            <div class="absolute top-4 right-4 bg-white/90 backdrop-blur-md rounded-full p-2 text-secondary">
              <span class="material-symbols-outlined" data-icon="favorite"
                style="font-variation-settings: 'FILL' 1;">favorite</span>
            </div>
          </div>
          <div class="p-6">
            <div class="flex justify-between items-start mb-2">
              <div>
                <h3 class="font-bold text-xl text-primary-container">Amara Okafor</h3>
                <p class="text-sm text-secondary font-medium uppercase tracking-tight">Premium Home Cleaning</p>
              </div>
              <div
                class="flex items-center bg-tertiary-fixed-dim px-2 py-1 rounded text-on-tertiary-fixed font-bold text-sm">
                <span class="material-symbols-outlined text-xs mr-1" data-icon="star"
                  style="font-variation-settings: 'FILL' 1;">star</span>
                4.9
              </div>
            </div>
            <p class="text-sm text-on-surface-variant line-clamp-2 mb-6">Expert in deep sanitization and organized space
              management with over 5 years of experience in Lagos.</p>
            <div class="flex items-center justify-between pt-6 border-t border-surface-container">
              <div class="flex items-center gap-2">
                <div class="relative h-2 w-2">
                  <div class="absolute inset-0 bg-secondary-fixed-dim rounded-full animate-ping"></div>
                  <div class="relative bg-secondary rounded-full h-2 w-2"></div>
                </div>
                <span class="text-xs font-semibold text-secondary">Available Today</span>
              </div>
              <button
                class="bg-primary-container text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-primary transition-colors shadow-lg shadow-primary/10 active:scale-95">
                Book New Service
              </button>
            </div>
          </div>
        </div>
        <!-- Professional Card 2 -->
        <div
          class="group bg-surface-container-lowest rounded-xl overflow-hidden hover:-translate-y-1 transition-all duration-300 shadow-sm border border-transparent hover:border-secondary/20">
          <div class="h-48 overflow-hidden relative">
            <img alt="Professional worker"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              data-alt="Expert electrician working on a modern electrical panel with professional tools, focused expression, bright workshop lighting"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlCgfEs-Nn0tqyBFFJEwiwP2Ra0vwFpVGfB1fBzhIMU_ayQRKQdG4rs1Ry9Ieqd4kG3xaP0Upoie-ESYsD4E9fWL9plvvbgfdEyA7eKap74uLM9lPjfIIdxbvi3eMFELWy8CHqDP9X0qF5MMgZ9ec5O5UDKRL7OvQgWBe_CuLzy-mI1pk_WsFAhgwdrVz8E5HZMpvUzxPHJKtXmoVeicT4f4tpeK9JOnVYI_qiO92aQRZ3L_-N-9xWzVd2Cn9Z-GG0dYL3HNuZWQ" />
            <div class="absolute top-4 right-4 bg-white/90 backdrop-blur-md rounded-full p-2 text-secondary">
              <span class="material-symbols-outlined" data-icon="favorite"
                style="font-variation-settings: 'FILL' 1;">favorite</span>
            </div>
          </div>
          <div class="p-6">
            <div class="flex justify-between items-start mb-2">
              <div>
                <h3 class="font-bold text-xl text-primary-container">Chidi Benson</h3>
                <p class="text-sm text-secondary font-medium uppercase tracking-tight">Certified Electrician</p>
              </div>
              <div
                class="flex items-center bg-tertiary-fixed-dim px-2 py-1 rounded text-on-tertiary-fixed font-bold text-sm">
                <span class="material-symbols-outlined text-xs mr-1" data-icon="star"
                  style="font-variation-settings: 'FILL' 1;">star</span>
                5.0
              </div>
            </div>
            <p class="text-sm text-on-surface-variant line-clamp-2 mb-6">Specializing in smart home installations and
              complex industrial electrical repairs with precision and safety.</p>
            <div class="flex items-center justify-between pt-6 border-t border-surface-container">
              <div class="flex items-center gap-2">
                <div class="bg-surface-variant rounded-full h-2 w-2"></div>
                <span class="text-xs font-semibold text-slate-400">Next: Tuesday</span>
              </div>
              <button
                class="bg-primary-container text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-primary transition-colors shadow-lg shadow-primary/10 active:scale-95">
                Book New Service
              </button>
            </div>
          </div>
        </div>
        <!-- Professional Card 3 -->
        <div
          class="group bg-surface-container-lowest rounded-xl overflow-hidden hover:-translate-y-1 transition-all duration-300 shadow-sm border border-transparent hover:border-secondary/20">
          <div class="h-48 overflow-hidden relative">
            <img alt="Professional worker"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              data-alt="Plumber fixing a luxury kitchen faucet, close-up of hands and chrome fixtures with soft daylight background"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdYDKItgg5d2KXAYKW2ZXeSOo2wL4jtk2TMqF1DvjP1PZVvrIOmuJuRC6gsZt0UZGvbEh8w2wSz1vd_Cri7wrC2tCqZnoqu-E4AXD3OGKdSOYyn7lpP6jOIM33V4NJmaOlluUCzk73BvQuCdmuU51uokLo9Cko_CpjfbkVM2HWeRdzG9_te0gGqTBvoqjVZSovho4H6w9vJPR8MawYdrjfb3ZWkxarnjEFn9m_lvmYpOoXFoRKS9ZcVDsHcb8A2Xcrgg44sROhHQ" />
            <div class="absolute top-4 right-4 bg-white/90 backdrop-blur-md rounded-full p-2 text-secondary">
              <span class="material-symbols-outlined" data-icon="favorite"
                style="font-variation-settings: 'FILL' 1;">favorite</span>
            </div>
          </div>
          <div class="p-6">
            <div class="flex justify-between items-start mb-2">
              <div>
                <h3 class="font-bold text-xl text-primary-container">Ibrahim Musa</h3>
                <p class="text-sm text-secondary font-medium uppercase tracking-tight">Master Plumber</p>
              </div>
              <div
                class="flex items-center bg-tertiary-fixed-dim px-2 py-1 rounded text-on-tertiary-fixed font-bold text-sm">
                <span class="material-symbols-outlined text-xs mr-1" data-icon="star"
                  style="font-variation-settings: 'FILL' 1;">star</span>
                4.8
              </div>
            </div>
            <p class="text-sm text-on-surface-variant line-clamp-2 mb-6">Prompt and reliable plumbing services for
              residential maintenance and new installations across Lekki.</p>
            <div class="flex items-center justify-between pt-6 border-t border-surface-container">
              <div class="flex items-center gap-2">
                <div class="relative h-2 w-2">
                  <div class="absolute inset-0 bg-secondary-fixed-dim rounded-full animate-ping"></div>
                  <div class="relative bg-secondary rounded-full h-2 w-2"></div>
                </div>
                <span class="text-xs font-semibold text-secondary">Available Today</span>
              </div>
              <button
                class="bg-primary-container text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-primary transition-colors shadow-lg shadow-primary/10 active:scale-95">
                Book New Service
              </button>
            </div>
          </div>
        </div>
        <!-- Professional Card 4 (Asymmetric Large Card) -->
        <div
          class="lg:col-span-2 group bg-primary-container text-white rounded-xl overflow-hidden relative flex items-center shadow-xl">
          <div class="w-1/2 p-10 z-10">
            <span class="text-secondary-fixed font-bold text-xs uppercase tracking-widest mb-4 block">Recommended
              Specialist</span>
            <h3 class="text-3xl font-black mb-4 tracking-tight">Dr. Sarah Adekunle</h3>
            <p class="text-primary-fixed-dim mb-8 text-lg">Specialist Holistic Pet Care. Sarah has been your go-to for
              Duke's health for 2 years. </p>
            <div class="flex items-center gap-6 mb-8">
              <div class="flex flex-col">
                <span class="text-2xl font-bold">12</span>
                <span class="text-[10px] uppercase text-primary-fixed-dim opacity-70">Bookings</span>
              </div>
              <div class="h-8 w-px bg-white/20"></div>
              <div class="flex flex-col">
                <span class="text-2xl font-bold text-secondary-fixed">5.0</span>
                <span class="text-[10px] uppercase text-primary-fixed-dim opacity-70">Lifetime Rating</span>
              </div>
            </div>
            <button
              class="bg-secondary-container text-on-secondary-container px-8 py-4 rounded-xl font-black text-sm hover:brightness-110 transition-all active:scale-95">
              Book Checkup Now
            </button>
          </div>
          <div class="w-1/2 h-full relative overflow-hidden">
            <img alt="Sarah Adekunle"
              class="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000"
              data-alt="Woman veterinarian in white coat smiling, softly lit by window light in a clean modern clinic with medical equipment in background"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxbKXaYM6Iue5s-YTUV_EgQaOv4XwZolQ8RFbJHjHWz2ejN9c8TBIt-FXJ66H7tagvbcsCr-hu0LQ-4i_DdTqlKm4RIPkLouke9nfQ3JbDhvs1m3N-rj57Hj2AhP6cbSrS88JTQORBmvhcIDDj_r7p8NkBTWZsqSVB0-IBrUK8TQj_Onit17ZHFsDy2hQGlGfEDlWUf7fYH3Q2ggKTleRA4jmym9IfhnsFspH7jD389sspI7lHnYYeNe9cECKk1-JMomQwZ2eZtg" />
            <div class="absolute inset-0 bg-linear-to-r from-primary-container via-transparent to-transparent"></div>
          </div>
        </div>
        <!-- Invite/CTA Card -->
        <div
          class="group bg-secondary-container rounded-xl p-8 flex flex-col justify-between border-2 border-dashed border-secondary/30 relative overflow-hidden">
          <div class="absolute -right-10 -bottom-10 opacity-10 group-hover:rotate-12 transition-transform duration-500">
            <span class="material-symbols-outlined text-[160px]" data-icon="add_circle">add_circle</span>
          </div>
          <div>
            <h3 class="text-2xl font-black text-on-secondary-container mb-2">Find More Pros</h3>
            <p class="text-secondary font-medium leading-relaxed">Expand your circle of trusted experts. Browse
              top-rated professionals in your neighborhood.</p>
          </div>
          <button
            class="bg-white text-secondary px-6 py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2 mt-8 hover:bg-secondary-fixed transition-colors">
            Explore Directory
            <span class="material-symbols-outlined" data-icon="arrow_forward">arrow_forward</span>
          </button>
        </div>
      </div>
      <!-- Recently Visited (Sub-section) -->
      <div class="mt-20">
        <div class="flex items-center justify-between mb-8">
          <h3 class="text-2xl font-extrabold text-primary-container tracking-tight">Recently Contacted</h3>
          <button class="text-secondary font-bold text-sm flex items-center gap-1 hover:underline">
            View All History
            <span class="material-symbols-outlined text-sm" data-icon="chevron_right">chevron_right</span>
          </button>
        </div>
        <div class="space-y-4">
          <!-- List Item 1 -->
          <div
            class="flex items-center justify-between p-4 bg-surface-container-low rounded-xl group hover:bg-white hover:shadow-md transition-all duration-300">
            <div class="flex items-center gap-4">
              <div class="h-12 w-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
                <img alt="Kola Olatunji" class="w-full h-full object-cover"
                  data-alt="Portrait of a friendly Nigerian man with a neat beard, wearing a professional uniform in a sunlit outdoor garden setting"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDam-BFFflGZ7-MNXglNugzPr-688uq7Y7vioG9yp6Ob_DrRVKPSbb6iKaqgi4BXBZTNtBIre0-GbLriWKMTaW5K5E91Vwnz-_8CaMl_VjmTJ29j4rwybp3FadwYxC0VR55nv9xbVcWsZkLN0sUuqnE2QPirAz7PRdgBS0e-8isIpB5UWSXWjeMBD_rG8-wIWGiMRJx8B0FE58b9vefuREPV7R1o0p5xuwhAhctC2XwPJ7a1N_vA6oclP22gmMAdJ6QLamRsvkt8Q" />
              </div>
              <div>
                <h4 class="font-bold text-primary-container">Kola Olatunji</h4>
                <p class="text-xs text-on-surface-variant font-medium">Landscape Designer • Contacted 2 days ago</p>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <button class="p-2 text-slate-400 hover:text-secondary transition-colors">
                <span class="material-symbols-outlined" data-icon="chat_bubble">chat_bubble</span>
              </button>
              <button
                class="bg-white border border-slate-100 px-4 py-2 rounded-lg text-xs font-bold text-primary-container hover:bg-primary-container hover:text-white transition-all">
                Quick Book
              </button>
            </div>
          </div>
          <!-- List Item 2 -->
          <div
            class="flex items-center justify-between p-4 bg-surface-container-low rounded-xl group hover:bg-white hover:shadow-md transition-all duration-300">
            <div class="flex items-center gap-4">
              <div class="h-12 w-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
                <img alt="Blessing Eke" class="w-full h-full object-cover"
                  data-alt="Confident woman holding a tablet, wearing stylish glasses and professional attire in a modern tech-focused workspace"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDL7UKbgpP9WV2IUxocJSCw91gynFSNqS6MIqc_kLCX-8aMIS0PKGPSzkyVif63Ob4J1ZyKx50neMwXiZJ3wxMsEzGBsOvx9W4ts1nLbdpdNu2Wr0r-a5mT8a717CcSXr_uaXFNsEAoxuRBWgRG9V7oG-iPTr41RXJ0R2ol8fgES0Rm1l2t31_54dYhC-QEvGhxIAa1oJkEGzjEekP38q_fLCBk42Pwx0aHQtVXhSsWKb6TzEcsIeFZw4tlWyKYlZHpV7zfwMBR6Q" />
              </div>
              <div>
                <h4 class="font-bold text-primary-container">Blessing Eke</h4>
                <p class="text-xs text-on-surface-variant font-medium">Private Tutor • Contacted 1 week ago</p>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <button class="p-2 text-slate-400 hover:text-secondary transition-colors">
                <span class="material-symbols-outlined" data-icon="chat_bubble">chat_bubble</span>
              </button>
              <button
                class="bg-white border border-slate-100 px-4 py-2 rounded-lg text-xs font-bold text-primary-container hover:bg-primary-container hover:text-white transition-all">
                Quick Book
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</body> 
</html>
`;


export { MobiledashboardHTML, DesktopdashboardHTML };