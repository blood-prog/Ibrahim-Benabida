import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Manifesto() {
  const containerRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const statementsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Expand core on scroll
    gsap.to(coreRef.current, {
      scale: 25,
      opacity: 0.05,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      }
    });

    const statements = statementsRef.current?.children;
    if (statements) {
      Array.from(statements).forEach((stmt) => {
        gsap.fromTo(stmt, 
          { opacity: 0, filter: 'blur(20px)', y: 50 },
          { 
            opacity: 1, filter: 'blur(0px)', y: 0, duration: 1,
            scrollTrigger: {
              trigger: stmt,
              start: 'top 80%',
              end: 'top 40%',
              scrub: 1
            }
          }
        );
      });
    }
  }, []);

  return (
    <section 
      id="manifesto"
      aria-label="Design Manifesto"
      ref={containerRef}
      style={{
        position: 'relative',
        padding: '20vh 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: 'var(--bg-secondary)'
      }}
    >
      {/* Glowing Core */}
      <div 
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          zIndex: 0
        }}
      >
        <div 
          ref={coreRef}
          style={{
            width: '10vw',
            height: '10vw',
            borderRadius: '50%',
            backgroundColor: 'var(--accent-electric)',
            boxShadow: '0 0 100px var(--accent-electric), 0 0 200px var(--accent-blush)',
          }}
        />
      </div>

      <div 
        ref={statementsRef}
        className="manifesto-container"
        style={{
          position: 'relative',
          color: 'var(--text-neutral)',
          zIndex: 1,
          width: '100%',
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 5vw',
          display: 'flex',
          flexDirection: 'column',
          gap: '25vh'
        }}
      >
        <div style={{ alignSelf: 'flex-start' }}>
          <div style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)', fontFamily: 'var(--font-headings)', fontWeight: 800, textTransform: 'uppercase', lineHeight: 1 }}>
            Logic over
            <br />
            <span style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', fontWeight: 400, textTransform: 'lowercase', color: 'var(--accent-electric)' }}>fluff.</span>
          </div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.2rem', color: 'rgba(44,42,40,0.6)', maxWidth: '400px', marginTop: '20px', lineHeight: 1.6 }}>
            Every element must serve a purpose. We strip away the unnecessary to reveal the essential core of your digital identity.
          </p>
        </div>

        <div style={{ alignSelf: 'center', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)', fontFamily: 'var(--font-headings)', fontWeight: 800, textTransform: 'uppercase', lineHeight: 1 }}>
            Speed is a
            <br />
            <span style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', fontWeight: 400, textTransform: 'lowercase', color: 'var(--accent-electric)' }}>feature.</span>
          </div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.2rem', color: 'rgba(44,42,40,0.6)', maxWidth: '400px', marginTop: '20px', lineHeight: 1.6 }}>
            Lightning-fast load times are non-negotiable. Performance engineering is baked directly into the aesthetics.
          </p>
        </div>

        <div style={{ alignSelf: 'flex-end', textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          <div style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)', fontFamily: 'var(--font-headings)', fontWeight: 800, textTransform: 'uppercase', lineHeight: 1 }}>
            Data-driven
            <br />
            <span style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', fontWeight: 400, textTransform: 'lowercase', color: 'var(--accent-electric)' }}>design.</span>
          </div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.2rem', color: 'rgba(44,42,40,0.6)', maxWidth: '400px', marginTop: '20px', lineHeight: 1.6, textAlign: 'left' }}>
            Analytical precision heavily influences our creative direction, yielding an interface built perfectly for high-impact conversion.
          </p>
        </div>
      </div>
    </section>
  );
}
