import "./style.css";
import React from "react";
import { Route, Link, Switch, useLocation } from "wouter";

export default function Option({
  path,
  children,
  link,
}: {
  path: string;
  children?: React.ReactNode;
  link?: React.ReactNode;
}) {
  const [location] = useLocation();
  const step = React.useRef(location);
  return (
    <Switch>
      <Route path={path} nest>
        {link}
      </Route>
      <Route>
        {step.current === location ? (
          <Link to={path}>
            <div className="option-component">{children}</div>
          </Link>
        ) : (
          <></>
        )}
      </Route>
    </Switch>
  );
}
