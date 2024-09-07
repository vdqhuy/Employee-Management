module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define('DieuChinhLuong', {
        MaDCL: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        SoQuyetDinh: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        NgayKyKet: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.fn('NOW')
        },
        NgayDieuChinhLuong: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.fn('NOW')
        },
        SoLuongMoi: {
            type: DataTypes.NUMBER,
            allowNull: false,
            defaultValue: 0
        },
        CreateAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.fn('NOW')
        },
        MaNV: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, {
        tableName: 'DieuChinhLuong',
        underscored: false,
        createdAt: false,
        updatedAt: false
    });
    Model.associate = (models) => {
        Model.belongsTo(models.NhanVien, {foreignKey: 'MaNV', as: 'nhanvien'})
    };

    return Model;
};