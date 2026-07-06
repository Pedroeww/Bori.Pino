import { Recipe } from "../types";

export const CURATED_RECIPES: Recipe[] = [
  {
    id: "tembleque",
    title: "Tembleque",
    description: "A rich Traditional Puerto Rican Dessert consisting of a silky-smooth, creamy coconut pudding. This Tropical Dessert got its name from the Spanish word “Temblar” Which means to tremble or shake. Which References the desserts signature jiggle.",
    image: "https://i.imgur.com/lh89B9G.jpeg",
    prepTime: 10,
    cookTime: 15,
    servings: 6,
    difficulty: "Easy",
    spiceFactor: "None",
    flavor: "Sweet & Creamy Coconut",
    category: "Desserts",
    rating: 4.9,
    ingredients: [
      { name: "Coconut Milk", amount: "2 cans (13.5 oz each)", category: "Pantry" },
      { name: "Cornstarch", amount: "1/2 cup", category: "Pantry" },
      { name: "Sugar", amount: "2/3 cup", category: "Pantry" },
      { name: "Salt", amount: "1/4 tsp", category: "Pantry" },
      { name: "Orange Blossom Water (optional)", amount: "1 tsp", category: "Pantry" },
      { name: "Ground Cinnamon", amount: "For dusting", category: "Pantry" }
    ],
    instructions: [
      "In a medium saucepan, whisk together the cornstarch, sugar, and salt.",
      "Slowly pour in the coconut milk while whisking continuously to ensure the cornstarch dissolves completely without any lumps.",
      "Place the saucepan over medium heat. Cook, stirring constantly with a wooden spoon or silicone spatula, making sure to scrape the bottom and sides of the pan.",
      "As it heats (about 8-10 minutes), the mixture will suddenly thicken into a smooth, glossy paste. Once it starts bubbling, reduce heat to low and cook for 2 more minutes, stirring vigorously.",
      "Remove from heat and stir in the orange blossom water if using.",
      "Rinse your molds or ramekins with cold water (do not dry them; the moisture helps unmold the pudding). Pour the hot pudding mixture into the molds.",
      "Let cool to room temperature, then cover with plastic wrap and refrigerate for at least 3-4 hours (or overnight) until completely set and cold.",
      "To serve, gently press the edges of the pudding to release the vacuum, invert onto a dessert plate, and tap. Dust generously with ground cinnamon and watch it jiggle!"
    ],
    nutritionalFacts: {
      calories: 220,
      protein: "2g",
      carbs: "28g",
      fat: "12g"
    },
    tags: ["Puerto Rican", "Dessert", "Coconut", "Vegan", "Gluten-Free", "Jiggle"],
    chefTip: "Rinsing the molds with cold water before pouring in the warm pudding creates a micro-barrier of water that makes unmolding the Tembleque incredibly easy without ruining its smooth, glassy surface!"
  },
  {
    id: "pastelon",
    title: "Pastelon",
    description: "A savory & sweet casserole with layers of fried sweet plantains & flavorful ground beef filling. Since it is topped with cheese & stacked like a lasagna. It has been given the nickname “The Puerto Rican Lasagna”",
    image: "https://i.imgur.com/SxsIXtN.jpeg",
    prepTime: 20,
    cookTime: 40,
    servings: 8,
    difficulty: "Medium",
    spiceFactor: "None",
    flavor: "Sweet & Savory Beef",
    category: "Mains",
    rating: 4.9,
    ingredients: [
      { name: "Sweet Yellow Plantains (very ripe, black spots)", amount: "4-5 large", category: "Produce" },
      { name: "Ground Beef", amount: "1 lb", category: "Meat" },
      { name: "Sofrito", amount: "1/4 cup", category: "Produce" },
      { name: "Tomato Sauce", amount: "8 oz", category: "Pantry" },
      { name: "Alcaparrado (pitted olives & capers)", amount: "2 tbsp", category: "Pantry" },
      { name: "Sazon Seasoning with Culantro & Achiote", amount: "1 packet", category: "Pantry" },
      { name: "Adobo Seasoning", amount: "1 tsp", category: "Pantry" },
      { name: "Mozzarella or Cheddar Cheese (shredded)", amount: "2 cups", category: "Dairy" },
      { name: "Eggs (beaten)", amount: "3 large", category: "Dairy" },
      { name: "Vegetable Oil", amount: "For frying", category: "Pantry" }
    ],
    instructions: [
      "Prepare the Picadillo: In a large skillet over medium-high heat, brown the ground beef. Drain excess fat. Stir in sofrito, tomato sauce, alcaparrado, sazon, and adobo. Simmer on low for 15-20 minutes until the flavors fuse and the beef is moist but not runny.",
      "Prepare the Plantains: Peel the ripe plantains and slice them lengthwise into 1/4-inch thin strips.",
      "Fry the Plantains: In a skillet with hot vegetable oil, fry the plantain strips over medium heat for 2-3 minutes per side until golden brown and soft. Drain on paper towels.",
      "Assemble the Casserole: Preheat oven to 350°F (175°C). Grease a 9x13 baking dish.",
      "Create the first layer by arranging fried sweet plantain strips tightly to cover the bottom of the dish.",
      "Spread half of the beaten egg over the plantains (this acts as a binder to hold the layers together).",
      "Spread the cooked ground beef picadillo evenly over the plantain layer, then sprinkle with half of the shredded cheese.",
      "Create the final layer of sweet plantains on top, then pour the remaining beaten egg evenly over the top.",
      "Bake: Bake for 25-30 minutes. In the last 5 minutes, sprinkle the remaining cheese over the top and bake until melted and bubbling.",
      "Rest and Serve: Allow the Pastelon to cool and rest for 10-15 minutes before slicing so the lasagna-like layers set beautifully!"
    ],
    nutritionalFacts: {
      calories: 450,
      protein: "24g",
      carbs: "38g",
      fat: "22g"
    },
    tags: ["Puerto Rican", "Lasagna", "Beef", "Plantain", "Savory-Sweet", "Baking"],
    chefTip: "Make sure your plantains are extremely ripe—with skin that is almost completely black! The sweet, caramelized flavor of super-ripe plantains is absolutely essential to balance the rich, savory picadillo beef."
  },
  {
    id: "alcapurria",
    title: "Alcapurria",
    description: "A well known fried delicacy of Puerto Rico that’s found on the menu of most, if not all cuchifrito spots! A combination of mashed green plantains and grated yautia, stuffed with a savory mixture of ground meat. It’s carefully formed into a cylinder shape & deep-fried until crisp.",
    image: "https://i.imgur.com/DKMDfl3.jpeg",
    prepTime: 30,
    cookTime: 20,
    servings: 8,
    difficulty: "Hard",
    spiceFactor: "None",
    flavor: "Rich & Savory Garlicky",
    category: "Mains",
    rating: 4.9,
    ingredients: [
      { name: "Yautia (Taro Root), peeled", amount: "2 lbs", category: "Produce" },
      { name: "Green Plantains, peeled", amount: "2 large", category: "Produce" },
      { name: "Achiote Oil (for color and flavor)", amount: "2 tbsp", category: "Pantry" },
      { name: "Salt", amount: "1.5 tsp", category: "Pantry" },
      { name: "Ground Beef or Pork (for picadillo filling)", amount: "1 lb", category: "Meat" },
      { name: "Sofrito", amount: "1/4 cup", category: "Produce" },
      { name: "Tomato Sauce", amount: "1/2 cup", category: "Pantry" },
      { name: "Pitted Green Olives, chopped", amount: "2 tbsp", category: "Pantry" },
      { name: "Vegetable Oil (for deep frying)", amount: "4 cups", category: "Pantry" }
    ],
    instructions: [
      "Prepare the Picadillo: In a skillet, brown the ground meat. Stir in sofrito, tomato sauce, and chopped olives. Simmer over medium-low heat for 15 minutes until flavors fuse and the liquid reduces. Let cool completely before assembling.",
      "Prepare the Masa: Peel the yautia and green plantains. Using the finest side of a box grater (or a specialized food processor disc), grate both into a very smooth, fine paste.",
      "Season the Masa: Mix the grated paste with achiote oil and salt until a uniform, bright orange-yellow color is achieved.",
      "Form the Alcapurria: Spread 2-3 tablespoons of the seasoned masa onto a greased piece of parchment paper, sea grape leaf, or plastic wrap, forming a flat oval.",
      "Stuff the Masa: Place 1 tablespoon of the cooled picadillo filling in the center of the masa.",
      "Shape the Cylinder: Carefully fold the paper/wrap over, using it to encase the meat entirely in the masa, forming a smooth, uniform cylinder (about 5-6 inches long).",
      "Deep Fry: Slide the alcapurria gently from the paper into deep hot vegetable oil (375°F / 190°C). Fry for about 7-8 minutes per side, turning carefully, until deep golden brown and crispy.",
      "Drain and Serve: Drain on paper towels and let cool for 2-3 minutes. Enjoy hot and crispy!"
    ],
    nutritionalFacts: {
      calories: 320,
      protein: "14g",
      carbs: "26g",
      fat: "18g"
    },
    tags: ["Puerto Rican", "Fritter", "Cuchifrito", "Beef", "Crispy", "Yautia", "Plantain"],
    chefTip: "The secret to a perfect alcapurria is making sure the meat filling is completely cooled down before shaping, and frying them in small batches so the oil temperature doesn't drop. If the oil is too cold, the alcapurria will absorb excess oil and fall apart!"
  },
  {
    id: "lumpia",
    title: "Lumpia",
    description: "A traditional filipino appetizer also referenced as fried spring rolls. They’re made with paper-thin lumpia wrappers and filled with a savory mixture of ground meat, cabbage and other delicious vegetables.",
    image: "https://i.imgur.com/58fLlWr.jpeg",
    prepTime: 25,
    cookTime: 15,
    servings: 10,
    difficulty: "Medium",
    spiceFactor: "None",
    flavor: "Crispy Savory Umami",
    category: "Appetizers",
    rating: 4.9,
    ingredients: [
      { name: "Ground Pork or Beef", amount: "1 lb", category: "Meat" },
      { name: "Cabbage, finely shredded", amount: "1 cup", category: "Produce" },
      { name: "Carrots, finely minced or grated", amount: "1/2 cup", category: "Produce" },
      { name: "Garlic, minced", amount: "3 cloves", category: "Produce" },
      { name: "Onion, finely chopped", amount: "1 medium", category: "Produce" },
      { name: "Soy Sauce", amount: "1 tbsp", category: "Pantry" },
      { name: "Sesame Oil", amount: "1 tsp", category: "Pantry" },
      { name: "Lumpia Wrappers (paper-thin)", amount: "30 sheets", category: "Pantry" },
      { name: "Egg (beaten, for sealing)", amount: "1 large", category: "Dairy" },
      { name: "Vegetable Oil", amount: "For deep frying", category: "Pantry" }
    ],
    instructions: [
      "In a large bowl, combine the ground meat, shredded cabbage, carrots, minced garlic, onion, soy sauce, sesame oil, salt, and pepper. Mix thoroughly until well combined.",
      "Carefully peel apart the paper-thin lumpia wrappers and place them on a flat surface, covered with a damp towel to prevent them from drying out.",
      "Place 1 to 1.5 tablespoons of the meat filling near the bottom edge of a wrapper, shaping it into a thin log.",
      "Fold the bottom corner up tightly over the filling, then fold in the left and right sides toward the center.",
      "Roll the wrapper tightly toward the top corner. Lightly dab the top corner with the beaten egg to seal the roll securely.",
      "Repeat the rolling process for all remaining filling and wrappers.",
      "Heat vegetable oil in a deep pan or wok to 350°F (175°C).",
      "Gently slide the lumpia into the hot oil in batches. Deep-fry for 4-5 minutes, turning occasionally, until the wrappers are crispy and beautifully golden brown, and the meat inside is fully cooked.",
      "Remove the lumpia and drain on a wire rack or paper towels.",
      "Serve hot with sweet chili sauce or a spicy garlic vinegar dipping sauce!"
    ],
    nutritionalFacts: {
      calories: 150,
      protein: "8g",
      carbs: "12g",
      fat: "7g"
    },
    tags: ["Filipino", "Appetizer", "Pork", "Crispy", "Spring Roll", "Snack", "Deep-Fried"],
    chefTip: "Keep your lumpia wrappers covered with a clean damp cloth while rolling! If the wrappers dry out, they will become brittle and rip or burst open during frying. To get the crispiest shell, fry them directly from frozen if you pre-made and froze them!"
  },
  {
    id: "calamansi-lemonade",
    title: "Calamansi Lemonade",
    description: "Traditional & Passion Fruit always available to order with our weekly menu!",
    image: "https://i.imgur.com/gZWAKKQ.jpeg",
    prepTime: 5,
    cookTime: 0,
    servings: 4,
    difficulty: "Easy",
    spiceFactor: "None",
    flavor: "Tangy & Sweet Citrus",
    category: "Drinks",
    rating: 4.9,
    ingredients: [
      { name: "Calamansi Juice (freshly squeezed)", amount: "1/2 cup", category: "Produce" },
      { name: "Water", amount: "4 cups", category: "Pantry" },
      { name: "Simple Syrup or Honey", amount: "1/2 cup (to taste)", category: "Pantry" },
      { name: "Passion Fruit Pulp or Puree (optional)", amount: "1/4 cup", category: "Produce" },
      { name: "Ice Cubes", amount: "As needed", category: "Pantry" },
      { name: "Calamansi Halves & Mint Leaves", amount: "For garnish", category: "Produce" }
    ],
    instructions: [
      "Squeeze fresh calamansi juice into a pitcher, discarding the seeds but keeping some pulp if desired.",
      "Add 4 cups of cold water.",
      "Pour in the simple syrup or honey, and stir vigorously until fully dissolved.",
      "For the Passion Fruit option: Stir in the passion fruit pulp or puree to infuse the tropical aroma and tanginess.",
      "Fill glasses with ice cubes and pour the calamansi lemonade over.",
      "Garnish with calamansi halves and a sprig of fresh mint. Serve chilled!"
    ],
    nutritionalFacts: {
      calories: 80,
      protein: "0g",
      carbs: "21g",
      fat: "0g"
    },
    tags: ["Filipino", "Drink", "Calamansi", "Beverage", "Refreshing", "Sweet-Sour", "Passion Fruit"],
    chefTip: "Roll the calamansi fruit firmly against the counter before slicing them in half—this breaks down the inner membranes and makes them yield much more juice!"
  },
  {
    id: "longanisa-pastelillos",
    title: "Longanisa Pastelillos",
    description: "A crispy Puerto Rican pastry filled with savory, seasoned longanisa sausage. Wrapped in a flaky pastry shell and deep fried until perfectly golden, each bite delivers a delicious balance of buttery crunch and rich, flavorful filling. A popular Puerto Rican snack that's perfect as an appetizer or a satisfying grab-and-go treat.",
    image: "https://i.imgur.com/jsLFC4Y.jpeg",
    prepTime: 15,
    cookTime: 15,
    servings: 10,
    difficulty: "Easy",
    spiceFactor: "Mild",
    flavor: "Sweet, Garlic & Savory",
    category: "Appetizers",
    rating: 4.9,
    ingredients: [
      { name: "Longanisa Sausage (casings removed, chopped)", amount: "1 lb", category: "Meat" },
      { name: "Pastelillo or Empanada Discs (thawed)", amount: "10 discs", category: "Pantry" },
      { name: "Sofrito", amount: "2 tbsp", category: "Produce" },
      { name: "Tomato Sauce", amount: "1/4 cup", category: "Pantry" },
      { name: "Adobo Seasoning", amount: "1/2 tsp", category: "Pantry" },
      { name: "Sazon with Culantro & Achiote", amount: "1/2 packet", category: "Pantry" },
      { name: "Mozzarella or Cheddar Cheese (shredded, optional)", amount: "1 cup", category: "Dairy" },
      { name: "Vegetable Oil (for frying)", amount: "3 cups", category: "Pantry" }
    ],
    instructions: [
      "Prepare the Sausage Filling: In a medium skillet over medium heat, brown the longanisa sausage meat, breaking it apart with a spatula. Stir in the sofrito, tomato sauce, adobo, and sazon.",
      "Simmer the mixture on low for 10 minutes until the filling is savory and slightly dry. Let it cool completely before assembling.",
      "Lay Out the Discs: Separate the empanada/pastelillo discs on a clean flat surface. If needed, gently roll them out slightly thinner with a rolling pin.",
      "Fill the Pastelillos: Place 1.5 to 2 tablespoons of the cooled longanisa filling in the center of each disc. If using cheese, add a small pinch on top of the filling.",
      "Fold and Seal: Fold the dough disc in half over the filling, creating a half-moon shape. Moisten the inside edges with a dab of water.",
      "Crimp the Edges: Use the tines of a fork to press down firmly along the curved edge of the pastry, sealing the filling securely inside.",
      "Deep Fry: Heat vegetable oil in a deep pan to 375°F (190°C). Slide the pastelillos gently into the hot oil in batches.",
      "Fry until Golden: Fry for about 2-3 minutes per side, flipping once, until the shells are blistered, crispy, and beautifully golden brown.",
      "Drain and Serve: Drain on paper towels and let cool for 2 minutes before serving. Enjoy hot, crispy, and flaky!"
    ],
    nutritionalFacts: {
      calories: 280,
      protein: "12g",
      carbs: "22g",
      fat: "16g"
    },
    tags: ["Puerto Rican", "Filipino-Influence", "Longanisa", "Sausage", "Pastelillo", "Crispy", "Empanada", "Appetizer"],
    chefTip: "Keep the sausage filling relatively dry when cooking, as excess grease or sauce will steam inside the pastry and make it soggy rather than crispy. If your filling seems oily, drain it well before folding!"
  },
  {
    id: "chicken-inasal-skewer",
    title: "Chicken Inasal Skewer",
    description: "A Filipino street food favorite made with tender chicken marinated in a blend of citrus, garlic, soy sauce, and traditional spices. Grilled over an open flame until lightly charred and juicy, these flavorful skewers are served with a tangy dipping sauce for the perfect balance of smoky, savory, and citrusy flavors.",
    image: "https://i.imgur.com/wufF2zG.jpeg",
    prepTime: 20,
    cookTime: 15,
    servings: 6,
    difficulty: "Medium",
    spiceFactor: "None",
    flavor: "Citrus, Garlic & Smoky",
    category: "Mains",
    rating: 4.9,
    ingredients: [
      { name: "Chicken Thighs (boneless, cut into bite-sized pieces)", amount: "1.5 lbs", category: "Meat" },
      { name: "Calamansi or Lime Juice", amount: "1/4 cup", category: "Produce" },
      { name: "Garlic, finely minced", amount: "6 cloves", category: "Produce" },
      { name: "Lemongrass (finely minced, white parts only)", amount: "2 stalks", category: "Produce" },
      { name: "Ginger, finely grated", amount: "1 tbsp", category: "Produce" },
      { name: "Soy Sauce", amount: "2 tbsp", category: "Pantry" },
      { name: "Coconut Vinegar", amount: "1/4 cup", category: "Pantry" },
      { name: "Brown Sugar", amount: "2 tbsp", category: "Pantry" },
      { name: "Achiote Oil (for basting)", amount: "1/4 cup", category: "Pantry" },
      { name: "Bamboo Skewers (soaked in water)", amount: "12 pieces", category: "Pantry" }
    ],
    instructions: [
      "In a large bowl, whisk together the calamansi juice, coconut vinegar, soy sauce, minced garlic, minced lemongrass, grated ginger, brown sugar, salt, and pepper to create the marinade.",
      "Add the chicken pieces to the marinade and mix well until completely coated. Cover and refrigerate for at least 3 hours (preferably overnight).",
      "Soak bamboo skewers in water for at least 30 minutes before grilling to prevent them from burning.",
      "Thread 4-5 marinated chicken pieces tightly onto each soaked bamboo skewer.",
      "Preheat the grill or grill pan to medium-high heat and lightly brush the grate with vegetable oil.",
      "In a small bowl, prepare the basting sauce by combining achiote oil with a spoonful of the marinade (or a pinch of sazon/salt).",
      "Place the skewers on the grill. Grill for 6-8 minutes per side, turning occasionally, and basting generously with achiote oil every 2 minutes.",
      "Grill until the chicken has developed beautiful charred edges and is cooked through to an internal temperature of 165°F (74°C).",
      "Remove the skewers from the heat and let rest for 2-3 minutes. Serve hot with spiced vinegar dipping sauce and warm garlic rice!"
    ],
    nutritionalFacts: {
      calories: 260,
      protein: "24g",
      carbs: "5g",
      fat: "16g"
    },
    tags: ["Filipino", "Chicken", "Inasal", "Skewer", "Street Food", "Grill", "Smoky", "Lemongrass"],
    chefTip: "The secret to authentic Chicken Inasal is the achiote oil basting! Basting frequently seals in the moisture and gives the chicken its signature vibrant orange color and subtle earthiness. Serve with a sawsawan dipping sauce made of soy sauce, calamansi, and vinegar!"
  },
  {
    id: "lechon-rice-bowl",
    title: "Lechon Rice Bowl",
    description: "A hearty rice bowl topped with tender, slow roasted Puerto Rican lechon, known for its crispy skin and juicy, flavorful meat. Served over steamed rice with savory toppings and house made sauce, this satisfying dish delivers the bold, authentic flavors of one of Puerto Rico's most celebrated traditions.",
    image: "https://i.imgur.com/eoQbQWc.jpeg",
    prepTime: 25,
    cookTime: 180,
    servings: 4,
    difficulty: "Hard",
    spiceFactor: "None",
    flavor: "Savory & Crispy Garlic Mojo",
    category: "Mains",
    rating: 4.9,
    ingredients: [
      { name: "Pork Shoulder (Pernil)", amount: "3-4 lbs", category: "Meat" },
      { name: "Garlic cloves", amount: "8-10, mashed", category: "Produce" },
      { name: "Dried Oregano", amount: "1.5 tbsp", category: "Pantry" },
      { name: "Adobo Seasoning", amount: "1 tbsp", category: "Pantry" },
      { name: "Olive Oil", amount: "2 tbsp", category: "Pantry" },
      { name: "Salt and Black Pepper", amount: "To taste", category: "Pantry" },
      { name: "Cooked White or Jasmine Rice", amount: "4 cups", category: "Pantry" },
      { name: "Toppings (sweet plantains, lime wedges, cilantro)", amount: "For serving", category: "Produce" }
    ],
    instructions: [
      "Prep the Pork: Score the fat cap of the pork shoulder in a diamond pattern. Make deep slits all over the meat.",
      "Make the Mojo Rub: In a mortar and pestle, mash the garlic cloves with dried oregano, salt, black pepper, adobo, and olive oil to form a thick paste.",
      "Season the Meat: Rub the garlic paste generously over the entire pork shoulder, pressing it deep into the slits. Let it marinate in the refrigerator for at least 4 hours, or overnight for the best flavor.",
      "Slow Roast: Preheat your oven to 320°F (160°C). Place the pork in a roasting pan skin-side up, cover tightly with foil, and bake for 3 hours until extremely tender.",
      "Crisp the Skin: Remove the foil, increase the temperature to 420°F (215°C), and roast for another 30-40 minutes until the skin turns into beautifully bubbly, crispy crackling (cuero).",
      "Shred the Meat: Let the pork rest for 15 minutes. Chop the crispy skin into small pieces, and shred the juicy, tender pork meat underneath.",
      "Assemble the Bowl: Divide warm steamed rice into serving bowls. Top generously with the shredded lechon pork and pieces of the crispy skin.",
      "Serve: Add sweet fried plantains (amarillos), fresh cilantro, lime wedges, and a drizzle of mojo garlic sauce on top. Enjoy warm!"
    ],
    nutritionalFacts: {
      calories: 580,
      protein: "38g",
      carbs: "42g",
      fat: "24g"
    },
    tags: ["Puerto Rican", "Lechon", "Pork", "Rice Bowl", "Slow Roast", "Crispy Skin", "Mojo", "Main Course"],
    chefTip: "Do not rush the roasting process! The low and slow bake makes the pork shoulder incredibly juicy and melt-in-your-mouth tender, while the final high-heat blast is essential for achieving that ultra-crispy, perfectly bubbly golden 'cuero' skin crackling."
  },
  {
    id: "adobo-tostones",
    title: "Adobo Tostones",
    description: "A Puerto Rican favorite made with green plantains that are twice fried until crispy on the outside and tender on the inside. Tossed in a savory garlic adobo seasoning and served with a flavorful dipping sauce, these golden bites deliver the perfect balance of crisp texture and bold island flavor.",
    image: "https://i.imgur.com/J7ROTHV.jpeg",
    prepTime: 10,
    cookTime: 15,
    servings: 4,
    difficulty: "Easy",
    spiceFactor: "None",
    flavor: "Savory Garlic & Herb",
    category: "Appetizers",
    rating: 4.9,
    ingredients: [
      { name: "Green Plantains (peeled, sliced into 1-inch rounds)", amount: "3 large", category: "Produce" },
      { name: "Vegetable Oil", amount: "2 cups (for frying)", category: "Pantry" },
      { name: "Adobo Seasoning", amount: "1.5 tsp", category: "Pantry" },
      { name: "Garlic Powder", amount: "1 tsp", category: "Pantry" },
      { name: "Salt", amount: "To taste", category: "Pantry" },
      { name: "Mayoketchup (Mayonnaise, Ketchup, & Garlic mixture)", amount: "For dipping", category: "Pantry" }
    ],
    instructions: [
      "Prepare the Plantains: Peel the green plantains and slice them into thick 1-inch rounds.",
      "First Fry: Heat vegetable oil in a skillet over medium heat (around 325°F / 160°C). Place the plantain pieces in the oil and fry for 3-4 minutes per side until soft and light golden, but not browned.",
      "Drain and Cool: Remove with a slotted spoon and drain on paper towels for a minute.",
      "Smash the Tostones: Place a warm plantain piece between two pieces of greased parchment paper or plastic wrap. Use a flat-bottomed cup, a small skillet, or a tostonera (plantain press) to press down firmly and flatten it into a disc about 1/4-inch thick.",
      "Second Fry: Bring the oil temperature up to medium-high (around 375°F / 190°C). Carefully slide the smashed plantains back into the oil.",
      "Fry until Crispy: Fry for 2-3 minutes per side until the edges are beautifully golden brown and super crispy.",
      "Season and Serve: Remove from oil, drain on paper towels, and immediately sprinkle generously with adobo seasoning and garlic powder while still hot. Serve warm with mayoketchup dipping sauce!"
    ],
    nutritionalFacts: {
      calories: 180,
      protein: "2g",
      carbs: "32g",
      fat: "7g"
    },
    tags: ["Puerto Rican", "Tostones", "Plantain", "Appetizer", "Crispy", "Garlic", "Snack", "Deep-Fried"],
    chefTip: "For the absolute crispiest tostones, quickly dip the smashed plantain discs in salted garlic water immediately before the second fry (be sure to pat them dry or expect some oil spatter). This adds moisture that steams on contact with hot oil, puffing up the outer crust to golden, bubbly perfection!"
  },
  {
    id: "tofu-sisig-rice-bowl",
    title: "Tofu Sisig Rice Bowl",
    description: "A delicious plant based twist on the Filipino classic. Crispy pan fried tofu is tossed with sautéed onions, peppers, and savory sisig seasonings, then served over steamed rice. Packed with bold, smoky, and tangy flavors, this hearty bowl delivers all the taste of traditional sisig in a satisfying vegetarian meal.",
    image: "https://i.imgur.com/DgvHsCB.jpeg",
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    difficulty: "Easy",
    spiceFactor: "Medium",
    flavor: "Smoky, Tangy & Savory",
    category: "Mains",
    rating: 4.9,
    ingredients: [
      { name: "Extra Firm Tofu (diced into small cubes)", amount: "1 block (14 oz)", category: "Produce" },
      { name: "Red Onion (finely chopped)", amount: "1 large", category: "Produce" },
      { name: "Green Bell Pepper (finely diced)", amount: "1 medium", category: "Produce" },
      { name: "Red Chili (sliced, optional)", amount: "2", category: "Produce" },
      { name: "Soy Sauce (or Liquid Seasoning)", amount: "2 tbsp", category: "Pantry" },
      { name: "Vegetarian Oyster Sauce", amount: "1 tbsp", category: "Pantry" },
      { name: "Mayonnaise (or Vegan Mayo)", amount: "3 tbsp", category: "Dairy" },
      { name: "Calamansi Juice (or Lime Juice)", amount: "2 tbsp", category: "Produce" },
      { name: "Garlic Powder", amount: "1/2 tsp", category: "Pantry" },
      { name: "Steamed Jasmine Rice", amount: "4 cups", category: "Pantry" },
      { name: "Vegetable Oil (for pan-frying)", amount: "3 tbsp", category: "Pantry" }
    ],
    instructions: [
      "Crisp the Tofu: Pat the extra-firm tofu blocks completely dry with paper towels to remove excess moisture. Cut into small 1/2-inch cubes. Heat vegetable oil in a large non-stick skillet or wok over medium-high heat. Add the tofu cubes and fry until all sides are crispy and deep golden brown (about 10-12 minutes). Remove from skillet and set aside.",
      "Sauté the Aromatics: In the same skillet (add a little more oil if needed), add the chopped red onion, green bell pepper, and chilies. Sauté for 3-4 minutes until the onions are softened and translucent.",
      "Mix the Savory Sauce: In a small bowl, whisk together the mayonnaise, soy sauce, vegetarian oyster sauce, calamansi or lime juice, and garlic powder until smooth.",
      "Toss to Combine: Turn the heat back to medium-high. Add the crispy fried tofu back into the skillet with the sautéed vegetables. Pour the prepared sauce mixture over the tofu and vegetables. Toss quickly and continuously for 2 minutes until everything is perfectly heated through, beautifully glazed, and creamy.",
      "Assemble and Serve: Divide the steamed jasmine rice into serving bowls. Top generously with the hot tofu sisig mixture. Garnish with additional fresh chilies or green onions if desired, and serve with extra calamansi wedges!"
    ],
    nutritionalFacts: {
      calories: 380,
      protein: "14g",
      carbs: "48g",
      fat: "15g"
    },
    tags: ["Filipino", "Tofu", "Sisig", "Rice Bowl", "Vegetarian", "Crispy", "Smoky", "Tangy"],
    chefTip: "For an extra smoky finish that mimics traditional sizzling sisig plates, let the mixed tofu sit undisturbed in the hot pan for an extra minute to get a slight char on the bottom before serving!"
  }
];
