import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects, type ProjectData } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

interface WorkGalleryProps {
  onProjectSelect: (project: ProjectData) => void;
}

export default function WorkGallery({ onProjectSelect }: WorkGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Only apply parallax on desktop - it pushes titles off-screen on mobile
      if (window.innerWidth > 1024) {
        const titles = gsap.utils.toArray('.project-title') as HTMLElement[];
        titles.forEach((title, i) => {
          gsap.to(title, {
            x: i % 2 === 0 ? 50 : -50,
            ease: 'none',
            scrollTrigger: {
              trigger: title,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1
            }
          });
        });
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="works"
      aria-labelledby="works-heading"
      ref={containerRef}
      style={{
        padding: '10vh 10vw',
        position: 'relative',
        backgroundColor: 'var(--bg-primary)'
      }}
    >
      <h2 id="works-heading" className="heading" style={{ fontSize: '3rem', marginBottom: '10vh' }}>
        Selected Works
        <span style={{ display: 'block', fontSize: '1rem', color: 'var(--accent-electric)', fontFamily: 'var(--font-body)', fontWeight: 400, marginTop: '10px' }}>THE   PORTFOLIO   VAULT</span>
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15vh' }}>
        {projects.map((proj) => (
          <div
            key={proj.id}
            data-cursor="VIEW PROJECT"
            className="work-gallery-card"
            onClick={() => onProjectSelect(proj)}
            style={{
              alignSelf: proj.align,
              width: '80%',
              maxWidth: '800px',
              position: 'relative',
              marginTop: proj.marginTop || '0'
            }}
          >
            <div style={{ textDecoration: 'none', display: 'block' }}>
              <div
                className="project-image-container"
                style={{
                  width: '100%',
                  aspectRatio: '16/9',
                  backgroundColor: 'rgba(0,0,0,0.05)',
                  position: 'relative',
                  border: '1px solid rgba(0,0,0,0.1)',
                  transition: 'all 0.5s ease',
                  cursor: 'none' // relies on custom cursor
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget.style as any).borderColor = 'var(--accent-electric)';
                  (e.currentTarget.querySelector('.placeholder-gradient') as HTMLElement).style.opacity = '1';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget.style as any).borderColor = 'rgba(0,0,0,0.1)';
                  (e.currentTarget.querySelector('.placeholder-gradient') as HTMLElement).style.opacity = '0';
                }}
              >
                {/* Inner clipped section to prevent SVGs going outside bounds, allowing h3 text free flow */}
                <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
                  {proj.isVideoCover && proj.videoUrl ? (
                    <video
                      src={`${proj.videoUrl}#t=1`}
                      autoPlay
                      muted
                      loop
                      playsInline
                      title={`${proj.title} project showcase`}
                      aria-label={`${proj.title} project demonstration video`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        filter: 'grayscale(100%)',
                        opacity: 0.8
                      }}
                    />
                  ) : (
                    <div style={{
                      width: '100%',
                      height: '100%',
                      backgroundColor: '#D9CFC7', // Light placeholder
                      backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23000000\' fill-opacity=\'0.05\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
                      filter: 'grayscale(100%)'
                    }}></div>
                  )}
                  <div
                    className="placeholder-gradient"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(135deg, rgba(201,181,156,0.5), rgba(249,248,246,0.8))',
                      mixBlendMode: 'color',
                      opacity: 0,
                      transition: 'opacity 0.6s ease'
                    }}
                  ></div>
                </div>
              </div>

              {/* Text content wrapped cleanly below the media */}
              <div style={{ marginTop: '2rem', paddingLeft: proj.align === 'flex-end' ? '0' : '5%', paddingRight: proj.align === 'flex-end' ? '5%' : '0', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <h3
                  className="project-title heading"
                  style={{
                    fontSize: 'clamp(1.5rem, 5vw, 4rem)',
                    color: 'var(--text-neutral)',
                    whiteSpace: 'normal',
                    lineHeight: 1,
                    textTransform: 'uppercase',
                    margin: 0
                  }}
                >
                  {proj.title}
                </h3>
                <div style={{ fontFamily: 'var(--font-body)', color: 'rgba(44,42,40,0.6)', letterSpacing: '1px', fontSize: '1rem', textTransform: 'uppercase' }}>
                  {proj.id} // {proj.category}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
