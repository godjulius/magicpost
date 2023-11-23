const {models: {Order, Customer, Delivery, Employee, Parcel}} = require("../models");
const db = require("../models");
const {or} = require("sequelize");
const sequelize = require("sequelize");

class OrderController {
    //GET /order
    async getAllOrders(req, res, next) {
        const orders = await Order.findAll({
            include: [
                {
                    model: Customer,
                    required: true,
                    attributes: [
                        [sequelize.fn('concat', sequelize.col('first_name'), ' ',
                            sequelize.col('last_name')), 'customerFullName'],
                    ],
                }, {
                    model: Delivery,
                    required: true,
                }, {
                    model: Employee,
                    required: true,
                    attributes: [sequelize.fn('concat', sequelize.col('first_name'), ' ',
                        sequelize.col('last_name')), 'employeeFullName'],
                }, {
                    model: Parcel,
                    required: true,
                },
            ],
        });
        return res.status(200).json(orders);
    }

    //GET order/:orderId
    async getOrderById(req, res, next) {
        const order = await Order.findOne({
            where: {
                order_id: req.params.orderId,
            },
            include: [
                {
                    model: Customer,
                    required: true,
                    attributes: [
                        [sequelize.fn('concat', sequelize.col('first_name'), ' ',
                            sequelize.col('last_name')), 'customerFullName'],
                    ],
                }, {
                    model: Delivery,
                    required: true,
                }, {
                    model: Employee,
                    required: true,
                    attributes: [sequelize.fn('concat', sequelize.col('first_name'), ' ',
                        sequelize.col('last_name')), 'employeeFullName'],
                }, {
                    model: Parcel,
                    required: true,
                },
            ],
        });
        if (!order) {
            res.status(200).json({
                msg: `Can't find the order with id ${req.params.orderId}`,
            })
        }
        return res.status(200).json(order);
    }

    //POST /order/create
    async createOrder(req, res, next) {

        //create customer
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const address = req.body.address;
        const email = () => {
            if (req.body.email) {
                return req.body.email;
            }
        }
        const phone = req.body.phone;
        const customer = await Customer.create({
            first_name: firstName,
            last_name: lastName,
            address: address,
            email: email(),
            phone: phone,
        });

        //create parcel
        const branchId = req.session.branchId;
        const weight = req.body.weight;
        const price = req.body.price;
        const details = req.body.details;
        const parcel = await Parcel.create({
            branch_id: branchId,
            weight: weight,
            price: price,
            details: details,
        });


        //create delivery
        const today = await db.sequelize.query("SELECT DATE(NOW()) as today", {type: db.sequelize.QueryTypes.SELECT});
        const delivery = await Delivery.create({
            receiver_id: branchId,
            receive_date: today[0].today,
            status: 0,
        });

        //create order
        const employeeId = req.session.employeeId;
        const order = await Order.create({
            order_id: this.generateRandomString(),
            customer_id: customer.customer_id,
            delivery_id: delivery.delivery_id,
            parcel_id: parcel.parcel_id,
            employee_id: employeeId,
            order_date: today[0].today,
        });
        return res.status(200).json({
            msg: "Create order success!",
            order: order,
        });
    }

    generateRandomString() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const length = 10;
        let randomString = '';
        for (let i = 0; i < length; ++i) {
            randomString += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return randomString;
    }


}

module.exports = new OrderController();