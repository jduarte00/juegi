//set game score
let score1 = 0;
let score2 = 0;
let vidas1 = 3;
let vidas2 = 3;
let frames = 0;
let seconds = 0;
let Intervalo;
//set canvas
let canvas = document.getElementById('my-canvas');
let ctx = canvas.getContext('2d');
canvas.width = '800';
canvas.height ='600';

//imagenes monito
let image1 = new Image();
image1.src = "img/orc0.png";
let image2 = new Image();
image2.src = "img/orc1.png";
let image3 = new Image();
image3.src = 'img/orcp2.png';
let image4 = new Image();
image4.src = 'img/orcp22.png';
//set sound effect
let groan = new Audio();
groan.src = 'img/groan.mp3';
let oof = new Audio();
oof.src = 'img/roblox.mp3';


//set images
let images = {
    bg: 'img/topwall.png'
}

// 
let playerBullets1 = [];
let playerBullets2 = [];
let enemies = [];


// set the board(i.e. background)
class Board{
    constructor(){
        this.x = 0;
        this.y = 0;
        this.width = canvas.width;
        this.height = canvas.height;
        this.image = document.createElement('img');
        this.image.src = images.bg;
        this.image.height = 500;
        this.music = new Audio();
        this.music.src = "img/song.mp3"
        this.image.onload = function(){
            this.draw();
        }
        this.frames = 0;
        this.image.onload = () => {
            this.draw()
        }
    }

    draw(){
        //draw the background
        /* this.x -= .5;
        if (this.x < - this.width) return this.x = 0; */
        ctx.clearRect(0,0, this.width, this.height);
        ctx.drawImage(this.image, this.x, this.y);
        /* ctx.drawImage(this.image, this.width + this.x, this.y); */
        // display the number of points or fps
        ctx.font = "15px UnifrakturCook"
        ctx.fillStyle = "lightgreen";
        ctx.fillText('Score Player 1: ' +score1, 10, 20);
        ctx.fillStyle = "lightgreen";
        ctx.fillText('Score Player 2: ' +score2, 690, 20);
        ctx.fillStyle = "white";
        ctx.fillText('Seconds: ' +seconds, 350, 20);
        ctx.fillStyle = "yellow";
        ctx.fillText('Lives Player 1: ' + vidas1, 10, 40);
        ctx.fillStyle = "yellow";
        ctx.fillText('Lives Player 2: ' + vidas2, 690, 40);
        frames++;
        seconds = parseInt(frames/60);
    }
}

let myBoard = new Board();


// Draw monito
let monito = {
    width: 43,
    height: 50,
    x: 30,
    y: 50,
    selectedImage: image3,
    haciaAbajo: false,
    jump_y: this.y,
    updater: 0,
    limitupdater: 10,
   
    draw(){
        this.updater ++;
        if (this.updater >= this.limitupdater){
            if (this.selectedImage === image3) {
                this.selectedImage = image4
            } else {this.selectedImage = image3}
            this.updater = 0;
        }
        //this.y =  myBoard.height - monito.height -10
        ctx.drawImage(this.selectedImage, this.x, this.y);
    },

    moveForward(){
        if (this.x >= myBoard.width - this.width) {
            this.x = myBoard.width -this.width
        } 
        this.x += 15;
    },

    moveBackward(){
        if (this.x <= 0){
            this.x = 0;
        }
        this.x -= 15;
    },
    
    idle(){
        
    },

    moveUp(){
        if (this.y <= 0){
            this.y = 0;
        }
        this.y -= 15;
    },

    moveDown(){
        if (this.y >= myBoard.height - this.height -5){
            this.y = myBoard.height- this.height -5;
        }
        this.y += 15;
    },

    shoot(){
        var bulletPosition = this.midpoint();
        
        playerBullets1.push( new Bullet({
            speed: 5,
            x: bulletPosition.x,
            y: bulletPosition.y
        }));
    },

    midpoint(){
        return {
            x: this.x + this.width/2,
            y: this.y +this.height/2
        };
    }
};

