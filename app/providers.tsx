"use client";

import { ThemeProvider, CssBaseline, createTheme, Box } from "@mui/material";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import { NotificationProvider } from "./context/NotificationContext";
import Footer from "./components/Footer";

const theme = createTheme({
  palette: {
    mode: "light",
    // Soft pastel brand
    primary: {
      main: "#4F7FFF", // modern blue
      dark: "#3B63D1",
      contrastText: "#FFFFFF",
    },
    secondary: {
      // for accents, badges, etc.
      main: "#8B5CF6",
    },
    background: {
      default: "#F7F9FC",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#1E293B",
      secondary: "#64748B",
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: `"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`,
    h4: {
      fontWeight: 700,
      letterSpacing: 0.3,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
        },
      },
    },
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
              background:
                "linear-gradient(180deg, rgba(79,127,255,0.10) 0%, rgba(79,127,255,0.04) 45%, rgba(15,23,42,0.02) 100%)",
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
