import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useMotionTemplate, AnimatePresence } from 'framer-motion';
import { MagneticButton } from './MagneticButton';
import { ArrowRight, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export const JoinForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    reason: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const { left, top } = sectionRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email) return;

    // Trigger Confetti
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#FF0055', '#00FF88', '#0000FF', '#FF00AA']
    });

    // Show Success Message
    setShowSuccess(true);

    // Reset Form
    setFormData({ name: '', email: '', role: '', reason: '' });

    // Hide Success Message after 4 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 4000);
  };

  return (
    <section id="join" ref={sectionRef} className="relative py-32 md:py-48 bg-[#050505] min-h-screen flex items-center justify-center overflow-hidden cursor-default">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div 
          className="absolute top-[10%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-primary-accent/10 blur-[120px]"
          animate={{ y: [0, 100, 0], x: [0, -50, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-[10%] right-[20%] w-[50vw] h-[50vw] rounded-full bg-secondary-accent/10 blur-[150px]"
          animate={{ y: [0, -100, 0], x: [0, 50, 0], scale: [1, 1.3, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20 mix-blend-overlay" />
      </div>

      {/* Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 opacity-60 mix-blend-screen"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              800px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.15),
              transparent 40%
            )
          `,
        }}
      />

      <div className="container mx-auto px-[5vw] relative z-20 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="flex items-center gap-4 mb-16">
            <div className="w-12 h-[1px] bg-white/30" />
            <span className="font-mono text-white/50 text-xs md:text-sm tracking-[0.4em] uppercase">
              05 // The Application
            </span>
          </div>

          <form className="text-3xl md:text-5xl lg:text-7xl font-light leading-[1.8] md:leading-[1.8] text-white/40" onSubmit={handleSubmit}>
            Hello, my name is{' '}
            <span className="relative inline-block group mx-2">
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="[ Your Name ]"
                className="bg-transparent border-b-2 border-white/20 text-white focus:border-primary-accent focus:outline-none w-[200px] md:w-[350px] text-center placeholder:text-white/20 transition-colors duration-300 pb-2"
              />
            </span>
            {' '}and you can reach me at{' '}
            <span className="relative inline-block group mx-2">
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="[ Your Email ]"
                className="bg-transparent border-b-2 border-white/20 text-white focus:border-secondary-accent focus:outline-none w-[250px] md:w-[450px] text-center placeholder:text-white/20 transition-colors duration-300 pb-2"
              />
            </span>
            . I am a master of{' '}
            <span className="relative inline-block group mx-2">
              <input 
                type="text" 
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="[ Your Skills ]"
                className="bg-transparent border-b-2 border-white/20 text-white focus:border-primary-accent focus:outline-none w-[200px] md:w-[400px] text-center placeholder:text-white/20 transition-colors duration-300 pb-2"
              />
            </span>
            {' '}and I want to join the collective because{' '}
            <span className="relative inline-block group mx-2">
              <input 
                type="text" 
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                placeholder="[ Your Reason ]"
                className="bg-transparent border-b-2 border-white/20 text-white focus:border-secondary-accent focus:outline-none w-[250px] md:w-[550px] text-center placeholder:text-white/20 transition-colors duration-300 pb-2"
              />
            </span>
            .

            <div className="mt-24 flex justify-end">
              <MagneticButton
                className="py-6 px-12 bg-white text-black font-bold tracking-widest uppercase text-sm md:text-lg relative overflow-hidden group rounded-full flex items-center justify-center gap-4"
              >
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">Submit Application</span>
                <ArrowRight className="relative z-10 group-hover:text-white transition-colors duration-300 group-hover:translate-x-2" size={24} />
                <div className="absolute inset-0 bg-black transform scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-500 ease-out rounded-full" />
              </MagneticButton>
            </div>
          </form>
        </motion.div>
      </div>

      {/* Success Popup */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            <div className="bg-black/80 backdrop-blur-xl border border-white/20 p-8 md:p-12 rounded-3xl flex flex-col items-center gap-6 shadow-2xl">
              <div className="w-20 h-20 rounded-full bg-primary-accent/20 flex items-center justify-center text-primary-accent mb-2">
                <Check size={40} />
              </div>
              <h3 className="text-4xl font-black text-white uppercase tracking-wider text-center">Message Sent</h3>
              <p className="text-white/60 font-mono text-sm md:text-base text-center">Welcome to the vanguard. We will be in touch.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
