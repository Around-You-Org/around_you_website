import { useState, useEffect } from 'react'
import Icon from './Icon'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 400)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full flex items-center justify-center text-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
      style={{
        background: 'linear-gradient(135deg,#0D6B6E,#3EC6C8)',
        animation: 'fadeUp 0.3s ease-out',
      }}
    >
      <Icon name="arrow-up" size={20} color="white" />
    </button>
  )
}
