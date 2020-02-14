import "bootstrap/dist/css/bootstrap.css";
import "jquery-confirm/css/jquery-confirm.css";
import "../css/style.scss";

import $ from "jquery";
import "jquery-confirm";
import Vue from "vue";
import "bootstrap";

import PhoneBookService from "./phoneBookService";

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

    created() {
        this.loadData();
    },

    computed: {
        checkedAll: {
            get() {
                return this.items.length > 0 && this.items.every(x => {
                    return x.checked;
                });
            },

            set(val) {
                this.items.forEach(x => {
                    x.checked = val;
                });
            }
        }
    },

    methods: {
        loadData() {
            PhoneBookService.getContacts(this.searchText).done(contacts => {
                this.items = contacts;
            }).fail(() => {
                $.alert("Ошибка на сервере");
            });
        },

        checkForm() {
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

        addContact() {
            const data = {
                surname: this.surname,
                name: this.name,
                phoneNumber: this.phoneNumber,
                checked: false
            };

            PhoneBookService.addContact(data).done(response => {
                if (!response.success) {
                    $.alert(response.message);
                    return;
                }

                this.loadData();

                this.surname = "";
                this.name = "";
                this.phoneNumber = "";
            }).fail(() => {
                $.alert("Ошибка на сервере");
            });
        },

        deleteContact(c) {
            const self = this; //для корректной работы с jquery-confirm

            $.confirm({
                title: "Подтвердите удаление",
                content: "Удалить выбранный контакт?",
                buttons: {
                    ok: {
                        text: "Удалить",
                        btnClass: 'btn-primary',
                        keys: ['enter'],
                        action() {
                            PhoneBookService.deleteContact(c.id).done(response => {
                                if (!response.success) {
                                    $.alert(response.message, {okText: "ОК"});
                                    return;
                                }
                                self.loadData();
                            }).fail(() => {
                                $.alert("Ошибка на сервере");
                            });
                        }
                    },
                    cancel: {
                        text: "Отмена"
                    }
                }
            })
        },

        search() {
            this.loadData();
        },

        clearSearch() {
            this.searchText = "";
            this.loadData();
        },

        deleteCheckedContacts() {
            const data = this.items.filter(c => {
                return c.checked;
            }).map(c => {
                return c.id;
            });

            const self = this; //для корректной работы с jquery-confirm

            $.confirm({
                title: "Подтвердите удаление",
                content: "Удалить выбранные контакты?",
                buttons: {
                    ok: {
                        text: "Удалить",
                        btnClass: 'btn-primary',
                        keys: ['enter'],
                        action() {
                            PhoneBookService.deleteCheckedContacts(data).done(response => {
                                if (!response.success) {
                                    $.alert(response.message, {okText: "ОК"});
                                    return;
                                }
                                self.loadData();
                            }).fail(() => {
                                $.alert("Ошибка на сервере");
                            });
                        }
                    },
                    cancel: {
                        text: "Отмена"
                    }
                }
            })
        },

        isEmpty(fieldName) {
            if (this.errors.length > 0) {
                return this.errors.map(e => {
                    return e.errorField;
                }).indexOf(fieldName) >= 0;
            }

            return false;
        }
    }
});


