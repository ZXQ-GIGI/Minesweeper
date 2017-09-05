'use strict'

const ROWS = 18;
const COLS = 27;

exports.create = function(){
    var body = document.body;
    var button = document.getElementById("start");
    var table = document.createElement('table');
    table.id = "tab";
    table.position = "absolute";
    body.insertBefore(table,button);
    for(var i = 0; i < ROWS; i++){
        var tr = document.createElement("tr");
        table.appendChild(tr);
        for(var j = 0; j < COLS; j++){
            var td = document.createElement("td");
            td.style.border = "1px";
            td.style.width = "30px";
            td.style.height = "30px";
            td.style.padding = "1px";
            if(0 == j || j == COLS-1 || 0 == i || i == ROWS-1){
                td.className = "virtual brick";
                td.style.backgroundColor = "#eaeaea";
            }else{
                td.className = "brick";
                td.style.backgroundColor = "#fff";
            }
            tr.appendChild(td);
        }
    }
}
