import Ajax from "./ajax";

export default {
    addContact: function (contact) {
        return Ajax.post("/addContact", contact);
    },

    deleteContact: function (id) {
        return Ajax.post("/deleteContact", {id: id});
    },

    deleteCheckedContacts: function (data) {
        return Ajax.post("/deleteCheckedContacts", data);
    },

    getContacts: function (term) {
        var data = {
            term: term,
            timeStamp: new Date().toISOString()
        };

        return Ajax.get("/getContacts", data);
    }
};