let monito2 = {
    width: 43,
    height: 50,
    x: 30,
    y: 150,
    selectedImage: image1,
    haciaAbajo: false,
    jump_y: this.y,
    updater: 0,
    limitupdater: 10,
    

   
    draw(){
        this.updater ++;
        if (this.updater >= this.limitupdater){
            if (this.selectedImage === image1) {
                this.selectedImage = image2
            } else {this.selectedImage = image1}
            this.updater = 0;
        }
        //this.y =  myBoard.height - monito.height -10
        ctx.drawImage(this.selectedImage, this.x, this.y);
    },

    moveForward(){
        if (this.x >= myBoard.width - this.width) {
            this.x = myBoard.width -this.width
        } 
        this.x += 15;
    },

    moveBackward(){
        if (this.x <= 0){
            this.x = 0;
        }
        this.x -= 15;
    },
    
    idle(){
        
    },

    moveUp(){
        if (this.y <= 0){
            this.y = 0;
        }
        this.y -= 15;
    },

    moveDown(){
        if (this.y >= myBoard.height - this.height -5){
            this.y = myBoard.height-this.height -5;
        }
        this.y += 15;
    },

    shoot(){
        var bulletPosition = this.midpoint();
        
        playerBullets2.push( new Bullet({
            speed: 5,
            x: bulletPosition.x,
            y: bulletPosition.y
        }));
    },

    midpoint(){
        return {
            x: this.x + this.width/2,
            y: this.y +this.height/2
        };
    }
};

// proyectiles

function Bullet(I){
    I.active = true;
    I.xVelocity = I.speed;
    I.yVelocity = 0;
    I.width = 16;
    I.height = 16;
    I.image = new Image();
    I.image.src = "img/apple.png"
    I.image.onload = function () {
        enemigo.draw();
    }


    I.inBounds = function() {
        return I.x >= 0 && I.x <= canvas.width && I.y >= 0 && I.y <= canvas.height;
    };

    I.draw = function() {
        
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    };

    I.update = function(){
        I.x += I.xVelocity;
        I.y += I.yVelocity;

        I.active = I.active && I.inBounds();
    };

    return I;
} 

//enemigos
class Enemigos{
    constructor(y){
        this.x = canvas.width;
        this.y = y;
        this.image = new Image();
        this.id;
        this.active = true;
        this.explosion = new Image();
        this.explosion.src = 'img/explosion.png';
        this.wave = true;
        this.counter = 0;
        
    }

    draw(){
        
        this.x -=2;
        if (this.counter % 100 === 0 && this.wave === true){
            this.y += this.width;
            this.wave = false;
        } else if (this.counter % 100 === 0 && this.wave === false){
            this.y -= this.width;
            this.wave = true;
        }
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        this.counter++;
    }

    inBound(){
        if (this.x >= 0 && this.x <= canvas.width && this.active === true){
            return this.active = true;
        }
        this.active = false;
    }

    exp(){
        this.active = false;
        ctx.drawImage(this.explosion, this.x, this.y, this.width, this.height);
    }
}

