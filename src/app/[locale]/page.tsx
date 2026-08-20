import Header from '@/components/layout/Header';
import StarfieldBackground from '@/components/StarfieldBackground';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import FunSection from '@/components/sections/FunSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <>
      <StarfieldBackground />
      <Header />
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <FunSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
