/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('sub_systems', {
		subsystemid: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		subsystemname: {
			type: DataTypes.STRING,
			allowNull: false
		},
		sysid: {
			type: DataTypes.ARRAY,
			allowNull: true
		},
		prefix: {
			type: DataTypes.ARRAY,
			allowNull: true
		}
	}, {
		sequelize,
		tableName: 'sub_systems',
		schema: 'public'
	});
};
