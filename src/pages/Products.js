import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";

function Products() {
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  // Get products from FastAPI
  const getProducts = async () => {

    try {
      const response = await fetch(
        "https://ecommerce-backend-vert-delta.vercel.app/products"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();

      console.log("Products from FastAPI:", data);

      const productsWithSelection = data.map((product) => ({
        ...product,
        selectedQuantity: 1
      }));

      setProducts(productsWithSelection);
    } catch (error) {
      console.log("Products error:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // Increase selected quantity
  const increaseQuantity = (product) => {
    if (product.selectedQuantity >= product.quantity) {
      return;
    }

    setProducts(
      products.map((item) =>
        item.id === product.id
          ? {
            ...item,
            selectedQuantity: item.selectedQuantity + 1
          }
          : item
      )
    );
  };

  // Decrease selected quantity
  const decreaseQuantity = (product) => {
    if (product.selectedQuantity <= 1) {
      return;
    }

    setProducts(
      products.map((item) =>
        item.id === product.id
          ? {
            ...item,
            selectedQuantity: item.selectedQuantity - 1
          }
          : item
      )
    );
  };

  const addToCart = async (product) => {
    const loggedInUserId =
      localStorage.getItem("loggedInUserId");
    console.log("User ID in Products:", loggedInUserId);

    if (!loggedInUserId) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    const allUserCarts =
      JSON.parse(localStorage.getItem("cart")) || {};

    const userCart =
      Array.isArray(allUserCarts[loggedInUserId])
        ? allUserCarts[loggedInUserId]
        : [];

    const existingProduct = userCart.find(
      (item) => item.id === product.id
    );

    let quantityToAdd = product.selectedQuantity;

    // If product already exists in cart
    if (existingProduct) {
      const newCartQuantity =
        existingProduct.cartQuantity +
        product.selectedQuantity;

      if (newCartQuantity > product.quantity) {
        alert("You cannot add more than available stock");
        return;
      }

      quantityToAdd = product.selectedQuantity;
    }

    // Update stock through FastAPI
    try {
      const response = await fetch(
        `https://ecommerce-backend-vert-delta.vercel.app/products/${product.id}/stock?quantity_change=-${quantityToAdd}`,
        {
          method: "PATCH"
        }
      );

      const data = await response.json();

      console.log("Stock API status:", response.status);
      console.log("Stock API response:", data);

      if (!response.ok || data.message !== "Stock updated successfully") {
        alert(data.message || "Unable to update stock");
        return;
      }

      let updatedUserCart;

      // Product already exists in cart
      if (existingProduct) {
        updatedUserCart = userCart.map((item) =>
          item.id === product.id
            ? {
              ...item,
              cartQuantity:
                item.cartQuantity +
                product.selectedQuantity
            }
            : item
        );
      }

      // Product does not exist in cart
      else {
        const newCartProduct = {
          ...product,
          cartQuantity: product.selectedQuantity
        };

        updatedUserCart = [
          ...userCart,
          newCartProduct
        ];
      }

      allUserCarts[loggedInUserId] =
        updatedUserCart;

      localStorage.setItem(
        "cart",
        JSON.stringify(allUserCarts)
      );

      navigate("/cart");

    } catch (error) {
      console.log("Stock update error:", error);
      alert("Unable to connect to server");
    }
  };


  return (
    <div className="products-container">
      <h1>Our Products</h1>

      <div className="products">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
            addToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
}

export default Products;

