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
                }, {
                    model: Delivery,
                    required: true,
                }, {
                    model: Employee,
                    required: true,
                    attributes: {
                        exclude: ["password", "address", "dob"],
                    },
                }, {
                    model: Parcel,
                    required: true,
                },
            ],
        });
        return res.status(200).json(orders);
    }

    //GET order/tracking
    async getOrderByIds(req, res, next) {
        const searchValue = req.body.searchValue;
        const orderIds = searchValue.split(",");
        console.log(orderIds);
        let result = [];
        for (let orderId of orderIds) {
            const order = await Order.findOne({
                where: {
                    order_id: orderId,
                },
                include: [
                    {
                        model: Customer,
                        required: true,
                        attributes: [
                            [sequelize.fn("concat", sequelize.col("Customer.first_name"), " ", sequelize.col("Customer.last_name")), "fullName"],
                        ],
                    }, {
                        model: Delivery,
                        required: true,
                    }, {
                        model: Employee,
                        required: true,
                        attributes: [
                            [sequelize.fn("concat", sequelize.col("Employee.first_name"), " ", sequelize.col("Employee.last_name")), "fullName"],
                        ],
                    }, {
                        model: Parcel,
                        required: true,
                    },
                ],
            });
            if (!order) {
                result.push({
                    msg: `Can't find the order with id ${orderId}`,
                });
            } else {
                result.push({
                    order: order,
                    msg: `Tracking successfully!`,
                });
            }
        }
        return res.status(200).json(result);
    }

    //POST /order/create
    async createOrder(req, res, next) {
        const {
            firstName,
            lastName,
            province,
            district,
            detailAddress,
            receiverName,
            receiverProvince,
            receiverDistrict,
            phone,
            typeId,
            weight,
            price,
            details,
            receiverPhone,
            receiverDetailAddress
        } = req.body;
        //create customer
        const email = () => {
            if (req.body.email) {
                return req.body.email;
            }
        }
        const address = `${detailAddress}, ${district}, ${province}`;
        const customer = await Customer.create({
            first_name: firstName,
            last_name: lastName,
            address: address,
            email: email(),
            phone: phone,
        });

        //create parcel
        // const branchId = req.session.branchId;
        const branchId = 4;
        const parcel = await Parcel.create({
            branch_id: branchId,
            weight: weight,
            price: price,
            type_id: typeId,
            details: details,
        });


        //create delivery
        const receiverAddress = `${receiverDetailAddress}, ${receiverDistrict}, ${receiverProvince}`;
        const today = new Date();
        const delivery = await Delivery.create({
            receiver_id: branchId,
            receive_date: today,
            receiver_name: receiverName,
            receiver_phone: receiverPhone,
            receiver_address: receiverDetailAddress,
        });

        //create order
        // const employeeId = req.session.employeeId;
        const employeeId = 2;
        const orderId = generateRandomString();
        const order = await Order.create({
            order_id: orderId,
            customer_id: customer.customer_id,
            delivery_id: delivery.delivery_id,
            parcel_id: parcel.parcel_id,
            employee_id: employeeId,
            order_date: today,
        });
        return res.status(200).json({
            msg: "Create order success!",
            order: order,
        });
    }
}

function generateRandomString() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const length = 10;
    let randomString = '';
    for (let i = 0; i < length; ++i) {
        randomString += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return randomString;
}


module.exports = new OrderController();
