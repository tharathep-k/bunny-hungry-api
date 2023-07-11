module.exports = (sequelize, DataTypes) => {
  const Extra = sequelize.define(
    "extra",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      add: {
        type: DataTypes.ENUM("Not Add", "Add Egg"),
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {
      underscored: true,
    }
  );

  Extra.associate = (models) => {
    Extra.hasOne(models.orderItem, {
      foreignKey: {
        name: "extraId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    Extra.hasOne(models.cart, {
      foreignKey: {
        name: "extraId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };

  return Extra;
};
