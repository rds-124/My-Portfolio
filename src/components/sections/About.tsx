const About = () => {
  return (
    <section id="about" className="py-24">
      <div className="container">
        <div className="backdrop-blur-md bg-card/30 border border-border/20 rounded-2xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-enter space-y-6">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">About Me</h2>
              
              <p className="text-muted-foreground text-lg leading-relaxed">
                I'm a passionate data analyst who transforms complex datasets into clear, actionable insights. 
                I help businesses make smarter decisions faster through data-driven analysis and compelling visualizations.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <p className="text-muted-foreground">Expert in Python, SQL, Power BI, and advanced analytics</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <p className="text-muted-foreground">Passionate about turning raw data into business intelligence</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <p className="text-muted-foreground">Focused on driving measurable business growth through analytics</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <p className="text-muted-foreground">Committed to continuous learning and staying ahead of industry trends</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center animate-enter">
              <div className="w-80 h-80 flex items-center justify-center">
                {/* Lottie animation will go here - please provide the data visualization animation link */}
                <div className="w-full h-full bg-muted/20 rounded-lg flex items-center justify-center text-muted-foreground">
                  Data Visualization Animation
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
