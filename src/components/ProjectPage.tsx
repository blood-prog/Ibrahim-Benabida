import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import type { ProjectData } from '../data/projects';

interface ProjectPageProps {
  project: ProjectData;
  onClose: () => void;
}

export default function ProjectPage({ project, onClose }: ProjectPageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable background scroll
    document.body.style.overflow = 'hidden';

    const ctx = gsap.context(() => {
      // Smooth slide up entrance
      gsap.from(containerRef.current, {
        y: '100%',
        duration: 0.8,
        ease: 'power3.inOut'
      });
      
      gsap.from('.stagger-item', {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        delay: 0.5
      });
    }, containerRef);

    return () => {
      document.body.style.overflow = '';
      ctx.revert();
    };
  }, []);

  const handleClose = () => {
    // Smooth slide down exit
    gsap.to(containerRef.current, {
      y: '100%',
      duration: 0.6,
      ease: 'power3.inOut',
      onComplete: onClose
    });
  };

  return (
    <div 
      ref={containerRef}
      data-lenis-prevent="true"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-title-heading"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'var(--bg-primary)',
        overflowY: 'auto',
        overflowX: 'hidden',
        overscrollBehavior: 'contain'
      }}
    >
      {/* Navigation Bar */}
      <div style={{
        position: 'sticky',
        top: 0,
        width: '100%',
        padding: '2rem 5vw',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 10,
        background: 'linear-gradient(to bottom, var(--bg-primary) 50%, transparent)'
      }}>
        <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, color: 'var(--text-neutral)' }}>
          {project.id} // CASE STUDY
        </div>
        <button 
          onClick={handleClose}
          style={{
            background: 'none',
            border: 'none',
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            color: 'var(--text-neutral)',
            cursor: 'pointer',
            padding: '10px 20px',
            borderBottom: '2px solid var(--text-neutral)'
          }}
        >
          Close
        </button>
      </div>

      <div ref={contentRef} style={{ padding: '5vh 5vw 15vh 5vw', maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Hero Section */}
        <div className="stagger-item" style={{ marginBottom: '10vh' }}>
          <h1 id="project-title-heading" style={{
            fontFamily: 'var(--font-headings)',
            fontSize: 'clamp(3rem, 8vw, 8rem)',
            color: 'var(--text-neutral)',
            lineHeight: 0.9,
            textTransform: 'uppercase',
            letterSpacing: '-2px',
            marginBottom: '2rem'
          }}>
            {project.title}
          </h1>
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            {project.technologies.map(tech => (
              <span key={tech} style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                color: 'var(--text-neutral)',
                border: '1px solid var(--accent-blush)',
                padding: '8px 16px',
                borderRadius: '50px'
              }}>
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Media Coverage */}
          <p style={{ 
            fontSize: '0.75rem', 
            color: 'rgba(44,42,40,0.5)', 
            fontFamily: 'var(--font-body)', 
            fontWeight: 500, 
            marginBottom: '1rem',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            Video load optimization in progress. Please allow a few seconds for the stream to initialize.
          </p>
          <div className="stagger-item" style={{
            width: '100%',
            aspectRatio: '16/9',
            backgroundColor: '#EFE9E3',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '10vh',
            borderRadius: '8px',
            border: '1px solid rgba(0,0,0,0.05)',
            overflow: 'hidden'
          }}>
          {project.videoUrl ? (
            <video 
              src={project.videoUrl}
              autoPlay 
              muted 
              loop 
              playsInline
              title={`${project.title} case study video`}
              aria-label={`${project.title} detailed walkthrough video`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <p style={{ fontFamily: 'var(--font-body)', color: 'rgba(0,0,0,0.3)', fontWeight: 600, letterSpacing: '2px' }}>
              [ YOUR VIDEO / OUTSIDE PICTURE PLACEMENT ]
            </p>
          )}
        </div>

        {/* Content Section */}
        <div className="stagger-item project-page-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '50px', alignItems: 'start' }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--accent-electric)', marginBottom: '1rem' }}>
              The Challenge
            </h3>
            <a 
              href={project.demoUrl} 
              target="_blank" 
              rel="noreferrer"
              style={{
                display: 'inline-block',
                marginTop: '2rem',
                padding: '16px 32px',
                backgroundColor: 'var(--text-neutral)',
                color: 'var(--bg-primary)',
                textDecoration: 'none',
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                borderRadius: '50px',
                textTransform: 'uppercase'
              }}
            >
              Visit Live Site
            </a>
          </div>
          <div>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.4rem',
              lineHeight: 1.8,
              color: 'var(--text-neutral)'
            }}>
              {project.description}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
