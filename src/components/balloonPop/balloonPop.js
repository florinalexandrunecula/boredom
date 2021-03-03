import './balloonPop.css';
import React from 'react';
import { useRef, useLayoutEffect, useState } from "react";
import { Link } from 'react-router-dom';
import bored from '../../bored.svg';

const BalloonPop = () => {
    document.title = "Balloon Pop";

    const GameArea = props => {
        const targetRef = useRef();
        const [dimensions, setDimensions] = useState({ width:0, height: 0 });
        let dotPosition = {x: 0, y: 0};

        const [styles, setStyles] = useState({
            height: '75px',
            width: '75px',
            backgroundColor: '#09d3ac',
            borderRadius: '50%',
            position: 'absolute',
        })

        function getRandomArbitrary(min, max) {
            return Math.random() * (max - min) + min;
        }

        useLayoutEffect(() => {
            if (targetRef.current) {
                setDimensions({
                    width: targetRef.current.offsetWidth,
                    height: targetRef.current.offsetHeight
                });
            }
        }, []);

        function changePosition() {
            dotPosition.x = getRandomArbitrary(0, dimensions.width - 75);
            dotPosition.y = getRandomArbitrary(100, dimensions.height);
            setStyles({
                height: '75px',
                width: '75px',
                backgroundColor: '#09d3ac',
                borderRadius: '50%',
                position: 'absolute',
                top: dotPosition.y,
                left: dotPosition.x,
            });
        }

        return (
            <div className = "GameArea" ref={targetRef}>
                <span style={styles} onClick={changePosition}></span>
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
