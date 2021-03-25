/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('archive_files', {
		sysid: {
			type: DataTypes.STRING,
			allowNull: true
		},
		sysname: {
			type: DataTypes.STRING,
			allowNull: true
		},
		guid: {
			type: DataTypes.STRING,
			allowNull: false
		},
		dynamicproperties: {
			type: DataTypes.JSON,
			allowNull: true
		},
		filename: {
			type: DataTypes.STRING,
			allowNull: true
		},
		filetype: {
			type: DataTypes.STRING,
			allowNull: true
		},
		status: {
			type: DataTypes.ENUM("Move Successfully To Sync System","Ready To Be Sync","Sanitation Failed","File Was Deleted","Waiting For Sanitation","Sync Failed","Move Successfully To Convert System","Saved To Red","Red Ack Succeeded","Sanitation Succeeded","Conversion to tiff failed","Conversion to zip failed","Bug"),
			allowNull: true
		},
		statuschangedat: {
			type: DataTypes.DATE,
			allowNull: true
		},
		createdat: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: now()
		},
		tosync: {
			type: DataTypes.BOOLEAN,
			allowNull: true
		},
		syncretries: {
			type: DataTypes.INTEGER,
			allowNull: true,
			defaultValue: "0"
		},
		container: {
			type: DataTypes.STRING,
			allowNull: true
		},
		nametored: {
			type: DataTypes.STRING,
			allowNull: true
		},
		sizeoforiginfile: {
			type: DataTypes.DOUBLE,
			allowNull: true
		},
		sizeafterconvert: {
			type: DataTypes.DOUBLE,
			allowNull: true
		},
		responsecode: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		sanitationerror: {
			type: DataTypes.STRING,
			allowNull: true
		},
		jobid: {
			type: DataTypes.STRING,
			allowNull: true
		},
		sasaname: {
			type: DataTypes.STRING,
			allowNull: true
		},
		subsystemname: {
			type: DataTypes.STRING,
			allowNull: true
		}
	}, {
		sequelize,
		tableName: 'archive_files',
		schema: 'public'
	});
};
