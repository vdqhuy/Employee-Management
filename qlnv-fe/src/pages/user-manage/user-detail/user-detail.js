import {
    Box,
    FormControl,
    TextField,
    Button,
    Alert,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
} from '@mui/material'
import { useFormik } from 'formik'
import { useCallback, useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import './user-detail.css'
import DateAdapter from '@mui/lab/AdapterMoment'
import { DatePicker, LocalizationProvider } from '@mui/lab'
import nhanvienApi from '../../../core/api/nhanvien.api'
import { useSearchParams } from 'react-router-dom'
import swal from 'sweetalert'

const UserDetail = ({ navigate }) => {
    const [searchPath, setSearchPath] = useSearchParams()
    const [action, setAction] = useState('')
    const [formValue, setFormValue] = useState({
        MaNV: '',
        TenNV: '',
        NgaySinh: new Date(),
        DiaChi: '',
        GioiTinh: false,
        DienThoai: '',
        SoCCCD: '',
        Email: '',
    })
    const [isHadSubmit, setIsHadSubmit] = useState(false)

    const getUserDetail = useCallback(async () => {
        const nhan_vien_id = searchPath.get('id')
        setAction(searchPath.get('action'))
        if (searchPath.get('id')) {
            const response = await nhanvienApi.layThongTinNhanVien(nhan_vien_id)
            if (response.code === 200) {
                const data = response.data;
                setFormValue({...data})
            }
        }
    }, [searchPath])

    useEffect(() => {
        getUserDetail()
    }, [getUserDetail])

    const formik = useFormik({
        initialValues: formValue,
        enableReinitialize: true,
        onSubmit: async (values) => {
            if (searchPath.get('action') && searchPath.get('action') === 'edit') {
                const response = await nhanvienApi.hieuChinhNhanVien(values);
                if (response.code === 200) {
                    swal({
                        title: "Hiệu chỉnh nhân viên thành công!",
                        text: "",
                        icon: "success",
                        button: "Đi tới danh sách nhân viên",
                    })
                    .then(() => {
                        navigate('/main-dashboard/nhan-vien')
                    })
                    
                } else {
                    swal({
                        title: "Hiệu chỉnh nhân viên thất bại!",
                        text: "",
                        icon: "error",
                        button: "Xác nhận",
                    })
                }
            } else {
                const response = await nhanvienApi.themMoiNhanVien(values)
                if (response.code === 200) {
                    swal({
                        title: "Thêm nhân viên thành công!",
                        text: "",
                        icon: "success",
                        button: "Đi tới danh sách nhân viên",
                    })
                    .then(() => {
                        navigate('/main-dashboard/nhan-vien')
                    })
                } else {
                    swal({
                        title: "Thêm nhân viên thất bại!",
                        text: "",
                        icon: "error",
                        button: "Xác nhận",
                    })
                }
            }
            
        },
        validate: (values) => {
            const errors = {}
            if (!values.TenNV) {
                errors.TenNV = 'Họ và tên không được để trống!'
            }
            if (!values.Email) {
                errors.Email = 'Email không được để trống'
            }
            if (!values.NgaySinh) {
                errors.NgaySinh = 'Ngày sinh không được để trống'
            }
            if (!values.DiaChi) {
                errors.DiaChi = 'Địa chỉ không được để trống'
            }
            // if (!values.GioiTinh) {
            //     errors.diachi = 'Địa chỉ không được để trống'
            // }
            if (!values.DienThoai) {
                errors.DienThoai = 'Số điện thoại không được để trống'
            }
            if (!values.SoCCCD) {
                errors.SoCCCD = 'Số căn cước công dân không được để trống'
            }
            return errors
        },
    })
    return (
        <Box className="user-detail-wrapp">
            <Box className="user-detail-content">
                <Form
                    className="form-create-employee"
                    onSubmit={formik.handleSubmit}
                >
                    <FormControl className="form-control-custom">
                        <TextField
                            label="Họ và tên"
                            name="TenNV"
                            value={formik.values.TenNV}
                            onChange={formik.handleChange}
                            variant="outlined"
                        />
                        {formik.errors.TenNV && isHadSubmit ? (
                            <Alert className="form-errors" severity="error">
                                {formik.errors.TenNV}
                            </Alert>
                        ) : null}
                    </FormControl>
                    <FormControl className="form-control-custom">
                        <TextField
                            label="Email"
                            name="Email"
                            type="email"
                            value={formik.values.Email}
                            variant="outlined"
                            onChange={formik.handleChange}
                        />
                        {formik.errors.Email && isHadSubmit ? (
                            <Alert className="form-errors" severity="error">
                                {formik.errors.Email}
                            </Alert>
                        ) : null}
                    </FormControl>
                    <LocalizationProvider dateAdapter={DateAdapter}>
                        <DatePicker
                            label="Ngày Sinh"
                            value={formik.values.NgaySinh}
                            onChange={(newValue) => {
                                setFormValue((prev) => {
                                    return { ...formik.values, NgaySinh: newValue }
                                })
                            }}
                            renderInput={(params) => (
                                <TextField
                                    className="form-control-custom"
                                    name="NgaySinh"
                                    {...params}
                                />
                            )}
                        />
                    </LocalizationProvider>
                    <FormControl className="form-control-custom">
                        <TextField
                            type="text"
                            name="DiaChi"
                            value={formik.values.DiaChi}
                            label="Địa chỉ"
                            variant="outlined"
                            onChange={formik.handleChange}
                        />
                        {formik.errors.DiaChi && isHadSubmit ? (
                            <Alert className="form-errors" severity="error">
                                {formik.errors.DiaChi}
                            </Alert>
                        ) : null}
                    </FormControl>
                    <FormControl className="form-control-custom">
                        <TextField
                            type="text"
                            name="DienThoai"
                            value={formik.values.DienThoai}
                            label="Số điện thoại"
                            variant="outlined"
                            onChange={formik.handleChange}
                        />
                        {formik.errors.DienThoai && isHadSubmit ? (
                            <Alert className="form-errors" severity="error">
                                {formik.errors.DienThoai}
                            </Alert>
                        ) : null}
                    </FormControl>
                    <FormControl className="form-control-custom">
                        <TextField
                            type="text"
                            name="SoCCCD"
                            value={formik.values.SoCCCD}
                            label="Số căn cước công dân"
                            variant="outlined"
                            onChange={formik.handleChange}
                        />
                        {formik.errors.SoCCCD && isHadSubmit ? (
                            <Alert className="form-errors" severity="error">
                                {formik.errors.SoCCCD}
                            </Alert>
                        ) : null}
                    </FormControl>
                    <FormControl className="form-control-custom">
                        <FormLabel className='form-control-label'>Giới tính</FormLabel>
                        <RadioGroup row name='GioiTinh' value={formik.values.GioiTinh} onChange={formik.handleChange}>
                            <FormControlLabel value={true} control={<Radio />} label="Nam"></FormControlLabel>
                            <FormControlLabel value={false} control={<Radio />} label="Nữ"></FormControlLabel>
                        </RadioGroup>
                    </FormControl>
                    <FormControl className="form-control-custom">
                        <Button
                            variant="contained"
                            hidden={action === 'view' ? true : false}
                            type="submit"
                            onClick={() => {
                                setIsHadSubmit(true);
                            }}
                        >
                            {searchPath.get('action') && searchPath.get('action') === 'edit' ? 'Lưu nhân viên' : 'Thêm nhân viên'}
                        </Button>
                    </FormControl>
                </Form>
            </Box>
        </Box>
    )
}
export default UserDetail
