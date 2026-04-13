import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CookieConsentBanner from './components/CookieConsentBanner'
import ErrorBoundary from './components/ErrorBoundary'
import ScrollToTop from './components/ScrollToTop'
import Icon from './components/Icon'


const HomePage = lazy(() => import('./pages/HomePage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const WaitlistPage = lazy(() => import('./pages/WaitlistPage'))
const VerifyWaitlistPage = lazy(() => import('./pages/VerifyWaitlistPage'))
const HelpCenterPage = lazy(() => import('./pages/HelpCenterPage'))
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'))
const TermsOfServicePage = lazy(() => import('./pages/TermsOfServicePage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

function LoadingSpinner() {
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-4"
      style={{ background: 'linear-gradient(135deg,#0B1D3A 0%,#0D6B6E 50%,#0B1D3A 100%)' }}>
      <Icon name="loader-circle" size={40} color="#3EC6C8" className="animate-spin" />
      <p className="text-gray-300 text-sm font-medium animate-pulse">Loading...</p>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Navbar />
        <main className="pt-10 min-h-[calc(100vh-88px)]">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/waitlist" element={<WaitlistPage />} />
              <Route path="/verify-waitlist" element={<VerifyWaitlistPage />} />
              <Route path="/help-center" element={<HelpCenterPage />} />
              <Route path= "/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms-of-service" element={<TermsOfServicePage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <CookieConsentBanner />
        <ScrollToTop />
      </ErrorBoundary>
    </BrowserRouter>
  )
}

export default App
