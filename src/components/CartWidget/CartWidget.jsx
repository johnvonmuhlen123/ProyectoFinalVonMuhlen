import React from "react";
import styles from "./cart.module.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const CartWidget = () => {
  return (
    <div className={styles.container}>
      <ShoppingCartIcon />
      <p>2</p>
    </div>
  );
};

export default CartWidget;
