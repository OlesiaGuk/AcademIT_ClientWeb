$(document).ready(function () {
    var inputFields = $(".form-control");
    var surname = $("#surname");
    var name = $("#name");
    var phoneNumber = $("#phone-number");
    var addButton = $("#add-button");
    var phoneBook = $("#phone-book");

    var notesCount = 0;

    addButton.click(function () {
        var validationError = false;
        inputFields.each(function () {
            if ($(this).val() === "") {
                $(this).addClass("is-invalid");
                $(this).next().show();
                validationError = true;
            }
        });

        if (validationError === true) {
            return;
        }

        notesCount++;
        var tr = $("<tr>");
        tr.html("<td></td><td></td><td></td><td></td>" +
            "<td class='text-center'><button type='button' class='btn'>x</button></td>");

        var notesCountText = tr.children().eq(0);
        var surnameText = tr.children().eq(1);
        var nameText = tr.children().eq(2);
        var phoneNumberText = tr.children().eq(3);
        var deleteButton = tr.children().eq(4);

        notesCountText.text(notesCount);
        surnameText.text(surname.val());
        nameText.text(name.val());
        phoneNumberText.text(phoneNumber.val());

        deleteButton.click(function () {
            notesCount--;
            tr.remove();
            updateNumeration();
        });

        phoneBook.append(tr);
        inputFields.each(function () {
            $(this).val("");
        })
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