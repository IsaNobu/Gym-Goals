import { RouterProvider } from "react-router-dom";
import "./index.css";
import { createRoot } from "react-dom/client";
import router from "./Routes/PublicRoute";
import { HelmetProvider } from "react-helmet-async";
import AuthProvider from "./Auth Provider/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <RouterProvider router={router} />
        </HelmetProvider>
      </QueryClientProvider>
    </AuthProvider>
  </>
);
