module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define('MaXacNhan', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        expirationTime: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.fn('NOW')
        }
    }, {
        tableName: 'MaXacNhan',
        underscored: false,
        createdAt: false,
        updatedAt: false
    });
    return Model;
};