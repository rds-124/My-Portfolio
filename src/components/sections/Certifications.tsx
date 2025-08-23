import { ExternalLink, Link as LinkIcon } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import SplitText from "@/components/SplitText";

const certificationsData = [
  {
    title: "Google Advanced Data Analytics Certificate",
    meta: "In Progress (Started August 2025)",
    link: "",
    logo: "/images/google.svg",
  },
  {
    title: "Deloitte Australia Data Analytics Job Simulation",
    meta: "June 2025",
    link: "/pdf/deloitte.pdf",
    logo: "/images/deloitte.svg",
  },
  {
    title: "Cisco Certified Support Technician Cybersecurity",
    meta: "February 2025",
    link: "/pdf/cisco.pdf",
    logo: "/images/cisco.svg",
  },
];

// --- 1. New dedicated component for each certification card ---
const CertificationCard = ({ certification }) => {
  const { title, meta, link, logo } = certification;
  const [showButton, setShowButton] = useState(false);
  const [hasAnimatedIn, setHasAnimatedIn] = useState(false);
  const cardRef = useRef(null);

  // --- Effect for the one-time button animation on scroll ---
  useEffect(() => {
    if (!cardRef.current || !link) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimatedIn) {
          // Show the button
          setTimeout(() => setShowButton(true), 300);

          // Hide the button after a delay
          setTimeout(() => {
            setShowButton(false);
            setHasAnimatedIn(true); // Mark animation as complete
          }, 2300); // Button is visible for 2 seconds

          observer.disconnect();
        }
      },
      { threshold: 0.7 } // Trigger when 70% of the card is visible
    );

    observer.observe(cardRef.current);

    return () => observer.disconnect();
  }, [hasAnimatedIn, link]);

  return (
    <article
      ref={cardRef}
      key={title}
      className="group relative h-full flex flex-col rounded-2xl p-6 text-gray-800 dark:text-white overflow-hidden
                 bg-white/10 dark:bg-black/30 backdrop-blur-xl 
                 border border-white/20 
                 shadow-lg hover:shadow-2xl 
                 transition-all duration-300 hover:scale-[1.03]"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 flex-shrink-0 rounded-lg bg-black/5 dark:bg-white/10 backdrop-blur-sm flex items-center justify-center ring-1 ring-black/10 dark:ring-white/20 text-foreground">
          <img src={logo} alt={`${title} Logo`} className="w-6 h-6" />
        </div>
        <div className="flex-grow">
          <h3 className="text-base font-bold text-foreground">{title}</h3>
          <p className="mt-1 text-xs text-muted-foreground">{meta}</p>
        </div>
      </div>

      {link && (
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          // --- 2. Class logic is updated to handle the new animation state ---
          className={`absolute bottom-6 left-6 right-6 inline-flex items-center justify-center gap-2 
                     bg-gray-700/50 text-white font-semibold py-2.5 px-4 rounded-lg 
                     transition-all duration-500 
                     ${showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                     ${!hasAnimatedIn ? '' : 'group-hover:opacity-100 group-hover:translate-y-0'}`}
        >
          <LinkIcon size={16} />
          Verify Credential
        </a>
      )}
    </article>
  );
};


const Certifications = () => {
  return (
    <section id="certifications" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-12">
          <SplitText
            text="Certifications"
            className="font-display text-4xl md:text-5xl font-bold text-foreground"
            splitType="chars"
            delay={50}
          />
          <p className="text-lg text-muted-foreground mt-2">My professional credentials and qualifications.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* --- 3. Now mapping over the new CertificationCard component --- */}
          {certificationsData.map((c) => (
            <CertificationCard key={c.title} certification={c} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
