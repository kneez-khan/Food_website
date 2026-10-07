// Central place for brand content, images and menu data. Swap URLs/text here.
const u = (id: string, w = 900) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;

export const brand = {
  name: "Fifth & Field",
  short: "F&F",
  city: "New York City",
  // Placeholders — replace with confirmed business info.
  address: "Address coming soon · Manhattan, NY",
  hours: [
    { d: "Mon – Fri", h: "Hours TBA" },
    { d: "Sat – Sun", h: "Hours TBA" },
  ],
  email: "hello@example.com",
  mapsQuery: "Manhattan, New York, NY",
};

export const images = {
  hero: u("1546069901-ba9599a7e63c", 1200),
  story: u("1556910103-1c02745aae4d", 1100),
  lifestyle: [
    { src: u("1495474472287-4d71bcdd2085"), label: "8:40am, Flatiron" },
    { src: u("1554118811-1e0d58224f24", 1100), label: "The counter" },
    { src: u("1517701604599-bb29b565090c"), label: "Cold brew, oat" },
    { src: u("1501339847302-ac426a4a7cbb"), label: "Open late" },
  ],
  gallery: [
    { src: u("1494390248081-4e521a5940db"), label: "Morning spread" },
    { src: u("1498837167922-ddd27525d352"), label: "Today's market" },
    { src: u("1484980972926-edee96e0960d"), label: "Green bowl" },
    { src: u("1478145046317-39f10e56b5e9"), label: "Fig & egg" },
    { src: u("1505576399279-565b52d4ac71"), label: "Layered jar" },
    { src: u("1432139555190-58524dae6a55"), label: "Grill station" },
    { src: u("1488900128323-21503983a07e"), label: "Berry pop" },
    { src: u("1517248135467-4c7edcad34c4"), label: "Dining room" },
    { src: u("1515003197210-e0cd71810b5f"), label: "Little plate" },
    { src: u("1559181567-c3190ca9959b"), label: "Seasonal" },
  ],
  cta: u("1504674900247-0877df9cc836", 1600),
};

export type Category =
  | "Breakfast" | "Bowls" | "Salads" | "Sandwiches" | "Wraps" | "Drinks" | "Snacks" | "Desserts";

export const categories: ("All" | Category)[] = [
  "All", "Breakfast", "Bowls", "Salads", "Sandwiches", "Wraps", "Drinks", "Snacks", "Desserts",
];

export type MenuItem = {
  id: string;
  name: string;
  desc: string;
  price: number;
  category: Category;
  img: string;
  tag?: string;
  badge?: "Popular" | "New";
};

