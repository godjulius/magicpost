const {models: {Customer, Order}} = require("../models");

class CustomerController {
    //GET /customer
    async getAllCustomers(req, res, next) {
        const employeeId=req.session.employeeId;
        if(!employeeId){
            return res.status(403).json({
                msg:"You must login first!",
            });
        }
        const customers = await Customer.findAll({
            include: [
                {
                    model: Order,
                    required: true,
                }
            ],
        });
        return res.status(200).json(customers);
    }

    //GET /customer/:customerId
    async getCustomerById(req, res, next) {

    }
}

module.exports = new CustomerController();
