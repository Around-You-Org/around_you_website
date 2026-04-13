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
          <img src="/logo.png" alt="AroundYou logo" width="40" height="24" />
          <span className="font-heading font-bold text-xl text-navy">AROUND<span className="text-teal-800">YOU</span></span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className={linkClass('/')}>Home</Link>
          <Link to="/about" className={linkClass('/about')}>About Us</Link>
          <button type="button" onClick={() => scrollAndNavigate('services-section')} className="nav-link text-sm font-medium text-navy hover:text-aqua">Services</button>
          <button type="button" onClick={() => scrollAndNavigate('contact-section')} className="nav-link text-sm font-medium text-navy hover:text-aqua">Contact</button>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/waitlist?role=customer"
            className="hidden md:inline-flex cta-btn px-5 py-2.5 rounded-full text-sm font-semibold text-white"
            style={{
              background: "linear-gradient(135deg,#0D6B6E,#3EC6C8)",
            }}
          >
            Join Waitlist
          </Link>
          <button
            type="button"
            className="md:hidden p-2"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="w-6 h-6 text-navy" /> : <Menu className="w-6 h-6 text-navy" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden px-6 pb-4 bg-white border-t border-gray-100">
          <div className="flex flex-col gap-3 pt-2">
            <Link to="/" onClick={() => setOpen(false)} className="py-2 text-sm font-medium text-navy">Home</Link>
            <Link to="/about" onClick={() => setOpen(false)} className="py-2 text-sm font-medium text-navy">About Us</Link>
            <button type="button" onClick={() => scrollAndNavigate('services-section')} className="py-2 text-sm font-medium text-navy text-left">Services</button>
            <button type="button" onClick={() => scrollAndNavigate('contact-section')} className="py-2 text-sm font-medium text-navy text-left">Contact</button>
            <Link
              to="/waitlist?role=customer"
              onClick={() => setOpen(false)}
              className="cta-btn px-5 py-2.5 rounded-full text-sm font-semibold text-white w-full text-center"
              style={{
                background: "linear-gradient(135deg,#0D6B6E,#3EC6C8)",
              }}
            >
              Join Waitlist
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default NavBar;