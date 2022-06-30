const Contact = require("../models/contact");


const handleError = (res, error) => {
    res.status(500).send(error);
};


const getContacts = (req, res) => {
    Contact
        .find()
        .then((post) => res.status(200).json(post))
        .catch((error) => handleError(res, error));
};


module.exports = getContacts;