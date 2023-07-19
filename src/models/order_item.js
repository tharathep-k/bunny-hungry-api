module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define(
    "orderItem",
    {
      price: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      underscored: true,
    }
  );

  OrderItem.associate = (models) => {
    OrderItem.belongsTo(models.menu, {
      foreignKey: {
        name: "menuId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    OrderItem.belongsTo(models.order, {
      foreignKey: {
        name: "orderId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    OrderItem.belongsTo(models.extra, {
      foreignKey: {
        name: "extraId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    OrderItem.belongsTo(models.addSpicy, {
      foreignKey: {
        name: "addspicyId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    OrderItem.belongsTo(models.addEgg, {
      foreignKey: {
        name: "addeggId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };

  return OrderItem;
};
