import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import TypingGame from "./components/typingGame/typingGame"
import HomePage from "./components/homePage/homePage"
import BalloonPop from "./components/balloonPop/balloonPop"
import NavBar from "./components/navBar/navBar"

function App() {
  return (
      <Router>
          <NavBar/>
          <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path="/typing" exact component={TypingGame} />
              <Route path="/balloon" exact component={BalloonPop} />
          </Switch>
      </Router>
  )
}

export default App