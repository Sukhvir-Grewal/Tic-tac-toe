import style from "@/styles/Home.module.css";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import clickSound from "@/public/sounds/click.mp3";
import winSound from "@/public/sounds/win.mp3";
import round1Sound from "@/public/sounds/round1.mp3";
import round2Sound from "@/public/sounds/round2.mp3";
import round3Sound from "@/public/sounds/round3.mp3";
import round4Sound from "@/public/sounds/round4.mp3";
import finalRoundSound from "@/public/sounds/finalRound.mp3";
import Fireworks from "./Fireworks";

export default function Game(props) {
    const [count, setCount] = useState(0);
    const [boxes, setBox] = useState([...Array(9).fill({ symbol: "" })]);
    const [winnerNotFound, setWinnerNotFound] = useState(true);
    const [Player1Score, setPlayer1Score] = useState(0);
    const [Player2Score, setPlayer2Score] = useState(0);
    const [round, setRound] = useState(1);
    const [gameOver, setGameOver] = useState(false);
    const [WinnerName, setWinnerName] = useState("");
    const [playRound1SoundOnce, setPlayRound1SoundOnce] = useState(true);
    const [playRound2SoundOnce, setPlayRound2SoundOnce] = useState(false);
    const [playRound3SoundOnce, setPlayRound3SoundOnce] = useState(false);
    const [playRound4SoundOnce, setPlayRound4SoundOnce] = useState(false);
    const [finalRoundSoundOnce, setfinalRoundSoundOnce] = useState(false);

    let clickAudio;
    let winAudio;
    let round1Audio;
    let round2Audio;
    let round3Audio;
    let round4Audio;
    let finalRoundAudio;
    // Only use the Audio constructor when the window is ready means the code is rendering on client side
    if (typeof window !== "undefined") {
        clickAudio = new Audio(clickSound);
        winAudio = new Audio(winSound);
        round1Audio = new Audio(round1Sound);
        round2Audio = new Audio(round2Sound);
        round3Audio = new Audio(round3Sound);
        round4Audio = new Audio(round4Sound);
        finalRoundAudio = new Audio(finalRoundSound);
        clickAudio.volume = 0.4;
    }

    useEffect(() => {
        checkWinner();
        checkWinCondition();
    }, [boxes, Player1Score, Player2Score]);

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

        if (Player1Score == 2 || Player2Score == 2) {
            console.log("Here its working");
            setGameOver(true);
        }

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

                if (Player1Score == 2) {
                    setWinnerName(props.Player1);
                }
                if (Player2Score == 2) {
                    setWinnerName(props.Player2);
                }
                // playing the winning song
                if (!gameOver) {
                    winAudio.play();
                }
                console.log("Player1:", Player1Score, "Player2:", Player2Score);
                setRound((prev) => prev + 1);
                setCount(0);

                // This is supposed to be round2 but II don't know why it only works when I set it to round one
                if (round === 1 && !gameOver) {
                    setPlayRound2SoundOnce(true);
                }
                if (round === 2 && !gameOver) {
                    setPlayRound3SoundOnce(true);
                }
                if (round === 3 && !gameOver) {
                    setPlayRound4SoundOnce(true);
                }
                if (round === 4) {
                    setfinalRoundSoundOnce(true);
                }

                // Resetting the values in buttons
                boxes.forEach((box) => {
                    box.symbol = "";
                });
            }
            if (playRound1SoundOnce) {
                round1Audio.play();
                setPlayRound1SoundOnce(false);
            }
            if (playRound2SoundOnce) {
                round2Audio.play();
                setPlayRound2SoundOnce(false);
            }
            if (playRound3SoundOnce) {
                round3Audio.play();
                setPlayRound3SoundOnce(false);
            }
            if (playRound4SoundOnce) {
                round4Audio.play();
                setPlayRound4SoundOnce(false);
            }
            if (finalRoundSoundOnce) {
                finalRoundAudio.play();
                setfinalRoundSoundOnce(false);
            }
        }
        if (count === 8) {
            boxes.forEach((box) => {
                box.symbol = "";
            });
        }
    }

    function checkWinCondition() {
        if (Player1Score === 3 || Player2Score === 3) {
            setWinnerNotFound(false);
        }
    }

    function ChangeSymbol(index) {
        if (!winnerNotFound) {
            return;
        }
        const updateBoxes = [...boxes];
        if (updateBoxes[index].symbol === "") {
            setCount((prev) => prev + 1);
            const symbol = (count) => {
                if (count % 2 == 0) {
                    return "X";
                } else {
                    return "O";
                }
            };
            updateBoxes[index] = {
                symbol: symbol(count),
            };
            setBox(updateBoxes);

            clickAudio.play();
        }
    }

    return (
        <>
            {winnerNotFound ? (
                <>
                    <div className={style.container}>
                        {boxes.map((box, index) => (
                            <React.Fragment key={index}>
                                {index === 3 || index === 6 ? <br /> : null}
                                <button
                                    className={`${style.box} ${style.fadeStyle}`}
                                    onClick={() => ChangeSymbol(index)}
                                >
                                    {box.symbol}&nbsp;
                                </button>
                            </React.Fragment>
                        ))}
                    </div>
                    <div className={style.mainContainerForScoreBoard}>
                        <div className={style.playerContainer1}>
                            <span className={style.Player1}>
                                {props.Player1}[X]
                            </span>
                            <span className={style.Player1Score}>
                                {Player1Score}
                            </span>
                        </div>

                        <div className={style.playerContainer2}>
                            <span className={style.Player2}>
                                {props.Player2}[O]
                            </span>
                            <span className={style.Player2Score}>
                                {Player2Score}
                            </span>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <Fireworks />
                    <div className={style.winnerContainer}>
                        <p>Winner</p>
                        <Image
                            src="/chain.png"
                            width={200}
                            height={200}
                            className="chain"
                        />
                        <p className="winnerDesign">{WinnerName}</p>
                    </div>
                </>
            )}

            <Image
                src="/vs.png"
                width={300}
                height={300}
                className={style.vs}
            />
        </>
    );
}
