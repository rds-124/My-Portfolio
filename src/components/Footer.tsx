import { Github, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-24 border-t">
      <div className="container py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Rohith D. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a aria-label="GitHub" href="https://github.com/rds-124" target="_blank" rel="noreferrer" className="story-link"><Github /></a>
          <a aria-label="LinkedIn" href="https://linkedin.com/in/rohith124" target="_blank" rel="noreferrer" className="story-link"><Linkedin /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
