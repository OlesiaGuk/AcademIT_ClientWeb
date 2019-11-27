$(document).ready(function () {
    var inputFields = $(".form-control");
    var surname = $("#surname");
    var name = $("#name");
    var phoneNumber = $("#phone-number");
    var addButton = $("#add-button");
    var phoneBook = $("#phone-book");
    var formValidationMessage = $(".alert-warning");
    var numberValidationMessage = $(".alert-danger");

    var notesCount = 0;

    addButton.click(function () {
        if (isNaN(phoneNumber.val())) {
            numberValidationMessage.removeClass("d-none");
            return;
        }

        numberValidationMessage.addClass("d-none");

        var formValidationError = false;
        formValidationMessage.children().remove();
        inputFields.each(function () {
            var self = $(this);
            if (self.val() === "") {
                self.addClass("is-invalid");
                var fieldName = self.parent().prev().html();
                formValidationMessage.append("<div>\"" + fieldName + "\"");
                formValidationError = true;
            }
        });

        if (formValidationError === true) {
            formValidationMessage.removeClass("d-none");
            return;
        }

        formValidationMessage.addClass("d-none");

        notesCount++;
        var tr = $("<tr>");
        tr.html("<td></td><td></td><td></td><td></td>" +
            "<td class='text-center'><button type='button' class='btn' title='Удалить'>x</button></td>");

        tr.children().eq(0).text(notesCount);
        tr.children().eq(1).text(surname.val());
        tr.children().eq(2).text(name.val());
        tr.children().eq(3).text(phoneNumber.val());

        var deleteButton = tr.children().eq(4);
        deleteButton.click(function () {
            notesCount--;
            tr.remove();
            updateNumeration();
        });

        phoneBook.append(tr);
        inputFields.val("");
    });

    inputFields.keyup(function () {
        $(this).removeClass("is-invalid");
    });

    function updateNumeration() {
        $(".table tbody tr").each(function (index) {
            $(this).find("td:first").text(index + 1);
        });
    }
});