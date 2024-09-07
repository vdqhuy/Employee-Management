module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define('TaiKhoan', {
        MaTaiKhoan: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Password: {
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
        },
        MaRole: {
            type: DataTypes.INTEGER,
        },
        MaNV: {
            type: DataTypes.INTEGER,
        }
    }, {
        tableName: 'TaiKhoan',
        underscored: false,
        createdAt: false,
        updatedAt: false
    });
    Model.associate = (models) => {
        Model.belongsTo(models.Role, {foreignKey: 'MaRole', as: 'role'});
        Model.belongsTo(models.NhanVien, {foreignKey: 'MaNV', as: 'nhanvien'});
    };
    return Model;
}