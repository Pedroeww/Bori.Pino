import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const PORT = 3000;

// Initialize GoogleGenAI client lazy-style to prevent immediate crash if key is missing during startup
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required. Please set it in Settings > Secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // AI Recipe Generator Endpoint
  app.post("/api/recipe/generate", async (req, res) => {
    const { ingredients, diet, mealType, customRequest } = req.body;

    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
      res.status(400).json({ error: "At least one ingredient is required." });
      return;
    }

    try {
      const ai = getAiClient();
      
      const prompt = `Create a real, delicious, high-quality recipe using some or all of these primary ingredients: ${ingredients.join(", ")}.
Dietary restriction preference: ${diet || "None"}.
Meal type requested: ${mealType || "Any"}.
Additional notes or customizations: ${customRequest || "None"}.

Make sure the recipe is culinary-accurate, delicious, and easy to follow. Provide appropriate measurements, reasonable cooking steps, and helpful chef advice. Make it professional and appetizing.`;

      const systemInstruction = "You are an expert chef and culinary expert. Your goal is to generate delicious, accurate recipes tailored to user ingredients and dietary needs. Output detailed recipe data structures in strict JSON format.";

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING, description: "Catchy, professional, and culinary name of the recipe." },
              description: { type: Type.STRING, description: "A highly appetizing and short mouth-watering description (1-2 sentences)." },
              prepTime: { type: Type.INTEGER, description: "Preparation time in minutes." },
              cookTime: { type: Type.INTEGER, description: "Cooking time in minutes." },
              servings: { type: Type.INTEGER, description: "Number of servings, typically 2 or 4." },
              difficulty: { type: Type.STRING, description: "Must be exactly 'Easy', 'Medium', or 'Hard'." },
              ingredients: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING, description: "Name of the ingredient (e.g., olive oil, chicken breast)." },
                    amount: { type: Type.STRING, description: "The amount with measurements (e.g., 2 tbsp, 450g)." },
                    category: { type: Type.STRING, description: "Must be one of: 'Produce', 'Meat', 'Dairy', 'Bakery', 'Pantry', 'Seafood', 'Other'." }
                  },
                  required: ["name", "amount", "category"]
                }
              },
              instructions: {
                type: Type.ARRAY,
                items: { type: Type.STRING, description: "Clear, sequential, actionable instruction steps." }
              },
              nutritionalFacts: {
                type: Type.OBJECT,
                properties: {
                  calories: { type: Type.INTEGER, description: "Calories per serving." },
                  protein: { type: Type.STRING, description: "Protein content per serving (e.g., '24g')." },
                  carbs: { type: Type.STRING, description: "Carbohydrates content per serving (e.g., '12g')." },
                  fat: { type: Type.STRING, description: "Fat content per serving (e.g., '8g')." }
                },
                required: ["calories", "protein", "carbs", "fat"]
              },
              chefTip: { type: Type.STRING, description: "A pro-chef tip to enhance flavor, prep ahead, or substitute ingredients easily." },
              tags: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            },
            required: ["title", "description", "prepTime", "cookTime", "servings", "difficulty", "ingredients", "instructions", "nutritionalFacts", "chefTip", "tags"]
          }
        }
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error("No response content from Gemini.");
      }

      const recipeData = JSON.parse(responseText.trim());
      res.json({ recipe: recipeData });
    } catch (error: any) {
      console.error("Gemini recipe generation error:", error);
      res.status(500).json({ 
        error: error.message || "Failed to generate recipe.",
        details: error.stack || ""
      });
    }
  });

  // Serve static files in production, use Vite middleware in development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // For React SPA fallback, Express v4 is app.get('*', ...)
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
