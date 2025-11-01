// app/api/youtube/route.ts
import { NextResponse } from "next/server";

// simple in-memory lifetime cache
const cache = new Map<string, { videoId: string; title: string }>();

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");

    if (!query) {
        return NextResponse.json({ error: "Missing query" }, { status: 400 });
    }

    // ✅ 1. Check server cache (forever)
    if (cache.has(query)) {
        return NextResponse.json({ ...cache.get(query), cached: true });
    }

    // ✅ 2. Otherwise fetch from YouTube API
    const apiKey = process.env.YOUTUBE_API_KEY;
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=1&q=${encodeURIComponent(
        query
    )}+tutorial&key=${apiKey}`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        if (!data.items || data.items.length === 0) {
            return NextResponse.json({ error: "No videos found" }, { status: 404 });
        }

        const videoId = data.items[0].id.videoId;
        const title = data.items[0].snippet.title;

        // ✅ 3. Save to cache (no expiry)
        cache.set(query, { videoId, title });

        return NextResponse.json({ videoId, title });
    } catch (err) {
        console.error("YouTube fetch error:", err);
        return NextResponse.json({ error: "Failed to fetch YouTube video" }, { status: 500 });
    }
}
