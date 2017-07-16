'use strict'

function Initial(){
	/*var mycanvas = document.getElementById("myCanvas");
	var bricks = new Array();
	var bricksContext = new Array();
	const width = 25;
	const height = 16;
	const mineNum = 99;

	//var mines =  RandomMines();
	for(var i = 0; i < width; i++){

		bricks[i] = new Array();
		bricksContext[i] = new Array();

		for(var j = 0; j < height; j++){
			bricksContext[i][j] = mycanvas.getContext("2d");
			bricksContext[i][j].fillStyle = "#0ea";
	    	bricksContext[i][j].fillRect(40 * i + 1,40 * j + 1,38,38);
			bricks[i][j] = new Brick(bricksContext[i][j],false,-1,-1); 	
		}
	}
	RandomMines(bricksContext);*/
	document.writeln("1");
}


// class of single brick
function Brick(brick,isMine,totalNum,leftNum){

	this.brick = brick; 		//2d
	this.isMine = isMine; 		//bool
	this.totalNum = totalNum; 	//total number of mines
	this.leftNum = leftNum; 	//the number of unknown mines
}

function RandomMines(bricksContext){
	var mines = new Array();
	for(var i = 0; i < mineNum; i++){
		var randomMine = Math.floor(Math.random() * width * height);
		if(mines.indexOf(randomMine)<0){
			mines[i] = randomMine;
			bricksContext[mines[i]%width][Math.floor(mines[i]/width)] = mycanvas.getContext("2d");
			bricksContext[mines[i]%width][Math.floor(mines[i]/width)].fillStyle = "#ea0";
			bricksContext[mines[i]%width][Math.floor(mines[i]/width)].fillRect(40 * i + 1,40 * j + 1,38,38);
		}	
		else{
			i--;
		}	
	} 
	//return mines;
}




