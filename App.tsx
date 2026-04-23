import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Skills from "./components/Skills"
import Certifications from "./components/Certifications"
import Projects from "./components/Projects"
import Pricing from "./components/Pricing"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import NewsTicker from "./components/NewsTicker"
import { useEffect, useState } from 'react'

function App() {
  const [showTicker, setShowTicker] = useState(true);

  useEffect(() => {
    // Navbar scroll effect
    const handleScroll = () => {
      const navbar = document.getElementById('Navbar');
      if (window.scrollY > 50) {
        navbar?.classList.add('scrolled');
      } else {
        navbar?.classList.remove('scrolled');
      }

      // Keep ticker visible only while user is on the Home section area.
      setShowTicker(window.scrollY < window.innerHeight * 0.6);
    };

    // Scroll reveal animation
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
      observer.observe(el);
    });

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Navbar />
      {showTicker && <NewsTicker />}
      <Hero />
      <Skills />
      <Certifications />
      <Projects />
      <Pricing />
      <Contact />
      <Footer />
    </>
  )
}

export default App