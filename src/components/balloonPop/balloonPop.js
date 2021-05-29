import './balloonPop.css'
import React from 'react'
import { useRef, useState, useLayoutEffect } from "react"
import balloon from '../../balloon.svg'
import { currentTime } from "../../utils/time"

const BalloonPop = () => {
    document.title = "Balloon Pop"

    const GameArea = () => {
        const targetRef = useRef()
        const [dimensions, setDimensions] = useState({ width:0, height: 0 })
        const [clicks, setClicks] = useState(0)
        const [correctClicks, setCorrectClicks] = useState(0)
        const [accuracy, setAccuracy] = useState(0)
        const [maxBalloons, setMaxBalloons] = useState(20)
        const [startTime, setStartTime] = useState()
        const [durationInSeconds, setDurationInSeconds] = useState()
        const [playing, setPlaying] = useState(true)
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

export default BalloonPop
