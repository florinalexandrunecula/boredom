import './homePage.css';
import React from 'react';
import { Link } from 'react-router-dom';
import bored from '../../bored.svg';
import clock from "../../wall-clock.svg";
import recycle from "../../recycle.svg";

const HomePage = () => {
    document.title = "Home Page";

    return (
        <div className="App">
            <ul>
                <li><img src={bored} className="Bored" alt="boredom" /></li>
                <li className="Active"><Link to="/boredom">Home</Link></li>
                <li><Link to="/boredom/typing">Typing Game</Link></li>
                <li><Link to="/boredom/balloon">Balloon Pop</Link></li>
            </ul>
            <header className="App-header">
                <div className="Container">
                    <img src={recycle} className="Recycle" alt="recycle" />
                    <img src={clock} className="Clock" alt="clock"/>
                </div>
                <h1 className="Title">B0red0m</h1>
                <h2>Your 5 minutes of break</h2>
                <p>
                    This app was designed by Alexandru Necula
                </p>
            </header>
        </div>
    );
}

export default HomePage;
