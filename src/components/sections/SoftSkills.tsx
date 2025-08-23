import { Brain, CheckCircle2, Clock, MessageSquare, Target, Users } from "lucide-react";

const softSkills = [
  { name: "Adaptability", Icon: CheckCircle2 },
  { name: "Communication", Icon: MessageSquare },
  { name: "Cross-functional Collaboration", Icon: Users },
  { name: "Problem Solving", Icon: Brain },
  { name: "Time Management", Icon: Clock },
  { name: "Decision Making", Icon: Target },
];

const SoftSkills = () => {
  return (
    <section id="soft-skills" className="relative py-24 bg-transparent">
      <div className="container">
        <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-8">Soft Skills</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {softSkills.map(({ name, Icon }) => (
            <div
              key={name}
              className="group border rounded-lg p-4 bg-secondary/30 hover:bg-secondary/50 transition-colors hover-scale"
              role="listitem"
            >
              <div className="flex flex-col items-center text-center gap-3">
                <Icon className="text-foreground" />
                <span className="text-sm text-muted-foreground group-hover:text-foreground">{name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SoftSkills;
