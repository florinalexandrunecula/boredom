import React, { useState, useEffect } from 'react'
import {Alert, Card} from 'react-bootstrap'
import "./dashboard.css"
import { useAuth } from "../../context/authContext"
import { useHistory } from "react-router-dom"

export default function Dashboard() {
    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const history = useHistory()
    const [returnedData, setReturnedData] = useState({client: {} })

    async function handleLogout() {
        setError("")

        try {
            await logout()
            history.push("/")

        } catch {
            setError("Failed to log out")
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            fetch("http://137.117.166.239:5000/get_user_info/?user=" + currentUser.email)
                .then(data => { return data.json() })
                .then(datum => {
                    setReturnedData({client: datum})
                });

        }, 500);
        return () => clearInterval(interval);
    }, [currentUser]);

    return (
        <div className="App">
            <header className="App-header-dashboard">
                <Card>
                    <Card.Body>
                        <div className="ProfileWrapper">
                            <h2 className="TitleProfile">Profile</h2>
                            {error && <Alert className="Alert" variant="danger">{error}</Alert>}
                            <p>Email: {currentUser.email}</p>
                            <p>Name: {returnedData["client"]["name"]}</p>
                            <p>Games Won: {returnedData["client"]["gamesWon"]}</p>
                            <p>Typing Game Leaderboard position: {returnedData["client"]["typingLeaderboard"]}</p>
                            <p>Balloon Pop Leaderboard position: {returnedData["client"]["balloonLeaderboard"]}</p>
                            <div className="PageWrapper-multi">
                                <div className="Row-stats">
                                    <div className="Column-stats">
                                        <h4>Average Accuracy Typing Game: {returnedData["client"]["averageAccuracyTyping"]}%</h4>
                                    </div>
                                    <div className="Column-stats">
                                        <h4>Average WPM Typing Game: {returnedData["client"]["averageWpmTyping"]}</h4>
                                    </div>
                                </div>
                                <div className="Row-stats">
                                    <div className="Column-stats">
                                        <h4>Average Mistakes Typing Game: {returnedData["client"]["averageMistakesTyping"]}</h4>
                                    </div>
                                    <div className="Column-stats">
                                        <h4>Average Accuracy Balloon Pop: {returnedData["client"]["averageAccuracyBalloon"]}%</h4>
                                    </div>
                                </div>
                                <div className="Row-stats">
                                    <div className="Column-stats">
                                        <h4>Average Duration Balloon Pop: {returnedData["client"]["averageDurationBalloon"] / 1000} seconds</h4>
                                    </div>
                                </div>
                            </div>
                            <button className="LogOut" onClick={handleLogout}>Log Out</button>
                        </div>
                    </Card.Body>
                </Card>
            </header>
        </div>
    )
}