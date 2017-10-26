'use strict'
require(./reset.js);
const ROWS = 18;
const COLS = 27;
const SIDE_LEN = '30px';
const BTN_BK_COLOR = '#999';
const BTN_BORDER_COLOR = '#fff';
const BTN_HIDE_COLOR = '#eaeaea';
module.exports = function() {
    a: function() {
        console.log('hello a');
    }
    console.log('canvas.js');
}
//
// /**
//  * @param {bool} hide
//  * @return {object}
//  */
// function createTd(hide){
//     var td = document.createElement("td");
//     td.border = "1px";
//     td.width = SIDE_LEN;
//     td.height = SIDE_LEN;
//     td.padding = "1px";
//     if(hide) {
//         td.className = "brick virtual";
//         td.style.backgroundColor = BTN_HIDE_COLOR;
//     } else {
//         td.className = "brick";
//         td.style.backgroundColor = BTN_BORDER_COLOR;
//     }
//     return td;
// }
// /**
//  * @param {object} td
//  * @param {string} id
//  */
// function createButton(td, id){
//     var btn = document.createElement("button");
//     btn.id = id;
//     td.appendChild(btn);
//     document.getElementById(id).style.width = SIDE_LEN;
//     document.getElementById(id).style.height = SIDE_LEN;
//     document.getElementById(id).style.borderColor = BTN_BORDER_COLOR;
//     document.getElementById(id).style.backgroundColor = BTN_BK_COLOR;
// }
//
// var setButton = function(){
//     var body = document.body,
//         button = document.getElementById("start"),
//         table = document.createElement('table');
//
//     table.id = "tab";
//     table.position = "absolute";
//     body.insertBefore(table,button);
//
//     for(var i = 0; i < ROWS; i++){
//         var tr = document.createElement("tr");
//         table.appendChild(tr);
//         for(var j = 0; j < COLS; j++){
//             var td = null,
//                 id = i * COLS + j;
//             if(0 == j || j == COLS - 1 || 0 == i || i == ROWS - 1) {
//                 td = createTd(true);
//                 tr.appendChild(td);
//             } else {
//                 td = createTd(false);
//                 tr.appendChild(td);
//                 createButton(td, id);
//             }
//         }
//     }
// }();
//
// function resetButtons(){
//     for(var i = 1; i < ROWS - 1; i++){
//         for(var j = 1; j < COLS - 1; j++){
//             var id = (i * COLS + j).toString();
//             document.getElementById(id).style.backgroundColor = BTN_BK_COLOR;
//         }
//     }
// }
