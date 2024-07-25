import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link , useLocation, useNavigate} from 'react-router-dom';
import { toggleTheme } from '../Redux/Slice/themeSlice';
import { signOutSuccess } from '../Redux/Slice/userSlice';



const Header = () => {
    const path = useLocation().pathname;
    const dispacth = useDispatch();
    const navigate = useNavigate();
    const {currentUser} = useSelector((state)=>state.user)
    const {theme} = useSelector((state) => state.theme);

    const handleSignout = () => {
        dispacth(signOutSuccess())
        localStorage.removeItem("Token");
    }

    return (
       <Navbar className='border-b-2 dark: bg-black'>
        <Link to = '/' className='self-center whitespace-nowrap text-sm sm:text-xl font-bold darl'>
        <span className='px-2 py-1 bg-gradient-to-l from-pink-600 via-purple-500 to-pink-400'>Blog</span>App
        </Link>
        <form>
            <TextInput type= 'text' placeholder='search' rightIcon={AiOutlineSearch} className='hidden lg:inline'/>
        </form>
        <Button className=' w-16 h-10  lg:hidden text-dark' gradientDuoTone="purpleToPink" outline>
            <AiOutlineSearch/>
        </Button>
        <div className='flex gap-2 md: order-2'>
        <Button className=' w-16 h-10  lg:hidden sm:inline' gradientDuoTone="purpleToPink" outline onClick={()=>dispacth(toggleTheme())}>
            {theme === 'light'? <FaMoon/> : <FaSun/>}
          

        </Button>
        {currentUser ? (
            <Dropdown arrowIcon={false} inline label={<Avatar alt='user' img={currentUser.profilepic}rounded/>}>
              <Dropdown.Header>
                <span className='block text-sm'>{currentUser.username}</span>
              </Dropdown.Header>
              <Link to = "/dashboard?tab=profile">
              <Dropdown.Item>Profile</Dropdown.Item>
              </Link>
              <DropdownDrivder />
              <Dropdown.Item onClick={handleSignout} >SignOut</Dropdown.Item>
            </Dropdown>
        ):(
            <Link to ="/Signin">
            <Button gradientFDuoTone="purpleToPink" outline>
                SignIn
            </Button>
            </Link>

        )
        
        }
       
        <Navbar.Toggle/>
        </div>
        <Navbar.Collapse>
            <Navbar.Link active={path ==="/"}  as={'div'}>
                <Link to='/'>Home</Link>
            </Navbar.Link>
            <Navbar.Link active={path ==="/about"} as={'div'}>
                <Link to='/about'>About</Link>
            </Navbar.Link>
            <Navbar.Link active={path ==="/blogs"} as={'div'}>
                <Link to='/blog'>Blogs</Link>
            </Navbar.Link>
        </Navbar.Collapse>
       </Navbar>
    );
};

export default Header;