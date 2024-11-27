import { useLocation } from "wouter";
import "./style.css";
import React from "react";

export default function Step({
  children,
  label,
}: {
  children?: React.ReactNode;
  label?: React.ReactNode;
}) {
  const [location] = useLocation();
  const stepRef = React.useRef(location);
  const current = stepRef.current === location;
  return (
    <div className={current ? "page-container" : undefined}>
      <div className={current ? "step-component" : undefined}>
        {current ? (label ?? "") : ""}
        {children}
      </div>
    </div>
  );
}
