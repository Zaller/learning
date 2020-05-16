window.addEventListener('DOMContentLoaded', function() { // описывает то что js срикпт будет выполняться когда все ДОМ дерево загружено
    'use strict';
// дальше идет тело скрипта
// 1. обьявляем переменные
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');
// продумываем что мы делаем
// сначало то что нам не надо мы должны скрыть
// потом при клике на кнопку мы долны показывать на определенный контент

    function hideTabContent(a) { //функция который скрывается элементы
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }
    hideTabContent(1); // то есть мы скрыли все кроме первого таба

// далее функция который будет показывать
    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

// далее обработчик событиий при клике на каждый из наших табов
    info.addEventListener('click', function(event) {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    })

})
