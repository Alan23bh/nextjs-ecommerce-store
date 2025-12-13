"use client";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Stack,
  Button,
  Avatar,
  ListItemAvatar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCart } from "../context/CartContext";
import { Add, Remove } from "@mui/icons-material";
import { useNotification } from "../context/NotificationContext";

export default function CartPage() {
  const { state, removeFromCart, clearCart, increment, decrement } = useCart();
  const { notify } = useNotification();

  const total = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom textAlign={"center"}>
        Cart
      </Typography>

      {state.items.length === 0 ? (
        <Typography sx={{ pt: 4, textAlign: "center", fontSize: 18 }}>
          Your cart is empty.
        </Typography>
      ) : (
        <>
          <List>
            {state.items.map((item) => (
              <ListItem
                key={item.id}
                secondaryAction={
                  <Stack direction="row" spacing={1} alignItems="center">
                    <IconButton size="small" onClick={() => decrement(item.id)}>
                      <Remove fontSize="small" />
                    </IconButton>

                    <Typography>{item.quantity}</Typography>

                    <IconButton size="small" onClick={() => increment(item.id)}>
                      <Add fontSize="small" />
                    </IconButton>

                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => {
                        removeFromCart(item.id),
                          notify("Item removed from cart", "error");
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                }
              >
                {/* IMAGE */}
                <ListItemAvatar>
                  <Avatar
                    variant="square"
                    src={item.image}
                    alt={item.title}
                    sx={{
                      width: 48,
                      height: 48,
                      mr: 1,
                      bgcolor: "transparent",
                      borderRadius: 1,
                    }}
                  />
                </ListItemAvatar>

                {/* title + price */}

                <ListItemText
                  primary={item.title}
                  secondary={`$${(item.price * item.quantity).toFixed(2)}`}
                />
              </ListItem>
            ))}
          </List>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
            gap={2}
            mt={2}
          >
            <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>
            <Button
              variant="outlined"
              onClick={() => {
                clearCart();
                notify("Cart cleared", "error");
              }}
            >
              Clear cart
            </Button>
          </Stack>
        </>
      )}
    </Container>
  );
}
