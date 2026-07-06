import { useState, useEffect, FormEvent, MouseEvent } from "react";
import { ChefHat, BookOpen, Heart, Mail, Phone, Clock, MapPin, Check, Sun, CloudRain, Sparkles, Star, RotateCw, UploadCloud, X, FileImage, FileVideo } from "lucide-react";
import { motion } from "motion/react";
import Hero from "./components/Hero";
import RecipeCard from "./components/RecipeCard";
import { CURATED_RECIPES } from "./data/recipes";
import { Recipe } from "./types";

const IMAGE_COMMENTS = [
  {
    id: 1,
    username: "pino_fanatic",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop",
    imgUrl: "https://i.imgur.com/8FuWrbN.png",
    fallbackUrl: "https://i.imgur.com/8FuWrbN.png",
    rotation: "-4deg",
    style: "absolute top-[1%] left-[2%] w-[260px] lg:w-[300px] z-10",
    time: "2h ago",
    likes: 24,
    badge: "Plato Expert"
  },
  {
    id: 2,
    username: "caribbean_craves",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop",
    imgUrl: "https://i.imgur.com/wGCItwE.png",
    fallbackUrl: "https://i.imgur.com/wGCItwE.png",
    rotation: "3deg",
    style: "absolute top-[18%] right-[2%] w-[270px] lg:w-[310px] z-20",
    time: "4h ago",
    likes: 42,
    badge: "Mofongo Devotee"
  },
  {
    id: 3,
    username: "munchies_nyc",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop",
    imgUrl: "https://i.imgur.com/6vp7TI2.png",
    fallbackUrl: "https://i.imgur.com/6vp7TI2.png",
    rotation: "-2deg",
    style: "absolute bottom-[20%] left-[4%] w-[260px] lg:w-[300px] z-15",
    time: "5h ago",
    likes: 19,
    badge: "Lechón Connoisseur"
  },
  {
    id: 4,
    username: "abuela_approved",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=120&auto=format&fit=crop",
    imgUrl: "https://i.imgur.com/doLa6oV.png",
    fallbackUrl: "https://i.imgur.com/doLa6oV.png",
    rotation: "4deg",
    style: "absolute bottom-[1%] right-[6%] w-[270px] lg:w-[310px] z-10",
    time: "1d ago",
    likes: 56,
    badge: "Arroz Critic"
  }
];

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [scrollOpacity, setScrollOpacity] = useState(0.3);
  const [footerBgOpacity, setFooterBgOpacity] = useState(0.3);
  const [testimonialsBgOpacity, setTestimonialsBgOpacity] = useState(0.3);
  const [testimonialsContentOpacity, setTestimonialsContentOpacity] = useState(0);
  const [likedComments, setLikedComments] = useState<Record<number, boolean>>({});
  const [isShaking, setIsShaking] = useState(false);
  const [stampKey, setStampKey] = useState(0);
  const [stampImgSrc, setStampImgSrc] = useState("https://i.imgur.com/PrB4DHJ.png");

  const [weatherMode, setWeatherMode] = useState<"caribbean-sun" | "philippine-breeze">("caribbean-sun");
  const [hoveredRecipe, setHoveredRecipe] = useState<Recipe | null>(null);
  const [hoverTimeout, setHoverTimeout] = useState<any>(null);

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", type: "Catering", message: "" });
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string; type: string; url?: string } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isContactFlipped, setIsContactFlipped] = useState(false);
  const [contactMousePos, setContactMousePos] = useState({ x: -100, y: -100 });
  const [isContactHovered, setIsContactHovered] = useState(false);
  const [cursorEmoji, setCursorEmoji] = useState("🍲");
  const [globalMousePos, setGlobalMousePos] = useState({ x: -100, y: -100 });
  const [isMouseOnWindow, setIsMouseOnWindow] = useState(false);

  const recipes = CURATED_RECIPES;

  const handleHoverStart = (recipe: Recipe) => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    const timeout = setTimeout(() => {
      setHoveredRecipe(recipe);
    }, 220); // Balanced delay for delightful premium feels
    setHoverTimeout(timeout);
  };

  const handleHoverEnd = () => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    setHoveredRecipe(null);
  };

  const [rainDrops, setRainDrops] = useState<{ id: number; left: string; delay: string; duration: string }[]>([]);

  useEffect(() => {
    if (weatherMode === "philippine-breeze") {
      const drops = Array.from({ length: 115 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 3.5}s`,
        duration: `${0.8 + Math.random() * 0.9}s`,
      }));
      setRainDrops(drops);
    } else {
      setRainDrops([]);
    }
  }, [weatherMode]);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = "https://i.imgur.com/PrB4DHJ.png?cors=1";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        // Transparent threshold: convert near-white pixels to transparent
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          // If the pixel is very white (above 235 brightness), key it out to transparent
          if (r > 235 && g > 235 && b > 235) {
            data[i + 3] = 0; // Alpha
          }
        }
        ctx.putImageData(imageData, 0, 0);
        try {
          setStampImgSrc(canvas.toDataURL("image/png"));
        } catch (e) {
          console.error("Failed to generate transparent stamp data URL:", e);
        }
      }
    };
    img.onerror = () => {
      console.warn("Failed to load stamp via CORS, falling back to original URL.");
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Fades out completely when scrolled down 500px, matches scrolling up.
      const opacity = Math.max(0, 0.3 - (scrollY / 500) * 0.3);
      setScrollOpacity(opacity);

      // Testimonials bg opacity calculation (scrolling away fades to white bg)
      const testimonialsSec = document.getElementById("testimonials-section");
      if (testimonialsSec) {
        const rect = testimonialsSec.getBoundingClientRect();
        const secHeight = rect.height;
        const viewportHeight = window.innerHeight;
        
        // Calculate the center of the section and center of the viewport
        const secCenter = rect.top + secHeight / 2;
        const viewCenter = viewportHeight / 2;
        const distanceFromCenter = Math.abs(secCenter - viewCenter);
        const maxDistance = (viewportHeight + secHeight) / 2;
        
        // Ratio: 1 when perfectly centered, 0 when completely offscreen
        const ratio = Math.max(0, 1 - (distanceFromCenter / maxDistance));
        // Scale to 30% max opacity
        setTestimonialsBgOpacity(ratio * 0.3);

        // Content fade in / fade out animation upon scroll (0 to 1 back to 0)
        // Ensure a steep but pleasant curve so it's fully visible in the sweet spot
        const cOpacity = Math.min(1, Math.max(0, (ratio - 0.1) / 0.3));
        setTestimonialsContentOpacity(cOpacity);
      }

      // Footer bg opacity calculation:
      // Set to 30% when at the bottom, and fades out as user scrolls higher
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const maxScroll = docHeight - winHeight;
      
      if (maxScroll <= 0) {
        setFooterBgOpacity(0.3);
      } else {
        const distanceToBottom = maxScroll - scrollY;
        const fOpacity = Math.max(0, Math.min(0.3, 0.3 * (1 - distanceToBottom / 600)));
        setFooterBgOpacity(fOpacity);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Trigger once for initial state
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const triggerShake = () => {
      // Impact timing is at ~180ms when the stamp slams down onto the page
      setTimeout(() => {
        setIsShaking(true);
        setTimeout(() => {
          setIsShaking(false);
        }, 400);
      }, 180);
    };

    // Trigger immediately on load
    triggerShake();

    // Repeat every 15 seconds
    const interval = setInterval(() => {
      setStampKey((prev) => prev + 1);
      triggerShake();
    }, 15000);

    return () => clearInterval(interval);
  }, []);



  useEffect(() => {
    const foodEmojis = ["🍲", "🍜", "🍛", "🥘", "🥣", "🍱", "🍚", "🥗", "🍳", "🥥", "🍍"];
    const randomEmoji = foodEmojis[Math.floor(Math.random() * foodEmojis.length)];
    setCursorEmoji(randomEmoji);
  }, []);

  useEffect(() => {
    const handleGlobalMouseMove = (e: any) => {
      setGlobalMousePos({ x: e.clientX, y: e.clientY });
    };
    
    const handleGlobalMouseEnter = () => {
      setIsMouseOnWindow(true);
    };

    const handleGlobalMouseLeave = () => {
      setIsMouseOnWindow(false);
    };

    window.addEventListener("mousemove", handleGlobalMouseMove);
    document.addEventListener("mouseenter", handleGlobalMouseEnter);
    document.addEventListener("mouseleave", handleGlobalMouseLeave);

    // Initial check
    if (document.hasFocus()) {
      setIsMouseOnWindow(true);
    }

    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      document.removeEventListener("mouseenter", handleGlobalMouseEnter);
      document.removeEventListener("mouseleave", handleGlobalMouseLeave);
    };
  }, []);

  const handleManualStamp = () => {
    setStampKey((prev) => prev + 1);
    // Trigger immediate shake for feedback on click
    setIsShaking(true);
    setTimeout(() => {
      setIsShaking(false);
    }, 400);

    // Smooth scroll down to the contact section
    const contactSec = document.getElementById("app-contact-section");
    if (contactSec) {
      contactSec.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleCardClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const isInteractive = target.closest("button") || 
                       target.closest("input") || 
                       target.closest("select") || 
                       target.closest("textarea") || 
                       target.closest("a") ||
                       target.closest(".no-flip");
    if (!isInteractive) {
      setIsContactFlipped(!isContactFlipped);
    }
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  const handleFileChange = (file: File | null) => {
    setFileError(null);
    if (!file) return;

    // Support images and videos only
    const allowedTypes = [
      "image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml",
      "video/mp4", "video/quicktime", "video/webm", "video/x-matroska"
    ];
    
    if (!allowedTypes.includes(file.type) && !file.type.startsWith("image/") && !file.type.startsWith("video/")) {
      setFileError("Only image and video files are supported (JPEG, PNG, WEBP, MP4, MOV, etc.).");
      return;
    }

    // Check size limit (25MB)
    const sizeLimit = 25 * 1024 * 1024;
    if (file.size > sizeLimit) {
      setFileError(`File size (${formatBytes(file.size)}) exceeds the 25MB limit.`);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setUploadedFile({
        name: file.name,
        size: formatBytes(file.size),
        type: file.type,
        url: reader.result as string
      });
    };
    reader.onerror = () => {
      setFileError("Failed to read the file. Please try again.");
    };
    reader.readAsDataURL(file);
  };

  // Filtered recipes based on search & category select
  const filteredRecipes = recipes.filter((recipe) => {
    const matchesCategory = selectedCategory === "All" || recipe.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      recipe.ingredients.some((i) => i.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const scrollExploreIntoView = () => {
    const exploreSec = document.getElementById("recipe-explore-anchor");
    if (exploreSec) {
      exploreSec.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div id="gourmet-app-container" className="min-h-screen bg-brand-cream text-brand-dark flex flex-col antialiased relative">
      {/* Global custom tracking cursor follower with transparent background */}
      {isMouseOnWindow && (
        <motion.div
          style={{
            position: "fixed",
            left: globalMousePos.x,
            top: globalMousePos.y,
            x: "-50%",
            y: "-50%",
            pointerEvents: "none",
            zIndex: 9999,
          }}
          animate={{
            scale: [1, 1.15, 1],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
          className="hidden md:flex items-center justify-center bg-transparent text-3xl select-none"
        >
          <span>{cursorEmoji}</span>
        </motion.div>
      )}

      {/* Scroll-reactive background image */}
      <div 
        className="fixed inset-0 pointer-events-none transition-opacity duration-150 ease-out" 
        style={{ 
          backgroundImage: "url('https://i.imgur.com/FPyAPDZ.jpeg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: scrollOpacity,
          zIndex: 0
        }}
      />

      {/* Interactive Stamp - Quality Seal of BoriPino on Top Right */}
      <motion.div
        key={stampKey}
        onClick={handleManualStamp}
        initial={{ scale: 4.5, opacity: 0, rotate: -45, y: -150, filter: "drop-shadow(0 30px 20px rgba(0,0,0,0.2))" }}
        animate={{ 
          scale: 1, 
          opacity: 0.95, 
          rotate: -12, 
          y: 0,
          filter: "drop-shadow(0 4px 10px rgba(198, 16, 46, 0.15))",
          transition: { 
            type: "spring",
            damping: 11,
            stiffness: 150,
            mass: 0.75
          }
        }}
        whileHover={{ scale: 1.12, rotate: -5, opacity: 1 }}
        whileTap={{ scale: 0.92 }}
        title="BoriPino Authentic Stamp - Click to go to Contact Us section!"
        className="fixed top-16 right-2 sm:top-24 sm:right-6 md:right-10 z-50 pointer-events-auto cursor-pointer flex flex-col items-center group select-none"
      >
        <div className="relative w-12 h-12 sm:w-28 sm:h-28 flex items-center justify-center">
          {/* Dynamically transparent canvas PNG or blended fallback */}
          <img
            src={stampImgSrc}
            alt="Authentic Stamp Seal"
            className="w-full h-full object-contain mix-blend-multiply"
            referrerPolicy="no-referrer"
          />
        </div>
        <span className="hidden sm:inline-block mt-1 text-[8px] font-black tracking-widest text-brand-orange uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 bg-brand-cream border border-brand-border px-1.5 py-0.5 rounded shadow-xs">
          Contact Us!
        </span>
      </motion.div>

      {/* Global Banner Navigation bar */}
      <nav id="app-nav-bar" className="sticky top-0 z-40 bg-brand-cream/95 backdrop-blur-md border-b-2 border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-14 sm:h-20 items-center">
            {/* Logo */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-1.5 sm:gap-3 cursor-pointer select-none" 
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-brand-orange bg-white shadow-md flex items-center justify-center flex-shrink-0">
                <img
                  src="https://i.imgur.com/x8sSgDY.jpeg"
                  alt="BoriPino Logo"
                  className="w-full h-full object-cover scale-110"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    const fallback = document.getElementById("logo-fallback-icon");
                    if (fallback) fallback.style.display = "flex";
                  }}
                />
                <div id="logo-fallback-icon" className="hidden w-full h-full bg-brand-orange items-center justify-center text-white">
                  <ChefHat className="w-4 h-4 sm:w-6 sm:h-6" />
                </div>
              </div>
              <div className={isShaking ? "animate-shake" : ""}>
                <span className="text-sm sm:text-2xl font-black text-brand-orange tracking-tighter font-sans uppercase flex items-center leading-none">
                  Bori<span className="text-brand-dark">Pino</span>
                </span>
                <span className="block text-[6px] sm:text-[9px] text-brand-dark/60 font-black font-mono tracking-widest uppercase mt-0.5 whitespace-nowrap">
                  SABOS BORICUA x LASANG PINOY
                </span>
              </div>
            </motion.div>

            {/* Weather Switcher Controller */}
            <div className="flex items-center gap-1.5 sm:gap-3">
              {/* Climate Atmosphere Control Pill */}
              <div className="flex items-center bg-brand-border/20 border-2 border-brand-border rounded-full p-0.5 sm:p-1 shadow-sm gap-0.5 sm:gap-1">
                <motion.button
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setWeatherMode("caribbean-sun")}
                  className={`flex items-center gap-1 px-1.5 py-0.5 sm:px-3 sm:py-1.5 rounded-full text-[8px] sm:text-[10px] font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    weatherMode === "caribbean-sun"
                      ? "bg-[#FFB81C] text-brand-dark shadow-xs"
                      : "text-brand-dark/50 hover:text-brand-dark/80"
                  }`}
                  title="Switch to Puerto Rico Sun Weather Vibe!"
                >
                  <Sun className={`w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 ${weatherMode === "caribbean-sun" ? "animate-spin-slow text-[#C8102E]" : ""}`} />
                  <span className="hidden sm:inline">P.R. Sunshine ☀️</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setWeatherMode("philippine-breeze")}
                  className={`flex items-center gap-1 px-1.5 py-0.5 sm:px-3 sm:py-1.5 rounded-full text-[8px] sm:text-[10px] font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    weatherMode === "philippine-breeze"
                      ? "bg-brand-teal text-white shadow-xs"
                      : "text-brand-dark/50 hover:text-brand-dark/80"
                  }`}
                  title="Switch to Philippines Monsoon Vibe!"
                >
                  <CloudRain className={`w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 ${weatherMode === "philippine-breeze" ? "animate-bounce" : ""}`} />
                  <span className="hidden sm:inline">Ph. Monsoon 🌧️</span>
                </motion.button>
              </div>

              {/* Simple Heart Stat (Aesthetic) */}
              <motion.div 
                whileHover={{ scale: 1.04 }}
                className="hidden md:flex items-center gap-1.5 bg-brand-border/40 px-3.5 py-2 rounded-full border border-brand-border text-xs font-bold text-brand-dark/60 font-mono uppercase tracking-wider select-none"
              >
                <Heart className="w-4 h-4 text-brand-orange fill-brand-orange animate-pulse" />
                <span>Chef Crafted</span>
              </motion.div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Visual Banner */}
      <Hero
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        onScrollToExplore={scrollExploreIntoView}
        isShaking={isShaking}
        weatherMode={weatherMode}
      />

      {/* Main Main Stage Area */}
      <main className="relative z-10 flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        <div className="space-y-8 animate-fadeIn">
          {/* Explorer Title Anchor */}
          <div id="recipe-explore-anchor" className="scroll-mt-20 border-b-2 border-brand-border pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-black text-brand-dark tracking-tighter flex items-center gap-2">
                <BookOpen className="w-7 h-7 text-brand-orange" />
                <span>BoriPino Specials!</span>
              </h2>
              <p className="text-brand-dark/60 text-xs sm:text-sm mt-0.5 font-medium">
                Explore our signature gourmet fusion showcases, chef recommendations, and custom food pairings.
              </p>
            </div>

            {/* Status Info */}
            <div className="flex items-center gap-3 text-xs text-brand-dark/50 font-mono uppercase">
              <span>{filteredRecipes.length} showcases found</span>
            </div>
          </div>

          {/* Recipes Bento Grid */}
          {filteredRecipes.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-8">
              {filteredRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  weatherMode={weatherMode}
                  onHoverStart={handleHoverStart}
                  onHoverEnd={handleHoverEnd}
                />
              ))}
            </div>
          ) : (
            <div id="no-recipes-found" className="text-center py-16 border-2 border-dashed border-brand-border bg-white rounded-3xl p-8 max-w-lg mx-auto">
              <p className="text-4xl mb-3">🍳</p>
              <h3 className="text-lg font-bold text-brand-dark">No matching showcases</h3>
              <p className="text-brand-dark/60 text-sm mt-1 max-w-sm mx-auto leading-relaxed">
                We couldn't find any food showcases matching your search query. Try typing something else, 
                or explore our other culinary categories!
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Contact & Inquiry Section */}
      <section 
        id="app-contact-section" 
        className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 scroll-mt-24"
      >
        {/* Cool text-message pop-up outside the flippable card */}
        {!isContactFlipped && (
          <div className="absolute top-6 right-8 sm:right-16 md:right-24 z-20 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.9 }}
              animate={{ 
                opacity: 1, 
                y: [0, -6, 0],
                scale: 1 
              }}
              transition={{
                y: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
                opacity: { duration: 0.4 },
                scale: { duration: 0.4 }
              }}
              className="bg-brand-dark text-white text-xs px-4 py-2.5 rounded-2xl rounded-br-none shadow-xl border border-brand-orange/30 flex items-center gap-2 font-bold whitespace-nowrap"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-orange"></span>
              </span>
              <span>Tap me for a message! 📬</span>
              {/* Speech bubble tail */}
              <div className="absolute right-4 bottom-[-6px] w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-brand-dark" />
            </motion.div>
          </div>
        )}

        <motion.div 
          onClick={handleCardClick}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            setContactMousePos({
              x: e.clientX - rect.left,
              y: e.clientY - rect.top
            });
          }}
          onMouseEnter={() => setIsContactHovered(true)}
          onMouseLeave={() => setIsContactHovered(false)}
          animate={{
            boxShadow: isContactHovered 
              ? [
                  "0 20px 40px -15px rgba(0,0,0,0.15), 0 0 20px 2px rgba(249, 115, 22, 0.25), 0 0 40px 10px rgba(20, 184, 166, 0.15)",
                  "0 20px 40px -15px rgba(0,0,0,0.15), 0 0 35px 8px rgba(249, 115, 22, 0.4), 0 0 55px 15px rgba(20, 184, 166, 0.3)",
                  "0 20px 40px -15px rgba(0,0,0,0.15), 0 0 20px 2px rgba(249, 115, 22, 0.25), 0 0 40px 10px rgba(20, 184, 166, 0.15)"
                ]
              : "0 10px 25px -5px rgba(0,0,0,0.1), 0 0 0px 0px rgba(0,0,0,0)"
          }}
          transition={{
            boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
          style={{ perspective: 1500 }}
          className="relative bg-white/90 backdrop-blur-md rounded-3xl border-2 border-brand-border p-6 sm:p-12 transition-all duration-300 cursor-default select-none overflow-hidden"
        >
          {/* 3D Flip Animatable Inner Area */}
          <motion.div
            animate={{ rotateY: isContactFlipped ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 90, damping: 16 }}
            style={{ transformStyle: "preserve-3d" }}
            className="w-full"
          >
            {!isContactFlipped ? (
              /* --- FRONT SIDE: Contact Info & Form --- */
              <div className="relative lg:grid lg:grid-cols-12 lg:gap-12 items-start text-left select-text">
                {/* Background Image with 30% Opacity */}
                <div 
                  className="absolute inset-0 -m-6 sm:-m-12 pointer-events-none opacity-30 z-0 bg-cover bg-center bg-no-repeat rounded-3xl"
                  style={{ backgroundImage: 'url("https://i.imgur.com/nKWVLEE.jpeg")' }}
                />
                
                {/* Left Column: Business Details & Vibe */}
                <div className="relative z-10 lg:col-span-5 space-y-8 mb-12 lg:mb-0">
                  <div>
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 text-brand-orange text-xs font-bold tracking-wider uppercase mb-3">
                      <span className="w-1.5 h-1.5 bg-brand-orange rounded-full animate-ping" />
                      Get in Touch
                    </span>
                    <h2 className="text-3xl font-black text-brand-dark tracking-tighter uppercase font-sans">
                      How to Contact <span className="text-brand-orange">BoriPino</span>
                    </h2>
                    <p className="text-brand-dark/70 text-sm mt-2 leading-relaxed">
                      Have questions about our fusion recipes, catering service, or planning a custom collaborative pop-up? Reach out to our cross-cultural culinary team!
                    </p>
                  </div>

                  {/* Direct Info List */}
                  <div className="space-y-5 text-sm">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-brand-teal/10 flex items-center justify-center text-brand-teal flex-shrink-0 border border-brand-teal/20">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-brand-dark">Culinary Inquiries</h4>
                        <p className="text-brand-dark/75 mt-0.5 font-mono">bori.pinoo@gmail.com</p>
                        <p className="text-brand-dark/50 text-xs mt-0.5">Response within 24 hours</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange flex-shrink-0 border border-brand-orange/20">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-brand-dark">Catering & Event Hotline</h4>
                        <p className="text-brand-dark/75 mt-0.5 font-mono">850-253-7778</p>
                        <p className="text-brand-dark/50 text-xs mt-0.5 font-mono">Mon - Sat: 9:00 AM - 6:00 PM EST</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-brand-teal/10 flex items-center justify-center text-brand-teal flex-shrink-0 border border-brand-teal/20">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-brand-dark">Operational Kitchen Hubs</h4>
                        <p className="text-brand-dark/75 mt-0.5">
                          Stapleton, Staten Island
                        </p>
                        <p className="text-brand-dark/50 text-xs mt-0.5">Serving international culinary pop-ups</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange flex-shrink-0 border border-brand-orange/20">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-brand-dark">Chef Consultation Hours</h4>
                        <p className="text-brand-dark/75 mt-0.5">Stay updated with our for our schedules, and reservations on instagram!</p>
                      </div>
                    </div>
                  </div>

                  {/* Corner flip promoter for usability */}
                  <div className="pt-4 border-t border-brand-border/60">
                    <button
                      onClick={() => setIsContactFlipped(true)}
                      className="inline-flex items-center gap-2 text-xs font-black text-brand-orange uppercase tracking-wider hover:text-brand-teal transition-colors cursor-pointer"
                    >
                      <RotateCw className="w-3.5 h-3.5 animate-spin-slow" />
                      <span>Flip Card for Secret Chef Tips</span>
                    </button>
                  </div>
                </div>

                {/* Right Column: Interactive Inquiry Form */}
                <div className="relative z-10 lg:col-span-7 bg-brand-cream/50 p-6 sm:p-8 rounded-2xl border border-brand-border">
                  {formSubmitted ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12 px-4 space-y-4"
                    >
                      <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto border-2 border-green-200">
                        <Check className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-black text-brand-dark uppercase tracking-tight">Message Received!</h3>
                      <p className="text-brand-dark/70 text-sm max-w-md mx-auto leading-relaxed">
                        ¡Muchas gracias, <span className="font-bold text-brand-orange">{formData.name || "friend"}</span>! Your inquiry regarding <span className="font-bold text-brand-teal">{formData.type}</span> {uploadedFile ? `(with attachment: ${uploadedFile.name})` : ""} has been stamped and sent straight to our fusion kitchen. We'll be in touch real soon!
                      </p>
                      <button
                        onClick={() => {
                          setFormSubmitted(false);
                          setFormData({ name: "", email: "", type: "Catering", message: "" });
                          setUploadedFile(null);
                        }}
                        className="mt-4 px-6 py-2.5 rounded-full bg-brand-dark text-white hover:bg-brand-orange transition-colors duration-300 font-bold text-xs uppercase tracking-wider"
                      >
                        Send Another Message
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-5">
                      <h3 className="text-lg font-bold text-brand-dark border-b border-brand-border pb-3">
                        Send Us a Culinary Message
                      </h3>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-brand-dark/75 uppercase tracking-wider mb-1.5">
                            Your Name
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="e.g. Maria Santos"
                            className="w-full px-4 py-2.5 rounded-xl border border-brand-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange hover:border-brand-orange/60 transition-all duration-300 transform hover:scale-[1.01] focus:scale-[1.015]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-brand-dark/75 uppercase tracking-wider mb-1.5">
                            Email Address
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="e.g. maria@example.com"
                            className="w-full px-4 py-2.5 rounded-xl border border-brand-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange hover:border-brand-orange/60 transition-all duration-300 transform hover:scale-[1.01] focus:scale-[1.015]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-brand-dark/75 uppercase tracking-wider mb-1.5">
                          Type of Inquiry
                        </label>
                        <select
                          value={formData.type}
                          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-brand-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange hover:border-brand-orange/60 transition-all duration-300 transform hover:scale-[1.01] focus:scale-[1.015] cursor-pointer"
                        >
                          <option value="Catering">Event Catering & Food Orders</option>
                          <option value="Recipe">Recipe Feedback & Culinary Suggestion</option>
                          <option value="Collaboration">Pop-up chef collaboration</option>
                          <option value="General">General Inquiry / Message</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-brand-dark/75 uppercase tracking-wider mb-1.5">
                          Your Message
                        </label>
                        <textarea
                          required
                          rows={4}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Share your taste buds' desires or custom order details here..."
                          className="w-full px-4 py-2.5 rounded-xl border border-brand-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange hover:border-brand-orange/60 transition-all duration-300 transform hover:scale-[1.01] focus:scale-[1.015] resize-none"
                        />
                      </div>

                      {/* Drag & Drop File Upload Field */}
                      <div className="space-y-1.5 no-flip">
                        <label className="block text-xs font-bold text-brand-dark/75 uppercase tracking-wider">
                          Attach Image or Video (Optional)
                        </label>
                        
                        {!uploadedFile ? (
                          <motion.div
                            whileHover={{ scale: 1.015 }}
                            whileTap={{ scale: 0.995 }}
                            onDragOver={(e) => {
                              e.preventDefault();
                              setIsDragging(true);
                            }}
                            onDragLeave={() => setIsDragging(false)}
                            onDrop={(e) => {
                              e.preventDefault();
                              setIsDragging(false);
                              if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                                handleFileChange(e.dataTransfer.files[0]);
                              }
                            }}
                            className={`relative border-2 border-dashed rounded-xl p-4 transition-all duration-300 text-center flex flex-col items-center justify-center cursor-pointer ${
                              isDragging 
                                ? "border-brand-teal bg-brand-teal/5 scale-[1.01]" 
                                : "border-brand-border hover:border-brand-orange bg-white hover:bg-orange-50/10"
                            }`}
                          >
                            <input
                              type="file"
                              accept="image/*,video/*"
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                              onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                  handleFileChange(e.target.files[0]);
                                }
                              }}
                            />
                            <UploadCloud className={`w-8 h-8 mb-2 transition-transform duration-300 ${isDragging ? "text-brand-teal scale-110 animate-bounce" : "text-brand-dark/40"}`} />
                            <p className="text-sm font-bold text-brand-dark/80">
                              Drag &amp; drop file here, or <span className="text-brand-orange">click to browse</span>
                            </p>
                            <p className="text-xs text-brand-dark/50 mt-1">
                              Supports PNG, JPEG, WEBP, MP4, MOV up to 25MB
                            </p>
                          </motion.div>
                        ) : (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="relative border border-brand-border rounded-xl p-3 bg-white flex items-center justify-between gap-3"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              {uploadedFile.url && uploadedFile.type.startsWith("image/") ? (
                                <img
                                  src={uploadedFile.url}
                                  alt="Selected attachment preview"
                                  referrerPolicy="no-referrer"
                                  className="w-12 h-12 rounded-lg object-cover border border-brand-border bg-brand-cream/30 flex-shrink-0"
                                />
                              ) : (
                                <div className="w-12 h-12 rounded-lg bg-orange-100 border border-brand-orange/20 flex items-center justify-center text-brand-orange flex-shrink-0">
                                  {uploadedFile.type.startsWith("video/") ? (
                                    <FileVideo className="w-6 h-6" />
                                  ) : (
                                    <FileImage className="w-6 h-6" />
                                  )}
                                </div>
                              )}
                              <div className="min-w-0">
                                <p className="text-xs font-bold text-brand-dark truncate">{uploadedFile.name}</p>
                                <p className="text-[10px] text-brand-dark/50 font-mono mt-0.5 uppercase">
                                  {uploadedFile.type.split("/")[1] || "File"} • {uploadedFile.size}
                                </p>
                              </div>
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.15 }}
                              whileTap={{ scale: 0.85 }}
                              type="button"
                              onClick={() => {
                                setUploadedFile(null);
                                setFileError(null);
                              }}
                              className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-brand-dark/50 hover:text-brand-orange transition-colors cursor-pointer"
                              title="Remove attachment"
                            >
                              <X className="w-4 h-4" />
                            </motion.button>
                          </motion.div>
                        )}

                        {fileError && (
                          <p className="text-xs text-red-500 font-medium animate-pulse mt-1">
                            ⚠️ {fileError}
                          </p>
                        )}
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.025 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-full py-3.5 px-6 rounded-xl bg-brand-orange hover:bg-brand-teal text-white font-bold text-xs uppercase tracking-widest shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                      >
                        Submit Message to Kitchen
                      </motion.button>
                    </form>
                  )}
                </div>

              </div>
            ) : (
              /* --- BACK SIDE: Postcard Design (Rotated 180 to stand correct) --- */
              <div 
                style={{ transform: "rotateY(180deg)" }} 
                className="relative lg:grid lg:grid-cols-12 lg:gap-12 items-stretch text-left select-text"
              >
                {/* Back Background Image with 30% Opacity */}
                <div 
                  className="absolute inset-0 -m-6 sm:-m-12 pointer-events-none opacity-30 z-0 bg-cover bg-center bg-no-repeat rounded-3xl"
                  style={{ backgroundImage: 'url("https://i.imgur.com/n8k62Ut.jpeg")' }}
                />
                
                {/* Left Column: Postcard Message Letter */}
                <div className="relative z-10 lg:col-span-5 bg-amber-50/65 rounded-2xl border border-amber-200 p-6 sm:p-8 shadow-inner flex flex-col justify-between space-y-6 overflow-hidden">
                  {/* Grid Lines background to look like a postcard */}
                  <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "radial-gradient(#000 10%, transparent 10%)", backgroundSize: "16px 16px" }} />
                  
                  <div className="space-y-4 z-10">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-200/50 text-amber-800 text-xs font-bold tracking-wider uppercase mb-1">
                      📬 BoriPino Postcard
                    </span>

                    <div className="space-y-2">
                      <p className="font-serif italic text-brand-dark text-sm">Dear Culinary Adventurer,</p>
                      <p className="text-xs text-brand-dark/85 leading-relaxed font-sans">
                        Our fusion kitchen is a heartfelt dialogue between Puerto Rico's vibrant, garlicky soil and the Philippines' comforting, slow-simmered depths. We build every recipe from childhood memories in San Juan and Manila, brought to life for Seattle's beautiful, diverse culinary table.
                      </p>
                      <p className="text-xs text-brand-dark/85 leading-relaxed font-sans">
                        Thank you for visiting BoriPino. Whether we cater your next event or you just cook our recipes at home, you are officially part of our cross-cultural family!
                      </p>
                      <p className="font-serif italic text-brand-dark text-sm mt-3">With love & spices,</p>
                      <p className="font-serif italic text-amber-800 font-extrabold text-sm">— Chef Bori & Chef Pino 🇵🇷🇵🇭</p>
                    </div>
                  </div>

                  <div className="border-t border-amber-200/80 pt-4 z-10 flex items-center justify-between text-brand-dark/60">
                    <div className="text-[9px] font-mono uppercase tracking-widest font-bold">
                      📍 Seattle • San Juan • Manila
                    </div>
                    <span className="text-xs">✨🥥🌿</span>
                  </div>
                </div>

                {/* Right Column: Stamp, Address and Return button */}
                <div className="relative z-10 lg:col-span-7 bg-amber-50/65 rounded-2xl border border-amber-200 p-6 sm:p-8 shadow-inner flex flex-col justify-between space-y-8 overflow-hidden">
                  {/* Grid Lines background to look like a postcard */}
                  <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "radial-gradient(#000 10%, transparent 10%)", backgroundSize: "16px 16px" }} />
                  
                  <div className="space-y-6 z-10">
                    <div className="flex justify-between items-start gap-4">
                      {/* Address lines */}
                      <div className="font-mono text-xs text-brand-dark/70 space-y-2 pt-2">
                        <p className="font-black text-brand-dark/95 text-xs tracking-wider">RECIPENT:</p>
                        <div className="border-b border-brand-dark/20 w-44 sm:w-60 pb-1 font-bold text-brand-dark/90">The Food Enthusiast</div>
                        <div className="border-b border-brand-dark/20 w-44 sm:w-60 pb-1">123 Fusion Culinary Way</div>
                        <div className="border-b border-brand-dark/20 w-44 sm:w-60 pb-1">Seattle, WA 98101</div>
                      </div>

                      {/* Stamp design */}
                      <div className="w-16 h-20 border-2 border-dashed border-amber-400 bg-white p-1.5 flex flex-col items-center justify-center text-center rounded relative transform rotate-6 flex-shrink-0 shadow-sm">
                        <span className="text-[7px] font-mono font-extrabold text-amber-500 block uppercase tracking-tighter">BoriPino</span>
                        <span className="text-xl block my-0.5">👨‍🍳</span>
                        <span className="text-[6px] font-mono text-amber-500 block leading-none">Seattle, WA</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-amber-200/50">
                      <p className="text-xs text-brand-dark/70 leading-relaxed italic">
                        "Food is our common ground, a universal experience that connects all of us. No matter where we come from, we are bound together by the love of a good meal."
                      </p>
                    </div>
                  </div>

                  {/* Return Action button */}
                  <button
                    onClick={() => setIsContactFlipped(false)}
                    className="w-full py-3.5 px-6 rounded-xl bg-brand-orange hover:bg-brand-teal text-white font-bold text-xs uppercase tracking-widest shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer no-flip"
                  >
                    <RotateCw className="w-4 h-4 animate-spin-slow" />
                    <span>Flip back to Contact Form</span>
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      </section>

      {/* Instagram Section */}
      <section 
        className="relative z-10 w-full py-16 scroll-mt-24 instagram-section"
      >
        <div className="bg-white/90 backdrop-blur-md rounded-none border-y-2 border-x-0 border-brand-border p-6 sm:py-12 sm:px-0 text-center flex flex-col items-center justify-center w-full">
          <div className="max-w-[1400px] w-full px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
            <h2 className="text-3xl font-black text-brand-dark tracking-tighter uppercase mb-2">
              Follow us on Instagram
            </h2>
            <p className="text-brand-dark/60 text-xs sm:text-sm max-w-md mx-auto font-medium mb-8">
              Stay connected with our culinary journey, behind-the-scenes magic, and latest gourmet pop-ups!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start w-full mb-8">
              {/* Left Column: Profile Feed Embed */}
              <div className="w-full flex flex-col items-center">
                <h3 className="text-sm font-bold text-brand-dark/80 uppercase tracking-wider mb-3">Our Feed</h3>
                <div className="w-full max-w-[672px] aspect-[480/600] relative rounded-none overflow-hidden bg-white mb-4">
                  <iframe
                    src="https://www.instagram.com/bori.pino/embed"
                    frameBorder="0"
                    scrolling="no"
                    className="absolute inset-0 w-full h-full rounded-none bg-white"
                  />
                </div>

                <div id="instagram-direct-link-container" className="flex flex-col items-center justify-center gap-2">
                  <p id="instagram-direct-link-instruction" className="text-xs text-brand-dark/50 font-mono">
                    If the display does not load, tap/click here instead!
                  </p>
                  
                  {/* Animated pointing arrow pointing to the button below */}
                  <motion.div
                    id="instagram-animated-arrow"
                    animate={{ y: [0, 6, 0] }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                    className="text-brand-orange mb-1"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="3" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="w-5 h-5"
                    >
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <polyline points="19 12 12 19 5 12"></polyline>
                    </svg>
                  </motion.div>

                  <a 
                    id="instagram-direct-link-button"
                    href="https://www.instagram.com/bori.pino/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 py-3 px-6 rounded-xl bg-brand-orange hover:bg-brand-teal text-white font-bold text-xs uppercase tracking-widest shadow-md hover:shadow-lg transition-all duration-300 transform active:scale-[0.98] cursor-pointer"
                  >
                    <span>View our Instagram</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Featured Post/Reel Embed */}
              <div className="w-full flex flex-col items-center">
                <h3 className="text-sm font-bold text-brand-dark/80 uppercase tracking-wider mb-3">Featured Highlight</h3>
                <div className="w-full max-w-[672px] aspect-[9/16] relative rounded-none overflow-hidden bg-white">
                  <iframe
                    src="https://www.instagram.com/reel/DaT1pc3xx2p/embed/?autoplay=1"
                    frameBorder="0"
                    scrolling="no"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    style={{ height: "1045.56px" }}
                    className="absolute inset-0 w-full h-full rounded-none bg-white border-none scale-100"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials / Raving Fans Section */}
      <section 
        className="relative z-10 w-full py-24 border-b-2 border-brand-border overflow-hidden bg-white transition-colors duration-1000"
        id="testimonials-section"
      >
        {/* Mirror Reflection & Color Scheme Glowing Animations & Image Background */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          {/* Base White Background Layer */}
          <div className="absolute inset-0 bg-white" />

          {/* Requested Background Image layer with 30% max opacity that fades to white bg as user scrolls away */}
          <div 
            className="absolute inset-0 transition-opacity duration-300 ease-out"
            style={{ 
              backgroundImage: "url('https://i.imgur.com/73AEabM.png'), url('https://imgur.com/73AEabM.png'), url('https://images.unsplash.com/photo-1543353071-10c8ba85a904?q=80&w=1600')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: testimonialsBgOpacity,
              zIndex: 0
            }}
          />

          {/* Base Color Scheme Glow layer (also fades dynamically based on scroll) */}
          <div 
            className={`absolute inset-0 transition-all duration-1000 bg-gradient-to-tr ${
              weatherMode === "caribbean-sun" 
                ? "from-brand-orange/20 via-yellow-500/5 to-transparent" 
                : "from-brand-teal/20 via-emerald-500/5 to-transparent"
            }`}
            style={{ opacity: testimonialsBgOpacity ? (testimonialsBgOpacity / 0.3) * 0.4 : 0 }}
          />

          {/* Dynamic Light Reflector 1 */}
          <motion.div
            animate={{ 
              x: [0, 80, -60, 0], 
              y: [0, -50, 70, 0],
              scale: [1, 1.25, 0.85, 1],
              opacity: [0.15, 0.3, 0.15]
            }}
            transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
            style={{ opacity: testimonialsBgOpacity ? (testimonialsBgOpacity / 0.3) * 0.35 : 0 }}
            className={`absolute -top-24 -left-24 w-[500px] h-[500px] rounded-full blur-[130px] mix-blend-multiply transition-colors duration-1000 ${
              weatherMode === "caribbean-sun" ? "bg-brand-orange/30" : "bg-brand-teal/30"
            }`}
          />

          {/* Dynamic Light Reflector 2 (Complementary color scheme glow) */}
          <motion.div
            animate={{ 
              x: [0, -70, 50, 0], 
              y: [0, 80, -40, 0],
              scale: [1, 1.15, 0.9, 1],
              opacity: [0.1, 0.25, 0.1]
            }}
            transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
            style={{ opacity: testimonialsBgOpacity ? (testimonialsBgOpacity / 0.3) * 0.3 : 0 }}
            className={`absolute -bottom-24 -right-24 w-[550px] h-[550px] rounded-full blur-[150px] mix-blend-multiply transition-colors duration-1000 ${
              weatherMode === "caribbean-sun" ? "bg-yellow-500/30" : "bg-emerald-500/30"
            }`}
          />

          {/* High-Gloss Diagonal Mirror Shine Sweep */}
          <motion.div
            animate={{ x: ["-150%", "250%"] }}
            transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
            className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-brand-dark/[0.04] to-transparent skew-x-12 pointer-events-none"
          />

          {/* Subtle Glowing Mirror Grid Matrix */}
          <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:32px_32px]" />
        </div>

        {/* Dynamic Border Accents (Top/Bottom Mirror Highlights) */}
        <div className={`absolute inset-x-0 top-0 h-[2px] transition-all duration-1000 ${
          weatherMode === "caribbean-sun" 
            ? "bg-gradient-to-r from-transparent via-brand-orange/60 to-transparent shadow-[0_1px_15px_rgba(200,16,46,0.5)]" 
            : "bg-gradient-to-r from-transparent via-brand-teal/60 to-transparent shadow-[0_1px_15px_rgba(0,56,168,0.5)]"
        }`} />

        <motion.div 
          style={{ opacity: testimonialsContentOpacity }}
          className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 transition-opacity duration-300 ease-out"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Stacked, Rotated, and Spread Out Image Message Boxes (Desktop / Tablet view) */}
            <div className="hidden md:flex md:col-span-7 flex-col items-center justify-center relative min-h-[620px] py-12 w-full select-none">
              {IMAGE_COMMENTS.map((comment) => {
                const isLiked = !!likedComments[comment.id];
                return (
                  <motion.div
                    key={comment.id}
                    className={`${comment.style} bg-white text-brand-dark p-3.5 rounded-2xl border-2 border-brand-dark shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] cursor-pointer transition-all duration-300`}
                    style={{ rotate: comment.rotation }}
                    whileHover={{ 
                      scale: 1.06, 
                      rotate: "0deg",
                      zIndex: 40,
                      boxShadow: weatherMode === "caribbean-sun" 
                        ? "0 10px 30px rgba(200,16,46,0.35), 6px 6px 0px 0px rgba(15,23,42,1)" 
                        : "0 10px 30px rgba(0,56,168,0.35), 6px 6px 0px 0px rgba(15,23,42,1)",
                      transition: { type: "spring", stiffness: 350, damping: 15 }
                    }}
                  >
                    {/* Message Header (Chat style) */}
                    <div className="flex items-center gap-2.5 pb-2 border-b border-gray-100 mb-2">
                      <img src={comment.avatar} alt={comment.username} className="w-8 h-8 rounded-full border border-gray-200 object-cover blur-[2px]" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-extrabold text-xs text-brand-dark truncate">@{comment.username}</span>
                          <span className="w-1 h-1 bg-gray-300 rounded-full flex-shrink-0" />
                          <span className="text-[10px] text-gray-400 font-mono font-bold flex-shrink-0">{comment.time}</span>
                        </div>
                        <span className="text-[9px] text-brand-teal font-extrabold uppercase tracking-wider font-mono block leading-none">{comment.badge}</span>
                      </div>
                      <div className="w-2 h-2 rounded-full bg-brand-teal animate-pulse" />
                    </div>

                    {/* Image comment body (The actual image) */}
                    <div className="w-full relative overflow-hidden rounded-xl border border-gray-150 bg-gray-50 flex items-center justify-center">
                      <img 
                        src={comment.imgUrl} 
                        alt={`Review comment from ${comment.username}`} 
                        className="w-full h-auto block object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = comment.fallbackUrl;
                        }}
                      />
                    </div>

                    {/* Message Footer (Interactive Reactions) */}
                    <div className="flex items-center justify-between pt-2 mt-2 border-t border-gray-50 text-brand-dark">
                      <div className="flex items-center gap-3">
                        <motion.button 
                          whileTap={{ scale: 0.8 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            const cid = comment.id;
                            setLikedComments(prev => ({ ...prev, [cid]: !prev[cid] }));
                          }}
                          className={`flex items-center gap-1 text-xs font-bold transition-colors ${
                            isLiked ? "text-red-500" : "text-gray-400 hover:text-red-500"
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                          <span className="font-mono">{comment.likes + (isLiked ? 1 : 0)}</span>
                        </motion.button>
                        <div className="flex items-center gap-1 text-xs text-gray-400 cursor-pointer hover:text-brand-dark">
                          <span className="font-mono text-[10px]">Reply</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-gray-400 font-mono font-semibold">IG Direct</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Mobile View: Vertical list of interactive message boxes */}
            <div className="flex md:hidden flex-col items-center gap-6 w-full py-4 select-none">
              {IMAGE_COMMENTS.map((comment, index) => {
                const isLiked = !!likedComments[comment.id];
                // Alternate rotation slightly for a fun hand-crafted aesthetic
                const mobRot = index % 2 === 0 ? "-2deg" : "2deg";
                return (
                  <div 
                    key={comment.id}
                    style={{ transform: `rotate(${mobRot})` }}
                    className="w-full max-w-[340px] bg-white text-brand-dark p-3.5 rounded-2xl border-2 border-brand-dark shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]"
                  >
                    {/* Message Header (Chat style) */}
                    <div className="flex items-center gap-2.5 pb-2 border-b border-gray-100 mb-2">
                      <img src={comment.avatar} alt={comment.username} className="w-8 h-8 rounded-full border border-gray-200 object-cover blur-[2px]" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-extrabold text-xs text-brand-dark truncate">@{comment.username}</span>
                          <span className="w-1 h-1 bg-gray-300 rounded-full flex-shrink-0" />
                          <span className="text-[10px] text-gray-400 font-mono font-bold flex-shrink-0">{comment.time}</span>
                        </div>
                        <span className="text-[9px] text-brand-teal font-extrabold uppercase tracking-wider font-mono block leading-none">{comment.badge}</span>
                      </div>
                      <div className="w-2 h-2 rounded-full bg-brand-teal animate-pulse" />
                    </div>

                    {/* Image comment body */}
                    <div className="w-full relative overflow-hidden rounded-xl border border-gray-150 bg-gray-50 flex items-center justify-center">
                      <img 
                        src={comment.imgUrl} 
                        alt={`Review comment from ${comment.username}`} 
                        className="w-full h-auto block object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = comment.fallbackUrl;
                        }}
                      />
                    </div>

                    {/* Message Footer */}
                    <div className="flex items-center justify-between pt-2 mt-2 border-t border-gray-50 text-brand-dark">
                      <div className="flex items-center gap-3">
                        <motion.button 
                          whileTap={{ scale: 0.8 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            const cid = comment.id;
                            setLikedComments(prev => ({ ...prev, [cid]: !prev[cid] }));
                          }}
                          className={`flex items-center gap-1 text-xs font-bold transition-colors ${
                            isLiked ? "text-red-500" : "text-gray-400 hover:text-red-500"
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                          <span className="font-mono">{comment.likes + (isLiked ? 1 : 0)}</span>
                        </motion.button>
                        <div className="flex items-center gap-1 text-xs text-gray-400 cursor-pointer">
                          <span className="font-mono text-[10px]">Reply</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-gray-400 font-mono font-semibold">IG Direct</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Hero Content & CTA */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 lg:pl-12">
              <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter uppercase leading-[0.9] drop-shadow-[0_2px_8px_rgba(15,23,42,0.1)] ${
                weatherMode === "caribbean-sun" ? "animate-textShinePR" : "animate-textShinePH"
              }`}>
                BORI.PINO <br className="hidden lg:block" />
                Satisfactory <br className="hidden lg:block" />
                comments! <span className="inline-block animate-bounce text-3xl sm:text-4xl lg:text-5xl">💬</span>
              </h2>
              
              <p className="text-brand-dark/90 text-sm sm:text-lg font-extrabold leading-relaxed max-w-lg">
                What's your go-to Bori.Pino order?
              </p>
              
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                href="https://www.instagram.com/bori.pino/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  borderColor: '#fdfdfd',
                  backgroundColor: '#c8102e',
                  color: '#ffffff',
                  borderRadius: '24px'
                }}
                className={`w-full sm:w-auto inline-block text-center px-8 py-4 bg-white text-brand-dark font-black text-sm uppercase tracking-widest rounded-none border-2 border-brand-dark shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] hover:bg-[#fffdf8] transition-all duration-200 cursor-pointer ${
                  weatherMode === "caribbean-sun" 
                    ? "hover:border-brand-orange hover:shadow-brand-orange/40" 
                    : "hover:border-brand-teal hover:shadow-brand-teal/40"
                }`}
              >
                Grab a plato today!
              </motion.a>
            </div>

          </div>
        </motion.div>
      </section>

      {/* Global Sticky Footer */}
      <footer id="app-footer" className="relative z-10 bg-white text-brand-dark py-12 mt-16 flex-shrink-0 border-t-2 border-brand-border overflow-hidden">
        {/* Scroll-reactive background image inside the footer with blend-mode to remove white background */}
        <div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-150 ease-out" 
          style={{ 
            backgroundImage: "url('https://i.imgur.com/j45IkXW.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: footerBgOpacity,
            mixBlendMode: "multiply",
            zIndex: 0
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Aesthetic Stat Bar resembling the design */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-8 mb-8 border-b-2 border-brand-border text-xs font-bold uppercase tracking-widest text-brand-dark/90 text-center">
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-brand-orange rounded-full animate-ping" />
              <span>4.9/5 Gourmet Rating</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-brand-orange rounded-full" />
              <span>Sabor Boricua Zest</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-brand-orange rounded-full" />
              <span>Lasang Pinoy Soul</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-brand-orange rounded-full" />
              <span>100% Chef-Crafted</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-4 text-xs text-brand-dark/50 font-mono tracking-wide">
            <p>© 2026 BoriPino - SABOS BORICUA x LASANG PINOY. All rights reserved.</p>
            <div className="flex gap-4 font-bold text-brand-dark/80">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="hover:text-brand-orange transition-colors cursor-pointer"
              >
                Back to Top
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Weather Layer Backdrops */}
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        {/* Dynamic sun halo overlay for Caribbean Sun */}
        <div 
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#FFB81C]/5 rounded-full blur-[120px] transition-opacity duration-1000"
          style={{ opacity: weatherMode === "caribbean-sun" ? 0.75 : 0 }}
        />

        {/* Dynamic rain cloud atmosphere dim overlay for Philippine Monsoon */}
        <div 
          className="absolute inset-0 bg-brand-dark/[0.03] backdrop-saturate-[0.85] transition-opacity duration-1000"
          style={{ opacity: weatherMode === "philippine-breeze" ? 1 : 0 }}
        />

        {/* Glowing deep-teal cloud backdrop blur */}
        <div 
          className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-brand-teal/[0.07] rounded-full blur-[140px] transition-opacity duration-1000"
          style={{ opacity: weatherMode === "philippine-breeze" ? 1 : 0 }}
        />
        
        {/* Rain Drops Elements for Philippines Breeze */}
        {weatherMode === "philippine-breeze" && (
          <div className="absolute inset-0 z-10 overflow-hidden">
            {rainDrops.map((drop) => (
              <div
                key={drop.id}
                className="rain-drop"
                style={{
                  left: drop.left,
                  animationDelay: drop.delay,
                  animationDuration: drop.duration,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Semi-Full Screen Hover Preview Overlay Portal */}
      {hoveredRecipe && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4 sm:p-8 pointer-events-none">
          {/* Blur Glass backdrop overlay */}
          <div className="fixed inset-0 bg-brand-dark/20 backdrop-blur-md transition-opacity duration-300" />

          {/* Actual Popout Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              transition: { type: "spring", damping: 14, stiffness: 170 } 
            }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-4xl rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row pointer-events-none md:max-h-[75vh] bg-white border-2"
            style={{ 
              borderColor: weatherMode === "caribbean-sun" ? "#C8102E" : "#0038A8",
              boxShadow: weatherMode === "caribbean-sun" 
                ? "0 25px 50px -12px rgba(200, 16, 46, 0.3)" 
                : "0 25px 50px -12px rgba(0, 56, 168, 0.3)"
            }}
          >
            {/* Food Image Portion */}
            <div className="relative w-full md:w-1/2 h-56 md:h-auto overflow-hidden bg-brand-border/25">
              <img
                src={hoveredRecipe.image}
                alt={hoveredRecipe.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-brand-dark/25 to-transparent" />
              
              <div className="absolute top-4 left-4 flex gap-2">
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-sm ${
                  weatherMode === "caribbean-sun" ? "bg-brand-orange" : "bg-brand-teal"
                }`}>
                  {hoveredRecipe.category}
                </span>
                {hoveredRecipe.isAiGenerated && (
                  <span className="bg-brand-orange text-white text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                    <Sparkles className="w-3 h-3 animate-pulse" />
                    <span>AI Spec</span>
                  </span>
                )}
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-[10px] font-bold tracking-wider font-mono text-[#FFB81C] uppercase">BoriPino Authentic Fusion</p>
                <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight leading-none mt-1 drop-shadow-md">
                  {hoveredRecipe.title}
                </h3>
              </div>
            </div>

            {/* Showcase details portion */}
            <div className="p-6 sm:p-8 flex flex-col justify-between w-full md:w-1/2 space-y-4 bg-brand-cream/95">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-brand-dark/40 font-mono">
                    Food Showcase Quick-View
                  </span>
                  <div className="flex items-center gap-1 text-xs font-black bg-brand-border/40 px-2.5 py-1 rounded-full text-brand-dark">
                    <Star className="w-3.5 h-3.5 fill-brand-orange text-brand-orange" />
                    <span>{hoveredRecipe.rating.toFixed(1)}</span>
                  </div>
                </div>

                <h2 className={`text-2xl sm:text-3xl font-black uppercase tracking-tighter leading-tight ${
                  weatherMode === "caribbean-sun" ? "animate-textShinePR" : "animate-textShinePH"
                }`}>
                  {hoveredRecipe.title}
                </h2>

                <p className="text-sm text-brand-dark/70 leading-relaxed font-semibold">
                  {hoveredRecipe.description}
                </p>

                {/* High-Contrast Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {hoveredRecipe.tags.slice(0, 4).map((tag, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-brand-border/40 text-[9px] text-brand-dark/70 font-mono font-bold">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Pulsing trigger instruction at the bottom */}
              <div className="pt-3 border-t border-brand-border/40 flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full animate-ping ${
                  weatherMode === "caribbean-sun" ? "bg-brand-orange" : "bg-[#0038A8]"
                }`} />
                <span className="text-[9px] sm:text-[10px] font-black tracking-wider text-brand-dark/50 uppercase">
                  Click food card to open complete recipe checklist!
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
