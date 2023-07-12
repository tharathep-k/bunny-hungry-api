const { menu, addEgg, addSpicy, extra } = require("../models");
const fs = require("fs");

const uploadService = require("../services/upload-service");

// exports.createMenu = async (req, res, next) => {
//   console.log(req.body);
//   try {
//     const value = req.body
//     value.staffId = req.Staff.id

//     const Menu = await menu.create(value);
//     console.log(Menu);
//     res.status(200).json("Create menu success");
//   } catch (error) {
//     next(error);
//   }
// };

exports.createMenu = async (req, res, next) => {
  try {
    // image => req.file, message => req.body
    if (!req.body.name || !req.body.price || !req.body.type) {
      createError("Message or image is required", 400);
    }
    const value = req.body;

    console.log(value);
    value.staffId = req.Staff.id;

    // const Menu = await menu.create(value);

    // if (req.body.message && req.body.message.trim()) {
    //   value.message = req.body.message.trim();
    // }

    if (req.file) {
      const result = await uploadService.upload(req.file.path);
      value.menuImage = result.secure_url;
    }

    console.log(value);
    const menuPost = await menu.create(value);
    res.status(201).json({ menuPost });
  } catch (err) {
    next(err);
  } finally {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
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
    res.status(204).json("Delete menu success");
  } catch (error) {
    next(error);
  }
};

exports.getMenu = async (req, res, next) => {
  try {
    const getMenu = await menu.findAll({
      order: [["created_at", "DESC"]],
    });
    res.status(200).json(getMenu);
  } catch (error) {
    next(error);
  }
};

exports.getalladd = async (req, res, next) => {
  try {
    const getEgg = await addEgg.findAll()
    const getSpicy = await addSpicy.findAll()
    const getExtra = await extra.findAll()

    const getAllAdd = {
      eggs: getEgg,
      spicy: getSpicy,
      extra: getExtra
    };

    // const getAllAdd = getEgg.concat(getSpicy, getExtra);

    res.status(200).json(getAllAdd)
  } catch (error) {
    next(error);
  }
};
