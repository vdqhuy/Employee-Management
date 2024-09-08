import { Box, Button, Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from '@mui/material'
import { useEffect, useState } from 'react'
import { FaEdit, FaEye } from 'react-icons/fa'
import dieuChinhLuongApi from '../../../core/api/dieuchinhluong.api'
import ModalDieuChinhLuong from './modal-change'
import { useStyles } from './style'
import moment from 'moment';

const SalaryChange = ({ navigate, role }) => {
    const classes = useStyles()
    const [openModal, setOpenModal] = useState(false);
    const [modalAction, setModalAction] = useState('Edit');
    const [selected, setSelected] = useState([]);
    const [rowCount, setRowCount] = useState(0);
    const [page, setPage] = useState(0);
    const [limit] = useState(10);
    const [listDieuChinhLuong, setListDieuChinhLuong] = useState([]);
    const [currentRowData, setCurrentRowData] = useState(null)
    const isSelected = (name) => selected.indexOf(name) !== -1;

    const ButtonEdit = ({ onEditData, rowdata }) => {
        return (
            <Button
                className="btn-rows-action"
                onClick={() => onEditData(rowdata)}
            >
                <FaEdit />
            </Button>
        )
    }

    const ButtonWatch = ({ onWatchData, rowData }) => {
        return (
            <Button
                className="btn-rows-action"
                onClick={() => onWatchData(rowData)}
            >
                <FaEye />
            </Button>
        )
    }

    const ActionComponent = ({ onWatchData, onEditData, rowData }) => {
        return (
            <Box>
                {role === 'Manager' ? (
                    <ButtonEdit onEditData={onEditData} rowdata={rowData} />
                ) : null}
                <ButtonWatch onWatchData={onWatchData} rowData={rowData} />
            </Box>
        )
    }

    const handleSelectAllClick = async (event) => {
        if (event.target.checked) {
            const response = await dieuChinhLuongApi.danhSachMaDieuChinhLuong()
            if (response.code === 200) {
                const newSelecteds = response.data.map((n) => n.MaDCL)
                setSelected(newSelecteds)
                return
            } else {
                setSelected([])
                return
            }
        }
        setSelected([])
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
    const onOpenModal = () => {
        setOpenModal(true);
    }
    const onCloseModal = () => {
        setOpenModal(false);
        setCurrentRowData(null);
    }
    const onPageChange = (event, newPage) => {
        setPage(newPage)
    }
    const onWatchData = (rowData) => {
        setCurrentRowData(rowData)
        setOpenModal(true)
        setModalAction('Watch')
    }
    const onEditData = (rowData) => {
        setCurrentRowData(rowData)
        setOpenModal(true)
        setModalAction('Edit')
    }
    const getDanhSachDieuChinhLuong = async () => {
        const response = await dieuChinhLuongApi.danhSachDieuChinhLuong({ page: page + 1, limit })
        if (response.code === 200) {
            setListDieuChinhLuong(response.data.rows)
            setRowCount(response.data.count)
        }
    }

    useEffect(() => {
        getDanhSachDieuChinhLuong()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [openModal])
    return (
        <>
            <ModalDieuChinhLuong open={openModal} onClose={onCloseModal} action={modalAction} rowData={currentRowData}/>
            <Box className={classes.container}>
                <Box className={classes.buttonTopAction}>
                    {role === 'Manager' ? (
                        <Button
                            variant="contained"
                            onClick={() => {
                                setModalAction('Add')
                                setOpenModal(true)
                            }}
                        >
                            Thêm Điều Chỉnh Lương
                        </Button>
                    ) : null}
                </Box>
                <Box className={classes.formContainer}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }}>
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
                                        Số Quyết Định
                                    </TableCell>
                                    <TableCell align="right">
                                        Ngày Ký Kết
                                    </TableCell>
                                    <TableCell align="right">
                                        Ngày Điều Chỉnh Lương
                                    </TableCell>
                                    <TableCell align="right">
                                        Lương
                                    </TableCell>
                                    <TableCell align="right">
                                        Tên Nhân Viên
                                    </TableCell>
                                    <TableCell align="center">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {listDieuChinhLuong.map((row) => {
                                    const isItemSelected = isSelected(row.MaDCL)
                                    return (
                                        <TableRow
                                            key={row.MaDCL}
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
                                                            row.MaCa
                                                        )
                                                    }
                                                    // inputProps={{
                                                    //     'aria-labelledby': labelId,
                                                    // }}
                                                />
                                            </TableCell>
                                            <TableCell align="left">
                                                {row.SoQuyetDinh}
                                            </TableCell>
                                            <TableCell align="right">
                                                {moment(row.NgayKyKet).format('D/MM/YYYY')}
                                            </TableCell>
                                            <TableCell align="right">
                                                {moment(row.NgayDieuChinhLuong).format('D/MM/YYYY')}
                                            </TableCell>
                                            <TableCell align="right">
                                                {row.SoLuongMoi}
                                            </TableCell>
                                            <TableCell align="right">
                                                {row.nhanvien.TenNV}
                                            </TableCell>
                                            <TableCell
                                                align="right"
                                                width={100}
                                            >
                                                <ActionComponent
                                                    onWatchData={onWatchData}
                                                    onEditData={onEditData}
                                                    rowData={row}
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
export default SalaryChange
