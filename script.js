const c = document.getElementById("myCanvas");
const ctx = c.getContext("2d");
var score1 = 0;
var score2 = 0;
var wPressed = sPressed = false;
var balls = [];
var difficulty = "";
var time = 60;
var Player = function(x) {
    this.x = x;
    this.y = 300;
    this.w = 20;
    this.h = 20;

    this.show = function() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.w, this.h);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
    }
}

var Ai = function(x) {
    this.x = x;
    this.y = 300;
    this.w = 20;
    this.h = 20;

    this.show = function() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.w, this.h);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
    }
}
var Ball = function(y) {
    this.randomX = Math.floor(Math.random()*2);
    if(this.randomX === 0) {
        this.x = 0-(Math.random()*c.width*2)
    } else {
        this.x = c.width+(Math.random()*c.width*2)
    }
    this.y = y;
    
    this.show = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 5, 0, Math.PI*2);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
    }
    this.move = function() {
        if(this.randomX === 0) {
            this.x++;
        } else {
            this.x--;
        }
    }
    this.collisionDetection = function(playerX, playerY) {
        return  this.x+5 >= playerX && this.x-5 <= playerX+20 &&
                this.y+5 >= playerY && this.y-5 <= playerY+20;
    }
}

var player1 = new Player(c.width/2-50);
var player2 = new Ai(c.width/2+30);

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.keyCode === 87) {
        wPressed = true;
    } else if(e.keyCode === 83) {
        sPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode === 87) {
        wPressed = false;
    } else if(e.keyCode === 83) {
        sPressed = false;
    }
}
const net = {
    x: c.width/2-2.5,
    w: 5,
    h: c.height/2
};

function displayNet() {
    ctx.beginPath();
    ctx.rect(net.x, c.height-time*3, net.w, time*3);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

function displayScore1() {
    ctx.beginPath();
    ctx.font = "50px Arial"
    ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
    ctx.fillText(score1, 100, 250);
    ctx.closePath();
}

function displayScore2() {
    ctx.beginPath();
    ctx.font = "50px Arial"
    ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
    ctx.fillText(score2, c.width-125, 250);
    ctx.closePath();
}

for(var i = 0; i < 60; i++) {
    balls.push(new Ball(i*7.5))
}


function draw() {
    ctx.clearRect(0, 0, c.width, c.height);
    displayNet();
    displayScore1();
    displayScore2();
    player1.show();
    player2.show();
    if(difficulty === "easy") {
        player2.y--;
    } else if(difficulty === "medium") {
        player2.y--;
    } else if(difficulty === "hard") {
        player2.y--;
    }
    for(var i = 0; i < balls.length; i++) {
        balls[i].show();
        balls[i].move();
        balls[i].collisionDetection(player1.x, player1.y);
        balls[i].collisionDetection(player1.y, player2.y);
        if(difficulty === "medium") {
            if( balls[i].x+5 >= player2.x && balls[i].x-5 <= player2.x+20 &&
                balls[i].y+5 >= player2.y && balls[i].y-5 <= player2.y+40) {
                    player2.y++;
            }
        }
        if(difficulty === "hard") {
            if( balls[i].x+5 >= player2.x && balls[i].x-5 <= player2.x+20 &&
                balls[i].y+5 >= player2.y && balls[i].y-5 <= player2.y+40) {
                    player2.y++;
            } else if(  balls[i].x+5 >= player2.x-20 && balls[i].x-5 <= player2.x+20 &&
                        balls[i].y+5 >= player2.y && balls[i].y-5 <= player2.y+10) {
                    player2.y += 2;
            } else if(  balls[i].x+5 >= player2.x && balls[i].x-5 <= player2.x+40 &&
                        balls[i].y+5 >= player2.y && balls[i].y-5 <= player2.y+10) {
                    player2.y += 2;
            } else if(  balls[i].x+5 >= player2.x-20 && balls[i].x-5 <= player2.x+20 &&
                balls[i].y+5 >= player2.y+10 && balls[i].y-5 <= player2.y+20) {
                    player2.y--;
            } else if(  balls[i].x+5 >= player2.x && balls[i].x-5 <= player2.x+40 &&
                        balls[i].y+5 >= player2.y+10 && balls[i].y-5 <= player2.y+20) {
                    player2.y--;
            }
        } 
        if(balls[i].collisionDetection(player1.x, player1.y)) {
            player1.y = c.height-20;
        } else if(balls[i].collisionDetection(player2.x, player2.y)) {
            player2.y = c.height-20;
        }
        if(balls[i].randomX === 0 && balls[i].x >= c.width) {
            balls[i].x = 0-Math.random()*c.width;
        } else if(balls[i].randomX === 1 && balls[i].x <= 0) {
            balls[i].x = c.width+Math.random()*c.width;
        }
    }
    if(player1.y <= 0) {
        player1.y = c.height-20;
        score1++;
    } else if(player2.y <= 0) {
        player2.y = c.height-20;
        score2++;
    }
    if(wPressed) {
        player1.y--;
    } else if(sPressed) {
        player1.y++;
    }
    requestAnimationFrame(draw);
}
draw();

setInterval(function() {
    time--;
    if(time <= 0) {
        time = 60;
        if(score1 > score2) {
            document.write("Player1 (left) wins with "+score1+" points")
        } else if(score2 > score1) {
            document.write("Player2 (right) wins with "+score2+" points ")
        } else if(score1 === score2) {
            document.write("It's a tie!")
        }
    }
}, 1000);
function easy() {
    difficulty = "easy";
    document.getElementById("easy").style.display = "none";
    document.getElementById("medium").style.display = "none";
    document.getElementById("hard").style.display = "none";
}
function medium() {
    difficulty = "medium";
    document.getElementById("easy").style.display = "none";
    document.getElementById("medium").style.display = "none";
    document.getElementById("hard").style.display = "none";
}
function hard() {
    difficulty = "hard";
    document.getElementById("easy").style.display = "none";
    document.getElementById("medium").style.display = "none";
    document.getElementById("hard").style.display = "none";
}
