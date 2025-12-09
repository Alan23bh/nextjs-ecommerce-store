"use client";
import { Product } from "@/app/types/Product";
import { useCart } from "@/app/context/CartContext";
import { Button } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { IconButton } from "@mui/material";
import { useNotification } from "@/app/context/NotificationContext";

type Props = {
  product: Product;
};

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { notify } = useNotification();

  const handleClick = () => {
    addToCart(product);
    notify("Added to cart", "success");
  };

  return (
    <Button
      variant="contained"
      startIcon={<AddShoppingCartIcon />}
      onClick={handleClick}
      sx={{ textTransform: "none" }}
    >
      Add to cart
    </Button>
  );
}
