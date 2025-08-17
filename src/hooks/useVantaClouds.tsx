import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    THREE: any;
    VANTA: any;
  }
}

export const useVantaClouds = (elementRef: React.RefObject<HTMLElement>) => {
  const vantaEffect = useRef<any>(null);
  const [scriptsLoaded, setScriptsLoaded] = useState(false);

  // Load Vanta.js scripts
  useEffect(() => {
    const loadScript = (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve();
          return;
        }
        
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve();
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    const loadScripts = async () => {
      try {
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js');
        await loadScript('https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.clouds.min.js');
        setScriptsLoaded(true);
      } catch (error) {
        console.error('Failed to load Vanta.js scripts:', error);
      }
    };

    loadScripts();
  }, []);

  const initVanta = () => {
    if (!scriptsLoaded || !elementRef.current || !window.VANTA || vantaEffect.current) {
      return;
    }

    try {
      vantaEffect.current = window.VANTA.CLOUDS({
        el: elementRef.current,
        THREE: window.THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        skyColor: 0xffffff,
        cloudColor: 0xe8e8e8,
        cloudShadowColor: 0x183550,
        sunColor: 0xff6600,
        sunGlareColor: 0xff6600,
        sunlightColor: 0xffffff,
        speed: 0.8
      });
    } catch (error) {
      console.error('Failed to initialize Vanta Clouds:', error);
    }
  };

  const destroyVanta = () => {
    if (vantaEffect.current) {
      try {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      } catch (error) {
        console.error('Failed to destroy Vanta effect:', error);
      }
    }
  };

  const handleThemeChange = (isDark: boolean) => {
    if (isDark) {
      destroyVanta();
    } else if (scriptsLoaded) {
      // Small delay to prevent flicker during theme transition
      setTimeout(() => {
        initVanta();
      }, 150);
    }
  };

  // Handle responsive resize
  useEffect(() => {
    const handleResize = () => {
      if (vantaEffect.current && vantaEffect.current.resize) {
        vantaEffect.current.resize();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      destroyVanta();
    };
  }, []);

  return {
    initVanta,
    destroyVanta,
    handleThemeChange,
    scriptsLoaded
  };
};