import Timeline from 'react-timelines'
import 'react-timelines/lib/css/style.css'
import { START_YEAR, NUM_OF_YEARS, NUM_OF_TRACKS } from './constants'
import { buildTimebar, buildTrack } from './builders'
import { fill } from './utils'
import { useEffect, useState } from 'react'
import { useStyles } from './style'
import { Button } from '@mui/material'
import dangKyLichLamApi from '../../../core/api/dangkylichlam.api'
import { convertDataResponseToTimeLineElement } from './helper'
import WorkingScheduleRegist from './working-schedule-regist'
import ModalSumSalary from '../../salary-manage/sum-salary'

const now = new Date(2020, 8, 1, 3, 19)
const timebar = buildTimebar()

const MIN_ZOOM = 2
const MAX_ZOOM = 30

const WorkingScheduleList = ({ role }) => {
    const classes = useStyles()
    const start = new Date(`${START_YEAR}`)
    // const start = new Date(new Date().setDate(0))
    const end = new Date(`${START_YEAR + NUM_OF_YEARS}`)
    const initTracksById = fill(NUM_OF_TRACKS).reduce((acc, i) => {
        const track = buildTrack(i + 1)
        acc[track.id] = track
        return acc
    }, {})
    const [zoom, setZoom] = useState(30)
    const [open, setOpen] = useState(false)
    // const [tracks, setTracks] = useState(Object.values(initTracksById))
    const [tracks, setTracks] = useState([])
    const [tracksById, setTracksById] = useState(initTracksById)
    // const [value, setValue] = useState([null, null])
    const [openModal, setOpenModal] = useState(false)
    const [openModalLuong, setOpenModalLuong] = useState(false)
    const [currentScheduleSelect, setCurrentScheduleSelect] = useState(null)
    const [modalAction, setModalAction] = useState('Watch')

    const handleToggleOpen = () => {
        setOpen((prev) => !prev)
    }
    const handleZoomIn = () => {
        setZoom((prev) => prev + 2)
    }
    const handleZoomOut = () => {
        setZoom((prev) => prev - 2)
    }
    const handleToggleTrackOpen = (track) => {
        setTracksById((prev) => ({
            ...prev,
            [track.id]: {
                ...track,
                isOpen: !track.isOpen,
            },
        }))
    }
    const onCloseModal = () => {
        setOpenModal(false)
    }

    const onCloseModalLuong = () => {
        setOpenModalLuong(false)
    }

    const danhSachDangKyLichLam = async () => {
        const response = await dangKyLichLamApi.danhSachDangKyLichLam()
        setTracks(convertDataResponseToTimeLineElement(response.data.rows))
    }

    const clickElement = (element) => {
        setOpenModal(true)
        setCurrentScheduleSelect(element.rawData)
        setModalAction('Edit')
    }

    useEffect(() => {
        // setTracks(Object.values(tracksById))
        // console.log(Object.values(tracksById))
    }, [tracksById])

    useEffect(() => {
        danhSachDangKyLichLam()
    }, [openModal])
    return (
        <>
            <WorkingScheduleRegist
                open={openModal}
                role={role}
                onClose={onCloseModal}
                action={modalAction}
                rawData={currentScheduleSelect}
            />
            <ModalSumSalary open={openModalLuong} onClose={onCloseModalLuong}/>
            <div className={classes.workingScheduleListWrapper}>
                <div className={classes.datePickerCover}>
                    {/* <div className={classes.picker}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateRangePicker
                                startText="Từ ngày"
                                endText="Đến ngày"
                                value={value}
                                onChange={(newValue) => {
                                    setValue(newValue)
                                }}
                                renderInput={(startProps, endProps) => (
                                    <>
                                        <TextField {...startProps} />
                                        <Box sx={{ mx: 2 }}> to </Box>
                                        <TextField {...endProps} />
                                    </>
                                )}
                            />
                        </LocalizationProvider>
                        <Button
                            className={classes.buttonApply}
                            variant="contained"
                        >
                            Apply
                        </Button>
                    </div> */}
                    <div>
                        {role === 'Employee' ? (
                            <>
                                <Button
                                    variant="contained"
                                    onClick={() => {
                                        setOpenModal(true)
                                        setCurrentScheduleSelect(null)
                                        setModalAction('Add')
                                    }}
                                >
                                    Đăng ký lịch làm
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={() => {
                                        setOpenModalLuong(true)
                                    }}
                                >
                                    Xem lương hiện tại
                                </Button>
                            </>
                        ) : null}
                    </div>
                </div>
                <Timeline
                    scale={{
                        start,
                        end,
                        zoom,
                        zoomMin: MIN_ZOOM,
                        zoomMax: MAX_ZOOM,
                    }}
                    isOpen={open}
                    toggleOpen={handleToggleOpen}
                    zoomIn={handleZoomIn}
                    zoomOut={handleZoomOut}
                    clickElement={clickElement}
                    timebar={timebar}
                    toggleTrackOpen={handleToggleTrackOpen}
                    now={now}
                    tracks={tracks}
                    enableSticky
                    scrollToNow
                />
            </div>
        </>
    )
}

export default WorkingScheduleList
