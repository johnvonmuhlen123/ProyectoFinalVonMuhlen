import React, { useEffect, useState } from "react";
import styles from "./item.module.css";
import CardComponent from "./Card/Card";
import { useParams } from "react-router-dom";

const ItemListContainer = () => {
  const [products, setProducts] = useState([]);
  const { category } = useParams();

  useEffect(() => {
    fetch(
      `https://fakestoreapi.com/products${
        category ? `/category/${decodeURIComponent(category)}` : "?limit=20"
      }`
    )
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error(error));
  }, [category]);

  console.log(products);

  return (
    <div>
      <div className={styles.titleContainer}>
        <h1 className={styles.greeting}>
          {category
            ? `${decodeURIComponent(category)
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}`
            : "Welcome to Spice and Dance"}
        </h1>
      </div>
      <div className={styles.container}>
        {products.map((product) => (
          <CardComponent key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ItemListContainer;
