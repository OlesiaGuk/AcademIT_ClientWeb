document.addEventListener("DOMContentLoaded", function () {
    var inputText = document.getElementById("input-field");
    var addButton = document.getElementById("add-button");
    var todoList = document.getElementById("todo-list");
    var validationMessage = document.querySelector(".validation-message");

    addButton.addEventListener("click", function () {
        var newText = inputText.value;
        if (newText === "") {
            validationMessage.style.display = "block";
            inputText.focus();
            return;
        }

        var li = document.createElement("li");
        addNote(newText);

        function addNote(text) {
            li.innerHTML = "<span></span><button type='button' class='buttons'>X</button>" +
                "<button type='button' class='buttons'>Редактировать</button>";

            li.children[0].textContent = text;

            //удаление записи
            li.children[1].addEventListener("click", function () {
                todoList.removeChild(li);
            });

            //редактирование записи
            li.children[2].addEventListener("click", function () {
                li.innerHTML = "<input type='text'><button type='button' class='buttons'>Отменить</button>" +
                    "<button type='button' class='buttons'>Сохранить</button>";

                li.children[0].value = text;
                li.children[0].focus();

                //отменить редактирование
                li.children[1].addEventListener("click", function () {
                    addNote(text);
                });

                //сохранить изменения
                li.children[2].addEventListener("click", function () {
                    var editedText = li.children[0].value;
                    addNote(editedText);
                });
            });
        }

        todoList.appendChild(li);
        inputText.value = "";
        validationMessage.style.display = "none";
        inputText.focus();
    });
});