import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import TypingGame from "./components/typingGame/typingGame"
import HomePage from "./components/homePage/homePage"
import BalloonPop from "./components/balloonPop/balloonPop"
import Signup from "./components/signUp/signUp"
import NavBar from "./components/navBar/navBar"
import {AuthProvider} from "./context/authContext"
import Login from "./components/logIn/login"
import Dashboard from "./components/dashboard/dashboard"
import PrivateRoute from "./utils/privateRoute"

function App() {
  return (
      <AuthProvider>
          <Router>
              <NavBar/>
              <Switch>
                  <Route path="/" exact component={HomePage} />
                  <Route path="/typing" exact component={TypingGame} />
                  <Route path="/balloon" exact component={BalloonPop} />
                  <Route path="/signup" exact component={Signup} />
                  <Route path="/login" exact component={Login} />
                  <PrivateRoute path="/profile" exact component={Dashboard} />
              </Switch>
          </Router>
      </AuthProvider>
  )
}

export default App