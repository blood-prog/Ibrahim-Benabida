export interface ProjectData {
  id: string;
  title: string;
  category: string;
  demoUrl: string;
  align: 'flex-start' | 'center' | 'flex-end';
  marginTop?: string;
  description: string;
  technologies: string[];
  bannerImage?: string;
  videoUrl?: string;
  isVideoCover?: boolean;
}

export const projects: ProjectData[] = [
  { 
    id: '01', 
    title: 'PhD Academic Page', 
    category: 'Personal Brand', 
    demoUrl: 'https://abdou-oussama-benabida.vercel.app/',
    align: 'flex-start',
    description: 'A comprehensive academic portfolio designed to highlight research, seminars, and CV for a PhD candidate. It features a custom Soft Neo-Brutalist design, extremely optimized SEO metadata for academic discoverability, and high performance.',
    technologies: ['React', 'Vite', 'Tailwind', 'GSAP'],
    videoUrl: '/videos/phd-academic.mp4',
    isVideoCover: true
  },
  { 
    id: '02', 
    title: 'USTHB Data Science', 
    category: 'Landing Page', 
    demoUrl: 'https://usthb-datascience-ict-projects.vercel.app/',
    align: 'flex-end',
    marginTop: '10vh',
    description: 'A high-impact landing page crafted for the USTHB Data Science initiative. The interface focuses on performance and conversion, featuring non-blocking performance optimization and immersive user interactions.',
    technologies: ['TypeScript', 'GSAP', 'Next.js'],
    videoUrl: '/videos/usthb-data.mp4',
    isVideoCover: true
  },
  { 
    id: '03', 
    title: 'Designer Portfolio', 
    category: 'Creative Web', 
    demoUrl: '#', // TBD
    align: 'flex-start',
    marginTop: '5vh',
    description: 'Totally inspired by a premium designer portfolio template — this project was an attempt to recreate the exact same result from scratch. Think fluid smooth scrolling, typography-driven geometry, and highly polished micro-interactions using custom hooks and robust state management.',
    technologies: ['GSAP', 'React', 'Framer'],
    videoUrl: '/videos/designer-portfolio.mp4',
    isVideoCover: true
  },
  { 
    id: '04', 
    title: 'Vibe-Coded Portfolio', 
    category: 'Personal Portfolio', 
    demoUrl: '#',
    align: 'flex-end',
    marginTop: '10vh',
    description: 'The portfolio you are browsing right now. Implements a Soft Neo-Brutalist design, heavy usage of ScrollTrigger, Lenis smooth scrolling, and an interactive dynamic video case study structure.',
    technologies: ['React', 'GSAP', 'Vite', 'TypeScript'],
    videoUrl: '/videos/personal-portfolio.mp4',
    isVideoCover: true
  }
];
