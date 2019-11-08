var list = [0, -1, 1, 2, 5, 7, 10, 3];
console.log("Исходный массив: " + list.join(","));

function sortDesc(array) {
    array.sort(function (a, b) {
        return b - a;
    });
}

sortDesc(list);
console.log("Отсортированный массив: " + list);

console.log("Подмассив из первых 5 элементов: " + list.slice(0, 5).join(","));
console.log("Подмассив из последних 5 элементов: " + list.slice(list.length - 5).join(","));

function evenNumbersSum(array) {
    return array.filter(isEvenNumber).reduce(function (memo, e) {
        return memo + e;
    }, 0);
}

console.log("Сумма четных чисел массива = " + evenNumbersSum(list));

function isEvenNumber(e) {
    return e % 2 === 0;
}

//создать массив чисел от 1 до 100
var array = [];
for (var i = 1; i <= 100; i++) {
    array.push(i);
}
console.log(array.join(","));

//получить список квадратов четных чисел
function sum(array) {
    var newArray = [];
    newArray.push(array.filter(isEvenNumber).map(function (e) {
        return Math.pow(e, 2);
    }));
    return newArray;
}

console.log(sum(array).join(","));