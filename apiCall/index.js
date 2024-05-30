document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("product-list");
  const sortSelect = document.getElementById("sort-select");

  // Function to fetch products based on sort order
  const fetchProducts = async (sortOrder) => {
    try {
      const response = await fetch(
        `https://fakestoreapi.com/products?sort=${sortOrder}`
      );
      const products = await response.json();
      displayProducts(products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Function to display products in the UI
  const displayProducts = (products) => {
    productList.innerHTML = ""; // Clear previous products
    products.forEach((product) => {
      const productItem = document.createElement("div");
      productItem.classList.add("product-item");
      productItem.innerHTML = `
        <h3>${product.title}</h3>
        <img src="${product.image}" alt="${product.title}">
        <p>Price: $${product.price}</p>
      `;
      productList.appendChild(productItem);
    });
  };

  // Initial fetch and display of products in ascending order
  fetchProducts("asc");

  // Event listener for sorting dropdown change
  sortSelect.addEventListener("change", (event) => {
    const sortOrder = event.target.value;
    fetchProducts(sortOrder);
  });
});
