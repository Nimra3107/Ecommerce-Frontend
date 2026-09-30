// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// function Checkout() {
//   const [cartProducts, setCartProducts] = useState([]);

//   const [name, setName] = useState("");
//   const [address, setAddress] = useState("");
//   const [phone, setPhone] = useState("");

//   const [paymentMethod, setPaymentMethod] =
//     useState("Cash on Delivery");

//   const navigate = useNavigate();

//   const API_URL = window.location.hostname === "localhost"
//     ? "http://127.0.0.1:8000"
//     : "https://ecommerce-backend-vert-delta.vercel.app";

//   // Get current user's cart
//   useEffect(() => {
//     const loggedInUserId =
//       localStorage.getItem("loggedInUserId");

//     const allUserCarts =
//       JSON.parse(localStorage.getItem("cart")) || {};

//     const userCart =
//       allUserCarts[loggedInUserId] || [];

//     setCartProducts(userCart);
//   }, []);

//   // Calculate total price
//   const totalPrice = cartProducts.reduce(
//     (total, product) => {
//       return (
//         total +
//         product.price * product.cartQuantity
//       );
//     },
//     0
//   );

//   // Place order
//   const handlePlaceOrder = async (e) => {
//     e.preventDefault();

//     // 1. Get logged-in user
//     const loggedInUserId =
//       localStorage.getItem("loggedInUserId");

//     if (!loggedInUserId) {
//       alert("Please login first");
//       navigate("/login");
//       return;
//     }

//     // 2. Check cart
//     if (cartProducts.length === 0) {
//       alert("Your cart is empty");
//       navigate("/");
//       return;
//     }

//     // 3. Prepare order items
//     const orderItems = cartProducts.map(
//       (product) => ({
//         product_id: product.id,
//         product_name: product.name,
//         price: product.price,
//         quantity: product.cartQuantity,
//         total_price:
//           product.price *
//           product.cartQuantity
//       })
//     );

//     // 4. Prepare complete order
//     const orderData = {
//       user_id: Number(loggedInUserId),
//       customer_name: name,
//       address: address,
//       phone: phone,
//       payment_method: paymentMethod,
//       total_price: totalPrice,
//       items: orderItems
//     };

//     console.log("Order being sent:", orderData);

//     try {
//       const response = await fetch(
//         `${API_URL}/orders`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json"
//           },
//           body: JSON.stringify(orderData)
//         }
//       );
      
//       const data = await response.json();
      
//       console.log("Status:", response.status);
//       console.log("Response:", data);
      
//       if (!response.ok) {
//         alert(data.detail || data.message || "Order failed");
//         return;
//       }

//       // 7. Clear current user's cart
//       const allUserCarts =
//         JSON.parse(
//           localStorage.getItem("cart")
//         ) || {};

//       allUserCarts[loggedInUserId] = [];

//       localStorage.setItem(
//         "cart",
//         JSON.stringify(allUserCarts)
//       );

//       // 8. Success
//       alert("Order placed successfully!");

//       // 9. Go back to Products
//       navigate("/");

//     } catch (error) {
//       console.log(
//         "Order error:",
//         error
//       );
//       alert(error.message);
//     }
//   };

//   return (
//     <div className="checkout-container">

//       <div className="checkout-box">

//         <h1>Checkout</h1>

//         <h2>Order Summary</h2>

//         {cartProducts.map((product) => (
//           <div
//             className="checkout-product"
//             key={product.id}
//           >
//             <p>
//               <strong>
//                 {product.name}
//               </strong>
//             </p>

//             <p>
//               Quantity:{" "}
//               {product.cartQuantity}
//             </p>

//             <p>
//               Price: Rs.{" "}
//               {product.price *
//                 product.cartQuantity}
//             </p>
//           </div>
//         ))}

//         <h2>
//           Total: Rs. {totalPrice}
//         </h2>

//         <form onSubmit={handlePlaceOrder}>

//           <div className="form-group">

//             <label>Name</label>

//             <input
//               type="text"
//               placeholder="Enter your name"
//               value={name}
//               onChange={(e) =>
//                 setName(e.target.value)
//               }
//               required
//             />

//           </div>

//           <div className="form-group">

//             <label>Address</label>

//             <textarea
//               placeholder="Enter your address"
//               value={address}
//               onChange={(e) =>
//                 setAddress(e.target.value)
//               }
//               required
//             />

//           </div>

//           <div className="form-group">

//             <label>Phone</label>

//             <input
//               type="text"
//               placeholder="Enter your phone number"
//               value={phone}
//               onChange={(e) =>
//                 setPhone(e.target.value)
//               }
//               required
//             />

//           </div>

//           <div className="form-group">

//             <label>
//               Payment Method
//             </label>

//             <select
//               value={paymentMethod}
//               onChange={(e) =>
//                 setPaymentMethod(
//                   e.target.value
//                 )
//               }
//             >

//               <option value="Cash on Delivery">
//                 Cash on Delivery
//               </option>

//               <option value="Card">
//                 Card
//               </option>

//             </select>

//           </div>

