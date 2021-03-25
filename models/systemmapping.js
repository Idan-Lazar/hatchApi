/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('systemmapping', {
		sysid: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		sysname: {
			type: DataTypes.STRING,
			allowNull: true
		}
	}, {
		sequelize,
		tableName: 'systemmapping',
		schema: 'public'
	});
};
