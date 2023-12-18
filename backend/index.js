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
    credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(
    session({
            resave: false,
            saveUninitialized: true,
            secret: "never-go-wrong",
            cookie: {
                secure: false
            }
        }
    )
)

app.use(express.urlencoded({extended: true}));

routesInit(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});