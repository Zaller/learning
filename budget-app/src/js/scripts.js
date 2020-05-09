"use strict";

let startBtn = document.getElementById("start"),
  budgetValue = document.getElementsByClassName("budget-value")[0],
  dayBudgetValue = document.getElementsByClassName("daybudget-value")[0],
  levelValue = document.getElementsByClassName("level-value")[0],
  expensesValue = document.getElementsByClassName("expenses-value")[0],
  optionalExpensesValue = document.getElementsByClassName(
    "optionalexpenses-value"
  )[0],
  incomeValue = document.getElementsByClassName("income-value")[0],
  monthSavingsValue = document.getElementsByClassName("monthsavings-value")[0],
  yearSavingsValue = document.getElementsByClassName("yearsavings-value")[0],
  expensesItem = document.getElementsByClassName("expenses-item"),
  expensesBtn = document.getElementsByTagName("button")[0],
  optionalExpensesBtn = document.getElementsByTagName("button")[1],
  countBtn = document.getElementsByTagName("button")[2],
  optionalExpensesItem = document.querySelectorAll(".optionalexpenses-item"),
  incomeItem = document.querySelector(".choose-income"),
  checkSavings = document.querySelector("#savings"),
  sumValue = document.querySelector(".choose-sum"),
  percentValue = document.querySelector(".choose-percent"),
  yearValue = document.querySelector(".year-value"),
  monthValue = document.querySelector(".month-value"),
  dayValue = document.querySelector(".day-value");

let money, time;

expensesBtn.disabled = true;
optionalExpensesBtn.disabled = true;
countBtn.disabled = true;

startBtn.addEventListener("click", function () {
  time = prompt("Введите дату в формате YYYY-MM-DD", "");
  money = +prompt("Ваш бюджет на месяц?", "");

  while (isNaN(money) || money == "" || money == null) {
    // isnan возвращает true когда попадают не цифры
    money = +prompt("Ваш бюджет на месяц?", "");
  }
  appData.budget = money;
  appData.timeData = time;
  budgetValue.textContent = money.toFixed();
  //если есть input то работаем с value а не с textcontent
  yearValue.value = new Date(Date.parse(time)).getFullYear(); //вытаскиеваем из значения поный год
  monthValue.value = new Date(Date.parse(time)).getMonth() + 1; // +1 так как начинается с 0
  dayValue.value = new Date(Date.parse(time)).getDate();

  expensesBtn.disabled = false;
  optionalExpensesBtn.disabled = false;
  countBtn.disabled = false;
});

expensesBtn.addEventListener("click", function () {
  let sum = 0;

  for (let i = 0; i < expensesItem.length; ++i) {
    let a = expensesItem[i].value, // input в html странице в которую можно вписать данные
      b = expensesItem[++i].value;
    if (
      typeof a === "string" &&
      typeof a != null &&
      typeof b != null &&
      a != "" &&
      a.length < 50
    ) {
      console.log("Все верно");
      appData.expenses[a] = b;
      sum += +b;
    } else {
      i = i - 1;
    }
  }
  expensesValue.textContent = sum;
});

optionalExpensesBtn.addEventListener("click", function () {
  for (let i = 0; i < optionalExpensesItem.length; i++) {
    let opt = optionalExpensesItem[i].value;
    appData.optionalExpenses[i] = opt;
    optionalExpensesValue.textContent += appData.optionalExpenses[i] + " ";
  }
});

countBtn.addEventListener("click", function () {
  if (appData.budget != undefined) {
    appData.moneyPerDay = ((appData.budget - +expensesValue.textContent) / 30).toFixed(); //метод tofixed возвращает строковое значение и округляет значение с 1 знаком после запятой
    dayBudgetValue.textContent = appData.moneyPerDay;

    if (appData.moneyPerDay < 100) {
      levelValue.textContent = "Минимальный уровень";
    } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
      levelValue.textContent = "Средний уровень";
    } else if (appData.moneyPerDay > 2000) {
      levelValue.textContent = levelValue.textContent = "Высокий уровень";
    } else {
      levelValue.textContent = "Произошла ошибка";
    }
  } else {
    dayBudgetValue.textContent = "Произошла ошибка";
  }
});

incomeItem.addEventListener("input", function () {
  let items = incomeItem.value;
  appData.income = items.split(", "); //Превращает строку в массив. то что вводит пользователь через запятую уходит в массив инкоме
  incomeValue.textContent = appData.income;
});

checkSavings.addEventListener("click", function () {
  if (appData.savings == true) {
    appData.saving = false;
  } else {
    appData.savings = true;
  }
});

sumValue.addEventListener("input", function () {
  if (appData.savings == true) {
    let sum = +sumValue.value,
      percent = +percentValue.value;

    appData.monthIncome = (sum / 100 / 12) * percent;
    appData.yearIncome = (sum / 100) * percent;

    monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
    yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
  }
});

percentValue.addEventListener("input", function () {
  if (appData.savings == true) {
    let sum = +sumValue.value,
      percent = +percentValue.value;

    appData.monthIncome = (sum / 100 / 12) * percent;
    appData.yearIncome = (sum / 100) * percent;

    monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
    yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
  }
});

let appData = {
  budget: money,
  timeData: time,
  expenses: {},
  optionalExpenses: {},
  income: [],
  savings: false,
};
