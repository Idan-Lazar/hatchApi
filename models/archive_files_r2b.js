/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('archive_files_r2b', {
		sysid: {
			type: DataTypes.INTEGER,
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
		filename: {
			type: DataTypes.STRING,
			allowNull: true
		},
		filesize: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		savedat: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: "(CURRENT_TIMESTAMP + 03:00:00"
		},
		readat: {
			type: DataTypes.DATE,
			allowNull: true
		},
		lastpull: {
			type: DataTypes.DATE,
			allowNull: true
		},
		status: {
			type: DataTypes.STRING,
			allowNull: true
		},
		container: {
			type: DataTypes.STRING,
			allowNull: true
		},
		subsystemname: {
			type: DataTypes.STRING,
			allowNull: true
		}
	}, {
		sequelize,
		tableName: 'archive_files_r2b',
		schema: 'public'
	});
};
