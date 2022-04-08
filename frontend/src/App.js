import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Home from "./Pages/home";
import Login from "./Pages/login";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/" component={Home}/>
        <Redirect path="/login" component={Login}/>
      </Switch>
      <Toaster/>
    </BrowserRouter>
  );
}

export default App;
