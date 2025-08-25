import React from "react";

// Corrected the import path to use the project's alias
import SplitText from "@/components/SplitText";
import SectionOverlay from "@/components/SectionOverlay";

// Declare the lottie-player web component
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'lottie-player': any;
    }
  }
}

const About = () => {
  return (
    <section id="about" className="relative pt-24 pb-32">
      <SectionOverlay />

      <div className="container relative z-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Text Section */}
          <div className="animate-enter space-y-6">
            {/* Replaced the h2 tag with the SplitText component */}
            <SplitText
              text="About Me"
              className="font-display text-4xl md:text-5xl font-bold text-foreground"
              splitType="chars"
              delay={50}
            />
            
            <p className="text-muted-foreground text-lg leading-relaxed">
              I'm a passionate data analyst who transforms complex datasets into clear, actionable insights. 
              I help businesses make smarter decisions faster through data-driven analysis and compelling visualizations.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                <p className="text-muted-foreground">
                  Expert in Python, SQL, Power BI, and advanced analytics
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                <p className="text-muted-foreground">
                  Passionate about turning raw data into business intelligence
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                <p className="text-muted-foreground">
                  Focused on driving measurable business growth through analytics
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                <p className="text-muted-foreground">
                  Committed to continuous learning and staying ahead of industry trends
                </p>
              </div>
            </div>
          </div>
          
          {/* Lottie Animation */}
          <div className="flex justify-center animate-enter">
            <div className="w-80 h-80 flex items-center justify-center">
              <lottie-player
                src="https://lottie.host/4e9e8ffe-2c8f-4386-9c9e-f41529639dd2/t0E33qNEJM.json"
                background="transparent"
                speed="1"
                style={{ width: "100%", height: "100%" }}
                loop={true}
                autoplay={true}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
