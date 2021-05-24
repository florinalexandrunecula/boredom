import React, {useState} from 'react'
import {useAuth} from "../../context/authContext"
import { useHistory } from "react-router-dom"
import './gameList.css'


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

    return(
        <div className="App">
            <header className="App-header-2">
                <button onClick={getGames}>Refresh</button>
                <button onClick={createGame}>Create Game</button>
                <h1 className="Title">Available Games</h1>
                <table>
                    <tbody>
                        <tr className="TableHead">
                            <td className="Creator">Game Creator</td>
                            <td>Join</td>
                        </tr>
                        {gameList.map((game, index) => {
                            const { id, gameCreator } = game
                            return (
                                <tr key={id}>
                                    <td className="Creator">{gameCreator}</td>
                                    <td>
                                        <button onClick={() => buttonClicked(gameCreator)}>Join Game</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </header>
        </div>
    )
}

export default GameJoin
