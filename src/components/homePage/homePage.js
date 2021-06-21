import './homePage.css'
import React from 'react'
import clock from "../../wall-clock.svg"
import recycle from "../../recycle.svg"

const HomePage = () => {
    document.title = "Home Page"

    return (
        <div className="App">
            <header className="App-header-home">
                <div className="Container">
                    <img src={recycle} className="Recycle-home" alt="recycle" />
                    <img src={clock} className="Clock-home" alt="clock"/>
                </div>
                <h1 className="Title">B0red0m</h1>
                <h2 className="SmallerTitle">Your 5 minutes of break</h2>
                <p className="HomeP">
                    Don't know where to start? Head over to one of the games available to relax.
                </p>
                <p className="HomeP">
                    Want to play with other players and keep track of your progress?
                    You can Log In or Sign Up by clicking on the My Profile tab.
                </p>
                <p className="HomeP">Good luck and have fun!</p>
                <br></br>
                <p className="HomeP">
                    This app was designed by Alexandru Necula
                </p>
                <p className="HomeP">
                    University of Bucharest, 2021
                </p>
            </header>
        </div>
    )
}

export default HomePage
