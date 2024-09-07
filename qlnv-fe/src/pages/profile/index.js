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
import './styles.css'
import DateAdapter from '@mui/lab/AdapterMoment'
import { DatePicker, LocalizationProvider } from '@mui/lab'
import { useSearchParams } from 'react-router-dom'
import swal from 'sweetalert'
import nhanvienApi from '../../core/api/nhanvien.api'

const Profile = ({ navigate }) => {
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

    const getUserDetail = async () => {
        const response = await nhanvienApi.layThongTinNguoiDung();
        if (response.code === 200) {
            setFormValue({
                MaNV: response.data.MaNV,
                TenNV: response.data.TenNV,
                NgaySinh: response.data.NgaySinh,
                DiaChi: response.data.DiaChi,
                GioiTinh: response.data.GioiTinh,
                DienThoai: response.data.DienThoai,
                SoCCCD: response.data.SoCCCD,
                Email: response.data.Email
            })
        }
    }

    useEffect(() => {
        getUserDetail()
    }, [])

    return (
        <Box className="user-detail-wrapp">
            <Box className="user-detail-content">
                <Form
                    className="form-create-employee"
                >
                    <FormControl className="form-control-custom">
                        <TextField
                            label="Họ và tên"
                            name="TenNV"
                            value={formValue.TenNV}
                            variant="outlined"
                        />
                    </FormControl>
                    <FormControl className="form-control-custom">
                        <TextField
                            label="Email"
                            name="Email"
                            type="email"
                            value={formValue.Email}
                            variant="outlined"
                        />
                    </FormControl>
                    <LocalizationProvider dateAdapter={DateAdapter}>
                        <DatePicker
                            label="Ngày Sinh"
                            value={formValue.NgaySinh}
                            onChange={(newValue) => {
                                setFormValue((prev) => {
                                    return { ...prev, NgaySinh: newValue }
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
                            value={formValue.DiaChi}
                            label="Địa chỉ"
                            variant="outlined"
                        />
                    </FormControl>
                    <FormControl className="form-control-custom">
                        <TextField
                            type="text"
                            name="DienThoai"
                            value={formValue.DienThoai}
                            label="Số điện thoại"
                            variant="outlined"
                        />
                    </FormControl>
                    <FormControl className="form-control-custom">
                        <TextField
                            type="text"
                            name="SoCCCD"
                            value={formValue.SoCCCD}
                            label="Số căn cước công dân"
                            variant="outlined"
                        />
                    </FormControl>
                    <FormControl className="form-control-custom">
                        <FormLabel className='form-control-label'>Giới tính</FormLabel>
                        <RadioGroup row name='GioiTinh' value={formValue.GioiTinh}>
                            <FormControlLabel value={true} control={<Radio />} label="Nam"></FormControlLabel>
                            <FormControlLabel value={false} control={<Radio />} label="Nữ"></FormControlLabel>
                        </RadioGroup>
                    </FormControl>
                </Form>
            </Box>
        </Box>
    )
}
export default Profile
