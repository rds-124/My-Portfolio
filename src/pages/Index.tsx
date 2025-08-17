import NavBar from "@/components/NavBar";
import DarkModeToggle from "@/components/DarkModeToggle";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Certifications from "@/components/sections/Certifications";
import SoftSkills from "@/components/sections/SoftSkills";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <DarkModeToggle />
      <NavBar />
      <main className="pb-20 md:pb-16">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certifications />
        <SoftSkills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
