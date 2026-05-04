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
  const currentXRef = useRef(0);
  const letterPositionsRef = useRef<Map<HTMLElement, { current: { x: number; y: number }; target: { x: number; y: number } }>>(new Map());
  const pathsRef = useRef<{ curve: any; letterElements: HTMLElement[] }[]>([]);
  const animFrameRef = useRef<number>(0);
  const scrollProgressRef = useRef(0);

  const lerp = (start: number, end: number, t: number) => start + (end - start) * t;

  const drawGrid = useCallback((scrollProgress: number) => {
    const canvas = gridCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#0A0A0A';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#E0E0E0';

    const dotSize = 1;
    const spacing = 30;
    const rows = Math.ceil(canvas.height / spacing);
    const cols = Math.ceil(canvas.width / spacing) + 15;
    const offset = (scrollProgress * spacing * 10) % spacing;

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        ctx.beginPath();
        ctx.arc(x * spacing - offset, y * spacing, dotSize, 0, Math.PI * 2);
        ctx.fill();
      }
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
        letterPositionsRef.current.set(el, {
          current: { x: 0, y: 0 },
          target: { x: 0, y: 0 }
        });
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

    const updateTargetPositions = (scrollProgress: number) => {
      paths.forEach((path) => {
        path.letterElements.forEach((el, i) => {
          const point3d = getPointOnCurve(
            path.curve.points,
            (i / 14 + scrollProgress * path.curve.speedMultiplier) % 1
          );
          const projected = projectPoint(point3d);
          const pos = letterPositionsRef.current.get(el);
          if (pos) {
            pos.target = { x: projected.x, y: projected.y };
          }
        });
      });
    };

    const updateLetterPositions = () => {
      letterPositionsRef.current.forEach((positions, element) => {
        const distX = positions.target.x - positions.current.x;
        if (Math.abs(distX) > window.innerWidth * 0.7) {
          positions.current.x = positions.target.x;
          positions.current.y = positions.target.y;
        } else {
          positions.current.x = lerp(positions.current.x, positions.target.x, 0.12);
          positions.current.y = lerp(positions.current.y, positions.target.y, 0.12);
        }
        element.style.transform = `translate(-50%, -50%) translate3d(${positions.current.x}px, ${positions.current.y}px, 0px)`;
      });
    };

    const moveDistance = window.innerWidth * 5;

    const updateCardsPosition = () => {
      const targetX = -moveDistance * scrollProgressRef.current;
      currentXRef.current = lerp(currentXRef.current, targetX, 0.15);
      gsap.set(cards, { x: currentXRef.current });
    };

    // Animation loop
    const animate = () => {
      updateLetterPositions();
      updateCardsPosition();
      animFrameRef.current = requestAnimationFrame(animate);
    };

    // ScrollTrigger
    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: '+=400%',
      pin: true,
      pinSpacing: true,
      scrub: true,
      onUpdate: (self) => {
        scrollProgressRef.current = self.progress;
        updateTargetPositions(self.progress);
        drawGrid(self.progress);
      }
    });

    drawGrid(0);
    updateTargetPositions(0);
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
      letterPositionsRef.current.clear();
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
          width: `${projects.length * 100}vw`,
          height: '100vh',
          paddingLeft: '100vw',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
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
