import React, { useState } from 'react'
import {Alert, Card} from 'react-bootstrap'
import "./dashboard.css"
import { useAuth } from "../../context/authContext"
import { useHistory } from "react-router-dom"

export default function Dashboard() {
    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const history = useHistory()

    async function handleLogout() {
        setError("")

        try {
            await logout()
            history.push("/")

        } catch {
            setError("Failed to log out")
        }
    }

    return (
        <div className="App">
            <header className="App-header">
                <Card>
                    <Card.Body>
                        <div className="ProfileWrapper">
                            <h2 className="Title">Profile</h2>
                            {error && <Alert className="Alert" variant="danger">{error}</Alert>}
                            <strong>Email: </strong> {currentUser.email}
                            <button className="LogOut" onClick={handleLogout}>Log Out</button>
                        </div>
                    </Card.Body>
                </Card>
            </header>
        </div>
    )
}