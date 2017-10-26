// /******/ (function(modules) { // webpackBootstrap
// /******/ 	// The module cache
// /******/ 	var installedModules = {};
// /******/
// /******/ 	// The require function
// /******/ 	function __webpack_require__(moduleId) {
// /******/
// /******/ 		// Check if module is in cache
// /******/ 		if(installedModules[moduleId]) {
// /******/ 			return installedModules[moduleId].exports;
// /******/ 		}
// /******/ 		// Create a new module (and put it into the cache)
// /******/ 		var module = installedModules[moduleId] = {
// /******/ 			i: moduleId,
// /******/ 			l: false,
// /******/ 			exports: {}
// /******/ 		};
// /******/
// /******/ 		// Execute the module function
// /******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
// /******/
// /******/ 		// Flag the module as loaded
// /******/ 		module.l = true;
// /******/
// /******/ 		// Return the exports of the module
// /******/ 		return module.exports;
// /******/ 	}
// /******/
// /******/
// /******/ 	// expose the modules object (__webpack_modules__)
// /******/ 	__webpack_require__.m = modules;
// /******/
// /******/ 	// expose the module cache
// /******/ 	__webpack_require__.c = installedModules;
// /******/
// /******/ 	// define getter function for harmony exports
// /******/ 	__webpack_require__.d = function(exports, name, getter) {
// /******/ 		if(!__webpack_require__.o(exports, name)) {
// /******/ 			Object.defineProperty(exports, name, {
// /******/ 				configurable: false,
// /******/ 				enumerable: true,
// /******/ 				get: getter
// /******/ 			});
// /******/ 		}
// /******/ 	};
// /******/
// /******/ 	// getDefaultExport function for compatibility with non-harmony modules
// /******/ 	__webpack_require__.n = function(module) {
// /******/ 		var getter = module && module.__esModule ?
// /******/ 			function getDefault() { return module['default']; } :
// /******/ 			function getModuleExports() { return module; };
// /******/ 		__webpack_require__.d(getter, 'a', getter);
// /******/ 		return getter;
// /******/ 	};
// /******/
// /******/ 	// Object.prototype.hasOwnProperty.call
// /******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
// /******/
// /******/ 	// __webpack_public_path__
// /******/ 	__webpack_require__.p = "";
// /******/
// /******/ 	// Load entry module and return exports
// /******/ 	return __webpack_require__(__webpack_require__.s = 0);
// /******/ })
// /************************************************************************/
// /******/ ([
// /* 0 */
// /***/ (function(module, exports, __webpack_require__) {
//
// "use strict";
//
//
// const ROWS = 18;
// const COLS = 27;
// const SIDE_LEN = '30px';
// const BTN_BK_COLOR = '#999';
// const BTN_BORDER_COLOR = '#fff';
// const BTN_HIDE_COLOR = '#eaeaea';
//
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
//
//
// /***/ })
// /******/ ]);

import brick from './src/js/brick.js';

brick();
