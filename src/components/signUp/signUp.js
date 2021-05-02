import React, { useRef } from 'react'
import { Form, Button, Card } from 'react-bootstrap'
import "./signUp.css"
import signup from "../../writing.svg";

export default function Signup() {
    document.title = "Sign Up"

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()

    return (
        <div className="App">
            <header className="App-header">
                <Card>
                    <Card.Body>
                        <div className="Wrapper">
                            <div className="Container">
                                <img src={signup} className="Signup" alt="clock"/>
                            </div>
                            <h2 className="Title">Sign Up</h2>
                            <Form>
                                <Form.Group id="email">
                                    <Form.Label className="Row">Email</Form.Label>
                                    <Form.Control type="email" ref={emailRef} required className="Row input"/>
                                </Form.Group>
                                <Form.Group id="password">
                                    <Form.Label className="Row">Password</Form.Label>
                                    <Form.Control type="password" ref={passwordRef} required className="Row input"/>
                                </Form.Group>
                                <Form.Group id="password-confirm">
                                    <Form.Label className="Row">Password Confirmation</Form.Label>
                                    <Form.Control type="password" ref={passwordConfirmRef} required className="Row input"/>
                                </Form.Group>
                                <Button type="submit" className="SubmitBtn">Sign Up</Button>
                                <div>
                                    Already have an account? Log In
                                </div>
                            </Form>
                        </div>
                    </Card.Body>
                </Card>
            </header>
        </div>

    )
}