import React from "react";
import ReactDOM from "react-dom/client";
import "@/index.scss";
import { Routing } from "@/routing";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient: QueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ToastContainer position="bottom-right" autoClose={4000} draggable pauseOnHover theme="light" closeOnClick />
      <Routing />
    </QueryClientProvider>
  </React.StrictMode>,
);
