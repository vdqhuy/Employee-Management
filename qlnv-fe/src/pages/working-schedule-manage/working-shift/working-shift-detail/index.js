import { LocalizationProvider, TimePicker } from '@mui/lab'
import {
    Box,
    FormControl,
    TextField,
    Button,
    Modal,
    Checkbox,
    FormControlLabel,
} from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { Alert } from 'bootstrap'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import swal from 'sweetalert'
import caLamApi from '../../../../core/api/calam.api'
import { useStyles } from './style'

const WorkingShiftDetail = ({ open, onClose, rowData, action }) => {
    const initalizeFormValue = {
        TenCa: '',
        MoTa: '',
        ThoiGianBatDau: new Date(new Date().setMinutes(0)).getTime(),
        ThoiGianKetThuc: new Date(new Date().setMinutes(0)).getTime(),
        IsDisable: false,
    }
    const [formValue, setFormValue] = useState(initalizeFormValue)
    const [isHadSubmit, setIsHadSubmit] = useState(false)
    const formik = useFormik({
        initialValues: formValue,
        enableReinitialize: true,
        onSubmit: async (values) => {
            if (action === 'Add') {
                const response = await caLamApi.themCaLam(values);
                if (response.code === 200) {
                    swal({
                        title: 'Thêm ca làm thành công!',
                        text: '',
                        icon: 'success',
                        button: 'Xác nhận',
                    }).then(() => {
                        onClose();
                    })
                } else {
                    swal({
                        title: 'Thêm ca làm thất bại!',
                        text: '',
                        icon: 'error',
                        button: 'Xác nhận',
                    })
                }
            } else {
                console.log(values)
                values.MaCa = rowData.MaCa;
                const response = await caLamApi.hieuChinhCaLam(values);
                if (response.code === 200) {
                    swal({
                        title: 'Hiệu chỉnh ca làm thành công!',
                        text: '',
                        icon: 'success',
                        button: 'Xác nhận',
                    }).then(() => {})
                } else {
                    swal({
                        title: 'Hiệu chỉnh ca làm thất bại!',
                        text: '',
                        icon: 'error',
                        button: 'Xác nhận',
                    })
                }
            }
        },
        validate: (values) => {
            const errors = {}
            if (!values.TenCa) {
                errors.TenCa = 'Tên ca không được để trống!'
            }
            return errors
        },
    })
    const onChangeGioBatDau = (newValue) => {
        const value = new Date(newValue).setSeconds(0)
        setFormValue(() => {
            return { ...formik.values, ThoiGianBatDau: value }
        })
    }
    const onChangeGioKetThuc = (newValue) => {
        const value = new Date(newValue).setSeconds(0)
        setFormValue(() => {
            return { ...formik.values, ThoiGianKetThuc: value }
        })
    }
    const classes = useStyles()

    useEffect(() => {
        if (rowData) {
            console.log(rowData)
            const thoiGianBatDau = rowData.ThoiGianBatDau.split(':')
            const thoiGianKetThuc = rowData.ThoiGianKetThuc.split(':')
            setFormValue({
                TenCa: rowData.TenCa,
                MoTa: rowData.MoTa,
                ThoiGianBatDau: new Date().setHours(
                    thoiGianBatDau[0],
                    thoiGianBatDau[1],
                    thoiGianBatDau[2],
                    0
                ),
                ThoiGianKetThuc: new Date().setHours(
                    thoiGianKetThuc[0],
                    thoiGianKetThuc[1],
                    thoiGianKetThuc[2],
                    0
                ),
                IsDisable: rowData.IsDisable
            })
        }
    }, [rowData])

    return (
        <Modal open={open} className={classes.container}>
            <Box className={classes.formContainer}>
                <Form className={classes.form} onSubmit={formik.handleSubmit}>
                    <FormControl className={classes.formControl}>
                        <TextField
                            label="Tên Ca"
                            name="TenCa"
                            value={formik.values.TenCa}
                            onChange={formik.handleChange}
                            variant="outlined"
                        />
                        {formik.errors.TenCa && isHadSubmit ? (
                            <Alert className="form-errors" severity="error">
                                {formik.errors.TenCa}
                            </Alert>
                        ) : null}
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <TextField
                            label="Mô Tả"
                            name="MoTa"
                            value={formik.values.MoTa}
                            onChange={formik.handleChange}
                            variant="outlined"
                        />
                    </FormControl>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Box className={classes.formControlTimePicker}>
                            <TimePicker
                                // inputFormat="hh:mm"
                                label="Giờ Bắt Đầu"
                                value={formik.values.ThoiGianBatDau}
                                views={['hours']}
                                onChange={(newValue) =>
                                    onChangeGioBatDau(newValue)
                                }
                                renderInput={(params) => (
                                    <TextField
                                        className={classes.timePicker}
                                        name="ThoiGianBatDau"
                                        {...params}
                                    />
                                )}
                            />
                            <TimePicker
                                // inputFormat="hh:mm"
                                label="Giờ Kết Thúc"
                                value={formik.values.ThoiGianKetThuc}
                                minutesStep={60}
                                onChange={(newValue) =>
                                    onChangeGioKetThuc(newValue)
                                }
                                views={['hours']}
                                renderInput={(params) => (
                                    <TextField
                                        className={classes.timePicker}
                                        name="ThoiGianKetThuc"
                                        {...params}
                                    />
                                )}
                            />
                        </Box>
                    </LocalizationProvider>
                    <FormControl className={classes.formControlCheckbox}>
                        <FormControlLabel
                            control={<Checkbox />}
                            label="An Thong Tin"
                            name="IsDisable"
                            value={true}
                            checked={formik.values.IsDisable}
                            onChange={formik.handleChange}
                        />
                    </FormControl>
                    <Box className={classes.formControlAction}>
                        {action !== 'Watch' ? (
                            <Button
                                variant="contained"
                                type="submit"
                                onClick={() => {
                                    setIsHadSubmit(true);
                                }}
                            >
                                Luu thong tin
                            </Button>
                        ) : null}
                        <Button
                            variant="contained"
                            // hidden={action === 'view' ? true : false}
                            type="button"
                            onClick={() => {
                                setFormValue(initalizeFormValue)
                                onClose()
                            }}
                        >
                            Đóng
                        </Button>
                    </Box>
                </Form>
            </Box>
        </Modal>
    )
}

export default WorkingShiftDetail
