import { useState, useMemo, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Hero } from "./components/Hero";
import { TimelineItem } from "./components/TimelineItem";
import { FilterControls } from "./components/FilterControls";
import { StatsPanel } from "./components/StatsPanel";
import { InteractiveParticles } from "./components/InteractiveParticles";
import { TimelineProgress } from "./components/TimelineProgress";
import { ImmersiveModal } from "./components/ImmersiveModal";
import { FloatingNav } from "./components/FloatingNav";
import { LoadingScreen } from "./components/LoadingScreen";

export default function App() {
  const [selectedEra, setSelectedEra] = useState("all");
  const [selectedItem, setSelectedItem] = useState(null);
  const [viewMode, setViewMode] = useState("timeline"); // 'timeline' or 'grid'
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const timelineData = [
    {
      decade: "1800s",
      year: 1801,
      title: "Jacquard Loom",
      inventor: "Joseph Marie Jacquard",
      description:
        "The Jacquard Loom introduced the concept of programmable machines using punched cards. This revolutionary invention allowed complex patterns to be woven automatically and is considered the first use of binary information in manufacturing.",
      impact: "Introduced the concept of programming through punched cards",
      icon: "🧵",
      era: "early",
      color: "from-amber-500 to-orange-500",
      category: "Mechanical",
    },
    {
      decade: "1820s",
      year: 1822,
      title: "Difference Engine",
      inventor: "Charles Babbage",
      description:
        "Charles Babbage designed the Difference Engine, an automatic mechanical calculator designed to tabulate polynomial functions. Though never completed in his lifetime, it represented the first attempt at creating a computing machine.",
      impact: "First mechanical computer design",
      icon: "⚙️",
      era: "early",
      color: "from-yellow-500 to-amber-500",
      category: "Mechanical",
    },
    {
      decade: "1840s",
      year: 1843,
      title: "First Computer Algorithm",
      inventor: "Ada Lovelace",
      description:
        "Ada Lovelace wrote the first algorithm intended for machine processing for Babbage's Analytical Engine, making her the world's first computer programmer. She envisioned computers could go beyond pure calculation.",
      impact: "First computer programmer in history",
      icon: "📝",
      era: "early",
      color: "from-pink-500 to-rose-500",
      category: "Software",
    },
    {
      decade: "1850s",
      year: 1854,
      title: "Boolean Algebra",
      inventor: "George Boole",
      description:
        "George Boole developed Boolean algebra, a branch of algebra in which the values of variables are true and false. This mathematical framework became fundamental to computer logic and digital circuit design.",
      impact: "Foundation of digital logic",
      icon: "🔢",
      era: "early",
      color: "from-blue-500 to-cyan-500",
      category: "Theory",
    },
    {
      decade: "1890s",
      year: 1890,
      title: "Hollerith Tabulating Machine",
      inventor: "Herman Hollerith",
      description:
        "Herman Hollerith created an electric tabulating machine using punched cards for the 1890 U.S. Census, reducing processing time from 8 years to 1 year. His company eventually became IBM.",
      impact: "Reduced census processing from 8 years to 1 year",
      icon: "📊",
      era: "early",
      color: "from-indigo-500 to-blue-500",
      category: "Hardware",
    },
    {
      decade: "1900s",
      year: 1906,
      title: "Vacuum Tube",
      inventor: "Lee De Forest",
      description:
        "The invention of the Audion vacuum tube enabled the amplification and switching of electrical signals, paving the way for electronic computing. This was crucial for first-generation computers.",
      impact: "Enabled electronic signal processing",
      icon: "💡",
      era: "mechanical",
      color: "from-orange-500 to-red-500",
      category: "Hardware",
    },
    {
      decade: "1930s",
      year: 1936,
      title: "Turing Machine",
      inventor: "Alan Turing",
      description:
        "Alan Turing introduced the concept of a theoretical computing machine that could perform any conceivable mathematical computation. The Turing Machine became the foundation of computer science theory.",
      impact: "Foundation of computer science theory",
      icon: "🎯",
      era: "mechanical",
      color: "from-purple-500 to-pink-500",
      category: "Theory",
    },
    {
      decade: "1940s",
      year: 1946,
      title: "ENIAC",
      inventor: "Presper Eckert & John Mauchly",
      description:
        "ENIAC (Electronic Numerical Integrator and Computer) was the first general-purpose electronic computer. It weighed 30 tons, used 18,000 vacuum tubes, and could perform 5,000 additions per second.",
      impact: "5,000 calculations per second - 30 tons",
      icon: "🖥️",
      era: "mechanical",
      color: "from-emerald-500 to-teal-500",
      category: "Hardware",
    },
    {
      decade: "1940s",
      year: 1947,
      title: "Transistor",
      inventor: "Bardeen, Brattain & Shockley",
      description:
        "The invention of the transistor at Bell Labs revolutionized electronics. Transistors were smaller, more reliable, and consumed less power than vacuum tubes, enabling the second generation of computers.",
      impact: "Replaced vacuum tubes - smaller & more efficient",
      icon: "🔌",
      era: "mechanical",
      color: "from-cyan-500 to-blue-500",
      category: "Hardware",
    },
    {
      decade: "1950s",
      year: 1951,
      title: "UNIVAC I",
      inventor: "Remington Rand",
      description:
        "UNIVAC I was the first commercial computer produced in the United States. It famously predicted Eisenhower's landslide victory in the 1952 presidential election, demonstrating computer capabilities to the public.",
      impact: "First commercial computer in USA",
      icon: "📺",
      era: "electronic",
      color: "from-violet-500 to-purple-500",
      category: "Hardware",
    },
    {
      decade: "1950s",
      year: 1956,
      title: "Hard Disk Drive",
      inventor: "IBM",
      description:
        "IBM introduced the first hard disk drive, the RAMAC 305, which could store 5MB of data on 50 24-inch disks. This innovation made random-access storage practical for computers.",
      impact: "First HDD - 5MB storage capacity",
      icon: "💾",
      era: "electronic",
      color: "from-blue-500 to-indigo-500",
      category: "Storage",
    },
    {
      decade: "1950s",
      year: 1958,
      title: "Integrated Circuit",
      inventor: "Jack Kilby & Robert Noyce",
      description:
        "The integrated circuit (microchip) allowed multiple transistors to be placed on a single chip, dramatically reducing size and cost while increasing reliability. This enabled the third generation of computers.",
      impact: "Multiple transistors on single chip",
      icon: "🔲",
      era: "electronic",
      color: "from-green-500 to-emerald-500",
      category: "Hardware",
    },
    {
      decade: "1960s",
      year: 1964,
      title: "IBM System/360",
      inventor: "IBM",
      description:
        "The IBM System/360 was a family of mainframe computers with compatible software across different models. This concept of a compatible family of computers transformed the industry.",
      impact: "First compatible computer family",
      icon: "🏢",
      era: "electronic",
      color: "from-teal-500 to-cyan-500",
      category: "Hardware",
    },
    {
      decade: "1960s",
      year: 1969,
      title: "ARPANET",
      inventor: "ARPA",
      description:
        "ARPANET, the precursor to the Internet, sent its first message between UCLA and Stanford. This network laid the foundation for modern Internet communications and networking protocols.",
      impact: "First packet-switched network - birth of Internet",
      icon: "🌐",
      era: "electronic",
      color: "from-sky-500 to-blue-500",
      category: "Network",
    },
    {
      decade: "1970s",
      year: 1971,
      title: "Microprocessor",
      inventor: "Intel (Ted Hoff)",
      description:
        "Intel's 4004 was the first commercially available microprocessor, containing 2,300 transistors. This single-chip CPU made personal computers possible and launched the fourth generation of computing.",
      impact: "2,300 transistors on single chip",
      icon: "🧠",
      era: "electronic",
      color: "from-indigo-500 to-violet-500",
      category: "Hardware",
    },
    {
      decade: "1970s",
      year: 1973,
      title: "Ethernet",
      inventor: "Robert Metcalfe",
      description:
        "Ethernet was developed at Xerox PARC as a local area network (LAN) technology. It became the dominant standard for connecting computers within buildings and campuses.",
      impact: "Standard for local area networks",
      icon: "🔗",
      era: "electronic",
      color: "from-purple-500 to-fuchsia-500",
      category: "Network",
    },
    {
      decade: "1970s",
      year: 1976,
      title: "Apple I",
      inventor: "Steve Wozniak & Steve Jobs",
      description:
        "The Apple I was one of the first personal computers sold as a fully assembled circuit board. It sparked the personal computer revolution and established Apple as a major technology company.",
      impact: "Sparked personal computer revolution",
      icon: "🍎",
      era: "personal",
      color: "from-red-500 to-pink-500",
      category: "Hardware",
    },
    {
      decade: "1980s",
      year: 1981,
      title: "IBM PC",
      inventor: "IBM",
      description:
        "The IBM Personal Computer became the industry standard for business computing. Its open architecture allowed other manufacturers to create compatible machines, establishing the PC platform.",
      impact: "Established PC standard",
      icon: "💼",
      era: "personal",
      color: "from-slate-500 to-gray-500",
      category: "Hardware",
    },
    {
      decade: "1980s",
      year: 1984,
      title: "Apple Macintosh",
      inventor: "Apple",
      description:
        "The Macintosh introduced the graphical user interface (GUI) to mainstream consumers with its point-and-click interface, making computers accessible to non-technical users.",
      impact: "Brought GUI to mainstream users",
      icon: "🖱️",
      era: "personal",
      color: "from-blue-500 to-purple-500",
      category: "Hardware",
    },
    {
      decade: "1980s",
      year: 1989,
      title: "World Wide Web",
      inventor: "Tim Berners-Lee",
      description:
        "Tim Berners-Lee invented the World Wide Web while working at CERN, creating HTTP, HTML, and the first web browser. This transformed the Internet into a global information system.",
      impact: "Created HTTP, HTML, and first web browser",
      icon: "🌍",
      era: "personal",
      color: "from-green-500 to-teal-500",
      category: "Network",
    },
    {
      decade: "1990s",
      year: 1991,
      title: "Linux Kernel",
      inventor: "Linus Torvalds",
      description:
        "Linus Torvalds released the Linux kernel, creating an open-source operating system that would power servers, smartphones, and supercomputers worldwide.",
      impact: "Powers billions of devices today",
      icon: "🐧",
      era: "personal",
      color: "from-yellow-500 to-orange-500",
      category: "Software",
    },
    {
      decade: "1990s",
      year: 1998,
      title: "Google Search",
      inventor: "Larry Page & Sergey Brin",
      description:
        "Google revolutionized web search with its PageRank algorithm, making the vast information on the Internet easily accessible and launching the modern search engine era.",
      impact: "Revolutionized information access",
      icon: "🔍",
      era: "personal",
      color: "from-blue-500 to-green-500",
      category: "Software",
    },
    {
      decade: "2000s",
      year: 2001,
      title: "Wikipedia",
      inventor: "Jimmy Wales & Larry Sanger",
      description:
        "Wikipedia launched as a free, collaborative online encyclopedia, demonstrating the power of crowdsourced knowledge and becoming one of the most visited websites globally.",
      impact: "60+ million articles in 300+ languages",
      icon: "📚",
      era: "modern",
      color: "from-gray-500 to-slate-500",
      category: "Platform",
    },
    {
      decade: "2000s",
      year: 2004,
      title: "Facebook",
      inventor: "Mark Zuckerberg",
      description:
        "Facebook launched from a Harvard dorm room, pioneering social networking at scale and fundamentally changing how people connect and communicate online.",
      impact: "3+ billion users worldwide",
      icon: "👥",
      era: "modern",
      color: "from-blue-500 to-indigo-500",
      category: "Platform",
    },
    {
      decade: "2000s",
      year: 2007,
      title: "iPhone",
      inventor: "Apple",
      description:
        "The iPhone combined a phone, iPod, and internet device with a revolutionary multi-touch interface, creating the smartphone category and mobile computing revolution.",
      impact: "Created smartphone revolution",
      icon: "📱",
      era: "modern",
      color: "from-purple-500 to-pink-500",
      category: "Hardware",
    },
    {
      decade: "2010s",
      year: 2010,
      title: "iPad",
      inventor: "Apple",
      description:
        "The iPad created the modern tablet computer category, bringing touch-based computing to a larger form factor and transforming education, healthcare, and entertainment.",
      impact: "Created modern tablet category",
      icon: "📲",
      era: "modern",
      color: "from-cyan-500 to-blue-500",
      category: "Hardware",
    },
    {
      decade: "2010s",
      year: 2012,
      title: "Deep Learning Revolution",
      inventor: "Geoffrey Hinton et al.",
      description:
        "Deep learning neural networks achieved breakthrough performance in image recognition (ImageNet competition), sparking the modern AI revolution in computer vision and machine learning.",
      impact: "Sparked modern AI revolution",
      icon: "🤖",
      era: "modern",
      color: "from-violet-500 to-purple-500",
      category: "AI",
    },
    {
      decade: "2010s",
      year: 2015,
      title: "Quantum Computing Advances",
      inventor: "Various Research Teams",
      description:
        "Major companies and research institutions made significant advances in quantum computing, with Google, IBM, and others building increasingly powerful quantum processors.",
      impact: "Quantum supremacy demonstrated",
      icon: "⚛️",
      era: "modern",
      color: "from-indigo-500 to-blue-500",
      category: "Hardware",
    },
    {
      decade: "2010s",
      year: 2017,
      title: "Transformer Architecture",
      inventor: "Google Research",
      description:
        'The "Attention Is All You Need" paper introduced the Transformer architecture, revolutionizing natural language processing and enabling modern AI models like GPT and BERT.',
      impact: "Foundation of modern AI language models",
      icon: "🔄",
      era: "modern",
      color: "from-pink-500 to-red-500",
      category: "AI",
    },
    {
      decade: "2020s",
      year: 2020,
      title: "GPT-3 & Large Language Models",
      inventor: "OpenAI",
      description:
        "GPT-3 demonstrated unprecedented natural language understanding and generation capabilities, showing that large language models could perform diverse tasks with minimal training.",
      impact: "175 billion parameters",
      icon: "💬",
      era: "modern",
      color: "from-green-500 to-emerald-500",
      category: "AI",
    },
    {
      decade: "2020s",
      year: 2022,
      title: "ChatGPT Launch",
      inventor: "OpenAI",
      description:
        "ChatGPT brought conversational AI to the mainstream, reaching 100 million users in two months and demonstrating practical applications of large language models for everyday tasks.",
      impact: "100M users in 2 months",
      icon: "💭",
      era: "modern",
      color: "from-teal-500 to-cyan-500",
      category: "AI",
    },
    {
      decade: "2020s",
      year: 2023,
      title: "Generative AI Explosion",
      inventor: "Multiple Companies",
      description:
        "Generative AI tools for images, video, code, and music became widely available, with technologies like DALL-E, Midjourney, and GitHub Copilot transforming creative and technical work.",
      impact: "Democratized AI creation tools",
      icon: "✨",
      era: "modern",
      color: "from-fuchsia-500 to-pink-500",
      category: "AI",
    },
  ];

  const filteredData = useMemo(() => {
    if (selectedEra === "all") return timelineData;
    return timelineData.filter((item) => item.era === selectedEra);
  }, [selectedEra]);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-black text-white overflow-x-hidden"
    >
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-950 via-black to-blue-950">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDEyNywgMCwgMjU1LCAwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
      </div>

      <InteractiveParticles />
      <TimelineProgress progress={scrollYProgress} />

      <div className="relative z-10">
        <Hero />
        <StatsPanel data={timelineData} />
        <FilterControls
          selectedEra={selectedEra}
          setSelectedEra={setSelectedEra}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {viewMode === "timeline" ? (
            <>
              {/* Central Timeline Line with Gradient */}
              <motion.div
                className="absolute left-1/2 top-0 bottom-0 w-1 transform -translate-x-1/2 overflow-hidden"
                style={{
                  background:
                    "linear-gradient(180deg, transparent, rgba(168, 85, 247, 0.5) 10%, rgba(59, 130, 246, 0.5) 50%, rgba(168, 85, 247, 0.5) 90%, transparent)",
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-b from-purple-500 to-blue-500"
                  style={{
                    scaleY: scrollYProgress,
                    transformOrigin: "top",
                  }}
                />
              </motion.div>

              {/* Timeline Items */}
              <div className="relative">
                {filteredData.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-20"
                  >
                    <p className="text-2xl text-gray-400">
                      No milestones found for this era.
                    </p>
                  </motion.div>
                ) : (
                  filteredData.map((item, index) => (
                    <TimelineItem
                      key={item.year}
                      item={item}
                      index={index}
                      isLeft={index % 2 === 0}
                      onClick={() => setSelectedItem(item)}
                    />
                  ))
                )}
              </div>
            </>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredData.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedItem(item)}
                  className={`cursor-pointer p-6 rounded-2xl bg-gradient-to-br ${item.color} bg-opacity-10 border border-white/10 hover:border-white/30 transition-all hover:scale-105`}
                >
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <div className="text-sm text-gray-400 mb-2">
                    {item.decade}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-400 mb-2">{item.inventor}</p>
                  <div className="text-xs text-purple-400 bg-purple-500/20 inline-block px-2 py-1 rounded">
                    {item.category}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Floating Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-32 pb-20"
          >
            <div className="inline-block relative">
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full opacity-50 blur-2xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.3, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              />
              <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 text-white px-12 py-8 rounded-3xl">
                <p className="text-3xl font-bold mb-2">
                  The Journey Continues...
                </p>
                <p className="text-lg opacity-90">
                  What innovations will shape tomorrow?
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Immersive Modal */}
      <ImmersiveModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />

      {/* Floating Navigation */}
      <FloatingNav />
    </div>
  );
}
