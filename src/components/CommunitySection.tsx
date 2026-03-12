import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Github, Instagram, Linkedin, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const members = [
  { 
    name: "Hardik Kawale", 
    role: "Creative Dev", 
    skills: "Python/ AI / WebDev / Three.js", 
    avatar: "/images/hardik.png",
    color: "#FF0055",
    socials: { github: "https://github.com/Hardik-369", instagram: "https://www.instagram.com/__shadow__4444/", linkedin: "https://www.linkedin.com/in/hardikkawale" }
  },
  { 
    name: "Sai Bhise", 
    role: "AI Developer", 
    skills: "ML / DL ", 
    avatar: "/images/sai.png",
    color: "#00FF88",
    socials: { github: "https://github.com", instagram: "https://www.instagram.com/____sai_l____/", linkedin: "https://www.linkedin.com/in/sai-bhise-094b93251/" }
  },
  { 
    name: "Devdatta Salunkhe", 
    role: "Technical Lead", 
    skills: "Architecture", 
    avatar: "/images/deva.png",
    color: "#0000FF",
    socials: { github: "https://github.com", instagram: "https://www.instagram.com/_deva.13_/", linkedin: "https://www.linkedin.com/in/devdatta-salunkhe-a027282b2/" }
  },
  { 
    name: "Shreeyash Taware", 
    role: "Web3 Engineer", 
    skills: "Smart Contracts", 
    avatar: "https://picsum.photos/seed/elena_portrait/800/1200",
    color: "#FF00AA",
    socials: { github: "https://github.com", instagram: "https://www.instagram.com/shreeyash___0007/", linkedin: "https://www.linkedin.com/in/shreeyash-taware-a47807291/" }
  },
];

