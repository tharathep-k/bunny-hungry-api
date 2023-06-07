module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define("payment", {
    status: {
      type: DataTypes.ENUM("Paid", "Not Paid"),
    },
    amount: {
      type: DataTypes.DECIMAL(10,2)
    }
  });

  Payment.associate = (models) => {
    Payment.belongsTo(models.order, {
      foreignKey: {
        name: "orderId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };

  return Payment;
};
