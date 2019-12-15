new Vue({
        el: "#app",
        data: {
            items: [],
            newTodoText: "",
            isInvalid: false,
            editingText: ""
        },

        methods: {
            addNote: function () {
                if (this.newTodoText === "") {
                    this.isInvalid = true;
                    return;
                }

                this.isInvalid = false;

                this.items.push({
                    text: this.newTodoText,
                    isEditing: false,
                    isEmpty: false
                });

                this.newTodoText = "";
            },

            deleteNote: function (item) {
                this.isInvalid = false;
                this.items = this.items.filter(function (x) {
                    return x !== item;
                })
            },

            editNote: function (item) {
                this.isInvalid = false;
                item.isEditing = true;
                item.editingText = item.text;
            },

            cancelEditing: function (item) {
                item.text = item.editingText;
                item.isEditing = false;
                item.isEmpty = false; //чтобы скрыть сообщение об ошибке после попытки сохранить пустую строку
            },

            saveEditing: function (item) {
                if (item.text === "") {
                    item.isEmpty = true;
                    return;
                }

                item.isEditing = false;
                item.isEmpty = false;
            }
        }
    }
);