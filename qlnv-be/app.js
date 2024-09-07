import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import xss from 'xss-clean';
import hpp from 'hpp';
var http = require('http');
const https = require('https');
const fs = require('fs');
import TaiKhoanRoutes from './src/routes/taikhoanRoutes.js';
import NhanVienRoutes from './src/routes/nhanvienRoutes.js';
import ChucVuRoutes from './src/routes/chucvuRoutes.js';
import ChiTietChucVuRoutes from './src/routes/chitietchuvuRoutes.js';
import DangKyLichLamRoutes from './src/routes/dangkylichlamRoute.js';
import CaLamRoutes from './src/routes/calamRoutes.js';
import DieuChinhLuongRoutes from './src/routes/dieuchinhluongRoutes.js';
import LuongRoutes from './src/routes/luongRoutes.js';
import RoleRoutes from './src/routes/roleRoutes.js';
import bodyParser from 'body-parser';


const app = express();

//Allow Cross-Origin requests
app.use(cors());

//Set security HTTP headers
app.use(helmet());

app.use(xss());

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
)

app.use(hpp());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// SET UP ROUTES
app.use('/admin', TaiKhoanRoutes);
app.use('/nhan-vien', NhanVienRoutes);
app.use('/chuc-vu', ChucVuRoutes);
app.use('/chi-tiet-chuc-vu', ChiTietChucVuRoutes);
app.use('/dang-ky-lich-lam', DangKyLichLamRoutes);
app.use('/ca-lam', CaLamRoutes);
app.use('/dieu-chinh-luong', DieuChinhLuongRoutes);
app.use('/luong', LuongRoutes);
app.use('/role', RoleRoutes);

app.get('/', (req, res) => {
    console.log('vao day')
    res.json({ info: 'Node.js, Express, and Postgres API' })
})

app.use('*', (req, res, next) => {
    const err = new Error('undefined route');
    next(err.message, req, res, next);
});
import { sequelize } from './src/model';
sequelize.authenticate().then(() =>
{
    console.log('Connected to SQL database: qlnv');
}).catch(err =>
{
    console.log(err)
    console.error('Unable to connect to SQL database:');
});

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

var httpServer = http.createServer(app);
var httpsServer = https.createServer(options, app);

httpServer.listen(3002, () => {
    console.log('Application is running http on port 3002')
});
httpsServer.listen(3001, () => {
    console.log('Application is running https on port 3001')
});
// const server = Server(app);
// server.listen(3001, () => {
//     console.log(`Application is running on port ${3001}`);
// })