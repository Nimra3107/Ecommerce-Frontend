import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


function Navbar() {
  // const [loggedInUserId, ] = useState(
  //   !!localStorage.getItem("loggedInUserId")
  // );
  // const [loggedInUserId, ] = useState(
  //   !!sessionStorage.getItem("loggedInUserId")
  // );

  // const navigate = useNavigate();


  // const handleLogout = async () => {
  //   const loggedInUserId =
  //     localStorage.getItem("loggedInUserId");

  //   const allUserCarts =
  //     JSON.parse(localStorage.getItem("cart")) || {};

  //   const userCart =
  //     allUserCarts[loggedInUserId] || [];

  //   // Cart ki quantity stock mein wapas add karo
  //   for (const product of userCart) {
  //     await fetch(
  //       `http://127.0.0.1:8000/products/${product.id}/stock?quantity_change=${product.cartQuantity}`,
  //       {
  //         method: "PATCH"
  //       }
  //     );
  //   }

  //   // User ka cart clear
  //   delete allUserCarts[loggedInUserId];

  //   localStorage.setItem(
  //     "cart",
  //     JSON.stringify(allUserCarts)
  //   );

  //   // Logout
  //   // localStorage.removeItem("loggedInUserId");
  //   sessionStorage.removeItem("loggedInUserId");
  //   navigate("/login")
  //   // window.location.href = "/";
  // };

  const [loggedInUserId, setLoggedInUserId] = useState(
    !!sessionStorage.getItem("loggedInUserId")
  );
  const navigate = useNavigate();
  const handleLogout = () => {
    // Remove logged-in user 
    sessionStorage.removeItem("loggedInUserId");
    // Update navbar 
    setLoggedInUserId(false);
    // Go to login page 
    navigate("/login");
  };



  return (
    <nav className="navbar">
      <h2>My Ecommerce</h2>

      <div className="nav-links">
        <Link to="/">Products</Link>
        <Link to="/my-orders">My Orders</Link>
        <Link to="/cart">Cart</Link>

        {/* {loggedIn ? (
          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <Link to="/login">Login</Link>
        )} */}
        {loggedInUserId ? (
          <button
            className="logout-btn"
            onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link to="/login">Login</Link>
          // <button onClick={() => navigate("/login")}>
          //   Login
          // </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;