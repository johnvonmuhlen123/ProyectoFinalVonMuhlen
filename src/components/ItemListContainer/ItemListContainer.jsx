import React, { useEffect, useState } from "react";
import styles from "./item.module.css";
import CardComponent from "./Card/Card";
import { useParams } from "react-router-dom";

import db from "../../../db/firebase-config";
import { collection, query, where, getDocs } from "firebase/firestore"; // Import 'query' and 'where' from firebase/firestore

const ItemListContainer = () => {
  const [items, setItems] = useState([]);
  const { category } = useParams();

  const itemsRef = collection(db, "items");

  const getItems = async () => {
    let queryRef = itemsRef;

    if (category) {
      queryRef = query(itemsRef, where("category", "==", category));
    }

    const itemsCollection = await getDocs(queryRef);
    const items = itemsCollection.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setItems(items);
  };

  useEffect(() => {
    getItems();
  }, [category]);

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
        {items.map((item) => (
          <CardComponent clickable={true} key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
};

export default ItemListContainer;
