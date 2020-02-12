var express = require('express');
var router = express.Router();

var contacts = [];
var id = 1;

router.get("/getContacts", function (req, res) {
    var term = (req.query.term || "").toUpperCase();
    res.send(
        contacts.filter(function (c) {
            return term === "" || c.surname.toUpperCase().indexOf(term) >= 0
                || c.name.toUpperCase().indexOf(term) >= 0
                || c.phoneNumber.toUpperCase().indexOf(term) >= 0;
        })
    );
});

router.post("/addContact", function (req, res) {
    var contact = req.body;

    var index = contacts.findIndex(function (c) {
        return contact.phoneNumber.toUpperCase() === c.phoneNumber.toUpperCase();
    });
    if (index >= 0) {
        res.send({
            success: false,
            message: "Контакт с номером " + contact.phoneNumber + " уже есть в списке контактов"
        });
        return;
    }

    contact.id = id;
    ++id;
    contacts.push(contact);

    res.send({
        success: true,
        message: null
    });
});

router.post("/deleteContact", function (req, res) {
    var id = req.body.id;

    contacts = contacts.filter(function (c) {
        return c.id !== id;
    });

    res.send({
        success: true,
        message: null
    });
});

router.post("/deleteCheckedContacts", function (req, res) {
    var id = req.body;

    contacts = contacts.filter(function (c) {
        return !id.includes(c.id);
    });

    res.send({
        success: true,
        message: null
    });
});


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index');
});

module.exports = router;
