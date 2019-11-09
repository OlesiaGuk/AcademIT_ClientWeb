var countries = [
    {
        name: "Российская Федерация",
        cities: [
            {
                name: "Москва",
                population: 12615882
            },
            {
                name: "Санкт-Петербург",
                population: 5383968
            },
            {
                name: "Новосибирск",
                population: 1612833
            }
        ]
    },
    {
        name: "Панама",
        cities: [
            {
                name: "Панама",
                population: 880691
            },
            {
                name: "Колон",
                population: 204000
            }
        ]
    },
    {
        name: "Республика Корея",
        cities: [
            {
                name: "Сеул",
                population: 10063197
            },
            {
                name: "Пусан",
                population: 3414950
            }
        ]
    }
];

function f(array) {
    var maxCount = 0;
    array.forEach(function (c) {
        var count = c.cities.length;
        if (count > maxCount) {
            maxCount = count;
        }
        return maxCount;
    });

    return array.filter(function (c) {
        return c.cities.length === maxCount;
    }).map(function (c) {
        return c.name;
    });
}

function f1(array) {
    var countriesInfo = {};
    array.map(function (c) {
        var key = c.name;
        var value = function () {
            return c.cities.reduce(function (memo, e) {
                return memo + e.population;
            }, 0)
        };
        return countriesInfo[key] = value();
    });
    return countriesInfo;
}

console.log("Страны с максимальный количеством городов: " + f(countries));
console.log(f1(countries));