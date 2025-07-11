import React from 'react';

const Navbar = () => {
  return (
    <nav className='md:flex md:justify-between  bg-purple-800 text-white p-1'>
      <div className="logo flex justify-center">
        <span className='font-bold text-2xl mx-9 my-2    '>TaskReady</span>
      </div>
      
      <ul className="flex space-x-9 md:mx-15 my-3 justify-center  px-4  ">
        <li className=' cursor-pointer transform hover:scale-150 hover:font-bold transition duration-150 ease-in-out ' >Home</li>
        <li className=' cursor-pointer transform hover:scale-150 hover:font-bold transition duration-150 ease-in-out'>Your Tasks</li>
      </ul>
    </nav>
  )
}

export default Navbar
