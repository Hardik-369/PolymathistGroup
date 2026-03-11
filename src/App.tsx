/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ProjectShowcase } from './components/ProjectShowcase';
import { TimelineSection } from './components/TimelineSection';
import { CommunitySection } from './components/CommunitySection';
import { JoinForm } from './components/JoinForm';
import { Footer } from './components/Footer';
import { Cursor } from './components/Cursor';

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-black min-h-screen text-white selection:bg-primary-accent selection:text-white">
      <div className="noise-overlay" />
      <Cursor />
      
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectShowcase />
        <TimelineSection />
        <CommunitySection />
        <JoinForm />
      </main>

      <Footer />
    </div>
  );
}
