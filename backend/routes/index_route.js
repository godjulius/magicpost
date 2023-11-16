const employeeRoute = require("./employee_route");
const branchRoute = require("./branch_route");
const hubRoute = require("./hub_route");
const roleRoute = require("./role_route");

function routesInit(app) {
    app.use("/", employeeRoute);
    app.use("/", branchRoute);
    app.use("/", hubRoute);
    app.use("/", roleRoute);
}

module.exports = routesInit;
