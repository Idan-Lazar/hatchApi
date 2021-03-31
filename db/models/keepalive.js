const { Model, DataTypes, Op } = require("sequelize");
class KeepAlive extends Model {}

/**
 * @typedef {object} KeepAlive
 */

/**
 *
 * @param {Sequelize} sequelize - instance of sequelize
 */
async function init(sequelize) {
  KeepAlive.init(
    {
      filepath: {
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
      schemaname: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lastresult: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      lastsuccess: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      lastcheck: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      statuscode: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      subsystemname: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "keepalive_b2r",
      freezeTableName: true,
      timestamps: false,
    }
  );
  await KeepAlive.sync();

  return {
    /**
     *
     * @param {string} name
     * @returns Promise<KeepAlive>
     */
    async create(sysid, sysname, filepath, schemaname, subsystemname) {
      try {
        const schema = await KeepAlive.create({
          sysid,
          sysname,
          schemaname,
          filepath,
          subsystemname,
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
     * @returns Promise<KeepAlive>
     */
    async delete(filepath) {
      try {
        const rowsDelete = await KeepAlive.destroy({
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
     * @returns Promise<KeepAlive>
     */
    async findByName(sysid, schemaname) {
      try {
        const schema = await KeepAlive.findOne({
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
     * @returns Promise<KeepAlive>
     */
    async findAll(projects, role) {
      try {
        const data = role
          ? await KeepAlive.findAll()
          : await KeepAlive.findAll({
              where: { subsystemname: projects },
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
  KeepAlive,
};