function generateEnemigos(){
    if (frames % 400 === 0) {
        let y = Math.floor(Math.random()*(canvas.height - 100));
        let enemigo = new Enemigos(y);
        enemigo.image.src = 'img/celery.png';
        enemigo.image.onload = function () {
            enemigo.draw();
        }
        enemigo.width = 50;
        enemigo.height = 50;
        enemigo.id = "celery";
        enemies.push(enemigo);
    } else if (frames % 750 === 0){
        let y = Math.floor(Math.random()*(canvas.height - 100));
        let enemigo = new Enemigos(y);
        enemigo.image.src = 'img/avocado.png';
        enemigo.image.onload = function () {
            enemigo.draw();
        }
        enemigo.width = 50;
        enemigo.height = 50;
        enemigo.id = "avocado";
        enemies.push(enemigo);
    } else if (frames % 950 === 0){
        let y = Math.floor(Math.random()*(canvas.height - 100));
        let enemigo = new Enemigos(y);
        enemigo.image.src = 'img/lettuce.png';
        enemigo.image.onload = function () {
            enemigo.draw();
        }
        enemigo.width = 50;
        enemigo.height = 50;
        enemigo.id = "lettuce";
        enemies.push(enemigo);
    } else if (frames % 2037 === 0) {
        let y = Math.floor(Math.random()*(canvas.height - 100));
        let enemigo = new Enemigos(y);
        enemigo.image.src = 'img/satanas.png';
        enemigo.image.onload = function () {
            enemigo.draw();
        }
        enemigo.width = 64;
        enemigo.height = 64;
        enemigo.id = "satan";
        enemies.push(enemigo);
    } else if (frames % 700 === 0){
        let y = Math.floor(Math.random()*(canvas.height - 100));
        let enemigo = new Enemigos(y);
        enemigo.image.src = 'img/vaca.png';
        enemigo.image.onload = function () {
            enemigo.draw();
        }
        enemigo.width = 50;
        enemigo.height = 50;
        enemigo.id = "cow";
        enemies.push(enemigo);   
    } else if (frames % 420 === 0){
        let y = Math.floor(Math.random()*(canvas.height - 100));
        let enemigo = new Enemigos(y);
        enemigo.image.src = 'img/pig.png';
        enemigo.image.onload = function () {
            enemigo.draw();
        }
        enemigo.width = 49;
        enemigo.height = 46;
        enemigo.id = "pig";
        enemies.push(enemigo);   
    } else if (frames % 630 === 0){
        let y = Math.floor(Math.random()*(canvas.height - 100));
        let enemigo = new Enemigos(y);
        enemigo.image.src = 'img/dog.png';
        enemigo.image.onload = function () {
            enemigo.draw();
        }
        enemigo.width = 50;
        enemigo.height = 50;
        enemigo.id = "dog";
        enemies.push(enemigo);   
    }
}

//ckeck collitions
function collides(a, b) {
    return a.x < b.x + b.width &&
         a.x + a.width > b.x &&
         a.y < b.y + b.height &&
         a.y + a.height > b.y;
}

function handleCollisions() {
    playerBullets1.forEach(function(bullet){
        enemies.forEach(function(enemigo){
            if (collides(bullet, enemigo)){
                enemigo.exp();
                oof.play();

                bullet.active = false;
                if(enemigo.id === "celery"){
                    score1 += 1;
                } else if (enemigo.id === "satan"){
                    score1 += 50;
                } else if (enemigo.id === "dog") {
                    score1 -= 20;
                } else if (enemigo.id === "lettuce") {
                    score1 += 5;
                } else if (enemigo.id === "avocado") {
                    score1 += 10;
                } else if (enemigo.id === "pig") {
                    score1 -= 5;
                } else if (enemigo.id === "cow") {
                    score1 -= 1;
                }
            }
        });
    });
    enemies.forEach(function(enemies){
        if (collides(monito, enemies)){
            enemies.active = false;
            groan.play();
            vidas1 -= 1;
        }
    })
    playerBullets2.forEach(function(bullet){
        enemies.forEach(function(enemigo){
            if (collides(bullet, enemigo)){
                enemigo.exp();
                oof.play();

                bullet.active = false;
                if(enemigo.id === "celery"){
                    score2 += 1;
                } else if (enemigo.id === "satan"){
                    score2 += 50;
                } else if (enemigo.id === "dog") {
                    score2 -= 20;
                } else if (enemigo.id === "lettuce") {
                    score2 += 5;
                } else if (enemigo.id === "avocado") {
                    score2 += 10;
                } else if (enemigo.id === "pig") {
                    score2 -= 5;
                } else if (enemigo.id === "cow") {
                    score2 -= 1;
                }
            }
        });
    });
    enemies.forEach(function(enemies){
        if (collides(monito2, enemies)){
            enemies.active = false;
            groan.play();
            vidas2 -= 1;
        }
    })
}

