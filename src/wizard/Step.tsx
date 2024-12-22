import React from "react";
import BackButton from "./BackButton";
import "./init_tailwind.css";
import { Route, Switch } from "wouter";

export default function Step({
  label,
  children,
}: {
  label?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <Switch>
      <Route path="/">
        <div
          className={
            "flex flex-col items-center justify-center min-h-screen bg-white p-4 max-h-96 lg:max-h-none"
          }
        >
          <div
            className={
              "w-full bg-gray-100 shadow-lg rounded-lg p-4 my-2 text-center lg:max-w-md lg:p-6 lg:my-4"
            }
          >
            {label ?? null}
            {children}
            <BackButton />
          </div>
        </div>
      </Route>
      <Route>{children}</Route>
    </Switch>
  );
}
