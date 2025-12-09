"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Snackbar, Alert, AlertColor } from "@mui/material";

type NotificationState = {
  open: boolean;
  message: string;
  severity: AlertColor; // "success" | "info" | "warning" | "error"
};

type NotificationContextValue = {
  notify: (message: string, severity?: AlertColor) => void;
};

const NotificationContext = createContext<NotificationContextValue | null>(
  null
);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<NotificationState>({
    open: false,
    message: "",
    severity: "info",
  });

  const notify = (message: string, severity: AlertColor = "info") => {
    setState({ open: true, message, severity });
  };

  const handleClose = () => {
    setState((prev) => ({ ...prev, open: false }));
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      {/* The actual toast UI, mounted once at the root */}
      <Snackbar
        open={state.open}
        autoHideDuration={2500}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={state.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {state.message}
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const ctx = useContext(NotificationContext);
  if (!ctx)
    throw new Error("useNotification must be used within NotificationProvider");
  return ctx;
}
