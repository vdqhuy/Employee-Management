import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
    workingScheduleListWrapper: {
        display: 'flex',
        flexDirection: 'column',
        padding: '1rem'
    },
    datePickerCover: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    picker: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonApply: {
        height: '40px',
        marginLeft: '1rem !important'
    }
});