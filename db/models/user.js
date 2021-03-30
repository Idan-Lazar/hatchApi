const { Model, DataTypes, Op } = require("sequelize");
class User extends Model {}

/**
 * @typedef {object} User
 */

/**
 *
 * @param {Sequelize} sequelize - instance of sequelize
 */
async function init(sequelize) {
  User.init(
    {
      userid: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      role: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: "0",
      },
      systems: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      projects: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "users",
      freezeTableName: true,
      timestamps: false,
    }
  );
  await User.sync();

  return {
    /**
     *
     * @param {string} id
     */
    async delete(id) {
      const rowsDelete = await User.destroy({
        where: { userid: id },
      });
      return rowsDelete === 1;
    },
    /**
     *
     * @param {string} name
     * @returns Promise<User>
     */
    async findByName(name) {
      try {
        const user = await User.findOne({ where: { name } });
        return user;
      } catch (error) {
        throw {
          message: error.message,
        };
      }
    },
    /**
     *
     * @param {string} id
     * @returns Promise<User>
     */
    async findById(id) {
      try {
        const user = await User.findOne({ where: { userid: id } });
        return user;
      } catch (error) {
        throw {
          message: error.message,
        };
      }
    },
    /**
     *
     * @param {string} id
     * @returns Promise<User>
     */
    async findBySubSystemId(id) {
      try {
        const user = await User.findAll({
          where: {
            projects: {
              [Op.contains]: [id],
            },
          },
        });
        return user;
      } catch (error) {
        throw {
          message: error.message,
        };
      }
    },
    /**
     * @returns Promise<User>
     */
    async findAll() {
      try {
        const data = await User.findAll();
        return data;
      } catch (error) {
        throw {
          message: error.message,
        };
      }
    },
    /**

     */
    async update() {
      try {
      } catch (error) {
        throw {
          message: error.message,
        };
      }
    },
  };
}

module.exports = {
  init,
  User,
};
