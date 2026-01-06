import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useSpring,
} from "framer-motion";

import { useEffect } from "react";

export function TimelineProgress({ progress }) {
  const scaleX = useSpring(progress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      {/* Progress Bar */}
      <motion.div
        className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 origin-left shadow-lg shadow-purple-500/50"
        style={{ scaleX }}
      />

      {/* Percentage Indicator */}
      <motion.div
        className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 pointer-events-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
          <motion.span className="text-xs font-mono text-white">
            {progress.get() ? Math.round(progress.get() * 100) : 0}% explored
          </motion.span>
        </div>
      </motion.div>
    </div>
  );
}