//check if win or lose
function checkIfWin(){
    if (vidas1 <= 0){
        clearInterval(Intervalo);
        ctx.font =  "30px UnifrakturCook";
        ctx.fillStyle = 'white';
        ctx.fillText("El Veganorc 1 perdió todas sus vidas", 200, 100);
        ctx.fillText("El Veganorc 2 gana :))))", 230, 200);
        ctx.fillText('Press Backspace to play again', 200, 300);
        myBoard.music.pause();
        //falta poner aqui una función para que detenga el juego
    } else if(vidas2 <= 0){
        clearInterval(Intervalo);
        ctx.font =  "30px UnifrakturCook";
        ctx.fillStyle = 'white';
        ctx.fillText("El Veganorc 2 perdió todas sus vidas", 200, 100);
        ctx.fillText("El Veganorc 1 gana :))))", 230, 200);
        ctx.fillText('Press Backspace to play again', 200, 300);
        myBoard.music.pause();
    } else {
        if (seconds >= 60) {
            clearInterval(Intervalo)
            if (score1 > score2) {
                console.log('jugador 1 gana')
                ctx.font =  "30px UnifrakturCook";
                ctx.fillStyle = 'white';
                ctx.fillText("El Veganorc 1 gana :))) su puntaje fue: "+ score1, 200, 100);
                ctx.fillText("El Veganorc 2 tuvo un puntaje de: " + score2, 230, 200);
                ctx.fillText('Press Backspace to play again', 200, 300);
                myBoard.music.pause();
            } else if (score2 > score1) {
                ctx.font =  "30px UnifrakturCook";
                ctx.fillStyle = 'white';
                ctx.fillText("El Veganorc 2 gana :))) su puntaje fue: "+ score2, 200, 100);
                ctx.fillText("El Veganorc 1 tuvo un puntaje de: " + score1, 230, 200);
                ctx.fillText('Press Backspace to play again', 200, 300);
                myBoard.music.pause();
            } else {
                ctx.font =  "30px UnifrakturCook";
                ctx.fillStyle = 'white';
                ctx.fillText("LOL empataron, su puntaje fue de:"+ score2, 200, 100);
                ctx.fillText('Press Backspace to play again', 230, 300);
                myBoard.music.pause();
            }
           
           
        }
    }

    
}

// set interval
function startGame(){
    myBoard.music.play();
    score1 = 0;
    score2 = 0;
    vidas1 = 3;
    vidas2 = 3;
    frames = 0;
    seconds = 0;
    playerBullets1 = [];
    playerBullets2 = [];
    enemies = [];
    Intervalo = setInterval(function(){
        //board
        myBoard.draw();
        //monito
        monito.draw();
        monito2.draw();
        //balas
        playerBullets1.forEach(function(bullet){
            bullet.update();
        });
        playerBullets1 = playerBullets1.filter(function(bullet){
            return bullet.active;
        });
        playerBullets1.forEach(function(bullet){
            bullet.draw();
        });
        playerBullets2.forEach(function(bullet){
            bullet.update();
        });
        playerBullets2 = playerBullets2.filter(function(bullet){
            return bullet.active;
        });
        playerBullets2.forEach(function(bullet){
            bullet.draw();
        });
        //enemigos
        generateEnemigos();
        enemies = enemies.filter(function(enemigo){
            return enemigo.inBound()
        });
        enemies.forEach(function(enemigo){
            enemigo.draw();
        });
        handleCollisions();
        //checar si perdiste o ganaste
        checkIfWin();
        
    
    }, 1000/60)
}


// determine two or more keys
let multipleKeys = {}; 
onkeydown = onkeyup = function(e){
    multipleKeys[e.keyCode] = e.type == 'keydown';
}



