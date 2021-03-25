const { Model, DataTypes } = require("sequelize");
const { sysNameFormat } = require("../../utils/utils");
class System extends Model {}

/**
 * @typedef {object} System
 * @property {int} sysid
 * @property {string} sysname
 *
 */

/**
 *
 * @param {Sequelize} sequelize - instance of sequelize
 */
async function init(sequelize) {
  System.init(
    {
      sysid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      sysname: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "systemmapping",
      freezeTableName: true,
      timestamps: false,
    }
  );
  await System.sync();

  return {
    /**
     *
     * @param {String} systemName
     */
    async create(systemName) {
      try {
        const id = (await System.max("sysid")) + 1;
        const dbSystemName = sysNameFormat(systemName);
        const systemData = {
          sysid: id,
          sysname: dbSystemName,
        };
        const system = await System.create(systemData);
        return system.toJSON();
      } catch (error) {
        throw {
          message: error.message,
        };
      }
    },
    /**
     *
     * @param {string} id
     */
    async delete(id) {
      const rowsDelete = await System.destroy({
        where: { sysid: id },
      });
      return rowsDelete === 1;
    },
    /**
     *
     * @param {string} name
     * @returns Promise<System>
     */
    async findByName(name) {
      try {
        const system = await System.findOne({ where: { sysname: name } });
        return system;
      } catch (error) {
        throw {
          message: error.message,
        };
      }
    },
    /**
     *  @param {array<int>} systems
     *  @param {int} role
     * @returns Promise<System>
     */
    async findAll(systems, role) {
      try {
        const data = role
          ? await System.findAll()
          : await System.findAll({
              where: {
                sysid: systems,
              },
            });
        return data;
      } catch (error) {
        throw {
          message: error.message,
        };
      }
    },
    /**
     * @param {string} systemName
     * @param {string} newSystemName
     */
    async update(systemName, newSystemName) {
      try {
        const dbSystemName = sysNameFormat(systemName);
        const dbNewSystemName = sysNameFormat(newSystemName);
        const system = await System.update(
          { sysname: dbNewSystemName },
          {
            where: { sysname: dbSystemName },
            fields: ["sysname"],
          }
        );
        return system[0] > 0;
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
  System,
};
