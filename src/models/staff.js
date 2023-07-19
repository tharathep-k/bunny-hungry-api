module.exports = (sequelize, DataTypes) => {
  const Staff = sequelize.define(
    "staff",
    {
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      mobile: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          is: /^[0-9]{10}$/,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      profileImage: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      underscored: true,
    }
  );

  Staff.associate = (models) => {
    Staff.hasMany(models.menu, {
      foreignKey: {
        name: "staffId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };

  return Staff;
};
