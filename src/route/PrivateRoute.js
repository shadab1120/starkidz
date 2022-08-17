import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ exact, component: Component, ...rest }) => {
  // useselector to check if user is logged in
  const isLoggedIn = useSelector((state) => state.auth.auth);

  return (
    <Route
      exact={exact ? true : false}
      rest
      render={(props) =>
        isLoggedIn ? (
          <Component {...props} {...rest}></Component>
        ) : (
          <Redirect to={`${process.env.PUBLIC_URL}/login`}></Redirect>
        )
      }
    ></Route>
  );
};
export default PrivateRoute;
