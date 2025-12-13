"use client";

import Link from "next/link";
import { AppBar, Toolbar, Typography, IconButton, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { state } = useCart();
  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AppBar position="sticky">
      <Toolbar
        sx={{
          color: "primary.contrastText",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Typography variant="h6">Next-Shop</Typography>
        </Link>
        <Link href="/cart">
          <IconButton size="large" color="inherit">
            <Badge badgeContent={totalItems} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Link>
      </Toolbar>
    </AppBar>
  );
}
