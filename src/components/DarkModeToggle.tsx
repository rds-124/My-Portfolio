import { useEffect, useState, useRef } from "react";

// Declare the lottie-player web component
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'lottie-player': any;
    }
  }
}

const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(false);
  const lottieRef = useRef<any>(null);

  useEffect(() => {
    // Check localStorage and system preference on mount
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    const shouldBeDark = savedTheme === "dark" || (!savedTheme && systemPrefersDark);
    
    setIsDark(shouldBeDark);
    
    // Apply theme to html element
    const htmlElement = document.documentElement;
    if (shouldBeDark) {
      htmlElement.classList.add("dark");
      htmlElement.classList.remove("light");
    } else {
      htmlElement.classList.add("light");
      htmlElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    // Update html classes
    const htmlElement = document.documentElement;
    if (newIsDark) {
      htmlElement.classList.add("dark");
      htmlElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    } else {
      htmlElement.classList.add("light");
      htmlElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
    
    // Play lottie animation
    if (lottieRef.current) {
      if (newIsDark) {
        lottieRef.current.setDirection(1);
        lottieRef.current.play();
      } else {
        lottieRef.current.setDirection(-1);
        lottieRef.current.play();
      }
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-5 right-5 z-50 w-10 h-10 md:w-12 md:h-12 bg-transparent border-none cursor-pointer transition-transform duration-200 hover:scale-105"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <lottie-player
        ref={lottieRef}
        src="https://lottie.host/76aa86c9-8b95-434c-b895-2718f70a3efe/wzYGtaXZzJ.json"
        background="transparent"
        speed="1"
        style={{ width: "100%", height: "100%" }}
        loop={false}
        autoplay={false}
      />
    </button>
  );
};

export default DarkModeToggle;