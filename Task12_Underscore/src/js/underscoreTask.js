var people = [
    {
        name: "Алла",
        lastName: "Храброва",
        age: 13
    },
    {
        name: "Виктория",
        lastName: "Байкова",
        age: 40
    },
    {
        name: "Сергей",
        lastName: "Кузнецов",
        age: 25
    },
    {
        name: "Елена",
        lastName: "Иванова",
        age: 68
    },
    {
        name: "Олег",
        lastName: "Громов",
        age: 20
    },
    {
        name: "Ирина",
        lastName: "Варфоломеева",
        age: 25
    },
    {
        name: "Николай",
        lastName: "Виноградов",
        age: 31
    },
    {
        name: "Ольга",
        lastName: "Томина",
        age: 35
    },
    {
        name: "Татьяна",
        lastName: "Федорова",
        age: 22
    },
    {
        name: "Никита",
        lastName: "Петров",
        age: 21
    }
];

var averageAge = _.reduce(people, function (sum, p) {
    return sum + p.age;
}, 0) / people.length;

console.log("Средний возраст = " + averageAge);

var list = _.chain(people)
    .filter(function (p) {
        return p.age >= 20 && p.age <= 30;
    })
    .sortBy("age")
    .value();

console.log(list);

_.each(people, function (p) {
    p.fullName = p.lastName + " " + p.name;
});

console.log(people);


