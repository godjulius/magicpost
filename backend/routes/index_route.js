const employeeRoute=require("./employee_route");

function routesInit(app){
    app.use("/",employeeRoute);

}

module.exports = routesInit;
