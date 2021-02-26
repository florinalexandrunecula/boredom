import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import TypingGame from "./components/typingGame/typingGame";
import HomePage from "./components/homePage/homePage";

function App() {
  return (
      <Router>
          <Switch>
              <Route path="/boredom" exact component={HomePage} />
              <Route path="/boredom/typing" exact component={TypingGame} />
          </Switch>
      </Router>
  )
}

export default App;