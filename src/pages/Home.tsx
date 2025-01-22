import React, { useEffect, useState } from 'react';
import SearchComp from '../components/SearchComp.tsx';
import axios from 'axios';
import { fetchFail, fetchStart, getSuccesProduct,} from '../features/productsSlice.ts';
import { useAppDispatch, useAppSelector } from '../app/hooks.ts';
import { EventFunc, Products } from '../models/models.ts';
import Card from '../components/Card.tsx';

const Home = () => {
  const [search, setSearch] = useState('');
  const dispatch = useAppDispatch();
  const {loading, error, productsList} = useAppSelector(state => state.products)

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
           <Card key={item.id} text="Add to favorites" handleFunc={handleAdd}/>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
