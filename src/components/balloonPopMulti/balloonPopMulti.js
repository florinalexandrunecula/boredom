import './balloonPopMulti.css'
import React from 'react'
import { useRef, useState, useLayoutEffect, useEffect } from "react"
import balloon from '../../balloon.svg'
import { currentTime } from "../../utils/time"
import { useAuth } from "../../context/authContext"

const BalloonPopMulti = () => {
    document.title = "Balloon Pop Multi"

    const GameArea = () => {
        const { currentUser } = useAuth()

        const targetRef = useRef()
        const [dimensions, setDimensions] = useState({ width:0, height: 0 })
        const [clicks, setClicks] = useState(0)
        const [correctClicks, setCorrectClicks] = useState(0)
        const [accuracy, setAccuracy] = useState(0)
        const [maxBalloons, setMaxBalloons] = useState(20)
        const [startTime, setStartTime] = useState()
        const [durationInSeconds, setDurationInSeconds] = useState()
        const [playing, setPlaying] = useState(false)
        const [stopper, setStopper] =useState(true)
        const [leaving, setLeaving] = useState(false)
        const [winner, setWinner] = useState("None")
        const [score, setScore] = useState(0)
        const [email, setEmail] = useState("None")
        const [response, setResponse] = useState({ resp: {}})
        const [message, setMessage] = useState("Waiting for other player")
        let propagate = true
        let dotPosition = {x: 0, y: 0}
        let timeout = false
        let delay = 250

        const [styles, setStyles] = useState({
            height: '75px',
            width: '75px',
            borderRadius: '50%',
            position: 'absolute',
        })

        useEffect(() => {
            const interval = setInterval(() => {
                if (stopper === true) {
                    fetch('http://137.117.166.239:5000/check_game_mobile/?creator=' + currentUser.email)
                        .then(response => response.json())
                        .then(data => setPlaying(data))
                    if (playing === true) {
                        setMessage("Pop the balloons!")
                        setStopper(false)
                    }
                }
    
            }, 500);
            return () => clearInterval(interval);
        }, [currentUser, playing, stopper]);
    
        useEffect(() => {
            const interval = setInterval(() => {
                if (stopper === false && playing === false && leaving === false) {
                    fetch('http://137.117.166.239:5000/check_winner_mobile/?creator=' + currentUser.email + '&finalScore=' + durationInSeconds.toString())
                        .then(data => { return data.json() })
                        .then(datum => {
                            setResponse({resp: datum})
                        });
                    setEmail(response["resp"]["email"])
                    setWinner(response["resp"]["winner"])
                    setScore(response["resp"]["score"])
                    if (winner !== "None") {
                        if (email === currentUser.email) {
                            fetch('http://137.117.166.239:5000//update_user_balloon/', {
                                method: 'POST',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({"email": currentUser.email, "won": 1, "lost": 0, "accuracy": accuracy, "duration": durationInSeconds})
                            }
                            )
                        } else {
                            fetch('http://137.117.166.239:5000//update_user_balloon/', {
                                method: 'POST',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({"email": currentUser.email, "won": 0, "lost": 1, "accuracy": accuracy, "duration": durationInSeconds})
                            }
                            )
                        }
                        setMessage("The winner is: " + winner + " with a score of: "+ score + "! You can close the page now!")
                        setLeaving(true)
                    }
                }
    
            }, 500);
            return () => clearInterval(interval);
        }, [currentUser, playing, stopper, leaving, winner, durationInSeconds, accuracy, email]);

        useLayoutEffect(() => {
            if (targetRef.current) {
                setDimensions({
                    width: targetRef.current.offsetWidth,
                    height: targetRef.current.offsetHeight
                })
            }
        }, [])

        function getRandomArbitrary(min, max) {
            return Math.random() * (max - min) + min
        }

        function changePosition() {
            if(maxBalloons !== 1 && playing === true) {
                if (!startTime) {
                    setStartTime(currentTime())
                }
                let json = {"correctClicks": correctClicks, "clicks": clicks}
                json["correctClicks"] = correctClicks + 1
                json["clicks"] = clicks + 1
                console.log(json)
                setCorrectClicks(correctClicks + 1)
                setClicks(clicks + 1)
                setAccuracy(((json["correctClicks"] / json["clicks"]) * 100).toFixed(2))
                dotPosition.x = getRandomArbitrary(0, dimensions.width - 75)
                dotPosition.y = getRandomArbitrary(180, dimensions.height)
                setStyles({
                    height: '75px',
                    width: '75px',
                    position: 'absolute',
                    top: dotPosition.y,
                    left: dotPosition.x,
                })
                propagate = false
                setMaxBalloons(maxBalloons - 1)
            } else {
                if (playing === true) {
                    if (!startTime) {
                        setStartTime(currentTime())
                    }
                    let json = {"correctClicks": correctClicks, "clicks": clicks}
                    json["correctClicks"] = correctClicks + 1
                    json["clicks"] = clicks + 1
                    console.log(json)
                    setCorrectClicks(correctClicks + 1)
                    setClicks(clicks + 1)
                    setAccuracy(((json["correctClicks"] / json["clicks"]) * 100).toFixed(2))
                    dotPosition.x = getRandomArbitrary(0, dimensions.width - 75)
                    dotPosition.y = getRandomArbitrary(180, dimensions.height)
                    setStyles({
                        height: '75px',
                        width: '75px',
                        position: 'absolute',
                        top: dotPosition.y,
                        left: dotPosition.x,
                    })
                    propagate = false
                    setMaxBalloons(maxBalloons - 1)
                    setDurationInSeconds(currentTime() - startTime)
                    setPlaying(false)
                    setMessage("Wait for the other player to finish!")
                }
            }
        }

        function getSize() {
            if (targetRef.current) {
                setDimensions({
                    width: targetRef.current.offsetWidth,
                    height: targetRef.current.offsetHeight
                })
            }
        }

        window.addEventListener('resize', function() {
            clearTimeout(timeout)
            timeout = setTimeout(getSize, delay)
        })

        function countClicks() {
            if (playing === true) {
                if (!startTime) {
                    setStartTime(currentTime())
                }
                if (propagate === true) {
                    let json = {"correctClicks": correctClicks, "clicks": clicks}
                    json["clicks"] = clicks + 1
                    console.log(json)
                    setClicks(clicks + 1)
                    setAccuracy(((json["correctClicks"] / json["clicks"]) * 100).toFixed(2))
                } else {
                    propagate = true
                }
            }
        }

        return (
            <div>
                <div className = "GameArea" ref={targetRef} onClick={countClicks}>
                    <p>Accuracy: {accuracy}%</p>
                    <p>{durationInSeconds && "Duration " + durationInSeconds / 1000 + " seconds"}</p>
                    <p>{ message }</p>
                    <img src={balloon} style={styles} alt="balloon" onClick={changePosition} />
                </div>
            </div>
        )
    }


    return (
        <div className="App">
            <header className="App-header">
                <GameArea />
            </header>
        </div>
    )
}

export default BalloonPopMulti
