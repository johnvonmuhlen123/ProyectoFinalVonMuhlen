import React from "react";
import styles from "./cart.module.css";
import { GrCart } from "react-icons/gr";

const CartWidget = () => {
  return (
    <div className={styles.container}>
      <GrCart />
      <p>2</p>
    </div>
  );
};

export default CartWidget;
