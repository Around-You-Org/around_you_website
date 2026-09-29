import Icon from "./Icon";
import { Link } from "react-router-dom";
import { PLAY_STORE_URL } from "../lib/links";

function Footer() {
  return (
    <footer className="bg-[#0B1D3A] text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h3 className="text-xl font-bold text-white mb-3">AROUND<span className="text-teal">YOU</span></h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Connect instantly with verified and trusted professionals. One app for everything around you.
            </p>
            <div className="flex gap-3 mt-5">
              {[
                { name: "twitter", url: "https://x.com/aroundyou_nig", label: "Follow us on X (Twitter)" },
                { name: "instagram", url: "https://www.instagram.com/around_you_ig/", label: "Follow us on Instagram" },
                { name: "linkedin", url: "https://www.linkedin.com/company/around-you26/", label: "Follow us on LinkedIn" },
                { name: "tiktok", url: "https://www.tiktok.com/@aroundyou_ng", label: "Follow us on TikTok" }
              ].map(({ name, url, label }) => (
                <a key={name} href={url} target="_blank" rel="noopener noreferrer" aria-label={label} className="w-8 h-8 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors">
                  <Icon name={name} size={14} color="#3EC6C8" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/about" className="text-sm text-gray-400 hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <a href="/#contact-section" className="text-sm text-gray-400 hover:text-white transition-colors">Become a Provider</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2.5">
              {['Rides & Drivers', 'Artisans', 'Cleaning', 'Delivery'].map((label) => (
                <li key={label}>
                  <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white transition-colors">{label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/help-center" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/app-privacy-policy" className="text-sm text-gray-400 hover:text-white transition-colors">
                  App Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/20">
          <p className="text-xs text-gray-400">© 2026 AroundYou. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/privacy-policy" className="text-sm text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="text-sm text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;