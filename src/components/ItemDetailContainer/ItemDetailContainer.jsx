import { Button } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import db from "../../../db/firebase-config";
import Card from "../ItemListContainer/Card/Card";

const ItemDetailContainer = () => {
  const [product, setProduct] = useState([]);
  const { id } = useParams();

  const [count, setCount] = useState(0);

  const increment = () => {
    if (count < 5) {
      setCount(count + 1);
    }
  };

  const decrement = () => {
    if (count > 0) setCount(count - 1);
  };

  const handleAddToCart = (product, count) => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    for (let i = 0; i < count; i++) {
      cartItems.push(product);
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  const getItem = async () => {
    const docRef = doc(db, "items", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setProduct(docSnap.data());
    } else {
      return <h1>The product you are looking for does not exist</h1>;
    }
  };

  useEffect(() => {
    getItem();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Card clickable={false} product={product} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button variant="contained" onClick={increment}>
          + Add
        </Button>
        <div style={{ padding: "10px" }}>Total Items: {count}</div>
        <Button variant="contained" color="error" onClick={decrement}>
          - Remove
        </Button>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p>Total: ${count * product.price}</p>

          <Link to={"/cart"} style={{ textDecoration: "none" }}>
            <Button
              disabled={count <= 0}
              onClick={() => handleAddToCart(product, count)}
            >
              Add {count} product/s to Cart
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailContainer;
