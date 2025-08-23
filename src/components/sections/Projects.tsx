import React, { useState } from 'react';
import {
  ExternalLink,
  Github,
  BarChart3,
  LineChart,
  PieChart,
  Hand,
  ShieldCheck,
  Camera,
} from "lucide-react";
import SectionOverlay from "@/components/SectionOverlay";
import useEmblaCarousel from "embla-carousel-react";

// --- 1. Project Data ---
const projects = [
  {
    title: "Zomato Demand & Delivery Dashboard",
    description:
      "Interactive Power BI dashboard analyzing 50k+ Bangalore restaurant listings. Cleaned and explored data, visualized KPIs with dynamic filters.",
    tech: ["Power BI", "Python", "EDA"],
    live: "",
    repo: "https://github.com/rds-124",
    icon: "bar",
    image: "/images/zomato.png",
  },
  {
    title: "Indian Startup Failure Analysis",
    description:
      "EDA on 800+ Indian startups to find failure patterns. Interactive Power BI dashboard with Excel, DAX, and Power Query.",
    tech: ["Python", "Power BI", "Pandas"],
    live: "",
    repo: "https://github.com/rds-124/Indian-Startup-Failure-Analysis",
    icon: "line",
    image: "/images/isfa.png",
  },
  {
    title: "Power BI Dashboards",
    description:
      "Collection of BI dashboards to visualize KPIs and trends for Supermarket Store (inventory) and HR (hiring & attrition).",
    tech: ["Power BI", "DAX", "Excel"],
    live: "",
    repo: "https://github.com/rds-124/PowerBI-Dashboards",
    icon: "pie",
    image: "/images/pbi.png",
  },
  {
    title: "SIGNSPEAK: Gestures to Speech",
    description:
      "Gesture-to-speech system using MediaPipe and NLP for sign language translation with real-time speech/text output.",
    tech: ["Python", "MediaPipe", "NLP"],
    live: "",
    repo: "https://github.com/rds-124/SIGNSPEAK",
    icon: "hand",
    image: "/images/sign.png",
  },
  {
    title: "Fraud Detection for Transactions",
    description:
      "Trained a Random Forest on 6M+ transactions to detect fraud (F1 99%). Engineered features and surfaced top fraud signals.",
    tech: ["Python", "Random Forest", "scikit-learn"],
    live: "",
    repo: "https://github.com/rds-124/Fraud-Detection",
    icon: "shield",
    image: "/images/fd.png",
  },
  {
    title: "Automatic Number Plate Recognition",
    description:
      "Real-time license plate detection with YOLOv8 and OpenCV, integrated OCR for accurate number extraction.",
    tech: ["Python", "YOLOv8", "OpenCV", "OCR"],
    live: "",
    repo: "https://github.com/rds-124/ANPR-YOLOv8",
    icon: "camera",
    image: "/images/anpr.png",
  },
];

const projectPairs = projects.reduce((result, _value, index, array) => {
  if (index % 2 === 0) {
    result.push(array.slice(index, index + 2));
  }
  return result;
}, [] as (typeof projects)[]);


