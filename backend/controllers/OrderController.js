const {
  models: { Order, Customer, Delivery, Employee, Parcel },
} = require("../models");
const db = require("../models");
const { or } = require("sequelize");
const sequelize = require("sequelize");
const Joi = require("joi");

class OrderController {
  //GET /order
  async getAllOrders(req, res, next) {
    const orders = await Order.findAll({
      include: [
        {
          model: Customer,
          required: true,
        },
        {
          model: Delivery,
        //   required: true,
        },
        {
          model: Employee,
          required: true,
          attributes: {
            exclude: ["password", "address", "dob"],
          },
        },
        {
          model: Parcel,
          required: true,
        },
      ],
    });
    return res.status(200).json(orders);
  }

  //GET order/tracking
  async getOrderByIds(req, res, next) {
    const schema = Joi.object({
      searchValue: Joi.string().pattern(new RegExp("^[A-Z0-9,]+$")).required(),
    });
    const validate = schema.validate(req.body);
    if (validate.error) {
      return res.status(400).send("Bad request");
    }
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
              [
                sequelize.fn(
                  "concat",
                  sequelize.col("Customer.first_name"),
                  " ",
                  sequelize.col("Customer.last_name")
                ),
                "fullName",
              ],
            ],
          },
          {
            model: Delivery,
            required: true,
          },
          {
            model: Employee,
            required: true,
            attributes: [
              [
                sequelize.fn(
                  "concat",
                  sequelize.col("Employee.first_name"),
                  " ",
                  sequelize.col("Employee.last_name")
                ),
                "fullName",
              ],
            ],
          },
          {
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
    const schema = Joi.object({
      name: Joi.string().pattern(
        new RegExp(
          "^[a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳỵỷỹđĐ ]+$"
        )
      ),
      firstName: Joi.string()
        .pattern(
          new RegExp(
            "^[a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳỵỷỹđĐ ]+$"
          )
        )
        .required(),
      lastName: Joi.string()
        .pattern(
          new RegExp(
            "^[a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳỵỷỹđĐ ]+$"
          )
        )
        .required(),
      province: Joi.string()
        .pattern(
          new RegExp(
            "^[a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳỵỷỹđĐ./ ]+$"
          )
        )
        .required(),
      district: Joi.string()
        .pattern(
          new RegExp(
            "^[a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳỵỷỹđĐ./ ]+$"
          )
        )
        .required(),
      detailAddress: Joi.string()
        .pattern(
          new RegExp(
            "^[a-zA-Z0-9àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳỵỷỹđĐ,./ ]+$"
          )
        )
        .required(),
      receiverName: Joi.string()
        .pattern(
          new RegExp(
            "^[a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳỵỷỹđĐ ]+$"
          )
        )
        .required(),
      receiverProvince: Joi.string()
        .pattern(
          new RegExp(
            "^[a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳỵỷỹđĐ./ ]+$"
          )
        )
        .required(),
      receiverDistrict: Joi.string()
        .pattern(
          new RegExp(
            "^[a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳỵỷỹđĐ./ ]+$"
          )
        )
        .required(),
      receiverPhone: Joi.string()
        .pattern(new RegExp("^\\+?[0-9]{1,15}$"))
        .required(),
      receiverDetailAddress: Joi.string()
        .pattern(
          new RegExp(
            "^[a-zA-Z0-9àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳỵỷỹđĐ,./ ]+$"
          )
        )
        .required(),
      email: Joi.string().email(),
      phone: Joi.string().pattern(new RegExp("^\\+?[0-9]{1,15}$")).required(),
      weight: Joi.number().min(0),
      price: Joi.number().integer().min(1),
      typeId: Joi.number().integer().min(1).max(2),
      details: Joi.string().required(),
    });
    const validate = schema.validate(req.body);
    if (validate.error) {
      return res.status(400).send("Bad request");
    }
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
      receiverDetailAddress,
    } = req.body;
    //create customer
    const email = () => {
      if (req.body.email) {
        return req.body.email;
      }
    };
    const address = `${detailAddress}, ${district}, ${province}`;
    const customer = await Customer.create({
      first_name: firstName,
      last_name: lastName,
      address: address,
      email: email(),
      phone: phone,
    });

    //create parcel
    const branchId = req.session.User.branchId;
    const parcel = await Parcel.create({
      branch_id: branchId,
      weight: weight,
      price: price,
      type_id: typeId,
      details: details,
    });

    const receiverAddress = `${receiverDetailAddress}, ${receiverDistrict}, ${receiverProvince}`;
    const today = new Date();

    // //create delivery

    // const delivery = await Delivery.create({
    //   order_id: orderId,
    //   receiver_id: branchId,
    //   receive_date: today,
    // });

    //create order
    const employeeId = req.session.User.employeeId;
    const orderId = generateRandomString();
    const order = await Order.create({
      order_id: orderId,
      customer_id: customer.customer_id,
      parcel_id: parcel.parcel_id,
      employee_id: employeeId,
      branch_id: branchId,
      order_date: today,
      receive_date: today,
      receiver_name: receiverName,
      receiver_phone: receiverPhone,
      receiver_address: receiverAddress,
    });
    return res.status(200).json({
      msg: "Create order success!",
      order: order,
    });
  }
}

function generateRandomString() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const length = 10;
  let randomString = "";
  for (let i = 0; i < length; ++i) {
    randomString += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return randomString;
}

module.exports = new OrderController();
