import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects, type ProjectData } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

interface WorkGalleryProps {
  onProjectSelect: (project: ProjectData) => void;
}

export default function WorkGallery({ onProjectSelect }: WorkGalleryProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const gridCanvasRef = useRef<HTMLCanvasElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const pathsRef = useRef<{ curve: any; letterElements: HTMLElement[] }[]>([]);
  const animFrameRef = useRef<number>(0);
  const scrollProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const patternCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const lerp = (start: number, end: number, t: number) => start + (end - start) * t;

  useEffect(() => {
    // Pre-render the dot grid pattern once
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 30;
    pCanvas.height = 30;
    const pCtx = pCanvas.getContext('2d');
    if (pCtx) {
      pCtx.fillStyle = '#0A0A0A';
      pCtx.fillRect(0, 0, 30, 30);
      pCtx.fillStyle = '#E0E0E0';
      pCtx.beginPath();
      // Draw the dot at (0,0) so the pattern repeats seamlessly
      pCtx.arc(0, 0, 1, 0, Math.PI * 2);
      pCtx.fill();
    }
    patternCanvasRef.current = pCanvas;
  }, []);

  const drawGrid = useCallback((scrollProgress: number) => {
    const canvas = gridCanvasRef.current;
    if (!canvas || !patternCanvasRef.current) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const spacing = 30;
    const offset = (scrollProgress * spacing * 10) % spacing;

    const pattern = ctx.createPattern(patternCanvasRef.current, 'repeat');
    if (pattern) {
      ctx.save();
      ctx.translate(-offset, 0);
      ctx.fillStyle = pattern;
      ctx.fillRect(offset, 0, canvas.width + spacing, canvas.height + spacing);
      ctx.restore();
    }
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;
    const canvas = gridCanvasRef.current;
    const textContainer = textContainerRef.current;
    if (!section || !cards || !canvas || !textContainer) return;

    // Resize canvas
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.scale(dpr, dpr);

    // Build 3D-like text paths using simple sine wave math (no Three.js needed)
    const word = 'WORK';
    const createPath = (yPos: number, amplitude: number) => {
      const points: { x: number; y: number; z: number }[] = [];
      for (let i = 0; i <= 20; i++) {
        const t = i / 20;
        points.push({
          x: -25 + 50 * t,
          y: yPos + Math.sin(t * Math.PI) * -amplitude,
          z: (1 - Math.pow(Math.abs(t - 0.5) * 2, 2)) * -5
        });
      }
      return points;
    };

    const pathConfigs = [
      { yPos: 10, amplitude: 2 },
      { yPos: 3.5, amplitude: 1 },
      { yPos: -3.5, amplitude: -1 },
      { yPos: -10, amplitude: -2 }
    ];

    const speedMultipliers = [0.8, 1, 0.7, 0.9];

    // Create letter elements
    const paths = pathConfigs.map((config, lineIndex) => {
      const curvePoints = createPath(config.yPos, config.amplitude);

      const letterElements: HTMLElement[] = [];
      for (let i = 0; i < 15; i++) {
        const el = document.createElement('div');
        el.className = 'showcase-letter';
        el.textContent = word[lineIndex];
        el.style.cssText = `
          position: absolute;
          font-family: var(--font-headings);
          font-size: clamp(6rem, 14vw, 14rem);
          font-weight: 800;
          color: #E0E0E0;
          z-index: 2;
          transform-origin: center;
          will-change: transform;
          pointer-events: none;
          opacity: 0.12;
        `;
        textContainer.appendChild(el);
        letterElements.push(el);
      }

      return { curve: { points: curvePoints, speedMultiplier: speedMultipliers[lineIndex] }, letterElements };
    });

    pathsRef.current = paths;

    // Project point to screen coords (simple perspective projection)
    const projectPoint = (p: { x: number; y: number; z: number }) => {
      const fov = 50;
      const cameraZ = 20;
      const aspect = window.innerWidth / window.innerHeight;
      const scale = fov / (cameraZ - p.z);
      return {
        x: (p.x * scale / aspect + 0) * (window.innerWidth / 40) + window.innerWidth / 2,
        y: (-p.y * scale + 0) * (window.innerHeight / 40) + window.innerHeight / 2
      };
    };

    // Interpolate along curve
    const getPointOnCurve = (points: { x: number; y: number; z: number }[], t: number) => {
      const clampedT = ((t % 1) + 1) % 1;
      const idx = clampedT * (points.length - 1);
      const i0 = Math.floor(idx);
      const i1 = Math.min(i0 + 1, points.length - 1);
      const frac = idx - i0;
      return {
        x: points[i0].x + (points[i1].x - points[i0].x) * frac,
        y: points[i0].y + (points[i1].y - points[i0].y) * frac,
        z: points[i0].z + (points[i1].z - points[i0].z) * frac
      };
    };

    const updateTargetPositions = (progress: number) => {
      paths.forEach((path) => {
        path.letterElements.forEach((el, i) => {
          const point3d = getPointOnCurve(
            path.curve.points,
            (i / 14 + progress * path.curve.speedMultiplier) % 1
          );
          const projected = projectPoint(point3d);
          
          gsap.set(el, {
            x: projected.x,
            y: projected.y,
            xPercent: -50,
            yPercent: -50,
            force3D: true
          });
        });
      });
    };

    const updateCardsPosition = (progress: number) => {
      const maxScroll = cards.scrollWidth - window.innerWidth;
      const targetX = -maxScroll * progress;
      gsap.set(cards, { x: targetX, force3D: true });
    };

    const animate = () => {
      currentProgressRef.current = lerp(currentProgressRef.current, scrollProgressRef.current, 0.08);
      
      updateTargetPositions(currentProgressRef.current);
      updateCardsPosition(currentProgressRef.current);
      drawGrid(currentProgressRef.current);
      
      animFrameRef.current = requestAnimationFrame(animate);
    };

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: window.innerWidth < 768 ? '+=150%' : '+=350%',
      pin: true,
      pinSpacing: true,
      scrub: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        scrollProgressRef.current = self.progress;
      }
    });

    animate();

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      const ctx2 = canvas.getContext('2d');
      if (ctx2) ctx2.scale(dpr, dpr);
      drawGrid(scrollProgressRef.current);
      updateTargetPositions(scrollProgressRef.current);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      st.kill();
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
      // Clean up letter elements
      paths.forEach(p => p.letterElements.forEach(el => el.remove()));
    };
  }, [drawGrid, lerp]);

  return (
    <section
      id="works"
      aria-labelledby="works-heading"
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: '#0A0A0A'
      }}
    >
      {/* Dot grid background canvas */}
      <canvas
        ref={gridCanvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 0
        }}
      />

      {/* Floating letter text container */}
      <div
        ref={textContainerRef}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 2,
          pointerEvents: 'none',
          perspective: '2500px',
          perspectiveOrigin: 'center'
        }}
      />

      {/* Horizontally scrolling cards */}
      <div
        ref={cardsRef}
        style={{
          position: 'relative',
          height: '100vh',
          padding: '0 50vw',
          display: 'flex',
          gap: '15vw',
          alignItems: 'center',
          width: 'max-content',
          zIndex: 10
        }}
      >
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="work-gallery-card"
            data-cursor="VIEW PROJECT"
            onClick={() => onProjectSelect(proj)}
            style={{
              padding: '0.5rem',
              backgroundColor: '#0A0A0A',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              cursor: 'pointer',
              transition: 'transform 0.4s ease',
              flexShrink: 0
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
            }}
          >
            <div style={{
              flex: 1,
              overflow: 'hidden',
              borderRadius: '2px'
            }}>
              {proj.bannerImage ? (
                <img
                  src={proj.bannerImage}
                  alt={proj.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'grayscale(80%)',
                    transition: 'filter 0.4s ease'
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.filter = 'grayscale(0%)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.filter = 'grayscale(80%)';
                  }}
                />
              ) : (
                <div style={{
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(135deg, #1a1a1a, #2a2a2a)'
                }} />
              )}
            </div>
            <div style={{
              height: '0.75rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0 0.25rem',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-body)',
              fontSize: '0.65rem',
              color: '#E0E0E0',
              letterSpacing: '1px'
            }}>
              <span>{proj.title}</span>
              <span>{proj.id}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Hidden heading for accessibility */}
      <h2
        id="works-heading"
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: 0,
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          borderWidth: 0
        }}
      >
        Selected Works
      </h2>
    </section>
  );
}
