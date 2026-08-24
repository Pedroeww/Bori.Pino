import React, { useState, useEffect } from "react";
import { Search, ChefHat, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  onScrollToExplore: () => void;
  isShaking?: boolean;
  weatherMode?: "caribbean-sun" | "philippine-breeze";
}

export default function Hero({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  onScrollToExplore,
  isShaking = false,
  weatherMode = "caribbean-sun",
}: HeroProps) {
  const [activeIdx, setActiveIdx] = useState(0);

  const slides = [
    {
      image: "https://i.imgur.com/eoQbQWc.jpeg",
      title: "Lechon Rice Bowl",
      description: "Juicy slow-roasted pork shoulder with bubbly crispy skin over warm jasmine rice",
    },
    {
      image: "https://i.imgur.com/SxsIXtN.jpeg",
      title: "Pastelon Lasagna",
      description: "Layered sweet yellow plantains and savory seasoned ground beef picadillo",
    },
    {
      image: "https://i.imgur.com/58fLlWr.jpeg",
      title: "Crispy Golden Lumpia",
      description: "Traditional paper-thin golden fried spring rolls served with sweet chili dip",
    }
  ];

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(slideTimer);
  }, []);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev + 1) % slides.length);
  };

  const categories = ["All", "New Additions 🔥", "Mains", "Desserts", "Drinks", "Appetizers"];

  const isPR = weatherMode === "caribbean-sun";

  // Stagger animation definitions
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 110,
        damping: 14,
      },
    },
  };

  return (
    <div id="app-hero" className="relative z-10 bg-transparent overflow-hidden py-8 sm:py-24 border-b-2 border-brand-border">
      {/* Sun Ray backlights when Caribbean Sun is active */}
      {isPR && (
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl animate-sunpulse pointer-events-none" />
      )}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
          {/* Left Column: Typography & Search */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6"
          >
            <motion.div 
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-orange/10 text-brand-orange border border-brand-orange/20 text-[10px] sm:text-xs font-bold tracking-wide mb-3 sm:mb-6 ${isShaking ? "animate-shake" : ""} ${isPR ? "animate-borderGlowPR" : "animate-borderGlowPH"}`}
            >
              <ChefHat className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${isPR ? "text-[#C8102E]" : "text-[#0038A8]"}`} id="hero-chef-icon" />
              <span className={`font-black ${isPR ? "text-[#C8102E]" : "text-[#0038A8]"}`}>BoriPino Culinary Hub</span>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              id="hero-headline" 
              className={`text-2xl tracking-tighter font-black text-brand-dark sm:text-5xl md:text-6xl font-sans leading-none uppercase ${isShaking ? "animate-shake" : ""}`}
            >
              <span className="block"><span className="text-red-600">Bori</span>Pino</span>
              <span className={`block text-lg sm:text-4xl md:text-5xl font-extrabold tracking-tight mt-1 sm:mt-1.5 ${isPR ? "animate-textShinePR" : "animate-textShinePH"}`}>
                SABOS BORICUA x LASANG PINOY
              </span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              id="hero-subtext" 
              className="mt-2.5 sm:mt-4 text-xs sm:text-xl lg:text-lg xl:text-xl leading-relaxed font-semibold text-brand-dark/70"
            >
              Experience the ultimate fusion of rich Puerto Rican zest and savory Filipino soul food. 
              Discover beautifully hand-crafted, mouth-watering food showcases prepared with love, passion, and tradition.
            </motion.p>
 
            {/* Search Input Box */}
            <motion.div 
              variants={itemVariants}
              className="mt-4 sm:mt-8 sm:max-w-lg sm:mx-auto lg:mx-0"
            >
              <motion.div 
                whileHover={{ scale: 1.015 }}
                className={`relative rounded-xl sm:rounded-2xl shadow-sm bg-white border-2 border-brand-border focus-within:ring-2 focus-within:ring-brand-orange/25 focus-within:border-brand-orange transition-all p-0.5 sm:p-1 ${isPR ? "hover:border-[#C8102E]/60 focus-within:border-[#C8102E]" : "hover:border-[#0038A8]/60 focus-within:border-[#0038A8]"}`}
              >
                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 sm:h-5 sm:w-5 text-brand-dark/40" id="hero-search-icon" />
                </div>
                <input
                  id="recipe-search-input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Look up your fave food trip!"
                  className="block w-full pl-9 pr-24 sm:pl-11 sm:pr-32 py-2 sm:py-3.5 text-brand-dark bg-transparent placeholder-brand-dark/40 focus:outline-none text-xs sm:text-base font-semibold"
                />
                <motion.button
                  id="search-explore-btn"
                  onClick={onScrollToExplore}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`absolute right-1 top-1 bottom-1 px-3 sm:right-1.5 sm:top-1.5 sm:bottom-1.5 sm:px-5 text-white rounded-lg sm:rounded-xl text-[10px] sm:text-sm font-bold transition-all flex items-center gap-1 sm:gap-1.5 shadow-md cursor-pointer ${
                    isPR 
                      ? "bg-brand-orange hover:bg-brand-orange/95 shadow-brand-orange/25" 
                      : "bg-brand-teal hover:bg-brand-teal/95 shadow-brand-teal/25"
                  }`}
                >
                  <ChefHat className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Explore</span>
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Quick Category Filters */}
            <motion.div 
              variants={itemVariants}
              className="mt-4 sm:mt-8"
            >
              <p className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-brand-dark/40 mb-2 sm:mb-3 font-mono">Popular Categories</p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center lg:justify-start">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    id={`filter-${category.toLowerCase()}`}
                    onClick={() => {
                      setSelectedCategory(category);
                      onScrollToExplore();
                    }}
                    whileHover={{ y: -3, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-3.5 py-1.5 sm:px-5 sm:py-2 rounded-full text-[10px] sm:text-sm font-black transition-all cursor-pointer border-2 ${
                      selectedCategory === category
                        ? isPR
                          ? "bg-brand-orange border-brand-orange text-white shadow-md shadow-brand-orange/25"
                          : "bg-brand-teal border-brand-teal text-white shadow-md shadow-brand-teal/25"
                        : "bg-white text-brand-dark border-brand-border hover:bg-brand-border/40 hover:border-brand-dark/20"
                    }`}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Hero Visual Graphic */}
          <div className="mt-6 sm:mt-16 lg:mt-0 lg:col-span-6 relative flex justify-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, x: 40 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.3 }}
              className="relative mx-auto w-full max-w-lg lg:max-w-none rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl shadow-brand-dark/5 aspect-[4/3] bg-brand-dark select-none group"
            >
              <div className="w-full h-full overflow-hidden relative bg-black flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeIdx}
                    id="hero-banner-image"
                    src={slides[activeIdx].image}
                    alt={slides[activeIdx].title}
                    initial={{ opacity: 0.3, scale: 1.08, filter: "blur(4px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0.3, scale: 0.96, filter: "blur(4px)" }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="w-full h-full object-cover cursor-pointer absolute inset-0"
                    referrerPolicy="no-referrer"
                  />
                </AnimatePresence>

                {/* Left Arrow Button */}
                <button
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-brand-dark hover:text-brand-orange w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border border-brand-border shadow-md transition-all cursor-pointer opacity-0 group-hover:opacity-100 focus:opacity-100 select-none active:scale-90"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>

                {/* Right Arrow Button */}
                <button
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-brand-dark hover:text-brand-orange w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border border-brand-border shadow-md transition-all cursor-pointer opacity-0 group-hover:opacity-100 focus:opacity-100 select-none active:scale-90"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>

                {/* Slide Indicators / Dots */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 bg-brand-dark/55 px-2.5 py-1.5 rounded-full backdrop-blur-md">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveIdx(idx);
                      }}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        activeIdx === idx ? "bg-brand-orange w-4" : "bg-white/60 hover:bg-white w-1.5"
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Overlay shading to give it high prestige */}
              <div className="absolute inset-1 sm:inset-2 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none rounded-xl sm:rounded-2xl z-10" />
              
              {/* Floating Dynamic Slide Card */}
              <motion.div 
                key={activeIdx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-2xl border border-brand-border flex items-start gap-2.5 sm:gap-3 z-20"
              >
                <span className="text-xl sm:text-2xl mt-0.5">🍽️</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-[8px] sm:text-[9px] text-brand-orange font-black font-mono uppercase tracking-widest">
                      {activeIdx === 0 ? "CHEF'S FEATURE" : "DISH SHOWCASE"}
                    </p>
                    <span className="text-[9px] font-mono font-bold text-brand-dark/50 bg-brand-border/40 px-1.5 py-0.5 rounded-md">
                      {activeIdx + 1} / {slides.length}
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-base font-black text-brand-dark uppercase tracking-tight mt-0.5 truncate">
                    {slides[activeIdx].title}
                  </h4>
                  <p className="text-[10px] sm:text-xs text-brand-dark/80 mt-1 font-semibold leading-snug sm:leading-relaxed">
                    {slides[activeIdx].description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
