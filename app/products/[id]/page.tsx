import { getProduct, getProducts } from "@/app/lib/api";
import { Product } from "@/app/types/Product";
import {
  Container,
  Box,
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@mui/material";
import { Suspense } from "react";
import AddToCartButton from "./AddToCartButton";

import Link from "next/link";
import Grid from "@mui/material/Grid";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const product: Product = await getProduct(id);
  const allProduct: Product[] = await getProducts();

  // Related logic

  const related = allProduct.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <Container sx={{ py: 6, maxWidth: "md" }}>
      {/* Main Product area */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1.2fr" },
          gap: 6,
          alignItems: "center",
        }}
      >
        {/* Image column */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            src={product.image}
            alt={product.title}
            sx={{
              height: 300,
              width: "auto",
              objectFit: "contain",
              borderRadius: 2,
              boxShadow: 2,
              p: 2,
              backgroundColor: "white",
            }}
          />
        </Box>

        {/* Text / info column */}
        <Box>
          <Typography variant="h4" textAlign="center" gutterBottom>
            {product.title}
          </Typography>

          <Typography
            variant="h5"
            color="primary"
            textAlign="center"
            fontWeight="bold"
            gutterBottom
          >
            ${product.price.toFixed(2)}
          </Typography>

          <Typography
            variant="body1"
            textAlign="center"
            sx={{ mb: 3, opacity: 0.8 }}
          >
            {product.description}
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Suspense fallback={null}>
              <AddToCartButton product={product} />
            </Suspense>
          </Box>
        </Box>
      </Box>

      {/* RELATED PRODUCTS SECTION */}
      <Box sx={{ mt: 8 }}>
        <Typography sx={{ textAlign: "center" }} variant="h5" gutterBottom>
          You might also like
        </Typography>

        <Box
          sx={{
            mt: 3,
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(1, minmax(0, 1fr))",
              sm: "repeat(2, minmax(0, 1fr))",
              md: "repeat(4, minmax(0, 1fr))",
            },
            gap: 3,
            justifyItems: "center",
          }}
        >
          {related.map((p) => (
            <Card
              key={p.id}
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 4,
                },
                transition: "transform 0.15s ease, box-shadow 0.15s ease",
              }}
            >
              <CardMedia
                component="img"
                image={p.image}
                alt={p.title}
                sx={{
                  height: 140,
                  objectFit: "contain",
                  p: 1.5,
                }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    mb: 1,
                  }}
                >
                  {p.title}
                </Typography>
                <Typography variant="subtitle1" fontWeight={600}>
                  ${p.price.toFixed(2)}
                </Typography>
              </CardContent>
              <CardActions
                sx={{
                  justifyContent: "space-between",
                  px: 2,
                  pb: 2,
                  pt: 0,
                }}
              >
                <Button
                  component={Link}
                  href={`/products/${p.id}`}
                  size="small"
                  sx={{ textTransform: "none" }}
                >
                  View
                </Button>

                <AddToCartButton product={p} />
              </CardActions>
            </Card>
          ))}
        </Box>
      </Box>
    </Container>
  );
}
