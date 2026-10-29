import { useState, useEffect } from 'react';
import './Navbar.css';

const navLinks = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'explore', label: 'Explore', href: '#explore' },
  { id: 'artists', label: 'Artists', href: '#artists' },
  { id: 'activities', label: 'Activities', href: '#activities' },
  { id: 'reflection', label: 'Reflection', href: '#reflection' },
  { id: 'team', label: 'Team', href: '#team' },
  { id: 'references', label: 'References', href: '#references' },
];

export default function Navbar({ className = '' }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Find active section
      const sections = navLinks.map(l => document.getElementById(l.id)).filter(Boolean);
      for (let i = sections.length - 1; i >= 0; i--) {
        const rect = sections[i].getBoundingClientRect();
        if (rect.top <= 120) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileOpen(false);
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${className}`} role="navigation" aria-label="Main navigation">
      <div className="navbar__inner">
        <a href="#home" className="navbar__logo" onClick={(e) => handleNavClick(e, '#home')}>
          <img src="/assets/logo-emblem.png" alt="Ochre & Ember Emblem" className="navbar__logo-img" />
          <span className="navbar__logo-text">
            <span className="navbar__logo-name">Ochre & Ember</span>
            <span className="navbar__logo-tagline">A Journey Through Western Art</span>
          </span>
        </a>

        <button
          className={`navbar__toggle ${mobileOpen ? 'active' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`navbar__links ${mobileOpen ? 'navbar__links--open' : ''}`}>
          {navLinks.map(link => (
            <li key={link.id}>
              <a
                href={link.href}
                className={`navbar__link ${activeSection === link.id ? 'navbar__link--active' : ''}`}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
