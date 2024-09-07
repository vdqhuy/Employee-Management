'use strict';
var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(__filename);
var db = {};

Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
  return this._applyTimezone(date, options).format('YYYY-MM-DD HH:mm:ss.SSS');
};

// const credentials = {
//     dialect: "mysql",
//     user: "root",
//     host: "localhost",
//     database: "qlnv",
//     password: "hongduong1997",
//     port: 3306,
// };

// const sequelize = new Sequelize('qlnv', 'sa', '123', {
//   dialect: 'mssql',
//   host: 'localhost',
//   port: '1433',
//   logging: false
// });

const sequelize = new Sequelize('qlnv', 'avnadmin', 'AVNS_AOCEaXwFsku9VPZ73iO', {
  dialect: 'postgres',
  host: 'pg-2eb894b2-vdqhuy99-6b45.e.aivencloud.com',
  port: '12807',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // Thay đổi giá trị này tùy vào môi trường và yêu cầu bảo mật của bạn
    }
  }
});

// const sequelize = new Sequelize(credentials.database, credentials.user, credentials.password, {
//     host: credentials.host,
//     dialect: credentials.dialect,
//     port: credentials.port,
//     operatorsAliases: 0,
//     logging: 0,
// });

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    // var model = sequelize['import'](path.join(__dirname, file));
    var model = require(path.join(__dirname, file))(sequelize,
      Sequelize);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  // console.log(modelName)
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;


// export default sequelize;


