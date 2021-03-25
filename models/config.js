/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('config', {
		sysname: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true
		},
		sysid: {
			type: DataTypes.STRING,
			allowNull: true
		},
		port: {
			type: DataTypes.STRING,
			allowNull: true
		},
		format: {
			type: DataTypes.STRING,
			allowNull: true
		}
	}, {
		sequelize,
		tableName: 'config',
		schema: 'public'
	});
};
