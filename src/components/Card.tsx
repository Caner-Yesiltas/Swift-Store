import React from 'react'
import { Product } from '../models/models';

interface ICard {
    item:Product;
    text:string;
    handleFunc:(item:Product) =>void
}

const Card: React.FC<ICard> = ({item, text, handleFunc}) => {
  return (
    <div className="w-10/12 sm:w-6/12 md:w-4/12 lg:w-3/12 flex flex-col justify-between bg-white rounded-lg">
      <div >
        <h1>Title</h1>
        <p>Description</p>
      </div>
      <img src="" alt="" />
      <div>
        <h2>Price</h2>
        <button>Add</button>
      </div>
    </div>
  )
}

export default Card
