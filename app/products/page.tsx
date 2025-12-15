"use client";
import { useState, useMemo, useEffect } from "react";
import AddToCartButton from "../products/[id]/AddToCartButton";
import { Product } from "../types/Product";
import { productsData } from "../lib/productsData";
import {
  Container,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  Paper,
  List,
  ListItemButton,
  ListItemText,
  Skeleton,
  Alert,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getProducts } from "../lib/api";

const categories = [
  { label: "All products", value: "all" },
  { label: "Men's clothing", value: "men's clothing" },
  { label: "Women's clothing", value: "women's clothing" },
  { label: "Jewelry", value: "jewelery" },
  { label: "Electronics", value: "electronics" },
];
export default function ProductsPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [products, setProducts] = useState<Product[]>([]);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [error, setError] = useState<string>("");

  // const products: Product[] = productsData;

  const fetchAllProducts = async () => {
    setStatus("loading");
    setError("");

    try {
      const data = await getProducts();
      setProducts(data);
      setStatus("success");
    } catch (e: any) {
      setStatus("error");
      setError(e?.message || "Something went wrong loading products.");
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const filteredProducts = useMemo(
    () =>
      selectedCategory === "all"
        ? products
        : products.filter((p) => p.category === selectedCategory),
    [products, selectedCategory]
  );

  function ProductsGridSkeleton() {
    return (
      <Box
        sx={{
          flexGrow: 1,
          borderRadius: 5,
          background: "linear-gradient(180deg, #ffffff 0%, #f5f9ff 100%)",
          backdropFilter: "blur(6px)",
          border: "1px solid rgba(15, 23, 42, 0.06)",
          p: { xs: 2, md: 4 },
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(2, 1fr)",
          },
          gap: { xs: 2, sm: 3 },
          alignItems: "stretch",
        }}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <Card
            key={i}
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              borderRadius: 5,
              boxShadow: 5,
            }}
          >
            <Skeleton variant="rectangular" height={160} />
            <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
              <Skeleton width="85%" sx={{ mx: "auto", mb: 1 }} />
              <Skeleton width="55%" sx={{ mx: "auto" }} />
            </CardContent>
            <Box sx={{ px: 2, pb: 2 }}>
              <Skeleton variant="rounded" height={36} />
            </Box>
          </Card>
        ))}
      </Box>
    );
  }

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: { xs: 3, md: 6 },
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ textAlign: "center", mb: { xs: 2, md: 4 } }}
      >
        Products
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 2, md: 3 },
          alignItems: { xs: "stretch", md: "flex-start" },
        }}
      >
        {/* Sidebar */}
        <Paper
          elevation={5}
          sx={{
            color: "text.primary",
            background: "background.paper",
            width: { xs: "100%", md: 220 },
            flexShrink: 0,
            p: 2,
            borderRadius: 3,
            position: { xs: "static", md: "sticky" },
            top: 90,
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{ textAlign: "center", fontSize: { xs: 16, md: 18 } }}
          >
            Categories
          </Typography>

          <List
            sx={{
              display: "flex",
              flexDirection: { xs: "row", md: "column" },
              gap: { xs: 1, md: 0 },
              flexWrap: { xs: "wrap", md: "nowrap" },
              justifyContent: { xs: "center", md: "center" },
              alignItems: { xs: "center", md: "center" },
              overflowX: { xs: "visible", md: "visible" },
              pb: { xs: 1, md: 0 },
              px: { xs: 1.25, md: 2 },
              py: { xs: 0.5, md: 1 },
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {categories.map((cat) => (
              <ListItemButton
                key={cat.value}
                selected={selectedCategory === cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                sx={{
                  borderRadius: 2,
                  mb: { xs: 0, md: 0.5 },
                  flexShrink: 0,
                  px: { xs: 1.5, md: 2 },
                  py: { xs: 0.75, md: 1 },
                }}
              >
                <ListItemText
                  sx={{ textAlign: "center" }}
                  primary={cat.label}
                  primaryTypographyProps={{
                    noWrap: true,
                    fontSize: { xs: 14, md: 15 },
                  }}
                />
              </ListItemButton>
            ))}
          </List>
        </Paper>

        {/* Products area */}
        {status === "loading" && <ProductsGridSkeleton />}

        {status === "error" && (
          <Box sx={{ flexGrow: 1 }}>
            <Alert
              severity="error"
              action={
                <Button color="inherit" size="small" onClick={fetchAllProducts}>
                  Retry
                </Button>
              }
              sx={{ borderRadius: 3 }}
            >
              {error || "Couldnt load products."}
            </Alert>
          </Box>
        )}

        {status === "success" && filteredProducts.length === 0 && (
          <Box sx={{ flexGrow: 1 }}>
            <Alert severity="info" sx={{ borderRadius: 3 }}>
              No products found for this category.
            </Alert>
          </Box>
        )}

        {status === "success" && filteredProducts.length > 0 && (
          <Box
            sx={{
              flexGrow: 1,
              borderRadius: 5,
              background: "rgba(255,255,255,0.7)",
              backdropFilter: "blur(6px)",
              border: "1px solid rgba(15, 23, 42, 0.06)",
              p: { xs: 2, md: 4 },
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(2, 1fr)",
              },
              gap: { xs: 2, sm: 3 },
              alignItems: "stretch",
            }}
          >
            {filteredProducts.map((p) => (
              <Card
                key={p.id}
                onClick={() => router.push(`/products/${p.id}`)}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 150ms ease, box-shadow 150ms ease",
                  boxShadow: 5,
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 4,
                  },
                  borderRadius: 5,
                  cursor: "pointer",
                }}
              >
                <CardMedia
                  component="img"
                  image={p.image}
                  alt={p.title}
                  sx={{
                    objectFit: "contain",
                    height: { xs: 140, sm: 150 },
                    p: 2,
                  }}
                />
                <CardContent
                  sx={{
                    color: "text.primary",
                    flexGrow: 1,
                    textAlign: "center",
                    px: { xs: 1.5, md: 2 },
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      mb: 1,
                      minHeight: 40,
                      fontSize: { xs: 13, sm: 14 },
                    }}
                  >
                    {p.title}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, fontSize: { xs: 16, sm: 18 } }}
                  >
                    ${p.price.toFixed(2)}
                  </Typography>
                </CardContent>

                <Box
                  sx={{ px: 2, pb: 2, pt: 0 }}
                  onClick={(e) => e.stopPropagation()} // prevents card click when pressing AddToCart
                >
                  <AddToCartButton product={p} />
                </Box>
              </Card>
            ))}
          </Box>
        )}

        {/* <Box
          sx={{
            flexGrow: 1,
            borderRadius: 5,
            background: "rgba(255,255,255,0.7)",
            backdropFilter: "blur(6px)",
            border: "1px solid rgba(15, 23, 42, 0.06)",
            p: { xs: 2, md: 4 },
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(2, 1fr)",
            },

            gap: { xs: 2, sm: 3 },
            alignItems: "stretch",
          }}
        >
          {filteredProducts.map((p) => (
            <Card
              key={p.id}
              onClick={() => router.push(`/products/${p.id}`)}
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "transform 150ms ease, box-shadow 150ms ease",
                boxShadow: 5,
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 4,
                },
                borderRadius: 5,
              }}
            >
              <CardMedia
                component="img"
                image={p.image}
                alt={p.title}
                sx={{
                  objectFit: "contain",
                  height: { xs: 140, sm: 150 },
                  p: 2,
                }}
              />
              <CardContent
                sx={{
                  color: "text.primary",
                  flexGrow: 1,
                  textAlign: "center",
                  px: { xs: 1.5, md: 2 },
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    mb: 1,
                    minHeight: 40,
                    fontSize: { xs: 13, sm: 14 },
                  }}
                >
                  {p.title}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, fontSize: { xs: 16, sm: 18 } }}
                >
                  ${p.price.toFixed(2)}
                </Typography>
              </CardContent>

              <Box sx={{ px: 2, pb: 2, pt: 0 }}>
                <AddToCartButton product={p} />
              </Box>
            </Card>
          ))}
        </Box> */}
      </Box>
    </Container>
  );
}
