import {
    Box,
    Button,
    Modal,
    Typography,
    TextField,
    FormControl,
    Alert,
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    Checkbox,
    TableBody,
    TableFooter,
    TablePagination,
    Select,
    MenuItem
} from '@mui/material'
import { FaEdit, FaEye } from 'react-icons/fa'
import { Form } from 'react-bootstrap'
import { useCallback, useEffect, useState } from 'react'
import './position-list.css'
import { useFormik } from 'formik'
import chucvuApi from '../../../core/api/chucvu.api'
import { createSearchParams } from 'react-router-dom'
import swal from 'sweetalert'

const ModalThemChucVu = ({ open, handleCloseModal, actionType, rowdata }) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        // border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    }

    const [formValues, setFormValues] = useState({
        MaCV: '',
        TenChucVu: '',
        PhuCap: 0,
        GhiChu: '',
        IsFullTime: false,
    })

    useEffect(() => {
        if (open) {
            setFormValues((prev) => ({...prev, TenChucVu: rowdata.TenChucVu, PhuCap: rowdata.PhuCap, MaCV: rowdata.MaCV, GhiChu: rowdata.GhiChu}))
        }
    }, [open, rowdata])

    const formik = useFormik({
        initialValues: formValues,
        enableReinitialize: true,
        onSubmit: async (values) => {
            if (actionType === 'edit') {
                const response = await chucvuApi.hieuChinhChucVu(values);
                if (response.code === 200) {
                    swal({
                        title: "Hiệu chỉnh chức vụ thành công!",
                        text: "",
                        icon: "success",
                        button: "Xác nhận",
                    }).then(() => {
                        formik.resetForm();
                        handleCloseModal();
                    })
                    
                } else {
                    swal({
                        title: "Hiệu chỉnh chức vụ thất bại!",
                        text: "",
                        icon: "error",
                        button: "Xác nhận",
                    })
                }
            } else {
                const response = await chucvuApi.taoChucVu(values);
                if (response.code === 200) {
                    swal({
                        title: "Thêm chức vụ thành công!",
                        text: "",
                        icon: "success",
                        button: "Xác nhận",
                    }).then(() => {
                        formik.resetForm();
                        handleCloseModal();
                    })
                } else {
                    swal({
                        title: "Thêm chức vụ thất bại!",
                        text: "",
                        icon: "error",
                        button: "Xác nhận",
                    })
                }
            }
            
        },
        validate: (values) => {
            const errors = {}
            if (!values.TenChucVu) {
                errors.TenChucVu = 'Tên chức vụ không được để trống!'
            }
            // if (!values.phucap) {
            //     errors.phucap = 'Phụ cấp không được để trống!'
            // }

            return errors;
        },
    });

    const [isHadSubmit, setIsHadSubmit] = useState(false);
    return (
        <Modal
            open={open}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Thêm Chức Vụ
                </Typography>
                <Form className="form-them-chuc-vu" onSubmit={formik.handleSubmit}>
                    <FormControl className="form-control-cv-custom">
                        <TextField
                            type="text"
                            name="TenChucVu"
                            label="Tên Chức Vụ"
                            variant="outlined"
                            onChange={formik.handleChange}
                            value={formik.values.TenChucVu}
                        ></TextField>
                        {formik.errors.TenChucVu && isHadSubmit ? (
                            <Alert className="form-errors" severity="error">
                                {formik.errors.TenChucVu}
                            </Alert>
                        ) : null}
                    </FormControl>
                    <FormControl className="form-control-cv-custom">
                        <TextField
                            type="number"
                            name="PhuCap"
                            inputProps={{
                                inputMode: 'numeric',
                                pattern: '[0-9]*',
                                min: 0,
                            }}
                            label="Phụ Cấp"
                            variant="outlined"
                            onChange={formik.handleChange}
                            value={formik.values.PhuCap}
                        ></TextField>
                        {formik.errors.PhuCap && isHadSubmit ? (
                            <Alert className="form-errors" severity="error">
                                {formik.errors.PhuCap}
                            </Alert>
                        ) : null}
                    </FormControl>
                    <FormControl className="form-control-cv-custom">
                        <TextField
                            type="text"
                            name="GhiChu"
                            label="Ghi Chú"
                            variant="outlined"
                            onChange={formik.handleChange}
                            value={formik.values.GhiChu}
                        ></TextField>
                        {formik.errors.GhiChu && isHadSubmit ? (
                            <Alert className="form-errors" severity="error">
                                {formik.errors.GhiChu}
                            </Alert>
                        ) : null}
                    </FormControl>
                    <FormControl className="form-control-cv-custom">
                        <TextField
                            select
                            label="Loại Nhân Viên"
                            labelId="test-select-label"
                            // className={classes.select}
                            name="IsFullTime"
                            value={formik.values.IsFullTime}
                            onChange={(event) => {
                                setFormValues(() => ({...formik.values, IsFullTime: event.target.value}))
                            }}
                        >
                            {[true, false].map((element, index) => (
                                <MenuItem
                                    key={index}
                                    value={element}
                                >
                                    {element ? 'Toàn Thời Gian' : 'Bán Thời Gian'}
                                </MenuItem>
                            ))}
                        </TextField>
                    </FormControl>
                    {actionType && actionType === 'watch' ? (
                        null
                    ): (
                        <FormControl className="form-control-cv-custom">
                            <Button type='submit' variant="contained" onClick={() => setIsHadSubmit(true)}>{actionType === 'edit' ? 'Lưu chức vụ': 'Thêm chức vụ'}</Button>
                        </FormControl>
                    )}
                    
                </Form>
            </Box>
        </Modal>
    )
}

