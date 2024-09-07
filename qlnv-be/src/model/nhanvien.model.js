const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define('NhanVien', {
        MaNV: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        TenNV: {
            type: DataTypes.STRING,
            allowNull: false
        },
        NgaySinh: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: 0
        },
        DiaChi: {
            type: DataTypes.STRING,
            allowNull: false
        },
        GioiTinh: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        DienThoai: {
            type: DataTypes.STRING,
            allowNull: false
        },
        SoCCCD: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Email: {
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
        MaTDHV: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    }, {
        tableName: 'NhanVien',
        underscored: false,
        createdAt: false,
        updatedAt: false
    });

    Model.associate = (models) => {
        Model.belongsTo(models.TrinhDoHocVan, {foreignKey: 'MaTDHV', as: 'trinhdohocvan'})
        Model.hasMany(models.ChiTietChucVu, {foreignKey: 'MaNV', as: 'chitietchucvu'})
        Model.hasMany(models.DangKyLichLam, {foreignKey: 'MaNV', as: 'dangkylichlam'})
        Model.hasMany(models.TaiKhoan, {foreignKey: 'MaNV', as: 'admin'})
        Model.hasMany(models.DieuChinhLuong, {foreignKey: 'MaNV', as: 'dieuchinhluong'})
    };

    return Model;
};