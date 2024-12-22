import React from "react";
import useIsDisplayed from "./useIsDisplayed";
import BackButton from "./BackButton";
import "./init_tailwind.css";

export default function Step({
  label,
  children,
}: {
  label?: React.ReactNode;
  children?: React.ReactNode;
}) {
  const isDisplayed = useIsDisplayed();

  return (
    <div
      className={
        isDisplayed
          ? "flex flex-col items-center justify-center min-h-screen bg-white p-4 max-h-96 lg:max-h-none"
          : undefined
      }
    >
      <div
        className={
          isDisplayed
            ? "w-full bg-gray-100 shadow-lg rounded-lg p-4 my-2 text-center lg:max-w-md lg:p-6 lg:my-4"
            : undefined
        }
      >
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
