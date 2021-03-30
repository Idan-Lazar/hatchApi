const { Model, DataTypes, Op } = require("sequelize");
const { excludedStatuses } = require("../../utils/utils")
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
     * @returns Promise<ArchiveFiles>
     */
    async findByName(projects, role, name , viewMode) {
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
     * @returns Promise<ArchiveFiles>
     */
    async findAllByFilters(startDate, endDate , status , worldContents , subSystems , extensions , responseCodes , viewMode) {
      try {
        let filterObj = {
          createdat: {
            [Op.between] : [startDate , endDate ]
          },
          nametored: {
            [Op.ne]: null
          },
          sysname: worldContents,
          subsystemname: subSystems
        }
        if(!viewMode){
          if(status === 'All Statuses' || !excludedStatuses.includes(status)){
            filterObj.status = {
              [Op.notIn]: excludedStatuses
            }
          }
          else if(!excludedStatuses.includes(status) && status.length > 0){
            filterObj.status = status
          }
        }
        else{
          status.length > 0 && status !== 'All Statuses' && (filterObj.status = status)
        }
        extensions.length > 0 && (filterObj.filetype = extensions)
        responseCodes.length > 0 && (filterObj.responsecode = responseCodes)
        const data = await ArchiveFiles.findAll({ 
          where : filterObj
        })
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
  ArchiveFiles,
};
