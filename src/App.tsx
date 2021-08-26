import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { Todos } from "./pages/Todos";
import { Login } from "./pages/Login";
import { Registration } from "./pages/Registration";
import { PagesNotFound } from "./pages/PagesNotFound";
import { Loader } from "./components/UI/Loader/Loader";
import { useTypeSelector } from "./HOOK/useTypeSelector";

export const App = () => {
  const isLoading = useTypeSelector((state) => state.isLoading);

  return (
    <>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/todos" />
        </Route>
        <Route path="/registration">
          <Registration />
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/todos">
          <Todos />
        </Route>

        <Route path="*">
          <PagesNotFound />
        </Route>
      </Switch>

      {isLoading && <Loader data-testid="loader" />}
    </>
  );
};
