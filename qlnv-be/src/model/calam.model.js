module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define('CaLam', {
        MaCa: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        TenCa: {
            type: DataTypes.STRING,
            allowNull: false
        },
        MoTa: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ThoiGianBatDau: {
            type: DataTypes.TIME,
            allowNull: false
        },
        ThoiGianKetThuc: {
            type: DataTypes.TIME,
            allowNull: false
        },
        CreatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        CreatedBy: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        IsDisable: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }, {
        tableName: 'CaLam',
        underscored: false,
        createdAt: false,
        updatedAt: false
    });
    Model.associate = (models) => {
        Model.hasMany(models.ChiTietChucVu, {foreignKey: 'MaCV', as: 'chitietchucvu'})
        Model.hasMany(models.DangKyLichLam, {foreignKey: 'MaCa', as: 'dangkylichlam'})
    };

    return Model;
};