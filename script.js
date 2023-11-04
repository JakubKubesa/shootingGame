const hraciPole = document.getElementById('hraci-pole');
const hrac = document.getElementById('hrac');
const bullet = document.getElementById('bullet');
const balon = document.getElementById('balonek');

let hracX = 275;
let hracY = 600;
let bulletX;
let bulletY;
let bulletVisible = false;
let bulletSpeed = 5; // Rychlost střely po ose Y (změňte podle potřeby).

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
                // Spustíme časovač pro pohyb střely.
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

        // Zde můžete prověřit, zda střela opustila hrací pole a skrýt ji.
        if (bulletY < 0) {
            bullet.style.visibility = 'hidden';
            bulletVisible = false;
        } else {
            // Pokračujeme v pohybu střely.
            requestAnimationFrame(pohybBullet);
            checkCollision();
        }
    }
}


function checkCollision(){
    if (bulletY == 80 && bulletX >= 275 && bulletX <= 343) {
        balon.style.visibility = 'hidden';
    }
}


window.addEventListener('keydown', pohyb);
