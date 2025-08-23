import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { IOptions, RecursivePartial } from "@tsparticles/engine";

const ParticlesBackground = () => {
  const [init, setInit] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Monitor theme changes
  useEffect(() => {
    const checkTheme = () => {
      const htmlElement = document.documentElement;
      const isDarkMode = htmlElement.classList.contains("dark");
      setIsDark(isDarkMode);
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  // Initialize particles engine once
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  // Minimal visibility test config (30 circles)
  const minimalConfig = {
    fullScreen: { enable: true, zIndex: 0 },
    particles: {
      number: { value: 30, density: { enable: true } },
      color: { value: isDark ? "#00c6ff" : "#6a11cb" },
      shape: { type: "circle" },
      opacity: { value: 0.5 },
      size: { value: 3, random: true },
      move: { enable: true, speed: 1.2 }
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: "grab" },
        onClick: { enable: true, mode: "push" }
      },
      modes: {
        push: { quantity: 2 },
        grab: { distance: 140, links: { opacity: 0.4 } }
      }
    },
    detectRetina: true
  };

  // Final configs (will use in Prompt 2)
  const darkConfig: RecursivePartial<IOptions> = {
    fullScreen: { enable: true, zIndex: 0 },
    particles: {
      number: { value: 100, density: { enable: true } },
      color: { value: ["#22d3ee", "#a78bfa", "#ffffff"] },
      shape: { type: ["circle", "triangle"] },
      opacity: { value: 0.5 },
      size: { value: { min: 1, max: 4 } },
      links: { enable: true, distance: 140, color: "#94a3b8", opacity: 0.25, width: 1 },
      move: { enable: true, speed: 1.2, outModes: "out" }
    },
    interactivity: {
      events: { onHover: { enable: true, mode: "grab" }, onClick: { enable: true, mode: "push" }, resize: { enable: true } },
      modes: { grab: { distance: 180, links: { opacity: 0.6 } }, push: { quantity: 4 } }
    },
    detectRetina: true
  };

  const lightConfig: RecursivePartial<IOptions> = {
    fullScreen: { enable: true, zIndex: 0 },
    particles: {
      number: { value: 90, density: { enable: true } },
      color: { value: ["#2563eb", "#0ea5e9", "#9333ea"] }, // stronger contrast (blue, cyan, purple)
      shape: { type: ["circle", "triangle"] },
      opacity: { value: 0.6 }, // make particles more visible
      size: { value: { min: 2, max: 4 } }, // slightly larger
      links: { enable: true, distance: 130, color: "#cbd5e1", opacity: 0.3, width: 1 }, // add soft linking
      move: { enable: true, speed: 1.2, outModes: "out" }
    },
    interactivity: {
      events: { onHover: { enable: true, mode: "grab" }, onClick: { enable: true, mode: "push" }, resize: { enable: true } },
      modes: {
        grab: { distance: 160, links: { opacity: 0.5 } },
        push: { quantity: 3 }
      }
    },
    detectRetina: true
  };
  

  if (!init) return null;
  const useMinimalConfig = false; // <-- switch off the test
  const config = isDark ? darkConfig : lightConfig;
  return <Particles id="particles-background" options={config} />;
};

export default ParticlesBackground;
