module.exports = (sequelize, DataTypes) => {
    var Model = sequelize.define('TrinhDoHocVan', {
        MaTDHV: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        TenTDHV: {
            type: DataTypes.STRING,
            allowNull: false
        },
        CreateAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        UpdateAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        IsDeleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }, {
        tableName: 'TrinhDoHocVan'
    });

    Model.associate = (models) => {
        Model.hasMany(models.NhanVien, {foreignKey: 'MaTDHV', as: 'nhanvien'});
    };

    return Model;
};