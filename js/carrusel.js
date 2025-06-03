document.addEventListener('DOMContentLoaded', () => {
    let currentIndex = 0;

    function movecarrucel(direction) {
        const items = document.querySelectorAll('.carrucel-item');
        const totalItems = items.length;
        const carrucelInner = document.querySelector('.carrucel-inner');

        if (!carrucelInner) {
            console.error("No se encontró '.carrucel-inner'");
            return;
        }

        currentIndex = (currentIndex + direction + totalItems) % totalItems;
        carrucelInner.style.transform = `translateX(${-currentIndex * 100}%)`;
    }

    setInterval(() => {
        movecarrucel(1);
    }, 4500);
});
