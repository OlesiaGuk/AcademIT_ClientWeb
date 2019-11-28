$(document).ready(function () {
    var inputText = $("#input-field");
    var addButton = $("#add-button");
    var todoList = $("#todo-list");
    var validationMessage = $(".validation-message");

    addButton.click(function () {
        var newText = inputText.val();
        if (newText === "") {
            validationMessage.show();
            inputText.focus();
            return;
        }

        var li = $("<li>");
        addNote(newText);

        function addNote(text) {
            li.html("<span></span><button type='button' class='buttons'>X</button>" +
                "<button type='button' class='buttons'>Редактировать</button>");

            var textLine = li.children().eq(0);
            textLine.text(text);

            //удаление записи
            var deleteButton = li.children().eq(1);
            deleteButton.click(function () {
                li.remove();
            });

            //редактирование записи
            var editButton = li.children().eq(2);
            editButton.click(function () {
                li.html("<input type='text'><button type='button' class='buttons'>Отменить</button>" +
                    "<button type='button' class='buttons'>Сохранить</button>" +
                    "<div class='validation-message' style='display: none;'>Введите текст!</div>");

                var editingText = li.children().eq(0);
                editingText.val(text);
                editingText.focus();

                //отменить редактирование
                var editingCancel = li.children().eq(1);
                editingCancel.click(function () {
                    addNote(text);
                });

                //сохранить изменения
                var editingSave = li.children().eq(2);
                var editingValidationMessage = li.children().eq(3);
                editingSave.click(function () {
                    var editedText = editingText.val();

                    if (editedText === "") {
                        editingValidationMessage.show();
                        editingText.focus();
                        return;
                    }

                    addNote(editedText);
                });
            });
        }

        todoList.append(li);
        inputText.val("");
        validationMessage.hide();
        inputText.focus();
    });
});