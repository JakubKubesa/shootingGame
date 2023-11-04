const hraciPole = document.getElementById('hraci-pole');
const hrac = document.getElementById('hrac');
const bullet = document.getElementById('bullet');

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
    
    zkontrolujKolizi();
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
        }
    }
}

window.addEventListener('keydown', pohyb);












// Funkce pro kontrolu kolize.
/*
function zkontrolujKolizi() {
    // Vypočtěte vzdálenost mezi středem hráče a středem předmětu.
    const hracStredX = hracX + hrac.clientWidth / 2;
    const hracStredY = hracY + hrac.clientHeight / 2;
    const predmetStredX = predmetX + predmet.clientWidth / 2;
    const predmetStredY = predmetY + predmet.clientHeight / 2;

    const vzdalenost = Math.sqrt(Math.pow(hracStredX - predmetStredX, 2) + Math.pow(hracStredY - predmetStredY, 2));
    if (vzdalenost < (hrac.clientWidth / 2 + predmet.clientWidth / 2)) {
        // Nastane kolize, takže skryjte předmět.
        predmet.style.display = 'none';
    }
}
*/