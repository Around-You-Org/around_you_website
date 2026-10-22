import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0B1D3A] flex items-center justify-center px-6">
      {/* single, static spotlight — consistent with the rest of the site */}
      <div
        className="pointer-events-none absolute right-[-120px] top-10 h-[480px] w-[480px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(62,198,200,0.16), transparent 70%)" }}
      />

      <div className="relative z-10 max-w-xl mx-auto text-center">
        <p
          className="text-7xl md:text-8xl font-bold text-white/15"
          style={{ fontFamily: "'Sora', sans-serif" }}
        >
          404
        </p>

        <h1
          className="mt-2 text-3xl md:text-4xl font-bold text-white"
          style={{ fontFamily: "'Sora', sans-serif" }}
        >
          This page wandered off.
        </h1>
        <p className="mt-4 text-lg text-gray-300 leading-relaxed">
          The page you're looking for doesn't exist or has moved. Let's get you
          back to finding help around you.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="px-8 py-3.5 rounded-full text-base font-semibold text-white"
            style={{ background: "linear-gradient(135deg,#0D6B6E,#3EC6C8)" }}
          >
            Back home
          </Link>
          <Link
            to="/help-center"
            className="px-8 py-3.5 rounded-full text-base font-semibold text-white transition-colors hover:bg-white/10"
            style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)" }}
          >
            Help Center
          </Link>
        </div>

        <p className="mt-10 text-sm text-gray-400">
          Think this is a mistake?{" "}
          <a
            href="mailto:support@aroundyou.com.ng"
            className="font-semibold text-[#3EC6C8] underline underline-offset-4 hover:text-white transition-colors"
          >
            Contact support
          </a>
        </p>
      </div>
    </div>
  );
}

export default NotFoundPage;
