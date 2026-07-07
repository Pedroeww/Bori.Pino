import React, { useState } from "react";
import { Users, Star, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { Recipe, MealPeriod } from "../types";

interface RecipeCardProps {
  key?: string | number | null;
  recipe: Recipe;
  onAddToPlanner?: (recipe: Recipe, period: MealPeriod, day: string) => void;
  showPlannerQuickAdd?: boolean;
  weatherMode?: "caribbean-sun" | "philippine-breeze";
  onHoverStart?: (recipe: Recipe) => void;
  onHoverEnd?: () => void;
  onClick?: (recipe: Recipe) => void;
}

export default function RecipeCard({ 
  recipe, 
  weatherMode = "caribbean-sun",
  onHoverStart,
  onHoverEnd,
  onClick
}: RecipeCardProps) {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const isPR = weatherMode === "caribbean-sun";

  return (
    <motion.div
      id={`recipe-card-${recipe.id}`}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
      whileHover={{ 
        scale: 1.03,
        y: -6,
        boxShadow: isPR 
          ? "0 20px 25px -5px rgba(198,16,46,0.12), 0 10px 10px -5px rgba(198,16,46,0.08)" 
          : "0 20px 25px -5px rgba(0,56,168,0.12), 0 10px 10px -5px rgba(0,56,168,0.08)"
      }}
      whileTap={{ scale: 0.98 }}
      className={`group bg-white rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-brand-border transition-all duration-300 flex flex-col h-full cursor-pointer ${
        isPR 
          ? "hover:animate-borderGlowPR" 
          : "hover:animate-borderGlowPH"
      }`}
      onClick={() => {
        if (onHoverEnd) onHoverEnd();
        if (onClick) onClick(recipe);
      }}
      onMouseEnter={() => {
        if (onHoverStart) onHoverStart(recipe);
      }}
      onMouseLeave={() => {
        if (onHoverEnd) onHoverEnd();
      }}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-brand-border/20">
        <motion.img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
          referrerPolicy="no-referrer"
        />
        {recipe.isAiGenerated && (
          <div className="absolute top-1.5 left-1.5 sm:top-3 sm:left-3 bg-brand-orange text-white text-[8px] sm:text-[10px] font-black tracking-widest uppercase px-1.5 py-0.5 sm:px-3 sm:py-1 rounded-full flex items-center gap-0.5 sm:gap-1 shadow-md">
            <Sparkles className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 animate-pulse" />
            <span>AI Crafted</span>
          </div>
        )}
        <div className="absolute top-1.5 right-1.5 sm:top-3 sm:right-3 bg-white/95 backdrop-blur-md text-brand-dark text-[9px] sm:text-xs font-black px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full flex items-center gap-0.5 sm:gap-1 border border-brand-border shadow-sm">
          <Star className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 fill-brand-orange text-brand-orange" />
          <span>{recipe.rating.toFixed(1)}</span>
        </div>
        <div className="absolute bottom-1.5 left-1.5 sm:bottom-3 sm:left-3 bg-brand-teal text-white text-[8px] sm:text-[10px] font-black tracking-widest uppercase px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-md shadow-xs">
          {recipe.category}
        </div>
      </div>

      <div className="p-2.5 sm:p-5 flex flex-col flex-grow">
        <div className="flex-grow">
          <h3 className="text-xs sm:text-lg font-black text-brand-dark leading-snug group-hover:text-brand-orange transition-colors line-clamp-1">
            {recipe.title}
          </h3>
          <div 
            onClick={(e) => {
              e.stopPropagation();
              setShowFullDescription(!showFullDescription);
            }}
            className="mt-1 sm:mt-1.5 cursor-pointer hover:bg-brand-orange/5 p-1 -m-1 rounded-md transition-all duration-200 group/desc"
            title="Click to toggle full description"
          >
            <p className={`text-[10px] sm:text-xs text-brand-dark/60 leading-relaxed font-medium transition-all ${
              showFullDescription ? "" : "line-clamp-2"
            }`}>
              {recipe.description}
            </p>
            <span className="text-[8px] sm:text-[9px] text-brand-orange font-bold hover:underline block mt-0.5 font-mono">
              {showFullDescription ? "▲ Show less" : "▼ Tap to read full description"}
            </span>
          </div>
        </div>

        {/* Quick Metrics */}
        <div className="grid grid-cols-2 gap-2 border-t-2 border-brand-border pt-2 sm:pt-4 mt-2 sm:mt-4 text-center">
          <div className="flex flex-col items-center border-r-2 border-brand-border">
            <Users className="w-3 h-3 sm:w-4 sm:h-4 text-brand-dark/40 mb-0.5" />
            <span className="text-[9px] sm:text-[11px] font-bold text-brand-dark">
              {Math.min(recipe.servings, 4)} people
            </span>
            <span className="text-[7px] sm:text-[9px] text-brand-dark/40 uppercase font-mono tracking-wider sm:tracking-widest font-black">Servings</span>
          </div>
          <div className="flex flex-col items-center">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-brand-orange/60 mb-0.5" />
            <span className="text-[9px] sm:text-[11px] font-bold text-brand-dark truncate max-w-full" title={recipe.flavor}>
              {recipe.flavor}
            </span>
            <span className="text-[7px] sm:text-[9px] text-brand-dark/40 uppercase font-mono tracking-wider sm:tracking-widest font-black">Flavor</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
