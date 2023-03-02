import React from "react";
import styles from "./item.module.css";

const ItemListContainer = ({ greeting }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.greeting}>{greeting}</h1>
    </div>
  );
};

export default ItemListContainer;
