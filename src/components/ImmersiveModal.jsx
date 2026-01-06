
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect } from 'react';

export function ImmersiveModal({ item, onClose }) {
  useEffect(() => {
    if (item) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [item]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ backdropFilter: 'blur(0px)' }}
            animate={{ backdropFilter: 'blur(20px)' }}
            exit={{ backdropFilter: 'blur(0px)' }}
            className="absolute inset-0 bg-black/80"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.8, rotateX: -15, opacity: 0 }}
            animate={{ scale: 1, rotateX: 0, opacity: 1 }}
            exit={{ scale: 0.8, rotateX: 15, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative max-w-4xl w-full max-h-[90vh] overflow-hidden"
            style={{ perspective: 2000 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Glow Effect */}
            <div className={`absolute -inset-4 bg-gradient-to-r ${item.color} opacity-30 blur-3xl`} />

            {/* Card */}
            <div className={`relative bg-gradient-to-br ${item.color} bg-opacity-10 backdrop-blur-2xl border-2 border-white/20 rounded-3xl overflow-hidden`}>
              {/* Animated Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 100%'],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    repeatType: 'reverse',
                  }}
                  style={{
                    backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)',
                    backgroundSize: '200% 200%',
                  }}
                />
              </div>

              <div className="relative z-10 p-8 md:p-12 overflow-y-auto max-h-[90vh]">
                {/* Close Button */}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="absolute top-6 right-6 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white text-xl transition-colors"
                >
                  ✕
                </motion.button>

                {/* Header */}
                <div className="flex items-start gap-6 mb-8">
                  <motion.div
                    className="text-8xl"
                    animate={{
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                  >
                    {item.icon}
                  </motion.div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-4 py-1.5 rounded-full bg-gradient-to-r ${item.color} text-white text-sm font-semibold`}>
                        {item.decade}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-mono">
                        {item.year}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-white/10 text-purple-300 text-xs">
                        {item.category}
                      </span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-black mb-3 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                      {item.title}
                    </h2>

                    {item.inventor && (
                      <p className="text-xl text-purple-300 italic mb-4">
                        by {item.inventor}
                      </p>
                    )}

                    {/* Impact Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-white/20">
                      <motion.div
                        className="w-2 h-2 bg-green-500 rounded-full"
                        animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <span className="text-sm font-semibold text-white">
                        Impact: {item.impact}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8" />

                {/* Description */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                      <span className="text-purple-400">📖</span>
                      About This Innovation
                    </h3>
                    <p className="text-lg text-gray-200 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Historical Context */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
                  >
                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <span className="text-blue-400">⚡</span>
                      Historical Significance
                    </h4>
                    <p className="text-gray-300">
                      This breakthrough in {item.category.toLowerCase()} revolutionized the computing landscape 
                      during the {item.decade}, paving the way for future innovations and fundamentally 
                      changing how we interact with technology.
                    </p>
                  </motion.div>

                  {/* Fun Facts Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-white/10 rounded-xl p-4"
                    >
                      <div className="text-2xl mb-2">🎯</div>
                      <div className="text-sm text-gray-400 mb-1">Category</div>
                      <div className="text-white font-semibold">{item.category}</div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-white/10 rounded-xl p-4"
                    >
                      <div className="text-2xl mb-2">📅</div>
                      <div className="text-sm text-gray-400 mb-1">Era</div>
                      <div className="text-white font-semibold capitalize">{item.era} Computing</div>
                    </motion.div>
                  </div>

                  {/* Navigation Hint */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-center pt-4"
                  >
                    <p className="text-sm text-gray-400">
                      Click anywhere outside or press ESC to close
                    </p>
                  </motion.div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-500/20 to-transparent rounded-full blur-3xl" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
