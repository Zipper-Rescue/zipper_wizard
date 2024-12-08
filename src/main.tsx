import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Route } from "wouter";

const rootElement = document.getElementById("root");

if (rootElement === null) {
  throw new Error("No root, add <div id=\"root\"></div> to the body of index.html.");
}

createRoot(rootElement).render(
  <StrictMode>
    <Route component={App}/>
  </StrictMode>
);
