import { BrowserRouter, Routes, Route  } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import Navbar from './components/Navbar'
import Footer from './components/Footer'



function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="pt-10 min-h-[calc(100vh-88px)]">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
