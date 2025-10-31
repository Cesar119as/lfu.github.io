function initCarrusel() {

    let currentIndex = 0;
    function movecarrusel(direction) {
        const items = document.querySelectorAll('.carrusel-item');
        const totalItems = items.length;
        const carruselInner = document.querySelector('.carrusel-inner');

        if (!carruselInner) return;

        currentIndex = (currentIndex + direction + totalItems) % totalItems;
        carruselInner.style.transform = `translateX(${-currentIndex * 100}%)`;
    }

    setInterval(() => {
        movecarrusel(1);
    }, 4500);
    window.movecarrusel = movecarrusel;
}
