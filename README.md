# Version 1.0.0

>[!Note]
>This Project is just for Practice JavaScript and Game Set-put and also wanna play with Logic.<br>
>**App Link** : [Don't Worry It's Safe](https://beautiful-lollipop-2f84ff.netlify.app/)


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

>Now For every First turn player would be to use `X` and for the second player he can use `O`