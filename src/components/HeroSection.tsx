import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { MagneticButton } from './MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse tracking for interactive background and 3D tilt
  const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
  const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0);

  // Smooth springs for the glowing orb
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  // 3D Tilt transforms for the main content
  const rotateX = useTransform(mouseY, [0, typeof window !== 'undefined' ? window.innerHeight : 1000], [8, -8]);
  const rotateY = useTransform(mouseX, [0, typeof window !== 'undefined' ? window.innerWidth : 1000], [-8, 8]);

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
      const tl = gsap.timeline();
      tl.from('.hero-element', {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power4.out',
        delay: 0.2
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black"
      style={{ perspective: 1200 }}
    >
      {/* Interactive Glowing Orb */}
      <motion.div 
        className="absolute top-0 left-0 w-[50vw] h-[50vw] md:w-[30vw] md:h-[30vw] rounded-full bg-gradient-to-tr from-primary-accent via-secondary-accent to-highlight-accent blur-[100px] opacity-30 pointer-events-none z-0"
        style={{ 
          x: useTransform(springX, x => x - (typeof window !== 'undefined' ? window.innerWidth * 0.15 : 200)), 
          y: useTransform(springY, y => y - (typeof window !== 'undefined' ? window.innerWidth * 0.15 : 200)) 
        }}
      />

      {/* Grid Background with Radial Mask */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: '4vw 4vw',
          maskImage: 'radial-gradient(circle at center, black 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 80%)'
        }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20"
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), 
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000) 
            }}
            animate={{ 
              y: [null, Math.random() * -150 - 50],
              opacity: [0.1, 0.6, 0.1],
              scale: [1, Math.random() * 2 + 1, 1]
            }}
            transition={{ 
              duration: Math.random() * 5 + 5, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          />
        ))}
      </div>

      {/* Main Content with 3D Tilt */}
      <motion.div 
        className="relative z-10 w-full max-w-screen-2xl mx-auto px-[5vw] flex flex-col items-center text-center"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        <span 
          className="hero-element block font-mono text-highlight-accent text-xs md:text-sm tracking-[0.4em] uppercase mb-8"
          style={{ transform: "translateZ(30px)" }}
        >
          Est. 2026 // Global Developer Collective
        </span>
        
        <h1 
          className="hero-element text-[14vw] md:text-[10vw] leading-[0.85] font-black uppercase tracking-tighter mb-8"
          style={{ transform: "translateZ(60px)" }}
        >
          <span className="block text-white mix-blend-difference">
            Polymathist
          </span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-accent via-secondary-accent to-highlight-accent">
            Group
          </span>
        </h1>

        <p 
          className="hero-element text-lg md:text-2xl text-white/60 font-light max-w-2xl mb-12 leading-relaxed"
          style={{ transform: "translateZ(40px)" }}
        >
          Where coders build the future. An exclusive nexus for creative developers, engineers, and digital architects.
        </p>

        <div 
          className="hero-element flex flex-col sm:flex-row items-center gap-6"
          style={{ transform: "translateZ(50px)" }}
        >
          <MagneticButton 
            onClick={() => {
              const el = document.getElementById('projects');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-4 bg-white text-black font-bold tracking-widest uppercase text-sm rounded-full hover:bg-highlight-accent hover:text-black transition-colors duration-300"
          >
            Explore Projects
          </MagneticButton>
          <MagneticButton 
            onClick={() => {
              const el = document.getElementById('join');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-4 bg-transparent border border-white/20 text-white font-bold tracking-widest uppercase text-sm rounded-full hover:bg-white/10 transition-colors duration-300 backdrop-blur-sm"
          >
            Join Community
          </MagneticButton>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-10 pb-8">
        <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">
          Scroll
        </span>
        <div className="w-[1px] h-16 bg-white/20 relative overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 w-full h-1/2 bg-white"
            animate={{ y: [0, 64] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </div>
    </section>
  );
};
