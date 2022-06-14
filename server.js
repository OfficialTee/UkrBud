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

//Filtering flats
server.post("/flats", (req, res) => {
    let filters = {
        type: req.body.type,
        status: req.body.status,
        sqrtFrom: req.body.sqrtFrom,
        sqrtTo: req.body.sqrtTo,
        rooms: req.body.rooms,
        floorFrom: req.body.floorFrom,
        floorTo: req.body.floorTo,
        section: req.body.section,
        building: req.body.building
    }

    let mongoFilters = JSON.parse(filterObject(filters));
    flats.find(mongoFilters).toArray(async (error, result) => {
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

//Reformatting Flats form to Mongo Query
function filterObject(filters) {
    let query = '{"$and": [';
    let clear = true;

    let type = "", status = "", sqrt = "", rooms = "", floor = "", section = "", building = "";

    if (filters.type) {
        type = universalPart(filters.type, "type");
        clear = false;
    }
    if (filters.status) {
        status = universalPart(filters.status, "status");
        clear = false;
    }
    if (filters.sqrtTo || filters.sqrtFrom) {
        sqrt = `{"sqr_all": {"$gte": ${filters.sqrtFrom ? filters.sqrtFrom : 0},"$lte": ${filters.sqrtTo ? filters.sqrtTo : 1000}}},`;
        clear = false;
    }
    if (filters.rooms) {
        rooms = universalPart(filters.rooms, "rooms");
        clear = false;
    }
    if (filters.floorFrom || filters.floorTo) {
        floor = `{"floor": {"$gte": ${filters.floorFrom ? filters.floorFrom : 0},"$lte": ${filters.floorTo ? filters.floorTo : 30}}},`;
        clear = false;
    }
    if (filters.section) {
        section = universalPart(filters.section, "section");
        clear = false;
    }
    if (filters.building) {
        building = universalPart(filters.building, "building");
        clear = false;
    }

    query += type + status + sqrt + rooms + floor + section + building;
    query += '{"available": true}';
    query += "]}"

    console.log(query);
    return clear ? "{}" : query;
}

//Function that universally reformats repeating filter value
function universalPart(value, name) {
    let part = "";
    if (Array.isArray(value)) {
        part += '{"$or": ['
        for (let i = 0; i < value.length; i++) part += `{"${name}": ${isNaN(value[i]) ? '"' + value[i] + '"' : value[i]}},`
        part = part.slice(0, -1);
        part += "]},"
    } else {
        part += `{"${name}": ${isNaN(value) ? '"' + value + '"' : value}},`
    }
    return part;
}
