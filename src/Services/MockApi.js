export const fetchDashboardData = () => {
  const currentDate = new Date();
  const formatDate = (date) => date.toISOString().split("T")[0];
  const formatTime = (date) => date.toTimeString().split(" ")[0];

  // Helper function to generate random integer within a range
  const randomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);

  // Generate random products count (between 20 and 50)
  const productsCount = randomInt(20, 50);

  // Generate random today's orders (between 0 and 10)
  const todayOrdersCount = randomInt(0, 10);

  // Generate random total orders (between 100 and 500)
  const totalOrdersCount = randomInt(100, 500);

  // Generate random total earnings (between 5000 and 20000)
  const totalEarnings = randomInt(5000, 20000);

  const generateOrderItem = () => ({
    name: `Product ${randomInt(1, 100)}`,
    sku: `SKU-${randomInt(1000, 9999)}`,
    price: randomInt(100, 2000),
    quantity: randomInt(1, 5),
    image: `https://example.com/product-image-${randomInt(1, 100)}.jpg`,
  });

  const generateOrder = (id, isToday = false) => {
    const items = Array.from({ length: randomInt(1, 3) }, generateOrderItem);
    const amount = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const orderDate = new Date(
      currentDate.getTime() - randomInt(0, 7) * 24 * 60 * 60 * 1000
    );
    return {
      id,
      items,
      amount,
      product: `Product ${id}`,
      users: randomInt(1, 5),
      quantity: randomInt(1, 10),
      images: [`https://example.com/product-image-${id}.jpg`],
      date: formatDate(orderDate),
      time: formatTime(orderDate),
      email: `user${id}@example.com`,
    };
  };

  const latestOrders = Array.from({ length: 5 }, (_, i) =>
    generateOrder(i + 1)
  );

  return {
    products: productsCount,
    todayOrders: todayOrdersCount,
    totalOrders: totalOrdersCount,
    totalEarnings: totalEarnings,
    latestOrders: latestOrders,
    productDetails: [
      {
        product_id: "GL_01_08_038",
        product_name: "Panchani Ram",
        images: [
          "https://glosishine.com/upload/GL_01_08_038_2024-08-01_08-38-21_932589jpg",
        ],
        regular_price: "1000.00",
        sale_price: "500.00",
        size: "S,M,L",
        color: "dghd",
        email: "example1@example.com",
        quantity: 10,
      },
      {
        product_id: "GL_12_10_043",
        product_name: "Naruto T-shirt",
        images: [
          "https://glosishine.com/upload/GL_12_10_043_2024-10-12_13-14-25_572798jpg",
        ],
        regular_price: "2000.00",
        sale_price: "1500.00",
        size: "S,M,L,XL",
        color: "Red,Black",
        email: "example2@example.com",
        quantity: 5,
      },
      {
        product_id: "GL_13_10_046",
        product_name: "Assassins T-Shirt",
        images: [
          "https://glosishine.com/upload/GL_13_10_046_2024-10-13_20-09-10_261157jpg",
        ],
        regular_price: "2999.00",
        sale_price: "1499.00",
        size: "S,M,L,XL",
        color: "Black,White,Red",
        email: "example3@example.com",
        quantity: 8,
      },
      {
        product_id: "GL_15_09_039",
        product_name: "Origins Hoodie",
        images: [
          "https://glosishine.com/upload/GL_15_09_039_2024-09-15_19-18-30_677604jpg",
        ],
        regular_price: "1999.00",
        sale_price: "999.00",
        size: "XXL,S,M,L,XL",
        color: "Any,Red,Blue,Green,Yellow,White,Black,Orange",
        email: "example4@example.com",
        quantity: 12,
      },
    ],
  };
};
