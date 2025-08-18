import { useCallback, useMemo } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";
import useParticlesBackground from "@/hooks/useParticlesBackground";

const ParticlesBackground = () => {
  const { isDark, particlesConfig } = useParticlesBackground();

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const options = useMemo(() => particlesConfig, [particlesConfig]);

  // Only render particles in dark mode
  if (!isDark) {
    return null;
  }

  return (
    <div className="fixed inset-0 -z-10">
      <Particles
        id="particles-background"
        init={particlesInit}
        options={options}
        className="w-full h-full"
      />
    </div>
  );
};

export default ParticlesBackground;