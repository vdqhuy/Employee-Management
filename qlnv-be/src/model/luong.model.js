module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define('Luong', {
        MaLuong: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Luong: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 0
        },
        PhuCap: {
            type: DataTypes.NUMBER,
            allowNull: false,
            defaultValue: 0
        },
        KhoanTru: {
            type: DataTypes.NUMBER,
            allowNull: false,
            defaultValue: 0
        },
        CreatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.fn('NOW')
        },
        UpdatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.fn('NOW')
        },
        IsDeleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        MaNV: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, {
        tableName: 'Luong',
        underscored: false,
        createdAt: false,
        updatedAt: false
    });
    Model.associate = (models) => {
        Model.belongsTo(models.NhanVien, {foreignKey: 'MaNV', as: 'nhanvien'})
    };

    return Model;
};