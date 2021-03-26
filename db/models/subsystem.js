const { Model, DataTypes, Op } = require("sequelize");
const { System } = require("./system");
class SubSystem extends Model {}

/**
 * @typedef {object} SubSystem
 * @property {int} sysid
 * @property {string} sysname
 *
 */

/**
 *
 * @param {Sequelize} sequelize - instance of sequelize
 */
async function init(sequelize) {
  SubSystem.init(
    {
      subsystemid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      subsystemname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sysid: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true,
      },
      prefix: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "sub_systems",
      freezeTableName: true,
      timestamps: false,
    }
  );
  await SubSystem.sync();

  return {
    /**
     *
     * @param {SubSystem} subsystemData
     */
    async create(subsystemname, sysid, prefix) {
      try {
        const validation = await SubSystem.findAll({
          where: { prefix: { [Op.contains]: prefix }, sysid: sysid },
        });
        if (validation.length > 0 && prefix.length !== 0) {
          throw `אחת מהתחיליות שהזנת קיימות בעולם תוכן זה`;
        }
        const subsystem = await SubSystem.create({
          subsystemname,
          sysid,
          prefix,
        });
        return subsystem.toJSON();
      } catch (error) {
        throw {
          message: error?.message || error,
        };
      }
    },
    /**
     *
     * @param {string} subsystemname
     */
    async delete(subsystemname) {
      try {
        const rowsDelete = await SubSystem.destroy({
          where: { subsystemname },
        });
        if (rowsDelete === 0) throw "delete sub system Error";
        return rowsDelete > 0;
      } catch (error) {
        throw {
          message: error?.message || error,
        };
      }
    },
    /**
     *
     * @param {string} id
     * @returns Promise<SubSystem>
     */
    async findById(id) {
      try {
        const subsystem = await SubSystem.findAll({
          where: { sysid: { [Op.contains]: [id] } },
        });
        return subsystem;
      } catch (error) {
        throw {
          message: error.message,
        };
      }
    },
    /**
     * @returns Promise<SubSystem>
     */
    async findAll(subsystems, role) {
      try {
        const data = role
          ? await SubSystem.findAll()
          : await SubSystem.findAll({
              where: {
                subsystemid: subsystems,
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
     * @returns Promise<SubSystem>
     */
    async findAllJoin(subsystems, role) {
      try {
        let filterSubSystems;
        const data = (await sequelize.query(
        `SELECT subsystemname, systemmapping.sysname,sub_systems.subsystemid
        FROM sub_systems
        inner JOIN systemmapping ON CAST(systemmapping.sysid as INT) = ANY(sub_systems.sysid)`
        ))[0];
        if (!role) {
          filterSubSystems = data.filter((subsystem) => subsystems.includes(subsystem.subsystemid))
          return filterSubSystems;         
        }
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
    async update(subsystemname, sysid, prefix) {
      try {
        const validation = await SubSystem.findAll({
          where: { prefix: { [Op.contains]: prefix }, sysid: [sysid] },
        });
        if (validation.length > 0) {
          throw `אחת מהתחיליות שהזנת קיימות בעולם תוכן זה`;
        }
        const system = await SubSystem.update(
          { prefix },
          {
            where: { subsystemname },
            fields: ["prefix"],
            returning: true,
          }
        );
        console.log(system);
        if (system[0] === 0) {
          throw "Update db Error";
        }
        return system[1];
      } catch (error) {
        throw {
          message: error?.message || error,
        };
      }
    },
  };
}

module.exports = {
  init,
  SubSystem,
};
