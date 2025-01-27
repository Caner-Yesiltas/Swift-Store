import React, { useEffect, useState } from 'react';
import SearchComp from '../components/SearchComp.tsx';
import axios from 'axios';
import { addFavorites, fetchFail, fetchStart, getSuccesProduct,} from '../features/productsSlice.ts';
import { useAppDispatch, useAppSelector } from '../app/hooks.ts';
import { EventFunc, Products } from '../models/models.ts';
import Card from '../components/Card.tsx';
import { toastSuccessNotify, toastWarnNotify } from '../helper/ToastNotify.tsx';

const Home = () => {
  const [search, setSearch] = useState('');
  const dispatch = useAppDispatch();
  const {loading, error, productsList, favorites} = useAppSelector(state => state.products)

  const handleAdd = (product) =>{
if(favorites.filter(item=> item.id === product.id).length===0){
  dispatch(addFavorites(product))
  toastSuccessNotify('Product added to favorites')
} else{
  toastWarnNotify('Product already in favorites')
}
  }

  const getData = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.get<Products>(
        `https://dummyjson.com/products/search?q=${search}`,
      );
      dispatch(getSuccesProduct(data.products));
    } catch (error) {
      dispatch(fetchFail());
    }
  };

  useEffect(() => {
    getData();
  }, [search]);

  const handleChange: EventFunc = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <SearchComp handleChange={handleChange} />
      {loading ? (
        <div className="mt-52">
          <p className="text-center text-white-50">Products Loading...</p>
        </div>
      ) : error ? (
        <div className="mt-52">
          <p className="text-center text-white-50">Something Went Wrong...</p>
        </div>
      ) : (
        <div className='flex justify-center items-center flex-wrap gap-5 p-5' >
          {productsList.map((item) => (
           <Card key={item.id} text="Add to favorites" handleFunc={handleAdd} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
