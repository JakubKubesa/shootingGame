const hraciPole = document.getElementById('hraci-pole');
const hrac = document.getElementById('hrac');
const bullet = document.getElementById('bullet');
const balloon = document.getElementById('balloon');
const live = document.getElementById('live');
const score = document.getElementById('score');

let hracX = 500;
let hracY = 600;
let bulletX;
let bulletY;

let LivesCounter=3;
let ScoreCounter=0;

let bulletVisible = false;
let bulletSpeed = 5;
let balloonX = 0;
let balloonSpeed = 2;




requestAnimationFrame(pohybBalloon);

function pohyb(event) {
    bulletX = hracX + 30;
    

    switch (event.key) {
        case 'a':
            hracX -= 10;
            break;
        case 'd':
            hracX += 10;
            break;
        case 'ArrowLeft':
            hracX -= 10;
            break;
        case 'ArrowRight':
            hracX += 10;
            break;
        case ' ':
            if (!bulletVisible) {
                bulletY = 480;
                bullet.style.left = bulletX + 'px';
                bullet.style.top = bulletY + 'px';
                bullet.style.visibility = 'visible';
                bulletVisible = true;
                requestAnimationFrame(pohybBullet);
            }
            break;
    }

    hracX = Math.max(0, Math.min(hracX, hraciPole.clientWidth - hrac.clientWidth));
    hracY = Math.max(0, Math.min(hracY, hraciPole.clientHeight - hrac.clientHeight));

    hrac.style.left = hracX + 'px';
    hrac.style.top = hracY + 'px';
    
    
}


function pohybBullet() {
    if (bulletVisible) {
        bulletY -= bulletSpeed;
        bullet.style.top = bulletY + 'px';

        if (bulletY < 0) {
            bullet.style.visibility = 'hidden';
            bulletVisible = false;
        } else {
            requestAnimationFrame(pohybBullet);
            checkCollision();
        }
    }
}


function pohybBalloon() {
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
        requestAnimationFrame(pohybBalloon);
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
    score.innerHTML = "Score: " + ScoreCounter;
}


function gameOver(){
    balloon.style.visibility = 'hidden';
}


function resetButton(){
    if(LivesCounter == 0){
       balloon.style.visibility = "visible"
       ScoreCounter = 0;
       LivesCounter = 3;
       balloonSpeed = 2;
       live.innerHTML = '<img src="live.png"><img src="live.png"><img src="live.png">';
       requestAnimationFrame(pohybBalloon); 
    }
    
}

window.addEventListener('keydown', pohyb);
