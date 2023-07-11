module.exports = (sequelize, DataTypes) => {
  const AddSpicy = sequelize.define(
    "addSpicy",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      levelSpicy: {
        type: DataTypes.ENUM(
          "Not Spicy",
          "Less Spicy",
          "Medium Spicy",
          "Hot Spicy"
        ),
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

  AddSpicy.associate = (models) => {
    AddSpicy.hasOne(models.orderItem, {
      foreignKey: {
        name: "addspicyId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    AddSpicy.hasOne(models.cart, {
      foreignKey: {
        name: "addspicyId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };

  return AddSpicy;
};
