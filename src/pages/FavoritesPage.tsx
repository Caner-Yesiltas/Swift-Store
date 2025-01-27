import React from 'react';
import Card from '../components/Card.tsx';
import { useAppDispatch, useAppSelector } from '../app/hooks.ts';
import { Product, VoidFunc } from '../models/models.ts';
import { removeFavorites } from '../features/productsSlice.ts';
import { toastSuccessNotify } from '../helper/ToastNotify.tsx';

const FavoritesPage = () => {
  const { favorites } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  const handleRemove: VoidFunc = (product) => {
    const newData: Product[] = favorites.filter(
      (item) => item.id !== product.id,
    );
    dispatch(removeFavorites(newData));
    toastSuccessNotify('Product removed from favorites');
  };

  return (
    <div>
      <h1 className='font-bold text-2xl text-whıte text-center m-3' >
      My Favorites Products
      </h1>
      <div className='flex justify-center items-center flex-wrap gap-5 p-5'>
        {favorites.map((item) => (
          <Card
            key={item.id}
            text='Remove'
            item={item}
            handleFunc={handleRemove}
          />
        ))}
        {favorites.length === 0 && (<h3 className='text-2xl text-center text-orange-950'>
          No favorites products yet
        </h3> )}
      </div>
    </div>
  );
};

export default FavoritesPage;
