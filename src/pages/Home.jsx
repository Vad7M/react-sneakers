import Card from '../conponents/Card'
import React from 'react';
import AppContext from '../context';
function Home( {
  items,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddToFavorite,
  onAddToCart,
  isLoading,
}){
  const { isItemAdded } = React.useContext(AppContext);


  const renderItems = () => {
    const filtredItems = items.filter((item) => 
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    return (isLoading ? [...Array(10)] : filtredItems)
      .map( (item, index) =>( 
        <Card 
          key={index}
          onPlus={(obj) => onAddToCart(obj)}
          onFavorite={(obj) => onAddToFavorite(obj)}
          added={isItemAdded(item && item.id)}
          loading={isLoading}
          {...item}
          
        />
    ))   
  }

    return(
        <div className="content">
        <div className="content-header">
          <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}</h1>
          <div className="searchBlock">
            <img src="/img/search.svg" />
            <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..." />
            {searchValue && (
                <img 
                  onClick={() => setSearchValue('')} 
                  className="removeBtn" 
                  src="/img/btn-remove.svg" 
                  alt="Clear" 
                />)
            }
          </div>
        </div>
        <div className="card-main">
          {renderItems()}
        </div>
      </div>
    )
}

export default Home;