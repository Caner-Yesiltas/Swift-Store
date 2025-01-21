import React, { useEffect, useState } from 'react';
import SearchComp from '../components/SearchComp.tsx';
import axios from 'axios';
import { fetchFail, fetchStart, getSuccesProduct,} from '../features/productsSlice.ts';
import { useAppDispatch, useAppSelector } from '../app/hooks.ts';
import { EventFunc, Products } from '../models/models.ts';

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
        <div>
          {productsList.map((item) => (
            <p key={item.id}>{item.title}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
