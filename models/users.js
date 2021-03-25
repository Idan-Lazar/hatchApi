/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('users', {
		userid: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true
		},
		role: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: "0"
		},
		systems: {
			type: DataTypes.ARRAY,
			allowNull: true
		},
		phone: {
			type: DataTypes.STRING,
			allowNull: true
		},
		name: {
			type: DataTypes.STRING,
			allowNull: true
		},
		projects: {
			type: DataTypes.ARRAY,
			allowNull: true
		}
	}, {
		sequelize,
		tableName: 'users',
		schema: 'public'
	});
};
