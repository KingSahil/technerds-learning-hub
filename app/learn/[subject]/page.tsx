"use client";

import { useParams, useRouter } from "next/navigation";
import learningData from "@/data/learningData";
import { motion } from "framer-motion";

export default function TopicListPage() {
    const params = useParams();
    const router = useRouter();

    // ✅ Safely extract subject param
    const rawSubject = Array.isArray(params.subject)
        ? params.subject[0]
        : params.subject ?? "";

    const subject = decodeURIComponent(rawSubject);

    // ✅ Find which semester this subject belongs to
    let topicList: { title: string; video: string }[] = [];
    let semester: string | null = null;

    for (const [semName, sem] of Object.entries(learningData)) {
        if (sem[subject]) {
            topicList = sem[subject];
            semester = semName;
            break;
        }
    }

    if (!semester) {
        return (
            <main className="min-h-screen flex items-center justify-center text-gray-400 bg-black">
                Subject not found 😢
            </main>
        );
    }

    return (
        <main className="relative min-h-screen bg-gradient-to-b from-black via-gray-950 to-gray-900 text-white overflow-hidden">
            {/* 🌈 Background Glows */}
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
                    <a href="/learn" className="hover:text-cyan-400 transition">
                        Learn
                    </a>
                    <a href="#login" className="hover:text-cyan-400 transition">
                        Login
                    </a>
                </div>
            </nav>

            {/* 📘 Subject Title */}
            <header className="text-center mt-16 mb-10">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400"
                >
                    {subject}
                </motion.h1>
                <p className="text-gray-400 mt-2">{semester}</p>
            </header>

            {/* 🧩 Topic Cards */}
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto px-6 pb-20">
                {topicList.map((topic, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        onClick={() =>
                            router.push(
                                `/learn/${encodeURIComponent(subject)}/${encodeURIComponent(
                                    topic.title
                                )}`
                            )
                        }
                        className="cursor-pointer p-6 rounded-2xl bg-gradient-to-br from-purple-600/20 via-indigo-500/10 to-cyan-500/20 border border-gray-800 backdrop-blur-md text-center font-semibold hover:shadow-[0_0_25px_-5px_rgba(147,51,234,0.5)] hover:scale-105 transition-all"
                    >
                        <h3 className="text-lg font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent mb-2">
                            {topic.title}
                        </h3>
                        <p className="text-gray-400 text-sm opacity-0 group-hover:opacity-100 transition">
                            Watch tutorial →
                        </p>
                    </motion.div>
                ))}
            </section>

            {/* 🔙 Back Button */}
            <div className="text-center mb-10">
                <button
                    onClick={() => router.back()}
                    className="text-gray-400 hover:text-cyan-400 transition text-sm"
                >
                    ← Back to Subjects
                </button>
            </div>

            {/* 🔻 Footer */}
            <footer className="border-t border-gray-800 text-center py-6 text-gray-500 text-sm">
                © {new Date().getFullYear()} Tech Nerds — Learn. Code. Level Up.
            </footer>
        </main>
    );
}
