import { ExternalLink, Link as LinkIcon } from "lucide-react";
import React from "react";

const certifications = [
  {
    title: "Google Advanced Data Analytics Certificate",
    meta: "In Progress (Started August 2025)",
    link: "",
    logo: "/images/google.svg", // Path to your downloaded SVG
  },
  {
    title: "Deloitte Australia Data Analytics Job Simulation",
    meta: "June 2025",
    link: "/pdf/deloitte.pdf",
    logo: "/images/deloitte.svg", // Path to your downloaded SVG
  },
  {
    title: "Cisco Certified Support Technician Cybersecurity",
    meta: "February 2025",
    link: "/pdf/cisco.pdf",
    logo: "/images/cisco.svg", // Path to your downloaded SVG
  },
];

const Certifications = () => {
  return (
    <section id="certifications" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">Certifications</h2>
          <p className="text-lg text-muted-foreground mt-2">My professional credentials and qualifications.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((c) => (
            <article
              key={c.title}
              // The `group` class is essential for the hover effect on the button
              className="group relative h-full flex flex-col rounded-2xl p-6 text-gray-800 dark:text-white overflow-hidden
                         bg-white/10 dark:bg-black/30 backdrop-blur-xl 
                         border border-white/20 
                         shadow-lg hover:shadow-2xl 
                         transition-all duration-300 hover:scale-[1.03]"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex-shrink-0 rounded-lg bg-black/5 dark:bg-white/10 backdrop-blur-sm flex items-center justify-center ring-1 ring-black/10 dark:ring-white/20 text-foreground">
                  <img src={c.logo} alt={`${c.title} Logo`} className="w-6 h-6" />
                </div>
                <div className="flex-grow">
                  <h3 className="text-base font-bold text-foreground">{c.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{c.meta}</p>
                </div>
              </div>

              {/* THE NEW HOVER BUTTON: This will only appear if a link exists */}
              {c.link && (
                <a
                  href={c.link}
                  target="_blank"
                  rel="noreferrer"
                  className="absolute bottom-6 left-6 right-6 inline-flex items-center justify-center gap-2 
                             bg-gray-700/50 text-white font-semibold py-2.5 px-4 rounded-lg 
                             transition-all duration-300 
                             opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0"
                >
                  <LinkIcon size={16} />
                  Verify Credential
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
