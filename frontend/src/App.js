import React, { Component } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import AuthPage from "./pages/Auth";
import BookingPages from "./pages/Bookings";
import EventsPages from "./pages/Events";
import MainNavigation from "./components/Navigation/MainNavigation";

import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <MainNavigation />
          <main className="main-content">
            <Switch>
              <Redirect path="/" to="/auth" exact />
              <Route path="/auth" component={AuthPage} />
              <Route path="/events" component={EventsPages} />
              <Route path="/bookings" component={BookingPages} />
            </Switch>
          </main>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
