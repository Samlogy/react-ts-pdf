import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import React, { Suspense } from "react";
// @ts-ignore
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App";
import "./index.css";
import theme from "./theme";

const queryClient = new QueryClient();

const container = document.getElementById("root");
// @ts-ignore
const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Suspense fallback={<p> Loading... </p>}>
          <ColorModeScript />
          <App />
        </Suspense>
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
