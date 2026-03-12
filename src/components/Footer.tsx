import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useMotionTemplate } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

const FooterLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
  <a href={href} className="group flex items-center gap-2 text-lg md:text-xl font-light text-white/70 hover:text-white transition-colors relative overflow-hidden w-fit">
    <span className="relative z-10">{children}</span>
    <span className="absolute left-0 bottom-0 w-full h-[1px] bg-white origin-right transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100 group-hover:origin-left" />
  </a>
);

export const Footer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });
  
  // Parallax effect for the footer content
  const y = useTransform(scrollYProgress, [0, 1], [-150, 0]);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    // Update time
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const { left, top } = containerRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(interval);
    };
  }, [mouseX, mouseY]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer ref={containerRef} className="relative bg-[#050505] text-white overflow-hidden pt-32 pb-8 border-t border-white/10">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div 
          className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-primary-accent/10 blur-[120px]"
          animate={{ y: [0, 50, 0], x: [0, 50, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-secondary-accent/10 blur-[150px]"
          animate={{ y: [0, -50, 0], x: [0, -50, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20 mix-blend-overlay" />
      </div>

      {/* Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 opacity-50 mix-blend-screen"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.08),
              transparent 40%
            )
          `,
        }}
      />

      <motion.div style={{ y }} className="container mx-auto px-[5vw] relative z-20">
        {/* Top Section: CTA & Links */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 mb-24">
          <div className="max-w-2xl">
            <h3 className="text-5xl md:text-7xl font-light mb-8 tracking-tight">
              Have an idea? <br/>
              <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-primary-accent to-secondary-accent">Let's build it.</span>
            </h3>
            <MagneticButton className="group relative inline-flex items-center gap-4 bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm overflow-hidden">
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">Start a Project</span>
              <ArrowUpRight className="relative z-10 group-hover:text-white transition-colors duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" size={20} />
              <div className="absolute inset-0 bg-black transform scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-500 ease-out rounded-full" />
            </MagneticButton>
          </div>
          
          <div className="flex flex-wrap gap-16 md:gap-32">
            <div className="flex flex-col gap-6">
              <h4 className="text-white/40 font-mono text-sm uppercase tracking-widest mb-2">Navigation</h4>
              <FooterLink href="#manifesto">Manifesto</FooterLink>
              <FooterLink href="#projects">Projects</FooterLink>
              <FooterLink href="#community">Community</FooterLink>
              <FooterLink href="#join">Join Us</FooterLink>
            </div>
            <div className="flex flex-col gap-6">
              <h4 className="text-white/40 font-mono text-sm uppercase tracking-widest mb-2">Socials</h4>
              <FooterLink href="https://github.com/POLYMATHISTTech">GitHub</FooterLink>
              <FooterLink href="https://x.com/POLYMATHIST_1">Twitter / X</FooterLink>
              <FooterLink href="https://linkedin.com/company/polymathist/">LinkedIn</FooterLink>
              <FooterLink href="https://www.instagram.com/polymathist_tech/">Instagram</FooterLink>
            </div>
          </div>
        </div>

        {/* Massive Text */}
        <div className="w-full flex justify-center items-center mb-12 overflow-hidden">
          <h1 className="text-[13vw] leading-none font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-white/0 select-none hover:from-white/40 hover:to-white/5 transition-all duration-700 cursor-default">
            Polymathist
          </h1>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-white/40 font-mono text-xs md:text-sm gap-4">
          <div className="flex gap-8">
            <p>© {new Date().getFullYear()} Polymathist Collective.</p>
            <p className="hidden md:block">All rights reserved.</p>
          </div>
          
          <div className="flex items-center gap-8 flex-wrap justify-center">
            <p>Local Time: {time}</p>
            <button 
              onClick={scrollToTop} 
              className="group flex items-center gap-2 hover:text-white transition-colors uppercase tracking-widest"
            >
              Back to top 
              <ArrowUpRight size={16} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};
