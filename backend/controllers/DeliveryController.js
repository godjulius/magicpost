const {models: {Delivery, Order, Branch, Parcel}} = require("../models");
const Joi = require("joi");

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

}

module.exports = new DeliveryController();

