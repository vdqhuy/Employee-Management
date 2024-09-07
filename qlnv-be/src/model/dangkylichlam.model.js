module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define('DangKyLichLam', {
        MaLichLam: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        NgayDangKy: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: new Date()
        },
        GioLam: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        TrangThai: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'PENDING'
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
        MaNV: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        MaCa: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'DangKyLichLam',
        underscored: false,
        createdAt: false,
        updatedAt: false
    });
    Model.associate = (models) => {
        Model.belongsTo(models.NhanVien, {foreignKey: 'MaNV', as: 'nhanvien'})
        Model.belongsTo(models.CaLam, {foreignKey: 'MaCa', as: 'calam'})
    };

    return Model;
};