import React, { useState } from 'react'
import SearchComp from '../components/SearchComp.tsx'
import axios from 'axios'

const Home = () => {
  const [search, setSearch] = useState("")


  const getData = async () => {

    try {
      
      const {data} = await axios.get(`https://dummyjson.com/products/search?q=${search}`)

    } catch (error) {
      
    }


  }


  return (
    <div>
      <SearchComp/>
    </div>
  )
}

export default Home
