module.exports = (sequelize, DataTypes) => {
  const Table = sequelize.define(
    "table",
    {
      forHere: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("Available", "Unavailable"),
        allowNull: false,
      },
    },
    {
      underscored: true,
    }
  );

  Table.associate = (models) => {
    Table.belongsTo(models.user, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };

  return Table;
};
