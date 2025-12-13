"use client";

import {
  Box,
  Container,
  Stack,
  Typography,
  IconButton,
  Link as MuiLink,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        py: 2.5,
        borderTop: "1px solid",
        borderColor: "divider",
        bgcolor: "primary.main",
        color: "primary.contrastText",
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems="center"
          justifyContent="space-between"
          spacing={1.5}
        >
          <Typography
            variant="body2"
            sx={{ opacity: 0.9, textAlign: "center", fontSize: 18 }}
          >
            © {year} Next-Shop · Built with Next.js, TypeScript & MUI
          </Typography>

          <Stack direction="row" spacing={1}>
            <IconButton
              size="small"
              component={MuiLink}
              href="https://github.com/Alan23bh"
              target="_blank"
              rel="noopener"
              sx={{ color: "inherit" }}
            >
              <GitHubIcon fontSize="small" />
            </IconButton>

            <IconButton
              size="small"
              component={MuiLink}
              href="https://www.linkedin.com/in/alan-hernandez-aa8458326/"
              target="_blank"
              rel="noopener"
              sx={{ color: "inherit" }}
            >
              <LinkedInIcon fontSize="small" />
            </IconButton>

            <IconButton
              size="small"
              component={MuiLink}
              href="mailto:alan23bh@gmail.com.com"
              sx={{ color: "inherit" }}
            >
              <MailOutlineIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
