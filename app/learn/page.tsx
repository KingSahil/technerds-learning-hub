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
    const saved = localStorage.getItem("skillquest-semester");
    if (saved && learningData[saved]) setSemester(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("skillquest-semester", semester);
  }, [semester]);

  const subjects = Object.keys(learningData[semester]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white flex flex-col items-center px-6 py-10">
      <header className="w-full flex justify-between items-center max-w-5xl mb-10">
        <h1 className="text-2xl font-bold text-indigo-400">SkillQuest</h1>

        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 bg-gray-900 border border-gray-700 text-indigo-300 rounded-md px-4 py-2 focus:outline-none hover:bg-gray-800"
          >
            {semester} <ChevronDown size={18} />
          </button>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.ul
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 bg-gray-900 border border-gray-700 rounded-md shadow-lg w-48 z-10"
              >
                {Object.keys(learningData).map((sem) => (
                  <li
                    key={sem}
                    onClick={() => {
                      setSemester(sem);
                      setDropdownOpen(false);
                    }}
                    className="px-4 py-2 hover:bg-gray-800 cursor-pointer text-indigo-300"
                  >
                    {sem}
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </header>

      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-extrabold text-center mb-10 text-white"
      >
        {semester} — B.Tech CSE
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {subjects.map((subject, i) => (
          <motion.div
            key={subject}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => router.push(`/learn/${encodeURIComponent(subject)}`)}
            className="cursor-pointer p-8 rounded-2xl shadow-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-center font-semibold text-lg transform hover:scale-105 transition-all opacity-95 hover:opacity-100"
          >
            {subject}
          </motion.div>
        ))}
      </div>
    </main>
  );
}
