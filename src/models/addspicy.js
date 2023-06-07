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
    AddSpicy.belongsTo(models.menu, {
      foregin: {
        name: "menuId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };

  return AddSpicy;
};
