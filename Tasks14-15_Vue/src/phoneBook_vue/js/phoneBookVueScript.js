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
    methods: {
        checkForm: function () {
            this.errors = [];

            if (this.surname && this.name && this.phoneNumber && !isNaN(this.phoneNumber)) {
                this.addContact();
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
            this.items.push({
                surnameNote: this.surname,
                nameNote: this.name,
                phoneNumberNote: this.phoneNumber,
            });

            this.surname = "";
            this.name = "";
            this.phoneNumber = "";
        },


    }

});