const ButtonEdit = ({handleEditChucVu, rowdata}) => {
    return (
        <Button className="btn-rows-action" onClick={() => handleEditChucVu(rowdata)}>
            <FaEdit />
        </Button>
    )
}

const ButtonWatch = ({handleWatchChucVu, rowdata}) => {
    return (
        <Button className="btn-rows-action" onClick={() => handleWatchChucVu(rowdata)}>
            <FaEye />
        </Button>
    )
}

const ActionComponent = ({navigate, rowdata, role, ...fnc}) => {
    console.log(role);
    return (
        <Box>
            {role === 'Manager' ? (
                <ButtonEdit handleEditChucVu={fnc.handleEditChucVu} rowdata={rowdata}/>
            ) : null}
            <ButtonWatch handleWatchChucVu={fnc.handleWatchChucVu} rowdata={rowdata}/>
        </Box>
    )
}

const PositionList = ({ navigate, role }) => {
    const [openModal, setOpenModel] = useState(false);
    const handleOpenModal = () => {
        setOpenModel(true);
        setModalActionType('create');
    };
    const handleCloseModal = () => {
        setOpenModel(false);
        getDanhSachChucVu();
        setCurrentRowData((prev) => ({...prev, tenchucvu: '', phucap: 0}));
    };

    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [selected, setSelected] = useState([]);
    const [rowCount, setRowCount] = useState(0);
    const [listChucVu, setListChucVu] = useState([]);
    const [modalActionType, setModalActionType] = useState('');
    const [currentRowData, setCurrentRowData ] = useState({
        tenchucvu: '',
        phucap: 0
    })


    const onPageChange = (event, newPage) => {
        setPage(newPage);
    }
    const getDanhSachChucVu = useCallback(async () => {
        const response = await chucvuApi.danhSachChucVu({page: page + 1, limit});
        if (response && response.code === 200) {
            setListChucVu(response.data.rows);
            setRowCount(response.data.count)
        }
    }, [page, limit])

    useEffect(() => {
        getDanhSachChucVu();
    }, [getDanhSachChucVu])

    const handleWatchChucVu = (rowData) => {
        setOpenModel(true);
        setModalActionType('watch');
        setCurrentRowData((prev) => {
            return {TenChucVu: rowData.TenChucVu, PhuCap: rowData.PhuCap, MaCV: rowData.MaCV, GhiChu: rowData.GhiChu}
        })
    }

    const handleEditChucVu = (rowData) => {
        setOpenModel(true);
        setModalActionType('edit');
        setCurrentRowData((prev) => {
            return {TenChucVu: rowData.TenChucVu, PhuCap: rowData.PhuCap, MaCV: rowData.MaCV, GhiChu: rowData.GhiChu}
        })
    }

    const handleDeleteChucVu = async () => {
        const response = await chucvuApi.xoaChucVu({ MaCV: selected })
        if (response.code === 200) {
            swal({
                title: 'Xóa Chức Vụ Thành Công',
                text: "",
                icon: "success",
                button: "Xác nhận",
            }).then(() => getDanhSachChucVu());
        } else {
            swal({
                title: 'Xóa Chức Vụ Thất Bại',
                text: "",
                icon: "error",
                button: "Xác nhận",
            }).then(() => getDanhSachChucVu());
        }
    }

    const handleSelectAllClick = async (event) => {
        if (event.target.checked) {
            const response = await chucvuApi.danhSachMaChucVu();
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
    const handleClick = (event, name) => {
        console.log(name)
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
    const isSelected = (name) => selected.indexOf(name) !== -1;
    return (
        <>
            <ModalThemChucVu
                open={openModal}
                handleCloseModal={handleCloseModal}
                actionType={modalActionType}
                rowdata={currentRowData}
            />
            <Box className="manage-chuc-vu-wrapp">
                <Box className="btn-action">
                    {role !== 'Employee' ? (
                        <>
                            <Button variant="contained" onClick={handleOpenModal}>
                                Thêm Chức Vụ
                            </Button>
                            <Button variant="contained" onClick={handleDeleteChucVu}>
                                Xóa Chức Vụ
                            </Button>
                        </>
                    ) : null}
                </Box>
                <Box className='table-wrapp'>
                    <TableContainer component={Paper} className="table-wrapp">
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            color="primary"
                                            indeterminate={selected.length > 0 && selected.length < rowCount}
                                            checked={rowCount > 0 && selected.length === rowCount}
                                            onChange={handleSelectAllClick}
                                            inputProps={{
                                                'aria-label': 'select all desserts',
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell aligh="left">Tên chức vụ</TableCell>
                                    <TableCell align="left">Phụ cấp</TableCell>
                                    <TableCell align="left">Ghi Chú</TableCell>
                                    <TableCell align="left">Loại Nhân Viên</TableCell>
                                    <TableCell align="center">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {listChucVu.map((row) => {
                                    const isItemSelected = isSelected(row.MaCV);
                                    return (
                                        <TableRow
                                            key={row.MaCV}
                                            sx={{
                                                '&:last-child td, &:last-child th': {
                                                    border: 0,
                                                },
                                            }}
                                        >
                                            <TableCell padding="checkbox" scope="row">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    onClick={(event) => handleClick(event, row.MaCV)}
                                                    // inputProps={{
                                                    //     'aria-labelledby': labelId,
                                                    // }}
                                                />
                                            </TableCell>
                                            <TableCell align="left">{row.TenChucVu}</TableCell>
                                            <TableCell align="left">{row.PhuCap}</TableCell>
                                            <TableCell align="left">{row.GhiChu}</TableCell>
                                            <TableCell align="left">{row.IsFullTime ? 'Toàn Thời Gian' : 'Bán Thời Gian'}</TableCell>
                                            <TableCell align="center" width={100}>
                                                <ActionComponent handleWatchChucVu={handleWatchChucVu} handleEditChucVu={handleEditChucVu} rowdata={row} role={role}/>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination 
                                        className='table-pagination' 
                                        count={rowCount} 
                                        page={page} rowsPerPage={limit} 
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

export default PositionList
