import React, { useState } from "react";
import { Clock, Users, Flame, Star, Check, X, ChefHat, Sparkles, Plus, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Recipe, MealPeriod } from "../types";

interface RecipeCardProps {
  key?: string | number | null;
  recipe: Recipe;
  onAddToPlanner?: (recipe: Recipe, period: MealPeriod, day: string) => void;
  showPlannerQuickAdd?: boolean;
  weatherMode?: "caribbean-sun" | "philippine-breeze";
  onHoverStart?: (recipe: Recipe) => void;
  onHoverEnd?: () => void;
}

const scaleAmount = (amountStr: string, originalServings: number, targetServings: number): string => {
  if (originalServings === targetServings) return amountStr;
  const ratio = targetServings / originalServings;
  
  const match = amountStr.match(/^(\d+[\d\/\.\s\-]*)\s*(.*)$/);
  if (!match) return amountStr;
  
  const numPart = match[1].trim();
  const unitPart = match[2] ? match[2].trim() : "";
  
  const parseFraction = (str: string): number => {
    if (str.includes('/')) {
      const parts = str.split('/');
      return parseFloat(parts[0]) / parseFloat(parts[1]);
    }
    return parseFloat(str);
  };
  
  function formatValue(val: number): string {
    if (Math.abs(val - Math.round(val)) < 0.01) return Math.round(val).toString();
    const fracs = [
      { d: 2, s: "1/2" },
      { d: 3, s: "1/3" },
      { d: 4, s: "1/4" },
      { d: 4, s: "3/4" },
      { d: 8, s: "1/8" },
      { d: 3, s: "2/3" },
    ];
    const decimal = val - Math.floor(val);
    if (decimal > 0.01) {
      for (const f of fracs) {
        if (Math.abs(decimal - (1 / f.d)) < 0.05) {
          const whole = Math.floor(val);
          return (whole > 0 ? `${whole} ` : "") + f.s;
        }
        if (Math.abs(decimal - (2 / f.d)) < 0.05 && f.d === 3) {
          const whole = Math.floor(val);
          return (whole > 0 ? `${whole} ` : "") + "2/3";
        }
        if (Math.abs(decimal - (3 / f.d)) < 0.05 && f.d === 4) {
          const whole = Math.floor(val);
          return (whole > 0 ? `${whole} ` : "") + "3/4";
        }
      }
    }
    return val.toFixed(1).replace(/\.0$/, "");
  }

  let value = 0;
  if (numPart.includes(' ')) {
    const parts = numPart.split(/\s+/);
    value = parts.reduce((acc, p) => acc + parseFraction(p), 0);
  } else if (numPart.includes('-')) {
    const parts = numPart.split('-');
    const scaledParts = parts.map(p => {
      const parsed = parseFraction(p);
      return isNaN(parsed) ? p : formatValue(parsed * ratio);
    });
    return `${scaledParts.join('-')} ${unitPart}`.trim();
  } else {
    value = parseFraction(numPart);
  }
  
  if (isNaN(value)) return amountStr;
  
  const newValue = value * ratio;
  return `${formatValue(newValue)} ${unitPart}`.trim();
};

