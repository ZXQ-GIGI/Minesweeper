'use strict'

var startMark = false;
const mineNum = 99;
const rows = 18;
const cols = 27;
var mines = new Array();
var bricks = new Array(); 
var playerBricks = new Array();
var clickmark = 0;

const RIGHT = 0;
const DOWN = 1;
const LEFT = 2;
const UP = 3;

function Brick(){

	this.isMine = false; 		//bool
	this.totalNum = 0; 			//total number of mines
	this.leftNum = 0; 			//the number of unknown mines
	this.isClicked = false;
}

function PlayerBrick(){
	this.isMine = false;
	this.isTempMine = false;
	this.isScan = false;
	//this.direction = -1;
}
function SetButtons(){

	startMark = true;
	var myTable = document.getElementById("tab");
	
	for(var i = 0; i < rows; i++){
		for(var j = 0; j < cols; j++){

			var id = i*cols + j;
			var str = "<button id=" + id + " onclick = 'ClickAction(this)'></button>";
			
			if(myTable.rows[i].cells[j].className != "brick virtual"){
				myTable.rows[i].cells[j].innerHTML = str;
				document.getElementById(id).style.width = "30px";
				document.getElementById(id).style.height = "30px";
				document.getElementById(id).style.backgroundColor = "#999";
			}
		}
	}
	//initialise bricks
	for(var i = 0; i < rows; i++){
		bricks[i] = new Array();
		playerBricks[i] = new Array(); 
		for(var j = 0; j < cols; j++){
			bricks[i][j] = new Brick();	
			playerBricks[i][j] = new PlayerBrick();
		}
	}
}

function ClickAction(obj){

	var id = obj.id;
	if(startMark){
		ClickFirst(id);
		DisplayNumber(Math.floor(id/cols), id%cols);
		PlayerSync();
		AutomaticSearching();	
		GetBoundary();	
		startMark = false;
	}
	else{
		if(!GameOver(Math.floor(id/cols), id%cols)){
			DisplayNumber(Math.floor(id/cols), id%cols);
			PlayerSync();
			AutomaticSearching();
			GetBoundary();
		}
	}
	clickmark++;	
}

//first time to click and set all mines
function ClickFirst(id){
	var speicialBricks = NineId(id);				
	//put mines randomly
	for(var i = 0; i < mineNum; i++){
		var randomMine = Math.floor(Math.random() * cols * rows);
		if(speicialBricks.indexOf(randomMine)<0 && mines.indexOf(randomMine)<0){
			if(randomMine > cols && randomMine < ((rows-1)*cols-1) 
				&& randomMine%cols!=0 && (randomMine%cols!=(cols-1))){
				mines[i] = randomMine;	
				//document.getElementById(randomMine).style.backgroundColor = "#f00";
			}else{
				i--;
			}		
		}else{
			i--;
		}
	}
	// mark mines
	for(var i = 0; i < bricks.length; i++){
		for(var j = 0; j < bricks[i].length; j++){
			if(mines.indexOf(i*cols+j) >= 0){
				bricks[i][j].isMine = true;
			}			
		}
	}
	//cont the number of mines around the current brick
	for(var i = 1; i < bricks.length - 1; i++){
		for(var j = 1; j < bricks[i].length - 1; j++){
			if(bricks[i][j].isMine == false){
				for(var m = 0; m < 9; m++){
					var x = NineBricks(i,j)[m][0];
					var y = NineBricks(i,j)[m][1];
					if(m != 4 && bricks[x][y].isMine){
						bricks[i][j].totalNum += 1;
						bricks[i][j].leftNum += 1;
					}
				}
			}			
		}
	}

}

function DisplayNumber(i,j){

	if(i>0 && i<rows-1 && j>0 && j<cols-1 && !bricks[i][j].isClicked){

		document.getElementById(i*cols+j).style.backgroundColor = "#eee";
		document.getElementById(i*cols+j).disabled = true;
		bricks[i][j].isClicked = true;

		if(bricks[i][j].totalNum != 0){
			document.getElementById(i*cols+j).style.color = NumberColor(bricks[i][j].totalNum);
			document.getElementById(i*cols+j).innerHTML = bricks[i][j].totalNum;
		}
		else{
			for(var m = 0; m < 9; m++){
				var x = NineBricks(i,j)[m][0];
				var y = NineBricks(i,j)[m][1]; 	
				DisplayNumber(x,y);			
			}	
		}
	}
}

function GameOver(i,j){
	if(bricks[i][j].isMine){
		for(var m=0;m<mines.length;m++){
			document.getElementById(mines[m]).style.backgroundColor = "#f00";
		}
		return true;
	}
	return false;
}

//get all clicked information after each click 
function PlayerSync(){
	for(var i = 0; i < rows; i++){
		for(var j = 0; j < cols; j++){
			if(bricks[i][j].isClicked){
				playerBricks[i][j].isClicked = true;			
			}
		}
	}
}

