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

  const darkThemeConfig = {
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
          area: 1000 
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
        outModes: "out" as const
      }
    },
    interactivity: {
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

  const lightThemeConfig = {
    background: {
      color: {
        value: "transparent",
      },
    },
    particles: {
      number: { 
        value: 80, 
        density: { 
          enable: true, 
          area: 800 
        } 
      },
      color: { 
        value: ["#6a11cb", "#00c6ff", "#333333"] 
      },
      shape: { 
        type: ["circle"] 
      },
      opacity: {
        value: 0.5,
        random: true,
        animation: { 
          enable: true, 
          speed: 1, 
          minimumValue: 0.2, 
          sync: false 
        }
      },
      size: {
        value: 2.5,
        random: true,
        animation: { 
          enable: false 
        }
      },
      links: {
        enable: true,
        distance: 150,
        color: "#6a11cb",
        opacity: 0.25,
        width: 1
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none" as const,
        outModes: "out" as const
      }
    },
    interactivity: {
      events: {
        onHover: { 
          enable: true, 
          mode: "repulse" 
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
        repulse: { 
          distance: 200, 
          duration: 0.4 
        },
        push: { 
          quantity: 3 
        }
      }
    },
    detectRetina: true
  };

  const particlesConfig = isDark ? darkThemeConfig : lightThemeConfig;

  return {
    isDark,
    particlesInit,
    particlesConfig,
    containerRef
  };
};

export default useParticlesBackground;