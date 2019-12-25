window.Vue.use(VuejsDialog.main.default);

new Vue({
    el: "#phone-book",
    data: {
        items: [],
        surname: "",
        name: "",
        phoneNumber: "",
        errors: [],
        isInvalidNumber: false,
        isEmptySurname: false,
        isEmptyName: false,
        isEmptyNumber: false,
        currentErrorId: 0,
        currentContactId: 0
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
            this.isEmptySurname = false;
            this.isEmptyName = false;
            this.isEmptyNumber = false;

            if (this.surname && this.name && this.phoneNumber && !isNaN(this.phoneNumber)) {
                this.addContact();
                this.isInvalidNumber = false;
                return true;
            }

            if (!this.surname) {
                this.isEmptySurname = true;
                this.currentErrorId++;
                this.errors.push({
                    id: this.currentErrorId,
                    errorField: "Фамилия"
                })
            }

            if (!this.name) {
                this.isEmptyName = true;
                this.currentErrorId++;
                this.errors.push({
                    id: this.currentErrorId,
                    errorField: "Имя"
                })
            }

            if (!this.phoneNumber) {
                this.isEmptyNumber = true;
                this.currentErrorId++;
                this.errors.push({
                    id: this.currentErrorId,
                    errorField: "Номер телефона"
                })
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

            this.currentContactId++;
            this.items.push({
                id: this.currentContactId,
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
            var currentInstance = this;

            this.$dialog.confirm({
                    title: "Подтвердите удаление",
                    body: "Удалить контакт с номером " + item.phoneNumberNote + "?"
                },
                {
                    okText: "Удалить",
                    cancelText: "Отмена"
                })
                .then(function () {
                    currentInstance.items = currentInstance.items.filter(function (x) {
                        return x !== item;
                    });
                })
                .catch(function () {
                    console.log("Cancelled")
                });
        },

        deleteCheckedNotes: function () {
            var currentInstance = this;

            this.$dialog.confirm({
                    title: "Подтвердите удаление",
                    body: "Удалить выбранные контакты?"
                },
                {
                    okText: "Удалить",
                    cancelText: "Отмена"
                })
                .then(function () {
                    if (currentInstance.checkedAll === true) {
                        currentInstance.items = [];
                        currentInstance.checkedAll = false;
                        return;
                    }
                    currentInstance.items = currentInstance.items.filter(function (x) {
                        return x.checked === false;
                    })
                })
                .catch(function () {
                    console.log("Cancelled")
                });
        },

        checkDuplicate: function (newPhoneNumber) {
            return this.items.find(function (x) {
                return x.phoneNumberNote === newPhoneNumber;
            });
        }
    }
});