"use client";

import Link from "next/link";
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Toolbar,
} from "@mui/material";

export default function HomePage() {
  return (
    <>
      <Box
        sx={{
          minHeight: "calc(100vh - 64px)", // adjust if your Navbar height differs
          display: "flex",
          alignItems: "center",
          background: "linear-gradient(180deg, #F7FAFF 0%, #EEF4FF 100%)",
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3} sx={{ maxWidth: 640 }}>
            <Typography variant="h3" sx={{ fontWeight: 800, lineHeight: 1.1 }}>
              Next-Shop
            </Typography>

            <Typography variant="h6" color="text.secondary">
              Curated picks. Clean design. Fast checkout. Built with Next.js +
              MUI.
            </Typography>

            <Stack direction="row" spacing={2}>
              <Button
                component={Link}
                href="/products"
                variant="contained"
                size="large"
                sx={{
                  px: 3,
                  color: "primary.contrastText",
                }}
              >
                Shop Products
              </Button>

              <Button
                component={Link}
                href="/products"
                variant="outlined"
                size="large"
                sx={{ px: 3 }}
              >
                Browse Categories
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
