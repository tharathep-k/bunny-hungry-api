const { menu } = require("../models");

exports.createMenu = async (req, res, next) => {
  // console.log(req.body);
  try {
    const Menu = await menu.create(req.body);
    console.log(Menu);
  } catch (error) {
    next(error);
  }
};

exports.updateMenu = async (req, res, next) => {
  try {
    const { menuid } = req.params;
    // const value = req.params;
    await menu.update(req.body, { where: {id: menuid} });
    // await menu.update(req.body, { where: {id: value.menuid} });
    res.status(200).json("Update Success")
  } catch (error) {
    next(error);
  }
};

