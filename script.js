const playing_field = document.getElementById('playing-field');
const player = document.getElementById('player');
const bullet = document.getElementById('bullet');
const balloon = document.getElementById('balloon');
const live = document.getElementById('live');
const score = document.getElementById('score');

let playerX = 500;
let playerY = 600;
let bulletX;
let bulletY;

let LivesCounter=3;
let ScoreCounter=0;

let bulletVisible = false;
let bulletSpeed = 5;
let balloonX = 0;
let balloonSpeed = 1;


requestAnimationFrame(BalloonMoving);

function pohyb(event) {
    bulletX = playerX + 30;
    

    switch (event.key) {
        case 'a':
            playerX -= 10;
            break;
        case 'd':
            playerX += 10;
            break;
        case 'ArrowLeft':
            playerX -= 10;
            break;
        case 'ArrowRight':
            playerX += 10;
            break;
        case ' ':
            if (!bulletVisible) {
                bulletY = 480;
                bullet.style.left = bulletX + 'px';
                bullet.style.top = bulletY + 'px';
                bullet.style.visibility = 'visible';
                bulletVisible = true;
                requestAnimationFrame(BulletMoving);
            }
            break;
    }

    playerX = Math.max(0, Math.min(playerX, playing_field.clientWidth - player.clientWidth));
    playerY = Math.max(0, Math.min(playerY, playing_field.clientHeight - player.clientHeight));

    player.style.left = playerX + 'px';
    player.style.top = playerY + 'px';
    
    
}


function BulletMoving() {
    if (bulletVisible) {
        bulletY -= bulletSpeed;
        bullet.style.top = bulletY + 'px';

        if (bulletY < 0) {
            bullet.style.visibility = 'hidden';
            bulletVisible = false;
        } else {
            requestAnimationFrame(BulletMoving);
            checkCollision();
        }
    }
}


function BalloonMoving() {
    balloonX += balloonSpeed;
    balloon.style.left = balloonX + 'px';

    if (balloonX > 732) {
        balloonX = 0;
        balloon.style.left = balloonX + 'px';
        LivesCounter -= 1;
        switch(LivesCounter){
            case 2: live.innerHTML = '<img src="live.png"><img src="live.png">'; break;
            case 1: live.innerHTML = '<img src="live.png">'; break;
            case 0: live.innerHTML = " "; gameOver(); break;
        }
    }
    if (LivesCounter != 0) {
        requestAnimationFrame(BalloonMoving);
    }
    
}


function checkCollision(){
    if(LivesCounter != 0){
        if (bulletY == 80 && bulletX >= balloonX && bulletX <= (balloonX+68)) {
            balloonX = 0; ScoreCounter += 1;
            balloonSpeed = balloonSpeed + 0.15;
        }
        if (bulletY == 60 && bulletX >= balloonX && bulletX <= (balloonX+68)) {
            balloonX = 0; ScoreCounter += 1;
            balloonSpeed = balloonSpeed + 0.15;
        }
        if (bulletY == 40 && bulletX >= balloonX && bulletX <= (balloonX+68)) {
            balloonX = 0; ScoreCounter += 1;
            balloonSpeed = balloonSpeed + 0.15;
        }
        if (bulletY == 20 && bulletX >= balloonX && bulletX <= (balloonX+68)) {
            balloonX = 0; ScoreCounter += 1;
            balloonSpeed = balloonSpeed + 0.15;
        }
    }
    score.innerHTML = "<b>Score: " + ScoreCounter + "</b>";
}


function gameOver(){
    balloon.style.visibility = 'hidden';
}


function resetButton(){
    if(LivesCounter == 0){
       balloon.style.visibility = "visible"
       ScoreCounter = 0;
       LivesCounter = 3;
       balloonSpeed = 1;
       score.innerHTML = "<b>Score: " + ScoreCounter + "</b>";
       live.innerHTML = '<img src="live.png"><img src="live.png"><img src="live.png">';
       requestAnimationFrame(BalloonMoving); 
    }
    
}

window.addEventListener('keydown', pohyb);
