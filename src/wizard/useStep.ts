import React from "react";
import { useLocation } from "wouter";

export default function useStep() {
  const stepRef = React.useRef("/");
  const [location] = useLocation();
  stepRef.current = location;
}
