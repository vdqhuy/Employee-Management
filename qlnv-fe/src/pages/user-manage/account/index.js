import {
    Box,
    FormControl,
    TextField,
    Button,
    Select,
    MenuItem,
    Alert,
} from '@mui/material'
import { useFormik } from 'formik'
import { useCallback, useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import './style.css'
import nhanvienApi from '../../../core/api/nhanvien.api'
import { useSearchParams } from 'react-router-dom'
import swal from 'sweetalert'
import accountApi from '../../../core/api/login.api'
import roleApi from '../../../core/api/role.api'
import { useStyles } from './style'

const UserAccount = ({ navigate }) => {
    const [searchPath, setSearchPath] = useSearchParams()
    const [action, setAction] = useState('')
    const [listRole, setListRole] = useState([])
    const nhan_vien_id = searchPath.get('MaNV')
    const isAccount = searchPath.get('taikhoan')
    const [formValue, setFormValue] = useState({
        username: '',
        password: '',
        repassword: '',
        MaNV: nhan_vien_id,
        MaRole: '0',
        MaTaiKhoan: ''
    })
    const [isHadSubmit, setIsHadSubmit] = useState(false)

    const getAccountDetail = async () => {
        if (nhan_vien_id && isAccount === 'true') {
            const response = await nhanvienApi.layThongTinNhanVien(nhan_vien_id)
            if (response.code === 200) {
                const data = response.data;
                setFormValue({
                    username: data.admin[0].Username,
                    password: '',
                    repassword: '',
                    MaNV: data.MaNV,
                    MaRole: data.admin[0].role.MaRole,
                    MaTaiKhoan: data.admin[0].MaTaiKhoan
                })
            }
        }
    }

    const getListRole = async () => {
        const response = await roleApi.danhSachRole()
        if (response.code === 200) {
            setListRole(response.data)
        }
    }

    const classes = useStyles()

    useEffect(() => {
        getListRole()
        getAccountDetail();
    }, [])

    const formik = useFormik({
        initialValues: formValue,
        enableReinitialize: true,
        onSubmit: async (values) => {
            const passwordRegex = new RegExp(/(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}/);
            if (!passwordRegex.test(values.password)) {
                swal({
                    title: "Mật khẩu phải có ít nhất 8 ký tự và nhiều nhất là 16, có chữ in hoa, chữ thường, chữ số và ký tự đặc biệt",
                    text: "",
                    icon: "error",
                    button: "Xác nhận",
                }).then(() => ({}));
                return;
            }
            if (isAccount === 'true') {
                const response = await accountApi.capNhatTaiKhoan(values);
                if (response.code === 200) {
                    swal({
                        title: "Hiệu chỉnh tài khoản thành công!",
                        text: "",
                        icon: "success",
                        button: "Xác nhận",
                    })
                    .then(() => {
                        navigate('/main-dashboard/nhan-vien')
                    })
                } else {
                    swal({
                        title: "Hiệu chỉnh tài khoản thất bại!",
                        text: "",
                        icon: "error",
                        button: "Xác nhận",
                    })
                    .then(() => {
                        navigate('/main-dashboard/nhan-vien')
                    })
                }
            } else {
                const response = await accountApi.taoTaiKhoan(values);
                if (response.code === 200) {
                    swal({
                        title: "Tạo tài khoản thành công!",
                        text: "",
                        icon: "success",
                        button: "Xác nhận",
                    })
                    .then(() => {
                        navigate('/main-dashboard/nhan-vien')
                    })
                } else {
                    swal({
                        title: "Tạo tài khoản thất bại!",
                        text: "",
                        icon: "error",
                        button: "Xác nhận",
                    })
                    .then(() => {
                        navigate('/main-dashboard/nhan-vien')
                    })
                }
            }
            

        },
        validate: (values) => {
            if (isHadSubmit) {
                const errors = {}
                if (!values.username) {
                    errors.username = 'Tên đăng nhập không được để trống'
                }
                if (!values.password) {
                    errors.password = 'Mật khẩu không được để trống'
                }
                if (!values.repassword) {
                    errors.repassword = 'Nhập lại mật khẩu không được để trống'
                }
                if (!values.MaRole) {
                    errors.MaRole = 'Vui lòng chọn role cho tài khoản'
                }
                if (values.password !== values.repassword) {
                    errors.repassword = 'Mật khẩu nhập lại không khớp'
                }
                return errors
            } else {
                return [];
            }
            
        }
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
                            label="Tên Đăng Nhập"
                            name="username"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            variant="outlined"
                        />
                        {formik.errors.username && isHadSubmit ? (
                            <Alert className="form-errors" severity="error">
                                {formik.errors.username}
                            </Alert>
                        ) : null}
                    </FormControl>
                    <FormControl className="form-control-custom">
                        <TextField
                            label="Mật Khẩu"
                            // disabled={isAccount === 'true' ? true : false}
                            name="password"
                            type="password"
                            value={formik.values.password}
                            variant="outlined"
                            onChange={formik.handleChange}
                        />
                        {formik.errors.password && isHadSubmit ? (
                            <Alert className="form-errors" severity="error">
                                {formik.errors.password}
                            </Alert>
                        ) : null}
                    </FormControl>
                    <FormControl className="form-control-custom">
                        <TextField
                            label="Nhập Lại Mật Khẩu"
                            name="repassword"
                            // disabled={isAccount === 'true' ? true : false}
                            type="password"
                            value={formik.values.repassword}
                            variant="outlined"
                            onChange={formik.handleChange}
                        />
                        {formik.errors.repassword && isHadSubmit ? (
                            <Alert className="form-errors" severity="error">
                                {formik.errors.repassword}
                            </Alert>
                        ) : null}
                    </FormControl>
                    <FormControl className="form-control-custom">
                        <Select
                            // label="TenCa"
                            className={classes.select}
                            name="MaRole"
                            value={formik.values.MaRole}
                            onChange={(event) => {
                                setFormValue(() => ({...formik.values, MaRole: event.target.value}))
                            }}
                        >
                            <MenuItem
                                    key={1}
                                    value={'0'}
                                >
                                    Select Role
                                </MenuItem>
                            {listRole.map((element) => (
                                <MenuItem
                                    key={element.MaRole}
                                    value={element.MaRole}
                                >
                                    {element.Rolename}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl className="form-control-custom">
                        <Button
                            variant="contained"
                            type="submit"
                            onClick={() => {
                                setIsHadSubmit(true)
                            }}
                        >
                            {isAccount === 'true' ? 'Cập Nhật': 'Thêm Mới'}
                        </Button>
                    </FormControl>
                </Form>
            </Box>
        </Box>
    )
}
export default UserAccount
