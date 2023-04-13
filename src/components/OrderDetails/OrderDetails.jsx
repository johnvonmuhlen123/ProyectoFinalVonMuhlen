import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import db from "../../../db/firebase-config.js";

const OrderDetails = () => {
  const [order, setOrder] = useState("");
  const [loading, setLoading] = useState(true); // Added loading state
  const { state } = useLocation();
  const { shouldBeHere, time, buyer } = state;

  if (shouldBeHere) {
    const ordersRef = collection(db, "orders");

    const getItem = async () => {
      let queryRef = ordersRef;

      queryRef = query(
        ordersRef,
        where("timestamp", "==", time),
        where("buyer.name", "==", buyer.name),
        where("buyer.lastName", "==", buyer.lastName),
        where("buyer.email", "==", buyer.email)
      );

      const querySnapshot = await getDocs(queryRef);
      const order = querySnapshot.forEach((doc) => {
        setOrder(doc);
        console.log(doc.id, " => ", doc.data());
      });
      setLoading(false); // Set loading to false after data is loaded
    };

    useEffect(() => {
      getItem();
    }, []);

    if (loading) {
      return (
        <div>
          <h2>Loading...</h2>
        </div>
      );
    }

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {" "}
          <h3>{`Order added with ID: ${order.id}`}</h3>
          <Link to={"/"}>Back To Home</Link>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h2>You Haven't Placed An Order Yet</h2>
        <Link to={"/"}>Back Home</Link>
      </div>
    );
  }
};

export default OrderDetails;
