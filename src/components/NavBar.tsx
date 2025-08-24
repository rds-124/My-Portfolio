import { Home, MessageCircle, Briefcase, Wrench, User, FileText } from "lucide-react";
import { useState, useEffect } from "react";
import ElectricBorder from "@/components/ElectricBorder";

// --- Nav items updated to be more focused ---
const navItems = [
  { label: "Projects", href: "#projects", id: "projects", Icon: Briefcase },
  { label: "Skills", href: "#skills", id: "skills", Icon: Wrench },
  { label: "About", href: "#about", id: "about", Icon: User },
  { label: "Resume", href: "#resume", id: "resume", Icon: FileText },
];

// --- New unified array for a cleaner mobile navbar structure ---
const mobileNavItems = [
  { label: "Home", href: "#hero", id: "hero", Icon: Home },
  ...navItems,
  { label: "Contact", href: "#contact", id: "contact", Icon: MessageCircle },
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
      // --- THE FIX IS HERE: All sections are now included in the order they appear on the page. ---
      const sections = [
        "hero", 
        "achievements", 
        "philosophy", 
        "projects", 
        "skills", 
        "about", 
        "resume", 
        "certifications", 
        "contact"
      ];
      const scrollPosition = window.scrollY + window.innerHeight * 0.5; // Centered viewport detection

      let currentSection = "";

      // --- AND HERE: The logic now correctly finds which section is currently in view. ---
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            currentSection = sectionId;
            break; // Stop once the current section is found
          }
        }
      }
      
      // This handles sections that don't have a direct nav link
      if (['achievements', 'philosophy', 'certifications'].includes(currentSection)) {
        // No button is active for these sections
        setActiveSection(''); 
      } else {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed bottom-0 md:bottom-8 left-1/2 transform -translate-x-1/2 z-50 w-full md:w-auto transition-all duration-700 ease-out font-medium ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
      
      {/* --- Desktop Navbar --- */}
      <div className="hidden md:block">
        <ElectricBorder 
          color="#a855f7"
          speed={0.8}
          chaos={0.5}
          thickness={1}
          style={{ borderRadius: '9999px' }}
        >
          <div className="flex items-center gap-1 px-5 py-2.5 
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
      </div>

      {/* --- Mobile Navbar --- */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 
        bg-white/20 dark:bg-black/20 
        backdrop-blur-xl border-t border-white/20 dark:border-white/10"
        style={{ fontFamily: "'Poppins', 'Inter', sans-serif", fontWeight: 500 }}>
        
        <div className="flex items-center justify-around px-2 py-2">
          {mobileNavItems.map((item) => (
            <a 
              key={item.href} 
              href={item.href}
              className={`relative flex flex-col items-center justify-center w-16 h-12 rounded-xl transition-all duration-300 ${
                activeSection === item.id ? "" : "hover:bg-white/10 dark:hover:bg-white/10"
              }`}
              aria-label={item.label}
            >
              {activeSection === item.id && (
                <span className="absolute inset-0 bg-white/15 dark:bg-white/10 rounded-xl"></span>
              )}
              
              <item.Icon className={`w-5 h-5 transition-colors duration-300 z-10 ${
                activeSection === item.id ? "text-cyan-600 dark:text-cyan-300" : "text-black/80 dark:text-white/80"
              }`} />
              <span className={`text-[10px] mt-1 transition-colors duration-300 z-10 ${
                activeSection === item.id ? 'text-cyan-600 dark:text-cyan-300' : 'text-black/70 dark:text-white/70'
              }`}>
                {item.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
