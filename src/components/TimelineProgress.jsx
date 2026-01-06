import {
  motion,
  useSpring,
  useMotionValue,
  // TimelineProgress,
} from "framer-motion";

import "../styles/custom-animations.css";
import "../styles/filter-controls.css";
import "../styles/floating-nav.css";
import "../styles/global.css";
import "../styles/hero.css";
import "../styles/index.css";
import "../styles/progress.css";
import "../styles/modal.css";
import "../styles/stats-panel.css";
import "../styles/theme.css";
import "../styles/timeline-item.css";

export function TimelineProgress({ progress }) {
  const scaleX = useSpring(progress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="progress-container">
      <motion.div className="progress-bar" style={{ scaleX }} />

      <motion.div
        className="progress-indicator"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="progress-indicator-inner">
          <div className="progress-indicator-dot" />
          <motion.span className="progress-indicator-text">
            {progress.get() ? Math.round(progress.get() * 100) : 0}% explored
          </motion.span>
        </div>
      </motion.div>
    </div>
  );
}
