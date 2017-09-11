'use strict'

const ROWS = 18;
const COLS = 27;
const BTN_BK_COLOR = "#999";
const BTN_BORDER_COLOR = "#fff";

function resetButton(tab){
    document.getElementById("brick").style.backgroundColor = BTN_BK_COLOR;
}
/**
 * @param {bool} hide
 * @return {object}
 */
function createTd(hide){
    var td = document.createElement("td");
    td.border = "1px";
    td.width = "30px";
    td.height = "30px";
    td.padding = "1px";
    if(hide) {
        td.className = "brick virtual";
        td.style.backgroundColor = "#eaeaea";
    } else {
        td.className = "brick";
        td.style.backgroundColor = "#fff";
    }
    return td;
}
/**
 * @param {object} td
 * @param {string} id
 */
function createButton(td, id){
    var btn = document.createElement("button");
    btn.id = id;
    td.appendChild(btn);
    document.getElementById(id).style.width = "30px";
    document.getElementById(id).style.height = "30px";
    document.getElementById(id).style.borderColor = BTN_BORDER_COLOR;
    document.getElementById(id).style.backgroundColor = BTN_BK_COLOR;
}

(function(){
    var body = document.body,
        button = document.getElementById("start"),
        table = document.createElement('table');

    table.id = "tab";
    table.position = "absolute";
    body.insertBefore(table,button);

    for(var i = 0; i < ROWS; i++){
        var tr = document.createElement("tr");
        table.appendChild(tr);
        for(var j = 0; j < COLS; j++){
            var td = null,
                id = i * COLS + j;
            if(0 == j || j == COLS - 1 || 0 == i || i == ROWS - 1) {
                td = createTd(true);
                tr.appendChild(td);
            } else {
                td = createTd(false);
                tr.appendChild(td);
                createButton(td, id);
            }
        }
    }
})();
