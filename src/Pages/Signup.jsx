import { Alert, Button, Spinner, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const Signup = () => {

    
    const [formdata, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    const handlechange = (e)=> {

        setFormData({...formdata, [e.target.id]: e.target.value.trim() });
        //console.log(formdata);

    }

    const handlesubmit = async (e)=> {
        e.preventDefault();
        if(!formdata.username|| !formdata.email|| !formdata.password){
            return console.log("please enter a");

        }
        try {
            const res = await fetch("http://localhost:5000/api/register",{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formdata),
            })
            const data = await res.json();
            if(data.success === false){
                return setErrorMessage(data.message);
            }
            if(res.ok){
                navigate('/signin');
            }
        } catch (error) {
          setErrorMessage(error.message);
          setLoading(false);  
        }
     
    }
    return (
        <div className='min-h-screen mt-20'>
            <div  className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:'>
                <div className='flex-1'>
                <div className='font-bold dark:text-white text-4xl'>
        <span className='px-2 py-1 bg-gradient-to-l from-pink-600 via-purple-500 to-pink-400'>Blog</span>App
        </div> 
        <p className='text-sm mt-6'>
            You can sign up with Email and Password or you can use
        </p>
                </div>
                <div className= 'flex-1'>
                    <from className='flex flex-col gap-4' onsubmit={handlesubmit}> 
                        <div>
                            <label value= 'username'/>
                            <TextInput type= 'text' placeholder= 'Enter your UserName' id='username'  onChange={handlechange}/>

                        </div>
                        <div>
                            <label value= 'Email'/>
                            <TextInput type= 'email' placeholder= 'name@emailcompany' id='email' onChange={handlechange}/>

                        </div>
                        <div>
                            <label value= 'Password'/>
                            <TextInput type= 'Password' placeholder= 'Enter the Password' id='Password' onChange={handlechange}/>

                        </div>
                        <Button  type='submit' disabled={loading}>{loading ? (
                            <>
                            <Spinner color="pink" aria-label="Pink spinner example" />
                      <span className='pl-3'>Loading</span> 
                      </>
                        ) : (
                            'Sign Up'
                        )
                      }
                       </Button>
                    </from>
                    <div className='flex gap-2 text-sm mt-6'>
                        <span>Alredy Have An Account ?</span>
                        <Link to = '/signin' className='text-indigo-400'>Sign In</Link>
                    </div>
                    {errorMessage && (
                        <Alert className='mt-4' variant="danger">
                           <span className='font-medium m-2'>oops!</span> {errorMessage}
                        </Alert>
                    )}
                </div>

            </div>
          
        </div>
    );
};

export default Signup;