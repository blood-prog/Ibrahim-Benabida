import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

import type { ProjectData } from './data/projects';
import ProjectPage from './components/ProjectPage';

import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import Intro from './components/Intro';
import WorkGallery from './components/WorkGallery';
import Services from './components/Services';
import Manifesto from './components/Manifesto';
import Footer from './components/Footer';
import Header from './components/Header';
import Preloader from './components/Preloader';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [activeProject, setActiveProject] = useState<ProjectData | null>(null);
  const [isPreloading, setIsPreloading] = useState(true);

  useEffect(() => {
    // Lenis smooth scroll configuration
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <>
      {isPreloading && <Preloader onComplete={() => setIsPreloading(false)} />}
      <CustomCursor />
      
      {/* SVG Noise Overlay */}
      <svg className="noise-overlay" xmlns="http://www.w3.org/2000/svg">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" stitchTiles="stitch"/>
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)"/>
      </svg>

      {/* Global Gradient Blob Background */}
      <div className="bg-gradient-pink"></div>

      <Header />
      <main role="main" style={{ position: 'relative', zIndex: 1, paddingTop: '80px' }}>
        <Hero />
        <Intro />
        <WorkGallery onProjectSelect={setActiveProject} />
        <Services />
        <Manifesto />
        <Footer />
      </main>

      {activeProject && (
        <ProjectPage 
          project={activeProject} 
          onClose={() => setActiveProject(null)} 
        />
      )}
    </>
  );
}

export default App;
