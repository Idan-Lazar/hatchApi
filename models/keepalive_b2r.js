/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('keepalive_b2r', {
		filepath: {
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
		schemaname: {
			type: DataTypes.STRING,
			allowNull: true
		},
		lastresult: {
			type: DataTypes.BOOLEAN,
			allowNull: true
		},
		lastsuccess: {
			type: DataTypes.DATE,
			allowNull: true
		},
		lastcheck: {
			type: DataTypes.DATE,
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
		tableName: 'keepalive_b2r',
		schema: 'public'
	});
};
