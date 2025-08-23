import React, { useState } from 'react';
import { Linkedin, Github, Mail, Instagram, Copy, Check } from 'lucide-react';

// --- 1. Reusable Social Link Component (Updated) ---
// It now accepts an optional gradientClassName for special styling like Instagram.
const SocialLink = ({ href, tooltip, brandColor, gradientClassName, children }) => {
  const isMailLink = href.startsWith('mailto:');
  
  const baseClasses = `group flex justify-center p-4 rounded-xl drop-shadow-lg text-white font-semibold 
                     transition-all duration-500 
                     hover:-translate-y-2 hover:rounded-[50%]`;

  const finalClassName = gradientClassName ? `${baseClasses} ${gradientClassName}` : baseClasses;

  return (
    <a 
      href={href}
      target={isMailLink ? '_self' : '_blank'}
      rel={isMailLink ? undefined : 'noopener noreferrer'}
      className={finalClassName}
      style={{ backgroundColor: brandColor }}
    >
      {children}
      <span 
        className="absolute opacity-0 group-hover:opacity-100 group-hover:text-gray-900 dark:group-hover:text-gray-200 
                   group-hover:text-sm group-hover:-translate-y-12 duration-700
                   bg-white dark:bg-gray-800 px-3 py-1 rounded-md shadow-lg"
      >
        {tooltip}
      </span>
    </a>
  );
};

// --- 2. The New Contact Component ---
const Contact = () => {
  const [copyText, setCopyText] = useState('Copy');
  const email = 'rohithsd124@gmail.com';

  const handleCopy = () => {
    navigator.clipboard.writeText(email).then(() => {
      setCopyText('Copied!');
      setTimeout(() => {
        setCopyText('Copy');
      }, 2000); // Reset text after 2 seconds
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };

  return (
    <section id="contact" className="relative py-24 bg-transparent">
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">Let's Connect</h2>
          <p className="text-lg text-muted-foreground mt-2">I'm always open to discussing new projects and opportunities.</p>
        </div>

        {/* --- Animated Social Links with Official Brand Colors --- */}
        <div className="flex items-center justify-center gap-6 md:gap-8">
          <SocialLink 
            href="https://linkedin.com/in/rohith124" 
            tooltip="LinkedIn" 
            brandColor="#0077B5" // Official LinkedIn Blue
          >
            <Linkedin className="w-6 h-6 md:w-8 md:h-8" />
          </SocialLink>
          <SocialLink 
            href="https://github.com/rds-124" 
            tooltip="GitHub" 
            brandColor="#181717" // Official GitHub Black
          >
            <Github className="w-6 h-6 md:w-8 md:h-8" />
          </SocialLink>
          <SocialLink 
            href={`mailto:${email}`}
            tooltip="Email" 
            brandColor="#DB4437" // Official Google Red for Gmail
          >
            <Mail className="w-6 h-6 md:w-8 md:h-8" />
          </SocialLink>
          <SocialLink 
            href="https://www.instagram.com/rds_124/" 
            tooltip="Instagram" 
            // Official Instagram Gradient
            gradientClassName="bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400"
          >
            <Instagram className="w-6 h-6 md:w-8 md:h-8" />
          </SocialLink>
        </div>

        {/* --- Plain Email with Copy Button --- */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">Or reach me directly:</p>
          <div 
            className="relative inline-flex items-center justify-center p-1 rounded-full
                       bg-white/10 dark:bg-black/30 backdrop-blur-xl 
                       border border-white/20"
          >
            <span className="px-6 py-2 text-lg text-foreground">{email}</span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 bg-gray-700/50 text-white font-semibold py-2.5 px-4 rounded-full transition-all duration-300 hover:bg-cyan-500"
            >
              {copyText === 'Copy' ? <Copy size={16} /> : <Check size={16} className="text-green-400" />}
              {copyText}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