const iconMap: Record<string, JSX.Element> = {
  bar: <BarChart3 className="w-8 h-8" />,
  line: <LineChart className="w-8 h-8" />,
  pie: <PieChart className="w-8 h-8" />,
  hand: <Hand className="w-8 h-8" />,
  shield: <ShieldCheck className="w-8 h-8" />,
  camera: <Camera className="w-8 h-8" />,
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

// --- 2. CSS for the 3D Flip Effect ---
const FlipCardStyles = () => (
  <style>{`
    .flip-card {
      perspective: 1500px;
    }
    .flip-card-inner {
      position: relative;
      width: 100%;
      height: 100%;
      transition: transform 0.8s;
      transform-style: preserve-3d;
    }
    .flip-card.flipped .flip-card-inner {
      transform: rotateY(180deg);
    }
    .flip-card-front, .flip-card-back {
      position: absolute;
      width: 100%;
      height: 100%;
      -webkit-backface-visibility: hidden; /* For Safari */
      backface-visibility: hidden;
    }
    .flip-card-back {
      transform: rotateY(180deg);
    }
  `}</style>
);

// --- 3. The New Project Card Component with Flip Logic ---
const ProjectCard = ({ project }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => setIsFlipped(!isFlipped);
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleFlip();
  };

  return (
    <div
      className={`flip-card w-full h-96 rounded-2xl ${isFlipped ? 'flipped' : ''}`}
      onClick={handleFlip}
      onMouseEnter={() => window.innerWidth > 768 && setIsFlipped(true)}
      onMouseLeave={() => window.innerWidth > 768 && setIsFlipped(false)}
      tabIndex="0"
      onKeyPress={handleKeyPress}
      role="button"
      aria-pressed={isFlipped}
    >
      <div className="flip-card-inner rounded-2xl">
        {/* --- Card Front --- */}
        <div className="flip-card-front absolute w-full h-full">
            <div className="relative z-10 flex flex-col h-full p-6 rounded-2xl text-gray-800 dark:text-white overflow-hidden bg-white/10 dark:bg-black/30 backdrop-blur-xl border border-white/20 shadow-lg">
                <div className="w-14 h-14 rounded-lg bg-black/5 dark:bg-white/10 backdrop-blur-sm flex items-center justify-center ring-1 ring-black/10 dark:ring-white/20 mb-4">
                    {iconMap[project.icon]}
                </div>
                {project.image && (
                    <div className="my-2 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={project.image} alt={project.title} className="w-full h-32 object-cover" />
                    </div>
                )}
                <div className="flex-grow flex flex-col justify-center">
                    <h3 className="text-xl font-bold leading-tight mt-2">{project.title}</h3>
                </div>
                <div className="mt-auto flex-shrink-0">
                    <div className="flex items-center gap-4">
                        {project.repo && (
                            <a href={project.repo} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">
                                <Github className="w-4 h-4" />
                                <span className="text-sm">Code</span>
                            </a>
                        )}
                        {project.live && (
                            <a href={project.live} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">
                                <ExternalLink className="w-4 h-4" />
                                <span className="text-sm">Live</span>
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>

        {/* --- Card Back --- */}
        <div className="flip-card-back absolute w-full h-full">
            <div className="relative z-10 flex flex-col h-full p-6 rounded-2xl justify-center items-center text-center text-gray-800 dark:text-white overflow-hidden bg-white/10 dark:bg-black/30 backdrop-blur-xl border border-white/20 shadow-lg">
                <h4 className="text-lg font-bold mb-2">{project.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                    {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2 justify-center">
                    {project.tech.map((t) => (
                        <span key={t} className="tag-chip text-xs px-2 py-1 rounded-full font-medium" style={{ backgroundColor: `hsl(var(${brandVarMap[t] ?? "--brand-generic"}))` }}>
                            {t}
                        </span>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};


// --- 4. The Main Projects Component ---
const Projects = () => {
  const [emblaRef] = useEmblaCarousel({ align: "start", loop: true });

  return (
    <>
      <FlipCardStyles />
      <section id="projects" className="relative pb-16 scroll-mt-24">
        <SectionOverlay />
        <div className="container relative z-20 pt-8">
          {/* THE FIX IS HERE: The title is now centered and styled identically to the Key Achievements section. */}
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Projects
            </h2>
            <p className="text-lg text-muted-foreground mt-2">A selection of my recent work.</p>
          </div>

          <div className="embla -ml-4" ref={emblaRef}>
            <div className="embla__container">
              {projectPairs.map((pair, index) => (
                <div key={index} className="embla__slide">
                  <div className="flex flex-col gap-4">
                    {pair.map((p) => (
                      <ProjectCard key={p.title} project={p} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Projects;
