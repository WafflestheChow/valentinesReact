import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./App.css";

const messages = [
    "Are you sure Josie?",
    "Really Really Really sure?",
    "Think again Chunks!",
    "Don't break my heart 😢",
    "You're making a mistake!",
    "Last chance!!!",
];

const finalMessage = "Fine... I didn't want to be your Valentine anyways! 😭😭😭";

const positions = [
    { top: "50%", left: "70%" },
    { top: "30%", left: "30%" },
    { top: "80%", left: "50%" },
    { top: "40%", left: "60%" },
    { top: "60%", left: "20%" },
    { top: "50%", left: "10%" },
];

function App() {
    const [positionIndex, setPositionIndex] = useState(0);
    const [messageIndex, setMessageIndex] = useState(0);
    const [showFinalMessage, setShowFinalMessage] = useState(false);
    const [hasMoved, setHasMoved] = useState(false);

    const handleNoClick = () => {
        if (messageIndex < messages.length - 1) {
            setHasMoved(true);
            setPositionIndex((prev) => (prev + 1) % positions.length);
            setMessageIndex((prev) => prev + 1);
        } else {
            setShowFinalMessage(true);
        }
    };

    // Function to reset the app to the beginning
    const handleRestart = () => {
        setPositionIndex(0);
        setMessageIndex(0);
        setShowFinalMessage(false);
        setHasMoved(false);
    };

    useEffect(() => {
        if (showFinalMessage) {
            const script = document.createElement("script");
            script.src = "https://tenor.com/embed.js";
            script.async = true;
            document.body.appendChild(script);
        }
    }, [showFinalMessage]);

    return (
        <div className="container">
            {showFinalMessage ? (
                <div className="final-message">
                    <img
                        src="https://media.tenor.com/oqgO-xIbYXIAAAAM/sad-crying.gif"
                        alt="Crying Penguin"
                        className="final-gif"
                    />
                    <h1>{finalMessage}</h1>
                    <button className="restart-button" onClick={handleRestart}>
                        Start Over 🔄
                    </button>
                </div>
            ) : (
                <>
                    <h1 className="question">Will you be my Valentine? 💖</h1>
                    <div className="button-container">
                        <button className="yes-button" onClick={() => setShowFinalMessage(true)}>
                            Yes 💕
                        </button>
                        {messageIndex === messages.length - 1 ? (
                            <button className="no-button" onClick={handleNoClick}>
                                {messages[messageIndex]}
                            </button>
                        ) : (
                            <motion.button
                                className="no-button"
                                onClick={handleNoClick}
                                animate={hasMoved ? positions[positionIndex] : {}}
                                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                            >
                                {messages[messageIndex]}
                            </motion.button>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default App;
