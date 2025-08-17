import { ExternalLink, Github, BarChart3, LineChart, PieChart, Hand, ShieldCheck, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "Zomato Demand & Delivery Dashboard",
    description:
      "Interactive Power BI dashboard analyzing 50k+ Bangalore restaurant listings. Cleaned and explored data, visualized KPIs (avg cost, ratings, online orders) with dynamic filters.",
    tech: ["Power BI", "Python", "EDA"],
    live: "",
    repo: "",
    icon: "bar",
  },
  {
    title: "Indian Startup Failure Analysis",
    description:
      "EDA on 800+ Indian startups to find failure patterns: sector-wise risk and lifespan distribution. Interactive Power BI dashboard with Excel, DAX, and Power Query.",
    tech: ["Python", "Power BI", "Pandas"],
    live: "",
    repo: "https://github.com/rds-124/Indian-Startup-Failure-Analysis",
    icon: "line",
  },
  {
    title: "Power BI Dashboards",
    description:
      "Collection of BI dashboards to visualize KPIs and trends: Supermarket Store (inventory & stock tracking) and HR Analysis (hiring & attrition).",
    tech: ["Power BI", "DAX", "Excel"],
    live: "",
    repo: "https://github.com/rds-124/PowerBI-Dashboards",
    icon: "pie",
  },
  {
    title: "SIGNSPEAK: Gestures to Speech & Translation",
    description:
      "Gesture-to-speech system using MediaPipe and NLP for sign language translation with real-time speech/text output.",
    tech: ["Python", "MediaPipe", "NLP"],
    live: "",
    repo: "https://github.com/rds-124/SIGNSPEAK",
    icon: "hand",
  },
  {
    title: "Fraud Detection for Financial Transactions",
    description:
      "Trained a Random Forest on 6M+ transactions to detect fraud (F1 99%). Engineered features (e.g., deltaOrig), addressed class imbalance, and surfaced top fraud signals to inform risk strategies.",
    tech: ["Python", "Random Forest", "scikit-learn"],
    live: "",
    repo: "https://github.com/rds-124/Fraud-Detection",
    icon: "shield",
  },
  {
    title: "Automatic Number Plate Recognition (ANPR)",
    description:
      "Real-time license plate detection with YOLOv8 and OpenCV, integrated OCR for accurate number extraction; robust across varied lighting and traffic conditions.",
    tech: ["Python", "YOLOv8", "OpenCV", "OCR"],
    live: "",
    repo: "https://github.com/rds-124/ANPR-YOLOv8",
    icon: "camera",
  },
];

const iconMap: Record<string, JSX.Element> = {
  bar: <BarChart3 className="w-5 h-5" />,
  line: <LineChart className="w-5 h-5" />,
  pie: <PieChart className="w-5 h-5" />,
  hand: <Hand className="w-5 h-5" />,
  shield: <ShieldCheck className="w-5 h-5" />,
  camera: <Camera className="w-5 h-5" />,
};

const brandVarMap: Record<string, string> = {
  "Power BI": "--brand-powerbi",
  Python: "--brand-python",
  EDA: "--brand-eda",
  Pandas: "--brand-pandas",
  DAX: "--brand-dax",
  Excel: "--brand-excel",
  MediaPipe: "--brand-mediapipe",
  NLP: "--brand-nlp",
  "Random Forest": "--brand-randomforest",
  "scikit-learn": "--brand-scikitlearn",
  YOLOv8: "--brand-yolov8",
  OpenCV: "--brand-opencv",
  OCR: "--brand-ocr",
};

const Projects = () => {
  return (
    <section id="projects" className="relative py-24 section-gradient-dark">
      <div className="container">
        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-10">Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {projects.map((p) => (
            <article
              key={p.title}
              className="group relative h-full flex flex-col rounded-xl border card-premium overflow-hidden"
            >
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-secondary/60 flex items-center justify-center ring-1 ring-border text-foreground/90">
                    {iconMap[p.icon]}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold leading-tight">{p.title}</h3>
                </div>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {p.description}
                </p>

                {p.tech && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="tag-chip"
                        style={{ backgroundColor: `hsl(var(${brandVarMap[t] ?? "--brand-generic"}))` }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-6 md:mt-8 flex items-center gap-3">
                  {p.live && (
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noreferrer"
                      className="story-link inline-flex items-center gap-2 text-sm"
                    >
                      Live <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>

                <div className="mt-auto" />
              </div>

              {p.repo && (
                <div className="p-6 pt-0">
                  <a href={p.repo} target="_blank" rel="noreferrer" className="inline-flex">
                    <Button
                      variant="glow"
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      <Github className="w-4 h-4 mr-2" /> View Code
                    </Button>
                  </a>
                </div>
              )}

              <div className="pointer-events-none absolute inset-0 rounded-xl shadow-[inset_0_1px_0_hsl(var(--primary)/0.08)] group-hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.25),0_20px_40px_-20px_hsl(var(--primary)/0.35)] transition-shadow duration-300" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
