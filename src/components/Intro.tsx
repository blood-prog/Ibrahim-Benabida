import { useRef } from 'react';

export default function Intro() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section 
      id="about"
      aria-labelledby="about-heading"
      ref={containerRef}
      style={{
        padding: '20vh 5vw',
        position: 'relative',
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '4rem'
      }}
    >
      {/* Massive ABOUT ME like the provided image */}
      <div style={{
        width: '100%',
        borderBottom: '4px solid var(--text-neutral)',
        paddingBottom: '1rem'
      }}>
        <h2 id="about-heading" style={{
          fontFamily: 'var(--font-headings)',
          fontSize: 'clamp(2.5rem, 10vw, 8rem)',
          fontWeight: 900,
          color: 'var(--text-neutral)',
          textTransform: 'uppercase',
          lineHeight: 0.9,
          letterSpacing: '2px',
          margin: 0
        }}>
          ABOUT ME
        </h2>
      </div>

      {/* Content Area - No more cursive */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '3rem',
        maxWidth: '1000px',
        alignSelf: 'flex-start'
      }}>
        <div 
          style={{
            fontSize: 'clamp(1.8rem, 4vw, 3.5rem)',
            lineHeight: 1.3,
            fontFamily: 'var(--font-headings)',
            fontWeight: 800,
            textTransform: 'uppercase',
            color: 'var(--text-neutral)',
            letterSpacing: '-1px'
          }}
        >
          I don't just build websites; I build digital experiences that stick.
        </div>
        
        <div style={{ display: 'flex', gap: '2rem', flexDirection: 'column', maxWidth: '800px' }}>
          <p style={{
            fontSize: '1.2rem',
            lineHeight: 1.8,
            color: 'rgba(44, 42, 40, 0.8)',
            fontFamily: 'var(--font-body)',
            fontWeight: 400
          }}>
            As a developer and designer, I specialize in crafting sleek portfolios, personal brands, and high-impact landing pages. My workflow is fueled by the latest AI-driven tools, allowing me to move from concept to deployment at lightning speed without losing the "soul" of the design.
          </p>
          <p style={{
            fontSize: '1.2rem',
            lineHeight: 1.8,
            color: 'rgba(44, 42, 40, 0.8)',
            fontFamily: 'var(--font-body)',
            fontWeight: 400
          }}>
            When I’m not optimizing UI/UX or deep-diving into Data Science at USTHB, you’ll find me analyzing historical military tactics or climbing the ladder in Clash Royale. I bring that same level of strategy and precision to every line of code I write.
          </p>
        </div>
      </div>
    </section>
  );
}
