import React from 'react';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signinFailure } from '../Redux/Slice/userSlice';
import { AiFillGoogleCircle } from 'react-icons/ai';

const OAuth = () => {


    const auth = getAuth(app);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handlesubmit = async ()=> {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({prompt: 'selectAccount'})
        try {
            const result = await signInWithPopup(auth,provider)
            const response = await fetch("http://localhost:5000/api.google", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  name: result.user.displayName,
                  email: result.user.email,
                  profilepic: result.user.photoURL 
                })
            })
            const data = await response.json()
            if(response.ok){
                localStorage.setItem('Token', data.token)
                dispatch(signInSuccess(data))
                navigate('/')
            }
            console.log(data);

        } catch (error) {
            dispatch(signinFailure(error.message))
        }
    }
    return (
        <Button type='button' gradientDuoTone="purplePink" onClick={handlesubmit}>
            <AiFillGoogleCircle className='w-6 h-6 mr-2'/>
            Continue with Gooogle

        </Button>
    );

};

export default OAuth;