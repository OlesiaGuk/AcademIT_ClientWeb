import Ajax from "./ajax";

export default {
    addContact(contact) {
        return Ajax.post("/addContact", contact);
    },

    deleteContact(id) {
        return Ajax.post("/deleteContact", {id});
    },

    deleteCheckedContacts(data) {
        return Ajax.post("/deleteCheckedContacts", data);
    },

    getContacts(term) {
        const data = {
            term,
            timeStamp: new Date().toISOString()
        };

        return Ajax.get("/getContacts", data);
    }
};
