import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import Image from "next/image";
import Confetti from "../components/confetti";
import { Router, useRouter } from "next/router";

// Importing CSS files
import style from "@/styles/Home.module.css";

// Importing sound files
import clickSound from "@/public/sounds/click.mp3";
import winSound from "@/public/sounds/win.mp3";
import round1Sound from "@/public/sounds/round1.mp3";
import round2Sound from "@/public/sounds/round2.mp3";
import round3Sound from "@/public/sounds/round3.mp3";
import round4Sound from "@/public/sounds/round4.mp3";
import finalRoundSound from "@/public/sounds/finalRound.mp3";
// import backgroundSound from "@/public/sounds/background.mp3";
import youWinSound from "@/public/sounds/youwin.mp3";
import victorySound from "@/public/sounds/victory.mp3";

export default function Game(props) {
    const [count, setCount] = useState(0);
    const [boxes, setBox] = useState([...Array(9).fill({ symbol: "" })]);
    const [winnerNotFound, setWinnerNotFound] = useState(true);
    const [Player1Score, setPlayer1Score] = useState(0);
    const [Player2Score, setPlayer2Score] = useState(0);
    const [GoHome, setGoHome] = useState(false);
    const [round, setRound] = useState(1);
    const [WinnerName, setWinnerName] = useState("");
    const [playRound1SoundOnce, setPlayRound1SoundOnce] = useState(true);
    const [playRound2SoundOnce, setPlayRound2SoundOnce] = useState(true);
    const [playRound3SoundOnce, setPlayRound3SoundOnce] = useState(true);
    const [playRound4SoundOnce, setPlayRound4SoundOnce] = useState(true);
    const [finalRoundSoundOnce, setFinalRoundSoundOnce] = useState(true);
    const screenRef = useRef(null);
    const cancelRef = useRef(null);
    const confirmRef = useRef(null);
    const router = useRouter();

    // Distracting variables
    const { Player1, Player2 } = router.query;

    // This will create a array of reactor references to all the
    // button array that I will use to enable or disable button
    const buttonRef = useRef(
        Array.from({
            length: boxes.length,
        }).map(() => React.createRef())
    );
    const [screenText, setScreenText] = useState("");
    const [screenTextRenderFirstTime, setScreenTextRenderFirstTime] =
        useState(true);

    //===================================================
    // This is something good I learned
    const audioContextRef = useRef(null);

    useEffect(() => {
        window.addEventListener("beforeunload", confirmExit);
        // Create the audio context when the component mounts
        audioContextRef.current = new (window.AudioContext ||
            window.webkitAudioContext)();

        // Loading the saved game
        if (typeof window !== "undefined") {
            const savedGameState = window.localStorage.getItem("gameState");
            if (savedGameState) {
                const gameState = JSON.parse(savedGameState);

                // Set state variables based on the saved game state
                setPlayer1Score(gameState.Player1Score);
                setPlayer2Score(gameState.Player2Score);
                if (
                    gameState.boxes &&
                    Array.isArray(gameState.boxes) &&
                    gameState.boxes.length === 9
                ) {
                    setBox(gameState.boxes);
                }
                setRound(gameState.round);
            }
        }

        return () => {
            // Clean up the audio context and event listener when the component unmounts
            window.removeEventListener("beforeunload", confirmExit);
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
        };
    }, []);

    const playAudio = (audioFile) => {
        if (!audioContextRef.current) {
            return;
        }

        // Fetch and decode the audio file
        fetch(audioFile)
            .then((response) => response.arrayBuffer())
            .then((audioData) => {
                audioContextRef.current.decodeAudioData(audioData, (buffer) => {
                    // Create an audio source and connect it to the context
                    const source = audioContextRef.current.createBufferSource();
                    source.buffer = buffer;
                    source.connect(audioContextRef.current.destination);

                    // Start playing the audio
                    source.start();
                });
            });
    };

    //===================================================

    useEffect(() => {
        checkWinner();
        checkWinCondition();
        controlScreen();
        if (GoHome) {
            router.push("/");
        }
    }, [boxes, Player1Score, Player2Score, GoHome]);

    // *********************logical for saving game*********************
    // Save game state to local storage whenever it changes
    const updateLocalStorage = (key, value) => {
        if (typeof window !== "undefined") {
            const localStorageData =
                JSON.parse(localStorage.getItem("gameState")) || {};
            localStorageData[key] = value;
            localStorage.setItem("gameState", JSON.stringify(localStorageData));
        }
    };

    // *****************************************************************

    // This function is responsible for the following:
    // 1. it checks the winning pattern
    // 2. It the resets the count variable As well as all the buttons
    // 3. And increases the round number
    function checkWinner() {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (
                boxes[a].symbol &&
                boxes[a].symbol === boxes[b].symbol &&
                boxes[a].symbol === boxes[c].symbol
            ) {
                // Increasing score when one player wins
                updatePlayerScores(boxes[a].symbol);

                setRound((prev) => prev + 1);
                updateLocalStorage("round", round);

                // This will automatically give a turn to X after each round
                setCount(0);
                // Resetting the values in buttons to empty
                boxes.forEach((box) => {
                    box.symbol = "";
                });
            }
        }
    }

    const updatePlayerScores = (winnerSymbol) => {
        if (winnerSymbol === "X") {
            setPlayer1Score((prev) => prev + 1);
            updateLocalStorage("Player1Score", Player1Score);
        } else if (winnerSymbol === "O") {
            setPlayer2Score((prev) => prev + 1);
            updateLocalStorage("Player2Score", Player2Score);
        }
    };

    // This function checks the victory of a player as well as plays the Round and Win Sound
    function checkWinCondition() {
        if (Player1Score === 3 || Player2Score === 3) {
            Player1Score === 3
                ? setWinnerName(Player1)
                : setWinnerName(Player2);

            setWinnerNotFound(false);
            playAudio(victorySound);
            playAudio(youWinSound);
            resetValuesInLocalStorage();
        } else {
            if (playRound1SoundOnce) {
                playAudio(round1Sound);
                setPlayRound1SoundOnce(false);
            } else if (round === 2 && playRound2SoundOnce) {
                playAudio(winSound);
                playAudio(round2Sound);
                setPlayRound2SoundOnce(false);
            } else if (round === 3 && playRound3SoundOnce) {
                playAudio(winSound);
                playAudio(round3Sound);
                setPlayRound3SoundOnce(false);
            } else if (round === 4 && playRound4SoundOnce) {
                playAudio(winSound);
                playAudio(round4Sound);
                setPlayRound4SoundOnce(false);
            } else if (round === 5 && finalRoundSoundOnce) {
                playAudio(winSound);
                playAudio(finalRoundSound);
                setFinalRoundSoundOnce(false);
            }
        }
    }

    // This function is responsible for the clicking sound as well as rendering the X and O
    function ChangeSymbol(index) {
        // clickAudio.play();
        playAudio(clickSound);
        if (!winnerNotFound) {
            return;
        }
        const updateBoxes = [...boxes];
        if (updateBoxes[index].symbol === "") {
            setCount((prev) => prev + 1);
            const symbol = (count) => {
                if (count % 2 === 0) {
                    return "X";
                } else {
                    return "O";
                }
            };
            updateBoxes[index] = {
                symbol: symbol(count),
            };
            setBox(updateBoxes);
            updateLocalStorage("boxes", updateBoxes);
        }
    }

    function rematch() {
        setWinnerNotFound(true);
        setCount(0);
        setRound(1);
        setPlayRound1SoundOnce(true);
        setPlayRound2SoundOnce(true);
        setPlayRound3SoundOnce(true);
        setPlayRound4SoundOnce(true);
        setFinalRoundSoundOnce(true);
        setWinnerName("");
        setPlayer1Score(0);
        setPlayer2Score(0);
        setScreenText("");
        setScreenTextRenderFirstTime(true);
    }

    function home() {
        rematch();
        setGoHome(true);
    }

    function homeInGame() {
        if (cancelRef && confirmRef) {
            cancelRef.current.style.visibility = "visible";
            confirmRef.current.style.visibility = "visible";
        }
    }
    function cancel() {
        if (cancelRef && confirmRef) {
            cancelRef.current.style.visibility = "hidden";
            confirmRef.current.style.visibility = "hidden";
        }
    }

    // This is the kind of the main part of the game where player
    // can see Who have the turn and it also displays the draw
    function controlScreen() {
        if (screenTextRenderFirstTime) {
            setScreenText(3);
            for (let i = 2; i > 0; i--) {
                setTimeout(() => {
                    setScreenText(i);
                }, 1000 * (2 - i + 1));
            }
            disableButtons(3);
            setScreenTextRenderFirstTime(false);
            setTimeout(() => {
                setScreenText("Go!");
            }, 3000);
        } else {
            if (count === 9) {
                setScreenText("It's Draw!");
                disableButtons(1.6);
                setTimeout(() => {
                    if (boxes) {
                        // Check if boxes is defined
                        const updatedBoxes = boxes.map((box) => ({
                            symbol: "",
                        }));
                        setBox(updatedBoxes); // Update the state to trigger a re-render
                    }
                }, 1500);
                setCount(0);
            } else if (count % 2 === 0) {
                setScreenText("X's Turn");
            } else if (count % 2 !== 0) {
                setScreenText("O's Turn");
            }
        }
    }

    // This is the reusable function to enable and disable the buttons for dynamic Times
    function disableButtons(seconds) {
        buttonRef.current.forEach((button) => {
            if (button.current) {
                button.current.setAttribute("disabled", true);
            }
        });
        setTimeout(() => {
            buttonRef.current.forEach((button) => {
                if (button.current) {
                    button.current.removeAttribute("disabled");
                }
            });
        }, seconds * 1000);
    }

    // Dissemination of well show the confirmation
    // message to the user before they reload the page
    const confirmExit = (event) => {
        event.preventDefault();
        // Customize the confirmation message
        event.returnValue =
            "Are you sure you want to leave? Your game progress will be lost.";
    };


    function resetValuesInLocalStorage(){
        updateLocalStorage("Player1Score",0)
        updateLocalStorage("Player2Score",0)
        updateLocalStorage("round",0)
         const updatedBoxes = boxes.map((box) => ({
                            symbol: "",
                        }));
                        setBox(updatedBoxes); // 
    }
    return (
        <>
            {winnerNotFound ? (
                <>
                    <div className={"mainContainerForScoreBoard"}>
                        <div className={"playerContainer1"}>
                            <span className={style.Player1}>{Player1}[X]</span>
                            <span className={"Player1Score"}>
                                {Player1Score}
                            </span>
                        </div>
                        <div ref={screenRef} className={"Screen"}>
                            {screenText}
                        </div>

                        <div className={"playerContainer2"}>
                            <span className={style.Player2}>{Player2}[O]</span>
                            <span className={"Player2Score"}>
                                {Player2Score}
                            </span>
                        </div>
                    </div>

                    <div className={"container"}>
                        {boxes.map((box, index) => (
                            <React.Fragment key={index}>
                                {index === 3 || index === 6 ? <br /> : null}
                                <button
                                    className={`${"box"} ${"fadeStyle"}`}
                                    onClick={() => ChangeSymbol(index)}
                                    ref={buttonRef.current[index]}
                                >
                                    {box.symbol}&nbsp;
                                </button>
                            </React.Fragment>
                        ))}
                    </div>

                    <Image
                        src="/images/vs.png"
                        width={300}
                        height={300}
                        className={style.vs}
                        alt="Versus image"
                        priority={true}
                    />
                    <div className={style.SingleHomeButton}>
                        <Button
                            ref={cancelRef}
                            onClick={() => cancel()}
                            className={style.cancel}
                        >
                            ❌
                        </Button>

                        <Button
                            variant="outline-primary"
                            onClick={() => homeInGame()}
                            className={style.SingleHomeButtonCSS}
                        >
                            Home
                        </Button>

                        <Button
                            ref={confirmRef}
                            onClick={() => home()}
                            className={style.confirm}
                        >
                            ✔️
                        </Button>
                    </div>
                </>
            ) : (
                <>
                    <Confetti />
                    <div className={style.winnerContainer}>
                        <p>winner</p>
                        <Image
                            src="/images/chain.png"
                            width={200}
                            height={200}
                            className="chain"
                            alt="Chain image"
                        />
                        <p className="winnerDesign">{WinnerName}</p>
                        {/* <p className="winnerDesign">Sukhvir</p> */}
                    </div>
                    <div className={style.BSbuttons}>
                        <Button
                            variant="outline-primary"
                            onClick={() => home()}
                            className={style.BSHome}
                        >
                            Home
                        </Button>
                        <Button
                            variant="outline-primary"
                            onClick={() => rematch()}
                            className={style.BSRematch}
                        >
                            Rematch
                        </Button>
                    </div>
                </>
            )}
        </>
    );
}