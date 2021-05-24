import logo from '../../circle.svg'
import keyboard from '../../keyboard.svg'
import './typingGameMulti.css'
import { generate } from '../../utils/words'
import useKeyPress from "../../hooks/useKeyPress"
import React, { useState, useEffect } from 'react'
import { currentTime } from "../../utils/time"
import { useAuth } from "../../context/authContext"

const initialWords = generate()

const TypingGameMulti = () => {
    document.title = "Typing Game"
    const { currentUser } = useAuth()

    const [leftPadding, setLeftPadding] = useState(
        new Array(15).fill(' ').join(' '),
    )
    const [outgoingChars, setOutgoingChars] = useState('')
    const [currentChar, setCurrentChar] = useState(initialWords.charAt(0))
    const [incomingChars, setIncomingChars] = useState(initialWords.substr(1))
    const [startTime, setStartTime] = useState()
    const [wordCount, setWordCount] = useState(0)
    const [wpm, setWpm] = useState(0)
    const [mistakes, setMistakes] = useState(0)
    const [characters, setCharacters] = useState(0)
    const [accuracy, setAccuracy] = useState(100)
    const [playing, setPlaying] = useState(false)
    const [maxCharacters, setMaxCharacters] = useState(150)
    const [message, setMessage] = useState("Waiting for other player")
    const [stopper, setStopper] = useState(true)
    const [wpmAdv, setWpmAdv] = useState(0)
    const [mistakesAdv, setMistakesAdv] = useState(0)
    const [accuracyAdv, setAccuracyAdv] = useState(100)
    const [jsonAdv, setJsonAdv] = useState({'mistakes': -1, 'wpm': -1, 'accuracy': -1})


    function updateBackend(json) {
        fetch('http://137.117.166.239:5000/post_score/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(json)
            }
        )
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (stopper === true) {
                fetch('http://137.117.166.239:5000/check_game/?creator=' + currentUser.email)
                    .then(response => response.json())
                    .then(data => setPlaying(data))
                if (playing === true) {
                    console.log("apelat")
                    setMessage("Type as fast as you can!")
                    setStopper(false)
                }
            }

        }, 500);
        return () => clearInterval(interval);
    }, [currentUser, playing, stopper]);

    useEffect(() => {
        const interval = setInterval(() => {
            fetch("http://137.117.166.239:5000/get_score/?creator=" + currentUser.email)
                .then(response => response.json())
                .then(data => setJsonAdv({wpm: data.wpm, mistakes: data.mistakes, accuracy: data.accuracy}))
            setMistakesAdv(jsonAdv["mistakes"])
            setWpmAdv(jsonAdv["wpm"])
            setAccuracyAdv(jsonAdv["accuracy"])
        }, 500);
        return () => clearInterval(interval);
    }, [currentUser, jsonAdv]);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useKeyPress(key => {
        if (playing === true) {
            let json = {'mistakes': mistakes, 'wpm': wpm, 'accuracy': accuracy, 'charactersRemaining': maxCharacters, 'player': currentUser.email};

            if (!startTime) {
                setStartTime(currentTime())
            }

            let updatedOutgoingChars = outgoingChars
            let updatedIncomingChars = incomingChars

            if (key === currentChar) {
                setCharacters(characters + 1)
                setMaxCharacters(maxCharacters - 1)

                if (leftPadding.length > 0) {
                    setLeftPadding(leftPadding.substring(1))
                }

                updatedOutgoingChars += currentChar
                setOutgoingChars(updatedOutgoingChars)

                setCurrentChar(incomingChars.charAt(0))

                updatedIncomingChars = incomingChars.substring(1)
                if (updatedIncomingChars.split(' ').length < 10) {
                    updatedIncomingChars += ' ' + generate()
                }
                setIncomingChars(updatedIncomingChars)

                if (incomingChars.charAt(0) === ' ') {
                    setWordCount(wordCount + 1)

                    const durationInMinutes = (currentTime() - startTime) / 60000.0

                    json['wpm'] = ((wordCount + 1) / durationInMinutes).toFixed(2)
                    setWpm(((wordCount + 1) / durationInMinutes).toFixed(2))
                }
            } else {
                json['mistakes'] = mistakes + 1
                setMistakes(mistakes + 1)
            }

            if (mistakes === 0) {
                json['accuracy'] = 100
                setAccuracy(100)
            }
            else {
                let tempAcc = (characters / (characters + mistakes)) * 100
                json['accuracy'] = tempAcc.toFixed(2)
                setAccuracy(tempAcc.toFixed(2))
            }

            if (maxCharacters === 0) {
                setPlaying(false)
                setMessage("Game over! Winner is: ")
            }

            updateBackend(json)
        }
    })


    return (
        <div className="App">
            <header className="App-header-multi">
                <div className="Container-multi">
                    <img src={logo} className="App-logo-multi" alt="logo" />
                    <img src={keyboard} className="Keyboard-icon-multi" alt="keyboard"/>
                </div>
                <h2>{message}</h2>
                <p className="Character-multi">
                    <span className="Character-out-multi">
                        {(leftPadding + outgoingChars).slice(-15)}
                    </span>
                    <span className="Character-current-multi">
                        {currentChar}
                    </span>
                    <span>
                        {incomingChars.substr(0, 15)}
                    </span>
                </p>
                <div className="PageWrapper-multi">
                    <div className="Row-multi">
                        <div className="Column-multi">
                            <h4>WPM P1: {wpm}</h4>
                        </div>
                        <div className="Column-multi">
                            <h4>Mistakes P1: {mistakes}</h4>
                        </div>
                        <div className="Column-multi">
                            <h4>Accuracy P1: {accuracy}%</h4>
                        </div>
                    </div>
                    <div className="Row-multi">
                        <div className="Column-multi">
                            <h4>WPM P2: {wpmAdv}</h4>
                        </div>
                        <div className="Column-multi">
                            <h4>Mistakes P2: {mistakesAdv}</h4>
                        </div>
                        <div className="Column-multi">
                            <h4>Accuracy P2: {accuracyAdv}%</h4>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default TypingGameMulti
