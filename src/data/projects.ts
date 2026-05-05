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
    title: 'Smart Residency',
    category: 'Mobile Application',
    demoUrl: 'https://smart-residence-two.vercel.app/',
    align: 'flex-start',
    description: 'A comprehensive mobile application designed to manage smart residency services, including sports facility bookings, maintenance requests, and administrative access with full Arabic RTL support.',
    technologies: ['React Native', 'Supabase', 'TypeScript'],
    bannerImage: '/images/project5.png',
    isVideoCover: false
  },
  {
    id: '02',
    title: 'Tarek Graphics',
    category: 'Design Portfolio',
    demoUrl: '#',
    align: 'flex-end',
    marginTop: '10vh',
    description: 'A premium portfolio for a 3D generalist and designer. Focuses on high-end visual aesthetics with a dark mode theme and immersive project galleries, inspired from another design without cloning it, just tried to rebuild it from 0 with AntiGravity',
    technologies: ['React', 'Framer Motion', 'Three.js'],
    bannerImage: '/images/project2.png',
    isVideoCover: false
  },
  {
    id: '03',
    title: 'USTHB TIC Projects',
    category: 'Educational Platform',
    demoUrl: 'https://usthb-datascience-ict-projects.vercel.app/',
    align: 'flex-start',
    marginTop: '5vh',
    description: 'A modern platform for USTHB data science students to showcase their projects, collaborate with peers, and build their portfolio with project ratings and discovery.',
    technologies: ['Next.js', 'Tailwind', 'PostgreSQL'],
    bannerImage: '/images/project1.png',
    isVideoCover: false
  },
  {
    id: '04',
    title: 'Ibrahim Benabida Portfolio',
    category: 'Personal Portfolio',
    demoUrl: 'https://ibrahim-benabida.vercel.app/',
    align: 'flex-end',
    marginTop: '10vh',
    description: 'A vibe-coded personal portfolio featuring 3D wireframe geometry, WebGL distortion effects, and a premium dark mode design with Lenis smooth scrolling.',
    technologies: ['React', 'Three.js', 'GSAP'],
    bannerImage: '/images/ibrahim_portfolio.png',
    isVideoCover: false
  },
  {
    id: '05',
    title: 'Oussama Benabida Academic',
    category: 'Academic Portfolio',
    demoUrl: 'https://abdou-oussama-benabida.vercel.app/',
    align: 'flex-start',
    marginTop: '10vh',
    description: 'A clean, professional academic portfolio for a PhD student in Mathematics at UQAM. Features a neo-brutalist design with research sections, teaching resources, and the Mathwin project.',
    technologies: ['React', 'Vite', 'Neo-Brutalist CSS'],
    bannerImage: '/images/oussama_portfolio.png',
    isVideoCover: false
  }
];
