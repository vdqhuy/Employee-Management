import { Button } from "@mui/material";
import { FaEdit } from "react-icons/fa";
import "./ButtonEdit.css";

const ButtonEdit = ({navigate, rowdata, onClickFnc}) => {
    return (
        <Button className="btn-rows-action" onClick={onClickFnc}>
            <FaEdit />
        </Button>
    )
}

export default ButtonEdit;