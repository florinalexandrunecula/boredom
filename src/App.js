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
import GameJoin from "./components/gamesList/gameList"
import TypingGameMulti from "./components/typingGameMulti/typingGameMulti"
import GameJoinMobile from './components/gamesListMobile/gameListMobile'
import BalloonPopMulti from './components/balloonPopMulti/balloonPopMulti'
import Game from './components/ticTacToe/game'

function App() {
  return (
      <AuthProvider>
          <Router>
              <NavBar/>
              <Switch>
                  <Route path="/" exact component={HomePage} />
                  <Route path="/typing" exact component={TypingGame} />
                  <Route path="/typingMulti" exact component={TypingGameMulti} />
                  <Route path="/balloon" exact component={BalloonPop} />
                  <Route path="/balloonMulti" exact component={BalloonPopMulti} />
                  <Route path="/signup" exact component={Signup} />
                  <Route path="/login" exact component={Login} />
                  <Route path="/games" exact component={GameJoin} />
                  <Route path="/gamesMobile" exact component={GameJoinMobile} />
                  <Route path="/ticTacToe" exact component={Game} />
                  <PrivateRoute path="/profile" exact component={Dashboard} />
              </Switch>
          </Router>
      </AuthProvider>
  )
}

export default App