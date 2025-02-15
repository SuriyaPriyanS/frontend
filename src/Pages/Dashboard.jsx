import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashboardSidebar from '../Compontents/DashboardSidebar';
import DashboardProfile from '../Compontents/DashboardProfile';


const Dashboard = () => {
    const location = useLocation();
    const [tab, setTab]= useState('')
    
    useEffect(()=>{
       const urlParams = new URLSearchParams(location.search);
       const tabUrl = urlParams.get('tab');
       if(tabUrl){
          setTab(tabUrl);
       }
    },[location.search])
    return (
        <div className='min-h-screen flex flex-col  md:flex-row'>
            <div  className='md: w-58'>
                <DashboardSidebar tab={tab}/>
            </div>
            {tab === 'profile' && <DashboardProfile/>}
            
        </div>
    );
};

export default Dashboard;