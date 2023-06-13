const { menu } = require("../models");

exports.createMenu = async (req, res, next) => {
  // console.log(req.body);
  try {
    const Menu = await menu.create(req.body);
    console.log(Menu);
    res.status(200).json("Create menu success");
  } catch (error) {
    next(error);
  }
};

exports.updateMenu = async (req, res, next) => {
  try {
    const { menuid } = req.params;
    // const value = req.params;
    await menu.update(req.body, { where: { id: menuid } });
    // await menu.update(req.body, { where: {id: value.menuid} });
    res.status(200).json("Update menu success");
  } catch (error) {
    next(error);
  }
};

exports.deleteMenu = async (req, res, next) => {
  try {
    const { menuid } = req.params;
    await menu.destroy({ where: { id: menuid } });
    res.status(204).json("Delete menu success")
  } catch (error) {
    next(error);
  }
};
