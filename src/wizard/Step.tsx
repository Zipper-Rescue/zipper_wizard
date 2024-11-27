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
    return (
        <div className={isDisplayed ? "page-container" : undefined}>
            <div className={isDisplayed ? "step-component" : undefined}>
                {isDisplayed ? (label ?? null) : null}
                {children}
            </div>
        </div>
    );
}
