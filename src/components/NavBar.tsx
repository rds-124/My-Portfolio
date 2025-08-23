import { Home, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";
import ElectricBorder from "@/components/ElectricBorder"; // Assuming ElectricBorder is in this path

// The "Resume" item now correctly points to the #resume section.
type NavItem = { label: string; href: string; id: string; external?: boolean };
const navItems: NavItem[] = [
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "About", href: "#about", id: "about" },
  { label: "Resume", href: "#resume", id: "resume" }, 
];

const NavBar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "projects", "skills", "about", "resume", "certifications", "contact"];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      let newActiveSection = "hero";
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            newActiveSection = sectionId;
            break;
          }
        }
      }
      setActiveSection(newActiveSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-700 ease-out font-medium ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
      
      {/* Desktop navbar is now wrapped with the ElectricBorder component */}
      <ElectricBorder 
        color="#a855f7" // Purple color from your theme
        speed={0.8}
        chaos={0.5}
        thickness={1}
        style={{ borderRadius: '9999px' }} // Ensure the border is fully rounded
      >
        <div className="hidden md:flex items-center gap-1 px-5 py-2.5 
          bg-white/10 dark:bg-black/20 
          backdrop-blur-xl 
          rounded-full shadow-lg shadow-cyan-500/10"
          style={{ fontFamily: "'Poppins', 'Inter', sans-serif", fontWeight: 500 }}>
          
          <a 
            href="#hero" 
            className={`group relative p-2.5 rounded-full transition-all duration-300 hover:bg-white/10 dark:hover:bg-white/10 hover:shadow-md hover:scale-105 ${
              activeSection === "hero" ? "bg-white/15 dark:bg-white/10 shadow-md" : ""
            }`}
            aria-label="Home"
          >
            <Home className={`w-4 h-4 transition-colors duration-300 ${
              activeSection === "hero" ? "text-cyan-600 dark:text-cyan-300" : "text-black/80 dark:text-white/80 group-hover:text-cyan-600 dark:group-hover:text-cyan-300"
            }`} />
          </a>

          {navItems.map((item) => (
            <a 
              key={item.href} 
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              className={`px-3 py-1.5 text-sm transition-all duration-300 rounded-full relative hover:bg-white/10 dark:hover:bg-white/10 hover:scale-105 ${
                activeSection === item.id ? "bg-white/15 dark:bg-white/10 text-cyan-600 dark:text-cyan-300" : "text-black/80 dark:text-white/80 hover:text-cyan-600 dark:hover:text-cyan-300"
              }`}
            >
              {item.label}
            </a>
          ))}

          <a 
            href="#contact" 
            className="ml-2 px-4 py-2 text-sm font-medium text-white 
            bg-gradient-to-r from-cyan-400 to-purple-600 
            hover:from-cyan-300 hover:to-purple-500 
            rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105 shadow-cyan-400/25"
          >
            <MessageCircle className="w-4 h-4 inline mr-2" />
            Let's Talk
          </a>
        </div>
      </ElectricBorder>

      {/* Mobile full-width nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 
        bg-white/20 dark:bg-black/20 
        backdrop-blur-xl border-t border-white/20 dark:border-white/10"
        style={{ fontFamily: "'Poppins', 'Inter', sans-serif", fontWeight: 500 }}>
        
        <div className="flex items-center justify-around px-3 py-3.5">
          <a 
            href="#hero" 
            className={`p-2.5 rounded-full transition-all duration-300 hover:bg-white/10 dark:hover:bg-white/10 hover:scale-105 ${
              activeSection === "hero" ? "bg-white/15 dark:bg-white/10" : ""
            }`}
            aria-label="Home"
          >
            <Home className={`w-4 h-4 transition-colors duration-300 ${
              activeSection === "hero" ? "text-cyan-600 dark:text-cyan-300" : "text-black/80 dark:text-white/80 hover:text-cyan-600 dark:hover:text-cyan-300"
            }`} />
          </a>

          {navItems.map((item) => (
            <a 
              key={item.href} 
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              className={`px-2.5 py-1.5 text-xs transition-all duration-300 rounded-full hover:bg-white/10 dark:hover:bg-white/10 hover:scale-105 ${
                activeSection === item.id ? "bg-white/15 dark:bg-white/10 text-cyan-600 dark:text-cyan-300" : "text-black/80 dark:text-white/80 hover:text-cyan-600 dark:hover:text-cyan-300"
              }`}
            >
              {item.label}
            </a>
          ))}

          <a 
            href="#contact" 
            className="px-3 py-2 text-xs font-medium text-white bg-gradient-to-r 
            from-cyan-400 to-purple-600 hover:from-cyan-300 hover:to-purple-500 
            rounded-full transition-all duration-300 hover:scale-105"
          >
            Let's Talk
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
