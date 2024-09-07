import { Resp } from "../common/response.js";
import jsonwebtoken from "jsonwebtoken";
import CONFIG from "../config/config.js";
import { findOneTaiKhoanBaseOnUsername } from "../dao/taikhoan.dao.js";

export async function adminGuard(req, res, next) {
    try {
        let token;
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return next(
                new Error('Fail, You dont have permission for this action'),
                req, res, next
            )
        } else {
            const decode = jsonwebtoken.verify(token, CONFIG.token_secret_key);
            const user = await findOneTaiKhoanBaseOnUsername(decode.data.username);
            req.user = user;
            return next(null, req, res, next);
        }
    } catch (error) {
        console.log(error)
        next(error);
    }
}