"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import learningData from "@/data/learningData";

export default function LearnPage() {
  const [semester, setSemester] = useState("Semester 1");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("technerds-semester");
    if (saved && learningData[saved]) setSemester(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("technerds-semester", semester);
  }, [semester]);

  const subjects = Object.keys(learningData[semester]);

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-black via-gray-950 to-gray-900 text-white overflow-hidden">
      {/* 🌈 Animated background glows */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-3xl"
          animate={{ y: [0, -30, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-3xl"
          animate={{ y: [0, 40, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* 🔝 Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-800 backdrop-blur-md sticky top-0 z-50 bg-black/40">
        <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-500">
          Tech Nerds
        </h1>
        <div className="flex gap-6">
          <a href="/" className="hover:text-cyan-400 transition">
            Home
          </a>
          <a href="#about" className="hover:text-cyan-400 transition">
            About
          </a>
          <a href="#login" className="hover:text-cyan-400 transition">
            Login
          </a>
        </div>
      </nav>

      {/* 📘 Header */}
      <header className="w-full flex justify-between items-center max-w-5xl mx-auto mt-10 mb-12 px-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
          {semester} — B.Tech CSE
        </h1>

        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 bg-gray-900 border border-gray-700 text-cyan-300 rounded-md px-4 py-2 focus:outline-none hover:bg-gray-800 transition-all"
          >
            {semester} <ChevronDown size={18} />
          </button>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.ul
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 bg-gray-900 border border-gray-700 rounded-md shadow-lg w-48 z-10 overflow-hidden"
              >
                {Object.keys(learningData).map((sem) => (
                  <li
                    key={sem}
                    onClick={() => {
                      setSemester(sem);
                      setDropdownOpen(false);
                    }}
                    className="px-4 py-2 hover:bg-gray-800 cursor-pointer text-cyan-300 transition"
                  >
                    {sem}
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* 🧠 Subjects Grid */}
      <section className="w-full max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {subjects.map((subject, i) => (
            <motion.div
              key={subject}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => router.push(`/learn/${encodeURIComponent(subject)}`)}
              className="group cursor-pointer p-8 rounded-2xl bg-gradient-to-br from-purple-600/20 via-indigo-500/10 to-cyan-500/20 border border-gray-800 backdrop-blur-md text-center font-semibold text-lg hover:shadow-[0_0_25px_-5px_rgba(147,51,234,0.5)] hover:scale-105 transition-all"
            >
              <motion.h3
                className="text-xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent mb-2"
                whileHover={{ scale: 1.05 }}
              >
                {subject}
              </motion.h3>
              <p className="text-gray-400 opacity-0 group-hover:opacity-100 text-sm transition">
                Tap to explore topics
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🔻 Footer */}
      <footer className="border-t border-gray-800 text-center py-6 text-gray-500 text-sm">
        © {new Date().getFullYear()} Tech Nerds — Learn. Code. Level Up.
      </footer>
    </main>
  );
}
