'use strict'

var startMark = false;
const mineNum = 99;
const rows = 18;
const cols = 27;
var mines = new Array();
var bricks = new Array(); 
var playerBricks = new Array();

function Brick(){

	this.isMine = false; 		//bool
	this.totalNum = 0; 			//total number of mines
	this.leftNum = 0; 			//the number of unknown mines
	this.isClicked = false;
}

function PlayerBrick(){
	this.isMine = false;
	this.totalNum = 0; 	
	this.leftNum = 0;
	this.isClicked = false;
	this.isTempMine = false;
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
		startMark = false;
	}
	else{
		if(!GameOver(Math.floor(id/cols), id%cols)){
			DisplayNumber(Math.floor(id/cols), id%cols);
			PlayerSync();
			AutomaticSearching()
		}
	}	
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
			if(mines.indexOf(i*cols+j)>=0){
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
					if(m != 4 && bricks[x][y].isMine == true){
						bricks[i][j].totalNum += 1;
						bricks[i][j].leftNum += 1;
					}
				}
			}			
		}
	}

}


function DisplayNumber(i,j){

	if(i>0 && i<rows-1 && j>0 && j<cols-1 && bricks[i][j].isClicked==false){

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
				playerBricks[i][j].totalNum = bricks[i][j].totalNum;			
			}
		}
	}
}

function AutomaticSearching(){
	//Mine searching
	for(var i = 0; i < playerBricks.length; i++){
		for(var j = 0; j < playerBricks[i].length; j++){
			if(playerBricks[i][j].isClicked){
				var leftArray = UnclickedNumberOfBrick(i,j);
				if(leftArray.length == LeftNumberOfMines(i,j)){
					for(var m = 0; m < leftArray.length; m++){
						playerBricks[leftArray[m][0]][leftArray[m][1]].isMine = true;
						playerBricks[i][j].leftNum--;
					}
				}
			}
		}
	}
	//number searching
	for(var i = 0; i < playerBricks.length; i++){
		for(var j = 0; j < playerBricks[i].length; j++){
			if(playerBricks[i][j].isClicked){
				if(playerBricks[i][j].leftNum == 0){
					var leftArray = UnclickedNumberOfBrick(i,j);
					for(var m = 0; m < leftArray.length; m++){
						var x = leftArray[m][0];
						var y = leftArray[m][1];
						document.getElementById(x+cols+y).style.backgroundColor = "#f0f";
					}
				}
			}
		}
	}
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
	return playerBricks[i][j].totalNum - MineNumberOfBrick(i,j);
}

//the number of bricks that haven't been clicked
function UnclickedNumberOfBrick(i,j){
	//var num = 0;
	var array = new Array
	for(var m = 0; m < 9; m++){
		if(m != 4){
			var x = NineBricks(i,j)[m][0];
			var y = NineBricks(i,j)[m][1]; 
			if(playerBricks[x][y].isClicked == false && playerBricks[i][j].isMine == false){
				array.push([x,y]);
				//num++;
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





