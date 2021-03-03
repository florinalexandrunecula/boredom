import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import TypingGame from "./components/typingGame/typingGame";
import HomePage from "./components/homePage/homePage";
import BalloonPop from "./components/balloonPop/balloonPop";

function App() {
  return (
      <Router>
          <Switch>
              <Route path="/boredom" exact component={HomePage} />
              <Route path="/boredom/typing" exact component={TypingGame} />
              <Route path="/boredom/balloon" exact component={BalloonPop} />
          </Switch>
      </Router>
  )
}

export default App;