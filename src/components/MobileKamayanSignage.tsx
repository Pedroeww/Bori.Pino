import React, { useState } from "react";
import { 
  Sparkles, Calendar, Mail, Instagram, ArrowRight, 
  Utensils, Home, Users, ChevronDown, ChevronUp, MapPin, 
  Phone
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import kamayanFeastImg from "../assets/images/mobile_kamayan_feast_1790874869525.jpg";
import kamayanExpImg from "../assets/images/kamayan_experience_1790874886498.jpg";

interface MobileKamayanSignageProps {
  weatherMode?: "caribbean-sun" | "philippine-breeze";
  onInquireClick: () => void;
  isExpanded?: boolean;
  onToggle?: () => void;
}

export default function MobileKamayanSignage({
  weatherMode = "caribbean-sun",
  onInquireClick,
  isExpanded: isExpandedProp,
  onToggle
}: MobileKamayanSignageProps) {
  // Master toggle: starts toggled (collapsed) when visitor enters the website
  const [localExpanded, setLocalExpanded] = useState(false);
  const isControlled = typeof isExpandedProp === "boolean";
  const isExpanded = isControlled ? isExpandedProp : localExpanded;
  
  // Interactive view tabs inside the expanded pavilion
  const [activeTab, setActiveTab] = useState<"showcase" | "steps" | "menu">("showcase");
  
  // Interactive ripple/burst count on toggle
  const [toggleKey, setToggleKey] = useState(0);

  const handleToggle = () => {
    setToggleKey((prev) => prev + 1);
    if (onToggle) {
      onToggle();
    } else {
      setLocalExpanded((prev) => !prev);
    }
  };

  const emailSubject = encodeURIComponent("BoriPino Mobile Kamayan Service Inquiry");
  const emailBody = encodeURIComponent(
    `Hi BoriPino Team,\n\nI would love to inquire about bringing your Mobile Kamayan Services to our upcoming celebration!\n\nName:\nEstimated Date:\nLocation / City:\nEstimated Guest Count:\nOccasion:\nSpecial Requests / Dietary Needs:\n\nLooking forward to experiencing Kamayan together!`
  );
  const mailtoUrl = `mailto:bori.pinoo@gmail.com?subject=${emailSubject}&body=${emailBody}`;

  return (
    <section 
      id="mobile-kamayan-services" 
      className="relative scroll-mt-24 w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-amber-500/40 sm:border-2 bg-white shadow-xl sm:shadow-2xl transition-all duration-700 animate-kamayanNeon select-none"
    >
      {/* Top Multi-Flag Heritage Marquee Strip - 50% more compact on mobile */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#0038A8] via-[#C8102E] to-[#FFB81C] p-0.5 sm:p-1">
        {/* Shimmer sweep effect */}
        <div className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none animate-shineSweep" />

        <div className="bg-transparent text-white px-2.5 py-1 sm:px-4 sm:py-2 flex items-center justify-between gap-2 text-[9px] sm:text-xs relative z-10 drop-shadow-sm">
          <div className="flex items-center gap-1.5 sm:gap-2.5 font-mono overflow-hidden truncate">
            <span className="flex h-1.5 w-1.5 sm:h-2.5 sm:w-2.5 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2.5 sm:w-2.5 bg-emerald-500"></span>
            </span>
            <span className="font-black uppercase tracking-wider sm:tracking-widest text-emerald-300 text-[8px] sm:text-[11px] shrink-0">
              MOBILE SERVICE LIVE
            </span>
            <span className="text-white/30 hidden sm:inline">•</span>
            <span className="text-amber-200 font-bold hidden md:inline text-[11px] tracking-wide truncate">
              WE BRING THE TRADITIONAL BANANA LEAF FEAST STRAIGHT TO YOUR HOME
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0 font-bold text-[9px] sm:text-xs">
            <span className="text-amber-300">🇵🇭 Mabuhay! 🇵🇷 ¡Wepa!</span>
            <span className="hidden sm:inline-block bg-white/10 px-2 py-0.5 rounded text-[10px] font-mono text-white/80">
              #BoriPinoKamayan
            </span>
          </div>
        </div>
      </div>

      {/* Extravagant Signage Master Controller Bar - clickable anywhere to toggle/untoggle */}
      <div 
        onClick={handleToggle}
        className="bg-gradient-to-r from-[#FFFDF8] via-amber-50/70 to-[#FFFDF8] border-b border-amber-200/80 sm:border-b-2 p-2.5 sm:p-6 flex flex-row items-center justify-between gap-2 sm:gap-4 cursor-pointer hover:bg-amber-100/40 transition-colors"
      >
        {/* Signage Title Crest & Status */}
        <div 
          className="flex items-center gap-2 sm:gap-3.5 group text-left min-w-0 flex-1"
        >
          <motion.div 
            whileHover={{ scale: 1.1, rotate: [0, -8, 8, 0] }}
            whileTap={{ scale: 0.9 }}
            className={`w-7 h-7 sm:w-14 sm:h-14 rounded-lg sm:rounded-2xl flex items-center justify-center text-sm sm:text-3xl shadow-sm sm:shadow-lg border sm:border-2 transition-all duration-500 shrink-0 ${
              isExpanded 
                ? "bg-gradient-to-tr from-emerald-600 to-amber-500 text-white border-emerald-400 shadow-emerald-500/25" 
                : "bg-gradient-to-tr from-amber-500 to-[#C8102E] text-white border-amber-400 shadow-amber-500/25 animate-pulse"
            }`}
          >
            <span className="animate-leafSway">🌿</span>
          </motion.div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="inline-block px-1.5 py-0.2 sm:px-2.5 sm:py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-800 text-[7px] sm:text-[10px] font-black uppercase tracking-wider font-mono">
                {isExpanded ? "✨ Untoggled (Open Pavilion)" : "⚡ Toggled (Tap to Untoggle)"}
              </span>
              <span className="text-[9px] font-mono font-bold text-brand-dark/40 uppercase hidden sm:inline">
                Tap anywhere to {isExpanded ? "toggle closed" : "untoggle & open"}
              </span>
            </div>

            <h2 className="text-xs sm:text-2xl font-black text-brand-dark tracking-tight uppercase font-sans leading-tight mt-0.5 group-hover:text-[#C8102E] transition-colors flex items-center gap-1 sm:gap-2 truncate">
              <span>Mobile Kamayan</span>
              <span className="text-[#C8102E]">Services</span>
              <motion.span 
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="inline-block text-amber-600 text-[10px] sm:text-base shrink-0"
              >
                ▼
              </motion.span>
            </h2>

            <p className="text-[9px] sm:text-xs font-semibold text-brand-dark/70 hidden sm:block truncate">
              {isExpanded 
                ? "Full in-home culinary feast showcase, tradition story, and booking guide" 
                : "Toggled: Tap here to untoggle the personalized banana leaf dining experience we bring to you!"}
            </p>
          </div>
        </div>

        {/* The 3D Toggle Switch Button - 50% more compact on mobile */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          <motion.button
            id="kamayan-master-toggle-btn"
            key={toggleKey}
            onClick={(e) => {
              e.stopPropagation();
              handleToggle();
            }}
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.94 }}
            className={`relative overflow-hidden px-2.5 py-1.5 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl font-black text-[9px] sm:text-xs uppercase tracking-wider transition-all duration-500 shadow-md sm:shadow-xl flex items-center gap-1.5 sm:gap-2.5 cursor-pointer border sm:border-2 ${
              isExpanded
                ? "bg-gradient-to-r from-slate-900 via-brand-dark to-slate-900 text-white border-amber-400/60 shadow-amber-500/20"
                : "bg-gradient-to-r from-emerald-600 via-amber-600 to-[#C8102E] text-white border-white shadow-emerald-500/40"
            }`}
          >
            {/* Shimmer line inside toggle button */}
            <div className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none animate-shineSweep" />

            {/* Compact Switch Lever */}
            <div className={`w-7 h-3.5 sm:w-12 sm:h-6 rounded-full p-0.5 flex items-center transition-colors duration-300 ${
              isExpanded ? "bg-emerald-500 justify-end" : "bg-white/30 justify-start"
            }`}>
              <motion.div 
                layout
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="w-2.5 h-2.5 sm:w-5 sm:h-5 rounded-full bg-white shadow-sm flex items-center justify-center text-[7px] sm:text-[10px]"
              >
                {isExpanded ? "🌿" : "✨"}
              </motion.div>
            </div>

            <div className="text-left">
              <span className="block text-[7px] sm:text-[9px] font-mono font-bold text-amber-300 uppercase tracking-widest leading-none">
                {isExpanded ? "UNTOGGLED" : "TOGGLED"}
              </span>
              <span className="block text-[9px] sm:text-xs font-black tracking-tight leading-none mt-0.5">
                {isExpanded ? "TOGGLE ▲" : "UNTOGGLE ▼"}
              </span>
            </div>

            {/* Expanding Pulse Ring when collapsed */}
            {!isExpanded && (
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5 sm:h-3 sm:w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-amber-500"></span>
              </span>
            )}
          </motion.button>
        </div>
      </div>

      {/* COLLAPSED TEASER VIEW: 50% more compact on mobile */}
      {!isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0, y: -6 }}
          animate={{ opacity: 1, height: "auto", y: 0 }}
          exit={{ opacity: 0, height: 0, y: -6 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={handleToggle}
          className="p-2.5 sm:p-8 bg-gradient-to-r from-amber-50/90 via-white to-emerald-50/90 cursor-pointer group hover:bg-amber-100/50 transition-colors"
        >
          <div className="flex flex-row items-center justify-between gap-3 sm:gap-6">
            {/* Visual preview thumbnail + teaser message */}
            <div className="flex items-center gap-2.5 sm:gap-4 min-w-0 flex-1">
              <div className="relative w-12 h-12 sm:w-24 sm:h-24 rounded-lg sm:rounded-2xl overflow-hidden border border-amber-400 sm:border-2 shadow-sm shrink-0 group-hover:scale-105 transition-transform">
                <img 
                  src={kamayanFeastImg} 
                  alt="Kamayan Feast Teaser" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute bottom-0.5 left-1 text-[7px] sm:text-[9px] font-black uppercase text-amber-300 font-mono">
                  At Home
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="bg-emerald-600 text-white text-[7px] sm:text-[9px] font-mono font-black uppercase px-1.5 py-0.2 sm:px-2 sm:py-0.5 rounded-full">
                    Feast By Hand
                  </span>
                  <span className="text-[9px] sm:text-xs font-bold text-amber-700 truncate">🇵🇭 Mabuhay! 🇵🇷 ¡Wepa!</span>
                </div>
                <h3 className="text-xs sm:text-xl font-black text-brand-dark uppercase tracking-tight group-hover:text-[#C8102E] transition-colors truncate">
                  Personalized In-Home Feast
                </h3>
                <p className="text-[10px] sm:text-xs text-brand-dark/70 font-medium truncate">
                  BoriPino brings fresh banana leaves, garlic rice, adobo pernil, &amp; lechon to your table.
                </p>
              </div>
            </div>

            {/* Quick Unroll Trigger Pill */}
            <div className="flex items-center gap-2 shrink-0">
              <motion.div
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="px-2.5 py-1.5 sm:px-4 sm:py-2.5 rounded-lg sm:rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-black text-[9px] sm:text-xs uppercase tracking-wider shadow-sm flex items-center gap-1"
              >
                <span>Untoggle Feast</span>
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}

      {/* EXPANDED PAVILION VIEW: 50% more compact on mobile */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            key="kamayan-expanded-pavilion"
            initial={{ opacity: 0, height: 0, rotateX: -12, filter: "blur(8px)", scale: 0.96 }}
            animate={{ 
              opacity: 1, 
              height: "auto", 
              rotateX: 0, 
              filter: "blur(0px)", 
              scale: 1,
              transition: { 
                type: "spring", 
                damping: 20, 
                stiffness: 110, 
                mass: 0.9,
                when: "beforeChildren",
                staggerChildren: 0.06
              } 
            }}
            exit={{ 
              opacity: 0, 
              height: 0, 
              rotateX: 8, 
              filter: "blur(6px)", 
              scale: 0.97,
              transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } 
            }}
            style={{ perspective: 1200, transformOrigin: "top center" }}
            className="overflow-hidden"
          >
            {/* View Tab Switcher Buttons - 50% smaller padding and text on mobile */}
            <div className="bg-amber-100/50 border-b border-amber-200/60 px-2.5 py-2 sm:px-6 sm:py-3 flex flex-wrap items-center justify-between gap-1.5 sm:gap-3">
              <div className="flex items-center gap-1 sm:gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setActiveTab("showcase")}
                  className={`flex-1 sm:flex-initial px-2 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl text-[9px] sm:text-xs font-black uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-1 cursor-pointer ${
                    activeTab === "showcase"
                      ? "bg-brand-dark text-amber-300 shadow-sm sm:shadow-md"
                      : "bg-white/80 hover:bg-white text-brand-dark/70 hover:text-brand-dark"
                  }`}
                >
                  <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400" />
                  <span>Showcase</span>
                </button>

                <button
                  onClick={() => setActiveTab("steps")}
                  className={`flex-1 sm:flex-initial px-2 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl text-[9px] sm:text-xs font-black uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-1 cursor-pointer ${
                    activeTab === "steps"
                      ? "bg-brand-dark text-amber-300 shadow-sm sm:shadow-md"
                      : "bg-white/80 hover:bg-white text-brand-dark/70 hover:text-brand-dark"
                  }`}
                >
                  <Home className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400" />
                  <span>4 Steps</span>
                </button>

                <button
                  onClick={() => setActiveTab("menu")}
                  className={`flex-1 sm:flex-initial px-2 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl text-[9px] sm:text-xs font-black uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-1 cursor-pointer ${
                    activeTab === "menu"
                      ? "bg-brand-dark text-amber-300 shadow-sm sm:shadow-md"
                      : "bg-white/80 hover:bg-white text-brand-dark/70 hover:text-brand-dark"
                  }`}
                >
                  <Utensils className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#C8102E]" />
                  <span>Menu Spread</span>
                </button>
              </div>

              <div className="text-[9px] sm:text-[11px] font-mono font-bold text-amber-900/60 hidden md:block">
                COMMUNAL DINING AT HOME • EAT BY HAND
              </div>
            </div>

            {/* Main Stage Content - 50% more compact on mobile */}
            <div className="relative p-3 sm:p-10 lg:p-12 overflow-hidden bg-gradient-to-b from-[#FFFDF8] via-white to-[#FAF6EE]">
              {/* Sunburst background halo effect */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[700px] h-[350px] sm:h-[700px] bg-gradient-to-tr from-amber-400/10 via-rose-500/5 to-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

              {/* TAB 1: Grand Showcase & Cultural Philosophy */}
              {activeTab === "showcase" && (
                <motion.div
                  key="tab-showcase"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4 sm:space-y-10"
                >
                  <div className="text-center max-w-3xl mx-auto space-y-1.5 sm:space-y-3">
                    <div className="inline-flex items-center gap-1 sm:gap-2 px-2.5 py-0.5 sm:px-4 sm:py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-800 text-[8px] sm:text-xs font-black tracking-widest uppercase shadow-xs">
                      <Sparkles className="w-2.5 h-2.5 sm:w-4 sm:h-4 text-amber-600 animate-spin-slow" />
                      <span>On The Road Experience</span>
                      <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-amber-600" />
                      <span>We Come To You!</span>
                    </div>

                    <h3 className="text-base sm:text-4xl lg:text-5xl font-black text-brand-dark tracking-tight sm:tracking-tighter uppercase font-sans leading-tight sm:leading-none">
                      A Feast Centered On Community, Connection &amp; Sharing
                    </h3>

                    <p className="text-[11px] sm:text-base font-semibold text-brand-dark/75 max-w-2xl mx-auto leading-snug sm:leading-relaxed">
                      Experience the sacred communal art of eating by hand, celebrating where rich Puerto Rican zest fuses with deep Filipino soul food.
                    </p>
                  </div>

                  {/* Visual & Narrative Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 lg:gap-12 items-center">
                    {/* Left: Interactive Feast Photo Frame */}
                    <div className="lg:col-span-6 relative">
                      <motion.div 
                        whileHover={{ scale: 1.015 }}
                        transition={{ duration: 0.3 }}
                        className="relative rounded-xl sm:rounded-3xl overflow-hidden shadow-md sm:shadow-2xl border-2 sm:border-4 border-amber-900/15 group aspect-[16/9] max-h-48 sm:max-h-none bg-brand-dark"
                      >
                        <img
                          src={kamayanFeastImg}
                          alt="BoriPino Mobile Kamayan Feast Spread on Banana Leaves"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                        {/* Badges on image */}
                        <div className="absolute top-2 left-2 sm:top-4 sm:left-4 flex flex-wrap gap-1.5 sm:gap-2 z-10">
                          <span className="bg-emerald-600 text-white text-[8px] sm:text-[10px] font-black uppercase tracking-wider px-2 py-0.5 sm:px-3 sm:py-1 rounded-full shadow-sm flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                            Fresh Banana Leaves
                          </span>
                          <span className="bg-black/60 backdrop-blur-md text-amber-300 text-[8px] sm:text-[10px] font-black uppercase tracking-wider px-2 py-0.5 sm:px-3 sm:py-1 rounded-full border border-white/20">
                            At-Home Setup
                          </span>
                        </div>

                        {/* Bottom Overlay Information */}
                        <div className="absolute bottom-2 left-2.5 right-2.5 sm:bottom-4 sm:left-4 sm:right-4 text-white z-10">
                          <p className="text-[9px] sm:text-xs font-mono font-bold text-amber-300 uppercase tracking-wider">
                            COMMUNAL FEAST • EAT BY HAND
                          </p>
                          <h4 className="text-xs sm:text-2xl font-black uppercase tracking-tight mt-0.5">
                            BoriPino Kamayan Table
                          </h4>
                          <p className="text-[10px] sm:text-xs text-white/80 line-clamp-1 sm:line-clamp-2 mt-0.5">
                            Garlic jasmine rice, adobo pernil, crispy lechon, skewers, lumpia, &amp; sweet plantains.
                          </p>
                        </div>
                      </motion.div>

                      {/* Cultural Pill banner */}
                      <div className="mt-2.5 sm:mt-4 flex items-center justify-between p-2 sm:p-3.5 bg-amber-50 rounded-xl sm:rounded-2xl border border-amber-200 text-amber-950 text-[10px] sm:text-xs font-semibold">
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <span className="text-base sm:text-xl">🤲🏽</span>
                          <span><strong>Kamayan</strong> = <em>"By hand"</em> — Community &amp; sharing.</span>
                        </div>
                        <span className="font-mono text-[9px] sm:text-[11px] font-bold text-amber-800 bg-amber-200/60 px-1.5 py-0.5 rounded">
                          Heritage
                        </span>
                      </div>
                    </div>

                    {/* Right: Cultural Narrative & Booking */}
                    <div className="lg:col-span-6 space-y-3 sm:space-y-5">
                      <div className="bg-white rounded-xl sm:rounded-3xl border sm:border-2 border-brand-border p-3.5 sm:p-7 shadow-sm sm:shadow-md space-y-2.5 sm:space-y-4 relative overflow-hidden">
                        <div className="flex items-center gap-1.5 text-brand-orange">
                          <Sparkles className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-[#C8102E]" />
                          <h4 className="text-xs sm:text-lg font-black text-brand-dark uppercase tracking-tight">
                            Filipino Pride Straight to Your Table
                          </h4>
                        </div>

                        <blockquote className="space-y-1.5 sm:space-y-3 text-brand-dark/85 text-[10px] sm:text-sm leading-relaxed border-l-2 sm:border-l-4 border-[#C8102E] pl-2.5 sm:pl-4 py-0.5">
                          <p className="font-semibold text-brand-dark">
                            We’re taking BoriPino on the road and bringing the beauty, pride, and heart of Filipino culture straight to your table. ✨
                          </p>
                          <p className="font-medium">
                            <strong>Kamayan, meaning “by hand,” is more than a meal.</strong> It’s a Filipino tradition centered around community, connection, abundance, and sharing. A beautiful feast is laid out across the table, meant to be enjoyed together, with the people you love. 🤲🏽🍽️
                          </p>
                          <p className="font-medium">
                            Our new <strong>Mobile Kamayan Service</strong> brings people together, where cultures meet, and every bite tells a story.
                          </p>
                        </blockquote>

                        <div className="pt-1.5 sm:pt-3 flex flex-row items-center justify-between gap-1 border-t border-brand-border/60">
                          <div className="text-[10px] sm:text-sm font-black text-brand-dark uppercase tracking-tight">
                            Come gather. Come feast.
                          </div>
                          <div className="flex gap-1.5 text-[9px] sm:text-xs font-mono font-bold">
                            <span className="text-[#0038A8]">🇵🇭 Mabuhay!</span>
                            <span className="text-[#C8102E]">🇵🇷 ¡Wepa!</span>
                          </div>
                        </div>
                      </div>

                      {/* Booking Action Bar */}
                      <div className="p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-brand-dark via-slate-900 to-brand-dark text-white shadow-md sm:shadow-xl flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4 border border-amber-500/30">
                        <div className="text-center sm:text-left">
                          <div className="flex items-center justify-center sm:justify-start gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                            <span className="text-[9px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-400">
                              Officially Available
                            </span>
                          </div>
                          <p className="text-[10px] sm:text-sm font-bold text-white/90 mt-0.5">
                            Book Kamayan for your next celebration!
                          </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 w-full sm:w-auto justify-center sm:justify-end">
                          <button
                            onClick={onInquireClick}
                            className="px-3 py-1.5 sm:px-4 sm:py-2.5 rounded-lg sm:rounded-xl bg-gradient-to-r from-[#C8102E] to-amber-600 hover:from-red-700 hover:to-amber-700 text-white text-[9px] sm:text-xs font-black uppercase tracking-wider shadow-sm transition-all active:scale-95 flex items-center gap-1 cursor-pointer"
                          >
                            <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span>Request Quote</span>
                          </button>

                          <a
                            href={mailtoUrl}
                            className="px-2.5 py-1.5 sm:px-3.5 sm:py-2.5 rounded-lg sm:rounded-xl bg-white/10 hover:bg-white/20 text-white text-[9px] sm:text-xs font-bold uppercase tracking-wider border border-white/20 transition-all flex items-center gap-1 cursor-pointer"
                          >
                            <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-amber-300" />
                            <span>Email Us</span>
                          </a>

                          <a
                            href="https://www.instagram.com/bori.pino"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2.5 py-1.5 sm:px-3.5 sm:py-2.5 rounded-lg sm:rounded-xl bg-gradient-to-r from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white text-[9px] sm:text-xs font-bold uppercase tracking-wider shadow-sm transition-all flex items-center gap-1 cursor-pointer"
                          >
                            <Instagram className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span>DM Us</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 2: The 4 In-Home Steps - 50% smaller 2x2 grid on mobile */}
              {activeTab === "steps" && (
                <motion.div
                  key="tab-steps"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4 sm:space-y-8"
                >
                  <div className="text-center max-w-2xl mx-auto space-y-1 sm:space-y-2">
                    <span className="text-[9px] sm:text-xs font-mono font-bold uppercase tracking-widest text-brand-orange">
                      Effortless At-Home Process
                    </span>
                    <h3 className="text-base sm:text-4xl font-black text-brand-dark uppercase tracking-tight">
                      How BoriPino Sets Up Your Feast
                    </h3>
                    <p className="text-[10px] sm:text-sm text-brand-dark/70 font-medium">
                      Zero stress, zero cooking for you. We bring the culinary magic and authentic banana leaf setup directly to your table.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-5">
                    {/* Step 1 */}
                    <div className="p-2.5 sm:p-6 rounded-xl sm:rounded-2xl bg-white border sm:border-2 border-brand-border shadow-xs sm:shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-7 h-7 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-1.5 sm:mb-4 text-sm sm:text-xl font-black">
                        🏡
                      </div>
                      <span className="text-[7px] sm:text-[10px] font-mono font-black text-amber-700 uppercase tracking-wider">
                        Step 1 • Arrival
                      </span>
                      <h4 className="font-black text-[10px] sm:text-base uppercase text-brand-dark mt-0.5">We Come To You</h4>
                      <p className="text-[9px] sm:text-xs text-brand-dark/70 mt-1 leading-snug sm:leading-relaxed line-clamp-3 sm:line-clamp-none">
                        We travel directly to your home or venue with all fresh ingredients and tableware.
                      </p>
                    </div>

                    {/* Step 2 */}
                    <div className="p-2.5 sm:p-6 rounded-xl sm:rounded-2xl bg-white border sm:border-2 border-brand-border shadow-xs sm:shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-7 h-7 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-1.5 sm:mb-4 text-sm sm:text-xl font-black">
                        🌿
                      </div>
                      <span className="text-[7px] sm:text-[10px] font-mono font-black text-emerald-700 uppercase tracking-wider">
                        Step 2 • The Scape
                      </span>
                      <h4 className="font-black text-[10px] sm:text-base uppercase text-brand-dark mt-0.5">Banana Leaves</h4>
                      <p className="text-[9px] sm:text-xs text-brand-dark/70 mt-1 leading-snug sm:leading-relaxed line-clamp-3 sm:line-clamp-none">
                        We prepare and line your entire dining table with fragrant, steaming banana leaves.
                      </p>
                    </div>

                    {/* Step 3 */}
                    <div className="p-2.5 sm:p-6 rounded-xl sm:rounded-2xl bg-white border sm:border-2 border-brand-border shadow-xs sm:shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-7 h-7 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-[#0038A8]/10 text-[#0038A8] flex items-center justify-center mb-1.5 sm:mb-4 text-sm sm:text-xl font-black">
                        🍚
                      </div>
                      <span className="text-[7px] sm:text-[10px] font-mono font-black text-[#0038A8] uppercase tracking-wider">
                        Step 3 • Spread
                      </span>
                      <h4 className="font-black text-[10px] sm:text-base uppercase text-brand-dark mt-0.5">Mounds of Flavor</h4>
                      <p className="text-[9px] sm:text-xs text-brand-dark/70 mt-1 leading-snug sm:leading-relaxed line-clamp-3 sm:line-clamp-none">
                        Hot garlic rice is placed down the center with succulent pernil, crispy lechon, &amp; lumpia.
                      </p>
                    </div>

                    {/* Step 4 */}
                    <div className="p-2.5 sm:p-6 rounded-xl sm:rounded-2xl bg-white border sm:border-2 border-brand-border shadow-xs sm:shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-7 h-7 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-[#C8102E]/10 text-[#C8102E] flex items-center justify-center mb-1.5 sm:mb-4 text-sm sm:text-xl font-black">
                        🤲🏽
                      </div>
                      <span className="text-[7px] sm:text-[10px] font-mono font-black text-[#C8102E] uppercase tracking-wider">
                        Step 4 • Gather
                      </span>
                      <h4 className="font-black text-[10px] sm:text-base uppercase text-brand-dark mt-0.5">Eat By Hand</h4>
                      <p className="text-[9px] sm:text-xs text-brand-dark/70 mt-1 leading-snug sm:leading-relaxed line-clamp-3 sm:line-clamp-none">
                        Gather with loved ones and experience unforgettable Filipino communal dining!
                      </p>
                    </div>
                  </div>

                  <div className="text-center pt-1">
                    <button
                      onClick={onInquireClick}
                      className="px-4 py-2 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-emerald-600 via-amber-600 to-[#C8102E] text-white font-black text-[10px] sm:text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer"
                    >
                      Inquire for Your Date &rarr;
                    </button>
                  </div>
                </motion.div>
              )}

              {/* TAB 3: Banana Leaf Menu Spread - 50% more compact on mobile */}
              {activeTab === "menu" && (
                <motion.div
                  key="tab-menu"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4 sm:space-y-8"
                >
                  <div className="p-3 sm:p-8 rounded-xl sm:rounded-3xl bg-amber-50/80 border sm:border-2 border-amber-200/80 shadow-inner grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-8 items-center">
                    <div className="lg:col-span-5 rounded-lg sm:rounded-2xl overflow-hidden border border-amber-300 shadow-sm sm:shadow-md aspect-[16/9] sm:aspect-[4/3] max-h-36 sm:max-h-none relative">
                      <img 
                        src={kamayanExpImg} 
                        alt="Kamayan dining in action" 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-2 left-2 right-2 text-white text-[9px] sm:text-xs font-semibold">
                        🤲🏽 Eating by hand connects everyone at the table.
                      </div>
                    </div>

                    <div className="lg:col-span-7 space-y-2.5 sm:space-y-4">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[8px] sm:text-xs font-mono font-bold text-amber-800 uppercase tracking-wider bg-amber-200/70 px-2 py-0.5 rounded-full">
                          Authentic Sample Spread
                        </span>
                      </div>

                      <h4 className="text-xs sm:text-2xl font-black text-amber-950 uppercase tracking-tight">
                        What's Included on the Banana Leaves?
                      </h4>
                      <p className="text-[10px] sm:text-sm text-amber-900/80 leading-snug sm:leading-relaxed font-medium">
                        Every BoriPino Mobile Kamayan feast blends Filipino soul favorites with Puerto Rican zest:
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-3 text-[9px] sm:text-xs">
                        <div className="p-2 sm:p-3 bg-white/95 rounded-lg sm:rounded-xl border border-amber-200 shadow-xs">
                          <span className="font-black text-amber-900 block uppercase">🍚 Garlic Jasmine Rice</span>
                          <span className="text-amber-800/80 text-[8px] sm:text-[11px]">Steaming aromatic garlic rice down the center.</span>
                        </div>
                        <div className="p-2 sm:p-3 bg-white/95 rounded-lg sm:rounded-xl border border-amber-200 shadow-xs">
                          <span className="font-black text-amber-900 block uppercase">🍖 Adobo Pernil &amp; Lechon</span>
                          <span className="text-amber-800/80 text-[8px] sm:text-[11px]">Slow-roasted seasoned pork with crackling skin.</span>
                        </div>
                        <div className="p-2 sm:p-3 bg-white/95 rounded-lg sm:rounded-xl border border-amber-200 shadow-xs">
                          <span className="font-black text-amber-900 block uppercase">🍢 Inasal Skewers &amp; Lumpia</span>
                          <span className="text-amber-800/80 text-[8px] sm:text-[11px]">Charred skewers &amp; golden crispy pork spring rolls.</span>
                        </div>
                        <div className="p-2 sm:p-3 bg-white/95 rounded-xl border border-amber-200 shadow-xs">
                          <span className="font-black text-amber-900 block uppercase">🍌 Sweet Maduros &amp; Dips</span>
                          <span className="text-amber-800/80 text-[8px] sm:text-[11px]">Caramelized plantains, calamansi, &amp; sawsawan dips.</span>
                        </div>
                      </div>

                      <div className="pt-1 flex flex-wrap gap-2">
                        <button
                          onClick={onInquireClick}
                          className="px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-lg sm:rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-black text-[9px] sm:text-xs uppercase tracking-wider shadow-xs transition-all"
                        >
                          Book Date
                        </button>
                        <a
                          href={mailtoUrl}
                          className="px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-lg sm:rounded-xl bg-white border border-amber-300 text-amber-900 hover:bg-amber-100 font-bold text-[9px] sm:text-xs uppercase tracking-wider transition-all flex items-center gap-1"
                        >
                          <Mail className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-700" />
                          <span>Email</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Extravagant Bottom Fold Bar - 50% more compact on mobile */}
            <div className="bg-amber-50/80 border-t border-amber-200 px-3 py-1.5 sm:px-6 sm:py-3 flex items-center justify-between text-[9px] sm:text-xs">
              <span className="text-amber-900/60 font-mono text-[8px] sm:text-[11px] truncate">
                BoriPino Mobile Kamayan Services • Available Now
              </span>

              <button
                onClick={handleToggle}
                className="inline-flex items-center gap-1 font-black text-amber-800 hover:text-[#C8102E] uppercase tracking-wider transition-colors cursor-pointer text-[9px] sm:text-xs shrink-0"
              >
                <span>Toggle Closed</span>
                <ChevronUp className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
