"use strict";

let money, time;

function start() {
  money = +prompt("Ваш бюджет на месяц?", "");
  time = prompt("Введите дату в формате YYYY-MM-DD", "");

  while (isNaN(money) || money == "" || money == null) { // isnan возвращает true когда попадают не цифры
    money = +prompt("Ваш бюджет на месяц?", "");
  }
}
start();

let appData = {
  budget: money,
  timeData: time,
  expenses: {},
  optionalExpenses: {},
  income: [],
  savings: true,
  chooseExpenses: function () { // функция для расчета обязательной статьи расходов
    for (let i = 0; i < 3; ++i) {
      let a = prompt("Введите необязательную статью расходов", ""),
        b = prompt("Во сколько обойдется?", "");
      if (
        typeof a === "string" &&
        typeof a != null &&
        typeof b != null &&
        a != "" &&
        a.length < 50
      ) {
        console.log("done");
        appData.optionalExpenses[a] = b;
      } else {
        i = i - 1;
      }
    }
  },
  detectDayBudget: function () {
    appData.moneyPerDay = (appData.budget / 30).toFixed(1); //метод tofixed возвращает строковое значение и округляет значение с 1 знаком после запятой
    alert("Ежедневный бюджет: " + appData.moneyPerDay);
  },
  detectLevel: function () {
    if (appData.money < 100) {
      console.log("Минимальный уровень");
    } else if (appData.moneyPerDay == 100 && appData.moneyPerDay < 2000) {
      console.log("Средний уровень");
    } else if (appData.moneyPerDay > 2000) {
      console.log("Высокий уровень");
    } else {
      console.log("Произошла ошибка");
    }
  },
  checkSavings: function () { //функция для расчета накоплений с депозита если он есть
    if (appData.savings == true) {
      let save = +prompt("Какова сумма накоплений?"),
        percent = +prompt("Под какой процент?");

      appData.monthIncome = save / 100 / 12 * percent;
      alert("Доход в месяц с вашего депозита: " + appData.monthIncome);
    }
  },
  chooseOptExpenses: function () {
    for (let i = 1; i < 3; i++) {
      let opt = prompt("Статья необязательных расходов?", "");
      appData.optionalExpenses[i] = opt;
    }
  },
  chooseIncome: function () {
    let items = prompt('Что принесет дополныительный доход? (Перечислите через запятую!)', '');
    appData.income = items.split(', '); //Превращает строку в массив. то что вводит пользователь через запятую уходит в массив инкоме
    appData.income.push(prompt('Может что-нибудь еще?'));
    appData.income.sort();
    while (typeof (items) != "string" || items == "" || typeof (items) == null) {
      let items = prompt('Что принесет дополныительный доход? (Перечислите через запятую!)', '');
    };

    appData.income.forEach(function (itemmassive, i) {
      alert("Способы доп. заработка: " + (i + 1) + " - " + itemmassive);
    });
  }
};

for (let key in appData) {
  alert("Наша программа включает в себя данные: " + key + ' - ' + appData[key]);
}
