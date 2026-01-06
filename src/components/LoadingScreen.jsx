import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useEffect, useState } from "react";

export function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsComplete(true);
            setTimeout(() => onComplete(), 800);
          }, 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
        >
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-black to-blue-950">
            <motion.div
              className="absolute inset-0"
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              style={{
                backgroundImage:
                  "radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)",
                backgroundSize: "200% 200%",
              }}
            />
          </div>

          {/* Particle Effect */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-purple-500 rounded-full"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: -10,
                }}
                animate={{
                  y: window.innerHeight + 10,
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          {/* Main Content */}
          <div className="relative z-10 text-center px-6 max-w-2xl">
            {/* Logo/Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
              }}
              className="mb-8"
            >
              <div className="inline-block relative">
                <motion.div
                  className="text-8xl"
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  ⚡
                </motion.div>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full opacity-50 blur-2xl"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0.2, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-6xl font-black mb-4"
            >
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Loading Innovation
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl text-gray-400 mb-8"
            >
              Preparing 225 years of computer history...
            </motion.p>

            {/* Progress Bar */}
            <div className="max-w-md mx-auto">
              <div className="mb-3 flex justify-between items-center">
                <span className="text-sm text-gray-500 font-mono">Loading</span>
                <motion.span
                  key={Math.floor(progress)}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  className="text-sm font-bold text-purple-400 font-mono"
                >
                  {Math.floor(progress)}%
                </motion.span>
              </div>

              {/* Progress Bar Container */}
              <div className="h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full relative"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Shimmer Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{
                      x: ["-100%", "200%"],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </motion.div>
              </div>

              {/* Loading Text */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-6 text-xs text-gray-500 font-mono"
              >
                <motion.span
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  {progress < 30 && "Initializing timeline engine..."}
                  {progress >= 30 &&
                    progress < 60 &&
                    "Loading historical data..."}
                  {progress >= 60 && progress < 90 && "Preparing animations..."}
                  {progress >= 90 && "Almost ready!"}
                </motion.span>
              </motion.div>
            </div>

            {/* Feature Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="mt-12 flex flex-wrap justify-center gap-3"
            >
              {[
                "32 Milestones",
                "Interactive 3D",
                "Particle Effects",
                "Smooth Animations",
              ].map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: 1 + index * 0.1,
                    type: "spring",
                    stiffness: 200,
                  }}
                  className="px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-xs text-gray-400"
                >
                  ✓ {feature}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
