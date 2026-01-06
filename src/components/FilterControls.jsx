import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";

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

export function FilterControls({
  selectedEra,
  setSelectedEra,
  viewMode,
  setViewMode,
}) {
  const eras = [
    {
      id: "all",
      label: "All Eras",
      years: "1800-2026",
      icon: "🌟",
      color: "from-purple-600 to-blue-600",
    },
    {
      id: "early",
      label: "Early Computing",
      years: "1800-1900",
      icon: "🕰️",
      color: "from-amber-600 to-orange-600",
    },
    {
      id: "mechanical",
      label: "Mechanical Era",
      years: "1900-1950",
      icon: "⚙️",
      color: "from-gray-600 to-slate-600",
    },
    {
      id: "electronic",
      label: "Electronic Era",
      years: "1950-1980",
      icon: "💡",
      color: "from-yellow-600 to-amber-600",
    },
    {
      id: "personal",
      label: "Personal Computing",
      years: "1980-2000",
      icon: "💻",
      color: "from-blue-600 to-cyan-600",
    },
    {
      id: "modern",
      label: "Modern Era",
      years: "2000-2026",
      icon: "🚀",
      color: "from-pink-600 to-purple-600",
    },
  ];

  return (
    <div className="sticky top-0 z-40 backdrop-blur-xl bg-black/70 border-b border-white/10 shadow-2xl">
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">
              Explore Timeline
            </h3>
            <p className="text-sm text-gray-400 font-mono">
              {selectedEra === "all"
                ? "Showing all 32 milestones"
                : `Filtered: ${eras.find((e) => e.id === selectedEra)?.label}`}
            </p>
          </div>

          {/* View Mode Toggle */}
          <div className="flex gap-2 bg-white/5 p-1.5 rounded-xl border border-white/10">
            <motion.button
              onClick={() => setViewMode("timeline")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                viewMode === "timeline"
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                  : "text-gray-400 hover:text-white"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center gap-2">📍 Timeline View</span>
            </motion.button>
            <motion.button
              onClick={() => setViewMode("grid")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                viewMode === "grid"
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                  : "text-gray-400 hover:text-white"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center gap-2">⊞ Grid View</span>
            </motion.button>
          </div>
        </div>

        {/* Era Filters */}
        <div className="flex flex-wrap gap-3">
          {eras.map((era, index) => {
            const isSelected = selectedEra === era.id;
            return (
              <motion.button
                key={era.id}
                onClick={() => setSelectedEra(era.id)}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`relative group overflow-hidden rounded-2xl transition-all ${
                  isSelected ? "ring-2 ring-white/30" : ""
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${era.color} ${
                    isSelected
                      ? "opacity-100"
                      : "opacity-50 group-hover:opacity-70"
                  } transition-opacity`}
                />

                {/* Shine Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={
                    isSelected
                      ? {
                          x: ["-100%", "100%"],
                        }
                      : {}
                  }
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 2,
                  }}
                />

                {/* Content */}
                <div className="relative px-5 py-3">
                  <div className="flex items-center gap-2.5 mb-1">
                    <span className="text-xl">{era.icon}</span>
                    <span className="font-semibold text-white text-sm">
                      {era.label}
                    </span>
                  </div>
                  <div className="text-xs text-white/80 font-mono">
                    {era.years}
                  </div>
                </div>

                {/* Selected Indicator */}
                {isSelected && (
                  <motion.div
                    layoutId="selected-era"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-white"
                    initial={false}
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 flex items-center gap-6 text-xs text-gray-400 font-mono"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>Interactive Experience</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <span>Click any milestone for details</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
            <span>Hover for 3D effects</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
