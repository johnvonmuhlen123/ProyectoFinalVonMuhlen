import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../ItemListContainer/Card/Card";

const ItemDetailContainer = () => {
  const [product, setProduct] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error(error));
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Card product={product} />
    </div>
  );
};

export default ItemDetailContainer;
