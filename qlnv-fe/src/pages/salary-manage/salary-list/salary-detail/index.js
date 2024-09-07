import {
    Box,
    Button,
    FormControl,
    Modal,
    TextField,
} from '@mui/material'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { useStyles } from './style'
import luongApi from '../../../../core/api/luong.api'
import swal from 'sweetalert'
const SalaryDetail = ({ open, onClose, rowData }) => {
    const classes = useStyles()
    const [formValue, setFormValue] = useState({
        MaLuong: '',
        KhoanTru: 0,
        PhuCap: 0,
    })
    const formik = useFormik({
        initialValues: formValue,
        enableReinitialize: true,
        onSubmit: async (values) => {
            console.log(values)
            const response = await luongApi.hieuChinhLuong(values)
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
        },
    })

    useEffect(() => {
        if (rowData) {
            setFormValue({
                MaLuong: rowData.MaLuong,
                KhoanTru: rowData.KhoanTru,
                PhuCap: rowData.PhuCap,
            })
        }
    }, [rowData])
    return (
        <Modal open={open} className={classes.container}>
            <Box className={classes.formContainer}>
                <Form onSubmit={formik.handleSubmit}>
                    <FormControl fullWidth className={classes.formControl}>
                        <TextField
                            type="number"
                            name="PhuCap"
                            label="Phụ Cấp"
                            variant="outlined"
                            onChange={formik.handleChange}
                            value={formik.values.PhuCap}
                        ></TextField>
                    </FormControl>
                    <FormControl fullWidth className={classes.formControl}>
                        <TextField
                            type="number"
                            name="KhoanTru"
                            label="Khoản Trừ"
                            variant="outlined"
                            onChange={formik.handleChange}
                            value={formik.values.KhoanTru}
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
            </Box>
        </Modal>
    )
}

export default SalaryDetail
