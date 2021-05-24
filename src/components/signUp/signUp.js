import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import "./signUp.css"
import signupIcon from "../../writing.svg"
import { useAuth } from "../../context/authContext"

export default function Signup() {
    document.title = "Sign Up"

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match")
        }
        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            history.push("/login")
        } catch {
            setError("Failed to create an account")
        }

        setLoading(false)
    }

    return (
        <div className="App">
            <header className="App-header-signup">
                <Card>
                    <Card.Body>
                        <div className="Wrapper-signup">
                            <div className="Container-signup">
                                <img src={signupIcon} className="Signup-signup" alt="clock"/>
                            </div>
                            <h2 className="Title-signup">Sign Up</h2>
                            {error && <Alert className="Alert-signup" variant="danger">{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group id="email-signup">
                                    <Form.Label className="Row-signup">Email</Form.Label>
                                    <Form.Control type="email" ref={emailRef} required className="Row-signup input-signup"/>
                                </Form.Group>
                                <Form.Group id="password-signup">
                                    <Form.Label className="Row-signup">Password</Form.Label>
                                    <Form.Control type="password" ref={passwordRef} required className="Row-signup input-signup"/>
                                </Form.Group>
                                <Form.Group id="password-confirm-signup">
                                    <Form.Label className="Row-signup">Password Confirmation</Form.Label>
                                    <Form.Control type="password" ref={passwordConfirmRef} required className="Row-signup input-signup"/>
                                </Form.Group>
                                <Button disabled={loading} type="submit" className="SubmitBtn-signup">Sign Up</Button>
                                <div className="Row-signup">
                                    Already have an account? <Link className="App-Link-signup" to="/login">Log In</Link>
                                </div>
                            </Form>
                        </div>
                    </Card.Body>
                </Card>
            </header>
        </div>

    )
}