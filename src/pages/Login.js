import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const API_URL = window.location.hostname === "localhost"
    ? "http://127.0.0.1:8000"
    : "https://ecommerce-backend-vert-delta.vercel.app";


  const handleLogin = async (e) => {

    e.preventDefault();

    const response = await fetch(
      `${API_URL}/login`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          email: email,
          password: password
        })
      }
    );

    const data = await response.json();

    if (!response.ok || data.message === "Invalid email or password") {
      alert("Invalid email or password");
      return;
    }

    // Save logged-in user's ID
    localStorage.setItem(
      "loggedInUserId",
      data.id
    );


console.log("Logged in user:", data.id);
console.log(
  "LocalStorage:",
  localStorage.getItem("loggedInUserId")
);

    // Go to products
    window.location.href = "/";
  };

  return (
    <div className="auth-container">

      <form
        className="auth-form"
        onSubmit={handleLogin}
      >

        <h1>Login</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button type="submit">
          Login
        </button>

        <p>
          Don't have an account?{" "}

          <span
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>

      </form>

    </div>
  );
}

export default Login;
