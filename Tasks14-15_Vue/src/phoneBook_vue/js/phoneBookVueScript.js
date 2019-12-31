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
        currentErrorId: 0,
        currentContactId: 0,
        searchText: ""
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
                });
            }
        },

        filteredItems: function () {
            var text = this.searchText.toUpperCase();
            return this.items.filter(function (e) {
                return text.length === 0 || e.surnameNote.toUpperCase().indexOf(text) >= 0
                    || e.nameNote.toUpperCase().indexOf(text) >= 0
                    || e.phoneNumberNote.toUpperCase().indexOf(text) >= 0;
            });
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
                this.currentErrorId++;
                this.errors.push({
                    id: this.currentErrorId,
                    errorField: "Фамилия"
                });
            }

            if (!this.name) {
                this.currentErrorId++;
                this.errors.push({
                    id: this.currentErrorId,
                    errorField: "Имя"
                });
            }

            if (!this.phoneNumber) {
                this.currentErrorId++;
                this.errors.push({
                    id: this.currentErrorId,
                    errorField: "Номер телефона"
                });
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
            }, {
                okText: "Удалить",
                cancelText: "Отмена"
            }).then(function () {
                currentInstance.items = currentInstance.items.filter(function (x) {
                    return x !== item;
                });
            }).catch(function () {
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
                    currentInstance.items = currentInstance.items.filter(function (x) {
                        return x.checked === false
                            || (x.checked === true && currentInstance.searchText.length > 0
                                && !currentInstance.filteredItems.includes(x));
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
        },

        clearFilter: function () {
            return this.searchText = "";
        },

        isEmpty: function (fieldName) {
            if (this.errors.length > 0) {
                return this.errors.find(function (x) {
                    return x.errorField === fieldName;
                });
            }

            return false;
        }
    }
});