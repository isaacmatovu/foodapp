import images from "./images"; // Adjust path to your images file

const categories = [
  {
    name: "Junk Food",
    subcategories: [
      {
        name: "Burgers",
        price: 8.99,
        image: images[8], // burger.webp
      },
      {
        name: "Pizza",
        price: 12.99,
        image: images[5], // pizza.webp
      },
      {
        name: "Fried Chicken",
        price: 9.99,
        image: images[2], // friesandchicken.webp
      },
      {
        name: "Hot Dogs",
        price: 5.99,
        image: "https://example.com/images/hot-dogs.jpg",
      },
    ],
  },
  {
    name: "Local Food",
    subcategories: [
      {
        name: "Matooke",
        price: 10.99,
        image: images[4], // matookeandmeat.webp
      },
      {
        name: "Fish",
        price: 11.99,
        image: images[1], // fish.webp
      },
      {
        name: "Street Food",
        price: 6.99,
        image: "https://example.com/images/street-food.jpg",
      },
    ],
  },
  {
    name: "Breakfast",
    subcategories: [
      {
        name: "Samosas",
        price: 7.99,
        image: images[7], // samosa.webp
      },
      {
        name: "Rolex",
        price: 8.49,
        image: images[6], // rolex.webp
      },
      {
        name: "Breakfast Sandwiches",
        price: 6.99,
        image: "https://example.com/images/breakfast-sandwiches.jpg",
      },
      {
        name: "Cereal & Oatmeal",
        price: 5.49,
        image: "https://example.com/images/cereal-oatmeal.jpg",
      },
    ],
  },
  {
    name: "Drinks",
    subcategories: [
      {
        name: "Coffee & Espresso",
        price: 3.99,
        image: images[0], // coffee.webp
      },
      {
        name: "Fresh Juices",
        price: 4.99,
        image: images[3], // juice.webp
      },
      {
        name: "Smoothies & Shakes",
        price: 5.99,
        image: "https://example.com/images/smoothies-shakes.jpg",
      },
      {
        name: "Soft Drinks",
        price: 2.49,
        image: "https://example.com/images/soft-drinks.jpg",
      },
    ],
  },
  {
    name: "Snacks",
    subcategories: [
      {
        name: "Chips & Crisps",
        price: 2.99,
        image: images[12], // crisps.webp
      },
      {
        name: "Cookies & Biscuits",
        price: 2.49,
        image: images[11], // cokie.webp
      },
      {
        name: "Candy & Chocolate",
        price: 1.99,
        image: "https://example.com/images/candy-chocolate.jpg",
      },
    ],
  },
];
export default categories;
