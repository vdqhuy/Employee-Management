import * as bycrypt from "bcrypt";
import CONFIG from '../config/config.js';
export async function encryptPassword(currentPassword) {
    const hash = await bycrypt.hash(currentPassword, CONFIG.saltRounds);
    return hash;
}