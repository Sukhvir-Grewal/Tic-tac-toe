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
import StarsComponent from "@/components/stars";

export default function GameCom() {
    const [count, setCount] = useState(0);
    const [drawCount, setDrawCount] = useState(0);
    const [RandomCorner, setRandomCorner] = useState();
    const [boxes, setBox] = useState([...Array(9).fill({ symbol: "" })]);
    const [winnerNotFound, setWinnerNotFound] = useState(true);
    const [PlayerScore, setPlayerScore] = useState(0);
    const [ComputerScore, setComputerScore] = useState(0);
    const [GoHome, setGoHome] = useState(false);
    const [drawFlag, setDrawFlag] = useState(false);
    const [checkOneTime, setCheckOneTime] = useState(true);
    const [ComputerTurn, setComputerTurn] = useState(false);
    const [SecondTurnFlagON, setSecondTurnFlagON] = useState(false);
    const [lastPlayerMove, setLastPlayerMove] = useState(-1);
    const [round, setRound] = useState(1);
    const [WinnerName, setWinnerName] = useState("");
    const [playRound1SoundOnce, setPlayRound1SoundOnce] = useState(true);
    const [playRound2SoundOnce, setPlayRound2SoundOnce] = useState(true);
    const [playRound3SoundOnce, setPlayRound3SoundOnce] = useState(true);
    const [playRound4SoundOnce, setPlayRound4SoundOnce] = useState(true);
    const [finalRoundSoundOnce, setFinalRoundSoundOnce] = useState(true);
    const [checkFirstLoad, setCheckFirstLoad] = useState(true);
    const screenRef = useRef(null);
    const cancelRef = useRef(null);
    const confirmRef = useRef(null);
    const router = useRouter();

    // Distracting variables
    // var { Player1, Player2, Turn } = router.query;
    var Player1 = "Sikhvir";

    // This will create a array of reactor references to all the
    // button array that I will use to enable or disable button
    const buttonRef = useRef(
        Array.from({
            length: boxes.length,
        }).map(() => React.createRef())
    );
    const vsImageRef = useRef(null);
    const [screenText, setScreenText] = useState("");
    const [screenTextRenderFirstTime, setScreenTextRenderFirstTime] =
        useState(true);

    //================================================= */
    // This is something good I learned
    const audioContextRef = useRef(null);

    useEffect(() => {
        // Create the audio context when the component mounts
        audioContextRef.current = new (window.AudioContext ||
            window.webkitAudioContext)();

        return () => {
            // Clean up the audio context when the component unmounts
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

    //================================================= */

    useEffect(() => {
        checkWinner();
        controlScreen();
        checkWinCondition();
        // OnFirstLoad();
        if (ComputerTurn) {
            setTimeout(() => {
                computerMove(boxes);
                setCount((prev) => prev + 1);
            }, 100);
            setComputerTurn(false);
        }
        if (GoHome) router.push("/");
    }, [PlayerScore, ComputerScore, count, GoHome, ComputerTurn, boxes]);

    function ChangeSymbol(index) {
        if (!winnerNotFound) {
            return;
        }
        setLastPlayerMove(index);
        if (boxes[index].symbol === "") {
            playAudio(clickSound);
            boxes[index] = {
                symbol: "X",
            };
            disableButtons(0.5);
            if (IfPlayerNotWon()) {
                setTimeout(() => {
                    computerMove(boxes);
                }, 500);
            }
            setCount((prev) => prev + 1);
        }
    }

    function computerMove(updateBoxes) {
        var RandomNumber;
        var moveNotFound = true;
        var emptySpace = false;

        var count8Values = boxes.filter(
            (box) => box.symbol === "X" || box.symbol === "O"
        ).length;
        if (count8Values === 7) {
            const updatedBoxes = boxes.map((box) => {
                if (box.symbol === "") {
                    return { symbol: "O" };
                } else {
                    return box;
                }
            });

            setBox(updatedBoxes);
            }

        // If Computer Have First Turn Choose one corner
        if (boxesIsEmpty()) {
            var corners = [0, 2, 6, 8];
            var tempRam = corners[Math.floor(Math.random() * corners.length)];
            setRandomCorner(tempRam);
            boxes[tempRam] = {
                symbol: "O",
            };
            setCount((prev) => prev + 1);
            setSecondTurnFlagON(true);
            return;
        }

        // Check the Number of X in Board to choose second and third move for computer
        var countX = boxes.filter((box) => box.symbol === "X").length;
        var TurnOffTheMiddleFlag = true;

        if (countX === 1 && SecondTurnFlagON) {
            if (boxes[4].symbol === "X") {
                TurnOffTheMiddleFlag = false;
                setSecondTurnFlagON(false);
            }
            if (RandomCorner === 0) {
                if (
                    boxes[1].symbol === "X" ||
                    boxes[2].symbol === "X" ||
                    boxes[4].symbol === "X"
                ) {
                    const newBoxes = [...updateBoxes];
                    newBoxes[6] = {
                        symbol: "O",
                    };
                    setBox(newBoxes);
                } else if (
                    boxes[3].symbol === "X" ||
                    boxes[5].symbol === "X" ||
                    boxes[6].symbol === "X" ||
                    boxes[7].symbol === "X" ||
                    boxes[8].symbol === "X"
                ) {
                    const newBoxes = [...updateBoxes];
                    newBoxes[2] = {
                        symbol: "O",
                    };
                    setBox(newBoxes);
                }
            } else if (RandomCorner === 6) {
                if (
                    boxes[3].symbol === "X" ||
                    boxes[0].symbol === "X" ||
                    boxes[4].symbol === "X"
                ) {
                    const newBoxes = [...updateBoxes];
                    newBoxes[8] = {
                        symbol: "O",
                    };
                    setBox(newBoxes);
                    console.log("3333");
                } else if (
                    boxes[7].symbol === "X" ||
                    boxes[8].symbol === "X" ||
                    boxes[1].symbol === "X" ||
                    boxes[2].symbol === "X" ||
                    boxes[5].symbol === "X"
                ) {
                    console.log("4444");
                    const newBoxes = [...updateBoxes];
                    newBoxes[0] = {
                        symbol: "O",
                    };
                    setBox(newBoxes);
                }
            } else if (RandomCorner === 2) {
                if (
                    boxes[5].symbol === "X" ||
                    boxes[8].symbol === "X" ||
                    boxes[4].symbol === "X"
                ) {
                    const newBoxes = [...updateBoxes];
                    newBoxes[0] = {
                        symbol: "O",
                    };
                    setBox(newBoxes);
                    console.log("3333");
                } else if (
                    boxes[0].symbol === "X" ||
                    boxes[6].symbol === "X" ||
                    boxes[1].symbol === "X" ||
                    boxes[3].symbol === "X" ||
                    boxes[7].symbol === "X"
                ) {
                    console.log("4444");
                    const newBoxes = [...updateBoxes];
                    newBoxes[8] = {
                        symbol: "O",
                    };
                    setBox(newBoxes);
                }
            } else if (RandomCorner === 8) {
                if (
                    boxes[7].symbol === "X" ||
                    boxes[6].symbol === "X" ||
                    boxes[4].symbol === "X"
                ) {
                    const newBoxes = [...updateBoxes];
                    newBoxes[2] = {
                        symbol: "O",
                    };
                    setBox(newBoxes);
                    console.log("3333");
                } else if (
                    boxes[0].symbol === "X" ||
                    boxes[5].symbol === "X" ||
                    boxes[1].symbol === "X" ||
                    boxes[3].symbol === "X" ||
                    boxes[2].symbol === "X"
                ) {
                    console.log("4444");
                    const newBoxes = [...updateBoxes];
                    newBoxes[6] = {
                        symbol: "O",
                    };
                    setBox(newBoxes);
                }
            }
            setCount((prev) => prev + 1);
            return;
        } else if (countX === 2 && SecondTurnFlagON && TurnOffTheMiddleFlag) {
            if (RandomCorner === 0) {
                if (boxes[1].symbol === "X" || boxes[2].symbol === "X") {
                    const newBoxes = [...updateBoxes];
                    newBoxes[8] = {
                        symbol: "O",
                    };
                    setBox(newBoxes);
                } else if (lastPlayerMove === 8 || lastPlayerMove === 5) {
                    const newBoxes = [...updateBoxes];
                    newBoxes[8] = {
                        symbol: "O",
                    };
                    setBox(newBoxes);
                } else if (
                    boxes[3].symbol === "X" ||
                    boxes[6].symbol === "X" ||
                    boxes[7].symbol === "X"
                ) {
                    const newBoxes = [...updateBoxes];
                    newBoxes[8] = {
                        symbol: "O",
                    };
                    setBox(newBoxes);
                }
            } else if (RandomCorner === 6) {
                if (boxes[3].symbol === "X" || boxes[0].symbol === "X") {
                    const newBoxes = [...updateBoxes];
                    newBoxes[2] = {
                        symbol: "O",
                    };
                    setBox(newBoxes);
                } else if (lastPlayerMove === 1 || lastPlayerMove === 2) {
                    const newBoxes = [...updateBoxes];
                    newBoxes[8] = {
                        symbol: "O",
                    };
                    setBox(newBoxes);
                } else if (
                    boxes[7].symbol === "X" ||
                    boxes[8].symbol === "X" ||
                    boxes[5].symbol === "X"
                ) {
                    console.log("4444");
                    const newBoxes = [...updateBoxes];
                    newBoxes[2] = {
                        symbol: "O",
                    };
                    setBox(newBoxes);
                }
            } else if (RandomCorner === 2) {
                if (boxes[5].symbol === "X" || boxes[8].symbol === "X") {
                    const newBoxes = [...updateBoxes];
                    newBoxes[6] = {
                        symbol: "O",
                    };
                    setBox(newBoxes);
                } else if (lastPlayerMove === 6 || lastPlayerMove === 7) {
                    const newBoxes = [...updateBoxes];
                    newBoxes[8] = {
                        symbol: "O",
                    };
                    setBox(newBoxes);
                } else if (
                    boxes[0].symbol === "X" ||
                    boxes[1].symbol === "X" ||
                    boxes[3].symbol === "X"
                ) {
                    console.log("4444");
                    const newBoxes = [...updateBoxes];
                    newBoxes[6] = {
                        symbol: "O",
                    };
                    setBox(newBoxes);
                }
            } else if (RandomCorner === 8) {
                if (boxes[7].symbol === "X" || boxes[6].symbol === "X") {
                    const newBoxes = [...updateBoxes];
                    newBoxes[0] = {
                        symbol: "O",
                    };
                    setBox(newBoxes);
                } else if (lastPlayerMove === 0 || lastPlayerMove === 3) {
                    const newBoxes = [...updateBoxes];
                    newBoxes[2] = {
                        symbol: "O",
                    };
                    setBox(newBoxes);
                } else if (
                    boxes[5].symbol === "X" ||
                    boxes[1].symbol === "X" ||
                    boxes[2].symbol === "X"
                ) {
                    const newBoxes = [...updateBoxes];
                    newBoxes[0] = {
                        symbol: "O",
                    };
                    setBox(newBoxes);
                }
            }
            setCount((prev) => prev + 1);
            setSecondTurnFlagON(false);
            return;
        }

        updateBoxes.forEach((btn) => {
            if (btn.symbol === "") emptySpace = true;
        });

        while (
            moveNotFound &&
            emptySpace &&
            getWinningMove() &&
            getDefensiveMove()
        ) {
            RandomNumber = Math.floor(Math.random() * 8);
            if (updateBoxes[RandomNumber].symbol === "") {
                updateBoxes[RandomNumber] = {
                    symbol: "O",
                };
                setBox(updateBoxes);
                moveNotFound = false;
            }
        }
        setCount((prev) => prev + 1);
    }

    function boxesIsEmpty() {
        return boxes.every((box) => box.symbol === "");
    }

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

        // this is to resolve the re rendering when I put the delay on a removing the symbols
        if (checkOneTime) {
            for (const pattern of winPatterns) {
                const [a, b, c] = pattern;
                if (
                    boxes[a].symbol &&
                    boxes[a].symbol === boxes[b].symbol &&
                    boxes[a].symbol === boxes[c].symbol
                ) {
                    if (boxes[a].symbol === "X") {
                        setPlayerScore((prev) => prev + 1);
                        setTimeout(() => {
                            computerMove(boxes);
                            setCount((prev) => prev + 1);
                        }, 2000);
                    } else {
                        setComputerScore((prev) => prev + 1);
                    }

                    disableButtons(1.5);
                    setTimeout(() => {
                        boxes.forEach((box) => {
                            box.symbol = "";
                        });
                        setCheckOneTime(true);
                    }, 1500);
                    setCheckOneTime(false);
                    setRound((prev) => prev + 1);
                    setCount(0);
                }
            }
        } else {
            return;
        }
    }

    // Computer Moves *********************************** //

    function getDefensiveMove() {
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
                boxes[a].symbol === "X" &&
                boxes[a].symbol === boxes[b].symbol &&
                boxes[c].symbol === ""
            ) {
                const updateBoxes = [...boxes];
                updateBoxes[c] = {
                    symbol: "O",
                };
                setBox(updateBoxes);
                return false;
            } else if (
                boxes[b].symbol === "X" &&
                boxes[b].symbol === boxes[c].symbol &&
                boxes[a].symbol === ""
            ) {
                const updateBoxes = [...boxes];
                updateBoxes[a] = {
                    symbol: "O",
                };
                setBox(updateBoxes);
                return false;
            } else if (
                boxes[a].symbol === "X" &&
                boxes[a].symbol === boxes[c].symbol &&
                boxes[b].symbol === ""
            ) {
                const updateBoxes = [...boxes];
                updateBoxes[b] = {
                    symbol: "O",
                };
                setBox(updateBoxes);
                return false;
            }
        }
        return true;
    }
    function getWinningMove() {
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
                boxes[a].symbol === "O" &&
                boxes[a].symbol === boxes[b].symbol &&
                boxes[c].symbol === ""
            ) {
                const updateBoxes = [...boxes];
                updateBoxes[c] = {
                    symbol: "O",
                };
                setBox(updateBoxes);
                return false;
            } else if (
                boxes[b].symbol === "O" &&
                boxes[b].symbol === boxes[c].symbol &&
                boxes[a].symbol === ""
            ) {
                const updateBoxes = [...boxes];
                updateBoxes[a] = {
                    symbol: "O",
                };
                setBox(updateBoxes);
                return false;
            } else if (
                boxes[a].symbol === "O" &&
                boxes[a].symbol === boxes[c].symbol &&
                boxes[b].symbol === ""
            ) {
                const updateBoxes = [...boxes];
                updateBoxes[b] = {
                    symbol: "O",
                };
                setBox(updateBoxes);
                return false;
            }
        }
        return true;
    }

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
            console.log(count);
            if (count === 10) {
                setScreenText("It's Draw!");
                disableButtons(1.6);
                setTimeout(() => {
                    if (boxes) {
                        // Check if boxes is defined
                        // const updatedBoxes = [...boxes];
                        boxes.forEach((box) => {
                            box.symbol = "";
                        });
                        setDrawCount((prev) => prev + 1);
                        drawCount % 2 === 0
                            ? setComputerTurn(true)
                            : setComputerTurn(false);
                        // setBox(updatedBoxes); // Update the state to trigger a re-render
                    }
                }, 1500);
                setCount(0);
                setDrawFlag(true);
            } else {
                if (drawFlag) {
                    setTimeout(() => {
                        setScreenText(`Round: ${round}`);
                    }, 1500);
                    setDrawFlag(false);
                } else {
                    setScreenText(`Round: ${round}`);
                }
            }
        }
    }

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

    function checkWinCondition() {
        if (PlayerScore === 3 || ComputerScore === 3) {
            PlayerScore === 3
                ? setWinnerName(Player1)
                : setWinnerName("Computer");

            setTimeout(() => {
                setWinnerNotFound(false);
            }, 1000);
            playAudio(youWinSound);
            playAudio(victorySound);
        } else {
            if (playRound1SoundOnce) {
                // playAudio(round1Sound);
                setPlayRound1SoundOnce(false);
            } else if (round === 2 && playRound2SoundOnce) {
                setTimeout(() => {
                    playAudio(round2Sound);
                }, 500);
                playAudio(winSound);
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
                setTimeout(() => {
                    playAudio(finalRoundSound);
                }, 500);
                setFinalRoundSoundOnce(false);
            }
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
        setPlayerScore(0);
        setComputerScore(0);
        setScreenText("");
        setScreenTextRenderFirstTime(true);
        setCheckFirstLoad(true);
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
    function OnFirstLoad() {
        if (checkFirstLoad) {
            buttonRef.current.forEach((button) => {
                if (button.current) button.current.classList.add("fadeStyle");
            });
            if (vsImageRef.current)
                vsImageRef.current.classList.add(style.vsFadeOut);
            setCheckFirstLoad(false);
        }
    }

    function IfPlayerNotWon() {
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
                if (boxes[a].symbol === "X") {
                    return false;
                }
            }
        }
        return true;
    }

    return (
        <>
            <StarsComponent />
            {winnerNotFound ? (
                <>
                    <div className={"mainContainerForScoreBoard"}>
                        <div className={"playerContainer1"}>
                            <span className={style.Player1}>
                                {/* {Player1}&nbsp; */}
                                Sukhvir
                                <b>[X]</b>
                            </span>
                            <span className={"Player1Score"}>
                                {PlayerScore}
                            </span>
                        </div>
                        <div ref={screenRef} className={"Screen"}>
                            {screenText}
                        </div>

                        <div className={"playerContainer2"}>
                            <span className={style.Player2}>
                                {/* {Player2}&nbsp; */}
                                Computer
                                <b>[O]</b>
                            </span>
                            <span className={"Player2Score"}>
                                {ComputerScore}
                            </span>
                        </div>
                    </div>

                    <div className={"container"}>
                        {boxes.map((box, index) => (
                            <React.Fragment key={index}>
                                {index === 3 || index === 6 ? <br /> : null}
                                <button
                                    className={`${"box"}`}
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
                        ref={vsImageRef}
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
