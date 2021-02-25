import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import TypingGame from "./components/typingGame/typingGame";

function App() {
  return (
      <Router>
        <Switch>
          <Route path="/" exact component={TypingGame} />
        </Switch>
      </Router>
  )
}

export default App;