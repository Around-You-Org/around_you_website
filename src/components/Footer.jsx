import Icon from "./Icon";

function Footer() {
  return (
    <footer className="bg-[#0B1D3A] text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h3 className="text-xl font-bold text-white mb-3">AROUND<span className="text-teal">YOU</span></h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Connecting you instantly with trusted local professionals. One app for everything around you.
            </p>
            <div className="flex gap-3 mt-5">
              {[
                { name: "twitter", url: "https://twitter.com/aroundyou" },
                { name: "instagram", url: "https://instagram.com/aroundyou" },
                { name: "linkedin", url: "https://www.linkedin.com/company/around-you26/" },
                { name: "facebook", url: "https://facebook.com/aroundyou" }
              ].map(({ name, url }) => (
                <a key={name} href={url} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors">
                  <Icon name={name} size={14} color="#3EC6C8" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2.5">
              {['About Us', 'Careers', 'Press', 'Blog'].map((label) => (
                <li key={label}>
                  <button className="text-sm text-gray-400 hover:text-white transition-colors">{label}</button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2.5">
              {['Rides & Drivers', 'Artisans', 'Cleaning', 'Delivery'].map((label) => (
                <li key={label}><button className="text-sm text-gray-400 hover:text-white transition-colors">{label}</button></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2.5">
              {['Help Center', 'Safety', 'Terms of Service', 'Privacy Policy'].map((label) => (
                <li key={label}><button className="text-sm text-gray-400 hover:text-white transition-colors">{label}</button></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/20">
          <p className="text-xs text-gray-400">© 2025 AroundYou. All rights reserved.</p>
          <p className="text-xs text-gray-400">Made with 💚 in Nigeria</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer;