import "bootstrap/dist/css/bootstrap.css";
import "jquery-confirm/css/jquery-confirm.css";
import "../css/style.scss";

import "bootstrap";
import Vue from "vue";

import PhoneBookComponent from "./PhoneBook.vue";

new Vue({
    el: "#phone-book",
    components: {
        "phone-book": PhoneBookComponent
    }
});