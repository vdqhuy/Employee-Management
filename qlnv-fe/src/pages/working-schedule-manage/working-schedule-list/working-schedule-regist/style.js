import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
    container: {
        width: '100%',
        height: '100%',
        padding: '1rem',
    },
    formContainer: {
        backgroundColor: 'white',
        padding: '1rem',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        boxShadow: 24,
        p: 4,
        width: '50%'
    },
    formControl: {
        width: '100%'
    },
    formControlButton: {
        marginTop: '1rem !important',
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        '& button': {
            marginLeft: '1rem'
        }
    }
})