// Inside src/hooks/useIsDesktop.ts

import { useState, useEffect } from 'react';

export const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      // We consider it a desktop if the width is 768px or more
      setIsDesktop(window.innerWidth >= 768); 
    };

    // Run on initial load
    handleResize(); 
    
    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isDesktop;
};