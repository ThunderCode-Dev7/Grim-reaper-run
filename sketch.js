var towerImg, tower;
var doorImg, door, doorsGroup;
var paneImg, pane, panesGroup;
var ghost, ghostImg;
var spookySound;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play";

function preload()
{
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  paneImg = loadImage("pane.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");

  doorsGroup = new Group();
  panesGroup = new Group();
}

function setup() 
{
  createCanvas(600, 600);

  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(300,300,50,50);
  ghost.addImage("ghost",ghostImg);
  ghost.scale = 0.5;
  ghost.debug = false;
  ghost.setCollider("rectangle",0,0,100,100);

  spookySound.loop();
}

function draw() 
{
  background("black");
  if (gameState === "play")
{
  if(tower.y > 400)
  {
      tower.y = 300;
  }

  if (keyDown("right"))
  {
    ghost.x = ghost.x +3;
  }
  if (keyDown("left"))
  {
    ghost.x = ghost.x - 3;
  }
  if (keyDown("up"))
  {
    ghost.velocityY = -5;
  }
  if (keyDown("down"))
  {
    ghost.velocityY = 5;
  }
  ghost.velocityY = ghost.velocityY + 0.1;
  spawnDoors();
  if (panesGroup.isTouching(ghost) || ghost.y > 600)
  {
    ghost.destroy();
    gameState = "end";
  }
  drawSprites();
}
  
  if (gameState === "end")
  {
    textSize (20);
    fill("White");
    text("GAME OVER",225,300);
    tower.velocityY = 0;
  }

  
}

function spawnDoors()
{
  if (frameCount % 240 == 0)
  {
    door = createSprite(200,-50);
    door.x = Math.round(random(120,400));
    door.addImage(doorImg);
    door.velocityY = 1;
    door.lifetime = 600;
    ghost.depth = door.depth;
    ghost.depth = ghost.depth + 1;
    doorsGroup.add (door);

    pane = createSprite(200,0);
    pane.addImage(paneImg);
    pane.x = door.x;
    pane.velocityY = 1;
    pane.lifetime = 600;
    ghost.depth = pane.depth;
    ghost.depth = ghost.depth + 1;
    panesGroup.add (pane);
  }
}