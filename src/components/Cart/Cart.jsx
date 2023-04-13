import React, { useContext, useEffect, useState } from "react";
import Card from "../ItemListContainer/Card/Card";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || []
  );

  const handleClearCart = () => {
    localStorage.clear();
  };

  const handleRemoveFromCart = (id) => {
    const localStorageData = JSON.parse(localStorage.getItem("cartItems"));
    const indexToRemove = localStorageData.findIndex((item) => item.id === id);

    if (indexToRemove !== -1) {
      localStorageData.splice(indexToRemove, 1);
      localStorage.setItem("cartItems", JSON.stringify(localStorageData));
      setCartItems([...localStorageData]);
    }
  };

  useEffect(() => {
    const localStorageData =
      JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems([...localStorageData]);
  }, ["cartItems"]);

  if (!cartItems) {
    return <div>Loading cart items...</div>;
  } else if (cartItems.length === 0) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", marging: "20px" }}
      >
        <h1>No Items In Cart</h1>
      </div>
    );
  }

  return (
    <div>
      <h1
        style={{ display: "flex", justifyContent: "center", padding: "10px" }}
      >
        My Cart
      </h1>
      <ul>
        {cartItems.map((item) => (
          <div>
            <Card product={item} key={item.id} />
            <Button
              variant="contained"
              color="error"
              onClick={() => handleRemoveFromCart(item.id)}
            >
              Remove From Cart
            </Button>
          </div>
        ))}
      </ul>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button style={{ margin: "20px" }} variant="contained">
          <Link
            to={"/checkout"}
            style={{ textDecoration: "none", color: "white" }}
          >
            To Checkout
          </Link>
        </Button>
        <Button
          style={{ margin: "20px" }}
          variant="contained"
          color="error"
          onClick={handleClearCart}
        >
          <Link to={"/cart"} style={{ textDecoration: "none", color: "white" }}>
            Clear Cart
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Cart;
