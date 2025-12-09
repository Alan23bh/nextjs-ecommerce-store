"use client";

import { ThemeProvider, CssBaseline, createTheme, Box } from "@mui/material";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import { NotificationProvider } from "./context/NotificationContext";
import Footer from "./components/Footer";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#ff6d00" },
    secondary: { main: "#0066ff" },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NotificationProvider>
        <CartProvider>
          {/* Full-page flex layout: header | main | footer */}
          <Box
            sx={{
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Navbar />

            <Box component="main" sx={{ flex: 1 }}>
              {children}
            </Box>

            <Footer />
          </Box>
        </CartProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}
