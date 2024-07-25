import { Alert, Button, TextInput } from 'flowbite-react';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase.js'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {updateStart, updateFailure, updateSuccess, signOutSuccess, deleteUserStart,deleteUserSuccess,deleteUserFailure} from "../Redux/Slice/userSlice.jsx";
import { Modal } from "flowbite-react";
import { HiInformationCircle, HiOutlineExclamationCircle } from "react-icons/hi";


const DashboardProfile = () => {
    const dispatch = useDispatch();
    const {currentUser, loading , error} = useSelector((state)=> state.user);
    const [imageFile ,setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);
    const  filePickerRef = useRef();
    const [formData, setFormData] = useState({});
    const [imageFileUploading, setImageFileUploading] = useState(false);
    const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
    const [updateUserError, setUpdateUserError] = useState(null);
    const [showModel , setShowModel] = useState(false);



    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if(file){
            setImageFile(file);
            
            setImageFileUrl(URL.createObjectURL(file));
          
        }
    }



    useEffect(()=>{
        if(imageFile){
            uploadImage()
        }
    }, [imageFile])

    const uploadImage = async ()=>{
        setImageFileUploading(true);
        setImageFileUploadError(null);
       const storage = getStorage(app);
       const fileName = new Date().getTime()+ imageFile.name;
       const storageRef = ref(storage, fileName);
       const uploadTask = uploadBytesResumable(storageRef, imageFile);
       uploadTask.on('state_changed', 
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setImageFileUploadProgress(progress.toFixed(0));
        },
        (error)=> {
            setImageFileUploadError('Could not upload the image (File size must be less than 2Mb');
            setImageFileUploadProgress(null);
            setImageFileUrl(null);
            setImageFile(null);
            setImageFileUploading(false);
        },
         ()=> {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=> {
                setImageFileUrl(downloadURL);
                setFormData({...formData, profilePic: downloadURL})
                
            });

         }
        )
            
        }


        const handleChange = (e) => {
            setFormData({...formData, [e.target.name]: e.target.value});
        }

        const handleSubmit = async (e)=> {
            e.preventDefault();
            setUpdateUserError(null);
            setUpdateUserSuccess(null);
           if(Object.keys(formData).length === 0){
               setUpdateUserError("no changes Made")
               return
           }
           if(imageFileUploading){
             setUpdateUserError("Please wait while the image is uploading")
             return;
           }
           try {
               dispatch(updateStart())
               const res = await fetch(`http://localhost:5000/api/update/${currentUser.rest._id}`,{
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('Token'),
                },
                body: JSON.stringify(formData),
            })
            const data = await res.json();
            if(!response.ok) {
                dispatch(updateFailure(data.message))
                setUpdateUserError(data.message)
            }
            else {
                dispatch(updateSuccess(data))
                setUpdateUserSuccess("User Profile Updated Successfully")
            }


           } catch (error) {
            dispatch(updateFailure(error.message));
             setUpdateUserError(error.message)
            
           }
        };

       // signout
        const handleSignout = () => {
            dispatch(signOutSuccess());
            localStorage.removeItem('Token');
        };


        //delete user
        const handleDeleteAccount = async() => {
           setShowModel(false);
           try {
             dispatch(deleteUserStart())
             const res = await fetch(`http://localhost:5000/api/delete/${currentUser.rest._id}`,{
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    "token": localStorage.getItem('Token'),
                },
            })
            const data = await res.json();
            if(!response.ok) {
                dispatch(deleteUserFailure(data.message))
            }
            else {
                dispatch(deleteUserSuccess(data))
                dispatch(signOutSuccess());
                localStorage.removeItem('Token');
            }
            
           } catch (error) {
            dispatch(deleteUserFailure(error.message))
           }
            
        }




        
    

    return (
        <div className='max-w-lg mx-auto p-4 w-full'>
            <h1 className='my-7 text-center font-semibold text-4xl'>Profile</h1>
            <From className='flex flex-col gap-5' onSubmit={handleSubmit}>
                     
                    <input type='file' accept='image/*' ref={filePickerRef} onChange={handleImageChange} hidden/>
                    <div  className=' relative w-32 h-32 self-center cursor-pointer shadow-md-hidden rounder-full' onClick={()=>filePickerRef.current.click()}>
                        {
                            imageFileUploadProgress && (
                                <CircularProgressbar value={imageFileUploadProgress  || 0} text={`${imageFileUploadProgress}%`}
                                strokeWidth={5}
                                styles={{
                                    root: {
                                        width: '100%',
                                        height: '100%',
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        
                                    },
                                    
                                    path: {
                                        stroke: `rgba(62,159,190, ${imageFileUploadProgress/100})`
                                    }
                                }} 
                                />
                            )
                        }

                      
                    <img  src={imageFileUrl || currentUser.rest.profilePic} alt ="user" className={`rounded-full w-full h-full object-cover border-8  border-[lightgray]
                    ${imageFileUploadProgress && imageFileUploadProgress <100 && 'opacity-50'
                    }`} />

                    </div>
                    {imageFileUploadError && (
                        <Alert variant='danger'>
                            {imageFileUploadError}
                        </Alert>
                    )}
                   

                
                <TextInput type= 'text' id='username' placeholder='Username' defaultValue={currentUser.username} onChange={handleChange} />
                <TextInput type= 'email' id='email' placeholder='Email' defaultValue={currentUser.email} onChange={handleChange}/>
                <TextInput type= 'password' id='password' placeholder='******'  onChange={handleChange} />
                <Button type='submit' className='mt-5 w-full py-3 text-white bg-purple-500 rounded-md' disabled={loading || imageFileUploading}>
                    {loading ? 'loading... ':  'Update Profile' }</Button>B
            </From>
            <div className='text-red-600 flex justify-between mt-5'>
                <span className='cursor-pointer' onClick={()=>setShowModel(true)}>Delete Account</span>
                <span className='cursor-pointer' onClick={handleSignout}>SignOut</span>
            </div>
            {updateUserSuccess && (
                <Alert variant='success'>
                    <span className='font-medium m-2'>Success!</span> 
                    {updateUserSuccess}
                </Alert>
            )}
            {updateUserError && (
                <Alert variant='danger' icon={HiInformationCircle} className='mt-5'>
                    <span className='font-medium m-2'>Error!</span> 
                    {updateUserError}
                </Alert>
           
            )}
            {
                error && (
                    <Alert variant='danger' icon={HiOutlineExclamationCircle} className='mt-5'>
                        <span className='font-medium m-2'>Error!</span> 
                        {error}
                    </Alert>

                )
            }
            <Modal show={showModel} onClose={()=>setShowModel(false)} popup size= 'md'>
                <Modal.Header/>
                <Modal.Body>
                    <h2 className='text-lg font-semibold'>Are you sure you want to delete your account?</h2>
                    <div className='text-center'>
                        <HiOutlineExclamationCircle className='h-14 w-14 text-gray-500 dark:text-gray-200 mb-4 mx-auto' />
                       <div>
                        <Button variant='danger' className='px-4 py-2 text-white bg-red-500 rounded-md' onClick={handleDeleteAccount}>Yes I'm sure</Button>
                        <Button variant='secondary' className='px-4 py-2 ml-2 text-white bg-gray-400 rounded-md' onClick={()=>setShowModel(false)}>Cancel</Button>
 
                       </div>
                      
                    </div>
                </Modal.Body>
            </Modal>

        </div>
    );
};

export default DashboardProfile;