import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Project Alpha",
    client: "Nexus Corp",
    role: "Creative Direction, WebGL",
    image: "https://picsum.photos/seed/alpha/800/1000?blur=1",
    color: "#FF0055",
    github: "https://github.com",
    live: "https://example.com"
  },
  {
    title: "Quantum UI",
    client: "Future Systems",
    role: "Frontend, Motion Design",
    image: "https://picsum.photos/seed/quantum/800/1000?blur=1",
    color: "#00FF88",
    github: "https://github.com",
    live: "https://example.com"
  },
  {
    title: "Aura Finance",
    client: "Aura Bank",
    role: "UX/UI, React Native",
    image: "https://picsum.photos/seed/aura/800/1000?blur=1",
    color: "#0000FF",
    github: "https://github.com",
    live: "https://example.com"
  },
  {
    title: "Nova Studio",
    client: "Nova Entertainment",
    role: "Fullstack, Three.js",
    image: "https://picsum.photos/seed/nova/800/1000?blur=1",
    color: "#FF00AA",
    github: "https://github.com",
    live: "https://example.com"
  },
  {
    title: "Echo Protocol",
    client: "Echo Labs",
    role: "Smart Contracts, Web3",
    image: "https://picsum.photos/seed/echo/800/1000?blur=1",
    color: "#FF8800",
    github: "https://github.com",
    live: "https://example.com"
  }
];

export const ProjectShowcase = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [activeProject, setActiveProject] = useState<number | null>(null);

  // Mouse tracking for the floating image
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the floating image
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const imageX = useSpring(mouseX, springConfig);
  const imageY = useSpring(mouseY, springConfig);

  // Transform for subtle rotation based on mouse movement speed (optional, keeping it simple with just position for now)
  const rotateX = useTransform(mouseY, [0, typeof window !== 'undefined' ? window.innerHeight : 1000], [10, -10]);
  const rotateY = useTransform(mouseX, [0, typeof window !== 'undefined' ? window.innerWidth : 1000], [-10, 10]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal list items on scroll
      gsap.from('.project-item', {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: listRef.current,
          start: 'top 80%',
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="projects"
      ref={sectionRef} 
      className="relative w-full min-h-screen bg-[#050505] py-32 overflow-hidden transition-colors duration-700"
      style={{
        backgroundColor: activeProject !== null ? '#0a0a0a' : '#050505'
      }}
    >
      {/* Dynamic Background Glow based on active project */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full blur-[150px] opacity-10 transition-all duration-1000 ease-out"
          style={{
            backgroundColor: activeProject !== null ? projects[activeProject].color : 'transparent',
            transform: activeProject !== null ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0.5)'
          }}
        />
        {/* Noise Overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20 mix-blend-overlay" />
      </div>

      <div className="container mx-auto px-[5vw] relative z-10">
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="block font-mono text-white/50 text-xs md:text-sm tracking-[0.4em] uppercase mb-4">
              02 // Selected Works
            </span>
            <h2 className="text-4xl md:text-6xl font-black uppercase text-white tracking-tighter">
              Showcase
            </h2>
          </div>
          <p className="text-white/50 max-w-sm font-light text-sm md:text-base">
            A curated selection of our most impactful digital experiences, pushing the boundaries of design and technology.
          </p>
        </div>

        <ul ref={listRef} className="flex flex-col w-full border-t border-white/10">
          {projects.map((project, index) => (
            <li 
              key={index}
              className="project-item group relative border-b border-white/10 py-10 md:py-16 cursor-pointer"
              onMouseEnter={() => setActiveProject(index)}
              onMouseLeave={() => setActiveProject(null)}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10 mix-blend-difference">
                <h3 
                  className="text-[10vw] md:text-[7vw] font-black uppercase leading-[0.85] tracking-tighter text-transparent stroke-white/30 transition-all duration-500 group-hover:text-white group-hover:stroke-transparent group-hover:translate-x-4"
                  style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}
                >
                  {project.title}
                </h3>
                
                <div className="flex flex-col md:items-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity duration-500 transform group-hover:-translate-x-4">
                  <span className="font-mono text-xs md:text-sm uppercase tracking-widest text-white">
                    {project.client}
                  </span>
                  <span className="font-mono text-xs text-white/50 uppercase tracking-widest mb-2 md:mb-4">
                    {project.role}
                  </span>
                  
                  {/* Project Links */}
                  <div className="flex items-center gap-3 mt-2">
                    {project.github && (
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-[10px] md:text-xs font-mono uppercase tracking-wider text-white hover:text-black hover:bg-white transition-all duration-300 pointer-events-auto"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github size={14} /> Code
                      </a>
                    )}
                    {project.live && (
                      <a 
                        href={project.live} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-[10px] md:text-xs font-mono uppercase tracking-wider text-white hover:text-black hover:bg-white transition-all duration-300 pointer-events-auto"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={14} /> Live
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Hover Line Expansion */}
              <div className="absolute bottom-[-1px] left-0 h-[2px] bg-white w-0 group-hover:w-full transition-all duration-700 ease-out z-20" />
            </li>
          ))}
        </ul>
      </div>

      {/* Floating Image Cursor Tracker */}
      <motion.div
        className="fixed top-0 left-0 w-[300px] h-[400px] md:w-[400px] md:h-[550px] pointer-events-none z-50 overflow-hidden rounded-2xl hidden md:block"
        style={{
          x: useTransform(imageX, x => x - 200), // Center image on cursor
          y: useTransform(imageY, y => y - 275),
          rotateX,
          rotateY,
          opacity: activeProject !== null ? 1 : 0,
          scale: activeProject !== null ? 1 : 0.8,
          transformStyle: "preserve-3d",
          perspective: 1000
        }}
        transition={{ opacity: { duration: 0.4 }, scale: { duration: 0.4, ease: "backOut" } }}
      >
        <div className="w-full h-full relative">
          {projects.map((project, index) => (
            <img
              key={index}
              src={project.image}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
              style={{
                opacity: activeProject === index ? 1 : 0,
                transform: activeProject === index ? 'scale(1)' : 'scale(1.1)',
                transition: 'opacity 0.5s ease, transform 0.7s ease-out'
              }}
              referrerPolicy="no-referrer"
            />
          ))}
          {/* Inner Shadow/Border for premium feel */}
          <div className="absolute inset-0 border border-white/20 rounded-2xl shadow-[inset_0_0_40px_rgba(0,0,0,0.5)]" />
        </div>
      </motion.div>
    </section>
  );
};
