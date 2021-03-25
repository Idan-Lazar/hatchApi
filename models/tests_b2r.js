/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('tests_b2r', {
		filename: {
			type: DataTypes.STRING,
			allowNull: true
		},
		schemaname: {
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
		subsystemname: {
			type: DataTypes.STRING,
			allowNull: true
		}
	}, {
		sequelize,
		tableName: 'tests_b2r',
		schema: 'public'
	});
};
