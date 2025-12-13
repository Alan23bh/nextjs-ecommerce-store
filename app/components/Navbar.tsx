"use client";
import Image from "next/image";
import Link from "next/link";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Box,
} from "@mui/material";
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
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
            <Image
              src="/logo-white.svg"
              alt="Next-Shop"
              width={120}
              height={28}
              priority
            />
          </Box>
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
