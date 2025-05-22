function setupMenu() {
    const menuToggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("menu");

    if (!menuToggle || !menu) return;

    const menuItems = menu.querySelectorAll('li');

    menuItems.forEach(item => {
        const submenu = item.querySelector('ul.submenu');
        if (submenu) {
            item.addEventListener('click', function (event) {
                event.stopPropagation();
                submenu.classList.toggle('show');
            });
        }
    });

    menuToggle.addEventListener("click", function () {
        menu.classList.toggle("show");
    });

    menuItems.forEach(item => {
        const submenu = item.querySelector('ul.submenu');
        if (submenu) {
            submenu.addEventListener('mouseleave', () => {
                submenu.classList.remove('show');
            });
        }
    });

    document.addEventListener("click", function (event) {
        if (!event.target.closest("#menu") && !event.target.closest("#menu-toggle")) {
            menu.classList.remove("show");
        }
    });
}
