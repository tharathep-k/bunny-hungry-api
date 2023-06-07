module.exports = (sequelize, DataTypes) => {
  const Menu = sequelize.define(
    "menu",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      type: {
        type: DataTypes.ENUM("Food", "Drink"),
        allowNull: false,
      },
      menuImage: {
        type: DataTypes.STRING,
      },
    },
    {
      underscored: true,
    }
  );

  Menu.associate = (models) => {
    Menu.hasMany(models.orderItem, {
      foreignKey: {
        name: "menuId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    Menu.belongsTo(models.staff, {
      foreignKey: {
        name: "staffId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    Menu.hasMany(models.addEgg, {
      foreignKey: {
        name: "menuId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    Menu.hasOne(models.addSpicy, {
      foreignKey: {
        name: "menuId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    Menu.hasOne(models.extra, {
      foreignKey: {
        name: "menuId",
        allowNull: false,
      },
      onDelete: false,
    });

    Menu.hasMany(models.cart, {
      foreignKey: {
        name: "menuId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };

  return Menu;
};
