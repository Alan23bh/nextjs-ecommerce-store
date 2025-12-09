import { getProduct, getProducts } from "@/app/lib/api";
import { Product } from "@/app/types/Product";
import {
  Container,
  Grid,
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
import NextLink from "next/link";
import Link from "next/link";

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
      <Grid container spacing={6} justifyContent="center">
        <Grid
          item
          xs={12}
          md={5}
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
        </Grid>

        <Grid item xs={12} md={7}>
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
        </Grid>
      </Grid>
      {/* // RELATED PRODUCTS SECTION */}
      <Box sx={{ mt: 8 }}>
        <Typography sx={{ textAlign: "center" }} variant="h5" gutterBottom>
          You might also like
        </Typography>

        <Grid
          sx={{ display: "flex", justifyContent: "center" }}
          container
          spacing={3}
        >
          {related.map((p) => (
            <Grid key={p.id} item xs={12} sm={6} md={3}>
              <Card
                sx={{
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
                  <Link
                    href={`/products/${p.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Button size="small" sx={{ textTransform: "none" }}>
                      View
                    </Button>
                  </Link>

                  <AddToCartButton product={p} />
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
