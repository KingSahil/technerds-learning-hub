"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import learningData from "@/data/learningData";

type QuizQuestion = {
    question: string;
    options: string[];
    answer?: string;
};

export default function TopicVideoPage() {
    const params = useParams();
    const router = useRouter();

    const rawSubject = Array.isArray(params.subject)
        ? params.subject[0]
        : params.subject ?? "";
    const rawTopic = Array.isArray(params.topic)
        ? params.topic[0]
        : params.topic ?? "";

    const subject = decodeURIComponent(rawSubject);
    const topicTitle = decodeURIComponent(rawTopic);

    let topicData: { title: string; video: string } | null = null;
    for (const sem of Object.values(learningData)) {
        if (sem[subject]) {
            const found = sem[subject].find((t) => t.title === topicTitle);
            if (found) topicData = found;
        }
    }

    const [videoId, setVideoId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
    const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
    const [score, setScore] = useState<number | null>(null);

    // 🎥 Fetch video
    useEffect(() => {
        const fetchVideo = async () => {
            if (topicData?.video && !topicData.video.includes("dQw4w9WgXcQ")) {
                setVideoId(topicData.video);
                setLoading(false);
                return;
            }
            try {
                const res = await fetch(`/api/youtube?q=${encodeURIComponent(`${subject} ${topicTitle}`)}`);
                const data = await res.json();
                if (data?.videoId) {
                    setVideoId(`https://www.youtube.com/embed/${data.videoId}`);
                }
            } catch (err) {
                console.error("YouTube fetch error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchVideo();
    }, [subject, topicTitle, topicData]);

    // 🧠 Fetch quiz dynamically
    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const res = await fetch(`/api/quiz?topic=${encodeURIComponent(topicTitle)}`);
                const data = await res.json();
                if (data?.quiz) setQuiz(data.quiz);
            } catch (err) {
                console.error("Quiz fetch error:", err);
            }
        };
        fetchQuiz();
    }, [topicTitle]);

    const calculateScore = () => {
        let correct = 0;
        quiz.forEach((q, i) => {
            const correctLetter = q.answer ?? "";
            const selected = selectedAnswers[i];
            const selectedLetter = selected !== undefined ? ["A", "B", "C", "D"][selected] : "";
            if (selectedLetter === correctLetter) correct++;
        });
        setScore(correct);
    };

    if (!topicData) {
        return (
            <main className="min-h-screen flex items-center justify-center text-gray-400 bg-black">
                Topic not found 😢
            </main>
        );
    }

    return (
        <main className="relative min-h-screen bg-gradient-to-b from-black via-gray-950 to-gray-900 text-white overflow-hidden">
            {/* Background glows */}
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

            {/* Navbar */}
            <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-800 backdrop-blur-md sticky top-0 z-50 bg-black/40">
                <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-500">
                    Tech Nerds
                </h1>
                <div className="flex gap-6">
                    <a href="/" className="hover:text-cyan-400 transition">Home</a>
                    <a href="/learn" className="hover:text-cyan-400 transition">Learn</a>
                    <a href="#login" className="hover:text-cyan-400 transition">Login</a>
                </div>
            </nav>

            {/* Video Section */}
            <section className="flex flex-col items-center justify-center w-full px-6 pt-16 pb-20">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-6 text-center"
                >
                    {topicData.title}
                </motion.h1>

                {loading ? (
                    <div className="text-gray-400 text-center mt-10">Loading video...</div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-[0_0_30px_-5px_rgba(168,85,247,0.4)] border border-gray-800"
                    >
                        {videoId ? (
                            <iframe
                                src={videoId}
                                title={topicData.title}
                                className="w-full h-full rounded-2xl"
                                allowFullScreen
                            />
                        ) : (
                            <div className="flex items-center justify-center w-full h-full text-gray-500">
                                No video found 😢
                            </div>
                        )}
                        <div className="absolute inset-0 rounded-2xl pointer-events-none bg-gradient-to-r from-purple-500/20 via-cyan-500/10 to-transparent blur-2xl" />
                    </motion.div>
                )}
            </section>

            {/* Quiz Section */}
            <section className="max-w-4xl mx-auto px-6 py-16 border-t border-gray-800">
                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400"
                >
                    Quick Quiz
                </motion.h2>

                {quiz.length === 0 ? (
                    <p className="text-gray-400">Generating quiz...</p>
                ) : (
                    quiz.map((q, i) => (
                        <div key={i} className="mb-8">
                            <h3 className="font-semibold mb-3">{q.question}</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {q.options.map((opt, j) => (
                                    <button
                                        key={j}
                                        onClick={() => setSelectedAnswers({ ...selectedAnswers, [i]: j })}
                                        className={`p-3 rounded-lg border transition ${selectedAnswers[i] === j
                                                ? "bg-gradient-to-r from-purple-600 to-cyan-600 text-white border-none"
                                                : "bg-gray-900 border-gray-700 hover:border-cyan-400"
                                            }`}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))
                )}

                {quiz.length > 0 && (
                    <button
                        onClick={calculateScore}
                        className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl text-white font-semibold hover:opacity-90 transition"
                    >
                        Submit Quiz
                    </button>
                )}

                {score !== null && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-4 text-lg text-cyan-400 font-semibold"
                    >
                        You scored {score}/{quiz.length} 🎯
                    </motion.p>
                )}
            </section>

            {/* Back Button */}
            <div className="text-center mb-10">
                <button
                    onClick={() => router.back()}
                    className="text-gray-400 hover:text-cyan-400 transition text-sm"
                >
                    ← Back to Topics
                </button>
            </div>

            {/* Footer */}
            <footer className="border-t border-gray-800 text-center py-6 text-gray-500 text-sm">
                © {new Date().getFullYear()} Tech Nerds — Learn. Code. Level Up.
            </footer>
        </main>
    );
}
