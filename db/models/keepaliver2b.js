const { Model, DataTypes, Op } = require("sequelize");
class KeepAliveR2B extends Model {}
const { IntToString } = require("../../utils/utils");
/**
 * @typedef {object} KeepAliveR2B
 */

/**
 *
 * @param {Sequelize} sequelize - instance of sequelize
 */
async function init(sequelize) {
  KeepAliveR2B.init(
    {
      schemaname: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      sysname: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      sysid: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lastreceive: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      subsystemname: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      wasalerted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "keepalive_r2b",
      freezeTableName: true,
      timestamps: false,
    }
  );
  await KeepAliveR2B.sync();

  return {
    /**
     *
     * @param {string} name
     * @returns Promise<KeepAliveR2B>
     */
    async create(sysid, sysname, schemaname) {
      try {
        const schema = await KeepAliveR2B.create({
          sysid,
          sysname,
          schemaname,
        });
        return schema;
      } catch (error) {
        throw {
          message: error.message,
        };
      }
    },
    /**
     *
     * @param {string} filePath
     * @returns Promise<KeepAliveR2B>
     */
    async delete(filepath) {
      try {
        const rowsDelete = await KeepAliveR2B.destroy({
          where: { filepath },
        });
        if (rowsDelete === 0) throw "delete schema Error";
        return rowsDelete > 0;
      } catch (error) {
        throw {
          message: error.message,
        };
      }
    },
    /**
     *
     * @param {string} name
     * @returns Promise<KeepAliveR2B>
     */
    async findByName(sysid, schemaname) {
      try {
        const schema = await KeepAliveR2B.findOne({
          where: { sysid, schemaname },
        });
        return schema;
      } catch (error) {
        throw {
          message: error.message,
        };
      }
    },
    /**
     * @returns Promise<KeepAliveR2B>
     */
    async findAll(systems, role) {
      try {
        const systemsAsString = IntToString(systems)
        const data = role
          ? await KeepAliveR2B.findAll()
          : await KeepAliveR2B.findAll({
              where: { sysid: systemsAsString },
            });

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
  KeepAliveR2B,
};
