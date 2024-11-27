import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Route, Redirect } from "wouter";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Route path="/wizard" component={App} nest/>
    <Redirect to="/wizard"/>
  </StrictMode>
);
