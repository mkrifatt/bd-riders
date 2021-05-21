import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router';
import { UseContext } from '../../App';

const PrivateRoute = ({ children, ...rest }) => {

  const [logInUser, setLogInUser] = useContext(UseContext)

  return (
    <Route
      {...rest}
      render={({ location }) =>
        logInUser.email ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/register",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;