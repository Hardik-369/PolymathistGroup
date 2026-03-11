import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const events = [
  { 
    name: "Hackathon X", 
    date: "2026.04.15", 
    desc: "48 hours to build the future of Web3. A relentless pursuit of innovation where boundaries are pushed and new paradigms are born.", 
    photo: "https://picsum.photos/seed/hack/1000/1200?blur=1",
    color: "#FF0055"
  },
  { 
    name: "Dev Summit", 
    date: "2026.06.20", 
    desc: "Annual gathering of the brightest minds. Sharing knowledge, forging partnerships, and setting the agenda for the next decade of tech.", 
    photo: "https://picsum.photos/seed/summit/1000/1200?blur=1",
    color: "#00FF88"
  },
  { 
    name: "AI Workshop", 
    date: "2026.08.10", 
    desc: "Deep dive into generative models. Exploring the intersection of human creativity and machine intelligence in a hands-on environment.", 
    photo: "https://picsum.photos/seed/ai/1000/1200?blur=1",
    color: "#FF00AA"
  },
  { 
    name: "Code Retreat", 
    date: "2026.10.05", 
    desc: "Disconnect to reconnect with code. A serene environment designed for deep work, architectural planning, and mindful programming.", 
    photo: "https://picsum.photos/seed/retreat/1000/1200?blur=1",
    color: "#00FFFF"
  },
];

const TimelineItem = ({ event, index }: { event: typeof events[0], index: number }) => {
  const isEven = index % 2 === 0;
  const itemRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = imageContainerRef.current?.getBoundingClientRect();
    if (rect) {
      const width = rect.width;
      const height = rect.height;
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const xPct = mouseX / width - 0.5;
      const yPct = mouseY / height - 0.5;
      x.set(xPct);
      y.set(yPct);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal text
      gsap.from(textRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: itemRef.current,
          start: "top 75%",
        }
      });
    }, itemRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={itemRef} className={`group relative w-full py-20 md:py-40 flex flex-col md:flex-row items-center justify-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
      
      {/* Center Node (Desktop only) */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#050505] border-2 border-white/10 z-20 hidden md:flex items-center justify-center group-hover:border-white/50 transition-colors duration-700">
        <div className="w-2 h-2 rounded-full transition-all duration-700 group-hover:scale-[2]" style={{ backgroundColor: event.color, boxShadow: `0 0 20px ${event.color}` }} />
      </div>

      <div className="container mx-auto px-[5vw] flex flex-col md:flex-row items-center gap-12 md:gap-24 relative z-10">
        
        {/* Image Side */}
        <div className={`w-full md:w-1/2 flex ${isEven ? 'justify-end md:pr-12' : 'justify-start md:pl-12'}`}>
          <motion.div 
            ref={imageContainerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative w-full max-w-[500px] aspect-[4/5] rounded-[2rem] cursor-pointer perspective-1000"
          >
            <div 
              className="absolute inset-0 rounded-[2rem] overflow-hidden border border-white/10 group-hover:border-white/30 transition-colors duration-700"
              style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}
            >
              <img 
                src={event.photo} 
                alt={event.name}
                className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />
              <div className="absolute inset-0 mix-blend-overlay opacity-0 group-hover:opacity-30 transition-opacity duration-700" style={{ backgroundColor: event.color }} />
            </div>
            
            {/* Floating Date Badge */}
            <div 
              className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 bg-[#0a0a0a] border border-white/10 px-6 py-4 rounded-2xl backdrop-blur-md"
              style={{ transform: "translateZ(60px)" }}
            >
              <span className="font-mono text-sm tracking-widest text-white">
                {event.date}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Text Side */}
        <div className={`w-full md:w-1/2 flex flex-col justify-center ${isEven ? 'md:pl-12' : 'md:pr-12'}`}>
          <div ref={textRef} className="max-w-xl">
            <h3 
              className="text-4xl md:text-6xl lg:text-7xl font-black uppercase text-white mb-8 tracking-tighter leading-[0.9] transition-all duration-700" 
            >
              <span className="group-hover:text-transparent group-hover:bg-clip-text transition-all duration-700" style={{ backgroundImage: `linear-gradient(to right, #fff, ${event.color})` }}>
                {event.name}
              </span>
            </h3>
            
            <div className="h-[1px] w-full bg-white/10 mb-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 h-full w-0 bg-white transition-all duration-1000 ease-out group-hover:w-full" style={{ backgroundColor: event.color }} />
            </div>
            
            <p className="text-lg md:text-xl text-white/50 font-light leading-relaxed group-hover:text-white/80 transition-colors duration-700">
              {event.desc}
            </p>
            
            <div className="mt-10 overflow-hidden">
              <button className="flex items-center gap-4 text-sm font-mono uppercase tracking-widest text-white/50 group-hover:text-white transition-colors duration-500">
                <span className="w-8 h-[1px] bg-white/50 group-hover:w-16 group-hover:bg-white transition-all duration-500" />
                Explore Event
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export const TimelineSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Draw center line
      gsap.fromTo(lineRef.current, 
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center",
            end: "bottom bottom",
            scrub: true,
          }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-[#050505] py-32 overflow-hidden">
      {/* Background Animations */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div 
          className="absolute top-0 left-1/4 w-[50vw] h-[50vw] rounded-full bg-primary-accent/5 blur-[150px]"
          animate={{ y: [0, 200, 0], x: [0, 100, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute bottom-0 right-1/4 w-[60vw] h-[60vw] rounded-full bg-secondary-accent/5 blur-[150px]"
          animate={{ y: [0, -200, 0], x: [0, -100, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-30 mix-blend-overlay" />
      </div>

      <div className="container mx-auto px-[5vw] relative z-10 mb-32">
        <span className="block font-mono text-white/50 text-xs md:text-sm tracking-[0.4em] uppercase mb-4 text-center">
          03 // The Journey
        </span>
        <h2 className="text-5xl md:text-8xl font-black uppercase text-white tracking-tighter text-center">
          Timeline
        </h2>
      </div>

      <div className="relative w-full">
        {/* Center Line Background */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/5 -translate-x-1/2 hidden md:block" />
        
        {/* Center Line Fill */}
        <div 
          ref={lineRef}
          className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary-accent via-secondary-accent to-highlight-accent -translate-x-1/2 origin-top hidden md:block shadow-[0_0_15px_rgba(255,255,255,0.3)]"
        />

        <div className="flex flex-col w-full relative z-10">
          {events.map((event, index) => (
            <TimelineItem key={index} event={event} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
