import React from "react";
import styles from "./card.module.css";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const CardComponent = ({ product }) => {
  return (
    <div>
      <Link to={`/item/${product.id}`} className={styles.link}>
        <Card
          className={styles.card}
          sx={{
            maxWidth: "100%",
            margin: "15px",
            height: "100",
            textDecoration: "none",
          }}
        >
          <CardMedia
            sx={{
              height: 140,
              width: 140,
              margin: 0,
              padding: 0,
            }}
            image={product.image}
            title={product.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {product.title}
            </Typography>
            <span>{`$${product.price}`}</span>
            <Typography variant="body2" color="text.secondary">
              {product.description}
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};

export default CardComponent;
