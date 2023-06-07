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
    Extra.belongsTo(models.menu, {
      foreignKey: {
        name: "menuId",
        allowNull: false,
      },
      onDelete: false,
    });
  };

  return Extra;
};
