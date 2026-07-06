export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  prepTime: number; // in minutes
  cookTime: number; // in minutes
  servings: number;
  difficulty?: "Easy" | "Medium" | "Hard";
  spiceFactor: "None" | "Mild" | "Medium" | "Hot" | "Satisfactory";
  flavor: string;
  category: string;
  rating: number;
  ingredients: {
    name: string;
    amount: string;
    category?: string; // e.g., Produce, Meat, Pantry, Dairy
  }[];
  instructions: string[];
  nutritionalFacts: {
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
  };
  tags: string[];
  chefTip?: string;
  isAiGenerated?: boolean;
}

export interface MealPlan {
  day: string;
  breakfast?: Recipe | null;
  lunch?: Recipe | null;
  dinner?: Recipe | null;
  snacks?: Recipe | null;
}

export type MealPeriod = "breakfast" | "lunch" | "dinner" | "snacks";

export interface ShoppingItem {
  name: string;
  amount: string;
  checked: boolean;
  category: string;
}
