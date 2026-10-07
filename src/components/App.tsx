'use client';

import { LenisProvider } from '@/lib/scroll';
import Navigation from './Navigation';
import SocialLinks from './SocialLinks';
import Hero from './hero/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Work from './sections/Work';
import Certifications from './sections/Certifications';
import Experience from './sections/Experience';
import Achievements from './sections/Achievements';
import Contact from './sections/Contact';

export default function App() {
  return (
    <LenisProvider>
      <Navigation />
      <SocialLinks />
      <main>
        <Hero />
        <About />
        <Skills />
        <Work />
        <Certifications />
        <Experience />
        <Achievements />
        <Contact />
      </main>
    </LenisProvider>
  );
}
