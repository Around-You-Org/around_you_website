import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'


const HomePage = lazy(() => import('./pages/HomePage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const WaitlistPage = lazy(() => import('./pages/WaitlistPage'))
const VerifyWaitlistPage = lazy(() => import('./pages/VerifyWaitlistPage'))
const HelpCenterPage = lazy(() => import('./pages/HelpCenterPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="pt-10 min-h-[calc(100vh-88px)]">
        <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/waitlist" element={<WaitlistPage />} />
            <Route path="/verify-waitlist" element={<VerifyWaitlistPage />} />
            <Route path="/help-center" element={<HelpCenterPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App