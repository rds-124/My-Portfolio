import { useEffect, useState, useRef } from "react";

const useParticlesBackground = () => {
  const [isDark, setIsDark] = useState(false);
  const [particlesInit, setParticlesInit] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Monitor theme changes
  useEffect(() => {
    const checkTheme = () => {
      const htmlElement = document.documentElement;
      const isDarkMode = htmlElement.classList.contains("dark");
      setIsDark(isDarkMode);
    };

    // Initial check
    checkTheme();

    // Watch for class changes on html element
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"]
    });

    return () => observer.disconnect();
  }, []);

  // Initialize particles when dark theme is active
  useEffect(() => {
    const initParticles = async () => {
      if (isDark && !particlesInit) {
        try {
          // Dynamically import particles
          const { loadSlim } = await import("@tsparticles/slim");
          
          // Initialize tsParticles
          await loadSlim(window.tsParticles);
          setParticlesInit(true);
        } catch (error) {
          console.error("Failed to load particles:", error);
        }
      }
    };

    initParticles();
  }, [isDark, particlesInit]);

  const particlesConfig = {
    background: {
      color: {
        value: "transparent",
      },
    },
    particles: {
      number: { 
        value: 100, 
        density: { 
          enable: true, 
          value_area: 1000 
        } 
      },
      color: { 
        value: ["#00c6ff", "#6a11cb", "#ffffff"] 
      },
      shape: { 
        type: ["circle", "triangle"] 
      },
      opacity: {
        value: 0.6,
        random: true,
        animation: { 
          enable: true, 
          speed: 1, 
          minimumValue: 0.2, 
          sync: false 
        }
      },
      size: {
        value: 3,
        random: true,
        animation: { 
          enable: true, 
          speed: 1.5, 
          minimumValue: 1, 
          sync: false 
        }
      },
      links: {
        enable: true,
        distance: 150,
        color: "#00c6ff",
        opacity: 0.3,
        width: 1
      },
      move: {
        enable: true,
        speed: 3,
        direction: "none" as const,
        outModes: {
          default: "out" as const
        },
        random: false,
        straight: false,
        bounce: false
      }
    },
    interactivity: {
      detectsOn: "canvas" as const,
      events: {
        onHover: { 
          enable: true, 
          mode: "grab" 
        },
        onClick: { 
          enable: true, 
          mode: "push" 
        },
        resize: {
          enable: true
        }
      },
      modes: {
        grab: { 
          distance: 400, 
          links: { 
            opacity: 1 
          } 
        },
        push: { 
          quantity: 4 
        }
      }
    },
    detectRetina: true
  };

  return {
    isDark,
    particlesInit,
    particlesConfig,
    containerRef
  };
};

export default useParticlesBackground;