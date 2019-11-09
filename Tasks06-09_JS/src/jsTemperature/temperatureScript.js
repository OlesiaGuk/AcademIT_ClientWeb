document.addEventListener("DOMContentLoaded", function () {
    var inputCelsius = document.getElementById("input-celsius");
    var outputKelvin = document.getElementById("output-kelvin");
    var outputFahrenheit = document.getElementById("output-fahrenheit");

    var validationMassage = document.querySelector(".validation-message");

    var convertButton = document.getElementById("convert-button");
    convertButton.addEventListener("click", function () {
        var inputTemp = inputCelsius.value;

        if (isNaN(inputTemp) || inputTemp === "") {
            outputKelvin.value = "";
            outputFahrenheit.value = "";
            validationMassage.style.display = "block";
            return;
        }

        validationMassage.style.display = "none";
        outputKelvin.value = +inputTemp + 273.15;
        outputFahrenheit.value = +inputTemp * 9 / 5 + 32;
    });
});