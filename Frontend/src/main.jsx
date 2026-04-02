import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../src/App/index.css";
import RootLayout from "../src/App/RootLayout.jsx";
import { RouterProvider } from "react-router-dom";
import { router } from "./App/app.routes.jsx";
import { Provider } from "react-redux";
import { store } from "./App/app.store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RootLayout>
        <RouterProvider router={router} />
      </RootLayout>
    </Provider>
  </StrictMode>,
);
