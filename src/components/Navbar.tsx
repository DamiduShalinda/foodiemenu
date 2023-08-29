import React from 'react'
import { BsGoogle} from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/Auth';
import { AiOutlineHome , AiOutlineUser , AiOutlineMenu} from 'react-icons/ai'

const Navbar: React.FC = () => {

    const { isAuth , signIn , signOut , user } = useAuth();

    const handleClick = () => {
        if(isAuth){
            signOut();
        }else{
            signIn();
        }
    }

  return (
    <div className='fixed w-full bg-slate-400 flex'>
        <div className='md:flex flex-row items-center justify-between w-full px-10 py-4 hidden'>
            <Link to='/'>Foodie</Link>
            <ul className='flex flex-row items-center justify-center gap-9'>
                <li>
                <Link to='/'>
                    <p className=''>Home</p> 
                </Link>
                </li>
                <li>
                <Link to='/categories'>
                    <p className=''>Categories</p> 
                </Link>
                </li>
                <li>
                <Link to='/account'>
                    <p className=''>Account</p> 
                </Link>
                </li>
                <button className='flex flex-row items-center justify-center gap-2 border px-2 py-1 rounded-md border-slate-600' onClick={() => handleClick()}>
                    {isAuth ? <p>Sign Out</p> : <><BsGoogle/> <p>Sign In</p></>}
                </button>
            </ul>
        </div>
        {/* Mobile Navbar */}
       <div className='md:hidden bottom-0 w-full fixed bg-slate-600 text-white rounded-t-xl'>
        <ul className='flex flex-row justify-evenly items-center p-2'>
            <Link to='/'>
                <li className='flex flex-col items-center text-sm gap-1'>
                    <AiOutlineHome size={20}/>
                    <p>Home</p>
                </li>
            </Link>
            {isAuth ? 
            <Link to='/account'>
                <li className='flex flex-col items-center text-sm gap-1'>
                    {user?.photoURL ? <img src={user?.photoURL} alt="user" className='w-10 h-10 rounded-full'/> : 
                        <>
                        <AiOutlineUser size={20}/>
                        <p>{user?.displayName?.split(' ')[0]}</p>
                        </>
                    }
                    
                </li>
            </Link> : 
            <li className='flex flex-col items-center text-sm gap-1' onClick={signIn}>
            <BsGoogle size={20}/>
            <p>Signin</p>
            </li>
            }
            <Link to='/admin'>
                <li className='flex flex-col items-center text-sm gap-1'>
                    <AiOutlineMenu size={20}/>
                    <p>Admin</p>
                </li>
            </Link>
        </ul>
       </div>
        
    </div>
  )
}

export default Navbar