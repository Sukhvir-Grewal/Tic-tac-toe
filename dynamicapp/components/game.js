import style from "@/styles/Home.module.css";
import React, { useEffect, useState } from "react";

export default function Game(props) {
  const [count, setCount] = useState(0);
  const [boxes, setBox] = useState([...Array(9).fill({ symbol: "" })]);
  const [winnerNotFound, setWinnerNotFound] = useState(true);

  useEffect(() => {
    checkWinner();
  }, [boxes]);

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
        console.log("winner");
        setWinnerNotFound(false);
        return;
      }
    }

    // Check for a draw
    // if (count === 9) {
    //   setWinner("It's a draw!");
    // }
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
    }
  }

  return (
    <>
      <div className={style.container}>
        {winnerNotFound ? (
          boxes.map((box, index) => (
            <React.Fragment key={index}>
              {(index == 3 || index === 6) && <br />}
              <button
                className={`${style.box} ${style.fadeStyle}`}
                onClick={() => ChangeSymbol(index)}
              >
                {box.symbol}&nbsp;
              </button>
            </React.Fragment>
          ))
        ) : (
          <>we have a winner</>
        )}
      </div>
    </>
  );
}
