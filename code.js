/**
 * Lab Goal: This lab was designed to teach you
 * how to find collisions with many objects
 * 
 * Lab Description: Detect Collision
 */

// Initialize variables

var bg1 ={x:0,y:0,w:320,h:450,s:0.5,id:"bg1"};    //image objects
var bg2 ={x:-320,y:0,w:320,h:450,s:0.5,id:"bg2"}; 
var rocket = {x:0, y:0, w:50, h:70, s:15, id:"rocket"};
var asteroid1 = {x:0, y:0, w:50, h:50, s:1, id:"meteor", img:"assets/meteor.png"};
var asteroid2 = {x:0, y:0, w:50, h:50, s:1, id:"meteor2", img:"assets/meteor2.png"};
var asteroid3 = {x:0, y:0, w:50, h:50, s:1, id:"rock", img:"assets/rock.png"};
var asteroids = [asteroid1, asteroid2, asteroid3];

var score = 0;      //score and maxScore
var maxScore = 40;

var ms = [0];         //time variables
var s = [0];
var m = [0];
var timeDisplay = "";
var timeList = "";

var gameIsRunning = false;  //game state variables
var hasWon = false;

setScreen("startScreen");                       //start screen code
onEvent("playButton","click", startGame);       //when button is clicked, start a new game
onEvent("playAgainButton","click", startGame);

timedLoop(10, function() { //main loop
  if (gameIsRunning && !hasWon) {//game is running
    scrollBackground();
    for (var i = 0; i < asteroids.length; i++) {
      moveAsteroid(asteroids[i]);
    }
    moveRocket();
    setText("score", "Score: " + score);
    updateTime();
    if (score >= maxScore) {//game is won
      endGame();
    }
  }
});

function startGame() {      //set up game screen
  gameIsRunning = true;
  hasWon = false;
  score = 0;
  ms = [0];
  s = [0];
  m = [0];
  timeDisplay = "";
  setScreen("gameScreen");
  drawBackround();
  drawRocket();
  for (var i = 0; i < asteroids.length; i++) {
    drawAsteroid(asteroids[i]);
  }
  drawMenu();
}

function endGame() {          //delete elements from game screen and update list of times
  hasWon = true;
  gameIsRunning = false;
  setScreen("gameOver");
  deleteElement(rocket.id);
  for (var i = 0; i < asteroids.length; i++) {
    deleteElement(asteroids[i].id);
  }
  deleteElement(bg1.id);
  deleteElement(bg2.id);
  deleteElement("score");
  deleteElement("timeDisplay");
  timeList += timeDisplay + "\n";
  setText("resultsText", "Times: " + "\n" + timeList);
}

onEvent("gameScreen", "keydown", function(event) {  //rocket key event handler
  if (event.key === "Left") {
    rocket.x -= rocket.s;
  }
  if (event.key === "Right") {
    rocket.x += rocket.s;
  }
  if (event.key === "Up") {
    rocket.y -= rocket.s;
  }
  if (event.key === "Down") {
    rocket.y += rocket.s;
  }
  if (event.key === "=") {
    for (var i = 0; i < asteroids.length; i++) {
      asteroids[i].s += 0.1;
    }
  }
  if (event.key === "-") {
    for (var j = 0; j < asteroids.length; j++) {
      asteroids[j].s -= 0.1;
    }
  }
});

function drawRocket() {                 //create rocket sprite
  image(rocket.id, "assets/rocket.gif");
  setProperty(rocket.id, "fit","fill");
  rocket.x = randomNumber(40,240);
  rocket.y = randomNumber(230,400);
  setPosition(rocket.id, rocket.x, rocket.y, rocket.w, rocket.h);
}

function moveRocket() {             //continuosly update rocket sprite
  if (rocket.y + rocket.h > 450) {
    rocket.y = 450 - rocket.h;
  }
  if (rocket.y < 0) {
    rocket.y = 0;
  }
  if (rocket.x > 320) {
    rocket.x = 0;
  }
  if (rocket.x + rocket.w < 0) {
    rocket.x = 320;
  }
  setPosition(rocket.id, rocket.x, rocket.y, rocket.w, rocket.h);
}

function drawAsteroid(obj1) {   //create asteroid sprites
  image(obj1.id, obj1.img);
  setProperty(obj1.id, "fit","fill");
  obj1.x = randomNumber(40,240);
  obj1.y = randomNumber(-20,0);
  setPosition(obj1.id, obj1.x, obj1.y, obj1.w, obj1.h);
}

function moveAsteroid(obj1) {   //update asteroid sprites
  obj1.y += obj1.s;
  if (checkCollision(rocket, obj1)) {
    obj1.y = 0;
    obj1.x = randomNumber(0, 320 - obj1.w);
    score += 2;   //add 2 to score when rocket hits asteroid
  }
  if (obj1.y > 450 - obj1.h) {
    obj1.y = 0;
    obj1.x = randomNumber(0, 320 - obj1.w);
    score -= 1;   //subtract 1 from score when asteroid reaches bottom of screen
  }
  setPosition(obj1.id, obj1.x, obj1.y, obj1.w, obj1.h);
}

function drawBackround(){     //draw background images
  image(bg1.id, "assets/6062b.png");
  image(bg2.id, "assets/6062a.png");
  setProperty(bg1.id, "fit", "cover");
  setProperty(bg2.id, "fit", "cover");
  setPosition(bg1.id, bg1.x,bg1.y,bg1.w,bg1.h);
  setPosition(bg2.id, bg2.x,bg2.y,bg2.w,bg2.h);
}

function scrollBackground(){  //scroll background images
  bg1.x += bg1.s;
  bg2.x += bg2.s;
  setPosition(bg1.id, bg1.x,bg1.y,bg1.w,bg1.h);
  setPosition(bg2.id, bg2.x,bg2.y,bg2.w,bg2.h);
  if (bg1.x >= 320) {
    bg1.x = -320;
  }
  if (bg2.x >= 320) {
    bg2.x = -320;
  }
}

function drawMenu() {       //draw score and time
  textLabel("score", "Score: 0");
  setProperty("score", "text-color", "white");
  setPosition("score", 5, 10);
  textLabel("timeDisplay", "00:00:00");
  setProperty("timeDisplay", "text-color", "white");
  setPosition('timeDisplay', 230, 10);
}

function updateTime() {     //update score and time
  ms += 10;
  s = Math.floor(ms/1000);
  m = Math.floor(s/60);
  var msDisplay = ("00" + ms%1000).slice(-3,-1);
  var sDisplay = ("00" + s%60).slice(-2);
  var mDisplay = ("00" + m%60).slice(-2);
  timeDisplay = mDisplay + ":" + sDisplay + ":" + msDisplay;
  setText("timeDisplay", "Time: " + timeDisplay);
}

function checkCollision(obj1, obj2) {     //check for collisions
  var xOverlap=Math.max(0, Math.min(obj1.x+50,obj2.x+50)-Math.max(obj1.x,obj2.x)+1)>0 ;
  var yOverlap= Math.max(0, Math.min(obj1.y+100,obj2.y+50)-Math.max(obj1.y,obj2.y)+1)>0;
  if (xOverlap && yOverlap) {
    //collision
    return true;
  } else {
    //no collision
    return false;
  }
}
