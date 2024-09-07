import { TaiKhoan, Role, NhanVien , MaXacNhan} from "../model";
import * as bycrypt from "bcrypt";
import { LogModelObject } from "../ultils/logModelObject";
import CONFIG from "../config/config";

export async function TaoMoiTaiKhoan(createTaiKhoanDto) {
    console.log(createTaiKhoanDto)
    try {
        await TaiKhoan.create({
            Username: createTaiKhoanDto.username,
            Password: createTaiKhoanDto.password,
            CreatedAt: new Date(),
            UpdatedAt: new Date(),
            IsDeleted: false,
            MaNV: createTaiKhoanDto.MaNV,
            MaRole: createTaiKhoanDto.MaRole
        });

    } catch (error) {
        throw new Error(`${error.message}, traceback createNewTaiKhoan`);
    }
}

export async function CapNhatTaiKhoan(dto) {
    try {
        const tk = await TaiKhoan.findOne({
            where: {
                MaTaiKhoan: dto.MaTaiKhoan
            }
        });
        await tk.update({
            Username: dto.username,
            // Password: dto.password,
            MaNV: dto.MaNV,
            MaRole: dto.MaRole
        });

    } catch (error) {
        throw new Error(`${error.message}, traceback CapNhatTaiKhoan`);
    }
}

export async function findOneTaiKhoanBaseOnUsername(username) {
    try {
        const findTaiKhoan = await TaiKhoan.findOne({
            where: {
                Username: username,
                IsDeleted: false
            }
        });
        return findTaiKhoan;
    } catch (error) {
        console.error(`traceback findOneTaiKhoanBaseOnUsername ${error}`);
    }
}

export async function findRoleOfTaiKhoan(username) {
    try {
        const findTaiKhoan = await TaiKhoan.findOne({
            where: {
                Username: username
            },
            include: [{
                model: Role,
                as: 'role'
            }]
        });
        if (findTaiKhoan) {
            return findTaiKhoan.role.Rolename;
        } else {
            return null
        }
    } catch (error) {
        console.error('traceback findOneTaiKhoanBaseOnUsername');
        throw new Error(error);
    }
}

export async function KiemTraMatKhau(password_request, current_password_db) {
    try {
        const match = await bycrypt.compare(password_request, current_password_db);
        return match;
    } catch (error) {
        console.error('traceback checkTaiKhoanPassword');
    }
}

export async function findAllTaiKhoanRoleEmployee() {
    try {
        const result = await TaiKhoan.findAll({
            where: {
                '$role.Rolename$': 'Employee'
            },
            include: [{
                model: Role,
                as: 'role'
            }]
        });
        const arrayNv = [];
        result.map((element) => {
            arrayNv.push(element.MaNV)
        });
        return arrayNv
    } catch (error) {
        console.error('traceback findAllTaiKhoanRoleEmployee');
        throw new Error(error)
    }
}

export async function deleteTaiKhoan(MaNV) {
    try {
        const result = await TaiKhoan.findOne({
            where: {
                MaNV: MaNV
            }
        });
        if (result) {
            await result.update({
                IsDeleted: true
            })
        }
    } catch (error) {
        console.error('traceback deleteTaiKhoan');
        throw new Error(error)
    }
}

export async function verifyCode(email, code, password) {
    try {
        const existsCode = await MaXacNhan.findOne({
            where: {
                email: email,
                code: code
            }
        });

        const existsAccount = await NhanVien.findOne({
            where: {
                Email: email
            },
            include: [{
                model: TaiKhoan,
                as: 'admin'
            }]
        });

        if (existsCode !== null) {
            const hash = await bycrypt.hash(password, CONFIG.saltRounds);
            const account = await TaiKhoan.findByPk(existsAccount.admin[0].MaTaiKhoan);
            await account.update({
                Password: hash
            });

            deleteVerificationCode(email, code);
            deleteExpiredVerificationCodes();

            return {status: 'success', message: 'Đổi mật khẩu thành công'};
        }
        return {status: 'fail', message: 'Mã xác nhận không chính xác'};
    } catch (error) {
        console.error('traceback verifyCode');
        console.error(error);
        throw new Error(error)
    }
}

async function deleteVerificationCode(email, code) {
    try {
        const result = await MaXacNhan.destroy({
            where: {
                email: email,
                code: code
            }
        });

        if (result > 0) {
            console.log('Mã xác nhận đã được xóa.');
        } else {
            console.log('Không tìm thấy mã xác nhận phù hợp để xóa.');
        }
    } catch (error) {
        console.error('Lỗi khi xóa mã xác nhận:', error);
    }
}