export const CommunitySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Cursor tracking for floating image
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section reveal
      gsap.fromTo(sectionRef.current,
        { opacity: 0 },
        { 
          opacity: 1, 
          duration: 1.5, 
          ease: "power4.out",
          scrollTrigger: { 
            trigger: sectionRef.current, 
            start: "top 70%" 
          } 
        }
      );

      // List items stagger reveal
      gsap.from(".list-item", {
        y: 100,
        opacity: 0,
        stagger: 0.15,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: listRef.current,
          start: "top 80%",
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const activeColor = hoveredIndex !== null ? members[hoveredIndex].color : "#ffffff";

  return (
    <section ref={sectionRef} className="relative py-32 md:py-48 bg-[#050505] overflow-hidden min-h-screen flex flex-col justify-center cursor-default">
      
      {/* Interactive Background Animations */}
      <div className="absolute inset-0 pointer-events-none z-0 transition-colors duration-1000">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] rounded-full blur-[150px] opacity-20"
          animate={{ 
            y: [0, -100, 0], 
            x: [0, 50, 0], 
            scale: [1, 1.2, 1],
            backgroundColor: activeColor
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-[60vw] h-[60vw] rounded-full blur-[150px] opacity-10"
          animate={{ 
            y: [0, 100, 0], 
            x: [0, -50, 0], 
            scale: [1, 1.3, 1],
            backgroundColor: hoveredIndex !== null ? members[(hoveredIndex + 1) % members.length].color : "#ffffff"
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Noise Overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20 mix-blend-overlay" />
      </div>

      <div className="container mx-auto px-[5vw] relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24">
          <div>
            <span className="block font-mono text-white/50 text-xs md:text-sm tracking-[0.4em] uppercase mb-4">
              04 // The Collective
            </span>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase text-white tracking-tighter leading-none">
              Core Team
            </h2>
          </div>
          <p className="text-white/50 max-w-sm font-light text-sm md:text-base">
            The visionaries, engineers, and designers building the next generation of digital experiences.
          </p>
        </div>

        {/* Interactive Typography List */}
        <ul ref={listRef} className="flex flex-col w-full border-t border-white/10">
          {members.map((member, index) => {
            const isActive = hoveredIndex === index;
            
            return (
              <li 
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="list-item group relative border-b border-white/10 py-8 md:py-12 flex flex-col md:flex-row md:items-center justify-between cursor-pointer"
              >
                {/* Left Side: Name & Socials */}
                <div className="flex flex-col z-10">
                  <h3 
                    className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter transition-all duration-500 transform origin-left"
                    style={{ 
                      color: isActive ? member.color : 'rgba(255,255,255,0.4)',
                      transform: isActive ? 'translateX(20px)' : 'translateX(0px)'
                    }}
                  >
                    {member.name}
                  </h3>
                  
                  {/* Social Links (Always visible, highlights on hover) */}
                  <div 
                    className="flex gap-3 mt-4 transition-all duration-500"
                    style={{ 
                      transform: isActive ? 'translateX(20px)' : 'translateX(0px)',
                      opacity: isActive ? 1 : 0.3
                    }}
                  >
                    <a href={member.socials.github} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 bg-black/40 flex items-center justify-center hover:bg-white hover:text-black hover:scale-110 transition-all duration-300 backdrop-blur-md" onClick={(e) => e.stopPropagation()}>
                      <Github size={16} />
                    </a>
                    <a href={member.socials.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 bg-black/40 flex items-center justify-center hover:bg-white hover:text-black hover:scale-110 transition-all duration-300 backdrop-blur-md" onClick={(e) => e.stopPropagation()}>
                      <Instagram size={16} />
                    </a>
                    <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 bg-black/40 flex items-center justify-center hover:bg-white hover:text-black hover:scale-110 transition-all duration-300 backdrop-blur-md" onClick={(e) => e.stopPropagation()}>
                      <Linkedin size={16} />
                    </a>
                  </div>
                </div>

                {/* Right Side: Role & Skills */}
                <div 
                  className="mt-6 md:mt-0 text-left md:text-right z-10 transition-transform duration-500"
                  style={{ transform: isActive ? 'translateX(-20px)' : 'translateX(0px)' }}
                >
                  <div className="flex items-center md:justify-end gap-4 mb-2">
                    <span className="text-xl md:text-2xl font-light text-white transition-colors duration-500">
                      {member.role}
                    </span>
                    <ArrowUpRight 
                      size={24} 
                      className="transition-transform duration-500"
                      style={{ 
                        transform: isActive ? 'rotate(45deg)' : 'rotate(0deg)',
                        color: isActive ? member.color : 'rgba(255,255,255,0.5)'
                      }}
                    />
                  </div>
                  <p className="font-mono text-xs uppercase tracking-widest transition-colors duration-500" style={{ color: isActive ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.3)' }}>
                    {member.skills}
                  </p>
                </div>

                {/* Mobile Inline Image (Visible only on small screens) */}
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ 
                    height: isActive ? 'auto' : 0, 
                    opacity: isActive ? 1 : 0,
                    marginTop: isActive ? 24 : 0
                  }}
                  className="md:hidden w-full overflow-hidden rounded-2xl"
                >
                  <img src={member.avatar} alt={member.name} className="w-full aspect-[3/4] object-cover grayscale-0" />
                </motion.div>

                {/* Hover Background Highlight */}
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                />
              </li>
            );
          })}
        </ul>
      </div>

      {/* Floating Cursor Image (Desktop Only) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 w-[320px] aspect-[3/4] rounded-2xl overflow-hidden hidden md:block shadow-2xl border border-white/10"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: hoveredIndex !== null ? 1 : 0,
          scale: hoveredIndex !== null ? 1 : 0.8,
          rotate: hoveredIndex !== null ? (mouseX.getVelocity() * 0.01) : 0, // Slight rotation based on movement
        }}
        transition={{ 
          opacity: { duration: 0.3 }, 
          scale: { duration: 0.4, ease: "backOut" } 
        }}
      >
        {members.map((member, i) => (
          <div 
            key={i}
            className="absolute inset-0 transition-opacity duration-500"
            style={{ opacity: hoveredIndex === i ? 1 : 0 }}
          >
            <img
              src={member.avatar}
              alt={member.name}
              className="w-full h-full object-cover"
            />
            {/* Color tint overlay */}
            <div 
              className="absolute inset-0 mix-blend-overlay opacity-40"
              style={{ backgroundColor: member.color }}
            />
          </div>
        ))}
      </motion.div>
    </section>
  );
};
