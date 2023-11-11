const userRoute=require("./UserRoute");

function routesInit(app){
    app.use("/",userRoute);
}

module.exports = routesInit;