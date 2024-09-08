import { DatePicker, LocalizationProvider } from '@mui/lab'
import {
    Autocomplete,
    Box,
    Button,
    Checkbox,
    FormControl,
    Modal,
    Paper,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    Typography,
    Table
} from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import chucvuApi from '../../../core/api/chucvu.api'
import nhanvienApi from '../../../core/api/nhanvien.api'
import DateAdapter from '@mui/lab/AdapterMoment'
import './position-manage.css'
import { useFormik } from 'formik'
import { FaEdit, FaEye } from 'react-icons/fa'
// import { createSearchParams } from 'react-router-dom'
import moment from 'moment'
import swal from 'sweetalert'

const ModalSetPositionForNhanVien = ({ open, onClose, title, actionType, rowData }) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700,
        bgcolor: 'background.paper',
        // border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    }

    const [selectNhanVien, setSelectNhanVien] = useState(null)
    const [listNhanVien, setListNhanVien] = useState([])
    const [selectChucVu, setSelectChucVu] = useState(null)
    const [listChucVu, setListChucVu] = useState([])
    const [formValue, setFormValue] = useState({
        MaCTCV: '',
        MaCV: '',
        MaNV: '',
        Email: '',
        TenChucVu: '',
        NgayNhanChuc: new Date(),
    })

    const formik = useFormik({
        initialValues: formValue,
        enableReinitialize: true,
        validate: (values) => {
            const errors = {}
            if (!values.MaCV) {
                alert('Vui Lòng Chọn Chức Vụ')
                errors.MaCV = 'Vui Lòng Chọn Chức Vụ'
            }
            if (!values.MaNV) {
                alert('Vui Lòng Chọn Nhân Viên')
                errors.MaNV = 'Vui Lòng Chọn Nhân Viên'
            }

            return errors
        },
        onSubmit: async (values) => {
            if (actionType === 'edit') {
                const response = await chucvuApi.hieuChinhChiTietChucVu(values);
                if (response.code === 200) {
                    swal({
                        title: "Hiệu chỉnh phân chức vụ thành công!",
                        text: "",
                        icon: "success",
                        button: "Xác nhận",
                    }).then(() => {
                        formik.resetForm();
                        onClose();
                    })
                    
                } else {
                    swal({
                        title: "Hiệu chỉnh phân chức vụ thất bại!",
                        text: "",
                        icon: "error",
                        button: "Xác nhận",
                    })
                }
            } else {
                const response = await chucvuApi.themChiTietChucVu(values)
                if (response.code === 200) {
                    onClose();
                }
            }
        },
    })

    const handleSelectNhanVien = (event, newValue) => {
        setSelectNhanVien(newValue)
        setFormValue((prev) => {
            return { ...formik.values, MaNV: newValue.MaNV }
        })
    }

    const handleSelectChucVu = (event, newValue) => {
        setSelectChucVu(newValue)
        setFormValue((prev) => {
            return { ...formik.values, MaCV: newValue.MaCV }
        })
    }

    const getListNhanVien = useCallback(async () => {
        const response = await nhanvienApi.layThongTinEmailNhanVien()
        if (response.code === 200) {
            setListNhanVien(response.data)
        }
    }, [])

    const getListChucVu = useCallback(async () => {
        const response = await chucvuApi.danhSachTenChucVu()
        if (response.code === 200) {
            console.log(response)
            setListChucVu(response.data)
        }
    }, [])

    useEffect(() => {
        if (rowData) {
            setFormValue({
                ...formik.values,
                MaCTCV: rowData.MaCTCV,
                MaCV: rowData.chucvu?.MaCV,
                MaNV: rowData.nhanvien?.MaNV,
                NgayNhanChuc: moment(rowData.NgayNhanChuc)
            });

            setSelectNhanVien(listNhanVien.find(nhanvien => nhanvien.MaNV === rowData.nhanvien?.MaNV));
            setSelectChucVu(listChucVu.find(chucvu => chucvu.MaCV === rowData.chucvu?.MaCV));
        }
        getListNhanVien()
        getListChucVu()
    }, [getListNhanVien, getListChucVu, rowData])

    return (
        <Modal open={open}>
            <Box sx={style}>
                <Typography className="modal-title">{title}</Typography>
                <Box>
                    <Form
                        className="form-manage"
                        onSubmit={formik.handleSubmit}
                    >
                        <Box className="form-group-select">
                            <FormControl>
                                <Autocomplete
                                    value={selectNhanVien}
                                    disablePortal
                                    options={listNhanVien}
                                    getOptionLabel={(option) => option.Email}
                                    onChange={handleSelectNhanVien}
                                    sx={{ width: 300 }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Nhân Viên"
                                        />
                                    )}
                                />
                            </FormControl>

                            <FormControl>
                                <Autocomplete
                                    value={selectChucVu}
                                    disablePortal
                                    options={listChucVu}
                                    getOptionLabel={(option) =>
                                        option.TenChucVu
                                    }
                                    onChange={handleSelectChucVu}
                                    sx={{ width: 300 }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Chức Vụ"
                                        />
                                    )}
                                />
                            </FormControl>
                        </Box>
                        <Box className="form-group-datepicker">
                            <LocalizationProvider dateAdapter={DateAdapter}>
                                <DatePicker
                                    label="Ngày Nhận Chức"
                                    inputFormat="DD/MM/yyyy"
                                    value={formik.values.NgayNhanChuc}
                                    onChange={(newValue) => {
                                        setFormValue((prev) => {
                                            return {
                                                ...formik.values,
                                                NgayNhanChuc: newValue,
                                            }
                                        })
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            className="form-control-custom"
                                            name="NgayNhanChuc"
                                            {...params}
                                        />
                                    )}
                                />
                            </LocalizationProvider>
                        </Box>
                        <Box className="modal-footer">
                            {actionType && actionType === 'watch' ? (
                                null
                            ) : (
                                <Button variant="contained" type="submit" >
                                    Lưu
                                </Button>
                            )}
                                
                            <Button
                                variant="outlined"
                                type="button"
                                className="btn-cancel"
                                onClick={onClose}
                            >
                                Huỷ
                            </Button>
                        </Box>
                    </Form>
                </Box>
            </Box>
        </Modal>
    )
}

