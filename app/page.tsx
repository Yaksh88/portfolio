'use client';

import React, { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Code2,
  Server,
  Database,
  Settings2,
  Mail
} from "lucide-react";

export default function Home() {
  const [activeSection, setActiveSection] = useState("Home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // --- Scroll observer ---
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );
    sections.forEach((section) => observer.observe(section));

    // --- Canvas particles setup ---
    const particlesCanvas = document.getElementById("particles-canvas") as HTMLCanvasElement;
    const particlesCtx = particlesCanvas?.getContext("2d");

    let particlesArray: { x: number; y: number; radius: number; dx: number; dy: number }[] = [];
    const numParticles = 80;

    function initParticles() {
      particlesArray = [];
      for (let i = 0; i < numParticles; i++) {
        particlesArray.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          radius: Math.random() * 3 + 1,
          dx: (Math.random() - 0.5) * 0.5,
          dy: (Math.random() - 0.5) * 0.5,
        });
      }
    }

    function animate() {
      if (!particlesCtx || !particlesCanvas) return;

      particlesCtx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);

      for (let p of particlesArray) {
        particlesCtx.beginPath();
        particlesCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        particlesCtx.fillStyle = "rgba(255, 255, 255, 0.9)";
        particlesCtx.fill();
        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > window.innerWidth) p.dx *= -1;
        if (p.y < 0 || p.y > window.innerHeight) p.dy *= -1;
      }

      // Draw lines between particles
      for (let i = 0; i < particlesArray.length; i++) {
        for (let j = i + 1; j < particlesArray.length; j++) {
          const dx = particlesArray[i].x - particlesArray[j].x;
          const dy = particlesArray[i].y - particlesArray[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 100) {
            particlesCtx.beginPath();
            particlesCtx.strokeStyle = "rgba(255, 255, 255, 0.1)";
            particlesCtx.lineWidth = 1;
            particlesCtx.moveTo(particlesArray[i].x, particlesArray[i].y);
            particlesCtx.lineTo(particlesArray[j].x, particlesArray[j].y);
            particlesCtx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    }

    function resizeCanvas() {
      if (particlesCanvas) {
        particlesCanvas.width = window.innerWidth;
        particlesCanvas.height = window.innerHeight;
        initParticles();
      }
    }

    resizeCanvas();
    animate();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  const SectionHeading = ({ title }: { title: string }) => {
    const [hasEntered, setHasEntered] = useState(false);

    return (
      <motion.h2
        className="text-4xl sm:text-5xl font-extrabold tracking-tight text-center mb-12 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 40 }}
        animate={hasEntered ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        onViewportEnter={() => setHasEntered(true)}
      >
        &lt; {title} /&gt;
      </motion.h2>
    );
  };

  return (
    <div className="dark bg-background text-foreground bg-parallax">
      

      <Head>
        <title>Yaksh Patel</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Yaksh Patel - Full Stack Developer Portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen px-4 sm:px-8">
        {/* Navbar */}
        <motion.nav
  initial={{ opacity: 0, y: -10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  className="relative sticky top-0 z-50 w-full bg-background/80 backdrop-blur border-b border-border py-4"
>
  <div className="container mx-auto flex justify-between items-center px-4 sm:px-8">
    <h1 className="text-lg sm:text-xl font-bold tracking-tight">&lt; Yaksh /&gt;</h1>

    {/* Desktop Menu */}
    <ul className="hidden sm:flex gap-6 text-sm font-medium">
      {["Home", "Experience", "Skills", "Projects", "Contact"].map((item) => (
        <li key={item}>
          <a
            href={`#${item}`}
            className={`relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-primary after:transition-all hover:after:w-full ${
              activeSection === item ? "after:w-full text-primary" : "after:w-0"
            }`}
          >
            {item}
          </a>
        </li>
      ))}
    </ul>

    {/* Mobile Burger */}
    <div className="sm:hidden flex items-center">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="text-foreground focus:outline-none"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
  </div>

  {/* Mobile Dropdown Menu */}
  {/* Mobile Dropdown Menu */}
{isMenuOpen && (
  <motion.ul
  initial={{ opacity: 0, y: -10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
  className="sm:hidden absolute top-16 left-0 w-full z-50 backdrop-blur-md bg-white/10 border-t border-white/10 shadow-lg flex flex-col items-center gap-6 py-6"
>
  {["Home", "Experience", "Skills", "Projects", "Contact"].map((item) => (
    <li key={item}>
      <a
        href={`#${item}`}
        onClick={() => setIsMenuOpen(false)}
        className="text-lg font-semibold text-white hover:text-primary"
      >
        {item}
      </a>
    </li>
  ))}
</motion.ul>
)}

</motion.nav>



        {/* Hero */}
        <section
  id="Home"
  className="relative flex flex-col items-center justify-center text-center py-32 border-b border-border"
>
  <motion.h1
    className="text-5xl sm:text-6xl font-extrabold leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-4"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
  >
    &lt; Yaksh /&gt;
  </motion.h1>

  <motion.p
    className="max-w-2xl text-lg sm:text-xl text-muted-foreground mb-8 px-4"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4, duration: 0.8 }}
  >
    Full-Stack Developer with a backend brain and a product-driven heart. I build fast, intelligent tools that simplify lives — from robust APIs to delightful user experiences.
  </motion.p>

  <motion.div
    className="flex flex-col sm:flex-row items-center justify-center gap-4"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.6, duration: 0.6 }}
  >
    <Link href="mailto:yakshp008@gmail.com">
      <Button size="lg">Connect</Button>
    </Link>
    <Link href="/Assets/Engineer_Yaksh.pdf" target="_blank">
      <Button variant="outline" size="lg">
        Resume
      </Button>
    </Link>
  </motion.div>

  {/* Scroll Cue */}
  <motion.div
    className="mt-20 text-muted-foreground animate-bounce"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1.2 }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="mx-auto"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
    <p className="text-xs mt-1">Scroll</p>
  </motion.div>
</section>



        {/* Experience */}
        <section id="Experience" className="py-24 border-b border-border text-center">
  <SectionHeading title="Experience" />

  <div className="relative max-w-3xl mx-auto before:absolute before:top-0 before:left-1/2 before:-ml-[1px] before:h-full before:w-[2px] before:bg-border before:transition-all before:duration-500 before:hover:bg-primary/60">
    {[
      {
        role: "Software Engineer",
        company: "Fuel AI",
        highlights: [
          "Replaced 24-hour batch sync with real-time webhooks (33K+ events/day)",
          "Built retry-safe APIs with exponential backoff for Firebase failures",
          "Integrated client-facing panel bot with ExpressJS & Firebase",
          "Deployed infra on GCP Cloud Run & App Engine for high availability",
          "Refactored automation scripts to boost reliability & team efficiency",
        ],
      },
      {
        role: "Volunteer Full Stack Engineer",
        company: "Nutriverse AI",
        highlights: [
          "Built AI nutrition assistant (React, Flask, Firebase, Hugging Face) with GPT models",
          "Integrated OpenAI GPT for NLP-based user interactions and Firebase for structured data storage",
          "Built Google Places API integration to suggest nearby food locations",
          "Developed modular components for scalability",
        ],
      },
      {
        role: "Backend Software Engineer Intern",
        company: "Interlude",
        highlights: [
          "Built backend for a music education app using Dart/Flutter, Firebase, and Docker",
          "Developed secure APIs with CORS and auth for frontend integration",
          "Enhanced API performance and reliability through optimizations and testing using Postman",
        ],
      },
    ].map((exp, idx) => (
      <motion.div
        key={exp.role + exp.company}
        initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: idx * 0.2, duration: 0.6 }}
        viewport={{ once: true }}
        className={`relative mb-16 text-left sm:pl-12 pl-6 ${
          idx % 2 === 0 ? "origin-left" : "origin-right"
        }`}
      >
        {/* Dot */}
        <div className="absolute left-[calc(50%-9px)] top-1 w-4 h-4 bg-primary rounded-full border-2 border-background z-10" />

        {/* Card with ripple and hover lift */}
        <motion.div
  whileHover={{
    scale: 1.03,
    boxShadow: "0px 10px 30px rgba(0,0,0,0.25)",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
  }}
  transition={{ type: "tween", duration: 0, ease: "easeInOut" }}
  className="relative overflow-hidden ml-4 bg-muted p-6 rounded-xl shadow-md border border-border transition-all group"
>

          {/* Ripple Pulse Animation */}
          <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-800">
            <div className="w-full h-full custom slow animation bg-white/10 rounded-xl"></div>
          </div>

          {/* Content */}
          <div className="relative z-10">
            <h3 className="font-bold text-lg text-primary">{exp.role}</h3>
            <p className="text-muted-foreground mb-4">{exp.company}</p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
              {exp.highlights.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </motion.div>
      </motion.div>
    ))}
  </div>
</section>



        {/* Skills */}
        <section id="Skills" className="py-24 border-b border-border text-center">
        <SectionHeading title="Skills" />

          
          <div className="max-w-4xl mx-auto px-4">
            <p className="text-muted-foreground mb-10 text-lg">
              Over the years, I’ve gained experience across the full stack — from building beautiful UIs to deploying scalable APIs.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                {
                  icon: <Code2 className="w-6 h-6 text-primary" />,
                  title: "Front-End Mastery",
                  desc: "Crafting clean, responsive, and engaging interfaces with React, Next.js, Tailwind, and more.",
                },
                {
                  icon: <Server className="w-6 h-6 text-primary" />,
                  title: "Back-End Wizardry",
                  desc: "Building scalable APIs and webhooks using Node.js, Express, Flask, and Firebase Functions.",
                },
                {
                  icon: <Database className="w-6 h-6 text-primary" />,
                  title: "Database Savvy",
                  desc: "Managing and designing performant schemas with MongoDB, Firestore, and SQL.",
                },
                {
                  icon: <Settings2 className="w-6 h-6 text-primary" />,
                  title: "DevOps & Infra",
                  desc: "Deploying with Docker, GCP, and CI/CD pipelines to keep things running smoothly.",
                },
              ].map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.2, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="group bg-muted border border-border rounded-xl p-6 shadow transition-all duration-300 hover:shadow-2xl hover:scale-[1.03] hover:bg-accent/10 backdrop-blur-md"
                >
                  <div className="mb-3 group-hover:scale-110 transition-transform duration-300 ease-in-out">
                    {item.icon}
                  </div>
                  <h4 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </h4>
                  <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="Projects" className="py-24 border-b border-border text-center">
        <SectionHeading title="Projects" />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Brainwave (AI Front-End)",
                description:
                  "Developed immersive 3D UI using ReactJS & TailwindCSS. Showcased interactive UX with modern AI-driven design.",
                img: "/Assets/brainwave.png",
                live: "https://f43wbe.web.app/",
                code: "https://github.com/Yaksh88/Brainwave",
              },
              {
                title: "Airbnb Clone",
                description:
                  "Multi-page responsive front-end with React, CSS Flexbox, React Router, and date picker.",
                img: "/Assets/airbnb.png",
                live: "https://airbnb-clone-b03f4.web.app/",
                code: "https://github.com/Yaksh88/Airbnb",
              },
              {
                title: "Resume Builder",
                description:
                  "Vanilla JS site that generates resumes based on user info. Inspired by real job-hunting needs.",
                img: "/Assets/resume.png",
                live: "https://yaksh88.github.io/Resume-Builder/",
                code: "https://github.com/Yaksh88/Resume-Builder",
              },
              {
                title: "Real Estate App",
                description:
                  "Full-Stack app with real-time chat, maps, auth. Tech: React, Express, MongoDB, JWT, Socket.io.",
                img: "/Assets/estate.png",
                live: "",
                code: "https://github.com/Yaksh88/Estate/tree/estate",
              },
              {
                title: "TravelX Immigration System",
                description:
                  "CRUD app built with React, Django, Vendia, AWS. Used for passenger record verification (SSN).",
                img: "/Assets/travelx.png",
                live: "",
                code: "",
                doc: "/Assets/Dino_Deliverable2.pdf",
              },
            ].map((proj, idx) => (
              <motion.div
                key={proj.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="group bg-muted border border-border rounded-xl p-4 shadow-md hover:shadow-xl transition-shadow duration-300 text-left hover:scale-[1.02]"
              >
                <div className="overflow-hidden rounded-md mb-4">
                  <Image
                    src={proj.img}
                    alt={proj.title}
                    width={500}
                    height={300}
                    className="rounded-md w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors duration-300">{proj.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 group-hover:text-foreground transition-colors duration-300">
                  {proj.description}
                </p>
                <div className="flex flex-wrap gap-3">
                  {proj.live && (
                    <Link href={proj.live} target="_blank">
                      <Button size="sm" variant="outline">
                        Visit
                      </Button>
                    </Link>
                  )}
                  {proj.code && (
                    <Link href={proj.code} target="_blank">
                      <Button size="sm">Code</Button>
                    </Link>
                  )}
                  {proj.doc && (
                    <Link href={proj.doc} target="_blank">
                      <Button size="sm" variant="secondary">
                        Documentation
                      </Button>
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="Contact" className="py-24 border-b border-border text-center bg-background">
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="max-w-2xl mx-auto px-4"
  >
    <SectionHeading title="Contact" />

    <p className="text-muted-foreground mb-6 text-lg">
      Got a project in mind or just want to chat about tech? Drop me a message and let’s make things happen!
    </p>

    <Link href="mailto:yakshp008@gmail.com">
      <Button size="lg" className="rounded-full">
        <Mail className="mr-2 h-5 w-5" /> Send
      </Button>
    </Link>
  </motion.div>
</section>
      
        </main>
          {/* Footer */}
          <footer className="bg-muted text-muted-foreground text-sm py-6 text-center">
          <p>
            © {new Date().getFullYear()} Yaksh Patel. Built with Next.js, TailwindCSS, and Shadcn UI.
          </p>
          
        </footer>
      
    </div>
  );
}
