import { Recipe } from "../types";

export const CURATED_RECIPES: Recipe[] = [
  {
    id: "tuscan-chicken",
    title: "Creamy Tuscan Garlic Chicken",
    description: "Tender pan-seared chicken breasts smothered in a rich, creamy garlic sauce filled with fresh spinach and vibrant sun-dried tomatoes.",
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=800",
    prepTime: 10,
    cookTime: 20,
    servings: 4,
    difficulty: "Easy",
    spiceFactor: "None",
    category: "Mains",
    rating: 4.9,
    ingredients: [
      { name: "Chicken Breast", amount: "4 fillets", category: "Meat" },
      { name: "Olive Oil", amount: "2 tbsp", category: "Pantry" },
      { name: "Garlic", amount: "4 cloves, minced", category: "Produce" },
      { name: "Heavy Cream", amount: "1 cup", category: "Dairy" },
      { name: "Chicken Broth", amount: "1/2 cup", category: "Pantry" },
      { name: "Garlic Powder", amount: "1 tsp", category: "Pantry" },
      { name: "Italian Seasoning", amount: "1 tsp", category: "Pantry" },
      { name: "Parmesan Cheese", amount: "1/2 cup, grated", category: "Dairy" },
      { name: "Sun-dried Tomatoes", amount: "1/2 cup, drained", category: "Pantry" },
      { name: "Baby Spinach", amount: "2 cups, fresh", category: "Produce" }
    ],
    instructions: [
      "Season chicken breasts with garlic powder, Italian seasoning, salt, and pepper on both sides.",
      "Heat olive oil in a large skillet over medium-high heat. Sear the chicken for 5 minutes on each side until golden and cooked through. Remove chicken and set aside on a plate.",
      "In the same skillet, reduce heat to medium. Add minced garlic and sauté for 1 minute until fragrant.",
      "Pour in heavy cream, chicken broth, and grated Parmesan. Bring to a simmer and let it cook for 3 minutes until slightly thickened.",
      "Stir in sun-dried tomatoes and baby spinach. Simmer for 2 minutes until the spinach is wilted.",
      "Return the seared chicken back into the skillet, spoon the creamy sauce over the fillets, and simmer for another 2 minutes until hot. Serve immediately!"
    ],
    nutritionalFacts: {
      calories: 420,
      protein: "38g",
      carbs: "6g",
      fat: "28g"
    },
    tags: ["Creamy", "Garlic", "Tuscan", "Low-Carb", "Chicken"],
    chefTip: "For an extra layer of depth, use the aromatic oil from the sun-dried tomatoes jar to sear the chicken instead of regular olive oil!"
  },
  {
    id: "pan-seared-salmon",
    title: "Lemon-Herb Pan-Seared Salmon",
    description: "Perfectly crispy-skin salmon fillets basted in a rich lemon-herb butter sauce. Elegant, nutritious, and ready in under 20 minutes.",
    image: "https://images.unsplash.com/photo-1485921325833-c519f76c4927?auto=format&fit=crop&q=80&w=800",
    prepTime: 5,
    cookTime: 12,
    servings: 2,
    difficulty: "Medium",
    spiceFactor: "Mild",
    category: "Mains",
    rating: 4.8,
    ingredients: [
      { name: "Salmon Fillets", amount: "2 skin-on fillets", category: "Seafood" },
      { name: "Butter", amount: "3 tbsp", category: "Dairy" },
      { name: "Olive Oil", amount: "1 tbsp", category: "Pantry" },
      { name: "Fresh Dill", amount: "2 tbsp, chopped", category: "Produce" },
      { name: "Lemon", amount: "1 large, juiced and zested", category: "Produce" },
      { name: "Garlic", amount: "2 cloves, smashed", category: "Produce" },
      { name: "Sea Salt & Black Pepper", amount: "To taste", category: "Pantry" }
    ],
    instructions: [
      "Pat salmon fillets completely dry with paper towels. Dry skin is the secret to a perfect crispy crust. Season generously with sea salt and black pepper.",
      "Heat olive oil and 1 tablespoon of butter in a cast-iron skillet over medium-high heat until hot but not smoking.",
      "Place salmon fillets skin-side down in the hot skillet. Press gently with a spatula for 10 seconds to prevent curling. Cook undisturbed for 5-6 minutes until skin is super crispy.",
      "Flip the fillets carefully. Reduce heat to medium and add the remaining 2 tablespoons of butter, smashed garlic, and fresh dill to the pan.",
      "Squeeze lemon juice over the fish and spoon the melted foaming butter continuously over the salmon (basting) for another 3-4 minutes until the inside is medium-rare.",
      "Transfer to plates, pour the pan sauce over the fillets, garnish with lemon zest, and serve with roasted asparagus or greens."
    ],
    nutritionalFacts: {
      calories: 380,
      protein: "34g",
      carbs: "2g",
      fat: "26g"
    },
    tags: ["Seafood", "Crispy Skin", "Lemon Butter", "Healthy", "Keto"],
    chefTip: "Always let your salmon sit at room temperature for 10 minutes before cooking. Cold salmon will drop the pan temperature and won't get that ideal sear."
  },
  {
    id: "classic-margherita",
    title: "Classic Italian Margherita Pizza",
    description: "The ultimate Neapolitan classic. A thin, crispy artisan crust topped with zesty tomato sauce, fresh buffalo mozzarella, and fresh basil leaves.",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800",
    prepTime: 15,
    cookTime: 8,
    servings: 3,
    difficulty: "Medium",
    spiceFactor: "None",
    category: "Mains",
    rating: 4.9,
    ingredients: [
      { name: "Pizza Dough", amount: "1 store-bought or homemade ball", category: "Bakery" },
      { name: "San Marzano Tomatoes", amount: "1 cup, crushed", category: "Pantry" },
      { name: "Buffalo Mozzarella", amount: "150g, sliced", category: "Dairy" },
      { name: "Fresh Basil Leaves", amount: "10-12 leaves", category: "Produce" },
      { name: "Extra Virgin Olive Oil", amount: "1 tbsp", category: "Pantry" },
      { name: "Sea Salt", amount: "1/2 tsp", category: "Pantry" }
    ],
    instructions: [
      "Preheat your oven to its absolute highest setting (ideally 250°C/500°F) with a pizza stone or baking sheet inside on the top rack.",
      "Stretch the pizza dough on a floured surface using your hands into a 12-inch round. Avoid a rolling pin to keep air bubbles in the crust.",
      "Spread the crushed San Marzano tomatoes evenly over the dough, leaving a 1/2-inch border for the crust.",
      "Arrange the fresh buffalo mozzarella slices on top of the tomato sauce.",
      "Drizzle with extra virgin olive oil and sprinkle with a pinch of sea salt.",
      "Carefully transfer the pizza onto the preheated stone. Bake for 7-9 minutes until the crust is charred and puffy, and the cheese is bubbling and golden.",
      "Immediately top with fresh whole basil leaves and slice. Serve hot!"
    ],
    nutritionalFacts: {
      calories: 310,
      protein: "14g",
      carbs: "42g",
      fat: "10g"
    },
    tags: ["Italian", "Pizza", "Vegetarian", "Classic", "Baking"],
    chefTip: "Drain your fresh mozzarella on paper towels for 30 minutes before placing it on the pizza. This prevents the pizza from becoming soggy during baking!"
  },
  {
    id: "quinoa-avocado-salad",
    title: "Vibrant Quinoa Avocado Salad",
    description: "A colorful, crisp superfood bowl loaded with protein-packed quinoa, creamy avocado chunks, juicy tomatoes, and a bright lime-cilantro vinaigrette.",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=800",
    prepTime: 10,
    cookTime: 15,
    servings: 2,
    difficulty: "Easy",
    spiceFactor: "None",
    category: "Salads",
    rating: 4.7,
    ingredients: [
      { name: "Quinoa", amount: "1/2 cup, uncooked", category: "Pantry" },
      { name: "Avocado", amount: "1 large, diced", category: "Produce" },
      { name: "Cherry Tomatoes", amount: "1 cup, halved", category: "Produce" },
      { name: "Cucumber", amount: "1/2, diced", category: "Produce" },
      { name: "Black Beans", amount: "1/2 cup, rinsed", category: "Pantry" },
      { name: "Cilantro", amount: "1/4 cup, chopped", category: "Produce" },
      { name: "Lime", amount: "1 juiced", category: "Produce" },
      { name: "Olive Oil", amount: "2 tbsp", category: "Pantry" },
      { name: "Cumin", amount: "1/2 tsp", category: "Pantry" }
    ],
    instructions: [
      "Rinse the quinoa thoroughly. In a small pot, bring 1 cup of salted water to a boil, stir in quinoa, cover, reduce heat, and simmer for 15 minutes. Fluff with a fork and let cool.",
      "In a large serving bowl, combine the cooled quinoa, black beans, diced cucumber, halved cherry tomatoes, and chopped cilantro.",
      "In a small jar, whisk together the fresh lime juice, olive oil, ground cumin, salt, and pepper to make the vinaigrette dressing.",
      "Just before serving, gently fold in the diced avocado to keep it from mashing.",
      "Drizzle the dressing over the salad, toss gently to combine, and garnish with extra cilantro leaves."
    ],
    nutritionalFacts: {
      calories: 290,
      protein: "8g",
      carbs: "32g",
      fat: "15g"
    },
    tags: ["Vegan", "Gluten-Free", "Superfood", "Healthy", "Salad"],
    chefTip: "Toast your dry quinoa in a dry pan for 2 minutes before adding water. This unleashes a wonderful nutty flavor that makes the salad taste premium!"
  },
  {
    id: "thai-green-curry",
    title: "Authentic Thai Green Curry",
    description: "An aromatic, mildly spicy curry with a rich coconut milk base, tender tofu or chicken, bamboo shoots, and fresh Thai sweet basil.",
    image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&q=80&w=800",
    prepTime: 15,
    cookTime: 15,
    servings: 3,
    difficulty: "Medium",
    spiceFactor: "Satisfactory",
    category: "Mains",
    rating: 4.8,
    ingredients: [
      { name: "Green Curry Paste", amount: "3 tbsp", category: "Pantry" },
      { name: "Coconut Milk", amount: "1 can (400ml)", category: "Pantry" },
      { name: "Extra Firm Tofu", amount: "250g, cubed", category: "Produce" },
      { name: "Bell Pepper", amount: "1, sliced", category: "Produce" },
      { name: "Bamboo Shoots", amount: "1/2 cup, drained", category: "Pantry" },
      { name: "Fish Sauce (or Soy Sauce)", amount: "2 tbsp", category: "Pantry" },
      { name: "Brown Sugar", amount: "1 tbsp", category: "Pantry" },
      { name: "Thai Basil Leaves", amount: "1/2 cup", category: "Produce" },
      { name: "Kaffir Lime Leaves", amount: "3 leaves, torn", category: "Produce" }
    ],
    instructions: [
      "In a deep saucepan or wok over medium heat, skim 2-3 tablespoons of the thick cream from the top of the coconut milk can and heat until it starts sizzling and frying.",
      "Add the Thai green curry paste directly to the sizzling coconut cream. Fry for 2-3 minutes, stirring constantly, until highly fragrant.",
      "Slowly whisk in the rest of the coconut milk, kaffir lime leaves, brown sugar, and soy/fish sauce. Bring to a gentle boil.",
      "Stir in the cubed tofu, sliced bell peppers, and bamboo shoots. Reduce heat to a simmer and cook for 7-8 minutes until vegetables are tender-crisp.",
      "Remove from heat. Tear in the fresh Thai sweet basil leaves and stir. Serve hot with fragrant jasmine rice."
    ],
    nutritionalFacts: {
      calories: 340,
      protein: "11g",
      carbs: "18g",
      fat: "26g"
    },
    tags: ["Thai", "Aromatic", "Curry", "Spicy", "Vegetarian"],
    chefTip: "Always tear the kaffir lime leaves and remove the central rib before throwing them into the curry — this releases the maximum citrusy aromatic oils."
  },
  {
    id: "chocolate-lava-cake",
    title: "Molten Chocolate Lava Cake",
    description: "Decadent individual chocolate cakes with rich, liquid chocolate centers that flow out beautifully at the first touch of a spoon.",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=800",
    prepTime: 10,
    cookTime: 13,
    servings: 2,
    difficulty: "Hard",
    spiceFactor: "None",
    category: "Desserts",
    rating: 4.9,
    ingredients: [
      { name: "Dark Chocolate (70%)", amount: "100g, chopped", category: "Pantry" },
      { name: "Butter", amount: "1/2 cup", category: "Dairy" },
      { name: "Whole Eggs", amount: "2 large", category: "Dairy" },
      { name: "Egg Yolks", amount: "2 large", category: "Dairy" },
      { name: "Sugar", amount: "1/4 cup", category: "Pantry" },
      { name: "All-Purpose Flour", amount: "3 tbsp", category: "Pantry" },
      { name: "Cocoa Powder", amount: "1 tbsp (for dusting)", category: "Pantry" }
    ],
    instructions: [
      "Preheat your oven to 200°C (400°F). Butter two 6-ounce ramekins generously. Dust the inside of each ramekin with cocoa powder, tapping out any excess.",
      "In a heatproof bowl set over a pot of barely simmering water (or in the microwave), melt the chopped dark chocolate and butter together until smooth. Let cool slightly.",
      "In a medium bowl, use an electric mixer or whisk to beat the whole eggs, egg yolks, and sugar together until light, thick, and pale yellow (about 3 minutes).",
      "Gently fold the melted chocolate mixture and the sifted flour into the beaten eggs using a rubber spatula until just combined. Do not overmix.",
      "Divide the chocolate batter evenly between the two prepared ramekins.",
      "Bake for 12-14 minutes. The edges should be firm and set, but the absolute center should still jiggle slightly.",
      "Remove from the oven and let cool in the ramekins for 1 minute. Place an inverted dessert plate over each ramekin, carefully flip, and gently lift the ramekin. Serve with vanilla ice cream and fresh berries!"
    ],
    nutritionalFacts: {
      calories: 490,
      protein: "8g",
      carbs: "39g",
      fat: "34g"
    },
    tags: ["Chocolate", "Dessert", "Indulgent", "Baking", "Lava Cake"],
    chefTip: "Do not skip cocoa powder dusting! It prevents the cake from sticking to the ramekin and keeps the surface beautiful without leaving white flour residues."
  }
];
