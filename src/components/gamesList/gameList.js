import React, {useState} from 'react'
import {useAuth} from "../../context/authContext"
import { useHistory } from "react-router-dom"


const GameJoin = () => {
    const [gameList, setGameList] = useState([])
    const { currentUser } = useAuth()
    const history = useHistory()

    function getGames() {
        fetch("http://127.0.0.1:5000/get_games/")
            .then(response => response.json())
            .then(data => setGameList(data))

        console.log(gameList)
        return gameList
    }

    function createGame() {
        const requestParams = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ gameCreator :  currentUser.email})
        }
        fetch("http://127.0.0.1:5000/create_game/", requestParams)
        history.push("/typingMulti")
    }

    function buttonClicked(creator) {
        //sending creator email and currentUser email
        const requestParams = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ p1 :  creator, p2 : currentUser.email})
        }
        fetch("http://127.0.0.1:5000/game_join/", requestParams)
        history.push("/typingMulti")
    }

    return(
        <div>
            <button onClick={getGames}>Refresh</button>
            <button onClick={createGame}>Create Game</button>
            <h1 className="Title">Available Games</h1>
            <table className="Games">
                <tbody>
                    {gameList.map((game, index) => {
                        const { id, gameCreator } = game
                        return (
                            <tr key={id}>
                                <td>{gameCreator}</td>
                                <td>
                                    <button onClick={() => buttonClicked(gameCreator)}>Join Game</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default GameJoin