//event listeners 
document.addEventListener('keydown', function(e){
    if (e.keyCode === 8){
        startGame();
    }
})

document.addEventListener('keydown', function(e){
    //monito
    // mover monito 1 adelante
    if(e.keyCode === 76){
        if (multipleKeys[73]){
            if(multipleKeys[78]){
                monito.moveUp();
                monito.moveForward();
                monito.shoot();
            }
            monito.moveUp();
            monito.moveForward()
        } else if (multipleKeys[75]){
            monito.moveDown();
            monito.moveForward();
        } 
        else {
            monito.moveForward();
        }
        return;
    } 
    //mover monito 1 atras
    else if (e.keyCode === 74){
        if (multipleKeys[73]) {
            monito.moveBackward();
            monito.moveUp();
        } else if (multipleKeys[75]){
            monito.moveBackward();
            monito.moveDown();
        } 
        else {
            monito.moveBackward();
        }
        return;
    } 
    //mover monito 1 arriba
    else if (e.keyCode === 73){
        if (multipleKeys[76]){
            monito.moveUp();
            monito.moveForward();
        } else if (multipleKeys[74]){
            monito.moveUp();
            monito.moveBackward();
        }
        else {
            if (multipleKeys[78]){
                monito.moveUp();
                monito.shoot();
            }
            monito.moveUp();
        }
        return;
    } 
    //mover monito 1 abajo
    else if (e.keyCode === 75) {
        if (multipleKeys[74]) {
            monito.moveDown();
            monito.moveBackward();
        } else if (multipleKeys[76]){
            monito.moveDown();
            monito.moveForward();
        } 
        else {
            monito.moveDown();
        }
        return;
    } 
    //disparo monito 1
    else if (e.keyCode === 78) {
        monito.shoot();
    } 

   

})

document.addEventListener('keydown', function(e){
     //monito2
    // mover monito2 delante
    if(e.keyCode === 70){
        if (multipleKeys[69]){
            if(multipleKeys[86]){
                monito2.moveUp();
                monito2.moveForward();
                monito2.shoot();
            }
            monito2.moveUp();
            monito2.moveForward()
        } else if (multipleKeys[68]){
            monito2.moveDown();
            monito2.moveForward();
        } 
        else {
            monito2.moveForward();
        }
        return;
    } 
    //mover monito2 atras
    else if (e.keyCode === 83){
        if (multipleKeys[69]) {
            monito2.moveBackward();
            monito2.moveUp();
        } else if (multipleKeys[68]){
            monito2.moveBackward();
            monito2.moveDown();
        } 
        else {
            monito2.moveBackward();
        }
        return;
    } 
    //mover monito2 arriba
    else if (e.keyCode === 69){
        if (multipleKeys[70]){
            monito2.moveUp();
            monito2.moveForward();
        } else if (multipleKeys[83]){
            monito2.moveUp();
            monito2.moveBackward();
        }
        else {
            if (multipleKeys[86]){
                monito2.moveUp();
                monito2.shoot();
            }
            monito2.moveUp();
        }
        return;
    } 
    //mover monito2 abajo
    else if (e.keyCode === 68) {
        if (multipleKeys[83]) {
            monito2.moveDown();
            monito2.moveBackward();
        } else if (multipleKeys[70]){
            monito2.moveDown();
            monito2.moveForward();
        } 
        else {
            monito2.moveDown();
        }
        return;
    } 
    //disparo monito 2
    else if (e.keyCode === 86) {
        monito2.shoot();
    }
})

// load welcome screen before the game start
window.addEventListener("load", function (){
    let hello = new Image();
    hello.src = "img/welcomescreen.png"
    ctx.drawImage(hello, 250, 100);
    ctx.font = "50px UnifrakturCook";
    ctx.fillText("Press BACKSPACE to start", 100, 300);
})
