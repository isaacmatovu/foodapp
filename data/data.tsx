import images from "./images"; // Adjust path to your images file

const categories = [
  {
    name: "Junk Food",
    subcategories: [
      {
        id: 1,
        name: "Burgers",
        price: 8.99,
        image: images[8], // burger.webp
      },
      {
        id: 3,
        name: "Pizza",
        price: 12.99,
        image: images[5], // pizza.webp
      },
      {
        id: 4,
        name: "Fried Chicken",
        price: 9.99,
        image: images[2], // friesandchicken.webp
      },
      {
        id: 5,
        name: "Hot Dogs",
        price: 5.99,
        image: images[14],
      },
    ],
  },
  {
    name: "Local Food",
    subcategories: [
      {
        id: 6,
        name: "Matooke",
        price: 10.99,
        image: images[4], // matookeandmeat.webp
      },
      {
        id: 7,
        name: "Fish",
        price: 11.99,
        image: images[1], // fish.webp
      },
      {
        id: 8,
        name: "Meat",
        price: 6.99,
        image: images[19],
      },
    ],
  },
  {
    name: "Breakfast",
    subcategories: [
      {
        id: 9,
        name: "Samosas",
        price: 7.99,
        image: images[7], // samosa.webp
      },
      {
        id: 10,
        name: "Rolex",
        price: 8.49,
        image: images[6], // rolex.webp
      },
      {
        id: 11,
        name: "Breakfast Sandwiches",
        price: 6.99,
        image: images[18],
      },
      {
        id: 12,
        name: "Pop corn",
        price: 5.49,
        image: images[10],
      },
    ],
  },
  {
    name: "Drinks",
    subcategories: [
      {
        id: 13,
        name: "Coffee & Espresso",
        price: 3.99,
        image: images[0], // coffee.webp
      },
      {
        id: 14,
        name: "Fresh Juices",
        price: 4.99,
        image: images[3], // juice.webp
      },
      {
        id: 15,
        name: "Smoothies & Shakes",
        price: 5.99,
        image: images[17],
      },
      {
        id: 16,
        name: "Soft Drinks",
        price: 2.49,
        image: images[15],
      },
    ],
  },
  {
    name: "Snacks",
    subcategories: [
      {
        id: 17,
        name: "Chips & Crisps",
        price: 2.99,
        image: images[12], // crisps.webp
      },
      {
        id: 18,
        name: "Cookies & Biscuits",
        price: 2.49,
        image: images[11], // cokie.webp
      },
      {
        id: 19,
        name: "Candy & Chocolate",
        price: 1.99,
        image: images[16],
      },
    ],
  },
];
export default categories;
