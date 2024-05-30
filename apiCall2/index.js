const fetchCartData = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/carts/2");
    const cartData = await response.json();
    return cartData.products;
  } catch (err) {
    console.error("error while loading cart data", +err);
  }
};

const fetchProductDetails = async (productId) => {
  try {
    const response = await fetch(
      `https://fakestoreapi.com/products/${productId}`
    );
    const productData = await response.json();
    return productData;
  } catch (err) {
    console.error("error while loading data", +err);
  }
};

async function displayCartDetails() {
  const cartItemsContainer = document.getElementById("cartItems");
  const cartData = await fetchCartData();
  if (!cartData) {
    cartItemsContainer.innerHTML = "<p>Error Fetching Cart Data</p>";
    return;
  }
  for (let product of cartData) {
    const productDetails = await fetchProductDetails(product.productId);
    const productElement = document.createElement("div");
    productElement.innerHTML = `<img src="${productDetails.image}" alt="${productDetails.title}" style="max-width: 100px">
    <h3>${productDetails.title}</h3>
    <p>Price: $${productDetails.price}</p>`;
    cartItemsContainer.appendChild(productElement);
  }
}

displayCartDetails();
