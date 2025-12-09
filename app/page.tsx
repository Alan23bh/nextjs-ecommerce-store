import { getProducts } from "./lib/api";
import AddToCartButton from "./products/[id]/AddToCartButton";
import { Product } from "./types/Product";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
} from "@mui/material";
import Link from "next/link";

export default async function Home() {
  const products: Product[] = await getProducts();
  return (
    <Container sx={{ py: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ textAlign: "center" }}
      >
        Products
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: 3,
          alignItems: "stretch",
          p: 4,
          borderRadius: 5,
          background:
            "linear-gradient(185deg, #e9e3e3ff 0%, #ffecd2 40%, #f5d0c4ff 100%)",
        }}
      >
        {products.map((p) => (
          <Card
            key={p.id}
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              transition: "transform 150ms ease, box-shadow 150ms ease",
              boxShadow: 1,
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
                height: 150,
                p: 2,
              }}
            />
            <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
              <Typography
                variant="subtitle2"
                sx={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  mb: 1,
                  minHeight: 40,
                }}
              >
                {p.title}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                ${p.price.toFixed(2)}
              </Typography>
            </CardContent>

            <CardActions sx={{ justifyContent: "center", p: 2, pt: 0 }}>
              <Link
                href={`/products/${p.id}`}
                style={{ textDecoration: "none" }}
              >
                <Button size="small">View</Button>
              </Link>
              <AddToCartButton product={p} />
            </CardActions>
          </Card>
        ))}
      </Box>
    </Container>
  );
}
