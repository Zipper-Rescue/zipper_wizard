import React from "react";
import useIsDisplayed from "./useIsDisplayed";
import "./style.css";
import { useBrowserLocation } from "wouter/use-browser-location";

function BackButton() {
  const [browserLocation] = useBrowserLocation();
  const handleBack = () => {
    window.history.back();
  };
  return <>
  {browserLocation !== '/' ? <div className="back-button-container">
    <button className="back-button" onClick={handleBack}>
      Back
    </button>
  </div> : null}</>
}

export default function Step({
  label,
  children,
}: {
  label?: React.ReactNode;
  children?: React.ReactNode;
}) {
  const isDisplayed = useIsDisplayed();

  return (
    <div className={isDisplayed ? "page-container" : undefined}>
      <div className={isDisplayed ? "step-component" : undefined}>
        {isDisplayed ? (
          <>
            {label ?? null}
            {children}
            <BackButton />
          </>
        ) : (
          children
        )} 
      </div>
    </div>
  );
}
