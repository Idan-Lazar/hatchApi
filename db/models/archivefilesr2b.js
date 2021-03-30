const { Model, DataTypes, Op } = require("sequelize");
class ArchiveFilesR2B extends Model {}

/**
 * @typedef {object} ArchiveFilesR2B
 */

/**
 *
 * @param {Sequelize} sequelize - instance of sequelize
 */
async function init(sequelize) {
  ArchiveFilesR2B.init(
    {
      sysid: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: true,
      },
      sysname: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      guid: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      filename: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      filesize: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      savedat: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      readat: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      lastpull: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      container: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      subsystemname: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "archive_files_r2b",
      freezeTableName: true,
      timestamps: false,
    }
  );
  await ArchiveFilesR2B.sync();

  return {
    /**
     *
     * @returns Promise<ArchiveFilesR2B>
     */
    async getFileByGuid(guid) {
      const file = await ArchiveFilesR2B.findAll({
        where: {
          guid,
        },
      });
      return file;
    },
    /**
     *
     * @returns Promise<ArchiveFilesR2B>
     */
    async findByName(projects, role, name) {
      const file = role
        ? await ArchiveFilesR2B.findAll({
            where: {
              filename: {
                [Op.iLike]: `%${name}%`,
              },
            },
          })
        : await ArchiveFilesR2B.findAll({
            where: {
              filename: {
                [Op.iLike]: `%${name}%`,
              },
              subsystemname: projects,
            },
          });
      return file;
    },
    /**
     * @returns Promise<ArchiveFilesR2B>
     */
    async findAll(systems, role) {
      const data = role
        ? await ArchiveFilesR2B.findAll()
        : await ArchiveFilesR2B.findAll({
            where: {
              sysid: systems,
            },
          });
      return data;
    },
    /**
     * @returns Promise<ArchiveFilesR2B>
     */
    async findAllByFilters(startDate, endDate, worldContents, subSystems) {
      try {
        let filterObj = {
          savedat: {
            [Op.between]: [startDate, endDate],
          },
          sysname: worldContents,
          subsystemname: subSystems,
        };
        const data = await ArchiveFilesR2B.findAll({
          where: filterObj,
        });
        return data;
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
  ArchiveFilesR2B,
};
