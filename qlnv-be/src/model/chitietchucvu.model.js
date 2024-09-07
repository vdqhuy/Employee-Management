module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define('ChiTietChucVu', {
        MaCTCV: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        MaNV: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        MaCV: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        NgayNhanChuc: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.fn('NOW')
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
        }
    }, {
        tableName: 'ChiTietChucVu',
        underscored: false,
        createdAt: false,
        updatedAt: false
    });
    Model.associate = (models) => {
        Model.belongsTo(models.NhanVien, {foreignKey: 'MaNV', as: 'nhanvien'})
        Model.belongsTo(models.ChucVu, {foreignKey: 'MaCV', as: 'chucvu'})
    };

    return Model;
} 