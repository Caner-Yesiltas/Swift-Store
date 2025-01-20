import React, { useEffect, useState } from 'react';
import SearchComp from '../components/SearchComp.tsx';
import axios from 'axios';
import { fetchFail, fetchStart, getSuccesProduct, Product } from '../features/productsSlice.ts';
import { useAppDispatch } from '../app/hooks.ts';

export interface Products {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

const Home = () => {
  const [search, setSearch] = useState('');
  const dispatch = useAppDispatch ()

  const getData = async () => {
  dispatch(fetchStart())
    try {
      const { data } = await axios.get<Products>(
        `https://dummyjson.com/products/search?q=${search}`,
      );
      dispatch(getSuccesProduct(data.products))
    } catch (error) {
      dispatch(fetchFail())
    }
  };

  useEffect(() => {
    getData()
  }, [search])
  


  return (
    <div>
      <SearchComp />
    </div>
  );
};

export default Home;
