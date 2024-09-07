import { Role } from "../model";
export async function danhSanhRole () {
    try {
        const result = await Role.findAll({

        });
        return result;
    } catch (error) {
        console.error('------>', 'traceback danhSanhRole');
        throw new Error(error);
    }
}