import {
    Box,
    Button,
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TablePagination,
    TableFooter,
    Checkbox,
} from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { FaEdit, FaEye } from 'react-icons/fa'
//CSS
import './user-list.css'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import nhanvienApi from '../../../core/api/nhanvien.api'
import { createSearchParams } from 'react-router-dom'
import PopUpNotic from '../../../components/popUpNotice'
import swal from 'sweetalert'

const ButtonEdit = ({ navigate, rowdata }) => {
    const navigateToNhanVienEdit = () => {
        const to = '/hieu-chinh-nhan-vien'
        if (window.location.pathname !== to) {
            navigate({
                pathname: `${window.location.pathname}${to}`,
                search: createSearchParams({
                    action: 'edit',
                    id: rowdata.MaNV,
                }).toString(),
            })
        }
    }
    return (
        <Button className="btn-rows-action" onClick={navigateToNhanVienEdit}>
            <FaEdit />
        </Button>
    )
}

const ButtonWatch = ({ navigate, rowdata }) => {
    const navigateToNhanVienDetail = () => {
        const to = '/xem-nhan-vien'
        if (window.location.pathname !== to) {
            navigate({
                pathname: `${window.location.pathname}${to}`,
                search: createSearchParams({
                    action: 'view',
                    id: rowdata.MaNV,
                }).toString(),
            })
        }
    }
    return (
        <Button className="btn-rows-action" onClick={navigateToNhanVienDetail}>
            <FaEye />
        </Button>
    )
}

const ActionComponent = ({ navigate, rowdata, role }) => {
    return (
        <Box>
            {role === 'Manager' ? (
                <ButtonEdit navigate={navigate} rowdata={rowdata} />
            ) : null}
            <ButtonWatch navigate={navigate} rowdata={rowdata} />
        </Box>
    )
}

const UserList = ({ navigate, role }) => {
    const [listUser, setListUser] = useState([])
    const [page, setPage] = useState(0)
    const [limit, setLimit] = useState(10)
    const [rowCount, setRowCount] = useState(0)
    const [selected, setSelected] = useState([])
    const [isCheckAll, setIsCheckAll] = useState(false)
    const [openPopUp, setOpenPopUp] = useState(false)

    const getListUser = useCallback(async () => {
        const response = await nhanvienApi.danhSachNhanVien({
            page: page + 1,
            limit,
        })
        if (response.code === 200) {
            setListUser(response.data.rows)
            setRowCount(response.data.count)
        }
    }, [page, limit])
    const navigationToDetail = () => {
        const to = '/them-nhan-vien'
        if (window.location.pathname !== to) {
            navigate(`${window.location.pathname}` + to)
        }
    }
    const onPageChange = (event, newPage) => {
        setPage(newPage)
    }
    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name)
        let newSelected = []

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name)
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1))
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1))
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            )
        }

        setSelected(newSelected)
    }
    const handleSelectAllClick = async (event) => {
        if (event.target.checked) {
            const response = await nhanvienApi.layThongTinEmailNhanVien()
            if (response.code === 200) {
                const newSelecteds = response.data.map((n) => n.Email)
                setSelected(newSelecteds)
                return
            } else {
                setSelected([])
                return
            }
        }
        setSelected([])
    }

    const handleDeleteNhanVien = async () => {
        const response = await nhanvienApi.xoaNhanVien({ Email: selected })
        if (response.code === 200) {
            swal({
                title: 'Xóa Nhân Viên Thành Công',
                text: "",
                icon: "success",
                button: "Xác nhận",
            }).then(() => getListUser());
        } else {
            swal({
                title: 'Xóa Nhân Viên Thất Bại',
                text: "",
                icon: "error",
                button: "Xác nhận",
            }).then(() => getListUser());
        }
    }

    const isSelected = (name) => selected.indexOf(name) !== -1

    useEffect(() => {
        getListUser()
    }, [getListUser])
    return (
        <>
            {/* <PopUpNotic
                open={openPopUp}
                onClose={() => setOpenPopUp(false)}
                title="Thong Bao"
            /> */}
            <Box className="manage-nhan-vien-wrapp">
                <Box className="btn-action">
                    {role !== 'Employee' ? (
                        <>
                            <Button
                                variant="contained"
                                onClick={navigationToDetail}
                            >
                                Thêm Nhân Viên
                            </Button>
                            <Button
                                variant="contained"
                                onClick={handleDeleteNhanVien}
                            >
                                Xoá Nhân Viên
                            </Button>
                        </>
                    ) : null}
                </Box>
                <Box className="table-wrapp">
                    <TableContainer component={Paper} className="table-wrapp">
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            color="primary"
                                            indeterminate={
                                                selected.length > 0 &&
                                                selected.length < rowCount
                                            }
                                            checked={
                                                rowCount > 0 &&
                                                selected.length === rowCount
                                            }
                                            onChange={handleSelectAllClick}
                                            inputProps={{
                                                'aria-label':
                                                    'select all desserts',
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell aligh="left">Email</TableCell>
                                    <TableCell align="right">
                                        Họ và tên
                                    </TableCell>
                                    <TableCell align="right">Địa chỉ</TableCell>
                                    <TableCell align="right">
                                        Giới tính
                                    </TableCell>
                                    <TableCell align="right">
                                        Số điện thoại
                                    </TableCell>
                                    <TableCell align="right">
                                        Tài Khoản
                                    </TableCell>
                                    <TableCell align="center">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {listUser.map((row) => {
                                    const isItemSelected = isSelected(row.Email)
                                    return (
                                        <TableRow
                                            key={row.Email}
                                            sx={{
                                                '&:last-child td, &:last-child th':
                                                    {
                                                        border: 0,
                                                    },
                                            }}
                                        >
                                            <TableCell
                                                padding="checkbox"
                                                scope="row"
                                            >
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    onClick={(event) =>
                                                        handleClick(
                                                            event,
                                                            row.Email
                                                        )
                                                    }
                                                    // inputProps={{
                                                    //     'aria-labelledby': labelId,
                                                    // }}
                                                />
                                            </TableCell>
                                            <TableCell align="left">
                                                {row.Email}
                                            </TableCell>
                                            <TableCell align="right">
                                                {row.TenNV}
                                            </TableCell>
                                            <TableCell align="right">
                                                {row.DiaChi}
                                            </TableCell>
                                            <TableCell align="right">
                                                {row.GioiTinh ? 'Nam' : 'Nữ'}
                                            </TableCell>
                                            <TableCell align="right">
                                                {row.DienThoai}
                                            </TableCell>
                                            <TableCell align="right">
                                                <Button className='btn-tk' onClick={() => {
                                                    const to = '/tai-khoan'
                                                    if (window.location.pathname !== to) {
                                                        navigate({
                                                            pathname: `${window.location.pathname}${to}`,
                                                            search: createSearchParams({
                                                                taikhoan: row.admin.length > 0 ? true : false,
                                                                MaNV: row.MaNV
                                                            }).toString(),
                                                        })
                                                    }
                                                }}>
                                                    {row.admin.length > 0 ? 'Đã có tài khoản' : 'Chưa có tài khoản'}
                                                </Button>
                                            </TableCell>
                                            <TableCell
                                                align="right"
                                                width={100}
                                            >
                                                <ActionComponent
                                                    navigate={navigate}
                                                    rowdata={row}
                                                    role={role}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        className="table-pagination"
                                        count={rowCount}
                                        page={page}
                                        rowsPerPage={limit}
                                        onPageChange={onPageChange}
                                        rowsPerPageOptions={[10, 20, 30]}
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </>
    )
}

export default UserList
