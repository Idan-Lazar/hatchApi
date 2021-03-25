/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('priorities', {
		subsystemid: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			references: {
				model: {
					tableName: 'sub_systems',
				},
				key: 'subsystemid'
			}
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
		prefix: {
			type: DataTypes.ARRAY,
			allowNull: false,
			primaryKey: true
		},
		sortindex: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	}, {
		sequelize,
		tableName: 'priorities',
		schema: 'public'
	});
};
