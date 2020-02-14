<template>
    <div>
        <h1 class="text-center mb-4 font-italic">Телефонная книга</h1>
        <div class="container">
            <div class="row">
                <div class="col-md-4">
                    <form>
                        <div class="text-center h5"><label>Добавить новый контакт</label></div>
                        <div class="form-group row">
                            <label class="col-sm-4 col-form-label" for="surname">Фамилия</label>
                            <div class="col-sm-8">
                                <input :class="{'is-invalid':isEmpty('Фамилия')}" class="form-control" id="surname"
                                       type="text"
                                       v-model="surname">
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-4 col-form-label" for="name">Имя</label>
                            <div class="col-sm-8">
                                <input :class="{'is-invalid':isEmpty('Имя')}" class="form-control" id="name" type="text"
                                       v-model="name">
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-5 col-form-label" for="phone-number">Номер
                                телефона</label>
                            <div class="col-sm-7">
                                <input :class="{'is-invalid':isEmpty('Номер телефона') || isInvalidNumber}" class="form-control"
                                       id="phone-number"
                                       type="tel" v-model="phoneNumber">
                            </div>
                        </div>


                        <template v-if="errors.length">
                            <div class="row">
                                <div class="col-12">
                                    <div class="alert alert-warning text-right">Необходимо заполнить поля:
                                        <ul class="list-unstyled">
                                            <li :key="error.id" v-for="error in errors">{{ error.errorField }}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </template>

                        <div class="row" v-cloak>
                            <div class="col-12">
                                <div class="alert alert-danger text-right" v-if="isInvalidNumber">
                                    Некорректный номер телефона!
                                </div>
                            </div>
                        </div>

                        <div class="form-group row">
                            <div class="col-sm-12 text-right">
                                <button @click="checkForm" class="btn btn-outline-primary btn-sm" id="add-button"
                                        type="button">
                                    Добавить контакт
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                <div class="col-md-8">
                    <div class="text-center h5"><label>Контакты</label></div>
                    <div class="row">
                        <div class="col-md-8 input-group">
                            <input class="form-control mb-1 mr-1" placeholder="Фильтр" type="text" v-model="searchText">
                            <button @click="search" class="btn btn-outline-primary btn-sm mb-1 mr-2" type="button">Поиск
                            </button>
                            <button @click="clearSearch" class="btn btn-outline-primary btn-sm mb-1" type="button">
                                Очистить
                            </button>
                        </div>
                    </div>

                    <table class="table table-bordered table-striped table-sm">
                        <thead>
                        <tr>
                            <th class="align-middle text-center"><input type="checkbox" v-model="checkedAll"></th>
                            <th class="align-middle text-center">№</th>
                            <th class="align-middle text-center">Фамилия</th>
                            <th class="align-middle text-center">Имя</th>
                            <th class="align-middle text-center">Номер телефона</th>
                            <th class='text-center'>
                                <button @click="deleteCheckedContacts" class="btn" title="Удалить выбранные"
                                        type="button">x
                                </button>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr :key="item.id" v-cloak v-for="(item, index) in items">
                            <td class="align-middle text-center"><input type="checkbox" v-model="item.checked"></td>
                            <td class="align-middle">{{ index + 1 }}</td>
                            <td class="align-middle" v-text="item.surname"></td>
                            <td class="align-middle" v-text="item.name"></td>
                            <td class="align-middle" v-text="item.phoneNumber"></td>
                            <td class='text-center'>
                                <button @click="deleteContact(item)" class="btn" title="Удалить" type="button">x
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import $ from "jquery";
    import "jquery-confirm";

    import PhoneBookService from "./phoneBookService";

    export default {
        data() {
            return {
                items: [],
                surname: "",
                name: "",
                phoneNumber: "",
                searchText: "",
                errors: [],
                isInvalidNumber: false,
                currentErrorId: 0
            };
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
    };
</script>
