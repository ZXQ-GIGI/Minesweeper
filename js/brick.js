'use strict'

module.exports = Brick;

function Brick(brick,isMine,totalNum,leftNum){

	this.brick = brick; 		//2d
	this.isMine = isMine; 		//bool
	this.totalNum = totalNum; 	//total number of mines
	this.leftNum = leftNum; 	//the number of unknown mines
}