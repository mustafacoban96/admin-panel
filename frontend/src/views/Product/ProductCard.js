// ProductCard.js Component
import React from "react";
import { Card, CardContent, Typography, CardActions, Button } from "@mui/material";

const ProductCard = ({ product }) => {
  return (
    <Card className="bg-white shadow-lg rounded-xl transition-all transform hover:scale-105">
      <CardContent>
        <Typography variant="h6" component="div">
          {product.name}
        </Typography>
        <Typography color="text.secondary">
          {product.description}
        </Typography>
        <Typography variant="h5" className="font-bold mt-2">
          ${product.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained" color="primary">
          Buy Now
        </Button>
        <Button size="small" variant="outlined" color="secondary">
          Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;