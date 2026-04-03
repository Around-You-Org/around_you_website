import { useState } from "react"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

function NavBar(){
  const location = useLocation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const isActive = (path) => location.pathname === path

  const scrollAndNavigate = (id) => {
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      }, 120)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
    setOpen(false)
  }

  const linkClass = (path) =>
    `nav-link text-sm font-medium ${isActive(path) ? 'text-aqua font-semibold' : 'text-navy'} hover:text-aqua`

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <Link to="/" className="flex items-center gap-2">
          <svg width="40" height="24" viewBox="0 0 80 40" fill="none">
            <path d="M20 20C20 12 26 6 34 6C38 6 41.5 8 44 11C46.5 8 50 6 54 6C62 6 68 12 68 20C68 28 62 34 54 34C50 34 46.5 32 44 29C41.5 32 38 34 34 34C26 34 20 28 20 20Z" stroke="#0D6B6E" strokeWidth="3.5" />
            <path d="M34 20C34 16 37 13 40 11C43 13 46 16 46 20C46 24 43 27 40 29C37 27 34 24 34 20Z" fill="#3EC6C8" opacity="0.5" />
            <circle cx="16" cy="10" r="3" fill="#6EE7A8" />
            <circle cx="68" cy="32" r="2.5" fill="#6EE7A8" />
          </svg>
          <span className="font-heading font-bold text-xl text-navy">AROUND<span className="text-teal">YOU</span></span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className={linkClass('/')}>Home</Link>
          <Link to="/about" className={linkClass('/about')}>About Us</Link>
          <button onClick={() => scrollAndNavigate('services-section')} className="nav-link text-sm font-medium text-navy hover:text-aqua">Services</button>
          <button onClick={() => scrollAndNavigate('contact-section')} className="nav-link text-sm font-medium text-navy hover:text-aqua">Contact</button>
        </div>

        <div className="flex items-center gap-3">
          {/* <button className="hidden md:inline-flex cta-btn px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-linear-to-r from-teal to-aqua">
            Get the App
          </button> */}
          <button className="md:hidden p-2" onClick={() => setOpen((v) => !v)}>
            {open ? <X className="w-6 h-6 text-navy" /> : <Menu className="w-6 h-6 text-navy" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden px-6 pb-4 bg-white border-t border-gray-100">
          <div className="flex flex-col gap-3 pt-2">
            <Link to="/" onClick={() => setOpen(false)} className="py-2 text-sm font-medium text-navy">Home</Link>
            <Link to="/about" onClick={() => setOpen(false)} className="py-2 text-sm font-medium text-navy">About Us</Link>
            <button onClick={() => scrollAndNavigate('services-section')} className="py-2 text-sm font-medium text-navy text-left">Services</button>
            <button onClick={() => scrollAndNavigate('contact-section')} className="py-2 text-sm font-medium text-navy text-left">Contact</button>
            {/* <button onClick={() => setOpen(false)} className="cta-btn px-5 py-2.5 rounded-full text-sm font-semibold text-white w-full bg-linear-to-r from-teal to-aqua">Get the App</button> */}
          </div>
        </div>
      )}
    </nav>
  )
}

export default NavBar;