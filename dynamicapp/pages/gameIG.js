// import React, { useEffect, useRef, useState } from "react";
// import { Button } from "react-bootstrap";
// import Image from "next/image";
// import { useRouter } from "next/router";

// // Importing CSS files
// import style from "@/styles/Home.module.css";

// // Importing sound files
// import clickSound from "@/public/sounds/click.mp3";
// import winSound from "@/public/sounds/win.mp3";
// import StarsComponent from "@/components/stars";

// export default function Game() {
//     const [count, setCount] = useState(0);
//     const [boxes, setBox] = useState([...Array(9).fill({ symbol: "" })]);
//     const [Player1Score, setPlayer1Score] = useState(0);
//     const [Player2Score, setPlayer2Score] = useState(0);
//     const [GoHome, setGoHome] = useState(false);
//     const [round, setRound] = useState(1);
//     const [checkFirstLoad, setCheckFirstLoad] = useState(true);
//     const screenRef = useRef(null);
//     const cancelRef = useRef(null);
//     const confirmRef = useRef(null);
//     const router = useRouter();

//     // Distracting variables
//     var { Player1, Player2, Turn } = router.query;

//     // This will create a array of reactor references to all the
//     // button array that I will use to enable or disable button
//     const buttonRef = useRef(
//         Array.from({
//             length: boxes.length,
//         }).map(() => React.createRef())
//     );
//     const vsImageRef = useRef(null);
//     const [screenText, setScreenText] = useState("");
//     const [screenTextRenderFirstTime, setScreenTextRenderFirstTime] =
//         useState(true);

//     //===================================================
//     // This is something good I learned
//     const audioContextRef = useRef(null);

//     useEffect(() => {
//         // Create the audio context when the component mounts
//         audioContextRef.current = new (window.AudioContext ||
//             window.webkitAudioContext)();

//         return () => {
//             // Clean up the audio context when the component unmounts
//             if (audioContextRef.current) {
//                 audioContextRef.current.close();
//             }
//         };
//     }, []);

//     const playAudio = (audioFile) => {
//         if (!audioContextRef.current) {
//             return;
//         }

//         // Fetch and decode the audio file
//         fetch(audioFile)
//             .then((response) => response.arrayBuffer())
//             .then((audioData) => {
//                 audioContextRef.current.decodeAudioData(audioData, (buffer) => {
//                     // Create an audio source and connect it to the context
//                     const source = audioContextRef.current.createBufferSource();
//                     source.buffer = buffer;
//                     source.connect(audioContextRef.current.destination);

//                     // Start playing the audio
//                     source.start();
//                 });
//             });
//     };

//     //===================================================

//     useEffect(() => {
//         checkWinner();
//         controlScreen();
//         OnFirstLoad();

//         if (GoHome) router.push("/");
//     }, [boxes, Player1Score, Player2Score, GoHome]);

//     // This function is responsible for the following:
//     // 1. it checks the winning pattern
//     // 2. It the resets the count variable As well as all the buttons
//     // 3. And increases the round number
//     function checkWinner() {
//         const winPatterns = [
//             [0, 1, 2],
//             [3, 4, 5],
//             [6, 7, 8],
//             [0, 3, 6],
//             [1, 4, 7],
//             [2, 5, 8],
//             [0, 4, 8],
//             [2, 4, 6],
//         ];

//         for (const pattern of winPatterns) {
//             const [a, b, c] = pattern;
//             if (
//                 boxes[a].symbol &&
//                 boxes[a].symbol === boxes[b].symbol &&
//                 boxes[a].symbol === boxes[c].symbol
//             ) {
//                 // Increasing score when one player wins
//                 // TThe winner will get the turn first
//                 if (boxes[a].symbol === "X") {
//                     setPlayer1Score((prev) => prev + 1);
//                     setCount(0);
//                 } else {
//                     setPlayer2Score((prev) => prev + 1);
//                     setCount(1);
//                 }
//                 playAudio(winSound);

//                 disableButtons(1);
//                 setRound((prev) => prev + 1);
//                 // Resetting the values in buttons to empty
//                 boxes.forEach((box) => {
//                     box.symbol = "";
//                 });
//             }
//         }
//     }


//     // This function is responsible for the clicking sound as well as rendering the X and O
//     function ChangeSymbol(index) {
//         // clickAudio.play();
//         playAudio(clickSound);
//         const updateBoxes = [...boxes];
//         if (updateBoxes[index].symbol === "") {
//             const symbol = (count) => {
//                 if (count % 2 === 0) {
//                     return "X";
//                 } else {
//                     return "O";
//                 }
//             };
//             updateBoxes[index] = {
//                 symbol: symbol(count),
//             };
//             setBox(updateBoxes);
//             setCount((prev) => prev + 1);
//         }
//     }

//     function rematch() {
//         setCount(0);
//         setRound(1);
//         setPlayer1Score(0);
//         setPlayer2Score(0);
//         setScreenText("");
//         setScreenTextRenderFirstTime(true);
//         setCheckFirstLoad(true);
//     }

