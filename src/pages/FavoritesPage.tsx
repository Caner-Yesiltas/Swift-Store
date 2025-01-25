import React from 'react'
import Card from '../components/Card'

const FavoritesPage = () => {
const {favorites} = useAppSelector(state => state.products)


  return (
    <div  >
      FavoritesPage
     <div className="flex justify-center items-center flex-wrap gap-5 p-5">
    {favorites.map((item) => (
      <Card
        key={item.id}
        text="Add to favorites"
        item={item}
        // handleFunc={handleAdd}
      />
    ))}
  </div>
    </div>
  )
}

export default FavoritesPage
