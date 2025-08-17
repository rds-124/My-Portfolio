import { Laptop, BarChart3, Code2, Boxes, Brain, Wrench, Globe } from "lucide-react";

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
      className="py-24 bg-[hsl(var(--sidebar-background))] text-[hsl(var(--sidebar-foreground))]"
    >
      <div className="container">
        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-10 flex items-center gap-3">
          <Laptop className="h-7 w-7" aria-hidden />
          <span>Tech Stack</span>
        </h2>

        <div className="grid gap-10 md:gap-12">
          {categories.map(({ title, Icon, items }) => (
            <article key={title} aria-labelledby={`heading-${title.replace(/\s+/g, "-").toLowerCase()}`}>
              <h3
                id={`heading-${title.replace(/\s+/g, "-").toLowerCase()}`}
                className="text-lg md:text-xl font-semibold flex items-center gap-2 mb-4"
              >
                <Icon className="h-5 w-5" aria-hidden />
                <span>{title}</span>
              </h3>

              <div className="flex flex-wrap gap-2" role="list">
                {items.map((name) => (
                  <span
                    key={name}
                    role="listitem"
                    className={`badge-chip ${brandClassMap[name]}`}
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
