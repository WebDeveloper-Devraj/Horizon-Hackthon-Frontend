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

export function FloatingNav() {
  const [isVisible, setIsVisible] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setShowMenu(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setShowMenu(false);
  };

  const scrollToSection = (position) => {
    window.scrollTo({
      top: position,
      behavior: "smooth",
    });
    setShowMenu(false);
  };

  const quickLinks = [
    { label: "Top", icon: "🏠", action: () => scrollToTop() },
    {
      label: "Stats",
      icon: "📊",
      action: () => scrollToSection(window.innerHeight),
    },
    {
      label: "Timeline",
      icon: "📍",
      action: () => scrollToSection(window.innerHeight * 1.5),
    },
    {
      label: "End",
      icon: "🎯",
      action: () =>
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        }),
    },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 180 }}
          className="fixed bottom-8 right-8 z-50"
        >
          {/* Quick Links Menu */}
          <AnimatePresence>
            {showMenu && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-20 right-0 bg-black/90 backdrop-blur-xl border border-white/20 rounded-2xl p-3 mb-2 shadow-2xl"
              >
                <div className="flex flex-col gap-2">
                  {quickLinks.map((link, index) => (
                    <motion.button
                      key={link.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={link.action}
                      className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all group"
                      whileHover={{ scale: 1.05, x: -5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="text-2xl group-hover:scale-110 transition-transform">
                        {link.icon}
                      </span>
                      <span className="text-sm font-medium text-white whitespace-nowrap">
                        {link.label}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Button */}
          <motion.button
            onClick={() => setShowMenu(!showMenu)}
            className="relative w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full shadow-2xl flex items-center justify-center group overflow-hidden"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {/* Animated Ring */}
            <motion.div
              className="absolute inset-0 border-2 border-white/30 rounded-full"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />

            {/* Icon */}
            <motion.div
              animate={{ rotate: showMenu ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-2xl"
            >
              {showMenu ? "✕" : "🚀"}
            </motion.div>

            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full opacity-0 group-hover:opacity-50 blur-xl transition-opacity" />
          </motion.button>

          {/* Tooltip */}
          {!showMenu && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="absolute right-20 top-1/2 transform -translate-y-1/2 bg-black/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/20 whitespace-nowrap pointer-events-none"
            >
              <span className="text-xs text-white">Quick Navigation</span>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
