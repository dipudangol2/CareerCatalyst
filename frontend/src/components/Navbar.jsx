import React, {useEffect, useState} from 'react';
import { toast } from 'react-toastify';
import {NavLink } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import { signOutSuccess } from '../redux/userSlice';
import {Link} from 'react-router-dom'
import logo from '../assets/logo.svg'
import hamburger from '../assets/hamburger.svg'
import cross from '../assets/cross.svg'

export default function Navbar() {
  const {currentUser} =useSelector(state=>state.user);
  const dispatch = useDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth>1024);

  const handleResize = () => {
    if(window.innerWidth>1024){
      return setSidebarOpen(false);
    }
    setSidebarOpen(true);
  }
  
  useEffect(() => {
    handleResize();

    window.addEventListener("resize",handleResize);

    return () => window.removeEventListener("resize",handleResize);
  }, []);

  const handleLogout=async()=>{
    try {
        const res=await fetch("http://localhost:5000/api/auth/logout",{
            method:"POST",
            credentials:"include",
            headers:{ "Content-Type": "application/json" },
        })
        const data=await res.json();
        if(res.ok){
            toast.success(data.message);
            dispatch(signOutSuccess())
            window.location.reload();
        }else{
            toast.error(data.message);
        }
    } catch (error) {
      toast.error(error.message); 
    }
  }

  return (
    <nav className='px-10 py-6 flex justify-between items-center font-nav shadow-md'>

          {/* logo wrapper */}
          <div>
              <img src={logo} alt="logo" className='w-[130px]'/>
          </div>

          {/* nav links wrapper */}
          <div className={`absolute z-[150] top-0 right-0 min-w-[200px] w-max h-full border-l border-gray-500 lg:border-none lg:h-fit lg:relative flex-center transition-default ${sidebarOpen? 'sidebar-open' : ''} `}>
              <ul className='bg-white flex flex-col gap-8 justify-start items-start h-full pt-[125px] pl-10 pr-24 fixed lg:px-0 lg:pt-0 lg:relative lg:h-fit lg:flex-row lg:gap-8 lg:items-center'>
                {/* to manage active link either use LInk with location hook or just use NavLink from react router  */}
                    <li className='nav-link'><NavLink className={({isActive})=> isActive ? 'active' : ''} to='/' onClick={() => !isLargeScreen &&  setSidebarOpen(!sidebarOpen)}>Home</NavLink></li>
                    <li className='nav-link'><NavLink className={({isActive})=> isActive ? 'active' : ''} to='/find-job' onClick={() => !isLargeScreen && setSidebarOpen(!sidebarOpen)}>Find Job</NavLink></li>
                    <li className='nav-link'><NavLink className={({isActive})=> isActive ? 'active' : ''} to='/resources' onClick={() => !isLargeScreen && setSidebarOpen(!sidebarOpen)}>Resources</NavLink></li>
                    <li className='nav-link'><NavLink className={({isActive})=> isActive ? 'active' : ''} to='/counsellor' onClick={() => !isLargeScreen && setSidebarOpen(!sidebarOpen)}>Cousellor</NavLink></li>

                    {currentUser? (
                      <button className='text-accent-secondary underline underline-offset-2 -mt-1' onClick={handleLogout}>Log out</button>
                    ):(<button className='btn-primary'>
                      <Link to='/auth/sign-up'>Sign Up</Link>
                    </button>)}

                    <span className='block absolute top-5 right-5 lg:hidden'><img src={cross} alt="cross-icon" className='w-8 cursor-pointer' onClick={() => setSidebarOpen(!sidebarOpen)} id='cross'/></span>
              </ul>
          </div>

          {/* hambuger  */}
          <div className='block lg:hidden'>
              <img src={hamburger} alt="hamburger" className='w-8 cursor-pointer' onClick={() => setSidebarOpen(!sidebarOpen)} id='hamburger'/>
          </div>
    </nav>
  )
}
