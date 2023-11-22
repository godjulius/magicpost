const {models:{Delivery,Order,Branch}}=require("../models");

class DeliveryController {
    //GET /delivery
    async getAllDelivery(req,res,next){
        const deliveries=await Delivery.findAll()
    }
}