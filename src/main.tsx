import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import theme from "./theme.tsx";
import { RouterProvider } from "react-router-dom";
import { router } from "./router.tsx";
import "@mantine/core/styles.css"; 
import "@mantine/notifications/styles.css"; 
import { Notifications } from "@mantine/notifications";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <Notifications position="top-right" zIndex={9999} />
      <RouterProvider router={router} />
    </MantineProvider>
  </StrictMode>
);
