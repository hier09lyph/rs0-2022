let burgerButton = document.querySelector('.burger');
let burgerMenu = document.querySelector('.burger-menu');
let menuClose = document.querySelector('.close');
let menuLinks = document.querySelectorAll('.header-link');
let shadow = document.querySelector('.cover');

function openMenu() {
    burgerMenu.classList.add('active');
    shadow.classList.add('active');
}

function closeMenu() {
    burgerMenu.classList.remove('active');
    shadow.classList.remove('active');

}

//Открываем меню 
burgerButton.addEventListener('click', openMenu);

// Закрываем мену при клике на крестик
menuClose.addEventListener('click', closeMenu);

// Закрываем меню при нажатии на ссылки
for (let i = 0; i < menuLinks.length; i++) {
    menuLinks[i].addEventListener('click', closeMenu)
}
// Закрываем меню при нажатии вне бургера

window.addEventListener('click', e => {
    const target = e.target;
    if (!e.target.closest('.burger-menu') && !target.closest('.burger')) {
        closeMenu();
    }
})


// Закрываем меню при скроле
// document.addEventListener('scroll', closeMenu)


//my popup
let loginButton = document.querySelectorAll('.login-form');
let popup = document.querySelector('.popup');
let popupBg = document.querySelector('.popup-bg')
let popupRegister = document.querySelector('.btn-register')
let popupLogin = document.querySelector('.btn-login')

let popupSignup = document.querySelector('.popup-signup')



function openSingup() {
    document.getElementsByClassName('popup-login')[0].style = "display: none";
    document.getElementsByClassName('popup-signup')[0].style = "display: block";
    document.getElementsByClassName('popup-inner')[0].style = "border-radius: 16px";


}

function openLogin() {
    document.getElementsByClassName('popup-login')[0].style = "display: block";
    document.getElementsByClassName('popup-signup')[0].style = "display: none";
    document.getElementsByClassName('popup-inner')[0].style = "border-radius: 0";
}

popupRegister.addEventListener('click', openSingup);
popupLogin.addEventListener('click', openLogin);



function openPopup() {

    popup.classList.add('active');
    popupBg.classList.add('active');
}

function closePopup() {
    popup.classList.remove('active');
    popupBg.classList.remove('active');
}

for (let i = 0; i < loginButton.length; i++) {
    loginButton[i].addEventListener('click', openPopup)
}



document.addEventListener('scroll', closePopup)

// Закрываем попап

document.addEventListener('click', (e) => { // Вешаем обработчик на весь документ
    if (e.target === popupBg) { // Если цель клика - фот, то:
        popupBg.classList.remove('active'); // Убираем активный класс с фона
        popup.classList.remove('active'); // И с окна
    }
});

// Ввод данных LogIn

const form = document.querySelector('.login-form-popup');
const signin = document.querySelector('.popup-form-btn')

signin.addEventListener('click', getFormValue);

function getFormValue(event) {
    event.preventDefault();
    const mail = form.querySelector('[name="email"]'); //получаем поле mail

    const password = form.querySelector('[name="password"]'); //получаем поле password
    popupBg.classList.remove('active'); // Убираем активный класс с фона
    popup.classList.remove('active'); // И с окна

    alert('Cпасибо за регистрацию!' + '\nE-mail: ' + mail.value + '\nPassword: ' + password.value);

    mail.value = '';
    password.value = '';

}

// slider

const slider = document.querySelector('.destination-slider');
const img1 = document.querySelector('.destination-img1');
const img2 = document.querySelector('.destination-img2');
const img3 = document.querySelector('.destination-img3');
const ellipseFirst = document.querySelector('.ellipse-first');
const ellipseSecond = document.querySelector('.ellipse-second');
const ellipseThird = document.querySelector('.ellipse-third');

ellipseSecond.style.opacity = '1';

if (document.documentElement.clientWidth > 390) {
    document.addEventListener('click', (e) => { // Вешаем обработчик на весь документ
        if (e.target === img3 || e.target === ellipseThird) { // Img3
            slider.style.transform = 'translate(-34.5%, 0)';
            ellipseSecond.style.opacity = '.5';
            ellipseThird.style.opacity = '1';
            ellipseFirst.style.opacity = '.5';
        }
        if (e.target === img2 || e.target === ellipseSecond) { // Img2
            slider.style.transform = 'translate(0, 0)';
            ellipseSecond.style.opacity = '1';
            ellipseThird.style.opacity = '.5';
            ellipseFirst.style.opacity = '.5';
        }
        if (e.target === img1 || e.target === ellipseFirst) { // Img1
            slider.style.transform = 'translate(34%, 0)';
            ellipseSecond.style.opacity = '.5';
            ellipseThird.style.opacity = '.5';
            ellipseFirst.style.opacity = '1';
        }
    });
}

const arrowLeft = document.querySelector('.arrow-left');
const arrowRight = document.querySelector('.arrow-right');

arrowLeft.style.opacity = '1';
arrowRight.style.opacity = '1';

if (document.documentElement.clientWidth <= 390) {
    document.addEventListener('click', (e) => { // Вешаем обработчик на весь документ


        if ((e.target === arrowLeft && arrowLeft.style.opacity === '1' && arrowRight.style.opacity === '1') ||
            e.target === ellipseFirst) { // Img1
            slider.style.transform = 'translate(34%, 0)';
            arrowLeft.style.opacity = '0.5'
            arrowRight.style.opacity = '1'
            ellipseSecond.style.opacity = '.5';
            ellipseThird.style.opacity = '.5';
            ellipseFirst.style.opacity = '1';
        }



        if ((e.target === arrowRight && arrowLeft.style.opacity === '1' && ellipseSecond.style.opacity === '1') ||
            e.target === ellipseThird) { // Img3
            slider.style.transform = 'translate(-34%, 0)';
            arrowLeft.style.opacity = '1'
            arrowRight.style.opacity = '0.5'
            ellipseSecond.style.opacity = '.5';
            ellipseThird.style.opacity = '1';
            ellipseFirst.style.opacity = '.5';
        }

        if ((e.target === arrowLeft && arrowLeft.style.opacity === '1' && arrowRight.style.opacity === '0.5') ||
            e.target === ellipseSecond) { // Img2
            slider.style.transform = 'translate(0, 0)';
            arrowLeft.style.opacity = '1';
            arrowRight.style.opacity = '1';
            ellipseSecond.style.opacity = '1';
            ellipseThird.style.opacity = '.5';
            ellipseFirst.style.opacity = '.5';
        }
        if (e.target === arrowRight && arrowRight.style.opacity === '1' && ellipseFirst.style.opacity === '1') { // Img2
            slider.style.transform = 'translate(0, 0)';
            arrowLeft.style.opacity = '1';
            arrowRight.style.opacity = '1';
            ellipseSecond.style.opacity = '1';
            ellipseThird.style.opacity = '.5';
            ellipseFirst.style.opacity = '.5';
        }

    });
}