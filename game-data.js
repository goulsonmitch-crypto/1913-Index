/* Game data — historical U.S. retail prices for the "Higher or Lower" game.
   Approximate, well-documented historical prices (rounded), grouped for a fun,
   shareable challenge. Flagged as approximate; the rigorous, fully-sourced series
   live in the main dataset (Explore / Method). Mix of everyday food, big-ticket
   life items, and nostalgic goods. price = actual nominal dollars in that year. */
window.GAME_DATA = [
  // ——— Everyday food ———
  { item: "a gallon of milk", emoji: "🥛", year: 1960, price: 1.00 },
  { item: "a gallon of milk", emoji: "🥛", year: 1980, price: 2.16 },
  { item: "a dozen eggs", emoji: "🥚", year: 1960, price: 0.57 },
  { item: "a dozen eggs", emoji: "🥚", year: 1980, price: 0.84 },
  { item: "a loaf of bread", emoji: "🍞", year: 1960, price: 0.22 },
  { item: "a loaf of bread", emoji: "🍞", year: 1990, price: 0.70 },
  { item: "a cup of coffee", emoji: "☕", year: 1960, price: 0.10 },
  { item: "a cup of diner coffee", emoji: "☕", year: 1990, price: 0.75 },
  { item: "a Big Mac", emoji: "🍔", year: 1970, price: 0.65 },
  { item: "a Big Mac", emoji: "🍔", year: 1995, price: 2.32 },
  { item: "a McDonald's hamburger", emoji: "🍔", year: 1955, price: 0.15 },
  { item: "a bottle of Coca-Cola", emoji: "🥤", year: 1913, price: 0.05 },
  { item: "a bottle of Coca-Cola", emoji: "🥤", year: 1960, price: 0.10 },
  { item: "a pound of bacon", emoji: "🥓", year: 1960, price: 0.65 },
  { item: "a pound of ground beef", emoji: "🥩", year: 1980, price: 1.86 },

  // ——— Big-ticket life ———
  { item: "the median U.S. home", emoji: "🏠", year: 1960, price: 11900 },
  { item: "the median U.S. home", emoji: "🏠", year: 1980, price: 47200 },
  { item: "the median U.S. home", emoji: "🏠", year: 2000, price: 119600 },
  { item: "a new car", emoji: "🚗", year: 1960, price: 2600 },
  { item: "a new car", emoji: "🚗", year: 1980, price: 7200 },
  { item: "a new car", emoji: "🚗", year: 2000, price: 24750 },
  { item: "a gallon of gas", emoji: "⛽", year: 1933, price: 0.10 },
  { item: "a gallon of gas", emoji: "⛽", year: 1955, price: 0.29 },
  { item: "a gallon of gas", emoji: "⛽", year: 1980, price: 1.19 },
  { item: "a gallon of gas", emoji: "⛽", year: 2000, price: 1.51 },
  { item: "a year of public college tuition", emoji: "🎓", year: 1980, price: 800 },
  { item: "a year of public college tuition", emoji: "🎓", year: 2000, price: 3500 },
  { item: "a month's average rent", emoji: "🔑", year: 1960, price: 71 },
  { item: "a month's average rent", emoji: "🔑", year: 1990, price: 447 },

  // ——— Fun / nostalgic ———
  { item: "a movie ticket", emoji: "🎫", year: 1960, price: 0.69 },
  { item: "a movie ticket", emoji: "🎫", year: 1980, price: 2.69 },
  { item: "a movie ticket", emoji: "🎫", year: 2000, price: 5.39 },
  { item: "a first-class postage stamp", emoji: "✉️", year: 1960, price: 0.04 },
  { item: "a first-class postage stamp", emoji: "✉️", year: 1985, price: 0.22 },
  { item: "a comic book", emoji: "📘", year: 1960, price: 0.10 },
  { item: "a comic book", emoji: "📘", year: 1985, price: 0.75 },
  { item: "a candy bar", emoji: "🍫", year: 1960, price: 0.05 },
  { item: "a candy bar", emoji: "🍫", year: 1990, price: 0.50 },
  { item: "a pack of cigarettes", emoji: "🚬", year: 1960, price: 0.26 },
  { item: "a vinyl LP record", emoji: "💿", year: 1965, price: 3.79 },
  { item: "a new Nintendo (NES) console", emoji: "🎮", year: 1985, price: 89.99 },
  { item: "a first-run Disney ticket to Disneyland", emoji: "🎠", year: 1955, price: 1.00 }
];
