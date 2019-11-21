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

function getMaxCitiesCountry(array) {
    var maxCitiesCount = array.reduce(function (maxCount, currentCountry) {
        return Math.max(maxCount, currentCountry.cities.length);
    }, 0);

    return array.filter(function (c) {
        return c.cities.length === maxCitiesCount;
    }).map(function (c) {
        return c.name;
    });
}

function getCountriesInfoObject(array) {
    var countriesInfo = {};
    array.forEach(function (c) {
        var key = c.name;
        var value = function () {
            return c.cities.reduce(function (memo, e) {
                return memo + e.population;
            }, 0)
        };
        countriesInfo[key] = value();
    });

    return countriesInfo;
}

console.log("Страны с максимальный количеством городов: " + getMaxCitiesCountry(countries));
console.log(getCountriesInfoObject(countries));