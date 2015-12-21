var sprite1;

var sprite2;

var head;

function setup(){
    createCanvas(800,800);


    sprite1 = createSprite(50,50,100,100);
    sprite1.velocity.x = random(1,2);
    sprite1.velocity.y = random(0,2);


    sprite2 = createSprite(50,250,100,100);
    sprite2.setSpeed(1.5,2);


    head = createSprite(400,400, 50, 50);

}

function draw(){


     background(255);
    drawSprites();

    head.position.x = 400;

    head.position.y = 400;


    head.displace(sprite1);
//    sprite3.displace(sprite1);
//    sprite1.collide(sprite2);
}

//function snakeMovement(){
//    for (var i = 0; i < 100; i++){




function keyTyped() {
    if(key === 'w'){
        head.velocity.y = -100;
    }
    else {head.velocity.y = 0;
    }
}
