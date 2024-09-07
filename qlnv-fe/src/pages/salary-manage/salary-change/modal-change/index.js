import { LocalizationProvider, DatePicker } from '@mui/lab'
import {
    Autocomplete,
    Box,
    Button,
    FormControl,
    Modal,
    TextField,
} from '@mui/material'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import DateAdapter from '@mui/lab/AdapterMoment'
import { Form } from 'react-bootstrap'
import nhanvienApi from '../../../../core/api/nhanvien.api'
import { useStyles } from './style'
import dieuChinhLuongApi from '../../../../core/api/dieuchinhluong.api'
import swal from 'sweetalert'
const ModalDieuChinhLuong = ({ open, onClose, action, rowData }) => {
    const classes = useStyles()
    const [formValue, setFormValue] = useState({
        SoQuyetDinh: '',
        NgayKyKet: new Date(),
        NgayDieuChinhLuong: new Date(),
        SoLuongMoi: 0,
        MaNV: '',
    })
    const [selectNhanVien, setSelectNhanVien] = useState(null)
    const [listNhanVien, setListNhanVien] = useState([])
    const formik = useFormik({
        initialValues: formValue,
        enableReinitialize: true,
        onSubmit: async (values) => {
            if (action === 'Add') {
                const response = await dieuChinhLuongApi.taoDieuChinhLuong(values)
                if (response.code === 200) {
                    swal({
                        title: 'Thao tac thanh cong!',
                        text: '',
                        icon: 'success',
                        button: 'Xác nhận',
                    }).then(() => {
                        onClose()
                    })
                } else {
                    swal({
                        title: 'Thao tac that bai!',
                        text: '',
                        icon: 'error',
                        button: 'Xác nhận',
                    })
                }
            } else {
                values.MaDCL = rowData.MaDCL;
                const response = await dieuChinhLuongApi.hieuChinhDieuChinhLuong(values)
                if (response.code === 200) {
                    swal({
                        title: 'Thao tac thanh cong!',
                        text: '',
                        icon: 'success',
                        button: 'Xác nhận',
                    }).then(() => {
                        onClose()
                    })
                } else {
                    swal({
                        title: 'Thao tac that bai!',
                        text: '',
                        icon: 'error',
                        button: 'Xác nhận',
                    })
                }
            }
            
        },
    })
    const getListNhanVien = async () => {
        const response = await nhanvienApi.layThongTinEmailNhanVien()
        if (response.code === 200) {
            setListNhanVien(response.data)
        }
    }
    const handleSelectNhanVien = (event, newValue) => {
        setSelectNhanVien(newValue)
        setFormValue((prev) => {
            return { ...formik.values, MaNV: newValue.MaNV }
        })
    }

    useEffect(() => {
        getListNhanVien()
    }, [])

    useEffect(() => {
        if (rowData) {
            setFormValue({
                SoQuyetDinh: rowData.SoQuyetDinh,
                NgayKyKet: rowData.NgayKyKet,
                NgayDieuChinhLuong: rowData.NgayDieuChinhLuong,
                SoLuongMoi: rowData.SoLuongMoi,
                MaNV: rowData.MaNV,
            });
            console.log(rowData);
            setSelectNhanVien(() => {
                const nhanvien = listNhanVien.filter(({MaNV: e}) => e === rowData.MaNV);
                return nhanvien[0];
            });
        } else {
            setFormValue({
                SoQuyetDinh: '',
                NgayKyKet: new Date(),
                NgayDieuChinhLuong: new Date(),
                SoLuongMoi: 0,
                MaNV: '',
            });
            setSelectNhanVien(null);
        }
    }, [rowData])
    return (
        <Modal open={open} className={classes.container}>
            <Box className={classes.formContainer}>
                <LocalizationProvider dateAdapter={DateAdapter}>
                    <Form onSubmit={formik.handleSubmit}>
                        <FormControl fullWidth className={classes.formControl}>
                            <TextField
                                type="text"
                                name="SoQuyetDinh"
                                label="Số Quyết Định"
                                variant="outlined"
                                disabled={action === 'Watch' ? true : false}
                                onChange={formik.handleChange}
                                value={formik.values.SoQuyetDinh}
                            ></TextField>
                        </FormControl>
                        <FormControl fullWidth className={classes.formControl}>
                            <Autocomplete
                                className={classes.autoCompleteFullWidth}
                                value={selectNhanVien}
                                disablePortal
                                isOptionEqualToValue={(option, value) =>
                                    option.MaNV === value.MaNV
                                }
                                disabled={action === 'Watch' ? true : false}
                                options={listNhanVien}
                                getOptionLabel={(option) => option.Email}
                                onChange={handleSelectNhanVien}
                                sx={{ width: 300 }}
                                renderInput={(params) => (
                                    <TextField {...params} label="Nhân Viên" />
                                )}
                            />
                        </FormControl>
                        <FormControl fullWidth>
                            <DatePicker
                                label="Ngày Ký Kết"
                                value={formik.values.NgayKyKet}
                                inputFormat="DD/MM/yyyy"
                                onChange={(newValue) => {
                                    setFormValue((prev) => {
                                        return {
                                            ...formik.values,
                                            NgayKyKet: newValue,
                                        }
                                    })
                                }}
                                disabled={action === 'Watch' ? true : false}
                                renderInput={(params) => (
                                    <TextField
                                        className="form-control-custom"
                                        name="NgaySinh"
                                        {...params}
                                    />
                                )}
                            />
                        </FormControl>
                        <FormControl fullWidth>
                            <DatePicker
                                label="Ngày Điều Chỉnh"
                                value={formik.values.NgayDieuChinhLuong}
                                inputFormat="DD/MM/yyyy"
                                onChange={(newValue) => {
                                    setFormValue((prev) => {
                                        return {
                                            ...formik.values,
                                            NgayDieuChinhLuong: newValue,
                                        }
                                    })
                                }}
                                disabled={action === 'Watch' ? true : false}
                                renderInput={(params) => (
                                    <TextField
                                        className="form-control-custom"
                                        name="NgaySinh"
                                        {...params}
                                    />
                                )}
                            />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <TextField
                                type="number"
                                name="SoLuongMoi"
                                label="Lương"
                                variant="outlined"
                                disabled={action === 'Watch' ? true : false}
                                onChange={formik.handleChange}
                                value={formik.values.SoLuongMoi}
                            ></TextField>
                        </FormControl>
                        <FormControl
                            fullWidth
                            className={classes.formControlButton}
                        >
                            <Button variant="contained" type="submit">
                                Lưu
                            </Button>
                            <Button
                                variant="contained"
                                type="button"
                                onClick={onClose}
                            >
                                Đóng
                            </Button>
                        </FormControl>
                    </Form>
                </LocalizationProvider>
            </Box>
        </Modal>
    )
}

export default ModalDieuChinhLuong
