import { Fade, Box, Paper } from '@mui/material'
import { useCallback, useEffect, useRef, useState } from 'react'
import './header.css'
import { logout } from '../../../ultis/common.function'
import { useNavigate } from 'react-router-dom'

const AvatarCircle = ({ showMenu, refs }) => {
    return (
        <div className="avatar-circle-wrapp">
            <div
                className="avatar-circle-img"
                onClick={() => showMenu()}
                ref={refs}
            ></div>
        </div>
    )
}

const DropDownMenu = ({ isShow, refs, handleHideDropdown }) => {
    const profileBtn = useRef(null)
    const logoutBtn = useRef(null)
    const paperRef = useRef(null)

    const onHighlightButton = (ref) => {
        ref.current.classList.add('selected')
    }

    const removeHighLightButton = (ref) => {
        ref.current.classList.remove('selected')
    }

    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (refs.current && !refs.current.contains(event.target)) {
                // setIsDropdownShow(false);
                handleHideDropdown()
            }
        }
        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [refs, handleHideDropdown])

    const Menu = () => {
        return (
            <>
                {isShow ? (
                    <div className="drop-down-menu-wrapp" ref={refs}>
                        <table className="drop-down-menu">
                            <tbody>
                                <tr>
                                    <td>
                                        <button
                                            onMouseMove={() =>
                                                onHighlightButton(profileBtn)
                                            }
                                            onMouseLeave={() =>
                                                removeHighLightButton(
                                                    profileBtn
                                                )
                                            }
                                            ref={profileBtn}
                                            onClick={() => {
                                                navigate('/main-dashboard/profile')
                                            }}
                                            className="btn-drop-down-menu"
                                        >
                                            <p>Profile</p>
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <button
                                            onClick={logout}
                                            onMouseMove={() =>
                                                onHighlightButton(logoutBtn)
                                            }
                                            onMouseLeave={() =>
                                                removeHighLightButton(logoutBtn)
                                            }
                                            ref={logoutBtn}
                                            className="btn-drop-down-menu"
                                        >
                                            <p>Logout</p>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                ) : null}
            </>
        )
    }

    const menuJSXElement = (
        <Paper ref={paperRef} sx={{ m: 1 }} elevation={4}>
            <Menu />
        </Paper>
    )

    const SimpleFade = () => {
        return (
            <Box
                style={{
                    position: 'absolute',
                    width: '100%',
                    top: '4rem',
                    zIndex: '1000',
                }}
            >
                <Fade in={isShow}>{menuJSXElement}</Fade>
            </Box>
        )
    }

    // return (isShow ? (
    //     <Menu />
    // ): (
    //     <></>
    // ))
    return <SimpleFade />
}

const HeaderLogo = () => {
    return (
        <div className="logo-wrapper">
            <img src="../../img/logo.png" alt="logo" />
        </div>
    )
}

const DashboardHeader = () => {
    const [isShowDropDownMenu, setIsShowDropDownMenu] = useState(false)
    const dropDownRef = useRef(null)
    const avatarCircleRef = useRef(null)
    const showDropdownMenu = () => {
        setIsShowDropDownMenu(true)
    }
    const hideDropdownMenu = useCallback(() => {
        setIsShowDropDownMenu(false)
    }, [])

    return (
        <nav className="wrap-header">
            <div className="header-content col-12">
                <div className="navigation-tree col-10">
                    <HeaderLogo />
                </div>
                <div className="user-information col-2">
                    <AvatarCircle
                        showMenu={showDropdownMenu}
                        refs={avatarCircleRef}
                    />
                    <DropDownMenu
                        isShow={isShowDropDownMenu}
                        handleHideDropdown={hideDropdownMenu}
                        refs={dropDownRef}
                    />
                </div>
            </div>
        </nav>
    )
}

export default DashboardHeader
