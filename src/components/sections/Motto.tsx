import React, { useState, useEffect } from 'react';
import AnimatedTerminal from '@/components/AnimatedTerminal';

const Motto = () => {
  const [isDark, setIsDark] = useState(true); // Default to dark

  // This effect checks the <html> tag for the 'dark' class to determine the theme
  useEffect(() => {
    const checkTheme = () => {
      const isDarkMode = document.documentElement.classList.contains('dark');
      setIsDark(isDarkMode);
    };

    // Check on mount
    checkTheme();

    // Set up an observer to watch for class changes on the <html> element
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="motto" className="relative py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl relative z-10">
        {/* Pass the current theme state down to the terminal */}
        <AnimatedTerminal isDark={isDark} />
      </div>
    </section>
  );
};

export default Motto;
