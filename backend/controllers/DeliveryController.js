const {models: {Delivery, Order, Branch}} = require("../models");

class DeliveryController {
    //GET /delivery
    async getAllDelivery(req, res, next) {
        const deliveries = await Delivery.findAll();
        return res.status(200).json(deliveries);
    }

    //POST /delivery/:deliveryId/transshipment
    async transshipment(req, res) {
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
