import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  { 
    id: '01', 
    title: 'High-Conversion Landing Pages', 
    desc: 'Crafting pages strictly optimized for conversion and engagement.',
    tags: ['UI/UX', 'Conversion', 'Analytics'],
    visual: '↗'
  },
  { 
    id: '02', 
    title: 'Personal Portfolios', 
    desc: 'Aesthetic, Vibe-coded experiences tailored for your unique identity.',
    tags: ['Branding', 'Motion', '3D'],
    visual: '◎'
  },
  { 
    id: '03', 
    title: 'Performance Optimization', 
    desc: 'Lightning-fast loading speeds without compromising the soul of the design.',
    tags: ['Speed', 'Core Vitals', 'SEO'],
    visual: '⚡'
  }
];

export default function Services() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Scroll-triggered stagger entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = itemRefs.current.filter(Boolean);
      items.forEach((item, i) => {
        gsap.fromTo(item!, 
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: i * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item!,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Animate the expanding line on hover
  useEffect(() => {
    lineRefs.current.forEach((line, i) => {
      if (!line) return;
      if (activeIdx === i) {
        gsap.to(line, { scaleX: 1, duration: 0.6, ease: 'power3.out' });
      } else {
        gsap.to(line, { scaleX: 0, duration: 0.4, ease: 'power2.in' });
      }
    });
  }, [activeIdx]);

  return (
    <section 
      id="specialties"
      aria-labelledby="specialties-heading"
      ref={containerRef}
      style={{
        padding: '15vh 10vw',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'var(--bg-primary)'
      }}
    >
      {/* Section Header */}
      <div style={{ position: 'relative', zIndex: 1, marginBottom: '8vh' }}>
        <div style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: '20px',
          marginBottom: '12px'
        }}>
          <h2 
            id="specialties-heading" 
            className="heading" 
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', margin: 0 }}
          >
            Specialties
          </h2>
          <span style={{
            fontFamily: 'var(--font-vibe)',
            fontStyle: 'italic',
            color: 'var(--text-muted, #888)',
            fontSize: '1rem'
          }}>
            what I do best
          </span>
        </div>
        <div style={{
          width: '60px',
          height: '2px',
          backgroundColor: 'var(--accent-electric)',
          opacity: 0.5
        }} />
      </div>

      {/* Service Items */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column' }}>
        {services.map((service, idx) => (
          <div
            key={service.id}
            ref={el => { itemRefs.current[idx] = el; }}
            onMouseEnter={() => setActiveIdx(idx)}
            onMouseLeave={() => setActiveIdx(null)}
            style={{
              position: 'relative',
              padding: '4vh 0',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              opacity: activeIdx === null || activeIdx === idx ? 1 : 0.25
            }}
          >
            {/* Hover accent line */}
            <div
              ref={el => { lineRefs.current[idx] = el; }}
              style={{
                position: 'absolute',
                bottom: '-1px',
                left: 0,
                width: '100%',
                height: '2px',
                backgroundColor: 'var(--accent-electric)',
                transformOrigin: 'left center',
                transform: 'scaleX(0)',
                zIndex: 2
              }}
            />

            {/* Main row */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '40px',
              transition: 'transform 0.4s ease'
            }}>
              {/* Number */}
              <div style={{ 
                fontFamily: 'var(--font-body)', 
                color: activeIdx === idx ? 'var(--accent-electric)' : 'var(--text-muted, #888)',
                fontSize: '1.2rem',
                fontWeight: 600,
                transition: 'color 0.3s ease',
                minWidth: '35px'
              }}>
                {service.id}
              </div>

              {/* Title & content area */}
              <div style={{ flex: 1 }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <h3 
                    className="heading"
                    style={{ 
                      fontSize: 'clamp(1.8rem, 3.5vw, 3.5rem)',
                      marginBottom: 0,
                      transition: 'all 0.4s ease',
                      transform: activeIdx === idx ? 'translateX(20px)' : 'translateX(0)',
                      color: 'var(--text-neutral)'
                    }}
                  >
                    {service.title}
                  </h3>

                  {/* Visual icon */}
                  <div style={{
                    fontSize: '2rem',
                    color: 'var(--accent-electric)',
                    opacity: activeIdx === idx ? 1 : 0,
                    transform: activeIdx === idx ? 'translateX(0) rotate(0deg)' : 'translateX(-20px) rotate(-45deg)',
                    transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                  }}>
                    {service.visual}
                  </div>
                </div>

                {/* Expanding description panel */}
                <div style={{
                  maxHeight: activeIdx === idx ? '200px' : '0',
                  overflow: 'hidden',
                  opacity: activeIdx === idx ? 1 : 0,
                  transition: 'max-height 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.4s ease',
                  paddingLeft: activeIdx === idx ? '20px' : '0',
                }}>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    color: 'var(--text-muted, #888)',
                    fontSize: '1.05rem',
                    maxWidth: '600px',
                    paddingTop: '16px',
                    lineHeight: 1.6
                  }}>
                    {service.desc}
                  </p>

                  {/* Tags */}
                  <div style={{
                    display: 'flex',
                    gap: '10px',
                    marginTop: '16px',
                    flexWrap: 'wrap'
                  }}>
                    {service.tags.map(tag => (
                      <span key={tag} style={{
                        padding: '4px 14px',
                        border: '1px solid rgba(255,255,255,0.15)',
                        borderRadius: '20px',
                        fontSize: '0.75rem',
                        fontFamily: 'var(--font-body)',
                        color: 'var(--accent-electric)',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        transition: 'all 0.3s ease'
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
