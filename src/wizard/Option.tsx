import "./style.css";
import React from "react";
import { Route, Link, Switch } from "wouter";
import useIsDisplayed from "./useIsDisplayed";

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
        { isDisplayed ? (
          <Link to={path}>
            <div className="option-component">{children}</div>
          </Link>
        ) : null}
      </Route>
    </Switch>
  );
}
