import React, {useState} from 'react'
import {useAuth} from "../../context/authContext"
import { useHistory } from "react-router-dom"
import './gameList.css'
import TypingGame from '../typingGame/typingGame'


const GameJoin = () => {
    const [gameList, setGameList] = useState([])
    const { currentUser } = useAuth()
    const history = useHistory()

    function getGames() {
        fetch("http://137.117.166.239:5000/get_games/")
            .then(response => response.json())
            .then(data => setGameList(data))

        return gameList
    }

    function createGame() {
        const requestParams = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ gameCreator :  currentUser.email})
        }
        fetch("http://137.117.166.239:5000/create_game/", requestParams)
        history.push("/typingMulti")
    }

    function buttonClicked(creator) {
        //sending creator email and currentUser email
        const requestParams = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ p1 :  creator, p2 : currentUser.email})
        }
        fetch("http://137.117.166.239:5000/game_join/", requestParams)
        history.push("/typingMulti")
    }

    if (currentUser) {
        return(
            <div className="App">
                <header className="App-header-list">
                    <h3 className="Title">Available Games</h3>
                    <h4 className="SmallerTitle">
                        Ready to join a game? <button className="Refresh" href="#" onClick={getGames}>Refresh list</button>
                    </h4>
                    <h4 className="SmallerTitle">
                        No games available? <button className="Refresh" href="#" onClick={createGame}>Create game</button>
                    </h4>
                    <table className="GameTableTyping">
                        <tbody>
                            <tr>
                                <th className="Creator">Game Creator</th>
                            </tr>
                            {gameList.map((game, index) => {
                                const { id, gameCreator } = game
                                return (
                                    <tr key={id}>
                                        <td className="Creator">{gameCreator}</td>
                                        <td>
                                            <button className="JoinButton" onClick={() => buttonClicked(gameCreator)}>Join Game</button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </header>
            </div>
        )
    } else {
        return (
            <header className="App-header-list">
                <TypingGame />
            </header>
        )
    }
}

export default GameJoin