const cron = require('node-cron');

// Lên lịch chạy hàm sau mỗi 2 giờ
cron.schedule('0 */2 * * *', () => {
    console.log('Xóa mã xác nhận hết hạn chu kỳ 2 giờ.');
    deleteExpiredVerificationCodes()
});

async function deleteExpiredVerificationCodes() {
    const { literal } = require('sequelize');
    try {
        const result = await MaXacNhan.destroy({
            where: literal(`expirationTime < GETDATE()`)
        });
        if (result > 0) {
            console.log('Đã xóa mã xác nhận hết hạn.');
        }
    } catch (error) {
        console.error('Lỗi khi xóa mã xác nhận hết hạn:', error);
    }
}

const nodemailer = require('nodemailer');

function createVerificationCode() {
    // Tạo một mã xác nhận ngẫu nhiên gồm 6 chữ số
    return Math.floor(100000 + Math.random() * 900000).toString();
}

async function storeVerificationCode(email, code) {
    const Sequelize = require('sequelize');
    const expirationTime = Sequelize.literal("DATEADD(hour, 1, GETDATE())");
    try {
        await MaXacNhan.create({
            email: email,
            code: code,
            expirationTime
        });
        console.log('Mã xác nhận đã được lưu.');
        return true;
    } catch (error) {
        console.error('Lỗi khi lưu mã xác nhận:', error);
    }
    return false;
}

// Hàm cấu hình nodemailer transporter
function createTransporter() {
    return nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'vdqhuy99@gmail.com',
            pass: 'uqhqemwhrheapetk'
        }
    });
}
// nzmszlwhhwamzglb

// Hàm gửi email
async function sendVerificationEmail(email, code) {
    const isStored = await storeVerificationCode(email, code);
    if (!isStored) {
        console.error('Không thể lưu mã xác nhận vào cơ sở dữ liệu.');
        return false;
    } else {
        const transporter = createTransporter();
        const mailOptions = {
            from: 'VinmartCompany@gmail.com', // Địa chỉ email người gửi
            to: email, // Email người nhận
            subject: 'Xác Nhận Thay Đổi Mật Khẩu',
            html: `
                <p>Chào bạn,</p>
                <p>Mã xác nhận đổi mật khẩu của bạn là: <strong>${code}</strong></p>
                <p>Mã này sẽ hết hạn trong 1 giờ.</p>
                <p>Nếu bạn không yêu cầu thay đổi mật khẩu, vui lòng bỏ qua email này.</p>
            `
        };

        try {
            let info = await transporter.sendMail(mailOptions);
            console.log('Email đã được gửi: %s', info.messageId);
            return true;
        } catch (error) {
            console.error('Error sending email: ', error);
            return false;
        }
    }
}

export async function doiMatKhau(email, password) {
    try {
        const existsAccount = await NhanVien.findOne({
            where: {
                Email: email
            },
            include: [{
                model: TaiKhoan,
                as: 'admin'
            }]
        });

        if (!existsAccount) {
            return {status: 'fail', message: 'Email không tồn tại'}
        }

        if (!existsAccount.admin || existsAccount.admin.length < 1) {
            return {status: 'fail', message: 'Chưa có tài khoản'}
        }

        const verificationCode = createVerificationCode()
        const emailSent = await sendVerificationEmail(email, verificationCode);
        if (!emailSent) return { status: 'fail', message: 'Không thể gửi email xác nhận' };

        if (emailSent) {
            return { status: 'pending', message: 'Mã xác nhận đã được gửi tới email của bạn.'};
        }

        return {status: 'success', message: 'Đổi mật khẩu thành công'}
    } catch (error) {
        console.error('traceback doiMatKhau');
        console.error(error);
        throw new Error(error)
    }
}

export class TaoTaiKhoanDto {
    constructor(username, password, MaRole, MaNV) {
        this.username = username;
        this.password = password;
        this.MaRole = MaRole;
        this.MaNV = MaNV;
    }
}

export class CapNhatTaiKhoanDto {
    constructor(username, password, MaRole, MaNV, MaTaiKhoan) {
        this.username = username;
        this.password = password;
        this.MaRole = MaRole;
        this.MaNV = MaNV;
        this.MaTaiKhoan = MaTaiKhoan;
    }
}