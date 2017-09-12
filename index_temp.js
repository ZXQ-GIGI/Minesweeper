'use strict'


var clickAction = function(){
    for(var i = 1; i < ROWS - 1; i++){
        for(var j = 1; j < COLS - 1; j++){
            var brick = document.getElementById((i*COLS+j).toString());
            brick.onclick = function(){
                return function(){
                    console.log(brick.id);
                }
            }();
            /*brick.addEventListener("click",function(){
                return function(){
                    console.log('1');
                }
            });
            */
        }
    }
}

/* set canvas */
var start_btn = document.getElementById("start");
start_btn.addEventListener("click",function(){
    resetButtons();
    clickAction();
});
