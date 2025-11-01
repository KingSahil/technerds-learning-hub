"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TopicVideoPage() {
    const { subject, topic } = useParams();
    const router = useRouter();
    const [videoId, setVideoId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const subjectName = decodeURIComponent(subject);
        const topicName = decodeURIComponent(topic);
        const cacheKey = `skillquest-video-${subjectName}-${topicName}`;

        async function fetchVideo() {
            try {
                const cached = localStorage.getItem(cacheKey);
                if (cached) {
                    const { videoId } = JSON.parse(cached);
                    if (videoId) {
                        setVideoId(videoId);
                        setLoading(false);
                        return;
                    }
                }

                const q = `${subjectName} ${topicName}`;
                const res = await fetch(`/api/youtube?q=${encodeURIComponent(q)}`);
                const data = await res.json();

                if (data.videoId) {
                    setVideoId(data.videoId);
                    localStorage.setItem(cacheKey, JSON.stringify({ videoId: data.videoId }));
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        }

        fetchVideo();
    }, [subject, topic]);

    return (
        <main className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white flex flex-col items-center px-6 py-12">
            <h1 className="text-3xl font-bold mb-8 text-center">
                {decodeURIComponent(topic)} — {decodeURIComponent(subject)}
            </h1>

            {loading ? (
                <p className="text-gray-400 animate-pulse">🔍 Finding the best tutorial...</p>
            ) : videoId ? (
                <div className="w-full max-w-3xl aspect-video">
                    <iframe
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title="Topic Video"
                        className="w-full h-full rounded-2xl shadow-lg"
                        allowFullScreen
                    />
                </div>
            ) : (
                <p className="text-gray-400">No relevant video found 😔</p>
            )}

            <button
                onClick={() => router.back()}
                className="mt-10 text-gray-400 hover:text-white transition"
            >
                ← Back to Topics
            </button>
        </main>
    );
}
