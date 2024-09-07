import { Button } from "@mui/material";
import { FaEdit } from "react-icons/fa";
import  "./ButtonWatch.css";
import PropTypes from "prop-types";

const ButtonWatch = ({navigate, rowdata, onClickFnc}) => {
    return (
        <Button className="btn-rows-action" onClick={onClickFnc}>
            <FaEdit />
        </Button>
    )
}

export default ButtonWatch;