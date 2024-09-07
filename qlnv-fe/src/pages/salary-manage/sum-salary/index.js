import { Modal, Box, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import swal from "sweetalert";
import luongApi from "../../../core/api/luong.api";
import { useStyles } from "./style";

const ModalSumSalary = ({open, onClose}) => {
    const classes = useStyles();
    const [luong, setLuong] = useState({
        totalHours: 0,
        totalDays: 0,
        baseSalary: 0,
        salary: 0,
        phuCapChucVu: 0,
        phuCapThem: 0,
        KhoanTru: 0,
        MaNV: '',
        IsFullTime: false,
    });
    const onTinhLuong = async () => {
        const response = await luongApi.tinhLuong();
        if (response.code === 200) {
            setLuong({
                totalHours: response.data.totalHours,
                totalDays: response.data.totalDays,
                baseSalary: parseInt(response.data.baseSalary),
                salary: response.data.salary,
                MaNV: response.data.MaNV,
                phuCapThem: parseInt(response.data.phuCapThem),
                KhoanTru: parseInt(response.data.KhoanTru),
                phuCapChucVu: response.data.phuCapChucVu,
                IsFullTime: response.data.IsFullTime
            })
        }
    }
    const onPublicLuong = async () => {
        const values = {
            MaNV: luong.MaNV, 
            LuongCB: luong.salary, 
            KhoanTru: luong.KhoanTru, 
            PhuCap: luong.phuCapThem
        }
        const response = await luongApi.themLuong(values);
        if (response.code === 200) {
            swal({
                title: 'Thao tac thanh cong!',
                text: '',
                icon: 'success',
                button: 'Xác nhận',
            }).then(() => (onClose()))
        } else {
            swal({
                title: 'Thao tac that bai!',
                text: '',
                icon: 'error',
                button: 'Xác nhận',
            })
        }
    }

    useEffect(() => {
        if (open) {
            onTinhLuong();
        }
        
    }, [open])
    return (
        <Modal open={open} className={classes.container}>
            <Box className={classes.formContainer}>
                <Box>
                    <Typography>
                        {luong.IsFullTime ? `Tổng số ngày làm trong tháng này: ${luong.totalDays}` : `Tổng số giờ làm trong tháng này: ${luong.totalHours}`}
                    </Typography>
                    <Typography>
                        Lương cơ bản: {luong.baseSalary}
                    </Typography>
                    <Typography>
                        Lương phụ cấp chức vụ: {luong.phuCapChucVu}
                    </Typography>
                    <Typography>
                        Tổng lương làm việc tháng: {luong.salary}
                    </Typography>
                    <Typography>
                        Phụ cấp thêm : {luong.phuCapThem}
                    </Typography>
                    <Typography>
                        Khoản trừ: {luong.KhoanTru}
                    </Typography>
                    <Typography>
                        --------------------------
                    </Typography>
                    <Typography>
                        Tổng số tiền lương nhận được : {luong.salary + (luong.phuCapThem || 0) - (luong.KhoanTru || 0)}
                    </Typography>
                </Box>
                <Box className={classes.formControlButton}>
                <Button variant="contained" onClick={onPublicLuong}>
                        Xác Nhận
                    </Button>
                    <Button variant="contained" onClick={onClose}>
                        Close
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default ModalSumSalary;