const {models: {Delivery, Order, Branch, Parcel}} = require("../models");
const Joi = require("joi");
const {or} = require("sequelize");

class DeliveryController {
    //GET /delivery
    async getAllDelivery(req, res, next) {
        const deliveries = await Delivery.findAll();
        return res.status(200).json(deliveries);
    }

    //POST /delivery/:deliveryId/transshipment
    async transshipment(req, res) {
        const idSchema = Joi.number().integer().min(1);
        const objectIdSchema = Joi.object({
            customerId: idSchema.required(),
            employeeId: idSchema.required(),
        });

        const dataToValidate = {
            customerId: req.params.deliveryId,
            employeeId: req.body.receiverId,
        }

        const result = objectIdSchema.validate(dataToValidate);

        if (result.error) {
            return res.status(400).send("Bad request");
        }
        const deliveryId = req.params.deliveryId;
        let delivery = await Delivery.findOne({
            where: {
                delivery_id: deliveryId,
            },
        });
        if (!delivery) {
            return res.status(404).json({
                msg: `Delivery with id ${deliveryId} is not found!`,
            });
        }
        const receiverId = req.body.receiverId;
        const receiver = await Branch.findOne({
            where: {
                branch_id: receiverId,
            }
        });
        if (!receiver) {
            return res.status(404).json({
                msg: "Branch not found",
            })
        }

        const senderId = delivery.receiver_id;

        await Delivery.update({
                sender_id: senderId,
                receiver_id: receiverId,
            }, {
                where: {
                    delivery_id: deliveryId,
                },
            }
        );
        delivery = await Delivery.findOne({
            where: {
                delivery_id: deliveryId,
            },
        });

        return res.status(200).json(delivery);
    }

    //POST /delivery/create
    async createDelivery(req, res) {

        if (!req.session.User) {
            return res.status(401).json({
                msg: "Login first",
            })
        }
        const order = req.body.orderId;
        const sender = req.session.User.branchId;
        const receiver = req.body.receiverId;
        const sendDate = new Date();
        if (!(await Order.findOne({
            where: {
                order_id: order,
            }
        }))) {
            return res.status(404).json({
                msg: "Order not found",
            })
        }
        if (!(await Branch.findOne({
            where: {
                branch_id: receiver,
            }
        }))) {
            return res.status(404).json({
                msg: "Branch not found",
            })
        }
        const delivery = await Delivery.create({
            order_id: orderId,
            sender_id: sender,
            receiver_id: receiver,
            send_date: sendDate
        });

        return res.status(200).json({
            msg: "Create successfully",
            delivery: delivery,
        });
    }

    //POST /delivery/:deliveryId/receive
    async receiveDelivery(req, res) {

        if (!req.session.User) {
            return res.status(401).json({
                msg: "Login first",
            })
        }
        const deliveryId = req.params.deliveryId;
        const receiveDate = new Date();
        const delivery = await Delivery.findOne({
            where: {
                delivery_id: deliveryId,
            }
        });
        if (!delivery) {
            return res.status(404).json({
                msg: "Delivery not found",
            });
        }
        await delivery.update({
            send_date: receiveDate,
        });
        return res.status(200).json(delivery);
    }

    //GET /delivery/:orderId
    async getPath(req, res) {

        const orderId = req.params.orderId;
        const order = await Order.findOne({
            where: {
                order_id: orderId,
            }
        });
        if (!order) {
            return res.status(404).json({
                nsg: "Order not found",
            })
        }
        const path = await Delivery.findAll({
            where: {
                order_id: orderId,
            }
        });
        return res.status(200).json({
            path: path,
        })

    }

}

module.exports = new DeliveryController();