export const menu: MenuItem[] = [
  { id: "egg-toast", name: "Sunny Sourdough", desc: "Jammy fried egg, smashed avocado, chili crisp on toasted country loaf.", price: 12, category: "Breakfast", img: u("1525351484163-7529414344d8"), tag: "Vegetarian", badge: "Popular" },
  { id: "rye-avo", name: "Rye & Soft Egg", desc: "Seeded rye, sliced avocado, seven-minute egg, flaky salt.", price: 11, category: "Breakfast", img: u("1541519227354-08fa5d50c44d"), tag: "Vegetarian" },
  { id: "brioche", name: "Brioche French Toast", desc: "Thick-cut brioche, blueberries, banana, warm maple.", price: 14, category: "Breakfast", img: u("1484723091739-30a097e8f929") },
  { id: "pancakes", name: "Buttermilk Stack", desc: "Three fluffy pancakes, cultured butter, honey pour.", price: 13, category: "Breakfast", img: u("1567620905732-2d1ec7ab7445"), badge: "New" },
  { id: "chicken-bowl", name: "Signature Chicken Bowl", desc: "Charred chicken, brown rice, corn, red cabbage, soft egg, lime-herb dressing.", price: 16, category: "Bowls", img: u("1604908176997-125f25cc6f3d"), tag: "High protein", badge: "Popular" },
  { id: "garden-bowl", name: "Green Goddess Bowl", desc: "Chickpeas, avocado, roasted sweet potato, radish, tahini.", price: 15, category: "Bowls", img: u("1512621776951-a57141f2eefd"), tag: "Vegan" },
  { id: "egg-bowl", name: "Spinach & Egg Bowl", desc: "Baby spinach, halved eggs, toasted seeds, lemon oil.", price: 14, category: "Bowls", img: u("1482049016688-2d3e1b311543"), tag: "Gluten-free" },
  { id: "market-bowl", name: "Market Plate", desc: "Kale, soft egg, avocado, quick pickles, grains of the day.", price: 15, category: "Bowls", img: u("1490645935967-10de6ba17061") },
  { id: "garden-salad", name: "Fresh Garden Salad", desc: "Crisp greens, berries, feta, toasted almonds, balsamic.", price: 13, category: "Salads", img: u("1505253716362-afaea1d3d1af"), tag: "Vegetarian", badge: "Popular" },
  { id: "night-salad", name: "Shaved Crunch Salad", desc: "Shaved carrot, onion, frisée, sesame, ginger vinaigrette.", price: 12, category: "Salads", img: u("1540189549336-e6e99c3679fe"), tag: "Vegan" },
  { id: "caesar", name: "Chicken Caesar", desc: "Romaine, grilled chicken, parmesan, sourdough crumbs.", price: 15, category: "Salads", img: u("1599021419847-d8a7a6aba5b4") },
  { id: "turkey", name: "Turkey Avocado Club", desc: "Roast turkey, avocado, lettuce, tomato, aioli on multigrain.", price: 14, category: "Sandwiches", img: u("1553909489-cd47e0907980"), badge: "Popular" },
  { id: "chicken-sando", name: "Crispy Chicken Bun", desc: "Herbed chicken patty, pickles, slaw, toasted bun.", price: 15, category: "Sandwiches", img: u("1521305916504-4a1121188589"), badge: "New" },
  { id: "melt", name: "Pressed Melt", desc: "Aged cheddar, gruyère, pressed sourdough, tomato jam.", price: 12, category: "Sandwiches", img: u("1528735602780-2552fd46c7af"), tag: "Vegetarian" },
  { id: "caesar-wrap", name: "Chicken Caesar Wrap", desc: "Grilled chicken, romaine, parmesan, lime, rolled tight.", price: 13, category: "Wraps", img: u("1626700051175-6818013e1d4f"), badge: "Popular" },
  { id: "iced-coffee", name: "House Cold Brew", desc: "18-hour cold brew over ice with a splash of oat.", price: 6, category: "Drinks", img: u("1461023058943-07fcbe16d735"), tag: "Dairy-free" },
  { id: "oj", name: "Fresh Squeezed OJ", desc: "Pressed to order. Nothing else.", price: 7, category: "Drinks", img: u("1600271886742-f049cd451bba") },
  { id: "spritz", name: "Lime Mint Spritz", desc: "Sparkling water, lime, crushed mint, a little cane.", price: 6, category: "Drinks", img: u("1513558161293-cdaf765ed2fd"), badge: "New" },
  { id: "meatballs", name: "Herb Meatballs", desc: "Five chicken meatballs, arugula, smoky tomato.", price: 10, category: "Snacks", img: u("1529042410759-befb1204b468") },
  { id: "soup", name: "Roast Squash Soup", desc: "Silky butternut, pepitas, olive oil. Served warm.", price: 8, category: "Snacks", img: u("1476718406336-bb5a9690ee2a"), tag: "Vegan" },
  { id: "cookies", name: "Brown Butter Cookie", desc: "Dark chocolate, sea salt, baked every morning.", price: 4, category: "Desserts", img: u("1499636136210-6f4ee915583e"), badge: "Popular" },
  { id: "panna", name: "Strawberry Yogurt Cup", desc: "Greek yogurt, macerated strawberries, honey.", price: 7, category: "Desserts", img: u("1488477181946-6428a0291777") },
  { id: "donut", name: "Weekend Donut", desc: "Glazed, sprinkled, unapologetic. Sat–Sun only.", price: 5, category: "Desserts", img: u("1551024601-bec78aea704b") },
];

export const featuredIds = ["chicken-bowl", "garden-salad", "turkey", "caesar-wrap", "iced-coffee"];
