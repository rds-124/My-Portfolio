import React from 'react';

// Import the SplitText component
import SplitText from "@/components/SplitText";

// --- 1. Data array updated to use image paths ---
const techItemsData = [
    {
        // The icon is now an image path string
        icon: "/images/python.svg",
        name: "Python for Data Processing",
        description: "I leverage Python, with libraries like Pandas and Scikit-learn, for its power in data cleaning, feature engineering, and predictive modeling."
    },
    {
        icon: "/images/mysql.svg",
        name: "SQL for Data Extraction",
        description: "Fluent in SQL for efficient data querying, aggregation, and extraction from relational databases."
    },
    {
        icon: "/images/pbii.svg",
        name: "Power BI for Visualization",
        description: "I bring data to life with Power BI, creating intuitive, interactive dashboards that empower stakeholders to explore and understand the results."
    }
];


const TechItem = ({ icon, name, description }) => (
  <div 
    className="group h-full flex flex-col rounded-2xl p-6 text-gray-800 dark:text-white overflow-hidden
               bg-white/10 dark:bg-black/30 backdrop-blur-xl 
               border border-white/20 
               shadow-lg hover:shadow-xl 
               transition-all duration-300 hover:scale-[1.03]"
  >
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 flex-shrink-0 rounded-lg bg-black/5 dark:bg-white/10 backdrop-blur-sm flex items-center justify-center ring-1 ring-black/10 dark:ring-white/20">
        {/* --- 2. The icon is now rendered as an img tag --- */}
        <img src={icon} alt={`${name} logo`} className="w-6 h-6" />
      </div>
      <div>
        <h4 className="font-bold text-foreground text-lg">{name}</h4>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>
    </div>
  </div>
);

const TechPhilosophy = () => {
  return (
    <section id="philosophy" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-4 text-center lg:text-left">
            {/* Replaced the h2 tag with the SplitText component */}
            <SplitText
              text="My Tech Stack Philosophy"
              className="font-display text-4xl md:text-5xl font-bold text-foreground mb-2"
              splitType="words"
              delay={80}
            />
            <p className="text-lg text-muted-foreground leading-relaxed">
              I believe in a pragmatic approach: using the right tool for the right task. My process is built on a foundation of robust data manipulation and compelling visual storytelling.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              This philosophy allows me to transform complex, raw data into clear, actionable insights that drive business decisions.
            </p>
          </div>
          <div className="flex flex-col gap-6">
            {techItemsData.map((item) => (
                <TechItem key={item.name} {...item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechPhilosophy;
