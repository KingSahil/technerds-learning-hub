// app/api/quiz/route.ts
import { NextResponse } from "next/server";

const cache = new Map<string, any>();

function makeFallbackQuiz(topic: string) {
    const words = topic.split(/\s+/).filter(Boolean).slice(0, 4);
    return Array.from({ length: 4 }).map((_, i) => ({
        question: `Basic question ${i + 1} on "${topic}"`,
        options: [
            `A) ${words[0] ?? "Concept A"}`,
            `B) ${words[1] ?? "Concept B"}`,
            `C) ${words[2] ?? "Concept C"}`,
            `D) ${words[3] ?? "Concept D"}`,
        ],
        answer: "A",
    }));
}

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const topic = (searchParams.get("topic") || "").trim();

    if (!topic) {
        return NextResponse.json({ error: "Missing topic" }, { status: 400 });
    }

    // Return cached result if present
    if (cache.has(topic)) {
        return NextResponse.json({ quiz: cache.get(topic), cached: true });
    }

    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
        // No key available — return fallback immediately
        const fallback = makeFallbackQuiz(topic);
        cache.set(topic, fallback);
        return NextResponse.json({ quiz: fallback, source: "fallback", reason: "no_api_key" });
    }

    try {
        // Use the Gemini (Gemini 2.5 Pro) model via generateContent.
        // Model name: "gemini-2.5-pro" (or vendor-specific experimental name if your account uses it).
        const endpoint =
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${encodeURIComponent(apiKey)}`;

        const prompt = `Generate 4 multiple-choice quiz questions (A–D) about the topic "${topic}" for B.Tech CSE students.
Return ONLY valid JSON array in THIS format (no extra text or markdown):
[
  {"question":"...","options":["A) ...","B) ...","C) ...","D) ..."],"answer":"B"}
]`;

        const res = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                // request body shape is compatible with generateContent quickstart
                contents: [{ parts: [{ text: prompt }] }],
            }),
        });

        // If status not OK — return fallback and log details
        if (!res.ok) {
            const errText = await res.text().catch(() => "");
            console.error("Generative API non-OK:", res.status, res.statusText, errText.slice(0, 800));
            const fallback = makeFallbackQuiz(topic);
            cache.set(topic, fallback);
            return NextResponse.json({ quiz: fallback, source: "fallback", reason: `api_status_${res.status}` });
        }

        // Try to parse JSON response from Gemini
        const data = await res.json().catch(async (parseErr) => {
            const txt = await res.text();
            console.error("Generative API returned non-JSON:", txt.slice(0, 1000));
            return null;
        });

        if (!data) {
            const fallback = makeFallbackQuiz(topic);
            cache.set(topic, fallback);
            return NextResponse.json({ quiz: fallback, source: "fallback", reason: "non_json_response" });
        }

        // Gemini often nests the generated text under candidates/content/parts/...text
        const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "[]";

        // Remove code fences and trim
        const cleaned = rawText.replace(/```json|```/g, "").trim();

        let quiz;
        try {
            quiz = JSON.parse(cleaned);
            if (!Array.isArray(quiz) || quiz.length === 0) throw new Error("Invalid quiz format");
        } catch (parseErr) {
            console.warn("Failed to parse quiz JSON from Gemini:", parseErr, "raw:", cleaned.slice(0, 400));
            const fallback = makeFallbackQuiz(topic);
            cache.set(topic, fallback);
            return NextResponse.json({ quiz: fallback, source: "fallback", reason: "parse_failed" });
        }

        // success — cache and return
        cache.set(topic, quiz);
        return NextResponse.json({ quiz, source: "gemini" });
    } catch (err: any) {
        console.error("Quiz route unexpected error:", err?.message ?? err);
        const fallback = makeFallbackQuiz(topic);
        cache.set(topic, fallback);
        return NextResponse.json({ quiz: fallback, source: "fallback", reason: "exception" });
    }
}
