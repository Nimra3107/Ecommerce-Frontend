import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


function Navbar() {
  const [loggedIn, ] = useState(
    !!localStorage.getItem("loggedInUserId")
  );

  const navigate = useNavigate();


  const handleLogout = async () => {
    const loggedInUserId =
      localStorage.getItem("loggedInUserId");
  
    const allUserCarts =
      JSON.parse(localStorage.getItem("cart")) || {};
  
    const userCart =
      allUserCarts[loggedInUserId] || [];
  
    // Cart ki quantity stock mein wapas add karo
    for (const product of userCart) {
      await fetch(
        `http://127.0.0.1:8000/products/${product.id}/stock?quantity_change=${product.cartQuantity}`,
        {
          method: "PATCH"
        }
      );
    }
  
    // User ka cart clear
    delete allUserCarts[loggedInUserId];
  
    localStorage.setItem(
      "cart",
      JSON.stringify(allUserCarts)
    );
  
    // Logout
    localStorage.removeItem("loggedInUserId");
    navigate("/login")
    // window.location.href = "/";
  };

  return (
    <nav className="navbar">
      <h2>My Ecommerce</h2>

      <div className="nav-links">
        <Link to="/">Products</Link>
        <Link to="/my-orders">My Orders</Link>
        <Link to="/cart">Cart</Link>

        {loggedIn ? (
          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;