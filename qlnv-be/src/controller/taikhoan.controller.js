import { CapNhatTaiKhoan, CapNhatTaiKhoanDto, doiMatKhau, findRoleOfTaiKhoan, TaoMoiTaiKhoan, TaoTaiKhoanDto, verifyCode } from "../dao/taikhoan.dao.js";
import { ReE, Resp } from "../common/response.js";
import {
  findOneTaiKhoanBaseOnUsername,
  KiemTraMatKhau,
} from "../dao/taikhoan.dao.js";
import jsonwebtoken from "jsonwebtoken";
import * as bycrypt from "bcrypt";
import CONFIG from "../config/config.js";
import axios from "axios";

export async function DangNhap(req, res, next) {
  try {
    const { username, password } = req.body;
    if (!username) {
      return new Resp(res, 500, "Vui lòng nhập username").result;
    }
    if (!password) {
      return new Resp(res, 500, "Vui lòng nhập password").result;
    }

    const taikhoan = await findOneTaiKhoanBaseOnUsername(username);
    if (taikhoan) {
      const kiem_tra_mat_khau = await KiemTraMatKhau(password, taikhoan.Password);
      if (kiem_tra_mat_khau) {
        const token = await TaoTaiKhoanToken({ username: taikhoan.Username });
        const role = await findRoleOfTaiKhoan(taikhoan.Username);
        return new Resp(res, 200, "Đăng nhập thành công", {token: token, role: role}).result;
      } else {
        return new Resp(res, 201, "Tên đăng nhập hoặc mật khẩu của bạn sai")
          .result;
      }
    } else {
      return new Resp(res, 201, "Không tồn tại tài khoản này trong hệ thống!").result;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function DangKy(req, res, next) {
  const { username, password, repassword } = req.body;
  try {
    const taoTaiKhoanDto = new TaoTaiKhoanDto(username, password, repassword);
    await TaoMoiTaiKhoan(taoTaiKhoanDto);
    return new Resp(200, "Tạo tài khoản mới thành công").result;
  } catch (error) {}
}

export async function DoiMatKhauController(req, res, next) {
  const { email, password } = req.body;
  try {
    const {status, message} = await doiMatKhau(email, password);
    if (status === 'success') {
      return new Resp(res, 200, message).result;
    } else if (status === 'pending') {
      return new Resp(res, 202, message).result;
    }
    else {
      return new Resp(res, 201, message).result;
    }
  } catch (error) {}
}

export async function TaoTaiKhoanToken(taikhoan) {
  try {
    const token = jsonwebtoken.sign(
      {
        data: taikhoan,
      },
      CONFIG.token_secret_key,
      {
        expiresIn: CONFIG.token_expiresIn,
      }
    );
    return token;
  } catch (error) {
    console.log(error);
    console.log("traceback TaoTaiKhoanToken");
  }
}

export async function encryptPassword(req, res, next) {
  try {
    const { password } = req.body;
    const hash = await bycrypt.hash(password, CONFIG.saltRounds);
    return new Resp(res, 200, "Hash mat khau thanh cong", hash).result;
  } catch (error) {
    console.error('------>', 'traceback encryptPassword');
    return new ReE(res, 201, 'encrypt that bai').result;
  }
}

export async function taoTaiKhoanController (req, res, next) {
  try {
    const {username, password, MaRole, MaNV} = req.body;
    const hash = await bycrypt.hash(password, CONFIG.saltRounds);
    const dto = new TaoTaiKhoanDto(username, hash, MaRole, MaNV);
    await TaoMoiTaiKhoan(dto);
    return new Resp(res, 200, "tao tai khoan thanh cong").result;
  } catch (error) {
    console.log(error)
    console.error('------>', 'traceback taoTaiKhoanController');
    return new ReE(res, 201, 'tao tai khoan that bai').result;
  }
}

export async function capNhatTaiKhoanController (req, res, next) {
  try {
    const {username, password, MaRole, MaNV, MaTaiKhoan} = req.body;
    const hash = await bycrypt.hash(password, CONFIG.saltRounds);
    const dto = new CapNhatTaiKhoanDto(username, hash, MaRole, MaNV, MaTaiKhoan);
    await CapNhatTaiKhoan(dto);
    return new Resp(res, 200, "Đăng nhập thành công").result;
  } catch (error) {

  }
}

export async function validateRecaptchaController (req, res) {
  try {
    const { token } = req.body;
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=6LcSPTkqAAAAAKBnlE-DbRdmF83jqsUab1jA6X3M&response=${token}`
    );
    console.log(response)
    if (response.data.success) {
      new Resp(res, 200, "Human 👨 👩").result;
    } else {
      new Resp(res, 401, "Robot 🤖").result;
    }
  } catch (error) {

  }
}

export async function checkVerifyCodeController(req, res) {
  const { email, code, password } = req.body;
  try {
    const {status, message} = await verifyCode(email, code, password);
    if (status === 'success') {
      return new Resp(res, 200, message).result;
    }
    else {
      return new Resp(res, 201, message).result;
    }
  } catch (error) {}
}
