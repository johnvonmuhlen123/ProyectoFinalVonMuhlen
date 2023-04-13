import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Card from "../ItemListContainer/Card/Card";
import { Button } from "@mui/material";
import db from "../../../db/firebase-config.js";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

const Checkout = () => {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || []
  );

  const navigate = useNavigate();

  const [orderCompleted, setOrderCompleted] = useState(false);

  const [total, setTotal] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    repeatEmail: "",
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const localStorageData =
      JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems([...localStorageData]);
  }, ["cartItems"]);

  useEffect(() => {
    let totalPrice = 0;
    cartItems.forEach((element) => {
      totalPrice += element.price;
    });
    setTotal(totalPrice);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = {};
    let hasErrors = false;

    if (formData.email !== formData.repeatEmail) {
      errors.repeatEmail = "Emails do not match";
      hasErrors = true;
    }

    if (
      !formData.name ||
      !formData.lastName ||
      !formData.phoneNumber ||
      !formData.email ||
      !formData.repeatEmail
    ) {
      errors.general = "All fields are required";
      hasErrors = true;
    }

    if (hasErrors) {
      setFormErrors(errors);
      return;
    }

    if (!hasErrors) {
      placeOrder();
    }
  };

  const placeOrder = () => {
    const currentDate = new Date();

    const now = `${currentDate.getFullYear()}-${
      currentDate.getMonth() - 1
    }-${currentDate.getDate()}-${currentDate.getHours()}-${currentDate.getMinutes()}`;

    const products = [];
    let totalCost = 0;

    cartItems.forEach((item) => {
      const product = {
        productName: item.title,
        price: item.price,
        description: item.description,
      };
      totalCost += item.price;
      products.push(product);
    });

    const newOrder = {
      products: products,
      totalCost: totalCost,
      buyer: {
        name: formData.name,
        lastName: formData.lastName,
        email: formData.email,
      },
      timestamp: now,
      state: "Generated",
    };

    if (newOrder) {
      const orderCollectionRef = collection(db, "orders");
      addDoc(orderCollectionRef, newOrder);

      setOrderCompleted(true);

      localStorage.clear();

      navigate("/order-details", {
        state: { shouldBeHere: true, time: now, buyer: newOrder.buyer },
      });
    }
  };

  return (
    <div>
      <div>
        <h2 style={{ padding: "15px" }}>Checkout</h2>
        <form>
          <div style={{ display: "flex" }}>
            <TextField
              required
              style={{ margin: "10px" }}
              id="outlined-required"
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              error={!!formErrors.name}
              helperText={formErrors.name}
            />

            <TextField
              required
              style={{ margin: "10px" }}
              id="outlined-required"
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              error={!!formErrors.lastName}
              helperText={formErrors.lastName}
            />

            <TextField
              required
              type="number"
              style={{ margin: "10px" }}
              id="outlined-required"
              label="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              error={!!formErrors.phoneNumber}
              helperText={formErrors.phoneNumber}
            />

            <TextField
              required
              style={{ margin: "10px" }}
              id="outlined-required"
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              error={!!formErrors.email}
              helperText={formErrors.email}
            />
            <TextField
              required
              style={{ margin: "10px" }}
              id="outlined-required"
              label="Repeat Email"
              name="repeatEmail"
              value={formData.repeatEmail}
              onChange={handleInputChange}
              error={!!formErrors.repeatEmail}
              helperText={formErrors.repeatEmail}
            />
          </div>
          {formErrors.general && (
            <p
              style={{
                color: "red",
                marginLeft: "10px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {formErrors.general}
            </p>
          )}
          <div>
            <h3>Your Products:</h3>
            {cartItems.map((item) => (
              <div>
                <Card product={item} key={item.id} />
              </div>
            ))}
          </div>
          <div style={{ alignItems: "center", margin: "20px" }}>
            <h3>Total: ${total}</h3>
            <Button type="submit" variant="contained" onClick={handleSubmit}>
              Place Order
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
