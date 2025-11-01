"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import XPBar from "@/components/XPBar";
import { useRouter } from "next/navigation";



export default function HomePage() {
  const router = useRouter();
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white scroll-smooth">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-800 backdrop-blur-md sticky top-0 z-50 bg-black/40">
        <h1 className="text-2xl font-bold text-indigo-400">Tech Nerds</h1>
        <div className="flex gap-6">
          <a href="#features" className="hover:text-indigo-400 transition">
            Features
          </a>
          <a href="#about" className="hover:text-indigo-400 transition">
            About
          </a>
          <a href="#login" className="hover:text-indigo-400 transition">
            Login
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="flex flex-col items-center text-center px-6 py-32"
      >
        <h2 className="text-5xl font-extrabold mb-6 leading-tight">
          Learn. Play. <span className="text-indigo-400">Level Up.</span>
        </h2>

        <p className="max-w-2xl text-gray-400 mb-8">
          Turn your learning journey into a quest! Earn XP, unlock badges, and
          compete with friends while mastering real skills.
        </p>

        <Button
          size="lg"
          onClick={() => router.push("/learn")} // 👈 navigate to new page
          className="bg-indigo-500 hover:bg-indigo-600 text-white text-lg px-6 py-3 rounded-xl flex items-center gap-2"
        >
          Start Learning <ArrowRight size={18} />
        </Button>

      </motion.section>

      {/* Features Section */}
      <section id="features" className="px-8 py-20 bg-gray-900/40">
        <motion.h3
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-12"
        >
          Gamify Your Growth
        </motion.h3>

        <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {[
            {
              title: "XP & Levels",
              desc: "Earn XP by completing tasks, quizzes, and projects.",
            },
            {
              title: "Achievements",
              desc: "Unlock badges and milestones as you progress.",
            },
            {
              title: "Leaderboards",
              desc: "Compete with friends and see who’s top of the class!",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: i * 0.2,
                ease: "easeOut",
              }}
              viewport={{ once: true, amount: 0.3 }}
              className="p-6 bg-gray-800/50 rounded-2xl text-center shadow-lg hover:shadow-indigo-500/10"
            >
              <h4 className="text-xl font-semibold mb-3 text-indigo-400">
                {feature.title}
              </h4>
              <p className="text-gray-400">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* XP Progress Section */}
      <motion.section
        id="xp-progress"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.3 }}
        className="py-24 px-6 text-center bg-gradient-to-b from-gray-950 to-gray-900"
      >
        <h3 className="text-4xl font-bold mb-6 text-indigo-400">
          Track Your Progress
        </h3>
        <p className="text-gray-400 max-w-2xl mx-auto mb-12">
          Every mission, quiz, and project earns you XP. Level up and show the world
          your progress!
        </p>

        <XPBar level={37} xp={740} nextLevelXP={1000} />
      </motion.section>


      {/* About Section */}
      <motion.section
        id="about"
        initial={{ opacity: 0, y: 70 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center py-24 px-6 max-w-3xl mx-auto"
      >
        <h3 className="text-4xl font-bold mb-6 text-indigo-400">
          Why Tech Nerds?
        </h3>
        <p className="text-gray-400 text-lg leading-relaxed">
          Tech Nerds transforms education into an adventure. Instead of passive
          learning, you complete missions, earn XP, and climb leaderboards —
          making growth as addictive as gaming.
        </p>
      </motion.section>

      {/* CTA */}
      <motion.section
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-center py-24 px-6"
      >
        <h3 className="text-4xl font-bold mb-6">Ready to Begin Your Quest?</h3>
        <p className="text-gray-400 mb-8">
          Join thousands of learners leveling up their skills every day.
        </p>
        <Button
          size="lg"
          className="bg-indigo-500 hover:bg-indigo-600 text-white text-lg px-6 py-3 rounded-xl"
        >
          Join Now
        </Button>
      </motion.section>

      

      {/* Footer */}
      <footer className="border-t border-gray-800 text-center py-6 text-gray-500 text-sm">
        © {new Date().getFullYear()} Tech Nerds — Made with ❤️ for learners.
      </footer>
    </main>
  );
}
