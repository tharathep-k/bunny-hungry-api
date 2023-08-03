const {
  menu,
  addEgg,
  addSpicy,
  extra,
  cart,
  orderItem,
  order,
} = require("../models");
const order_item = require("../models/order_item");

exports.createOrder = async (req, res, next) => {
  try {
    const data = req.body;

    const [userId] = data.map((el) => ({ userId: el.userId }));
    const orderData = await order.create({ userId: userId.userId });

    console.log("orderData :", orderData);

    const newData = data.map((el) => ({
      orderId: orderData.id,
      quantity: el.quantity,
      price: +el.sumPrice / +el.quantity,
      menuId: el.menu.id,
      addeggId: el.addEgg.id,
      addspicyId: el.addSpicy.id,
      extraId: el.extra.id,
    }));
    await orderItem.bulkCreate(newData);

    await cart.destroy({ where: { userId: userId.userId } });

    // console.log("------- :", userId);
    res.status(200).json("Success");
  } catch (error) {
    next(error);
  }
};

exports.getOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("id :", id);

    const data = await order.findAll({
      where: { userId: id },
      order: [["id", "DESC"]],
    });

    console.log("-----------", data);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

exports.getAllOrder = async (req, res, next) => {
  try {
    const data = await order.findAll({ order: [["id", "DESC"]] });

    // console.log(data);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

exports.updateStatusOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("id :", id);

    await order.update({ status: "complete" }, { where: { id: id } });

    res.status(200).json("Update Success");
  } catch (error) {
    next(error);
  }
};

exports.getInfoOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("------", id);

    const [data] = await order.findAll({
      where: { id: id },
      include: [
        {
          model: orderItem,
          include: [
            { model: menu },
            { model: addEgg },
            { model: addSpicy },
            { model: extra },
          ],
        },
      ],
    });

    console.log("-+- :", data);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
