import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';

const cards = [
  {
    title: "Learning",
    subtitle: "Continuous Evolution",
    desc: "We believe in the relentless pursuit of knowledge. Our collective thrives on shared resources, cutting-edge tutorials, and peer-to-peer mentorship.",
    color: "from-[#FF0055] to-[#0000FF]",
    icon: "01"
  },
  {
    title: "Collaboration",
    subtitle: "Decentralized Synergy",
    desc: "Building complex systems together. We foster an open environment where developers from across the globe unite to solve monumental challenges.",
    color: "from-[#00FF88] to-[#0000FF]",
    icon: "02"
  },
  {
    title: "Innovation",
    subtitle: "Pushing Boundaries",
    desc: "We don't just follow trends; we set them. Exploring the bleeding edge of modern web technologies, Web3, and AI integration.",
    color: "from-[#FF00AA] to-[#FF8800]",
    icon: "03"
  },
  {
    title: "Experimentation",
    subtitle: "Safe to Break",
    desc: "A sandbox for the ambitious. We encourage breaking things, rebuilding them, and discovering entirely new paradigms of interaction.",
    color: "from-[#00FFFF] to-[#FF00FF]",
    icon: "04"
  }
];

const AboutCard = ({ card, index }: { card: typeof cards[0], index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) {
      const width = rect.width;
      const height = rect.height;
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      
      mouseX.set(clientX);
      mouseY.set(clientY);

      const xPct = clientX / width - 0.5;
      const yPct = clientY / height - 0.5;
      x.set(xPct);
      y.set(yPct);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div style={{ perspective: 1200 }} className="w-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-full rounded-[2rem] bg-[#0a0a0a] border border-white/10 p-8 md:p-12 group cursor-pointer"
      >
        {/* Spotlight Hover Effect */}
        <motion.div
          className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[2rem]"
          style={{
            background: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.08), transparent 40%)`
          }}
        />
        
        {/* Animated Gradient Background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-[0.05] transition-opacity duration-700 ease-out z-0 rounded-[2rem]`} />

        <div className="relative z-10 flex flex-col h-full" style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }}>
          <div className="flex justify-between items-start mb-12" style={{ transform: "translateZ(20px)" }}>
            <div className="overflow-hidden">
              <span className="block font-mono text-xs tracking-[0.2em] text-white/40 uppercase group-hover:text-white transition-colors duration-500 transform translate-y-0 group-hover:-translate-y-1">
                Phase {card.icon}
              </span>
            </div>
            <div className="text-6xl font-black text-transparent stroke-white/20 group-hover:stroke-white/50 transition-all duration-500" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>
              {card.icon}
            </div>
          </div>

          <div className="mt-auto" style={{ transform: "translateZ(30px)" }}>
            <h4 className="font-mono text-sm text-white/50 uppercase tracking-widest mb-2 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out">
              {card.subtitle}
            </h4>
            <h3 className="text-3xl md:text-5xl font-black mb-6 uppercase text-white leading-none tracking-tighter group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/50 transition-all duration-500">
              {card.title}
            </h3>
            <div className="h-[2px] w-12 bg-white/20 mb-6 group-hover:w-full group-hover:bg-white/50 transition-all duration-700 ease-out" />
            <p className="text-base md:text-lg text-white/50 font-light leading-relaxed group-hover:text-white/90 transition-colors duration-500">
              {card.desc}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const AboutSection = () => {
  return (
    <section className="relative w-full bg-[#050505] flex flex-col lg:flex-row border-t border-white/10">
      {/* Left Sticky Side */}
      <div className="w-full lg:w-1/2 lg:h-screen lg:sticky top-0 flex flex-col justify-center p-8 lg:p-24 overflow-hidden border-r border-white/10 min-h-[50vh]">
        
        {/* Background Animations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <motion.div 
            className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] lg:w-[30vw] lg:h-[30vw] rounded-full bg-gradient-to-tr from-primary-accent to-secondary-accent blur-[120px] opacity-20 mix-blend-screen"
            animate={{ 
              x: [0, 100, -50, 0], 
              y: [0, -100, 50, 0],
              scale: [1, 1.2, 0.8, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute bottom-1/4 right-1/4 w-[60vw] h-[60vw] lg:w-[40vw] lg:h-[40vw] rounded-full bg-gradient-to-bl from-highlight-accent to-primary-accent blur-[150px] opacity-20 mix-blend-screen"
            animate={{ 
              x: [0, -100, 50, 0], 
              y: [0, 100, -50, 0],
              scale: [1, 1.5, 0.9, 1],
              rotate: [360, 180, 0]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />
          {/* Grid overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiIGZpbGw9Im5vbmUiLz4KPHBhdGggZD0iTTAgMTBoNDBNMTAgMHY0ME0wIDIwaDQwTTIwIDB2NDBNMCAzMGg0ME0zMCAwdjQwIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiIHN0cm9rZS13aWR0aD0iMSIvPgo8L3N2Zz4=')] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />
        </div>

        {/* Rotating Text Ring */}
        <div className="absolute -right-[30%] top-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full flex items-center justify-center pointer-events-none hidden lg:flex">
          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="w-full h-full relative"
          >
            <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible opacity-30">
              <path id="circlePath" d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0" fill="none" />
              <text className="text-[11px] font-mono uppercase tracking-widest" fill="currentColor">
                <textPath href="#circlePath" startOffset="0%">
                  Continuous Evolution • Decentralized Synergy • Pushing Boundaries • Safe to Break • 
                </textPath>
              </text>
            </svg>
          </motion.div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <span className="block font-mono text-highlight-accent text-xs md:text-sm tracking-[0.4em] uppercase mb-6">
            01 // The Foundation
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase text-white tracking-tighter leading-[0.9]">
            Our <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-accent to-secondary-accent">Core</span> <br/>
            Philosophy
          </h2>
          <p className="mt-8 text-lg text-white/50 max-w-md font-light leading-relaxed">
            We are a collective of digital architects, engineers, and designers building the next generation of web experiences.
          </p>
        </div>
      </div>

      {/* Right Scroll Side */}
      <div className="w-full lg:w-1/2 flex flex-col gap-16 lg:gap-32 p-8 lg:p-24 lg:pt-[30vh] lg:pb-[30vh] relative z-10">
        {cards.map((card, index) => (
          <AboutCard key={index} card={card} index={index} />
        ))}
      </div>
    </section>
  );
};
