import { useEffect, useRef, Suspense, lazy } from 'react';
import gsap from 'gsap';

const FloatingShapes = lazy(() => import('./FloatingShapes'));

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!orbRef.current) return;
      const { clientX, clientY } = e;
      // Soft parallax for the background orb
      gsap.to(orbRef.current, {
        x: (clientX - window.innerWidth / 2) * 0.1,
        y: (clientY - window.innerHeight / 2) * 0.1,
        duration: 2,
        ease: 'power2.out'
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      id="hero"
      aria-labelledby="hero-heading"
      ref={containerRef}
      style={{
        position: 'relative',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: 'var(--bg-primary)'
      }}
    >
      {/* Soft Background Orb */}
      <div 
        ref={orbRef}
        style={{
          position: 'absolute',
          width: '50vw',
          height: '50vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--accent-blush) 0%, transparent 60%)',
          filter: 'blur(80px)',
          opacity: 0.5,
          zIndex: 0,
          pointerEvents: 'none',
          top: '20%',
          left: '25%'
        }}
      />

      <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '1400px', padding: '0 5vw', alignItems: 'flex-start' }}>
        
        {/* Hello Banner */}
        <div style={{
          fontFamily: 'var(--font-body)',
          fontSize: '1rem',
          letterSpacing: '3px',
          color: 'var(--accent-electric)',
          fontWeight: 600,
          textTransform: 'uppercase',
          marginBottom: '0.5rem',
          zIndex: 3
        }}>
          HELLO! I'm:
        </div>

        {/* First Name - Cursive/Elegant */}
        <div style={{
          fontFamily: 'var(--font-vibe)',
          fontSize: 'clamp(4rem, 12vw, 11rem)', // Increased size slightly to make it pop
          fontStyle: 'italic',
          color: 'var(--text-neutral)', // Changed from accent to neutral to fit design better
          lineHeight: 1,
          position: 'relative',
          zIndex: 10,
          textShadow: '0 10px 40px rgba(0, 0, 0, 0.2)'
        }}>
          Ibrahim
        </div>

        {/* Last Name - Bold/Modern */}
        <h1 id="hero-heading" className="hero-names" style={{
          fontFamily: 'var(--font-headings)',
          fontSize: 'clamp(3rem, 9.5vw, 9.5rem)', // Increased size to match
          fontWeight: 800,
          color: 'var(--text-neutral)',
          lineHeight: 0.85,
          letterSpacing: '-2px',
          textAlign: 'left',
          marginTop: '0rem',
          position: 'relative',
          zIndex: 10,
          whiteSpace: 'nowrap',
          width: '100%',
          textShadow: '0 10px 40px rgba(0, 0, 0, 0.2)'
        }}>
          BENABIDA
        </h1>

        <p 
          style={{
            fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
            fontWeight: 400,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            textAlign: 'left',
            marginTop: '3rem',
            fontFamily: 'var(--font-body)',
            maxWidth: '500px',
            alignSelf: 'flex-start'
          }}
        >
          Crafting High-Conversion Digital Experiences.
        </p>
      </div>

      {/* 3D Model positioned in the right corner */}
      <div style={{
        position: 'absolute',
        right: 'clamp(-5vw, 2vw, 5vw)',
        top: '50%',
        transform: 'translateY(-50%)',
        width: 'clamp(250px, 50vw, 800px)',
        height: 'clamp(250px, 50vw, 800px)',
        zIndex: 1,
        pointerEvents: 'none'
      }}>
        <div style={{ width: '100%', height: '100%', pointerEvents: 'auto' }}>
          <Suspense fallback={<div style={{ width: '100%', height: '100%' }} />}>
            <FloatingShapes />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
