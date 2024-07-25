import React, { useEffect, useState } from 'react';
import {Sidebar} from "flowbite-react";
import { HiArrowSmRight ,HiUser} from 'react-icons/hi';

import { Link, useLocation } from'react-router-dom';
import { signOutSuccess } from '../Redux/Slice/userSlice';
import { useDispatch } from 'react-redux';
useDispatch
const DashboardSidebar = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const [tab, setTab]= useState('')
    
    useEffect(()=>{
       const urlParams = new URLSearchParams(location.search);
       const tabUrl = urlParams.get('tab');
       if(tabUrl){
          setTab(tabUrl);
       }
    },[location.search])

    const handleSignout = ()=> {
        dispatchEvent(signOutSuccess())
        localStorage.removeItem("Token")
    }
    return (

        <Sidebar className='w-full md: w-58'>
         <Sidebar.Items>
            <Sidebar.ItemGroup>
                <Link to ='/dashboard?tab=profile'>
                <Sidebar.Item  active={tab=== 'profile'} icon={HiUser} label={currentUser.rest.isAdmin ? "Admin" : "User"} labelColor='dark' as='div'>Profile</Sidebar.Item></Link>
                {currentUser.rest.isAdmin && (
                    <Link to="/create-post">
                        <Sidebar.Item label="Create Post" labelColor='dark' as='div'>Create Post</Sidebar.Item>
                    </Link>
                )}
                <Sidebar.Item icon={HiArrowSmRight} className="cursor-pointer">SignOut</Sidebar.Item>
            </Sidebar.ItemGroup>
         </Sidebar.Items>
        </Sidebar>
    );
};

export default DashboardSidebar;