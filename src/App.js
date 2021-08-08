import React, { useState, useEffect } from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";

import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Home from "./components/Home";
import Client from "./components/Client";
import Admin from "./components/Admin";

const App = () => {
  const [showAdmin, setShowAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowAdmin(user.role === "admin");
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <div>
      <div>
        <li>
          <Link to={"/Home"}>Home</Link>
        </li>

        {showAdmin && (
          <li>
            <Link to={"/Admin"}>Admin Link</Link>
          </li>
        )}

        {currentUser && (
          <li>
            <Link to={"/Client"}>User</Link>
          </li>
        )}
      </div>

      {currentUser ? (
        <div>
          <li>
            <a href="/LogIn" onClick={logOut}>
              LogOut
            </a>
          </li>
        </div>
      ) : (
        <div>
          <li>
            <Link to={"/LogIn"}>Login</Link>
          </li>
        </div>
      )}

      <div>
        <Switch>
          <Route exact path={["/", "/Home"]} component={Home} />
          <Route exact path="/LogIn" component={Login} />
          <PrivateRouteProfile path="/Client" component={Client} />
          <PrivateRouteAdmin path="/Admin" component={Admin} />
        </Switch>
      </div>
    </div>
  );
};

const PrivateRouteProfile = ({ component: Component, ...rest }) => {
  const auth = AuthService.getCurrentUser();
  return (
    <Route
      {...rest}
      render={(props) =>
        auth ? <Component {...props} /> : <Redirect to="/LogIn" />
      }
    />
  );
};

const PrivateRouteAdmin = ({ component: Component, ...rest }) => {
  const auth = AuthService.getCurrentUser();
  const isAdmin = auth && auth.role === "admin";
  return (
    <Route
      {...rest}
      render={(props) =>
        isAdmin ? <Component {...props} /> : <Redirect to="/LogIn" />
      }
    />
  );
};

export default App;
