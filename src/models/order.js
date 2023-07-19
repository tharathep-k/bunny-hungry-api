module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define("order", {
    status: {
      type: DataTypes.STRING,
      defaultValue: "pending",
    },
  });

  Order.associate = (models) => {
    Order.belongsTo(models.user, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    Order.hasOne(models.payment, {
      foreignKey: {
        name: "orderId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    Order.hasMany(models.orderItem, {
      foreignKey: {
        name: "orderId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };

  return Order;
};
