import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const statements = [
  {
    heading: <>Logic over<br /><span className="manifesto-accent">fluff.</span></>,
    body: 'Every element must serve a purpose. We strip away the unnecessary to reveal the essential core of your digital identity.',
    align: 'flex-start' as const,
    textAlign: 'left' as const,
  },
  {
    heading: <>Speed is a<br /><span className="manifesto-accent">feature.</span></>,
    body: 'Lightning-fast load times are non-negotiable. Performance engineering is baked directly into the aesthetics.',
    align: 'center' as const,
    textAlign: 'center' as const,
  },
  {
    heading: <>Data-driven<br /><span className="manifesto-accent">design.</span></>,
    body: 'Analytical precision heavily influences our creative direction, yielding an interface built perfectly for high-impact conversion.',
    align: 'flex-end' as const,
    textAlign: 'right' as const,
  }
];

export default function Manifesto() {
  const containerRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Expand core on scroll
      gsap.fromTo(coreRef.current,
        { scale: 1, opacity: 0.15 },
        {
          scale: 20,
          opacity: 0.03,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
          }
        }
      );

      // Animate each statement block: heading + paragraph
      const blocks = containerRef.current?.querySelectorAll('.manifesto-block');
      blocks?.forEach((block) => {
        const heading = block.querySelector('.manifesto-heading');
        const body = block.querySelector('.manifesto-body');

        // Heading: slide in + reveal
        gsap.fromTo(heading,
          { opacity: 0, y: 80, filter: 'blur(10px)' },
          {
            opacity: 1, y: 0, filter: 'blur(0px)',
            duration: 1,
            scrollTrigger: {
              trigger: block,
              start: 'top 85%',
              end: 'top 45%',
              scrub: 1
            }
          }
        );

        // Body: fade in slightly after heading
        gsap.fromTo(body,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: block,
              start: 'top 75%',
              end: 'top 40%',
              scrub: 1
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
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
        backgroundColor: '#0A0A0A'
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
            background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
            boxShadow: '0 0 80px rgba(255,255,255,0.04), 0 0 160px rgba(255,255,255,0.02)',
          }}
        />
      </div>

      <div
        style={{
          position: 'relative',
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
        {statements.map((s, i) => (
          <div
            key={i}
            className="manifesto-block"
            style={{
              alignSelf: s.align,
              textAlign: s.textAlign,
              display: 'flex',
              flexDirection: 'column',
              alignItems: s.align,
              maxWidth: '700px'
            }}
          >
            <div
              className="manifesto-heading"
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 6rem)',
                fontFamily: 'var(--font-headings)',
                fontWeight: 800,
                textTransform: 'uppercase',
                lineHeight: 1,
                color: '#FAFAFA',
                letterSpacing: '-1px'
              }}
            >
              {s.heading}
            </div>
            <p
              className="manifesto-body"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(1rem, 1.2vw, 1.25rem)',
                color: 'rgba(250, 250, 250, 0.55)',
                maxWidth: '450px',
                marginTop: '24px',
                lineHeight: 1.7,
                fontWeight: 400,
                textAlign: 'left'
              }}
            >
              {s.body}
            </p>
          </div>
        ))}
      </div>

      {/* Accent CSS */}
      <style>{`
        .manifesto-accent {
          font-family: var(--font-editorial);
          font-style: italic;
          font-weight: 400;
          text-transform: lowercase;
          color: rgba(255,255,255,0.35);
        }
      `}</style>
    </section>
  );
}
