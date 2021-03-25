/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('thresholdmonitoringdetails', {
		sysid: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			references: {
				model: {
					tableName: 'systemmapping',
				},
				key: 'sysid'
			}
		},
		subsystemid: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: {
					tableName: 'sub_systems',
				},
				key: 'subsystemid'
			}
		},
		subsystemname: {
			type: DataTypes.STRING,
			allowNull: false
		},
		sysname: {
			type: DataTypes.STRING,
			allowNull: false
		},
		successrate: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		successtime: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		currsuccessrate: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		failurerate: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		failuretime: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		currfailurerate: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		waitingrate: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		waitingtime: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		currwaitingrate: {
			type: DataTypes.INTEGER,
			allowNull: true
		}
	}, {
		sequelize,
		tableName: 'thresholdmonitoringdetails',
		schema: 'public'
	});
};
