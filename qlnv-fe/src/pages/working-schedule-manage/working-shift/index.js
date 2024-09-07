import {
    Box,
    Button,
    Checkbox,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import WorkingShiftDetail from './working-shift-detail'
import { useStyles } from './style'
import caLamApi from '../../../core/api/calam.api'
import { FaEdit, FaEye } from 'react-icons/fa'
import './styles.css'
const WorkingShift = ({ navigate, role }) => {
    const classes = useStyles()
    const [openModal, setOpenModal] = useState(false)
    const [selected, setSelected] = useState([])
    const [rowCount, setRowCount] = useState(0)
    const [page, setPage] = useState(0)
    const [limit, setLimit] = useState(10)
    const [listCaLam, setListCaLam] = useState([])
    const [currentRowData, setCurrentRowData] = useState(null)
    const [modalAction, setModalAction] = useState('Edit')
    const isSelected = (name) => selected.indexOf(name) !== -1
    const handleSelectAllClick = async (event) => {
        if (event.target.checked) {
            const response = await caLamApi.danhSachMaCa()
            if (response.code === 200) {
                const newSelecteds = response.data.map((n) => n.MaCa)
                setSelected(newSelecteds)
                return
            } else {
                setSelected([])
                return
            }
        }
        setSelected([])
    }
    const onCloseModal = () => {
        setOpenModal(false)
    }
    const getDanhSachCaLam = async () => {
        const response = await caLamApi.danhSachCaLam({ page: page + 1, limit })
        if (response.code === 200) {
            setListCaLam(response.data.rows)
            setRowCount(response.data.count)
        }
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

    useEffect(() => {
        getDanhSachCaLam()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [openModal])
    return (
        <>
            <WorkingShiftDetail
                open={openModal}
                onClose={onCloseModal}
                rowData={currentRowData}
                action={modalAction}
            />
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
                            Thêm Ca Lam
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
                                        Tên ca làm
                                    </TableCell>
                                    <TableCell align="right">
                                        Giờ bắt đầu
                                    </TableCell>
                                    <TableCell align="right">
                                        Giờ kết thúc
                                    </TableCell>
                                    <TableCell align="right">
                                        Trạng thái
                                    </TableCell>
                                    <TableCell align="center">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {listCaLam.map((row) => {
                                    const isItemSelected = isSelected(row.MaCa)
                                    return (
                                        <TableRow
                                            key={row.MaCa}
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
                                                {row.TenCa}
                                            </TableCell>
                                            <TableCell align="right">
                                                {row.ThoiGianBatDau}
                                            </TableCell>
                                            <TableCell align="right">
                                                {row.ThoiGianKetThuc}
                                            </TableCell>
                                            <TableCell align="right">
                                                {row.IsDisable
                                                    ? 'Unavailable'
                                                    : 'Available'}
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

export default WorkingShift
