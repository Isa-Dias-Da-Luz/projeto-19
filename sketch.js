var dinossauro
var dinoImagem
var dinoImagem2

var chao
var chaoImagem
var chaoInvisivel

var nuvem
var imagemNuvem
var grupoDasNuvens

var obstaculo1
var obstaculo2
var obstaculo3
var obstaculo4
var obstaculo5
var obstaculo6
var grupoObstaculos

var distancia = 0

var PLAY = 1
var END = 0
var estadoDeJogo = PLAY

var gameOver
var restart
var gameOverimg, restartimg
//----------------------------------------------------------------------
function preload(){
dinoImagem = loadAnimation("trex1.png", "trex3.png", "trex4.png");
chaoImagem = loadImage("ground2.png")
dinoImagem2 = loadImage("trex_collided.png")

imagemNuvem = loadImage("cloud.png")

obstaculo1 = loadImage("obstacle1.png")

obstaculo2 = loadImage("obstacle2.png")

obstaculo3 = loadImage("obstacle3.png")

obstaculo4 = loadImage("obstacle4.png")

obstaculo5 = loadImage("obstacle5.png")

obstaculo6 = loadImage("obstacle6.png")

gameOverimg = loadImage("gameOver.png")

restartimg = loadImage ("Botao.png")
}
//_____________________________________________________________________________//
function setup(){

createCanvas(800, 600)


dinossauro = createSprite(50, 365, 20,20)
dinossauro.scale = 0.7
dinossauro.addAnimation("dinossauroCorrendo", dinoImagem);
dinossauro.addAnimation("dinossauroMorto", dinoImagem2);

chaoInvisivel= createSprite(200, 390, 400, 10)
chaoInvisivel.visible = false



chao = createSprite(200, 380, 400, 20)

chao.addImage("chao", chaoImagem)


grupoObstaculos = new Group()
grupoDasNuvens = new Group()

dinossauro.setCollider("rectangle",0,0,40,60)
dinossauro.debug = false

gameOver = createSprite(400,100)
gameOver.addImage(gameOverimg)

restart = createSprite(400,140)
restart.addImage(restartimg)

gameOver.scale = 0.5
restart.scale = 0.5

gameOver.visible = false
restart.visible = false


}
//____________________________________________________________________________________________//
function draw(){

console.log (dinossauro.y)



 background("white");
 text("Pontuação: "+ distancia, 700,50);

drawSprites()
if(estadoDeJogo == PLAY){
    distancia = distancia + Math.round(getFrameRate()/60);
    dinossauro.changeAnimation("dinossauroCorrendo", dinoImagem);
if (keyDown("space")&& dinossauro.y >= 341){
dinossauro.velocityY = -16;

}

dinossauro.velocityY += 0.9;



chao.velocityX = -5;

if (chao.x < 0){

chao.x = chao.width/ 2;






}
criarNuvens()
criarObstaculos()
if (grupoObstaculos.isTouching(dinossauro)){
estadoDeJogo = END


}
}
if (estadoDeJogo == END){
chao.velocityX = 0
dinossauro.changeAnimation("dinossauroMorto", dinoImagem2)
dinossauro.velocityY = 0

grupoObstaculos.setVelocityXEach(0)
grupoDasNuvens.setVelocityXEach(0)

grupoObstaculos.setLifetimeEach(-1)
grupoDasNuvens.setLifetimeEach(-1)

gameOver.visible = true
restart.visible = true



if(mousePressedOver(restart)){
reiniciar()




}
}
dinossauro.collide(chaoInvisivel);
}
function criarNuvens(){
if(frameCount % 200 === 0){
    nuvem = createSprite(800, 200, 40, 10)
    nuvem.addImage("nuvem", imagemNuvem )
    nuvem.velocityX = -3
    nuvem.y = Math.round(random(100, 200))


nuvem.lifetime = 180

grupoDasNuvens.add(nuvem)
nuvem.depth = dinossauro.depth
dinossauro.depth = dinossauro.depth + 1
}
}

function criarObstaculos(){
if(frameCount % 200 === 0){
var obstaculo = createSprite(800, 355, 40, 10)
obstaculo.velocityX = - 4.5

var obstaculosAleatorios = Math.round(random(1, 6))
switch(obstaculosAleatorios){

case 1: obstaculo.addImage(obstaculo1);
break;

case 2: obstaculo.addImage(obstaculo2);
break;

case 3: obstaculo.addImage(obstaculo3);
break;

case 4: obstaculo.addImage(obstaculo4);
break;

case 5: obstaculo.addImage(obstaculo5);
break;

case 6: obstaculo.addImage(obstaculo6);
break;
default:break;





}
obstaculo.scale = 0.7
obstaculo.lifetime = 180
grupoObstaculos.add(obstaculo)
}
}



function reiniciar(){
estadoDeJogo = PLAY;
distancia = 0
gameOver.visible = false
restart.visible = false
grupoObstaculos.destroyEach()
grupoDasNuvens.destroyEach()



}