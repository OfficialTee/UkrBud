//Express config
const express = require("express");
const server = express();
server.use(express.static(__dirname));
server.listen(7777, () => {
    console.log("Express server started");
});

//BodyParser config
const bodyParser = require("body-parser");
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());

//Ejs config
server.set("view engine", "ejs");

//MongoDB config
const mongo = require("mongodb");
const {ObjectId} = require("mongodb");
const MongoClient = mongo.MongoClient;
const url = "mongodb://localhost:27017/";
const mongoClient = new MongoClient(url, {useUnifiedTopology: true});
let db;
let flats;
let requests;
mongoClient.connect((error, client) => {
    db = client.db("KyivFutureBud");
    flats = db.collection("flats");
    requests = db.collection("requests");
});

//Home page
server.get("/", (req, res) => {
    res.render("home");
});

//About page
server.get("/about", (req, res) => {
    res.render("about");
});

//Contacts page
server.get("/contacts", (req, res) => {
    res.render("contacts");
});

//Flats page
server.get("/flats", (req, res) => {
    flats.find({available: true}).limit(12).toArray(async (error, result) => {
        res.render("flats", {
            flats: result,
            types: await flats.distinct("type"),
            statuses: await flats.distinct("status"),
            rooms: await flats.distinct("rooms"),
            sections: await flats.distinct("section"),
            buildings: await flats.distinct("building")
        });
    });
});