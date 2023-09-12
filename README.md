# Version 1.0.0 (Static APP)

>[!Note]
>This Project is just for Practice JavaScript and Game Set-put and also wanna play with Logic.<br>
>**[Static App Link](https://beautiful-lollipop-2f84ff.netlify.app/)**<br>
>**[Dynamic App Link](https://tic-tac-toe-one-lemon.vercel.app)**


## Game Skeleton 
The First Working App Is Done With in Few hours, Since I have already done The logic with C Back in the early days

I wasn't sure how should I come up with the fact that after one turn instead of `X` we should use `O` to mark the button. So I came up with this solution which I still think could be better but it's working right you know what they say, ***"when the program is working don't touch it"***

```js
  var count = 0;

  function checkSymbol(count) {
    if (count % 2 == 0) {
      return "X";
    } else {
      return "O";
    }
  }
```

>Now For every First turn player would be to use `X` and for the second player he can use `O`, Because after every turn I will increase the counter with one<br>

Like this:
```js
test.forEach((test) => {
    test.addEventListener("click", () => {
      if (test.innerHTML == "&nbsp;") {
        symbol = checkSymbol(count);
        test.innerHTML = symbol;
        count++;
        checkResults();
      }
    });
  });
```
![X and O](/static_App/images/V1.0.0_XandO.png)

For now every box I'm using as a button and after every click I'm checking if the player has won or not. 
If somebody wins it creates a text and display it on the screen
```js
  function YouWin(){
    var div = document.querySelector(".textbox")
    var Text = document.createTextNode("YOU WIN")
    div.appendChild(Text)
  }
```

![V1.0.0_YouWin](/static_App/images/V1.0.0_YouWin.png)

Now this game is playable by two persons but there are a lot of stuff we can improve, so let's start working on it


# Version 1.1.0

Instead of manually loading the Page i added a Reload Icon and instead of Showing **You Win** which was bit unclear i replaced it witch **Gamer Over**

![Game Over](/static_App/images/V1.1.0_GameOver.png)


# Version 2.0.0 (Dynamic APP)

Shifting code to next.js surely wasn't easy, i had to create completely new code to replicate the frame of my Tic Tac Toe.
which i achieved making an array of boxes and filling the empty property which i named symbol.

```js
  const [boxes, setBox] = useState([...Array(9).fill({ symbol: "" })]);
```

and then i mapped the whole array to to create the button tags and also embedded the classNames to support my same CSS

```js
boxes.map((box, index) => (
            <React.Fragment key={index}>
              {(index == 3 || index === 6) && <br />}
              <button
                className={`${style.style1} ${style.box}`}
                onClick={() => ChangeSymbol(index)}
              >
                {box.symbol}&nbsp;
              </button>
            </React.Fragment>
          ))
```

`{(index == 3 || index === 6) && <br />}` I hardcoded District condition to make To make the shape of a square<br>


## Learnings
One main thing I learned after coding this APP, Is it to compare a pattern with a simple condition which is quite useful because my logic to check the winner was nearly of 50 lines which I replaced with this 

```js
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
```

For the future updates my plans are to add a Form to input Player 1 and Player 2 Names before displaying the game board, let's code that!

# Version 2.1.0

In this version I introduced a form where player 1 and player names can be entered,before entering the game I also used summer css to make it look better 

![Alt text](/dynamicapp/public//images/v.2.1.0_form.png)

After hitting play button going to the game board seems bit dull, so I added the animation Using CSS, Actually different animation for different screens because my main animation works perfectly with laptop screen, But for smaller screens it looks completely weird so for this phone I added just a simple fade in using media query

```css
@media (min-width:950px) {
  .fadeStyle {
    animation: slideIn 3s ease;
  }
}
@media (max-width:950px) {
  .fadeStyle {
    animation: fadeIn 4s ease;
  }
}
```

And added their corresponding animations
```css
@keyframes slideIn {
  0% {
    opacity: 0.1;
    margin: 1px 100px 1px 100px;
  }
  100% {
    opacity: 1;
    margin: 1px 1px 1px 1px;
  }
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
```
Yes so far It looks good and it works good but I wanted to use those input player names on the top of play board screen to show How many points each player earned by winning, Let's work on the next Version


## Version 2.2.0

In this version I have covered a lot of stuff, i used the player points to display left and right on the top

![v2.2.0_scoreDisplay](/dynamicapp/public/images/v2.2.0_scoreDisplay.png)

 Every time a player scores 3 first will win the Game, and his name will be displayed on the screen with the css animation which took me longer than i thought for coding

 ![v2.2.0_WinnerGif](/dynamicapp/public/gif/v2.2.0_WinnerGif.gif)

>[!Note]
>Don't mind my minecraft Mouse 😏

I also used the sounds of mortal combat Rounds like 
