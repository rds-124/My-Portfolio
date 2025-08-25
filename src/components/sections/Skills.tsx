import React from 'react';
import { Laptop, BarChart3, Code2, Boxes, Brain, Wrench, Globe } from "lucide-react";

// Import the SplitText component
import SplitText from "@/components/SplitText";

const categories = [
  {
    title: "Core BI Tools",
    Icon: BarChart3,
    items: ["Power BI", "Excel", "Tableau", "MySQL", "SQL"],
  },
  {
    title: "Programming Languages",
    Icon: Code2,
    items: ["Python", "R"],
  },
  {
    title: "Data Libraries",
    Icon: Boxes,
    items: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Scikit-learn"],
  },
  {
    title: "ML / Deep Learning",
    Icon: Brain,
    items: ["TensorFlow", "PyTorch"],
  },
  {
    title: "Development Tools",
    Icon: Wrench,
    items: ["Git", "GitHub", "Jupyter", "Linux"],
  },
  {
    title: "Domains",
    Icon: Globe,
    items: [
      "Data Analysis",
      "Data Visualization",
      "Business Intelligence",
      "Product Analytics",
      "Data Cleaning",
      "ETL",
    ],
  },
];

const brandClassMap: Record<string, string> = {
  // Core BI Tools
  "Power BI": "bg-[hsl(var(--brand-powerbi))]",
  Excel: "bg-[hsl(var(--brand-excel))]",
  Tableau: "bg-[hsl(var(--brand-tableau))]",
  MySQL: "bg-[hsl(var(--brand-mysql))]",
  SQL: "bg-[hsl(var(--brand-sql))]",

  // Programming Languages
  Python: "bg-[hsl(var(--brand-python))]",
  R: "bg-[hsl(var(--brand-r))]",

  // Data Libraries
  Pandas: "bg-[hsl(var(--brand-pandas))]",
  NumPy: "bg-[hsl(var(--brand-numpy))]",
  Matplotlib: "bg-[hsl(var(--brand-matplotlib))]",
  Seaborn: "bg-[hsl(var(--brand-seaborn))]",
  "Scikit-learn": "bg-[hsl(var(--brand-scikitlearn))]",

  // ML / Deep Learning
  TensorFlow: "bg-[hsl(var(--brand-tensorflow))]",
  PyTorch: "bg-[hsl(var(--brand-pytorch))]",

  // Development Tools
  Git: "bg-[hsl(var(--brand-git))]",
  GitHub: "bg-[hsl(var(--brand-github))]",
  Jupyter: "bg-[hsl(var(--brand-jupyter))]",
  Linux: "bg-[hsl(var(--brand-linux))]",

  // Domains (color-coded)
  "Data Analysis": "bg-[hsl(var(--domain-analysis))]",
  "Data Visualization": "bg-[hsl(var(--domain-visualization))]",
  "Business Intelligence": "bg-[hsl(var(--domain-bi))]",
  "Product Analytics": "bg-[hsl(var(--domain-product))]",
  "Data Cleaning": "bg-[hsl(var(--domain-cleaning))]",
  ETL: "bg-[hsl(var(--domain-etl))]",
};

const Skills = () => {
  return (
    <section
      id="skills"
      className="relative pt-24 pb-32 bg-transparent text-[hsl(var(--sidebar-foreground))]"
    >
      <div className="container max-w-4xl">
        <div className="text-center mb-12">
            {/* Replaced the h2 tag with the SplitText component */}
            <SplitText
              text="Tech Stack"
              className="font-display text-4xl md:text-5xl font-bold text-foreground"
              splitType="chars"
              delay={50}
            />
            <p className="text-lg text-muted-foreground mt-2">The tools and technologies I use to bring data to life.</p>
        </div>

        <div className="grid gap-10 md:gap-12">
          {categories.map(({ title, Icon, items }) => (
            <article key={title} aria-labelledby={`heading-${title.replace(/\s+/g, "-").toLowerCase()}`}>
              <h3
                id={`heading-${title.replace(/\s+/g, "-").toLowerCase()}`}
                className="text-xl md:text-2xl font-semibold flex items-center justify-center gap-3 mb-5"
              >
                <Icon className="h-6 w-6" aria-hidden />
                <span>{title}</span>
              </h3>

              <div className="flex flex-wrap justify-center gap-3" role="list">
                {items.map((name) => (
                  <span
                    key={name}
                    role="listitem"
                    className={`inline-flex items-center justify-center rounded-full font-bold text-base py-2 px-4 text-[hsl(var(--badge-foreground))] shadow-sm transition-transform hover:-translate-y-0.5 ${brandClassMap[name]}`}
                  >
                    {name}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