export default function RecipeCard({ 
  recipe, 
  onAddToPlanner, 
  showPlannerQuickAdd = true,
  weatherMode = "caribbean-sun",
  onHoverStart,
  onHoverEnd
}: RecipeCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [checkedIngredients, setCheckedIngredients] = useState<Record<number, boolean>>({});
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [selectedPeriod, setSelectedPeriod] = useState<MealPeriod>("dinner");
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [currentServings, setCurrentServings] = useState<number>(Math.min(recipe.servings, 4));

  const isPR = weatherMode === "caribbean-sun";

  const toggleIngredient = (index: number) => {
    setCheckedIngredients((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const toggleStep = (index: number) => {
    setCompletedSteps((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const resetCookingProgress = () => {
    setCheckedIngredients({});
    setCompletedSteps({});
  };

  const handleQuickAdd = () => {
    if (onAddToPlanner) {
      onAddToPlanner(recipe, selectedPeriod, selectedDay);
      setShowAddMenu(false);
    }
  };

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const periods: { value: MealPeriod; label: string }[] = [
    { value: "breakfast", label: "Breakfast" },
    { value: "lunch", label: "Lunch" },
    { value: "dinner", label: "Dinner" },
    { value: "snacks", label: "Snack" },
  ];

  return (
    <>
      {/* Recipe Grid Thumbnail */}
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
          setIsOpen(true);
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

      {/* Expanded Recipe Details Modal with AnimatePresence */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              {/* Dark background overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 transition-opacity bg-brand-dark/60 backdrop-blur-xs"
                onClick={() => setIsOpen(false)}
              />

              {/* Trick the browser into centering the modal contents. */}
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

              <motion.div 
                initial={{ scale: 0.9, y: 30, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 30, opacity: 0 }}
                transition={{ type: "spring", stiffness: 180, damping: 18 }}
                className="inline-block align-bottom bg-brand-cream rounded-3xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full border-2 border-brand-border max-h-[90vh] flex flex-col"
              >
                {/* Header Visual with Close Button */}
                <div className="relative h-64 sm:h-80 w-full flex-shrink-0">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent" />
                  
                  <motion.button
                    id="close-recipe-modal"
                    onClick={() => setIsOpen(false)}
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute top-4 right-4 bg-brand-dark/80 hover:bg-brand-dark text-white p-2.5 rounded-full backdrop-blur-md border border-white/10 transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>

                  <div className="absolute bottom-6 left-6 right-6">
                    {recipe.isAiGenerated && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-1 bg-brand-orange text-white text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full mb-3 shadow-md"
                      >
                        <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                        <span>AI Culinary Creation</span>
                      </motion.div>
                    )}
                    <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tighter drop-shadow-xs uppercase">
                      {recipe.title}
                    </h2>
                    <p className="text-white/80 text-sm sm:text-base mt-2 max-w-2xl font-medium drop-shadow-xs leading-relaxed">
                      {recipe.description}
                    </p>
                  </div>
                </div>

                {/* Scrollable content section */}
                <div className="overflow-y-auto p-6 sm:p-8 flex-grow">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    {/* Left Column (8 cols): Ingredients & Instructions */}
                    <div className="md:col-span-8 space-y-8">
                      {/* Ingredients with interactive checklist */}
                      <div>
                        <div className="flex items-center justify-between border-b-2 border-brand-border pb-3 mb-4">
                          <h3 className="text-lg font-black text-brand-dark flex items-center gap-2">
                            <ChefHat className="w-5 h-5 text-brand-orange" />
                            <span>Ingredients Checklist</span>
                          </h3>
                          <span className="text-xs text-brand-dark/40 font-mono font-bold">
                            {Object.values(checkedIngredients).filter(Boolean).length} / {recipe.ingredients.length} checked
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {recipe.ingredients.map((ing, idx) => {
                            const isChecked = !!checkedIngredients[idx];
                            return (
                              <motion.div
                                key={idx}
                                id={`ing-item-${idx}`}
                                onClick={() => toggleIngredient(idx)}
                                whileHover={{ x: 4, scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                className={`flex items-start gap-3 p-3 rounded-xl border-2 transition-all cursor-pointer select-none ${
                                  isChecked
                                    ? "bg-brand-border/20 border-brand-border opacity-60 line-through text-brand-dark/40"
                                    : "bg-white border-brand-border hover:bg-brand-orange/5 hover:border-brand-orange/40 text-brand-dark"
                                }`}
                              >
                                <div className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                                  isChecked ? "bg-brand-orange border-brand-orange text-white" : "border-brand-orange/50 bg-white"
                                }`}>
                                  {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                                </div>
                                <div className="text-sm">
                                  <span className="font-bold">
                                    {scaleAmount(ing.amount, recipe.servings, currentServings)}
                                  </span>{" "}
                                  <span className="font-medium">{ing.name}</span>
                                  {ing.category && (
                                    <span className="block text-[9px] text-brand-dark/40 font-mono tracking-widest mt-0.5 uppercase font-bold">
                                      {ing.category}
                                    </span>
                                  )}
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Step-by-Step Instructions with checklist */}
                      <div>
                        <div className="flex items-center justify-between border-b-2 border-brand-border pb-3 mb-4">
                          <h3 className="text-lg font-black text-brand-dark flex items-center gap-2">
                            <Plus className="w-5 h-5 text-brand-orange rotate-45" />
                            <span>Step-by-Step Directions</span>
                          </h3>
                          <span className="text-xs text-brand-dark/40 font-mono font-bold">
                            {Object.values(completedSteps).filter(Boolean).length} / {recipe.instructions.length} done
                          </span>
                        </div>

                        <div className="space-y-4">
                          {recipe.instructions.map((step, idx) => {
                            const isDone = !!completedSteps[idx];
                            return (
                              <motion.div
                                key={idx}
                                id={`step-item-${idx}`}
                                onClick={() => toggleStep(idx)}
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                className={`flex gap-4 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                                  isDone
                                    ? "bg-brand-border/20 border-brand-border text-brand-dark/40"
                                    : "bg-white border-brand-border hover:border-brand-orange/30 text-brand-dark"
                                }`}
                              >
                                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-mono font-bold text-xs border transition-all ${
                                  isDone
                                    ? "bg-brand-border border-brand-border text-brand-dark/40"
                                    : "bg-brand-orange/10 border-brand-orange/20 text-brand-orange"
                                }`}>
                                  {isDone ? <Check className="w-4 h-4 stroke-[3]" /> : idx + 1}
                                </div>
                                <p className={`text-sm leading-relaxed font-medium ${isDone ? "line-through text-brand-dark/40" : ""}`}>
                                  {step}
                                </p>
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Right Column (4 cols): Nutrition, Meta & Quick Planner Add */}
                    <div className="md:col-span-4 space-y-6">
                      {/* Quick Metrics Grid */}
                      <motion.div 
                        whileHover={{ scale: 1.01 }}
                        className="bg-brand-border/20 border-2 border-brand-border rounded-2xl p-5"
                      >
                        <h4 className="text-xs font-black text-brand-dark/40 uppercase font-mono tracking-widest mb-4">Showcase Summary</h4>
                        <div className="space-y-3.5">
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-brand-dark/50 font-bold">Prep Time</span>
                            <span className="font-black text-brand-dark">{recipe.prepTime} mins</span>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-brand-dark/50 font-bold">Cook Time</span>
                            <span className="font-black text-brand-dark">{recipe.cookTime} mins</span>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <div className="flex flex-col">
                              <span className="text-brand-dark/50 font-bold">Servings</span>
                              <span className="text-[9px] text-brand-dark/30 italic">(Max 4 people)</span>
                            </div>
                            <div className="flex gap-1">
                              {[1, 2, 3, 4].map((s) => (
                                <button
                                  key={s}
                                  onClick={() => setCurrentServings(s)}
                                  className={`w-6 h-6 rounded-full text-[10px] font-black border flex items-center justify-center transition-all cursor-pointer ${
                                    currentServings === s
                                      ? "bg-brand-orange border-brand-orange text-white"
                                      : "bg-white border-brand-border text-brand-dark hover:bg-brand-orange/5"
                                  }`}
                                >
                                  {s}
                                </button>
                              ))}
                            </div>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-brand-dark/50 font-bold">Flavor</span>
                            <span className="font-black text-brand-dark text-right text-xs max-w-[150px] truncate" title={recipe.flavor}>
                              {recipe.flavor}
                            </span>
                          </div>
                        </div>
                      </motion.div>

                      {/* Nutrition Card */}
                      <motion.div 
                        whileHover={{ scale: 1.01 }}
                        className="bg-brand-teal/5 border-2 border-brand-border rounded-2xl p-5"
                      >
                        <h4 className="text-xs font-black text-brand-teal uppercase font-mono tracking-widest mb-4">Nutritional Intake</h4>
                        <div className="grid grid-cols-2 gap-3 text-center">
                          <div className="bg-white border-2 border-brand-border rounded-xl p-2.5 shadow-xs">
                            <span className="block text-[10px] text-brand-dark/40 font-mono tracking-widest uppercase font-black">CALORIES</span>
                            <span className="text-lg font-black text-brand-dark">{recipe.nutritionalFacts.calories}</span>
                          </div>
                          <div className="bg-white border-2 border-brand-border rounded-xl p-2.5 shadow-xs">
                            <span className="block text-[10px] text-brand-dark/40 font-mono tracking-widest uppercase font-black">PROTEIN</span>
                            <span className="text-lg font-black text-brand-dark">{recipe.nutritionalFacts.protein}</span>
                          </div>
                          <div className="bg-white border-2 border-brand-border rounded-xl p-2.5 shadow-xs">
                            <span className="block text-[10px] text-brand-dark/40 font-mono tracking-widest uppercase font-black">CARBS</span>
                            <span className="text-lg font-black text-brand-dark">{recipe.nutritionalFacts.carbs}</span>
                          </div>
                          <div className="bg-white border-2 border-brand-border rounded-xl p-2.5 shadow-xs">
                            <span className="block text-[10px] text-brand-dark/40 font-mono tracking-widest uppercase font-black">FAT</span>
                            <span className="text-lg font-black text-brand-dark">{recipe.nutritionalFacts.fat}</span>
                          </div>
                        </div>
                      </motion.div>

                      {/* Chef Tip Card */}
                      {recipe.chefTip && (
                        <motion.div 
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          whileHover={{ scale: 1.01 }}
                          className="bg-brand-orange/5 border-2 border-brand-border rounded-2xl p-5"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-base">💡</span>
                            <h4 className="text-xs font-black text-brand-orange uppercase font-mono tracking-widest">Chef's Secret Tip</h4>
                          </div>
                          <p className="text-xs sm:text-sm text-brand-dark/80 italic leading-relaxed font-semibold">
                            "{recipe.chefTip}"
                          </p>
                        </motion.div>
                      )}

                      {/* Quick Meal Planner Adding */}
                      {showPlannerQuickAdd && onAddToPlanner && (
                        <div className="border-2 border-brand-border rounded-2xl p-4 bg-white shadow-xs">
                          {!showAddMenu ? (
                            <motion.button
                              id="add-to-planner-btn"
                              onClick={() => setShowAddMenu(true)}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="w-full py-3 px-4 bg-brand-orange hover:bg-brand-orange/95 text-white font-black rounded-full text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-brand-orange/25"
                            >
                              <Calendar className="w-4 h-4" />
                              <span>Schedule into Meal Plan</span>
                            </motion.button>
                          ) : (
                            <motion.div 
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              className="space-y-3"
                            >
                              <h4 className="text-xs font-black text-brand-dark/50 font-mono uppercase tracking-widest">Add to Planner</h4>
                              
                              <div>
                                <label className="block text-[10px] text-brand-dark/40 font-black uppercase mb-1 font-mono tracking-widest">Select Day</label>
                                <select
                                  id="planner-day-select"
                                  value={selectedDay}
                                  onChange={(e) => setSelectedDay(e.target.value)}
                                  className="block w-full py-2.5 px-3 border-2 border-brand-border bg-white rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-brand-orange text-brand-dark font-bold"
                                >
                                  {days.map((d) => <option key={d} value={d}>{d}</option>)}
                                </select>
                              </div>

                              <div>
                                <label className="block text-[10px] text-brand-dark/40 font-black uppercase mb-1 font-mono tracking-widest">Select Meal</label>
                                <div className="grid grid-cols-2 gap-1.5">
                                  {periods.map((p) => (
                                    <motion.button
                                      key={p.value}
                                      id={`select-period-${p.value}`}
                                      onClick={() => setSelectedPeriod(p.value)}
                                      whileHover={{ scale: 1.03 }}
                                      whileTap={{ scale: 0.97 }}
                                      className={`py-1.5 px-2 rounded-lg text-[11px] font-black border-2 text-center cursor-pointer transition-all ${
                                        selectedPeriod === p.value
                                          ? "bg-brand-dark border-brand-dark text-white"
                                          : "bg-white border-brand-border text-brand-dark/70 hover:bg-brand-border/40"
                                      }`}
                                    >
                                      {p.label}
                                    </motion.button>
                                  ))}
                                </div>
                              </div>

                              <div className="flex gap-2 pt-2 border-t-2 border-brand-border">
                                <motion.button
                                  id="cancel-add-planner"
                                  onClick={() => setShowAddMenu(false)}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  className="w-1/2 py-2 border-2 border-brand-border text-brand-dark/70 hover:bg-brand-border/40 text-xs font-bold rounded-full cursor-pointer"
                                >
                                  Cancel
                                </motion.button>
                                <motion.button
                                  id="confirm-add-planner"
                                  onClick={handleQuickAdd}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  className="w-1/2 py-2 bg-brand-orange hover:bg-brand-orange/95 text-white text-xs font-bold rounded-full cursor-pointer shadow-md shadow-brand-orange/20"
                                >
                                  Confirm
                                </motion.button>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      )}

                      {/* Reset Cooking Progress */}
                      {(Object.keys(checkedIngredients).length > 0 || Object.keys(completedSteps).length > 0) && (
                        <motion.button
                          id="reset-progress-btn"
                          onClick={resetCookingProgress}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full py-2.5 border-2 border-brand-border text-brand-dark/60 hover:bg-brand-border/40 text-xs font-black rounded-full transition-all cursor-pointer font-mono uppercase tracking-wider"
                        >
                          Reset Progress
                        </motion.button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
