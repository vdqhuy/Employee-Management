import { Modal, Typography, Button, Box } from "@mui/material";

const PopUpNotic = ({open, onClose, title, ...props}) => {
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
    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={style}>
                <Typography>
                    {title}
                </Typography>
                <Box>
                    <Button variant="outlined" onClick={onClose}>OK</Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default PopUpNotic;