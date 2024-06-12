/**
 * Lab Goal: This lab was designed to teach you
 * how to find collisions with many objects
 * 
 * Lab Description: Detect Collision
 */

// Initialize variables
var bg1 ={x:0, y: 0, w:323, h:450, s:2, img:"bg1"};
var bg2 ={x:320, y: 0, w:323, h:450, s:2, img:"bg2"};
var asteroid1 ={x:100, y:-20, w:50, h:50, s:2, img:"asteroid1"};
var asteroid2 ={x:200, y:-20, w:50, h:50, s:2, img:"asteroid2"};
var asteroid3 ={x:300, y:-10, w:50, h:50, s:2, img:"asteroid3"};
var asteroids = [asteroid1, asteroid2];
var enemies = [asteroid3];
var rocket ={x:150, y:230, w:50, h:100,s:7, img:"rocket"};
var score = 0;
// Functions to set up game
function scrollBg(){
  bg1.x+=bg1.s;
  bg2.x+=bg2.s;
  setPosition(bg1.img, bg1.x, bg1.y, bg1.w, bg1.h);
  setPosition(bg2.img, bg2.x, bg2.y, bg2.w, bg2.h);
  // find the wrap around the screen
   if (bg1.x>320){
    bg1.x=-319;
  }
  if (bg2.x>320){
  bg2.x=-319;
  }
}

function setPosition(el, x, y, w, h){
	var element= document.getElementById(el);
         element.style.position = 'absolute';
					element.style.left = x + 'px';
					element.style.top = y + 'px';
					element.style.width = w + 'px';
					element.style.height =h + 'px';

}
setInterval(function() {
scrollBg();
}, 100);

//makeAsteroid();
//makeRocket();
//drawScore();


// onEvent("screen1", "keydown", function (event) {
//   if (event.key=="Left"){
//     rocket.x -= rocket.s; // Move the rocket left
//   }
//   if (event.key=="Right"){
//     rocket.x +=rocket.s; // Move the rocket right
//   }
//   if (event.key=="Up"){
//     rocket.y -= rocket.s; // Move the rocket up
//   }
//   if (event.key==="Down"){
//     rocket.y += rocket.s; // Move the rocket down
//   }

// setPosition(rocket.img,rocket.x,rocket.y,rocket.w,rocket.h);
// });


// timedLoop(50, function (){
//   scrollBg();
//   moveAsteroid(asteroid1);
//   moveAsteroid(asteroid2);
//   moveAsteroid(asteroid3);
//   handleCollision(rocket, asteroids, false);
//     handleCollision(rocket, enemies, true);
//   checkOverlap(asteroid1);
//   checkOverlap(asteroid2);
//   checkOverlap(asteroid3);
// });
// function handleCollision(item, objects, attack){
//   var points=2
//   if(attack==true ){
//     points=-3;
    
//   }
//   for (var i = 0; i<objects.length; i++){
//     if (checkCollision(item,objects[i])){
//        objects[i].y = -90;
//   objects[i].x = randomNumber(15,290);
//   objects[i].s = randomNumber(3,6);
//   setPosition(objects[i].img, objects[i].x, objects[i].y);
//   score=score+=points;
//   setText("score", "Score: "+score);
//   if (score>= 20){
//     stopTimedLoop();
//   }
    
    
//   }
//   }
  
// }

// function drawScore (){
//   textLabel ("score", "Score: ");
//   setPosition ("score", 190, 25, 105, 25);
//   setProperty("score", "text-color", "blue");
//   setProperty("score", "border-color","blue");
//   setProperty("score", "border-width", 3);
//   setProperty("score", "border-radius", 3);
// }


// function makeAsteroid(){
//     image(asteroid1.img, "meteor.png");
//     setProperty(asteroid1.img, "fit", "fill");
//     setPosition(asteroid1.img, asteroid1.x, asteroid1.y, asteroid1.w, asteroid1.h);
//     // draw asteroid2
//     image(asteroid2.img, "meteor2.png");
//     setProperty(asteroid2.img, "fit", "fill");
//     setPosition(asteroid2.img, asteroid2.x, asteroid2.y, asteroid2.w, asteroid2.h);
//     //draw asteroid3
//     image(asteroid3.img, "rock.png");
//     setProperty(asteroid1.img, "fit", "fill");
//     setPosition(asteroid3.img, asteroid3.x, asteroid3.y, asteroid3.w, asteroid3.h);
    
// }
// function moveAsteroid (asteroid){
//   asteroid.y += asteroid.s;
//   setPosition(asteroid.img,asteroid.x,asteroid.y);
// }

// function makeRocket (){
//     image(rocket.img, "rocket.gif");
//     setPosition(rocket.img, rocket.x, rocket.y, rocket.w, rocket.h);
// }

// function checkCollision (obj1, obj2){
// // console.log (typeof(obj1)!=typeof(obj2));
// var xOv= Math.max(0,Math.min(obj1.x+obj1.w, obj2.x+obj2.w)-Math.max(obj1.x,obj2.x)+1);
// var yOv= Math.max(0,Math.min(obj1.y+obj1.h, obj2.y+obj2.h)-Math.max(obj1.y,obj1.y)+1);
// return xOv>0 && yOv>0 ;
 

// }
// function checkOverlap (asteroid) {
//   if (asteroid.y >= 450) {
//     asteroid.y = -100;
//     asteroid.x = randomNumber(20,300);
//     asteroid.s = randomNumber(4,6);
//     setPosition(asteroid.img, asteroid.x, asteroid.y);
//     score=score-=1;
//    setText("score", "Score: "+score)
    
//   }
// }
