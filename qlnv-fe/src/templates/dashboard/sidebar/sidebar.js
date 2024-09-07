import './sidebar.css';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav'; 
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import {FaUserAlt, FaBookReader, FaCalendar, FaMoneyBillWave} from 'react-icons/fa';
import { useMemo } from 'react';
const SideBar = ({navigate}) => {
    const setDefaultSelect = useMemo(() => {
        const currentPath = window.location.pathname;
        return currentPath.replace('/main-dashboard/', '');
    }, [])


    return (
        <SideNav onSelect={(selected) => {
            const to = '/main-dashboard/' + selected;
                navigate(to);
        }}>
            <SideNav.Toggle />
            <SideNav.Nav defaultSelected={setDefaultSelect}>
                <NavItem eventKey="nhan-vien">
                    <NavIcon>
                        <FaUserAlt style={{fontSize: '1.25rem'}}/>
                    </NavIcon>
                    <NavText>
                        Nhân Viên
                    </NavText>
                </NavItem>
                <NavItem eventKey="chuc-vu">
                    <NavIcon>
                        <FaBookReader style={{fontSize: '1.5rem'}}/>
                    </NavIcon>
                    <NavText>
                        Chức Vụ
                    </NavText>
                    <NavItem eventKey="chuc-vu/danh-sach-chuc-vu">
                        <NavText>
                            Danh Sách Chức Vụ
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="chuc-vu/quan-ly-chuc-vu">
                        <NavText>
                            Quản Lý Chức Vụ
                        </NavText>
                    </NavItem>
                </NavItem>
                <NavItem eventKey="luong">
                    <NavIcon>
                        <FaMoneyBillWave style={{fontSize: '1.25rem'}}/>
                    </NavIcon>
                    <NavText>
                        Lương
                    </NavText>
                    <NavItem eventKey="luong/dieu-chinh-luong">
                        <NavText>
                            Điều Chỉnh Lương
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="luong/quan-ly-luong">
                        <NavText>
                            Quản Lý Lương
                        </NavText>
                    </NavItem>
                </NavItem>
                <NavItem eventKey="lich-lam-viec">
                    <NavIcon>
                        <FaCalendar style={{fontSize: '1.25rem'}}/>
                    </NavIcon>
                    <NavText>
                        Lịch Làm Việc
                    </NavText>
                    <NavItem eventKey="ca-lam-viec">
                        <NavText>
                            Quản Lý Ca Làm Việc
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="lich-lam-viec/danh-sach-lich-lam-viec">
                        <NavText>
                            Danh Sách Lịch Làm Việc
                        </NavText>
                    </NavItem>
                </NavItem>
            </SideNav.Nav>
        </SideNav>
    )
}

export default SideBar;