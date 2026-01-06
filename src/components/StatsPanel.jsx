import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState, useEffect } from 'react';

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

export function StatsPanel({ data }) {
  const [stats, setStats] = useState({
    totalYears: 0,
    totalMilestones: 0,
    categories: {},
    decades: {},
  });

  useEffect(() => {
    const categories = {};
    const decades = {};
    
    data.forEach(item => {
      categories[item.category] = (categories[item.category] || 0) + 1;
      decades[item.decade] = (decades[item.decade] || 0) + 1;
    });

    setStats({
      totalYears: 226,
      totalMilestones: data.length,
      categories,
      decades,
    });
  }, [data]);

  const categoryColors = {
    'Mechanical': 'from-amber-500 to-orange-500',
    'Hardware': 'from-blue-500 to-cyan-500',
    'Software': 'from-green-500 to-emerald-500',
    'Network': 'from-purple-500 to-pink-500',
    'AI': 'from-red-500 to-rose-500',
    'Platform': 'from-indigo-500 to-blue-500',
    'Storage': 'from-yellow-500 to-amber-500',
    'Theory': 'from-violet-500 to-purple-500',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative py-20 px-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
            Innovation Statistics
          </h2>
          <p className="text-gray-400">Analyzing 225+ years of technological breakthroughs</p>
        </motion.div>

        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div
            whileHover={{ scale: 1.05, rotateY: 5 }}
            className="relative bg-gradient-to-br from-purple-600/20 to-blue-600/20 backdrop-blur-sm border border-white/10 rounded-3xl p-8 overflow-hidden group"
            style={{ perspective: 1000 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-blue-600/20 group-hover:from-purple-600/20 transition-all duration-500" />
            <div className="relative z-10">
              <div className="text-6xl font-black bg-gradient-to-br from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {stats.totalYears}+
              </div>
              <div className="text-gray-300 mt-2 text-lg">Years of Innovation</div>
              <div className="text-sm text-gray-500 mt-1">Since 1800</div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, rotateY: 5 }}
            className="relative bg-gradient-to-br from-blue-600/20 to-cyan-600/20 backdrop-blur-sm border border-white/10 rounded-3xl p-8 overflow-hidden group"
            style={{ perspective: 1000 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-cyan-600/20 group-hover:from-blue-600/20 transition-all duration-500" />
            <div className="relative z-10">
              <div className="text-6xl font-black bg-gradient-to-br from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {stats.totalMilestones}
              </div>
              <div className="text-gray-300 mt-2 text-lg">Key Milestones</div>
              <div className="text-sm text-gray-500 mt-1">Major Breakthroughs</div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, rotateY: 5 }}
            className="relative bg-gradient-to-br from-pink-600/20 to-purple-600/20 backdrop-blur-sm border border-white/10 rounded-3xl p-8 overflow-hidden group"
            style={{ perspective: 1000 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-pink-600/0 to-purple-600/20 group-hover:from-pink-600/20 transition-all duration-500" />
            <div className="relative z-10">
              <div className="text-6xl font-black bg-gradient-to-br from-pink-400 to-purple-400 bg-clip-text text-transparent">
                {Object.keys(stats.categories).length}
              </div>
              <div className="text-gray-300 mt-2 text-lg">Categories</div>
              <div className="text-sm text-gray-500 mt-1">Different Fields</div>
            </div>
          </motion.div>
        </div>

        {/* Category Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8"
        >
          <h3 className="text-2xl font-bold text-white mb-6">
            Innovation by Category
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(stats.categories).map(([category, count], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative group"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${categoryColors[category] || 'from-gray-500 to-gray-600'} rounded-xl opacity-10 group-hover:opacity-20 transition-opacity blur-sm`} />
                <div className="relative bg-white/5 border border-white/10 rounded-xl p-4 group-hover:border-white/30 transition-all">
                  <div className="text-3xl font-bold text-white">{count}</div>
                  <div className="text-sm text-gray-400 mt-1">{category}</div>
                  <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(count / stats.totalMilestones) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                      className={`h-full bg-gradient-to-r ${categoryColors[category] || 'from-gray-500 to-gray-600'}`}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
