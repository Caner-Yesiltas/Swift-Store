import React from 'react';
import { Product } from '../models/models';
import { useAppDispatch, useAppSelector } from '../app/hooks.ts'; 
import { updateQuantity, addToCart } from '../features/productsSlice.ts';
import { toastSuccessNotify } from '../helper/ToastNotify.tsx'; 

interface ICard {
  item: Product;
  text: string;
  handleFunc: (item: Product) => void;
}

const Card: React.FC<ICard> = ({ item, text, handleFunc }) => {

  const dispatch = useAppDispatch(); 
  const { quantities } = useAppSelector(state => state.products); 
  
  
  const currentQuantity = quantities[item.id] || 1;
  
  
  const handleQuantityChange = (change: number) => {
    const newQuantity = currentQuantity + change;
    dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
  };
  
 
  const handleAddToCart = () => {
    dispatch(addToCart(item));
    toastSuccessNotify(`${currentQuantity} ${item.title} added to cart!`);
  };




  return (
 <div className='w-10/12 sm:w-6/12 md:w-4/12 lg:w-3/12 flex flex-col justify-between bg-white rounded-lg 
                   transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-2xl hover:-translate-y-2 cursor-pointer'>
      <div className='p-4'>
        <h1 className='text-gray-900 uppercase text:xl'>{item.title}</h1>
        <p className='text-sm mt-1 text-gray-500 hover:line-clamp-none'>
          {item.description}
        </p>
      </div>
      <img
        className='p-2 min-h-[9.375rem] max-h-[9.375rem] object-contain'
        src={item.images[0]}
        alt={item.title}
      />
      <div className='flex justify-between items-center bg-gray-700'>
        <h2 className='text-gray-100 font-bold m-3'>{item.price}</h2>
        
        <div className='flex items-center gap-2 m-2'>
          {/* Quantity Controls */}
          <div className='flex items-center bg-gray-200 rounded'>
            <button className='px-2 py-1 text-gray-700 hover:bg-gray-300' 
             onClick={() => handleQuantityChange(-1)}>-</button>
            <span className='px-2 py-1 text-gray-700'> {currentQuantity}</span>
            <button className='px-2 py-1 text-gray-700 hover:bg-gray-300' onClick={() => handleQuantityChange(1)}>+</button>
          </div>
          
          {/* Add to Cart Button */}
          <button className='bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition-colors'
          onClick={handleAddToCart}>
            🛒
          </button>
          
          {/* Favorites Button - Kalp */}
          <button
            className='bg-gray-300 p-2 rounded-lg animate-pulse hover:animate-none hover:bg-red-300 transition-colors'
            onClick={() => handleFunc(item)}
          >
            ❤️
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;