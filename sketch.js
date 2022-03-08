const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var rope;
var fruit;
var fruit_con;
var bgImg , food , rabbit ;
var bunny , blink , eat , sad;


function preload(){
  bgImg = loadImage("background.png");
  food = loadImage("melon.png");
  rabbit = loadImage("Rabbit-01.png");
  blink = loadAnimation("blink_1.png" , "blink_2.png" ,"blink_3.png" );
  eat = loadAnimation("eat_0.png " ,"eat_1.png " , "eat_2.png " , "eat_3.png " , "eat_4.png " );
  sad = loadAnimation( "sad_1.png" , "sad_2.png" , "sad_3.png");

  blink.playing = true ;
  
  eat.playing = true ;
  eat.looping = false ;

  sad.playing = true ;
  sad.looping = false ;
}

function setup() 
{
  createCanvas(500,700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;

  button = createImg("cut_button.png")
  button.position(220,30);
  button.size(50,50);
  button.mouseClicked(drop);

  ground = new Ground(200,680,600,20);
  rope = new Rope(6 , {x:245 , y:30});

  blink.frameDelay = 20;
  eat.frameDelay = 20;
  sad.frameDelay = 20;

  bunny = createSprite(150,620,100,100);
  bunny.addImage(rabbit);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking', blink);
  bunny.addAnimation('eating', eat);
  bunny.addAnimation('crying', sad);
  bunny.changeAnimation('blinking')

  var fruit_options = {
    density : 0.001
  }
  fruit = Bodies.circle(300 , 300 , 20 , fruit_options);
  Matter.Composite.add(rope.body,fruit);
  fruit_con = new Link(rope,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  imageMode(CENTER);
}

function draw() 
{
  background(51);
  image(bgImg,width/2,height/2,500,700);
  ground.show();
  rope.show();

  if(fruit != null){
    image(food , fruit.position.x , fruit.position.y , 70 , 70);
  }

  Engine.update(engine);
  
  if(collide(fruit,bunny) === true){
    bunny.changeAnimation('eating');
  }

  if(collide(fruit,ground.body) === true){
    bunny.changeAnimation('crying');
  }
 
   drawSprites();
}

function drop(){
  rope.break();
  fruit_con.detach();
  fruit_con = null;
}

function collide(body,sprite) { 
  if(body!=null) {
     var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
      if(d<=80) { 
        World.remove(engine.world,fruit);
       fruit = null;
       return true;
       } 
      else{
       return false;
       } 
   } 
 }

