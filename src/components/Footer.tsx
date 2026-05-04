import { useEffect, useRef, Suspense, lazy } from 'react';
import gsap from 'gsap';

const InteractiveGlobe = lazy(() => import('./InteractiveGlobe'));

export default function Footer() {
  const btnRef = useRef<HTMLAnchorElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Magnetic Button logic
    const btn = btnRef.current;
    if (!btn) return;

    // Cache rect on mouseenter to avoid per-frame layout reads
    let cachedRect: DOMRect | null = null;

    const handleMouseEnter = () => {
      cachedRect = btn.getBoundingClientRect();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!cachedRect) return;
      const x = e.clientX - cachedRect.left - cachedRect.width / 2;
      const y = e.clientY - cachedRect.top - cachedRect.height / 2;

      const distance = Math.hypot(x, y);
      if (distance < 150) {
        gsap.to(btn, { x: x * 0.4, y: y * 0.4, duration: 0.3, ease: 'power2.out' });
      } else {
        gsap.to(btn, { x: 0, y: 0, duration: 0.3, ease: 'power2.out' });
      }
    };

    const handleMouseLeave = () => {
      cachedRect = null;
      gsap.to(btn, { x: 0, y: 0, duration: 0.3, ease: 'power2.out' });
    };

    btn.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mousemove', handleMouseMove);
    btn.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      btn.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mousemove', handleMouseMove);
      btn.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <footer 
      id="contact"
      ref={containerRef}
      style={{
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}
    >
      {/* Light Action Section */}
      <div style={{
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'var(--bg-primary)',
        padding: '10vh 20px',
        borderTop: '1px solid rgba(0,0,0,0.05)'
      }}>
        <h2 
          className="heading"
          style={{
            fontSize: 'clamp(3rem, 11vw, 12rem)',
            color: 'var(--text-neutral)',
            lineHeight: 0.9,
            marginBottom: '3rem',
            textAlign: 'center',
            letterSpacing: '-2px'
          }}
        >
          SAY HELLO
        </h2>
        
        <a 
          ref={btnRef}
          href="mailto:ibrahim.benabida.mail@gmail.com"
          style={{
            display: 'inline-block',
            padding: '24px 48px',
            borderRadius: '100px',
            backgroundColor: 'transparent',
            border: '2px solid var(--text-neutral)',
            color: 'var(--text-neutral)',
            fontSize: '1.2rem',
            fontFamily: 'var(--font-body)',
            fontWeight: 800,
            textDecoration: 'none',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            position: 'relative',
            cursor: 'none'
          }}
          onMouseEnter={(e) => {
            gsap.to(e.currentTarget, { backgroundColor: 'var(--accent-electric)', color: 'var(--bg-primary)', borderColor: 'var(--accent-electric)', duration: 0.3 });
          }}
          onMouseLeave={(e) => {
            gsap.to(e.currentTarget, { backgroundColor: 'transparent', color: 'var(--text-neutral)', borderColor: 'var(--text-neutral)', duration: 0.3 });
          }}
        >
          Email Me
        </a>
      </div>

      {/* Dark Footer Section */}
      <div style={{
        backgroundColor: '#161616',
        padding: '8vh 5vw 4vh 5vw',
        display: 'flex',
        flexDirection: 'column',
        gap: '6vh',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="footer-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '40px',
          maxWidth: '1400px',
          width: '100%',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2
        }}>
          {/* EMAILS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h4 style={{ color: '#D9CFC7', fontFamily: 'var(--font-headings)', fontSize: '0.9rem', letterSpacing: '2px', textTransform: 'uppercase' }}>Emails</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <a href="mailto:contact@ibrahimbenabida.me" style={{ color: '#F9F8F6', textDecoration: 'none', fontFamily: 'var(--font-body)', fontSize: '0.95rem', fontWeight: 600 }}>contact@ibrahimbenabida.me</a>
              <a href="mailto:ibrahim.benabida.mail@gmail.com" style={{ color: '#F9F8F6', textDecoration: 'none', fontFamily: 'var(--font-body)', fontSize: '0.95rem', fontWeight: 600 }}>ibrahim.benabida.mail@gmail.com</a>
            </div>
          </div>

          {/* ADDRESS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h4 style={{ color: '#D9CFC7', fontFamily: 'var(--font-headings)', fontSize: '0.9rem', letterSpacing: '2px', textTransform: 'uppercase' }}>Address</h4>
            <address style={{ color: '#F9F8F6', fontFamily: 'var(--font-body)', fontSize: '0.95rem', lineHeight: 1.8, fontWeight: 600, fontStyle: 'normal' }}>
              Algiers, Algeria<br/>
              Available for remote work worldwide.
            </address>
          </div>

          {/* LINKS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h4 style={{ color: '#D9CFC7', fontFamily: 'var(--font-headings)', fontSize: '0.9rem', letterSpacing: '2px', textTransform: 'uppercase' }}>Links</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <a href="#" style={{ color: '#F9F8F6', textDecoration: 'none', fontFamily: 'var(--font-body)', fontSize: '0.95rem', fontWeight: 600, transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#C9B59C'} onMouseLeave={(e) => e.currentTarget.style.color = '#F9F8F6'}>Curriculum Vitae</a>
              <a href="#" style={{ color: '#F9F8F6', textDecoration: 'none', fontFamily: 'var(--font-body)', fontSize: '0.95rem', fontWeight: 600, transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#C9B59C'} onMouseLeave={(e) => e.currentTarget.style.color = '#F9F8F6'}>Github Profile</a>
            </div>
          </div>
        </div>

        {/* Globe Background */}
        <div style={{
          position: 'absolute',
          right: '-10%',
          bottom: '-20%',
          width: '600px',
          height: '600px',
          zIndex: 1,
          opacity: 0.6,
          pointerEvents: 'none' // Don't block links
        }}>
          <Suspense fallback={null}>
            <InteractiveGlobe />
          </Suspense>
        </div>

        <div style={{
          maxWidth: '1400px',
          width: '100%',
          margin: '0 auto',
          paddingTop: '20px',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          position: 'relative',
          zIndex: 2
        }}>
          <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)', fontWeight: 600 }}>
            © {new Date().getFullYear()} Ibrahim Benabida.
          </div>
        </div>
      </div>
    </footer>
  );
}
