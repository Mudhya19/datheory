import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router.jsx";

const container = document.getElementById("root");

if (!container) {
  console.error("Root container #root not found");
} else {
  console.log("React successfully mounted to #root");
  createRoot(container).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}
