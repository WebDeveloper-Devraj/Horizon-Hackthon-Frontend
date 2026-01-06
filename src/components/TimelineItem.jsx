import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import { useState } from "react";

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

export function TimelineItem({ item, index, isLeft, onClick }) {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        type: "spring",
        stiffness: 50,
      }}
      className={`flex items-center mb-20 ${
        isLeft ? "flex-row" : "flex-row-reverse"
      }`}
    >
      {/* Content Card */}
      <motion.div
        className={`w-5/12 ${isLeft ? "pr-12" : "pl-12"}`}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{ perspective: 1000 }}
      >
        <motion.div
          className={`relative group cursor-pointer`}
          style={{
            rotateX,
            rotateY,
          }}
          onClick={onClick}
        >
          {/* Glow Effect */}
          <motion.div
            className={`absolute -inset-2 bg-gradient-to-r ${item.color} rounded-3xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500`}
            animate={
              isHovered
                ? {
                    scale: [1, 1.1, 1],
                  }
                : {}
            }
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Card */}
          <div
            className={`relative bg-gradient-to-br ${item.color} bg-opacity-10 backdrop-blur-md border-2 border-white/10 rounded-3xl p-8 overflow-hidden group-hover:border-white/30 transition-all duration-300`}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10">
              {/* Header */}
              <div
                className={`flex items-center gap-4 mb-6 ${
                  isLeft ? "flex-row-reverse justify-end" : "justify-start"
                }`}
              >
                <motion.div
                  className={`text-6xl`}
                  animate={
                    isHovered
                      ? {
                          rotate: [0, 10, -10, 0],
                          scale: [1, 1.2, 1],
                        }
                      : {}
                  }
                  transition={{ duration: 0.5 }}
                >
                  {item.icon}
                </motion.div>
                <div className={isLeft ? "text-right" : "text-left"}>
                  <motion.div
                    className={`text-sm font-mono text-purple-400 bg-purple-500/20 px-3 py-1 rounded-full inline-block mb-2`}
                  >
                    {item.decade}
                  </motion.div>
                  <div className="text-xs text-gray-500 font-mono">
                    {item.year}
                  </div>
                </div>
              </div>

              {/* Title */}
              <h3
                className={`text-2xl font-bold mb-3 ${
                  isLeft ? "text-right" : "text-left"
                } bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent`}
              >
                {item.title}
              </h3>

              {/* Inventor */}
              <p
                className={`text-sm text-purple-300 mb-4 italic ${
                  isLeft ? "text-right" : "text-left"
                }`}
              >
                {item.inventor && `by ${item.inventor}`}
              </p>

              {/* Impact Badge */}
              <div className={`mb-4 ${isLeft ? "text-right" : "text-left"}`}>
                <span
                  className={`inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-gradient-to-r ${item.color} bg-opacity-20 border border-white/20`}
                >
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                  {item.impact}
                </span>
              </div>

              {/* Category */}
              <div
                className={`flex gap-2 mb-4 ${
                  isLeft ? "justify-end" : "justify-start"
                }`}
              >
                <span className="text-xs px-2 py-1 rounded bg-white/10 text-gray-400">
                  {item.category}
                </span>
              </div>

              {/* Description Preview */}
              <p
                className={`text-sm text-gray-400 line-clamp-2 ${
                  isLeft ? "text-right" : "text-left"
                }`}
              >
                {item.description}
              </p>

              {/* Click Indicator */}
              <motion.div
                className={`mt-4 text-xs font-mono text-purple-400 flex items-center gap-2 ${
                  isLeft ? "justify-end" : "justify-start"
                }`}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span>→ Click for full details</span>
              </motion.div>
            </div>

            {/* Hover Overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ pointerEvents: "none" }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Timeline Dot & Year */}
      <div className="w-2/12 flex flex-col items-center">
        <div className="relative">
          {/* Pulsing Rings */}
          <motion.div
            className={`absolute -inset-8 bg-gradient-to-r ${item.color} rounded-full opacity-20 blur-md`}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.2, 0, 0.2],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />

          {/* Dot */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
              type: "spring",
              stiffness: 200,
            }}
            className={`w-10 h-10 rounded-full border-4 border-black bg-gradient-to-br ${item.color} shadow-2xl relative z-10 flex items-center justify-center`}
          >
            <motion.div
              className="w-2 h-2 bg-white rounded-full"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          {/* Year Label */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.3 }}
            className="absolute top-full mt-4 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
          >
            <div className="text-xs font-mono text-gray-500 bg-black/50 px-2 py-1 rounded border border-white/10">
              {item.year}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Empty Space */}
      <div className="w-5/12" />
    </motion.div>
  );
}
