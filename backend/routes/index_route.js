const employeeRoute = require("./employee_route");
const branchRoute = require("./branch_route");
const hubRoute = require("./hub_route");
const roleRoute = require("./role_route");
const sessionDataRoute = require("./session_data_route");
const customerRoute = require("./customer_route");
const orderRoute = require("./order_route");
const deliveryRoute = require("./delivery_route");
const parcelRoute = require("./parcel_route");
const toolRoute = require("./tool_route");

function routesInit(app) {
    app.use("/", employeeRoute);
    app.use("/", branchRoute);
    app.use("/", hubRoute);
    app.use("/", roleRoute);
    app.use("/", customerRoute);
    app.use("/", orderRoute);
    app.use("/", deliveryRoute);

    app.use("/", parcelRoute);
    app.use("/", toolRoute);
    app.use("/", sessionDataRoute);
}

module.exports = routesInit;
