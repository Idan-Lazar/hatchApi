/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('resendfile', {
		guid: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true
		},
		sysid: {
			type: DataTypes.STRING,
			allowNull: true
		},
		sysname: {
			type: DataTypes.STRING,
			allowNull: true
		},
		statuscode: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		userid: {
			type: DataTypes.STRING,
			allowNull: true
		},
		resenddate: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: CURRENT_TIMESTAMP
		},
		nametored: {
			type: DataTypes.STRING,
			allowNull: true
		}
	}, {
		sequelize,
		tableName: 'resendfile',
		schema: 'public'
	});
};
