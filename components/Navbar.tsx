import { useState, useEffect } from 'react';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {  // <-- Add ': string' type
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`Navbar ${scrolled ? 'scrolled' : ''}`} id="Navbar">
      <div className="logo">Akhonas Khuzwayo</div>
      <ul className="nav-links">
        <li><a onClick={() => scrollToSection('hero')}>Home</a></li>
        <li><a onClick={() => scrollToSection('skills')}>Skills</a></li>
        <li><a onClick={() => scrollToSection('projects')}>Projects</a></li>
        <li><a onClick={() => scrollToSection('contact')}>Contact</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;