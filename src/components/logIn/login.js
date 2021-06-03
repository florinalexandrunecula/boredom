import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import "./login.css"
import signupIcon from "../../writing.svg"
import { useAuth } from "../../context/authContext"
import {Link, useHistory} from "react-router-dom";

export default function Login() {
    document.title = "Login"

    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push("/profile")
        } catch {
            setError("Failed to sign in")
        }

        setLoading(false)
    }

    return (
        <div className="App">
            <header className="App-header-login">
                <Card>
                    <Card.Body>
                        <div className="Wrapper-login">
                            <div className="Container-login">
                                <img src={signupIcon} className="Signup-login" alt="clock"/>
                            </div>
                            <h2 className="Title-login">Log In</h2>
                            {error && <Alert className="Alert-login" variant="danger">{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group id="email-login">
                                    <Form.Label className="Row-login">Email</Form.Label>
                                    <Form.Control type="email" ref={emailRef} required className="Row-login input-login"/>
                                </Form.Group>
                                <Form.Group id="password-login">
                                    <Form.Label className="Row-login">Password</Form.Label>
                                    <Form.Control type="password" ref={passwordRef} required className="Row-login input-login"/>
                                </Form.Group>
                                <Button disabled={loading} type="submit" className="SubmitBtn-login">Log In</Button>
                                <div className="Row-login">
                                    Don't have an account? <Link className="App-Link-signup" to="/signup">Sign Up</Link>
                                </div>
                            </Form>
                        </div>
                    </Card.Body>
                </Card>
            </header>
        </div>

    )
}