const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
  class User extends Model { }
  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'First name field is required.'
        },
        notEmpty: {
          msg: 'First name field is required.'
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Last name field is required.'
        },
        notEmpty: {
          msg: 'Last name field is required.'
        }
      }
    },
    emailAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'The email address you entered already exists.'
      },
      validate: {
        notNull: {
          msg: 'Email address field is required.'
        },
        notEmpty: {
          msg: 'Email address field is required.'
        },
        isEmail: {
          msg: 'Please enter a valid email address.'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password field is required.'
        },
        notEmpty: {
          msg: 'Password field is required.'
        },
        validatePassword(val) {
          if (val.length >= 8 && val.length <= 20) {
            const hashedPassword = bcrypt.hashSync(val, 10);
            this.setDataValue('password', hashedPassword);
          } else {
            throw new Error('Your password should be between 8 and 20 characters');
          }
        },
      },
    }
  }, { sequelize });

  User.associate = (models) => {
    User.hasMany(models.Course, {
      foreignKey: {
        fieldName: 'userId'
      }
    });
  }

  return User;
}