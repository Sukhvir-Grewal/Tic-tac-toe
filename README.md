# Version 1.0.0

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