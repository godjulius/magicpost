const {models: {Delivery, Order, Branch, Parcel}} = require("../models");
const Joi = require("joi");
const {or} = require("sequelize");

class DeliveryController {
    //GET /delivery
    async getAllDelivery(req, res, next) {
        const deliveries = await Delivery.findAll();
        return res.status(200).json(deliveries);
    }

    //POST /delivery/create
    async createDelivery(req, res) {

        if (!req.session.User) {
            return res.status(401).json({
                msg: "Login first",
            })
        }
        const orderId = req.body.orderId;
        const sender = req.session.User.branchId;
        const receiver = req.body.receiverId;
        const sendDate = new Date();
        const order = await Order.findOne({
            where: {
                order_id: orderId,
            },
            include: [
                {
                    model: Parcel,
                    required: true,
                },
            ],
        });
        if (!order) {
            return res.status(404).json({
                msg: "Order not found",
            })
        }
        if (order.parcel.branch_id !== sender) {
            return res.status(403).json({
                msg: "Forbidden",
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
        await order.update({
            status_id: 2,
        });
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
        const order = await Order.findOne({
            where: {
                order_id: delivery.order_id,
            },
            include: Parcel,
        });
        await order.parcel.update({
            branch_id: req.session.User.branchId,
        })
        await delivery.update({
            receive_date: receiveDate,
        });

        return res.status(200).json(delivery);
    }

    //GET /delivery/:orderId
    async getPath(req, res) {
        const orderId = req.params.orderId
        const order = await Order.findOne({
            where: {
                order_id: orderId,
            }
        });
        if (!order) {
            return res.status(404).json({
                msg: "Order not found",
            })
        }
        const path = await Delivery.findAll({
            where: {
                order_id: orderId,
            }
        });
        return res.status(200).json(path);
    }

}

module.exports = new DeliveryController();