function AutomaticSearching(){
	//Mine searching
	for(var i = 1; i < playerBricks.length - 1; i++){
		for(var j = 1; j < playerBricks[i].length - 1; j++){
			if(bricks[i][j].isClicked && bricks[i][j].totalNum > 0){

				var leftArray = UnclickedNumberOfBrick(i,j);
				var leftNumber = LeftNumberOfMines(i,j);

				if(leftArray.length == leftNumber){
					for(var m = 0; m < leftArray.length; m++){
						var x = leftArray[m][0];
						var y = leftArray[m][1];
						playerBricks[x][y].isMine = true;
						bricks[i][j].leftNum--;	
						document.getElementById(x*cols+y).style.backgroundColor = "#0de";
					}
				}
			}
		}
	}
	//number searching
	for(var i = 1; i < playerBricks.length - 1; i++){
		for(var j = 1; j < playerBricks[i].length - 1; j++){
			if(bricks[i][j].isClicked && bricks[i][j].totalNum > 0){
				if(LeftNumberOfMines(i,j) == 0){
					var leftArray = UnclickedNumberOfBrick(i,j);
					for(var m = 0; m < leftArray.length; m++){
						var x = leftArray[m][0];
						var y = leftArray[m][1];		
						if(x>0 && x<17 && y>0 && y<26 && !playerBricks[x][y].isMine){
							document.getElementById(x*cols+y).style.backgroundColor = "#f0f";
						}
						
					}
				}
			}
		}
	}
}

function GetBoundary(){
	var scanPonit = new Array();
	var nextPoint = new Array();
	for(var i = 1; i < playerBricks.length - 1; i++){
		for(var j = 1; j < playerBricks[i].length - 1; j++){
			if(playerBricks[i][j].isClicked || playerBricks[i][j].isMine){
				scanPonit.push([i,j,RIGHT]);
				nextPoint = DirectionSearching(i,j,RIGHT);
				document.getElementById(i*cols+j).style.backgroundColor =  "#0f0";
				break;
			}
		}
		if(scanPonit.length == 1){
			break;
		}
	}

	while(nextPoint[0]!=scanPonit[0][0] || nextPoint[1]!=scanPonit[0][1]){
		scanPonit.push(nextPoint);
		var x = nextPoint[0];
		var y = nextPoint[1];
		var dir = nextPoint[2];
		nextPoint = DirectionSearching(x,y,dir);
		document.getElementById(x*cols+y).style.backgroundColor =  "#0f0";
	}
}

function DirectionSearching(i,j,pre_direction){
	var startDirection = (pre_direction + 3) % 4;
	var brick = new Array();	
	for(var s = startDirection; s < startDirection + 4; s++){
		var next_direction = NextDirection(i,j,s%4);
		var x = next_direction[0];
		var y = next_direction[1];
		if(playerBricks[x][y].isClicked || playerBricks[x][y].isMine){
			brick = next_direction;
			break;
		}
	}
	return brick;
}

function NextDirection(i,j,direction){
	var nextDirection = [i,j,direction];
	switch(direction){
		case 0: nextDirection = [i,j+1,0]; break;
		case 1: nextDirection = [i+1,j,1]; break;
		case 2: nextDirection = [i,j-1,2]; break;
		case 3: nextDirection = [i-1,j,3]; break;
	}
	return nextDirection;
}

//the number of mines that have been found
function MineNumberOfBrick(i,j){
	var num = 0;
	for(var m = 0; m < 9; m++){
		if(m != 4){
			var x = NineBricks(i,j)[m][0];
			var y = NineBricks(i,j)[m][1]; 
			if(playerBricks[x][y].isMine){
				num++;
			}
		}	
	}
	return num;
}

//the left number of mines that haven't been found
function LeftNumberOfMines(i,j){
	return bricks[i][j].totalNum - MineNumberOfBrick(i,j);
}

//the number of bricks that haven't been clicked
function UnclickedNumberOfBrick(i,j){
	var array = new Array();
	for(var m = 0; m < 9; m++){
		if(m != 4){
			var x = NineBricks(i,j)[m][0];
			var y = NineBricks(i,j)[m][1]; 
			if(!bricks[x][y].isClicked && !playerBricks[x][y].isMine){
				if(x>0&&x<17&&y>0&&y<26){
					array.push([x,y]);
				}		
			}
		}	
	}
	return array;
}


function NineId(id){
	return [
			id-1-cols,
			id-cols, 
			id-cols+1,
			id-1,
			id-0,
			id-(-1),
			id-1-(-cols),
			id-(-cols),
			id-(-cols-1)
		];
}

function NineBricks(i,j){
	return [
		[i-1,j-1],
		[i-1,j],
		[i-1,j+1],
		[i,j-1],
		[i,j],
		[i,j+1],
		[i+1,j-1],
		[i+1,j],
		[i+1,j+1]
	];
}
function NumberColor(num){
	var cr = "#000";
	switch(num){
		case 1:cr = "#235";break;
		case 2:cr = "#413";break;
		case 3:cr = "#630";break;
		case 4:cr = "#274";break;
		case 5:cr = "#234";break;
		case 6:cr = "#494";break;
		case 7:cr = "#77e";break;
		case 8:cr = "#115";break;
	}
	return cr;
}





