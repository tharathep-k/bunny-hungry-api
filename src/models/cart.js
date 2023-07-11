module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define("cart", {
    quantity: {
      type: DataTypes.INTEGER,
    },
  });

  Cart.associate = (models) => {
    Cart.belongsTo(models.menu, {
      foreignKey: {
        name: "menuId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    Cart.belongsTo(models.user, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    Cart.belongsTo(models.cart, {
      foreignKey: {
        name: "addeggId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    Cart.belongsTo(models.addSpicy, {
      foreignKey: {
        name: "addspicyId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    Cart.belongsTo(models.extra, {
      foreignKey: {
        name: "extraId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };

  return Cart;
};
