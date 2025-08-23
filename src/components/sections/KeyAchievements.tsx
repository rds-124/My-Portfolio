import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, BarChartHorizontal, Rocket } from 'lucide-react';

// Import the SplitText component
import SplitText from "@/components/SplitText";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// The AchievementCard component remains the same
const AchievementCard = ({ icon, value, label, description }) => (
  <div 
    className="group h-full flex flex-col rounded-2xl p-6 text-gray-800 dark:text-white overflow-hidden
               bg-white/10 dark:bg-black/30 backdrop-blur-xl 
               border border-white/20 
               shadow-lg hover:shadow-2xl 
               transition-all duration-300 hover:scale-[1.03]"
  >
    <div className="flex justify-center mb-4">
      <div className="w-14 h-14 rounded-lg bg-black/5 dark:bg-white/10 backdrop-blur-sm flex items-center justify-center ring-1 ring-black/10 dark:ring-white/20">
        {icon}
      </div>
    </div>
    <div className="text-center">
      <p className="text-5xl font-bold text-foreground">{value}</p>
      <h3 className="text-xl font-semibold text-foreground mt-2">{label}</h3>
      <p className="text-muted-foreground mt-1 text-sm">{description}</p>
    </div>
  </div>
);

const KeyAchievements = () => {
  const achievements = [
    { icon: <ShieldCheck size={28} className="text-foreground" />, value: "99%", label: "Fraud Detection Accuracy", description: "Achieved with a Random Forest model trained on over 6 million transactions." },
    { icon: <BarChartHorizontal size={28} className="text-foreground" />, value: "50k+", label: "Restaurant Listings Analyzed", description: "Cleaned and visualized a large-scale dataset to uncover business insights for Zomato." },
    { icon: <Rocket size={28} className="text-foreground" />, value: "800+", label: "Startups Profiled", description: "Analyzed failure patterns across hundreds of Indian startups to identify key risk factors." },
  ];

  return (
    <section id="achievements" className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="text-center mb-12">
          {/* Replaced the h2 tag with the SplitText component */}
          <SplitText
            text="Key Achievements"
            className="font-display text-4xl md:text-5xl font-bold text-foreground"
            splitType="chars"
            delay={50}
          />
          <p className="text-lg text-muted-foreground mt-2">Quantifiable results from my project work.</p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ staggerChildren: 0.2 }}
        >
          {achievements.map((item, index) => (
            <motion.div key={index} variants={cardVariants}>
              <AchievementCard {...item} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default KeyAchievements;
