
var snakeX, snakeY;
var pellets;
var snakeSize = 20;
var snakeBody = [];
var pelletX, pelletY;
var posX, posY;
var stepSize = 5;
var chime;

function preload(){
    chime = loadSound('assets/nom.wav');
}

function setup() {

    soundFormats('wav');


    var height = 500;
	var width = 500;

	createCanvas(height, width);
	background(0);

    startGame();
}



function draw() {
     reDraw();
     pelletDrop();

//     snakeHead();
     movement();
    getPellet();

}






function getPellet(){

    //When pellet is picked up

	if(collisionWithPellet()){

		addOne();
        addOne();
        addOne();
        addOne();
        addOne();
		pelletX = newPellet();
	 	pelletY = newPellet();
        chime.play();

	}


}






function collisionWithPellet(){


	var currDirection = snakeBody[0];
	var xDiff, yDiff;

	if (currDirection == 0 && deltaY() <= snakeSize){
		//left so the pellet needs to be <posX
		xDiff = posX - pelletX;
		if (xDiff <= snakeSize && xDiff > 0){
			return true;
		}
	}
	else if (currDirection == 1 && deltaY() <= snakeSize){
		//right so the pellet needs to be >posX
		xDiff = pelletX - posX;
		if (xDiff <= snakeSize && xDiff > 0){
			return true;
		}
	}
	else if (currDirection == 2 && deltaX() <= snakeSize){
		//up so the pellet needs to be <posY
		yDiff = pelletY - posY;
		if (yDiff <= snakeSize && yDiff > 0){
			return true;
		}
	}
	else if (currDirection == 3 && deltaX() <= snakeSize){
		//down so the pellet needs to be >posY
		yDiff = posY - pelletY;
		if (yDiff <= snakeSize && yDiff > 0){
			return true;
		}
	}

	return false;
}





function deltaY(){
	//just so the number is always positive
	if (posY > pelletY){
		return posY - pelletY;
	}

	return pelletY - posY;
}

function deltaX(){
	//just so the number is always positive
	if (posX > pelletX){
		return posX - pelletX;
	}

	return pelletX - posX;
}






function addOne(){

    snakeBody.push(snakeBody);

}




function snakeHead() {


     fill(0,255,0);
    rect(snakeX,snakeY,snakeSize,snakeSize);


}




function reDraw(){
    // redraw background
	background(0);
}




function pelletDrop(){
	//random white pellet

	fill(255, 255, 255);
	rect(pelletX, pelletY, snakeSize, snakeSize);
}




function startGame(){



	snakeX = newPellet();
	snakeY = newPellet();

	posX = snakeX;
	posY = snakeY;



	background(0);

	fill(0, 255, 0);

	rect(snakeX, snakeY, snakeSize, snakeSize);

	direction = -1;

	pelletX = newPellet();
	pelletY = newPellet();
}

function keyPressed() {
	/*
	bindings are
	left = 0
	right = 1
	up = 2
	down = 3
	*/

  if (keyCode === LEFT_ARROW) {
    direction = 0;
  } else if (keyCode === RIGHT_ARROW) {
    direction = 1;
  }
  else if (keyCode === UP_ARROW) {
    direction = 2;
  } else if (keyCode === DOWN_ARROW) {
    direction = 3;
  }
  return false;
}



function movement(){
	//new game loop
	updateArray();

		if (snakeBody[0] == 0 && posX > 0){
		  	//move left, Xvar - stepSize
		  	posX -= stepSize;

		}
		else if (snakeBody[0] == 1 && posX < width-10){
		  	//move right, Xvar + stepSize
		  	posX += stepSize;
		}
		else if (snakeBody[0] == 2 && posY > 0){
		  	//move up, Yvar - stepSize
		  	posY -= stepSize;
		}
		else if (snakeBody[0] == 3 && posY < height-10){
		  	//move down, Yvar + stepSize
		  	posY += stepSize;
		}
		else{
		  	//pause the game since it's over, the snake would go outside of the border
		 	if (snakeBody[0] >= 0){
	  		   endGame = true;
		  		stopGame(endGame);
		  		return;
			}
		}

		fill(0, 255, 0);

		rect(posX, posY, snakeSize, snakeSize);

		var currX = posX;
		var currY = posY;

	if (snakeBody.length > 0){
		for (var x = 1; x < snakeBody.length; x++){
			//loop through the rest of the snake and print the correct layout
			if (snakeBody[x] == 0 && currX > 0){
			  	//move left, Xvar - stepSize
			  	currX += stepSize;

			}
			else if (snakeBody[x] == 1 && currX < width-10){
			  	//move right, Xvar + stepSize
			  	currX -= stepSize;
			}
			else if (snakeBody[x] == 2 && currY > 0){
			  	//move up, Yvar - stepSize
			  	currY += stepSize;
			}
			else if (snakeBody[x] == 3 && currY < height-10){
			  	//move down, Yvar + stepSize
			  	currY -= stepSize;
			}

			if (snakeBody.length == 10){
				var test = "";
			}
			fill(0, 255, 0);

		    rect(currX, currY, snakeSize, snakeSize);

		}
	}
}

function updateArray(){
	//this should change the posX and posY
	if(snakeBody.length > 1){
		for(var x = snakeBody.length - 1; x > 0; x--){
			if (snakeBody.length > 15){

			}
				snakeBody[x] = snakeBody[x - 1]
		}
	}
	snakeBody[0] = direction;
}




function newPellet(){
	var number = int(random(10, width-20));

	if (number % 10 >= 5){
		number += 10 - number % 10;
	}
	else{
		number -= number % 10;
	}

	return number;
}
