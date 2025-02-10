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
    const [isYesClicked, setIsYesClicked] = useState(false); // ✅ Track if "Yes" was clicked

    useEffect(() => {
        console.log("Final message state updated:", showFinalMessage);
    }, [showFinalMessage]);

    const handleNoClick = () => {
        if (messageIndex < messages.length - 1) {
            setHasMoved(true);
            setPositionIndex((prev) => (prev + 1) % positions.length);
            setMessageIndex((prev) => prev + 1);
        } else {
            setIsYesClicked(false); // ✅ Make sure it's not set to Yes
            setShowFinalMessage(true);
        }
    };

    const handleYesClick = () => {
        setIsYesClicked(true); // ✅ Mark Yes clicked
        setShowFinalMessage(true);
    };

    const handleRestart = () => {
        setPositionIndex(0);
        setMessageIndex(0);
        setShowFinalMessage(false);
        setHasMoved(false);
        setIsYesClicked(false); // ✅ Reset choice
    };

    return (
        <div className="container" key={showFinalMessage ? "final" : "normal"}>
            {showFinalMessage ? (
                <div className="final-message">
                    <img
                        src={
                            isYesClicked
                                ? "https://media.tenor.com/ocBrDK-xRl4AAAAi/love-it-i-love-it.gif"  // Happy GIF for Yes
                                : "https://media1.tenor.com/m/e_eywMFtNLcAAAAd/sad-crying.gif"  // Sad GIF for No
                        }
                        alt={isYesClicked ? "Happy" : "Crying Penguin"}
                        className="final-gif"
                    />

                    <h1>
                        {isYesClicked
                            ? "Yay! You made my day! 💖🥰"
                            : "Fine... I didn't want to be your Valentine anyways! 😭😭😭"}
                    </h1>
                    <button className="restart-button" onClick={handleRestart}>
                        Start Over 🔄
                    </button>
                </div>
            ) : (
                <>
                    <h1 className="question">Hi Josie! Will you be my Valentine? 💖</h1>
                    <div className="button-container">
                        <button
                            className="yes-button"
                            onClick={handleYesClick}
                        >
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
