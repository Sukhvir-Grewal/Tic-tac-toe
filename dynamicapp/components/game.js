import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import Image from "next/image";
import Confetti from "./confetti";

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
import backgroundSound from "@/public/sounds/background.mp3";
import youWinSound from "@/public/sounds/youwin.mp3";
import victorySound from "@/public/sounds/victory.mp3";

// audio initialization
let clickAudio;
let winAudio;
let round1Audio;
let round2Audio;
let round3Audio;
let round4Audio;
let finalRoundAudio;
let backgroundAudio;
let victoryAudio;
let youWinAudio;

// Only use the Audio constructor when the window
// is ready means the code is rendering on client side
if (typeof window !== "undefined") {
    clickAudio = new Audio(clickSound);
    winAudio = new Audio(winSound);
    round1Audio = new Audio(round1Sound);
    round2Audio = new Audio(round2Sound);
    round3Audio = new Audio(round3Sound);
    round4Audio = new Audio(round4Sound);
    finalRoundAudio = new Audio(finalRoundSound);
    backgroundAudio = new Audio(backgroundSound);
    victoryAudio = new Audio(victorySound);
    youWinAudio = new Audio(youWinSound);
    // backgroundAudio.play();
    // backgroundAudio.loop = true;

    // adjusting the volume
    victoryAudio.volume = 0.5;
    backgroundAudio.volume = 0.01;
    clickAudio.volume = 0.4;

    // Preloading all the audios
    clickAudio.preload = "auto";
    winAudio.preload = "auto";
    round1Audio.preload = "auto";
    round2Audio.preload = "auto";
    round3Audio.preload = "auto";
    round4Audio.preload = "auto";
    finalRoundAudio.preload = "auto";
    backgroundAudio.preload = "auto";
    victoryAudio.preload = "auto";
    youWinAudio.preload = "auto";
}

export default function Game(props) {
    const [count, setCount] = useState(0);
    const [boxes, setBox] = useState([...Array(9).fill({ symbol: "" })]);
    const [winnerNotFound, setWinnerNotFound] = useState(true);
    const [Player1Score, setPlayer1Score] = useState(0);
    const [Player2Score, setPlayer2Score] = useState(0);
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

    // Distracting variables
    const { Player1, Player2 } = props;

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

    useEffect(() => {
        checkWinner();
        checkWinCondition();
        controlScreen();
    }, [boxes, Player1Score, Player2Score]);

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
                boxes[a].symbol === "X"
                    ? setPlayer1Score((prev) => prev + 1)
                    : setPlayer2Score((prev) => prev + 1);

                setRound((prev) => prev + 1);
                // This will automatically give a turn to X after each round
                setCount(0);
                // Resetting the values in buttons to empty
                boxes.forEach((box) => {
                    box.symbol = "";
                });
            }
        }
    }

    // This function checks the victory of a player as well as plays the Round and Win Sound
    function checkWinCondition() {
        if (Player1Score === 3 || Player2Score === 3) {
            Player1Score === 3
                ? setWinnerName(Player1)
                : setWinnerName(Player2);

            setWinnerNotFound(false);
            victoryAudio.play();
            youWinAudio.play();
        } else {
            if (playRound1SoundOnce) {
                round1Audio.play();
                setPlayRound1SoundOnce(false);
            } else if (round === 2 && playRound2SoundOnce) {
                winAudio.play();
                round2Audio.play();
                setPlayRound2SoundOnce(false);
            } else if (round === 3 && playRound3SoundOnce) {
                winAudio.play();
                round3Audio.play();
                setPlayRound3SoundOnce(false);
            } else if (round === 4 && playRound4SoundOnce) {
                winAudio.play();
                round4Audio.play();
                setPlayRound4SoundOnce(false);
            } else if (round === 5 && finalRoundSoundOnce) {
                winAudio.play();
                finalRoundAudio.play();
                setFinalRoundSoundOnce(false);
            }
        }
    }

    // This function is responsible for the clicking sound as well as rendering the X and O
    function ChangeSymbol(index) {
        clickAudio.play();
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
        props.setIsSubmitted(false);
        props.setValue("Player1", "");
        props.setValue("Player2", "");
        rematch();
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
    function confirm() {
        props.setIsSubmitted(false);
        props.setValue("Player1", "");
        props.setValue("Player2", "");
        rematch();
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

    return (
        <>
            {winnerNotFound ? (
                <>
                    <div className={"mainContainerForScoreBoard"}>
                        <div className={"playerContainer1"}>
                            <span className={style.Player1}>
                                {Player1}[X]
                            </span>
                            <span className={"Player1Score"}>
                                {Player1Score}
                            </span>
                        </div>
                        <div ref={screenRef} className={"Screen"}>
                            {screenText}
                        </div>

                        <div className={"playerContainer2"}>
                            <span className={style.Player2}>
                                {Player2}[O]
                            </span>
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
                            onClick={() => confirm()}
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
