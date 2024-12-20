import React from "react";
import { Route, Link, Switch } from "wouter";
import useIsDisplayed from "./useIsDisplayed";
import "./init_tailwind.css";

export default function Option({
  path,
  link,
  children,
}: {
  path: string;
  link?: React.ReactNode;
  children?: React.ReactNode;
}) {
  const isDisplayed = useIsDisplayed();
  return (
    <Switch>
      <Route path={path} nest>
        {link}
      </Route>
      <Route>
        {isDisplayed ? (
          <Link to={path}>
            <div className="cursor-pointer py-4 px-6 border border-gray-300 m-2 bg-gradient-to-b from-orange-600 to-orange-400 text-lg font-bold text-white rounded-full hover:from-orange-700 hover:to-orange-500 transition duration-300 ease-in-out font-sans shadow-md lg:py-6 lg:px-8 lg:text-xl">
              {children}
            </div>
          </Link>
        ) : null}
      </Route>
    </Switch>
  );
}
