import React from "react";
import {
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import CalcularHoras from "../views/calculoHoras";
import Home from "../views/home";
import RegistroHoras from "../views/registroHoras";

export const RouterLayout = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/registrar-servicio" component={RegistroHoras} />
        <Route path="/calcular-horas" component={CalcularHoras} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
};
