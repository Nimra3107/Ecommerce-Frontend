import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cartProducts, setCartProducts] = useState([]);

  const navigate = useNavigate();

  // Get current user's cart
  useEffect(() => {
    const loggedInUserId =
      localStorage.getItem("loggedInUserId");

    const allUserCarts =
      JSON.parse(localStorage.getItem("cart")) || {};

    const userCart =
      allUserCarts[loggedInUserId] || [];

    setCartProducts(userCart);
  }, []);

  const deleteFromCart = async (productId) => {
    const loggedInUserId =
      localStorage.getItem("loggedInUserId");

    const allUserCarts =
      JSON.parse(localStorage.getItem("cart")) || {};

    const userCart =
      allUserCarts[loggedInUserId] || [];

    // Find product in cart
    const productToDelete = userCart.find(
      (product) => product.id === productId
    );

    if (!productToDelete) {
      return;
    }

    try {
      // Return cart quantity back to stock
      const response = await fetch(
        `https://ecommerce-backend-vert-delta.vercel.app/products/${productId}/stock?quantity_change=${productToDelete.cartQuantity}`,
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

      // Remove product from cart
      const updatedUserCart = userCart.filter(
        (product) => product.id !== productId
      );

      // Update current user's cart
      allUserCarts[loggedInUserId] =
        updatedUserCart;

      // Save updated cart
      localStorage.setItem(
        "cart",
        JSON.stringify(allUserCarts)
      );

      // Update UI
      setCartProducts(updatedUserCart);

    } catch (error) {
      console.log("Delete product error:", error);
      alert("Unable to connect to server");
    }
  };


  // Calculate total quantity
  const totalQuantity = cartProducts.reduce(
    (total, product) => {
      return total + product.cartQuantity;
    },
    0
  );

  // Calculate total price
  const totalPrice = cartProducts.reduce(
    (total, product) => {
      return (
        total +
        product.price * product.cartQuantity
      );
    },
    0
  );

  // Go to checkout
  const handleCheckout = () => {
    navigate("/checkout");
  };

  // Empty cart
  if (cartProducts.length === 0) {
    return (
      <div className="cart-container empty-cart">
        <h1>Your Cart is Empty</h1>

        <button onClick={() => navigate("/")}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>

      <div className="cart-content">

        {/* Cart Products */}
        <div className="cart-items">
          {cartProducts.map((product) => (
            <div
              className="cart-product"
              key={product.id}
            >
              <img
                src={product.image}
                alt={product.name}
              />

              <div className="cart-details">
                <h2>{product.name}</h2>

                <p className="description">
                  {product.description}
                </p>

                <p>
                  <strong>Price:</strong>{" "}
                  Rs. {product.price}
                </p>

                <p>
                  <strong>Quantity:</strong>{" "}
                  {product.cartQuantity}
                </p>

                <p className="product-total">
                  <strong>Product Total:</strong>{" "}
                  Rs.{" "}
                  {product.price *
                    product.cartQuantity}
                </p>

                <button
                  className="delete-cart-btn"
                  onClick={() =>
                    deleteFromCart(product.id)
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="cart-summary">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Total Products</span>
            <span>{cartProducts.length}</span>
          </div>

          <div className="summary-row">
            <span>Total Quantity</span>
            <span>{totalQuantity}</span>
          </div>

          <div className="summary-row total-price">
            <span>Total Price</span>
            <span>Rs. {totalPrice}</span>
          </div>

          <button
            className="checkout-btn"
            onClick={handleCheckout}
          >
            Checkout
          </button>

          <button
            className="continue-shopping-btn"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </button>
        </div>

      </div>
    </div>
  );
}

export default Cart;
