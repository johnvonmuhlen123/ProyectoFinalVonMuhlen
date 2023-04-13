import React, { useContext, useEffect, useState } from "react";
import styles from "./cart.module.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Link } from "react-router-dom";
import { Badge, IconButton, MenuItem } from "@mui/material";

const CartWidget = () => {
  const [totalCartItems, setTotalCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems"))?.length || 0
  );

  const updateCount = () => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setTotalCartItems(cartItems.length);
    console.log("storage changed");
  };

  useEffect(() => {
    const localStorageData =
      JSON.parse(localStorage.getItem("cartItems")) || [];
    setTotalCartItems(localStorageData.length);
  }, ["cartItems"]);

  return (
    <div className={styles.container}>
      <Link to={"/cart"}>
        <MenuItem>
          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
          >
            <Badge badgeContent={totalCartItems} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </MenuItem>
      </Link>
      <IconButton onClick={updateCount}>
        <RefreshIcon fontSize="small" />
      </IconButton>
    </div>
  );
};

export default CartWidget;
