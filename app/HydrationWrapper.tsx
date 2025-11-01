"use client";
import { useEffect, useState } from "react";

export default function HydrationWrapper({ children }: { children: React.ReactNode }) {
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        // Wait briefly for extensions like Dark Reader to modify DOM
        const timer = setTimeout(() => setHydrated(true), 50);
        return () => clearTimeout(timer);
    }, []);

    return hydrated ? (
        <>{children}</>
    ) : (
        <div className="flex h-screen items-center justify-center text-gray-400">
            Loading SkillQuest...
        </div>
    );
}
