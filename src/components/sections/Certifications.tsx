import { Award, ExternalLink } from "lucide-react";

const certifications = [
  {
    title: "Google Advanced Data Analytics Certificate",
    meta: "In Progress (Started August 2025)",
    link: "",
  },
  {
    title: "Deloitte Australia Data Analytics Job Simulation",
    meta: "June 2025",
    link: "https://drive.google.com/file/d/1uBhehAgjZ5OdgHyaEpaZHTwKO1yyGHY9/view?usp=sharing",
  },
  {
    title: "Cisco Certified Support Technician Cybersecurity",
    meta: "February 2025",
    link: "https://drive.google.com/file/d/1wc76dMfS1MWv-O8MJyiwgdvIAPFk__5d/view",
  },
];

const Certifications = () => {
  return (
    <section id="certifications" className="py-24">
      <div className="container">
        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-8">Certifications</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((c) => (
            <article
              key={c.title}
              className="border rounded-lg p-6 bg-secondary/30 hover:bg-secondary/50 transition-colors hover-scale"
            >
              <div className="flex items-start gap-3">
                <Award className="shrink-0 text-foreground" />
                <div>
                  <h3 className="text-base font-medium">{c.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{c.meta}</p>
                  {c.link && (
                    <a
                      href={c.link}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex items-center gap-1 text-sm story-link"
                    >
                      View Certificate <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
