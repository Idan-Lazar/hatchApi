/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('keepalive_r2b', {
		schemaname: {
			type: DataTypes.STRING,
			allowNull: false
		},
		sysname: {
			type: DataTypes.STRING,
			allowNull: true
		},
		sysid: {
			type: DataTypes.STRING,
			allowNull: true
		},
		lastreceive: {
			type: DataTypes.DATE,
			allowNull: true
		},
		subsystemname: {
			type: DataTypes.STRING,
			allowNull: true
		},
		wasalerted: {
			type: DataTypes.BOOLEAN,
			allowNull: true
		}
	}, {
		sequelize,
		tableName: 'keepalive_r2b',
		schema: 'public'
	});
};
