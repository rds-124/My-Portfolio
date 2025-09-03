// Inside: src/hooks/useIsDesktop.ts

import { useState, useEffect } from 'react';

// This hook returns 'true' if the window width is 768px or more
export const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    // Set the initial value
    handleResize();
    
    // Add listener for changes
    window.addEventListener('resize', handleResize);

    // Clean up listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isDesktop;
};