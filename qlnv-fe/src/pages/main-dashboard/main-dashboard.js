import './main-dashboard.css'
import DashboardHeader from '../../templates/dashboard/header/header.js';
import SideBar from '../../templates/dashboard/sidebar/sidebar';
import MainContent from '../../templates/dashboard/main-content/main-content';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const MainDashboard = () => {
    const navigate = useNavigate();
    return (
        <div className='main-layout'>
            <DashboardHeader />
            <SideBar navigate={navigate}/>
            <MainContent navigate={navigate}/>
        </div>
    )
    
};
export default MainDashboard;