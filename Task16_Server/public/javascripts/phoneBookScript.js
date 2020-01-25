window.Vue.use(VuejsDialog.main.default);

function post(url, data) {
    return $.post({
        url: url,
        data: JSON.stringify(data),
        contentType: "application/json"
    });
}

function get(url, data) {
    return $.get(url, data);
}

new Vue({
    el: "#phone-book",
    data: {
        items: [],
        surname: "",
        name: "",
        phoneNumber: "",
        searchText: "",
        errors: [],
        isInvalidNumber: false,
        currentErrorId: 0
    },

    created: function () {
        this.loadData();
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
        }
    },

    methods: {
        loadData: function () {
            var self = this;

            var data = {
                term: this.searchText
            };

            get("/getContacts", data).done(function (contacts) {
                self.items = contacts;
            }).fail(function () {
                self.$dialog.alert("Ошибка на сервере");

            });
        },

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
            var data = {
                surname: this.surname,
                name: this.name,
                phoneNumber: this.phoneNumber,
                checked: false
            };

            var self = this;

            post("/addContact", data).done(function (response) {
                if (!response.success) {
                    self.$dialog.alert(response.message, {okText: "ОК"});
                    return;
                }

                self.loadData();

                self.surname = "";
                self.name = "";
                self.phoneNumber = "";
            }).fail(function () {
                self.$dialog.alert("Ошибка на сервере");
            });
        },

        deleteContact: function (c) {
            var self = this;

            this.$dialog.confirm({
                title: "Подтвердите удаление",
                body: "Удалить выбранный контакт?"
            }, {
                okText: "Удалить",
                cancelText: "Отмена"
            }).then(function () {
                post("/deleteContact", {id: c.id}).done(function (response) {
                    if (!response.success) {
                        self.$dialog.alert(response.message, {okText: "ОК"});
                        return;
                    }
                    self.loadData();
                }).fail(function () {
                    self.$dialog.alert("Ошибка на сервере");
                });
            });
        },

        search: function () {
            this.loadData();
        },

        clearSearch: function () {
            this.searchText = "";
            this.loadData();
        },

        deleteCheckedContacts: function () {
            var data = this.items.filter(function (c) {
                return c.checked;
            }).map(function (c) {
                return c.id;
            });

            var self = this;

            this.$dialog.confirm({
                    title: "Подтвердите удаление",
                    body: "Удалить выбранные контакты?"
                },
                {
                    okText: "Удалить",
                    cancelText: "Отмена"
                })
                .then(function () {
                    post("/deleteCheckedContacts", data).done(function (response) {
                        if (!response.success) {
                            self.$dialog.alert(response.message, {okText: "ОК"});
                            return;
                        }
                        self.loadData();
                    }).fail(function () {
                        self.$dialog.alert("Ошибка на сервере");
                    });
                });
        },

        isEmpty: function (fieldName) {
            if (this.errors.length > 0) {
                return this.errors.map(function (e) {
                    return e.errorField;
                }).indexOf(fieldName) >= 0;
            }

            return false;
        }
    }
});
