import {
    Box,
    Checkbox,
    Paper,
    Table,
    Button,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow,
} from '@mui/material'
import { useEffect, useState } from 'react'
import luongApi from '../../../core/api/luong.api'
import { FaEdit, FaEye } from 'react-icons/fa'
import SalaryDetail from './salary-detail/index'

const SalaryList = ({ navigate }) => {
    const [selected, setSelected] = useState([])
    const [rowCount, setRowCount] = useState(0)
    const [listSalary, setListSalary] = useState([])
    const [page, setPage] = useState(0)
    const [limit, setLimit] = useState(10)
    const [openModal, setOpenModal] = useState(false)
    const [currentRowData, setCurrentRowData] = useState(null)
    const handleSelectAllClick = () => {}
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
    const isSelected = (name) => selected.indexOf(name) !== -1

    const getDanhSachLuong = async () => {
        const response = await luongApi.danhSachLuong({ page: page + 1, limit })
        if (response.code === 200) {
            setListSalary(response.data.rows)
            setRowCount(response.data.count)
        }
    }

    const onOpenModal = (rowdata) => {
        setOpenModal(true);
        setCurrentRowData(rowdata);
    }

    const onCloseModal = () => {
        setOpenModal(false);
    }

    const ButtonEdit = ({ handleEditChucVu, rowdata }) => {
        return (
            <Button
                className="btn-rows-action"
                onClick={() => handleEditChucVu(rowdata)}
            >
                <FaEdit />
            </Button>
        )
    }

    const ActionComponent = ({ navigate, rowdata, ...fnc }) => {
        return (
            <Box>
                <ButtonEdit
                    handleEditChucVu={fnc.handleEditChucVu}
                    rowdata={rowdata}
                />
            </Box>
        )
    }

    useEffect(() => {
        getDanhSachLuong()
    }, [openModal])
    return (
        <>
            <SalaryDetail open={openModal} onClose={onCloseModal} rowData={currentRowData}/>
            <Box className="manage-nhan-vien-wrapp">
                <Box className="table-wrapp">
                    <TableContainer component={Paper} className="table-wrapp">
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">
                                        Tên Nhân Viên
                                    </TableCell>
                                    <TableCell align="right">Lương</TableCell>
                                    <TableCell align="right">Phụ Cấp</TableCell>
                                    <TableCell align="right">
                                        Khoản Trừ
                                    </TableCell>
                                    <TableCell align="center">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {listSalary.map((row) => {
                                    const isItemSelected = isSelected(
                                        row.MaLuong
                                    )
                                    return (
                                        <TableRow
                                            key={row.MaLuong}
                                            sx={{
                                                '&:last-child td, &:last-child th':
                                                    {
                                                        border: 0,
                                                    },
                                            }}
                                        >
                                            <TableCell align="left">
                                                {row.nhanvien.TenNV}
                                            </TableCell>
                                            <TableCell align="right">
                                                {row.Luong}
                                            </TableCell>
                                            <TableCell align="right">
                                                {row.PhuCap}
                                            </TableCell>
                                            <TableCell align="right">
                                                {row.KhoanTru}
                                            </TableCell>
                                            <TableCell
                                                align="right"
                                                width={100}
                                            >
                                                <ActionComponent
                                                    navigate={navigate}
                                                    rowdata={row}
                                                    handleEditChucVu={onOpenModal}
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

export default SalaryList
