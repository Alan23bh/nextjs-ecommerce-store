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
  Button,
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
          alignItems: "center",
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
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

          <Button
            component={Link}
            href="/products"
            sx={{
              letterSpacing: "0.3px",
              fontSize: 17,
              textTransform: "none",
              fontWeight: 600,
              px: 2.5,
              py: 0.75,
              borderRadius: 999,
              backgroundColor: "rgba(255,255,255,0.15)",
              color: "white",
              transition: "background-color 0.2s ease",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.25)",
              },
            }}
          >
            Products
          </Button>
        </Box>
        <Box sx={{ flexGrow: 1 }} />

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
