const express = require("express");

const router = express.Router();

const getContacts = require("../controllers/api-contact-controller");


//Get All Contacts
router.get("/api/contacts", getContacts);


module.exports = router;