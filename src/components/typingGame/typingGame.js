import logo from '../../circle.svg';
import keyboard from '../../keyboard.svg';
import './typingGame.css';
import { generate } from '../../utils/words'
import useKeyPress from "../../hooks/useKeyPress";
import React, { useState } from 'react';
import { currentTime } from "../../utils/time";

const initialWords = generate();
console.log(initialWords);

const TypingGame = () => {
    document.title = "Typing Game";

    const [leftPadding, setLeftPadding] = useState(
        new Array(15).fill(' ').join(' '),
    );
    const [outgoingChars, setOutgoingChars] = useState('');
    const [currentChar, setCurrentChar] = useState(initialWords.charAt(0));
    const [incomingChars, setIncomingChars] = useState(initialWords.substr(1));
    const [startTime, setStartTime] = useState();
    const [wordCount, setWordCount] = useState(0);
    const [wpm, setWpm] = useState(0);
    const [mistakes, setMistakes] = useState(0);
    const [characters, setCharacters] = useState(0);
    const [accuracy, setAccuracy] = useState(100);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useKeyPress(key => {
        if (!startTime) {
            setStartTime(currentTime());
        }

        let updatedOutgoingChars = outgoingChars;
        let updatedIncomingChars = incomingChars;

        if (key === currentChar) {
            setCharacters(characters + 1);

            if (leftPadding.length > 0) {
                setLeftPadding(leftPadding.substring(1));
            }

            updatedOutgoingChars += currentChar;
            setOutgoingChars(updatedOutgoingChars);

            setCurrentChar(incomingChars.charAt(0));

            updatedIncomingChars = incomingChars.substring(1);
            if (updatedIncomingChars.split(' ').length < 10) {
                updatedIncomingChars += ' ' + generate()
            }
            setIncomingChars(updatedIncomingChars);

            if (incomingChars.charAt(0) === ' ') {
                setWordCount(wordCount + 1);

                const durationInMinutes = (currentTime() - startTime) / 60000.0;

                setWpm(((wordCount + 1) / durationInMinutes).toFixed(2));
            }
        } else {
            setMistakes(mistakes + 1);
        }

        if (mistakes === 0)
            setAccuracy(100);
        else {
            let tempAcc = (characters / (characters + mistakes)) * 100;
            setAccuracy(tempAcc.toFixed(2));
        }

    });

    return (
        <div className="App">
            <header className="App-header">
                <div className="Container">
                    <img src={logo} className="App-logo" alt="logo" />
                    <img src={keyboard} className="Keyboard-icon" alt="keyboard"/>
                </div>
                <h2>Type as fast as you can!</h2>
                <p className="Character">
                    <span className="Character-out">
                        {(leftPadding + outgoingChars).slice(-15)}
                    </span>
                    <span className="Character-current">
                        {currentChar}
                    </span>
                    <span>
                        {incomingChars.substr(0, 15)}
                    </span>
                </p>
                <div className="PageWrapper">
                    <div className="Row">
                        <div className="Column">
                            <h3>WPM(words per minute): {wpm}</h3>
                        </div>
                        <div className="Column">
                            <h3>Mistakes: {mistakes}</h3>
                        </div>
                    </div>
                    <h3>Accuracy: {accuracy}%</h3>
                </div>
            </header>
        </div>
    );
}

export default TypingGame;
