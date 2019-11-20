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

            var textLine = li.children[0];
            textLine.textContent = text;

            //удаление записи
            var deleteButton = li.children[1];
            deleteButton.addEventListener("click", function () {
                todoList.removeChild(li);
            });

            //редактирование записи
            var editButton = li.children[2];
            editButton.addEventListener("click", function () {
                li.innerHTML = "<input type='text'><button type='button' class='buttons'>Отменить</button>" +
                    "<button type='button' class='buttons'>Сохранить</button>";

                var editingText = li.children[0];
                editingText.value = text;
                editingText.focus();

                //отменить редактирование
                var editingCancel = li.children[1];
                editingCancel.addEventListener("click", function () {
                    addNote(text);
                });

                //сохранить изменения
                var editingSave = li.children[2];
                editingSave.addEventListener("click", function () {
                    var editedText = editingText.value;
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