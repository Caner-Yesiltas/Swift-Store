import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className='flex justify-between h-[3.125rem] text-white bg-gray-400 items-center px-5'>
      <Link to='/'>
        <h3 className='font-bold italic cursor-pointer'>Swift Store</h3>
      </Link>
      <div>
        <Link to='/' className='mr-2'>
          Home{' '}
        </Link>
        <Link to='/favorites'>Favorites</Link>
      </div>
    </div>
  );
};

export default NavBar;
