import { Link } from "react-router-dom";
import useScrollReveal from "../hooks/useScrollReveal";

function NotFoundPage() {
  useScrollReveal();

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0B1D3A] to-[#1e3a5f] flex items-center justify-center px-6">
      <div className="max-w-2xl mx-auto text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-bold text-white mb-4 opacity-20">
            404
          </h1>
        </div>

        {/* Content */}
        <div className="scroll-reveal">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Oops! Page Not Found
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            The page you're looking for doesn't exist or has been moved.
            Don't worry, let's get you back on track.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              to="/"
              className="bg-[#3EC6C8] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#2ba8aa] transition-colors text-lg"
            >
              Go Home
            </Link>
            <Link
              to="/help-center"
              className="bg-white/10 border-2 border-white/20 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-colors text-lg"
            >
              Help Center
            </Link>
          </div>

          {/* Additional Help */}
          <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
            <h3 className="text-lg font-semibold text-white mb-4">
              Need Help?
            </h3>
            <p className="text-gray-300 mb-4">
              If you believe this is an error, please contact our support team.
            </p>
            <a
              href="mailto:support@aroundyou.com.ng"
              className="text-[#3EC6C8] hover:text-[#2ba8aa] transition-colors font-medium"
            >
              support@aroundyou.com.ng
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;