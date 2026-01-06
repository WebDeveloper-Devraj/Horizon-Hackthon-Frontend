import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useState, useEffect } from "react";

export function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dynamic Gradient Background */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(168, 85, 247, 0.3), transparent 50%)`,
        }}
      />

      {/* Animated Grid Lines */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`h-${i}`}
            className="absolute h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"
            style={{ top: `${i * 5}%`, width: "100%" }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scaleX: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.1,
            }}
          />
        ))}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`v-${i}`}
            className="absolute w-px bg-gradient-to-b from-transparent via-blue-500/20 to-transparent"
            style={{ left: `${i * 5}%`, height: "100%" }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scaleY: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.1,
            }}
          />
        ))}
      </div>

      {/* Floating Orbs */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full blur-3xl"
          style={{
            width: Math.random() * 300 + 100,
            height: Math.random() * 300 + 100,
            background: `radial-gradient(circle, ${
              i % 2 === 0
                ? "rgba(168, 85, 247, 0.3)"
                : "rgba(59, 130, 246, 0.3)"
            }, transparent)`,
          }}
          animate={{
            x: [Math.random() * 500 - 250, Math.random() * 500 - 250],
            y: [Math.random() * 500 - 250, Math.random() * 500 - 250],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Glitch Effect Title */}
          <motion.h1
            className="text-7xl md:text-9xl font-black mb-8 relative"
            animate={{
              textShadow: [
                "0 0 20px rgba(168, 85, 247, 0.5)",
                "0 0 40px rgba(59, 130, 246, 0.5)",
                "0 0 20px rgba(168, 85, 247, 0.5)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              TIMELINE
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              OF INNOVATION
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="space-y-4"
          >
            <p className="text-2xl md:text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400">
              The Evolution of Computer Technology
            </p>
            <p className="text-xl md:text-2xl text-purple-400 font-mono">
              [ 1800 → 2026 ]
            </p>
          </motion.div>

          {/* Interactive Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-12 grid grid-cols-3 gap-6 max-w-3xl mx-auto"
          >
            {[
              { value: "225+", label: "Years of Innovation" },
              { value: "32", label: "Key Milestones" },
              { value: "∞", label: "Future Possibilities" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
                whileHover={{
                  scale: 1.05,
                  borderColor: "rgba(168, 85, 247, 0.5)",
                }}
              >
                <div className="text-4xl font-bold bg-gradient-to-br from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400 mt-2">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-20"
          >
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="text-sm text-gray-400 uppercase tracking-wider font-mono">
                Scroll to Explore
              </div>
              <div className="w-8 h-12 border-2 border-purple-500/50 rounded-full flex justify-center p-2">
                <motion.div
                  className="w-1.5 h-3 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full"
                  animate={{ y: [0, 16, 0], opacity: [1, 0, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
              </div>
              <div className="flex gap-2">
                <motion.div
                  className="w-1 h-1 bg-purple-500 rounded-full"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ repeat: Infinity, duration: 1, delay: 0 }}
                />
                <motion.div
                  className="w-1 h-1 bg-blue-500 rounded-full"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                />
                <motion.div
                  className="w-1 h-1 bg-cyan-500 rounded-full"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
