module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define('ChucVu', {
        MaCV: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        TenChucVu: {
            type: DataTypes.STRING,
            allowNull: false
        },
        PhuCap: {
            type: DataTypes.NUMBER,
            allowNull: false,
            defaultValue: 0
        },
        GhiChu: {
            type: DataTypes.STRING,
            allowNull: false
        },
        CreateAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.fn('NOW')
        },
        UpdateAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.fn('NOW')
        },
        IsDelete: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        IsFullTime: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }, {
        tableName: 'ChucVu',
        underscored: false,
        createdAt: false,
        updatedAt: false
    });
    Model.associate = (models) => {
        Model.hasMany(models.ChiTietChucVu, {foreignKey: 'MaCV', as: 'chitietchucvu'})
    };

    return Model;
};