import NavBar from "@/components/NavBar";
import DarkModeToggle from "@/components/DarkModeToggle";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Motto from "@/components/sections/Motto"; // 1. Import the new Motto component
import KeyAchievements from "@/components/sections/KeyAchievements";
import Projects from "@/components/sections/Projects";
import TechPhilosophy from "@/components/sections/TechPhilosophy";
import Skills from "@/components/sections/Skills";
import Certifications from "@/components/sections/Certifications";
import Resume from "@/components/sections/Resume";
import Contact from "@/components/sections/Contact";
import Marquee from "@/components/Marquee";
import Footer from "@/components/Footer";
import AnimatedLogo from "@/components/AnimatedLogo";

const Index = () => {
  return (
    <>
      <div className="fixed top-4 left-4 z-50">
        <AnimatedLogo />
      </div>

      <DarkModeToggle />
      <NavBar />
      <main>
        <Hero />
        <About />
        <Motto /> {/* 2. Place the new Motto section here */}
        <KeyAchievements />
        <Projects />
        <TechPhilosophy />
        <Skills />
        <Certifications />
        <Resume />
        <Contact />
      </main>
      <Marquee />
      <Footer />
    </>
  );
};

export default Index;
