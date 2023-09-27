const boxes = [];

// Create objects for each box in the array
for (let i = 0; i < 4; i++) {
  boxes[i] = { symbol: "" };
}

// Assign symbols to the boxes
boxes[0].symbol = "O";
boxes[1].symbol = "X";
boxes[2].symbol = "X";
boxes[3].symbol = "O";

const countX = boxes.filter((box) => box.symbol === "X").length;
console.log(countX); // This will give you the count of "X" symbols in the boxes array
