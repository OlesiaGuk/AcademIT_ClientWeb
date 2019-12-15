new Vue({
        el: "#app",
        data: {
            items: [],
            newTodoText: "",
            isInvalid: false
        },
        methods: {
            addNote: function () {
                if (this.newTodoText === "") {
                    this.isInvalid = true;
                    return;
                }

                this.isInvalid = false;

                this.items.push({
                    text: this.newTodoText
                });

                this.newTodoText = "";
                //todo: добавить фокус на поле ввода
            },

            deleteNote: function (item) {
                this.items = this.items.filter(function (x) {
                    return x !== item;
                })
            },

            editNote: function (item) {

            }
        }
    }
);

