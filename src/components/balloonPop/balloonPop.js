import './balloonPop.css'
import React from 'react'
import { useRef, useState, useLayoutEffect } from "react"
import balloon from '../../balloon.svg'
import reset from '../../settings.svg'

const BalloonPop = () => {
    document.title = "Balloon Pop"

    const GameArea = () => {
        const targetRef = useRef()
        const [dimensions, setDimensions] = useState({ width:0, height: 0 })
        const [clicks, setClicks] = useState(0)
        const [correctClicks, setCorrectClicks] = useState(0)
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
            setCorrectClicks(correctClicks + 1)
            dotPosition.x = getRandomArbitrary(0, dimensions.width - 75)
            dotPosition.y = getRandomArbitrary(180, dimensions.height)
            setStyles({
                height: '75px',
                width: '75px',
                position: 'absolute',
                top: dotPosition.y,
                left: dotPosition.x,
            })
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
            setClicks(clicks + 1)
        }

        function resetGame() {
            dotPosition.x = 0
            dotPosition.y = 180

            setClicks(0)
            setCorrectClicks(0)

            setStyles({
                height: '75px',
                width: '75px',
                position: 'absolute',
                top: dotPosition.y,
                left: dotPosition.x,
            })
        }

        return (
            <div>
                <img className="Reset" src={reset} alt="reset" onClick={resetGame}/>
                <div className = "GameArea" ref={targetRef} onClick={countClicks}>
                    <p>Total clicks: {clicks}</p>
                    <p>Correct clicks: {correctClicks}</p>
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
