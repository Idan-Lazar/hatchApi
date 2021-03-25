/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('thresholdmessages', {
		msgid: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		createdat: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: now()
		},
		sysid: {
			type: DataTypes.INTEGER,
			allowNull: false,
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
		checkendtime: {
			type: DataTypes.TIME,
			allowNull: true
		},
		checkindication: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		filesrate: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		totalfilesnum: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		messagetime: {
			type: DataTypes.TIME,
			allowNull: true
		},
		read: {
			type: DataTypes.INTEGER,
			allowNull: true
		}
	}, {
		sequelize,
		tableName: 'thresholdmessages',
		schema: 'public'
	});
};
