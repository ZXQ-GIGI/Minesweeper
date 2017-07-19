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
	for(var i = 0; i < 18; i++){
		bricks[i] = new Array(); 
		for(var j = 0; j < 27; j++){
			bricks[i][j] = new Brick();			
		}
	}
}

function ClickAction(obj){

	var id = obj.id;
	if(startMark){
		ClickFirst(id);
		DisplayNumber(Math.floor(id/27),id%27);		
		startMark = false;
	}
	else{
		if(!GameOver(Math.floor(id/27),id%27)){
			DisplayNumber(Math.floor(id/27),id%27);
			//document.write(mines);
		}
	}	
}

//first time to click and set all mines
function ClickFirst(id){
	var speicialBricks = NineId(id);	
	//document.write(speicialBricks);			
	//put mines randomly
	for(var i = 0; i < mineNum; i++){
		var randomMine = Math.floor(Math.random() * 27 * 18);
		if(mines.indexOf(randomMine)<0 && speicialBricks.indexOf(randomMine)<0){
			if(randomMine > 27 && randomMine < 458 && randomMine % 27 != 0 && randomMine % 27 != 26){
				mines[i] = randomMine;	
				//document.getElementById(randomMine).style.backgroundColor = "#f00";
			}else{
				i--;
			}		
		}else{
			i--;
		}
	}
	//document.writeln(mines);
	// mark mines
	for(var i=0;i<bricks.length;i++){
		for(var j=0;j<bricks[i].length;j++){
			if(mines.indexOf(i*27+j)>=0){
				bricks[i][j].isMine = true;
			}			
		}
	}
	//cont the number of mines around the current brick
	for(var i = 1; i<bricks.length-1;i++){
		for(var j=1; j<bricks[i].length-1;j++){
			if(bricks[i][j].isMine==false){
				for(var m=0;m<9;m++){
					var x = NineBricks(i,j)[m][0];
					var y = NineBricks(i,j)[m][1];
					if(m!=4 && bricks[x][y].isMine == true){
						bricks[i][j].totalNum+=1;
						bricks[i][j].leftNum+=1;
					}
				}
			}			
			//document.getElementById(i*27+j).innerHTML = bricks[i][j].totalNum;
		}
	}

}

function NineId(id){
	return [
			id-1-27,
			id-27, 
			id-27+1,
			id-1,
			id,
			id-(-1),
			id-1-(-27),
			id-(-27),
			id-(-27-1)
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

// class of single brick
function Brick(){

	this.isMine = false; 		//bool
	this.totalNum = 0; 	//total number of mines
	this.leftNum = 0; 	//the number of unknown mines
	this.isClicked = false;
	this.setMineState = function(state){
		this.isMine = state;
		return this.isMine;
	}
	this.setTotalNum = function(num){
		this.totalNum = num;
		this.leftNum = num;
	}
	this.setLeftNum =  function(){
		this.leftNum--;
	}
}

function DisplayNumber(i,j){

	if(bricks[i][j].totalNum != 0){
		document.getElementById(i*27+j).style.backgroundColor = "#eee";
		document.getElementById(i*27+j).style.color = NumberColor(bricks[i][j].totalNum);
		document.getElementById(i*27+j).innerHTML = bricks[i][j].totalNum;
		document.getElementById(i*27+j).disabled = true;
		bricks[i][j].isClicked = true;
	}
	else{
		for(var m = 0; m<9; m++){
			var x = NineBricks(i,j)[m][0];
			var y = NineBricks(i,j)[m][1]; 
			if(x>0&&x<17&&y>0&&y<26&&bricks[x][y].isClicked==false){
				if(bricks[x][y].totalNum == 0){
					document.getElementById(x*27+y).style.backgroundColor = "#eee";
					document.getElementById(x*27+y).disabled = true;
					bricks[x][y].isClicked = true;
					DisplayNumber(x,y);
				}
				else{
				    document.getElementById(x*27+y).style.backgroundColor = "#eee";
				    document.getElementById(x*27+y).style.color = NumberColor(bricks[x][y].totalNum);
					document.getElementById(x*27+y).innerHTML = bricks[x][y].totalNum;
					document.getElementById(x*27+y).disabled = true;
					bricks[x][y].isClicked = true;
				}
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





