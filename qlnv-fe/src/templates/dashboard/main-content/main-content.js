import UserList from '../../../pages/user-manage/user-list/user-list';
import PositionList from '../../../pages/position-manage/position-list/position-list';
import { Routes, Route, BrowserRouter as Router, Navigate } from 'react-router-dom';
import './main-content.css';
import UserDetail from '../../../pages/user-manage/user-detail/user-detail';
import PositionManage from '../../../pages/position-manage/position-manage/position-manage';
import SalaryList from '../../../pages/salary-manage/salary-list/salary-list';
import WorkingScheduleList from '../../../pages/working-schedule-manage/working-schedule-list';
import WorkingShift from '../../../pages/working-schedule-manage/working-shift';
import { useEffect } from 'react';
import SalaryChange from '../../../pages/salary-manage/salary-change';
import Profile from '../../../pages/profile';
import UserAccount from '../../../pages/user-manage/account';
const MainContent = ({navigate}) => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    useEffect(() => {
        if (!token || !role) {
            navigate('/protected')
        }
    }, [navigate, role, token])
    return (
        <div className='main-content'>
            <Routes>
                <Route path='/nhan-vien' element={<UserList navigate={navigate} role={role}/>}/>
                {role === 'Manager' ? (
                    <>
                        <Route path='/nhan-vien/them-nhan-vien' element={<UserDetail navigate={navigate}/>}/>
                        <Route path='/nhan-vien/hieu-chinh-nhan-vien' element={<UserDetail navigate={navigate}/>}/>
                        <Route path='/nhan-vien/tai-khoan' element={<UserAccount navigate={navigate}/>}/>
                    </>
                ) : <Route path="*" element={<Navigate to="/" replace />} />}
                <Route path='/nhan-vien/xem-nhan-vien' element={<UserDetail navigate={navigate}/>}/>
                <Route path='/chuc-vu/danh-sach-chuc-vu' element={<PositionList navigate={navigate} role={role}/>}/>
                <Route path='/chuc-vu/quan-ly-chuc-vu' element={<PositionManage navigate={navigate} role={role}/>}/>
                <Route path='/luong/quan-ly-luong' element={<SalaryList navigate={navigate}/>}/>
                <Route path='/luong/dieu-chinh-luong' element={<SalaryChange navigate={navigate} role={role}/>}/>
                <Route path='/ca-lam-viec' element={<WorkingShift navigate={navigate} role={role}/>}/>
                <Route path='/lich-lam-viec/danh-sach-lich-lam-viec' element={<WorkingScheduleList navigate={navigate} role={role}/>}/>
                <Route path='/profile' element={<Profile navigate={navigate}/>} />

            </Routes>
            
        </div>
    )
}

export default MainContent;