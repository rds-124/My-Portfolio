import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

function encode(data: Record<string, string>) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

const Contact = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setLoading(true);
    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": form.getAttribute("name") || "contact", ...(Object.fromEntries(data) as any) }),
      });
      toast({ title: "Message sent!", description: "Thanks for reaching out. I'll get back to you soon." });
      form.reset();
    } catch (err) {
      toast({ title: "Something went wrong", description: "Please try again or email me directly.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24">
      <div className="container">
        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-8">Get in touch</h2>
        <form
          name="contact"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-6 border rounded-lg p-6 bg-secondary/30"
        >
          <input type="hidden" name="form-name" value="contact" />
          <p className="hidden">
            <label>
              Don’t fill this out: <input name="bot-field" />
            </label>
          </p>
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm">Name</label>
            <input id="name" name="name" required className="h-11 rounded-md border bg-background px-3" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm">Email</label>
            <input id="email" name="email" type="email" required className="h-11 rounded-md border bg-background px-3" />
          </div>
          <div className="md:col-span-2 flex flex-col gap-2">
            <label htmlFor="message" className="text-sm">Message</label>
            <textarea id="message" name="message" required rows={5} className="rounded-md border bg-background px-3 py-2" />
          </div>
          <div className="md:col-span-2 flex items-center gap-4">
            <button disabled={loading} className="inline-flex h-11 px-5 items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition">
              {loading ? "Sending..." : "Send Message"}
            </button>
            <a href="mailto:rohithsd124@gmail.com" className="story-link">Or email me directly</a>
          </div>
          <div className="md:col-span-2 flex items-center gap-3 text-sm text-muted-foreground">
            <a href="mailto:rohithsd124@gmail.com" className="story-link">rohithsd124@gmail.com</a>
            <span>•</span>
            <a href="https://linkedin.com/in/rohith124" target="_blank" rel="noreferrer" className="story-link">LinkedIn</a>
            <span>•</span>
            <a href="https://github.com/rds-124" target="_blank" rel="noreferrer" className="story-link">GitHub</a>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
