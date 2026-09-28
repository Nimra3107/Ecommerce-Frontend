import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const response = await fetch(
      "https://ecommerce-backend-vert-delta.vercel.app/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"  //tell the server that the data sent is it in the json format
        },
        body: JSON.stringify({  //convert the data in json form
          username: username,
          email: email,
          password: password
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.log(data);
      alert(data.detail || "Registration failed");
      return;
    }

    // Save logged-in user's ID
    localStorage.setItem("loggedInUserId", data.id);

    // Go to products page
    navigate("/");
  };

  return (
    <div className="auth-container">

      <form
        className="auth-form"
        onSubmit={handleRegister}
      >

        <h1>Register</h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
        />

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
          Register
        </button>

        <p>
          Already have an account?{" "}

          <span
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>

      </form>

    </div>
  );
}

export default Register;
