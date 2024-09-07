import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    TextField,
    Button,
} from '@mui/material'
// import { DatePicker } from '@mui/x-date-pickers'
import { useCallback, useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import caLamApi from '../../../../core/api/calam.api'
import { useStyles } from './style'
import { useFormik } from 'formik'
import { DatePicker, LocalizationProvider } from '@mui/lab'
import DateAdapter from '@mui/lab/AdapterMoment'
import dangKyLichLamApi from '../../../../core/api/dangkylichlam.api'
import swal from 'sweetalert'
import moment from 'moment'

const WorkingScheduleRegist = ({ open, onClose, rawData, action, role }) => {
    const [listTenCaLam, setListTenCaLam] = useState([])
    const [formValue, setFormValue] = useState({
        MaCa: '',
        NgayDangKy: new Date(),
        GioLam: 0,
        TrangThai: 'PENDING',
    })
    const getListCaLam = useCallback(async () => {
        const response = await caLamApi.danhSachTenCaLam()
        if (response.code === 200) {
            setListTenCaLam(response.data)
            // setFormValue((prev) => ({...prev, MaCa: response.data[0].MaCa}))
        } else {
            setListTenCaLam([])
        }
    }, [])

    useEffect(() => {
        getListCaLam()
    })

    useEffect(() => {
        if (rawData) {
            setFormValue({
                MaCa: rawData.MaCa,
                NgayDangKy: rawData.NgayDangKy,
                GioLam: rawData.GioLam,
                TrangThai: rawData.TrangThai,
            })
        } else {
            setFormValue({
                MaCa: '',
                NgayDangKy: new Date(),
                GioLam: 0,
                TrangThai: 'PENDING',
            })
        }
    }, [rawData])

    const formik = useFormik({
        initialValues: formValue,
        enableReinitialize: true,
        onSubmit: async (values) => {
            const response = await dangKyLichLamApi.dangKyLichLam(values)
            if (response.code === 200) {
                swal({
                    title: 'Dang ky ca lam thanh cong!',
                    text: '',
                    icon: 'success',
                    button: 'Xác nhận',
                }).then(() => {
                    onClose()
                })
            } else {
                swal({
                    title: 'Dang ky ca lam that bai!',
                    text: '',
                    icon: 'error',
                    button: 'Xác nhận',
                })
            }
        },
    })

    const onApprove = async () => {
        const response = await dangKyLichLamApi.approveLichLam({
            MaLichLam: rawData.MaLichLam,
        })
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

    const onReject = async () => {
        const response = await dangKyLichLamApi.rejectLichLam({
            MaLichLam: rawData.MaLichLam,
        })
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

    const onDone = async () => {
        const response = await dangKyLichLamApi.doneLichLam({
            MaLichLam: rawData.MaLichLam,
        })
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

    const onDelete = async () => {
        const response = await dangKyLichLamApi.deleteLichLam({
            MaLichLam: rawData.MaLichLam,
        })
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

    const classes = useStyles()
    return (
        <Modal open={open} className={classes.container}>
            <Box className={classes.formContainer}>
                <Form onSubmit={formik.handleSubmit}>
                    <FormControl fullWidth>
                        <InputLabel>Ca Làm Việc</InputLabel>
                        <Select
                            disabled={role === 'Employee' && formik.values.TrangThai === 'PENDING' ? false : true}
                            value={formValue.MaCa}
                            label="TenCa"
                            name="MaCa"
                            onChange={(event) => {
                                setFormValue(() => ({
                                    ...formik.values,
                                    MaCa: event.target.value,
                                }))
                            }}
                        >
                            {listTenCaLam.map((element) => (
                                <MenuItem
                                    key={element.MaCa}
                                    value={element.MaCa}
                                >
                                    {element.TenCa}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <LocalizationProvider dateAdapter={DateAdapter}>
                        <FormControl fullWidth>
                            <DatePicker
                                label="Ngày Đăng Ký"
                                value={formik.values.NgayDangKy}
                                inputFormat="DD/MM/yyyy"
                                minDate={moment()}
                                onChange={(newValue) => {
                                    setFormValue((prev) => {
                                        return {
                                            ...formik.values,
                                            NgayDangKy: newValue,
                                        }
                                    })
                                }}
                                disabled={role === 'Employee' && formik.values.TrangThai === 'PENDING' ? false : true}
                                renderInput={(params) => (
                                    <TextField
                                        className="form-control-custom"
                                        name="NgaySinh"
                                        {...params}
                                    />
                                )}
                            />
                        </FormControl>
                    </LocalizationProvider>
                    <Box className={classes.formControlButton}>
                        { formik.values.TrangThai === 'PENDING' ? (
                            <Button
                                variant="contained"
                                hidden={
                                    action !== 'Watch' && role === 'Employee'
                                        ? false
                                        : true
                                }
                                type="submit"
                            >
                                Lưu
                            </Button>
                        ) : null}

                        <Button
                            variant="contained"
                            hidden={role === 'Manager' ? false : true}
                            type="button"
                            onClick={onApprove}
                        >
                            Chấp Nhận
                        </Button>
                        <Button
                            variant="contained"
                            hidden={role === 'Manager' ? false : true}
                            type="button"
                            onClick={onReject}
                        >
                            Từ Chối
                        </Button>
                        <Button
                            variant="contained"
                            hidden={role === 'Employee' && (formik.values.TrangThai === 'PENDING' || formik.values.TrangThai === 'REJECT') ? false : true}
                            type="button"
                            onClick={onDelete}
                        >
                            Xoá
                        </Button>
                        { formik.values.TrangThai === 'APPROVE' ? (
                            <Button
                                variant="contained"
                                hidden={
                                    role === 'Employee' && action === 'Edit'
                                        ? false
                                        : true
                                }
                                type="button"
                                onClick={onDone}
                            >
                                Hoàn Thành
                            </Button>
                        ) : null}

                        <Button
                            variant="contained"
                            type="button"
                            onClick={onClose}
                        >
                            Đóng
                        </Button>
                    </Box>
                </Form>
            </Box>
        </Modal>
    )
}

export default WorkingScheduleRegist
