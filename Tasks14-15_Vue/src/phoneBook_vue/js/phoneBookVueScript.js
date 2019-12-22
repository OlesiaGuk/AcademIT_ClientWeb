window.Vue.use(VuejsDialog.main.default);

new Vue({
    el: "#phone-book",
    data: {
        items: [],
        surname: "",
        name: "",
        phoneNumber: "",
        errors: [],
        isInvalidNumber: false

    },

    computed: {
        checkedAll: {
            get: function () {
                return this.items.length > 0 && this.items.every(function (x) {
                    return x.checked;
                });
            },

            set: function (val) {
                this.items.forEach(function (x) {
                    x.checked = val;
                })
            }
        }
    },

    methods: {
        checkForm: function () {
            this.errors = [];

            if (this.surname && this.name && this.phoneNumber && !isNaN(this.phoneNumber)) {
                this.addContact();
                this.isInvalidNumber = false;
                return true;
            }

            if (!this.surname) {
                this.errors.push("Фамилия")
            }

            if (!this.name) {
                this.errors.push("Имя")
            }

            if (!this.phoneNumber) {
                this.errors.push("Номер телефона")
            }

            if (isNaN(this.phoneNumber)) {
                this.isInvalidNumber = true;
                return;
            }
            this.isInvalidNumber = false;
        },

        addContact: function () {
            if (this.checkDuplicate(this.phoneNumber)) {
                this.$dialog.alert('Номер ' + this.phoneNumber + ' уже есть в списке контактов', {okText: "ОК"});
                return;
            }

            this.items.push({
                surnameNote: this.surname,
                nameNote: this.name,
                phoneNumberNote: this.phoneNumber,
                checked: false
            });

            this.surname = "";
            this.name = "";
            this.phoneNumber = "";
        },

        deleteNote: function (item) {

            this.$dialog.confirm({
                    title: "Подтвердите удаление",
                    body: "Удалить контакт с номером " + item.phoneNumberNote + "?"
                },
                {
                    okText: "Удалить",
                    cancelText: "Отмена"
                })
                .then(function (dialog) {
                    this.items = this.items.filter(function (x) {
                        return x !== item;
                    });
                    console.log("???");

                })
                .catch(function () {
                    console.log("cancelled")
                });


        },

        deleteCheckedNotes: function () {
            if (this.checkedAll === true) {
                this.items = [];
                this.checkedAll = false;
                return;
            }

            this.items = this.items.filter(function (x) {
                return x.checked !== true;
            });
        },

        checkDuplicate: function (newPhoneNumber) {
            return this.items.find(function (x) {
                return x.phoneNumberNote === newPhoneNumber;
            });
        }
    }

})
;