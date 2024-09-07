module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define('Role', {
        MaRole: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Rolename: {
            type: DataTypes.STRING,
            allowNull: false
        },
        CreatedAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        UpdatedAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        IsDeleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }, {
        tableName: 'Role',
        underscored: false,
        createdAt: false,
        updatedAt: false
    });

    Model.associate = (models) => {
        Model.hasMany(models.TaiKhoan, {foreignKey: 'MaRole', as: 'admin'});
    };

    return Model;
};