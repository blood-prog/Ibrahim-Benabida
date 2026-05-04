import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        padding: '20px 4vw',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 100,
        backgroundColor: 'rgba(10, 10, 10, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        boxShadow: '0 4px 30px rgba(0,0,0,0.4)'
      }}>
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', zIndex: 101, cursor: 'pointer' }}
        >
          <div style={{ 
            fontFamily: 'var(--font-headings)', 
            fontWeight: 800, 
            fontSize: '1.2rem', 
            color: 'var(--text-neutral)',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            Ibrahim Benabida
          </div>
        </div>
        
        <nav className="desktop-nav" aria-label="Main Navigation" style={{ gap: '30px' }}>
          <a href="#works" style={{ color: 'var(--text-neutral)', textDecoration: 'none', fontFamily: 'var(--font-body)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-electric)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-neutral)'}>Works</a>
          <a href="#specialties" style={{ color: 'var(--text-neutral)', textDecoration: 'none', fontFamily: 'var(--font-body)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-electric)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-neutral)'}>Specialties</a>
          <a href="#contact" style={{ color: 'var(--text-neutral)', textDecoration: 'none', fontFamily: 'var(--font-body)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-electric)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-neutral)'}>Contact</a>
        </nav>

        <button 
          className="mobile-menu-btn"
          onClick={() => setIsOpen(!isOpen)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-neutral)', zIndex: 101 }}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </header>

      {/* Mobile Overlay Menu */}
      <div style={{
        position: 'fixed',
        top: isOpen ? 0 : '-100vh',
        left: 0,
        width: '100%',
        height: '100vh',
        backgroundColor: 'var(--bg-primary)',
        zIndex: 99,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '40px',
        transition: 'top 0.5s cubic-bezier(0.77, 0, 0.175, 1)'
      }}>
        <a href="#works" onClick={() => setIsOpen(false)} style={{ color: 'var(--text-neutral)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '15px' }}>
          <span style={{ fontFamily: 'var(--font-vibe)', fontStyle: 'italic', color: 'var(--accent-electric)', fontSize: '1.2rem' }}>01</span>
          <span style={{ fontFamily: 'var(--font-headings)', fontSize: 'clamp(1.8rem, 7vw, 3rem)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-1px' }}>Works</span>
        </a>
        <a href="#specialties" onClick={() => setIsOpen(false)} style={{ color: 'var(--text-neutral)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '15px' }}>
          <span style={{ fontFamily: 'var(--font-vibe)', fontStyle: 'italic', color: 'var(--accent-electric)', fontSize: '1.2rem' }}>02</span>
          <span style={{ fontFamily: 'var(--font-headings)', fontSize: 'clamp(1.8rem, 7vw, 3rem)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-1px' }}>Specialties</span>
        </a>
        <a href="#contact" onClick={() => setIsOpen(false)} style={{ color: 'var(--text-neutral)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '15px' }}>
          <span style={{ fontFamily: 'var(--font-vibe)', fontStyle: 'italic', color: 'var(--accent-electric)', fontSize: '1.2rem' }}>03</span>
          <span style={{ fontFamily: 'var(--font-headings)', fontSize: 'clamp(1.8rem, 7vw, 3rem)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-1px' }}>Contact</span>
        </a>
      </div>
    </>
  );
}
