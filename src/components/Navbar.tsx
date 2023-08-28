import React from 'react'
import { BsGoogle} from 'react-icons/bs'
import { Link } from 'react-router-dom'

const Navbar: React.FC = () => {
  return (
    <div className='fixed w-full bg-slate-400 flex'>
        <div className='flex flex-row items-center justify-between w-full px-10 py-4'>
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
                <li className='flex flex-row items-center justify-center gap-2 border px-2 py-1 rounded-md border-slate-600'>
                    <div>
                        <p>Sign In with</p>
                    </div>
                    <BsGoogle/>
                </li>
            </ul>
        </div>
       
        
    </div>
  )
}

export default Navbar