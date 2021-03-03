import './balloonPop.css';
import React from 'react';
import { useRef, useState, useLayoutEffect } from "react";
import { Link } from 'react-router-dom';
import bored from '../../bored.svg';
import balloon from '../../balloon.svg';
import reset from '../../settings.svg';

const BalloonPop = () => {
    document.title = "Balloon Pop";

    const GameArea = () => {
        const targetRef = useRef();
        const [dimensions, setDimensions] = useState({ width:0, height: 0 });
        const [clicks, setClicks] = useState(0);
        const [correctClicks, setCorrectClicks] = useState(0);
        let dotPosition = {x: 0, y: 0};
        let timeout = false;
        let delay = 250;

        const [styles, setStyles] = useState({
            height: '75px',
            width: '75px',
            borderRadius: '50%',
            position: 'absolute',
        });

        useLayoutEffect(() => {
            if (targetRef.current) {
                setDimensions({
                    width: targetRef.current.offsetWidth,
                    height: targetRef.current.offsetHeight
                });
            }
        }, []);

        function getRandomArbitrary(min, max) {
            return Math.random() * (max - min) + min;
        }

        function changePosition() {
            setCorrectClicks(correctClicks + 1);
            dotPosition.x = getRandomArbitrary(0, dimensions.width - 75);
            dotPosition.y = getRandomArbitrary(165, dimensions.height);
            setStyles({
                height: '75px',
                width: '75px',
                position: 'absolute',
                top: dotPosition.y,
                left: dotPosition.x,
            });
        }

        function getSize() {
            if (targetRef.current) {
                setDimensions({
                    width: targetRef.current.offsetWidth,
                    height: targetRef.current.offsetHeight
                });
            }
        }

        window.addEventListener('resize', function() {
            clearTimeout(timeout);
            timeout = setTimeout(getSize, delay);
        });

        function countClicks() {
            setClicks(clicks + 1);
        }

        function resetGame() {
            dotPosition.x = 0;
            dotPosition.y = 165;

            setClicks(0);
            setCorrectClicks(0);

            setStyles({
                height: '75px',
                width: '75px',
                position: 'absolute',
                top: dotPosition.y,
                left: dotPosition.x,
            });
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
        );
    };


    return (
        <div className="App">
            <ul>
                <li><img src={bored} className="Bored" alt="boredom" /></li>
                <li><Link to="/boredom">Home</Link></li>
                <li><Link to="/boredom/typing">Typing Game</Link></li>
                <li className="Active"><Link to="/boredom/balloon">Balloon Pop</Link></li>
            </ul>
            <header className="App-header">
                <GameArea />
            </header>
        </div>
    );
}

export default BalloonPop;
