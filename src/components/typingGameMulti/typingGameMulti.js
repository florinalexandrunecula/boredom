import logo from '../../circle.svg'
import keyboard from '../../keyboard.svg'
import './typingGameMulti.css'
import { generate } from '../../utils/words'
import useKeyPress from "../../hooks/useKeyPress"
import React, { useState, useEffect } from 'react'
import { currentTime } from "../../utils/time"
import { useAuth } from "../../context/authContext"
import ProgressBar from "../../utils/progressBar"

const initialWords = generate()

const TypingGameMulti = () => {
    document.title = "Typing Game Multi"
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
    const [maxCharacters, setMaxCharacters] = useState(20)
    const [message, setMessage] = useState("Waiting for other players")
    const [stopper, setStopper] = useState(true)
    const [jsonAdv, setJsonAdv] = useState({'mistakes': -1, 'wpm': -1, 'accuracy': -1})
    const [percentage, setPercentage] = useState(50)
    const [color, setColor] = useState("green")
    const [titleStyle, setTitleStyle] = useState({color: "white"})
    const [winner, setWinner] = useState("None")
    const [score, setScore] = useState(-1)
    const [email, setEmail] = useState("None")
    const [returnedData, setReturnedData] = useState({ client: {}})
    const [leaving, setLeaving] = useState(false)


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
                    setMessage("Type as fast as you can!")
                    setStopper(false)
                }
            }

        }, 500);
        return () => clearInterval(interval);
    }, [currentUser, playing, stopper]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (playing === true || leaving === false) {
                fetch("http://137.117.166.239:5000/get_score/?creator=" + currentUser.email)
                    .then(response => response.json())
                    .then(data => setJsonAdv({wpm: data.wpm, mistakes: data.mistakes, accuracy: data.accuracy}))
                let report = wpm / jsonAdv["wpm"]
                let percentage = report * 50
                if (percentage > 100) {
                    setPercentage(100)
                    setColor("Green")
                    setTitleStyle({color: "green"})
                } else {
                    setPercentage(percentage)
                    if (percentage < 50) {
                        setColor("Red")
                        setTitleStyle({color: "red"})
                    } else {
                        setColor("Green")
                        setTitleStyle({color: "green"})
                    }
                }
            }
        }, 500);
        return () => clearInterval(interval);
    }, [currentUser, jsonAdv, wpm, percentage, playing, leaving]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (stopper === false && playing === false && leaving === false) {
                fetch('http://137.117.166.239:5000/check_winner/?creator=' + currentUser.email + '&finalScore=' + wpm.toString())
                    .then(data => { return data.json() })
                    .then(datum => {
                        setReturnedData({client: datum})
                    });
                setWinner(returnedData["client"]["winner"])
                setScore(returnedData["client"]["score"])
                setEmail(returnedData["client"]["email"])
                if (winner !== "None" && winner !== "undefined" && winner) {
                    if (email === currentUser.email) {
                        fetch('http://137.117.166.239:5000//update_user_typing/', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({"email": currentUser.email, "won": 1, "lost": 0, "wpm": wpm, "mistakes": mistakes, "accuracy": accuracy})
                        }
                        )
                    } else {
                        fetch('http://137.117.166.239:5000//update_user_typing/', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({"email": currentUser.email, "won": 0, "lost": 1, "wpm": wpm, "mistakes": mistakes, "accuracy": accuracy})
                        }
                        )
                    }
                    setMessage("The winner is: " + winner + " with a score of: " + score +"! You can close the page now!")
                    setLeaving(true)
                }
            }

        }, 500);
        return () => clearInterval(interval);
    }, [currentUser, playing, stopper, leaving, winner, wpm, mistakes, accuracy, score, email, returnedData]);

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

            if (maxCharacters === 1) {
                setPlaying(false)
                setMessage("Game over! Waiting for the other players...")
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
                <h2 className="TypingMultiTitle" style={titleStyle}>{message}</h2>
                <p>{maxCharacters} remaining</p>
                <ProgressBar completed={percentage} bgcolor={color}/>
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
                            <h4>WPM: {wpm}</h4>
                        </div>
                        <div className="Column-multi">
                            <h4>Mistakes: {mistakes}</h4>
                        </div>
                        <div className="Column-multi">
                            <h4>Accuracy: {accuracy}%</h4>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default TypingGameMulti
