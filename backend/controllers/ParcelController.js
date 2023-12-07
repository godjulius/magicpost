const {models: {Parcel, Order}} = require("../models");
const {or} = require("sequelize");
const Joi = require("joi");

class ParcelController {

    //GET /parcel
    async getAllParcels(req, res, next) {
        const parcels = await Parcel.findAll();
        return res.status(200).json(parcels);
    }

    //GET parcel/:orderId/receive
    async receiveParcel(req, res, next) {
        const schema = Joi.object({
            id: Joi.number().min(1).required(),
        });
        const result = schema.validate({
            id: req.params.orderId,
        });
        if (result.error) {
            return res.status(400).send("Bad request");
        }
        const orderId = req.params.orderId;
        const order = await Order.findOne({
            where: {
                order_id: orderId,
            },
            include: Parcel,
        });
        if (!order) {
            return res.status(404).json({
                msg: "Order not found",
            });
        }
        await order.parcel.update({
            // branch_id: req.session.branchId,
            branch_id: 4,
        });
        const parcel = await Parcel.findOne({
            include: [
                {
                    model: Order,
                    where: {
                        order_id: orderId,
                    },
                    required: true,
                    attributes: [],
                },
            ],
        });
        return res.status(200).json({
            msg: "Success",
            parcel: parcel,
        });
    }

}

module.exports = new ParcelController();
