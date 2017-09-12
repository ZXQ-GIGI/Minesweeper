'use strict'


var clickAction = function(){
    for(var i = 1; i < ROWS - 1; i++){
        for(var j = 1; j < COLS - 1; j++){
            var brick = document.getElementById((i*COLS+j).toString());
            brick.onclick = function(){
                var id = brick.id;
                return function(){
                    document.getElementById(id).style.backgroundColor = "#ff0";
                }
            }();
        }
    }
};

/* set canvas */
clickAction();
var start_btn = document.getElementById("start");
start_btn.addEventListener("click",function(){
    resetButtons();
    clickAction();
});
