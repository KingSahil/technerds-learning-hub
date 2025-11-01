"use client";

import { useParams, useRouter } from "next/navigation";
import learningData from "@/data/learningData";
import { motion } from "framer-motion";

export default function TopicListPage() {
    const params = useParams();
    const router = useRouter();

    // Safely extract subject param
    const rawSubject = Array.isArray(params.subject)
        ? params.subject[0]
        : params.subject ?? "";

    const subject = decodeURIComponent(rawSubject);

    // Find which semester this subject belongs to
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
            <main className="min-h-screen flex items-center justify-center text-gray-400">
                Subject not found 😢
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white flex flex-col items-center px-6 py-12">
            <h1 className="text-3xl font-bold mb-8 text-indigo-400">{subject}</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-5xl">
                {topicList.map((topic, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        onClick={() =>
                            router.push(
                                `/learn/${encodeURIComponent(subject)}/${encodeURIComponent(topic.title)}`
                            )
                        }
                        className="cursor-pointer p-6 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-center font-medium hover:scale-105 transition-transform"
                    >
                        {topic.title}
                    </motion.div>
                ))}
            </div>

            <button
                onClick={() => router.back()}
                className="mt-10 text-gray-400 hover:text-white transition"
            >
                ← Back to Subjects
            </button>
        </main>
    );
}
