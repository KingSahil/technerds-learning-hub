"use client";

import { useParams, useRouter } from "next/navigation";
import learningData from "@/data/learningData";

export default function TopicsPage() {
    const { subject } = useParams();
    const router = useRouter();

    let topicList: { title: string; video: string }[] = [];
    for (const sem of Object.values(learningData)) {
        if (sem[decodeURIComponent(subject)]) {
            topicList = sem[decodeURIComponent(subject)];
            break;
        }
    }

    return (
        <main className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white flex flex-col items-center px-6 py-12">
            <h1 className="text-3xl font-bold mb-10">{decodeURIComponent(subject)}</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-4xl">
                {topicList.map((t, i) => (
                    <button
                        key={i}
                        onClick={() =>
                            router.push(`/learn/${encodeURIComponent(subject)}/${encodeURIComponent(t.title)}`)
                        }
                        className="py-6 px-8 rounded-2xl font-semibold text-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 transition duration-300 shadow-lg"
                    >
                        {t.title}
                    </button>
                ))}
            </div>

            <button
                onClick={() => router.back()}
                className="mt-12 text-gray-400 hover:text-white transition"
            >
                ← Back
            </button>
        </main>
    );
}
