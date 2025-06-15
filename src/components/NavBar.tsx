import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../app/hooks.ts';

const NavBar = () => {
    const { cart } = useAppSelector(state => state.products);
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className='flex justify-between items-center h-16 bg-gradient-to-r from-gray-700 to-gray-600 text-white px-6 shadow-md'>
      
      {/* Logo */}
      <Link to='/'>
        <h3 className='text-xl font-bold hover:text-blue-300 transition-colors duration-300 cursor-pointer'>
          🛍️ Swift Store
        </h3>
      </Link>
      
      {/* Navigation */}
      <div className='flex items-center space-x-6'>
        <Link 
          to='/' 
          className='hover:text-blue-300 transition-colors duration-300 px-3 py-2 rounded hover:bg-gray-500/30'
        >
          Home
        </Link>
        <Link 
          to='/favorites'
          className='hover:text-blue-300 transition-colors duration-300 px-3 py-2 rounded hover:bg-gray-500/30'
        >
          ❤️ Favorites
        </Link>
        
        {/* Basket */}
        <Link to='/cart'>
          <div className='relative'>
            <button className='hover:text-blue-300 transition-colors duration-300 p-2 rounded hover:bg-gray-500/30'>
              🛒
               {cartItemCount > 0 && ( 
                <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5'>
                  {cartItemCount} 
                </span>
              )}
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;