import { useState, useEffect, type MouseEvent } from 'react';
import { useTheme } from '../context/ThemeContext';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const next = window.scrollY > 50;
      setScrolled((current) => (current === next ? current : next));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    scrollToSection(id);
    window.history.replaceState(null, '', `#${id}`);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="Navbar">
      <div className="logo">Akhona Khuzwayo</div>
      <ul className="nav-links">
        <li><a href="#hero" onClick={(event) => handleNavClick(event, 'hero')}>Home</a></li>
        <li><a href="#about" onClick={(event) => handleNavClick(event, 'about')}>About</a></li>
        <li><a href="#skills" onClick={(event) => handleNavClick(event, 'skills')}>Skills</a></li>
        <li><a href="#certifications" onClick={(event) => handleNavClick(event, 'certifications')}>Certifications</a></li>
        <li><a href="#projects" onClick={(event) => handleNavClick(event, 'projects')}>Projects</a></li>
        <li><a href="#pricing" onClick={(event) => handleNavClick(event, 'pricing')}>Pricing</a></li>
        <li><a href="#contact" onClick={(event) => handleNavClick(event, 'contact')}>Contact</a></li>
      </ul>
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>
    </nav>
  );
}

export default Navbar;