import Card from "../conponents/Card";
import React from 'react';
import AppContext from '../context'


function Favorites({
   onAddToCart,
}){

  const { favorites, onAddToFavorite } = React.useContext(AppContext);

    return(
        <div className="content">
        <div className="content-header">
          <h1>Мои закладки</h1>
        </div>
        <div className="card-main">
        { favorites
            .map( (item, index) =>( 
              <Card 
                key={index}
                {...item}
                onFavorite={onAddToFavorite}
                onPlus={(obj) => onAddToCart(obj)}
                favorited={true}
              />
        ))}
        </div>
      </div>
    )
}

export default Favorites;