//           <button
//             type="submit"
//             className="place-order-btn"
//           >
//             Place Order
//           </button>

//           <button
//             type="button"
//             className="back-btn"
//             onClick={() =>
//               navigate("/cart")
//             }
//           >
//             Back to Cart
//           </button>

//         </form>

//       </div>

//     </div>
//   );
// }

// export default Checkout;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Checkout() {

  const [cartProducts, setCartProducts] = useState([]);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const [paymentMethod, setPaymentMethod] =
    useState("Cash on Delivery");

  const navigate = useNavigate();

  const API_URL =
    window.location.hostname === "localhost"
      ? "http://127.0.0.1:8000"
      : "https://ecommerce-backend-vert-delta.vercel.app";


  // Get current user's cart from FastAPI
  useEffect(() => {

    const getCart = async () => {

      // const loggedInUserId =
      //   localStorage.getItem("loggedInUserId");
      const loggedInUserId =
        sessionStorage.getItem("loggedInUserId");

      if (!loggedInUserId) {
        return;
      }

      try {

        const response = await fetch(
          `${API_URL}/cart/${loggedInUserId}`
        );

        const data = await response.json();

        console.log("Checkout cart:", data);

        if (!response.ok) {

          console.log(
            "Checkout cart error:",
            data
          );

          return;
        }

        setCartProducts(data);

      } catch (error) {

        console.log(
          "Get checkout cart error:",
          error
        );

      }
    };

    getCart();

  }, [API_URL]);


  // Calculate total price
  const totalPrice = cartProducts.reduce(
    (total, product) => {

      return (
        total +
        product.price * product.cart_quantity
      );

    },
    0
  );


  // Place order
  const handlePlaceOrder = async (e) => {

    e.preventDefault();


    // 1. Get logged-in user
    const loggedInUserId =
      localStorage.getItem("loggedInUserId");


    if (!loggedInUserId) {

      alert("Please login first");

      navigate("/login");

      return;
    }


    // 2. Check cart
    if (cartProducts.length === 0) {

      alert("Your cart is empty");

      navigate("/cart");

      return;
    }


    // 3. Prepare order items
    const orderItems = cartProducts.map(
      (product) => ({

        // Actual product ID
        product_id: product.product_id,

        // New backend field
        product_name: product.product_name,

        price: product.price,

        // New backend field
        quantity: product.cart_quantity,

        total_price:
          product.price *
          product.cart_quantity

      })
    );


    // 4. Prepare complete order
    const orderData = {

      user_id: Number(loggedInUserId),

      customer_name: name,

      address: address,

      phone: phone,

      payment_method: paymentMethod,

      total_price: totalPrice,

      items: orderItems

    };


    console.log(
      "Order being sent:",
      orderData
    );


    try {

      const response = await fetch(
        `${API_URL}/orders`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(orderData)
        }
      );


      const data = await response.json();


      console.log(
        "Order status:",
        response.status
      );

      console.log(
        "Order response:",
        data
      );


      if (!response.ok) {

        alert(
          data.detail ||
          data.message ||
          "Order failed"
        );

        return;
      }


      // 5. Order successful
      alert(
        "Order placed successfully!"
      );


      // 6. Go back to Products
      navigate("/");

    } catch (error) {

      console.log(
        "Order error:",
        error
      );

      alert(
        "Unable to connect to server"
      );
    }
  };


  return (

    <div className="checkout-container">

      <div className="checkout-box">

        <h1>Checkout</h1>

        <h2>Order Summary</h2>


        {cartProducts.map((product) => (

          <div
            className="checkout-product"
            key={product.id}
          >

            <p>
              <strong>
                {product.product_name}
              </strong>
            </p>


            <p>
              Quantity:{" "}
              {product.cart_quantity}
            </p>


            <p>
              Price: Rs.{" "}
              {
                product.price *
                product.cart_quantity
              }
            </p>

          </div>

        ))}


        <h2>
          Total: Rs. {totalPrice}
        </h2>


        <form onSubmit={handlePlaceOrder}>


          <div className="form-group">

            <label>Name</label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              required
            />

          </div>


          <div className="form-group">

            <label>Address</label>

            <textarea
              placeholder="Enter your address"
              value={address}
              onChange={(e) =>
                setAddress(e.target.value)
              }
              required
            />

          </div>


          <div className="form-group">

            <label>Phone</label>

            <input
              type="text"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
              required
            />

          </div>


          <div className="form-group">

            <label>
              Payment Method
            </label>

            <select
              value={paymentMethod}
              onChange={(e) =>
                setPaymentMethod(
                  e.target.value
                )
              }
            >

              <option value="Cash on Delivery">
                Cash on Delivery
              </option>

              <option value="Card">
                Card
              </option>

            </select>

          </div>


          <button
            type="submit"
            className="place-order-btn"
          >
            Place Order
          </button>


          <button
            type="button"
            className="back-btn"
            onClick={() =>
              navigate("/cart")
            }
          >
            Back to Cart
          </button>


        </form>

      </div>

    </div>

  );
}

export default Checkout;

