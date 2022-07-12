(function() {
    const burgerItem = document.querySelector('.burger');
    const menu = document.querySelector('.burger-menu');
    const menuClose = document.querySelector('.close');
    const menuCloseItem = document.querySelectorAll('.header-link');
    burgerItem.addEventListener('click', () => {
        menu.classList.add('burger-menu-active');

    });
    menuClose.addEventListener('click', () => {
        menu.classList.remove('burger-menu-active');

    });

    // if (window.innerWidth < 391) {
    for (let i = 0; i < menuCloseItem.length; i++) {
        menuCloseItem[i].addEventListener('click', () => {
            menu.classList.remove('burger-menu-active')
        })
    }
    // };
}())


console.log('1.Вёрстка соответствует макету. Ширина экрана 390px +48\n2.Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +0\n3.На ширине экрана 390рх и меньше реализовано адаптивное меню +18 \nпри клике по ссылке в адаптивном меню адаптивное меню плавно скрывается, также скрытие меню происходит если сделать клик вне данного окна +0\n\nИтого:66');