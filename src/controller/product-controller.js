const { menu } = require("../models");

exports.createMenu = async (req, res, next) => {
  // console.log(req.body);
  try {
    const value = req.body
    value.staffId = req.Staff.id 
    
    const Menu = await menu.create(value);
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

exports.getMenu = async (req, res ,next) => {
  try {
    await menu.findAll({order: [["created_at", "DESC"]]})
    res.status(200).json("Get menu success")
  } catch (error) {
    next(error)
  }
}