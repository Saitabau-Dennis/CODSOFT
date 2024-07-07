
    const mobileMenu = document.getElementById('mobile-menu');
    const navList = document.querySelector('.nav-list');

    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('toggle');
        navList.classList.toggle('show');
    });

