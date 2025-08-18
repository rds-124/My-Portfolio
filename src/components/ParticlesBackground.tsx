import { useCallback, useMemo, useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import useParticlesBackground from "@/hooks/useParticlesBackground";

const ParticlesBackground = () => {
  const { isDark, particlesConfig } = useParticlesBackground();
  const [init, setInit] = useState(false);

  // Initialize particles engine
  useEffect(() => {
    if (!init) {
      initParticlesEngine(async (engine) => {
        await loadSlim(engine);
      }).then(() => {
        setInit(true);
      });
    }
  }, [init]);

  const options = useMemo(() => particlesConfig, [particlesConfig]);

  // Only render particles when initialized
  if (!init) {
    return null;
  }

  return (
    <div className="fixed inset-0 -z-10">
      <Particles
        id="particles-background"
        options={options}
        className="w-full h-full"
      />
    </div>
  );
};

export default ParticlesBackground;