"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function HomePage() {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 🔮 Particle background effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: { x: number; y: number; vx: number; vy: number }[] = [];
    const numParticles = 80;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = Array.from({ length: numParticles }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      }));
    };

    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 4);
        gradient.addColorStop(0, "rgba(168, 85, 247, 0.9)"); // purple
        gradient.addColorStop(1, "rgba(34, 211, 238, 0.4)"); // cyan
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden text-white bg-black">
      {/* Canvas Neon Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-40"
      />

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-4 border-b border-purple-700/30 backdrop-blur-md bg-black/40 sticky top-0">
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          Tech Nerds
        </h1>
        <div className="flex gap-6 text-gray-300 text-sm md:text-base">
          <a href="#features" className="hover:text-cyan-400 transition">
            Features
          </a>
          <a href="#about" className="hover:text-cyan-400 transition">
            About
          </a>
          <a href="#login" className="hover:text-cyan-400 transition">
            Login
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative z-10 flex flex-col items-center text-center px-6 py-32"
      >
        <motion.h2
          className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Learn. Play. <br /> <span className="text-cyan-400">Level Up.</span>
        </motion.h2>

        <p className="max-w-2xl text-gray-400 mb-8">
          Your education reimagined — earn XP, climb ranks, and master real
          skills in a world where learning feels like gaming.
        </p>

        <motion.div whileHover={{ scale: 1.1 }}>
          <Button
            size="lg"
            onClick={() => router.push("/learn")}
            className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white text-lg px-8 py-4 rounded-2xl shadow-lg shadow-cyan-500/20"
          >
            Start Learning <ArrowRight size={18} className="ml-2" />
          </Button>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <section
        id="features"
        className="relative z-10 px-8 py-24 bg-gradient-to-b from-black/60 to-gray-950/80"
      >
        <motion.h3
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
        >
          Gamify Your Growth
        </motion.h3>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              title: "XP & Levels",
              desc: "Earn XP by completing challenges, quizzes, and real projects.",
            },
            {
              title: "Achievements",
              desc: "Unlock neon badges as you conquer new skills.",
            },
            {
              title: "Leaderboards",
              desc: "Battle for the top spot and showcase your learning streak.",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: i * 0.2,
                ease: "easeOut",
              }}
              viewport={{ once: true, amount: 0.3 }}
              className="p-6 bg-gradient-to-br from-gray-900/70 to-gray-800/40 rounded-2xl text-center shadow-lg border border-purple-700/30 hover:scale-105 transition-transform hover:shadow-purple-500/20"
            >
              <h4 className="text-xl font-semibold mb-3 text-cyan-400">
                {feature.title}
              </h4>
              <p className="text-gray-400">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <motion.section
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative z-10 text-center py-32 bg-gradient-to-t from-gray-950 to-black"
      >
        <h3 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          Ready to Begin Your Quest?
        </h3>
        <p className="text-gray-400 mb-8">
          Join thousands of learners leveling up every single day.
        </p>
        <Button
          size="lg"
          onClick={() => router.push("/learn")}
          className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white text-lg px-8 py-4 rounded-2xl shadow-xl shadow-purple-500/30"
        >
          Join Now
        </Button>
      </motion.section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-800 text-center py-6 text-gray-500 text-sm bg-black/70 backdrop-blur-md">
        © {new Date().getFullYear()} Tech Nerds — Made with 💜 + ⚡ for learners.
      </footer>
    </main>
  );
}
