'use strict'

var startMark = false;
const mineNum = 99;
var mines = new Array();
var bricks = new Array();
//
function SetButtons(){

	startMark = true;
	var myTable = document.getElementById("tab");
	var rows = 0, cols = 0;
	for(var i = 0; rows = myTable.rows.length, i < rows; i++){
		for(var j = 0; cols = myTable.rows[i].cells.length, j < cols; j++){

			var id = i*cols +j;
			var str = "<button id=" + id + " onclick = 'ClickAction(this)'>1</button>";
			
			if(myTable.rows[i].cells[j].className != "brick virtual"){
				myTable.rows[i].cells[j].innerHTML = str;
				document.getElementById(id).style.width = "30px";
				document.getElementById(id).style.height = "30px";
			}
		}
	}
	for(var i=0; i<cols;i++){
		bricks[i] = new Array(); 
		for(var j=0;j<rows;j++){
			bricks[i][j] = new Brick();
			document.write(bricks[i][j].isMine);
		}
	}
	
}

function ClickAction(obj){
	//document.write(obj.id);
	var id = obj.id;
	
	if(startMark){
		ClickFirst(id);
		startMark = false;
	}
	else{
		document.write(mines);
	}
}

//first time to click and set all mines
function ClickFirst(id){

	var speicialBricks = NineBricks(id);	
					
	//put mines randomly
	for(var i = 0; i < mineNum; i++){
		var randomMine = Math.floor(Math.random() * 27 * 18);
		if(mines.indexOf(randomMine)<0 && speicialBricks.indexOf(randomMine)<0){
			if(randomMine > 27 && randomMine < 458 && randomMine % 27 != 0 && randomMine % 27 != 26){
				mines[i] = randomMine;	
				document.getElementById(randomMine).style.backgroundColor = "#f00";
			}else{
				i--;
			}		
		}else{
			i--;
		}
	}
	for(var i=0; i< mines.length; i++){
		var x = Math.floor(mines[i]/27);
		var y = mines[i]%27;
		bricks[x][y].SetMineState(true);
	}	
}

function NineBricks(id){
	return [id-1-27,id-27, id-27+1,id-1,id,id-(-1),id-1-(-27),id-(-27),id-(-27-1)];
}

// class of single brick
function Brick(){

	this.isMine = false; 		//bool
	this.totalNum = -1; 	//total number of mines
	this.leftNum = -1; 	//the number of unknown mines
	this.SetMineState = function(state){
		this.isMine = state;
	}
}
/*
Brick.prototype.SetMineState = function(state) {
	this.isMine = state;
};*/




