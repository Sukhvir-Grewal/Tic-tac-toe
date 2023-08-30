document.addEventListener("DOMContentLoaded", () => {
  var test = document.querySelectorAll(".box");

  var count = 0;

  function checkSymbol(count) {
    if (count % 2 == 0) {
      return "X";
    } else {
      return "O";
    }
  }

  function YouWin(){
    var div = document.querySelector(".textbox")
    var Text = document.createTextNode("YOU WIN")
    div.appendChild(Text)
  }

  function disableButtons(){
    test.forEach((test)=>{
        test.setAttribute("disabled", "true")
    })
    YouWin()
  }

  function checkResults() {
    if ((test[0].innerHTML == "X" || test[0].innerHTML == "O") &&
        (test[1].innerHTML == "X" || test[1].innerHTML == "O") &&
        (test[2].innerHTML == "X" || test[2].innerHTML == "O")){
            
            if ((test[0].innerHTML == test[1].innerHTML) && (test[1].innerHTML == test[2].innerHTML)) {
                disableButtons()
            }
        }

    if ((test[3].innerHTML == "X" || test[3].innerHTML == "O") &&
        (test[4].innerHTML == "X" || test[4].innerHTML == "O") &&
        (test[5].innerHTML == "X" || test[5].innerHTML == "O")){
            
            if((test[3].innerHTML == test[4].innerHTML) && (test[4].innerHTML == test[5].innerHTML)){
                disableButtons()

            }
        }

    if ((test[6].innerHTML == "X" || test[6].innerHTML == "O") &&
        (test[7].innerHTML == "X" || test[7].innerHTML == "O") &&
        (test[8].innerHTML == "X" || test[8].innerHTML == "O")){
            
            if((test[6].innerHTML == test[7].innerHTML) && (test[7].innerHTML == test[8].innerHTML)){
                disableButtons()

            }
        }

    if ((test[0].innerHTML == "X" || test[0].innerHTML == "O") &&
        (test[3].innerHTML == "X" || test[3].innerHTML == "O") &&
        (test[6].innerHTML == "X" || test[6].innerHTML == "O")){
            
            if((test[0].innerHTML == test[3].innerHTML) && (test[3].innerHTML == test[6].innerHTML)){
                disableButtons()

            }
        }

    if ((test[1].innerHTML == "X" || test[1].innerHTML == "O") &&
        (test[4].innerHTML == "X" || test[4].innerHTML == "O") &&
        (test[7].innerHTML == "X" || test[7].innerHTML == "O")){
            
            if((test[1].innerHTML == test[4].innerHTML) && (test[4].innerHTML == test[7].innerHTML)){
                disableButtons()

            }
        }

    if ((test[2].innerHTML == "X" || test[2].innerHTML == "O") &&
        (test[5].innerHTML == "X" || test[5].innerHTML == "O") &&
        (test[8].innerHTML == "X" || test[8].innerHTML == "O")){
            
            if((test[2].innerHTML == test[5].innerHTML) && (test[5].innerHTML == test[8].innerHTML)){
                disableButtons()

            }
        }

    if ((test[0].innerHTML == "X" || test[0].innerHTML == "O") &&
        (test[4].innerHTML == "X" || test[4].innerHTML == "O") &&
        (test[8].innerHTML == "X" || test[8].innerHTML == "O")){
            
            if((test[0].innerHTML == test[4].innerHTML) && (test[4].innerHTML == test[8].innerHTML)){
                disableButtons()

            }
        }

    if ((test[2].innerHTML == "X" || test[2].innerHTML == "O") &&
        (test[4].innerHTML == "X" || test[4].innerHTML == "O") &&
        (test[6].innerHTML == "X" || test[6].innerHTML == "O")){
            
            if((test[2].innerHTML == test[4].innerHTML) && (test[4].innerHTML == test[6].innerHTML)){
                disableButtons()

            }
        }
  }

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
});
