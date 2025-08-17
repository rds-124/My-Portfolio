import { Home, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";

const navItems = [
  { label: "About", href: "#about", id: "about" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Resume", href: "https://drive.google.com/file/d/1UaPZJgIkibq1w4u5oRPEKiqbnZLFZyT6/view?usp=drive_link", external: true, id: "resume" },
];

const NavBar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    // Trigger entrance animation after component mounts
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "skills", "projects"];
      const scrollPosition = window.scrollY + 100;

      // Reset active section if none match
      let newActiveSection = "";

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            newActiveSection = section;
            break;
          }
        }
      }

      setActiveSection(newActiveSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-700 ease-out font-medium ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
      {/* Desktop floating pill nav */}
      <div className="hidden md:flex items-center gap-1 px-5 py-2.5 bg-navbar-glass-enhanced backdrop-blur-[15px] border border-navbar-border-glass rounded-full shadow-navbar-glass-shadow"
           style={{ fontFamily: "'Poppins', 'Inter', sans-serif", fontWeight: 500 }}>
        {/* Home icon */}
        <a 
          href="#hero" 
          className={`group relative p-2.5 rounded-full transition-all duration-300 hover:bg-navbar-hover-enhanced hover:shadow-navbar-item-glow hover:scale-105 ${
            activeSection === "hero" ? "bg-navbar-active-glass shadow-navbar-active-glow" : ""
          }`}
          aria-label="Home"
        >
          <Home className={`w-4 h-4 transition-colors duration-300 ${
            activeSection === "hero" ? "text-cyan-300" : "text-foreground/90 group-hover:text-cyan-300"
          }`} />
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
            Home
          </div>
        </a>

        {/* Navigation links */}
        {navItems.map((item) => (
          <a 
            key={item.href} 
            href={item.href}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noopener noreferrer" : undefined}
            className={`px-3 py-1.5 text-sm transition-all duration-300 rounded-full relative hover:bg-navbar-hover-enhanced hover:shadow-navbar-item-glow hover:scale-105 ${
              activeSection === item.id ? 
                "bg-navbar-active-glass text-cyan-300 shadow-navbar-active-glow" : 
                "text-foreground/90 hover:text-cyan-300"
            }`}
          >
            {item.label}
          </a>
        ))}

        {/* Let's Talk CTA button */}
        <a 
          href="#contact" 
          className="ml-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-cyan-400 to-purple-600 hover:from-cyan-300 hover:to-purple-500 rounded-full transition-all duration-300 hover:shadow-navbar-cta-glow hover:scale-105 shadow-lg shadow-cyan-400/25"
        >
          <MessageCircle className="w-4 h-4 inline mr-2" />
          Let's Talk
        </a>
      </div>

      {/* Mobile full-width nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-navbar-glass-enhanced backdrop-blur-[15px] border-t border-navbar-border-glass"
           style={{ fontFamily: "'Poppins', 'Inter', sans-serif", fontWeight: 500 }}>
        <div className="flex items-center justify-around px-3 py-3.5">
          {/* Home icon */}
          <a 
            href="#hero" 
            className={`p-2.5 rounded-full transition-all duration-300 hover:bg-navbar-hover-enhanced hover:scale-105 ${
              activeSection === "hero" ? "bg-navbar-active-glass" : ""
            }`}
            aria-label="Home"
          >
            <Home className={`w-4 h-4 transition-colors duration-300 ${
              activeSection === "hero" ? "text-cyan-300" : "text-foreground/90 hover:text-cyan-300"
            }`} />
          </a>

          {/* Navigation links */}
          {navItems.map((item) => (
            <a 
              key={item.href} 
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              className={`px-2.5 py-1.5 text-xs transition-all duration-300 rounded-full hover:bg-navbar-hover-enhanced hover:scale-105 ${
                activeSection === item.id ? 
                  "bg-navbar-active-glass text-cyan-300" : 
                  "text-foreground/90 hover:text-cyan-300"
              }`}
            >
              {item.label}
            </a>
          ))}

          {/* Let's Talk CTA button */}
          <a 
            href="#contact" 
            className="px-3 py-2 text-xs font-medium text-white bg-gradient-to-r from-cyan-400 to-purple-600 hover:from-cyan-300 hover:to-purple-500 rounded-full transition-all duration-300 hover:scale-105"
          >
            Let's Talk
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
