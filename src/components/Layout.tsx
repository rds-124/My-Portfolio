import ParticlesBackground from "@/components/ParticlesBackground";

export default function Layout({ children }) {
  return (
    <>
      <ParticlesBackground />
      <div className="relative z-10">{children}</div>
    </>
  );
}

