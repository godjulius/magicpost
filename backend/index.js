const express = require("express");
const cors = require("cors");
const routesInit = require("./routes/index_route");
const session = require("express-session");

const app = express();
const db = require("./models");
(async () => {
    await db.sequelize.sync();
})();

const corsOptions = {
    origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

app.use(session({
        resave: true,
        saveUninitialized: true,
        secret: "never-go-wrong",
        cookie: {
            secure: false
        }
    })
)

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));

// simple route
app.get("/", (req, res) => {

    res.json({message: "Test server 2"});

});

routesInit(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});