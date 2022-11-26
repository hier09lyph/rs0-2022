const time = document.querySelector('.time')
const date_time = document.querySelector('.date')
const greeting = document.querySelector('.greeting')
const name = document.querySelector('.name')
const body = document.body
const slidePrev = document.querySelector('.slide-prev')
const slideNext = document.querySelector('.slide-next')

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const weatherError = document.querySelector('.weather-error');


const quotesQuote = document.querySelector('.quote');
const quotesAuthor = document.querySelector('.author');
const quotesButton = document.querySelector('.change-quote');



// Отображение текущего времени
function showTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    time.textContent = currentTime;
    setTimeout(showTime, 1000);
    showDate()
    showGreeting()

}
showTime();

// Отоборажение текущей даты
function showDate() {
    const date = new Date();
    const options = { month: 'long', day: 'numeric', weekday: 'long' };
    const currentDate = date.toLocaleDateString('en-En', options);
    date_time.textContent = currentDate;

}
showDate();

// Приветствие в соответсвии со временем дня
function getTimeOfDay() {
    const date = new Date();
    const hours = date.getHours();
    let timeOfDay = 'night'

    if (hours >= 6 && hours < 12) {
        timeOfDay = 'morning'
    }
    if (hours >= 12 && hours < 18) {
        timeOfDay = 'afternoon'
    }
    if (hours >= 18 && hours < 24) {
        timeOfDay = 'evening'
    }
    return timeOfDay
}

timeOfDay = getTimeOfDay()

function showGreeting() {
    const greetingText = `Good ${getTimeOfDay()}`;
    greeting.textContent = greetingText

}

// Сохранение данных пользователя
function setLocalStorage() {
    localStorage.setItem('name', name.value);
    localStorage.setItem('city', city.value);
}
window.addEventListener('beforeunload', setLocalStorage)

// Загрузка сохраненных данных пользователя
function getLocalStorage() {
    if (localStorage.getItem('name')) {
        name.value = localStorage.getItem('name');
    }
    if (localStorage.getItem('city')) {
        city.value = localStorage.getItem('city');
    }
}
window.addEventListener('load', getLocalStorage)


//Задний фон


function getRandomNum() {
    return Math.floor(Math.random() * 20 + 1);
}

let randomNum = getRandomNum()

function setBg() {
    const img = new Image();
    const timeOfDay = getTimeOfDay();
    img.src = "https://raw.githubusercontent.com/hier09lyph/momentum-bg/assets/images/" + timeOfDay + "/" + randomNum.toString().padStart(2, '0') + ".jpg";
    img.onload = () => {
        body.style.backgroundImage = "url('" + img.src + "')";
    };
}

setBg();
slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);

function getSlideNext() {
    if (randomNum == 20) {
        randomNum = 1
    } else {
        randomNum++
    }

    setBg()
}

function getSlidePrev() {
    if (randomNum == 1) {
        randomNum = 20
    } else {
        randomNum--
    }

    setBg()
}

// Widget wearther
// Ссылка https://api.openweathermap.org/data/2.5/weather?q=Минск&lang=ru&appid=b93d208e7e1d0e50227d237b5845ad39&units=metric

// 

async function getWeather() {
    if (city.value === '') {
        city.value = 'Gdansk';
    }


    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=b93d208e7e1d0e50227d237b5845ad39&units=metric`;

    const res = await fetch(url);

    if (res.status == 404 || city.value == '') {
        temperature.textContent = '';
        weatherDescription.textContent = '';
        wind.textContent = '';
        humidity.textContent = '';
        weatherError.textContent = `Enter correct city!`
    }

    const data = await res.json();

    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = ` Wind speed: ${Math.trunc(data.wind.speed)}m/s`;
    humidity.textContent = `Humidity: ${Math.trunc(data.main.humidity)}%`;
    weatherError.textContent = ''

}


function setCity(event) {
    if (event.code === 'Enter') {
        getWeather();
        city.blur();
    }
}


document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);

// Цитата

const max = 100
const min = 1;
let count = Math.floor(Math.random() * (max - min)) + min;
let maxCount = 0;

async function getQuotes() {
    const quotes = './js/data.json';
    const res = await fetch(quotes);
    return await res.json();
}

async function goGetQuotes(i) {
    const data = await getQuotes();
    maxCount = data.length;
    setTimeout(() => {
        quotesQuote.textContent = data[i].quote;
        quotesAuthor.textContent = data[i].author;
    }, 1000);
    maxCount >= count ? count++ : count = 0;
}

goGetQuotes(count);
if (quotesButton) {
    quotesButton.addEventListener("click", function(e) {
        goGetQuotes(count);
    });
}

// Audio player

// import playList from './playList.js';

const playList = [{
        title: 'Aqua Caelestis',
        src: './assets/sounds/Aqua Caelestis.mp3',
        duration: '00:39'
    },
    {
        title: 'River Flows In You',
        src: './assets/sounds/River Flows In You.mp3',
        duration: '01:37'
    },
    {
        title: 'Ennio Morricone',
        src: './assets/sounds/Ennio Morricone.mp3',
        duration: '01:37'
    },
    {
        title: 'Summer Wind',
        src: './assets/sounds/Summer Wind.mp3',
        duration: '01:50'
    }
]


let isPlay = false;
let playNum = 0;
let currentTime = 0;

const player = document.querySelector('.player');
const audio = new Audio();
const playBtn = player.querySelector('.play');
const playPrevBtn = player.querySelector('.play-prev');
const playNextBtn = player.querySelector('.play-next');
const playListContainer = player.querySelector('.play-list');


function playAudio() {
    if (!isPlay) {
        isPlay = true;
        audio.src = playList[playNum].src;
        audio.currentTime = currentTime;

        audio.play();
        playBtn.classList.add("pause");

        let elements = playListContainer.querySelectorAll('li');
        for (let elem of elements) {
            elem.classList.remove('item-active');
        }
        elements[playNum].classList.add('item-active');


    } else {
        isPlay = false;
        currentTime = audio.currentTime;
        audio.pause();
        playBtn.classList.remove("pause");

    }
}

playBtn.addEventListener('click', playAudio);
audio.addEventListener('ended', playNext);

function playNext() {
    playNum < playList.length - 1 ? playNum++ : playNum = 0;
    isPlay = false;
    currentTime = 0;
    playAudio();
}

function playPrev() {
    playNum <= 0 ? playNum = playList.length - 1 : playNum--;
    isPlay = false;
    currentTime = 0;
    playAudio();
}


playPrevBtn.addEventListener('click', playPrev);
playNextBtn.addEventListener('click', playNext);

playList.forEach(el => {
    const li = document.createElement('li');
    li.classList.add('play-item');
    li.textContent = el.title;
    playListContainer.append(li);
})