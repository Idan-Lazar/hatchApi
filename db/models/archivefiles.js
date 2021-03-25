const { Model, DataTypes, Op } = require("sequelize");

class ArchiveFiles extends Model {}

/**
 * @typedef {object} ArchiveFiles
 * @property {int} sysid
 * @property {string} sysname
 *
 */

/**
 *
 * @param {Sequelize} sequelize - instance of sequelize
 */
async function init(sequelize) {
  ArchiveFiles.init(
    {
      sysid: {
        type: DataTypes.STRING,
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
      dynamicproperties: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      filename: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      filetype: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM(
          "Move Successfully To Sync System",
          "Ready To Be Sync",
          "Sanitation Failed",
          "File Was Deleted",
          "Waiting For Sanitation",
          "Sync Failed",
          "Move Successfully To Convert System",
          "Saved To Red",
          "Red Ack Succeeded",
          "Sanitation Succeeded",
          "Conversion to tiff failed",
          "Conversion to zip failed",
          "Bug"
        ),
        allowNull: true,
      },
      statuschangedat: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      createdat: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: new Date(),
      },
      tosync: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      syncretries: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: "0",
      },
      container: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      nametored: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      sizeoforiginfile: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      sizeafterconvert: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      responsecode: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      sanitationerror: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      jobid: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      sasaname: {
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
      modelName: "archive_files",
      freezeTableName: true,
      timestamps: false,
    }
  );
  await ArchiveFiles.sync();

  return {
    /**
     *
     * @param {ArchiveFiles} fileData
     */
    async create(fileData) {
      const file = await ArchiveFiles.create(fileData);
      return file.toJSON();
    },
    /**
     *
     * @param {string} id
     */
    async delete(id) {
      const rowsDelete = await ArchiveFiles.destroy({
        where: { id },
      });
      return rowsDelete === 1;
    },
    /**
     *
     * @param {string} id
     * @returns Promise<ArchiveFiles>
     */
    async findById(id) {
      const file = await ArchiveFiles.findOne({ where: { id } });
      return file;
    },
    /**
     *
     * @returns Promise<ArchiveFiles>
     */
    async findByName(projects, role, name , viewMode) {
      const excludedStatuses = ['Waiting For Sanitation', 'Sanitation Failed', 'File Was Deleted', 'Conversion to tiff failed']
      const file = role
        ? await ArchiveFiles.findAll({
            where: {
              nametored: {
                [Op.iLike]: `%${name}%`,
              },
              status:{
                [Op.notIn]: !viewMode ? excludedStatuses : []
              }
            },
          })
        : await ArchiveFiles.findAll({
            where: {
              nametored: {
                [Op.iLike]: `%${name}%`,
              },
              subsystemname: projects,
            },
          });
      return file;
    },
    /**
     * @returns Promise<ArchiveFiles>
     */
    async findAll(systems, role) {
      const data = role
        ? await ArchiveFiles.findAll()
        : await ArchiveFiles.findAll({
            where: {
              sysid: systems,
            },
          });
      return data;
    },
    /**
     * @param {ArchiveFiles} fileData
     * @param {string[]} fields
     */
    async update(fileData, fields) {
      const [_result, files] = await db.system.update(fileData, {
        where: { id: fileData.id },
        returning: true,
        fields,
      });
      return files[0].toJSON();
    },
  };
}

module.exports = {
  init,
  ArchiveFiles,
};
