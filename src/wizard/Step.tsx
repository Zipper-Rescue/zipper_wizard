import React from "react";
import useIsDisplayed from "./useIsDisplayed";
import "./style.css";

export default function Step({
  label,
  children,
}: {
  label?: React.ReactNode;
  children?: React.ReactNode;
}) {
  const isDisplayed = useIsDisplayed();

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className={isDisplayed ? "page-container" : undefined}>
      <div className={isDisplayed ? "step-component" : undefined}>
        {isDisplayed ? (
          <>
            {label ?? null}
            {children}
            <div className="back-button-container">
              <button className="back-button" onClick={handleBack}>
                Back
              </button>
            </div>
          </>
        ) : (
          children
        )}
      </div>
    </div>
  );
}
