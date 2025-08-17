import { Button } from "@/components/ui/button";
import { Github, Linkedin, BarChart3 } from "lucide-react";

const Hero = () => {
  return (
    <section id="hero" className="relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Clean minimal background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-background via-background to-muted/20" />
      
      <div className="container max-w-6xl mx-auto px-6">
        <div className="max-w-4xl">
          {/* Main heading */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] mb-6">
            <span className="block text-foreground">Hi, I'm</span>
            <span className="block text-gradient-shimmer">Rohith</span>
          </h1>
          
          {/* Tagline */}
          <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground font-medium mb-12 max-w-3xl leading-relaxed">
            Transforming raw data into business insights
          </p>
          
          {/* Buttons and social links */}
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <Button 
              asChild 
              variant="hero" 
              size="lg" 
              className="group hover:scale-105 transition-all duration-300"
            >
              <a href="#projects" className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                View Projects
              </a>
            </Button>
            
            {/* Social links */}
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/rds-124"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-muted/50 hover:bg-muted hover:scale-110 transition-all duration-300 group"
                aria-label="GitHub Profile"
              >
                <Github className="w-5 h-5 group-hover:text-primary transition-colors" />
              </a>
              <a
                href="https://linkedin.com/in/rohith124"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-muted/50 hover:bg-muted hover:scale-110 transition-all duration-300 group"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-5 h-5 group-hover:text-primary transition-colors" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
