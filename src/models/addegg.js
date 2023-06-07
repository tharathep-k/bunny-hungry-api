module.exports = (sequelize, DataTypes) => {
  const AddEgg = sequelize.define(
    "addEgg",
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

  AddEgg.associate = (models) => {
    AddEgg.belongsTo(models.menu, {
      foreignKey: {
        name: "menuId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };

  return AddEgg;
};
