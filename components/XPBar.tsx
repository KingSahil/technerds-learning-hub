"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

interface XPBarProps {
  level: number;
  xp: number;
  nextLevelXP: number;
}

export default function XPBar({ level, xp, nextLevelXP }: XPBarProps) {
  const progress = (xp / nextLevelXP) * 100;
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      controls.start({ width: `${progress}%` });
    }
  }, [isInView, controls, progress]);

  return (
    <div ref={ref} className="max-w-3xl mx-auto">
      <div className="flex justify-between mb-2 text-sm text-gray-400">
        <span>Level {level}</span>
        <span>
          {xp} / {nextLevelXP} XP
        </span>
      </div>
      <div className="w-full h-4 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={controls}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
        />
      </div>
    </div>
  );
}