//     function home() {
//         rematch();
//         setGoHome(true);
//     }

//     function homeInGame() {
//         if (cancelRef && confirmRef) {
//             cancelRef.current.style.visibility = "visible";
//             confirmRef.current.style.visibility = "visible";
//         }
//     }
//     function cancel() {
//         if (cancelRef && confirmRef) {
//             cancelRef.current.style.visibility = "hidden";
//             confirmRef.current.style.visibility = "hidden";
//         }
//     }

//     // This is the kind of the main part of the game where player
//     // can see Who have the turn and it also displays the draw
//     function controlScreen() {
//         if (screenTextRenderFirstTime) {
//             setScreenText(3);
//             for (let i = 2; i > 0; i--) {
//                 setTimeout(() => {
//                     setScreenText(i);
//                 }, 1000 * (2 - i + 1));
//             }
//             disableButtons(3);
//             setScreenTextRenderFirstTime(false);
//             setTimeout(() => {
//                 setScreenText("Go!");
//             }, 3000);
//         } else {
//             if (count === 9) {
//                 setScreenText("It's Draw!");
//                 disableButtons(1.6);
//                 setTimeout(() => {
//                     if (boxes) {
//                         // Check if boxes is defined
//                         const updatedBoxes = boxes.map((box) => ({
//                             symbol: "",
//                         }));
//                         setBox(updatedBoxes); // Update the state to trigger a re-render
//                     }
//                 }, 1500);
//                 setCount(0);
//             } else if (count % 2 === 0) {
//                 setScreenText(`${Player1}'s Turn`);
//             } else if (count % 2 !== 0) {
//                 setScreenText(`${Player2}'s Turn`);
//             }
//         }
//     }

//     // This is the reusable function to enable and disable the buttons for dynamic Times
//     function disableButtons(seconds) {
//         buttonRef.current.forEach((button) => {
//             if (button.current) {
//                 button.current.setAttribute("disabled", true);
//             }
//         });
//         setTimeout(() => {
//             buttonRef.current.forEach((button) => {
//                 if (button.current) {
//                     button.current.removeAttribute("disabled");
//                 }
//             });
//         }, seconds * 1000);
//     }

//     function OnFirstLoad() {
//         if (checkFirstLoad) {
//             buttonRef.current.forEach((button) => {
//                 if (button.current) button.current.classList.add("fadeStyle");
//             });
//             if (vsImageRef.current)
//                 vsImageRef.current.classList.add(style.vsFadeOut);
//             setCheckFirstLoad(false);
//         }
//     }

//     return (
//         <>
//             <StarsComponent />
//                 <>
//                     {Turn === "p2" &&
//                         (() => {
//                             const temp = Player1;
//                             Player1 = Player2;
//                             Player2 = temp;
//                         })()}
//                     <div className={"mainContainerForScoreBoard"}>
//                         <div className={"playerContainer1"}>
//                             <span className={style.Player1}>
//                                 {Player1}&nbsp;
//                                 <b>[X]</b>
//                             </span>
//                             <span className={"Player1Score"}>
//                                 {Player1Score}
//                             </span>
//                         </div>
//                         <div ref={screenRef} className={"Screen"}>
//                             {screenText}
//                         </div>

//                         <div className={"playerContainer2"}>
//                             <span className={style.Player2}>
//                                 {Player2}&nbsp;
//                                 <b>[O]</b>
//                             </span>
//                             <span className={"Player2Score"}>
//                                 {Player2Score}
//                             </span>
//                         </div>
//                     </div>

//                     <div className={"container"}>
//                         {boxes.map((box, index) => (
//                             <React.Fragment key={index}>
//                                 {index === 3 || index === 6 ? <br /> : null}
//                                 <button
//                                     className={`${"box"}`}
//                                     onClick={() => ChangeSymbol(index)}
//                                     ref={buttonRef.current[index]}
//                                 >
//                                     {box.symbol}&nbsp;
//                                 </button>
//                             </React.Fragment>
//                         ))}
//                     </div>

//                     <Image
//                         src="/images/vs.png"
//                         width={300}
//                         height={300}
//                         className={style.vs}
//                         ref={vsImageRef}
//                         alt="Versus image"
//                         priority={true}
//                     />
//                     <div className={style.SingleHomeButton}>
//                         <Button
//                             ref={cancelRef}
//                             onClick={() => cancel()}
//                             className={style.cancel}
//                         >
//                             ❌
//                         </Button>

//                         <Button
//                             variant="outline-primary"
//                             onClick={() => homeInGame()}
//                             className={style.SingleHomeButtonCSS}
//                         >
//                             Home
//                         </Button>

//                         <Button
//                             ref={confirmRef}
//                             onClick={() => home()}
//                             className={style.confirm}
//                         >
//                             ✔️
//                         </Button>
//                     </div>
//                 </>
//         </>
//     );
// }
