import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

const services = [
  { id: '01', title: 'High-Conversion Landing Pages', desc: 'Crafting pages strictly optimized for conversion and engagement.' },
  { id: '02', title: 'Personal Portfolios', desc: 'Aesthetic, Vibe-coded experiences tailored for your unique identity.' },
  { id: '03', title: 'Performance Optimization', desc: 'Lightning-fast loading speeds without compromising the soul of the design.' }
];

export default function Services() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const bgNumberRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (bgNumberRef.current && hoveredIdx !== null) {
        // move background number towards mouse smoothly
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          gsap.to(bgNumberRef.current, {
            x,
            y,
            duration: 0.8,
            ease: 'power3.out',
            xPercent: -50,
            yPercent: -50
          });
        }
      }
    };

    const container = containerRef.current;
    container?.addEventListener('mousemove', handleMouseMove);
    return () => container?.removeEventListener('mousemove', handleMouseMove);
  }, [hoveredIdx]);

  return (
    <section 
      id="specialties"
      aria-labelledby="specialties-heading"
      ref={containerRef}
      style={{
        padding: '15vh 10vw',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div 
        ref={bgNumberRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          fontSize: '40vw',
          fontWeight: 800,
          color: 'var(--text-neutral)',
          opacity: hoveredIdx !== null ? 0.04 : 0,
          lineHeight: 0.8,
          fontFamily: 'var(--font-headings)',
          pointerEvents: 'none',
          zIndex: 0,
          transition: 'opacity 0.6s ease'
        }}
      >
        {hoveredIdx !== null ? services[hoveredIdx].id : '00'}
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <h2 id="specialties-heading" className="heading" style={{ fontSize: '2.5rem', marginBottom: '8vh' }}>Specialties</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {services.map((service, idx) => (
            <div
              key={service.id}
              className="service-card"
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{
                padding: '4vh 0',
                borderBottom: '1px solid rgba(0,0,0,0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: '40px',
                transition: 'all 0.4s ease',
                cursor: 'pointer',
                opacity: hoveredIdx === null || hoveredIdx === idx ? 1 : 0.4
              }}
            >
              <div 
                style={{ 
                  fontFamily: 'var(--font-body)', 
                  color: hoveredIdx === idx ? 'var(--accent-electric)' : 'rgba(44,42,40,0.5)',
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  transition: 'color 0.3s ease'
                }}
              >
                {service.id}
              </div>
              <div style={{ flex: 1 }}>
                <h3 
                  className="heading"
                  style={{ 
                    fontSize: 'clamp(2rem, 4vw, 4rem)',
                    marginBottom: '10px',
                    transition: 'all 0.3s'
                  }}
                >
                  {service.title}
                </h3>
                <div style={{
                  height: hoveredIdx === idx ? 'auto' : '0',
                  overflow: 'hidden',
                  opacity: hoveredIdx === idx ? 1 : 0,
                  transition: 'opacity 0.4s ease'
                }}>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    color: 'rgba(44,42,40,0.7)',
                    fontSize: '1.1rem',
                    maxWidth: '600px',
                    paddingTop: '10px'
                  }}>
                    {service.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
