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

    Cart.belongsTo(models.menu, {
      foreignKey: {
        name: "menuId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };

  return Cart;
};