const ButtonEdit = ({handleEditChiTietChucVu, rowData}) => {
    return (
        <Button className="btn-rows-action" onClick={() => handleEditChiTietChucVu(rowData)}>
            <FaEdit />
        </Button>
    )
}

const ButtonWatch = ({handleWatchChiTietChucVu, rowData}) => {
    return (
        <Button className="btn-rows-action" onClick={() => handleWatchChiTietChucVu(rowData)}>
            <FaEye />
        </Button>
    )
}

const ActionComponent = ({navigate, rowData, role, ...fnc}) => {
    return (
        <Box>
            {role === 'Manager' ? (
                <ButtonEdit handleEditChiTietChucVu={fnc.handleEditChiTietChucVu} rowData={rowData}/>
            ) : null}
            <ButtonWatch handleWatchChiTietChucVu={fnc.handleWatchChiTietChucVu} rowData={rowData}/>
        </Box>
    )
}

const PositionManage = ({ navigate, role }) => {
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => {
        setOpenModal(true);
        setModalActionType('create');
    }
    const handleCloseModal = () => setOpenModal(false);
    const [modalActionType, setModalActionType] = useState('');
    const [currentRowData, setCurrentRowData ] = useState(null)
    const [selected, setSelected] = useState([]);
    const [rowCount, setRowCount] = useState(0);
    const [listChiTietChucVu, setListChiTietChucVu] = useState([]);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const getDanhSachChiTietChucVu = async () => {
        const response = await chucvuApi.danhSachChiTietChucVu(page + 1, limit);
        if (response.code === 200) {
            setListChiTietChucVu(response.data.rows);
            setRowCount(response.data.count)
        }
    };

    const isSelected = (MaCTCV) => selected.indexOf(MaCTCV) !== -1;

    const handleSelectAllClick = async (event) => {
        if (event.target.checked) {
            const response = await chucvuApi.danhSachChiTietChucVu();
            if (response.code === 200) {
                const newSelecteds = response.data.map((n) => n.MaCV);
                setSelected(newSelecteds);
                return ;
            } else {
                setSelected([]);
                return ;
            }
        }
        setSelected([]);
    }

    const onPageChange = (event, newPage) => {
        setPage(newPage);
    }

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];
    
        if (selectedIndex === -1) {
          newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
          newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
          newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
          newSelected = newSelected.concat(
            selected.slice(0, selectedIndex),
            selected.slice(selectedIndex + 1),
          );
        }
    
        setSelected(newSelected);
    };

    const handleWatchChiTietChucVu = (rowData) => {
        setOpenModal(true);
        setModalActionType('watch');
        setCurrentRowData(rowData);

    }

    const handleEditChiTietChucVu = (rowData) => {
        setOpenModal(true);
        setModalActionType('edit');
        setCurrentRowData(rowData);
    }

    const handleDeleteChiTietChucVu = async () => {
        const response = await chucvuApi.xoaChiTietChucVu({ MaCTCV: selected })
        if (response.code === 200) {
            swal({
                title: 'Thu Hồi Chức Vụ Thành Công',
                text: "",
                icon: "success",
                button: "Xác nhận",
            }).then(() => getDanhSachChiTietChucVu());
        } else {
            swal({
                title: 'Thu Hồi Chức Vụ Thất Bại',
                text: "",
                icon: "error",
                button: "Xác nhận",
            }).then(() => getDanhSachChiTietChucVu());
        }
    };

    useEffect(() => {
        getDanhSachChiTietChucVu()
    }, [openModal])
    return (
        <>
            <ModalSetPositionForNhanVien
                open={openModal}
                onClose={handleCloseModal}
                actionType={modalActionType}
                title="Thiết Lập Chức Vụ"
                navigate={navigate}
                rowData={currentRowData}
            />
            <Box className="manage-chuc-vu-wrapp">
                <Box className="btn-action">
                    {role !== 'Employee' ? (
                        <>
                            <Button variant="contained" onClick={handleOpenModal}>
                                Phân chức vụ
                            </Button>
                            <Button variant="contained" onClick={handleDeleteChiTietChucVu}>
                                Thu hồi chức vụ
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
                                    <TableCell aligh="left">
                                        Tên Nhân Viên
                                    </TableCell>
                                    <TableCell align="left">Tên Chức Vụ</TableCell>
                                    <TableCell align="left">Ngày Nhận Chức</TableCell>
                                    <TableCell align="center">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {listChiTietChucVu.map((row) => {
                                    const isItemSelected = isSelected(row.MaCTCV);
                                    return (
                                        <TableRow
                                            key={row.MaCTCV}
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
                                                            row.MaCTCV
                                                        )
                                                    }
                                                    // inputProps={{
                                                    //     'aria-labelledby': labelId,
                                                    // }}
                                                />
                                            </TableCell>
                                            <TableCell align="left">
                                                {row.nhanvien.TenNV}
                                            </TableCell>
                                            <TableCell align="left">
                                                {row.chucvu.TenChucVu}
                                            </TableCell>
                                            <TableCell align="left">
                                                {moment(row.NgayNhanChuc).format("D/MM/YYYY")  }
                                            </TableCell>
                                            {<TableCell
                                                align="center"
                                                width={100}
                                            >
                                                <ActionComponent
                                                    handleWatchChiTietChucVu={handleWatchChiTietChucVu}
                                                    handleEditChiTietChucVu={handleEditChiTietChucVu}
                                                    navigate={navigate}
                                                    rowData={row}
                                                    role={role}
                                                />
                                            </TableCell>}
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

export default PositionManage
