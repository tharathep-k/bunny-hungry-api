const { menu, addEgg, addSpicy, extra, cart } = require("../models");

exports.addCart = async (req, res, next) => {
  try {
    const data = req.body;
    // console.log("------- :", data);

    const [extraAll] = await extra.findAll({ where: { price: data.extra } });
    const [spicyAll] = await addSpicy.findAll({
      where: { levelSpicy: data.spicy },
    });
    const [eggAll] = await addEgg.findAll({ where: { price: data.addEgg } });
    const [menuAll] = await menu.findAll({ where: { name: data.name } });

    // console.log("extraId :", extraAll.id);
    // console.log("spicyId :", spicyAll.id);
    // console.log("eggId :", eggAll.id);
    // console.log("menuId :", menuAll.id);

    const newData = await cart.create({
      quantity: data.count,
      sumPrice: data.sumPrice,
      menuId: menuAll.id,
      userId: data.userId,
      addeggId: eggAll.id,
      addspicyId: spicyAll.id,
      extraId: extraAll.id,
    });

    // console.log("newData------ :", newData);

    res.status(201).json(newData);
  } catch (error) {
    next(error);
  }
};

exports.getCart = async (req, res, next) => {
  try {
    const { id } = req.params;
    // console.log("id :", id);

    const data = await cart.findAll({
      where: { userId: id },
      include: [
        { model: menu },
        { model: addEgg },
        { model: addSpicy },
        { model: extra },
      ],
    });

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

exports.deleteCart = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("id : ", id);

    await cart.destroy({ where: { id } });

    res.status(202).json("Delete cart success");
  } catch (error) {
    next(error);
  }
};

exports.getInfoOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("------", id);
  } catch (error) {
    next(error);
  }
};
