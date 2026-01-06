import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useState, useEffect } from "react";

import "../styles/custom-animations.css";
import "../styles/filter-controls.css";
import "../styles/floating-nav.css";
import "../styles/global.css";
import "../styles/hero.css";
import "../styles/index.css";
import "../styles/progress.css";
import "../styles/modal.css";
import "../styles/stats-panel.css"
import "../styles/theme.css";
import "../styles/timeline-item.css";

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
    <div className="hero-container">
      <motion.div
        className="hero-dynamic-bg"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(168, 85, 247, 0.3), transparent 50%)`,
        }}
      />

      <div className="hero-grid">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`h-${i}`}
            className="hero-grid-line"
            style={{ top: `${i * 5}%`, width: "100%", height: "1px" }}
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
            className="hero-grid-line-vertical"
            style={{ left: `${i * 5}%` }}
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

      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="hero-orb"
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

      <div className="hero-content">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            className="hero-title"
            animate={{
              textShadow: [
                "0 0 20px rgba(168, 85, 247, 0.5)",
                "0 0 40px rgba(59, 130, 246, 0.5)",
                "0 0 20px rgba(168, 85, 247, 0.5)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="hero-title-gradient-1">TIMELINE</span>
            <br />
            <span className="hero-title-gradient-2">OF INNOVATION</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <p className="hero-subtitle">
              The Evolution of Computer Technology
            </p>
            <p className="hero-year-range">[ 1800 → 2026 ]</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="hero-stats"
          >
            {[
              { value: "225+", label: "Years of Innovation" },
              { value: "32", label: "Key Milestones" },
              { value: "∞", label: "Future Possibilities" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="hero-stat-card"
                whileHover={{ scale: 1.05 }}
              >
                <div className="hero-stat-value">{stat.value}</div>
                <div className="hero-stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="hero-scroll-indicator"
          >
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <div className="hero-scroll-text">Scroll to Explore</div>
              <div className="hero-scroll-mouse">
                <motion.div
                  className="hero-scroll-wheel"
                  animate={{ y: [0, 16, 0], opacity: [1, 0, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
              </div>
              <div className="hero-scroll-dots">
                <motion.div
                  className="hero-scroll-dot"
                  style={{ background: "#a855f7" }}
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ repeat: Infinity, duration: 1, delay: 0 }}
                />
                <motion.div
                  className="hero-scroll-dot"
                  style={{ background: "#3b82f6" }}
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                />
                <motion.div
                  className="hero-scroll-dot"
                  style={{ background: "#22d3ee" }}
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
