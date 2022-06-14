import Header from './conponents/Header'
import Drawer from './conponents/Drawer'
import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import axios from 'axios'
import AppContext from './context'
import Favorites from './pages/Favorites'
import Home from './pages/Home'
import Orders from './pages/Orders'

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);


  React.useEffect(() => {
    async function fethData() {
      setIsLoading(true);

      const cartResponse = await axios.get('https://61eebe07d593d20017dbb107.mockapi.io/card');
      const favoritesResponse = await axios.get('https://61eebe07d593d20017dbb107.mockapi.io/favorites');
      const itemsResponse = await axios.get('https://61eebe07d593d20017dbb107.mockapi.io/items');

      setIsLoading(false);

      setCartItems(cartResponse.data);
      setFavorites(favoritesResponse.data);
      setItems(itemsResponse.data);
      
    }
    fethData()
  }, [])

  const onAddToCart = (obj) => {
   try{
    if (cartItems.find((item) => Number(item.id)  == Number(obj.id) )){
      axios.delete(`https://61eebe07d593d20017dbb107.mockapi.io/card/${obj.id}`);
      setCartItems((prev) => prev.filter((item) => Number(item.id) != Number(obj.id)));
    } else {
      axios.post('https://61eebe07d593d20017dbb107.mockapi.io/card', obj);
      setCartItems((prev) => [...prev, obj]);
    }
   } catch (error) {
     console.error();
   }
   
    
  }

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => favObj.id  === obj.id )){
        axios.delete(`https://61eebe07d593d20017dbb107.mockapi.io/favorites/${obj.id}`);
        setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
      } else {
        const { data } = await axios.post('https://61eebe07d593d20017dbb107.mockapi.io/favorites', obj)
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("Не удалось добавить!");
    }
  }

  const onRemoveCart = (id) => {
    axios.delete(`https://61eebe07d593d20017dbb107.mockapi.io/card/${id}`)
    setCartItems((prev) => prev.filter((item) => item.id != id));
  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  }

  const isItemAdded = (id) => {
      return cartItems.some((obj) => Number(obj.id) === Number(id))
  }

  return (
   <AppContext.Provider value={{ 
      items,
      cartItems, 
      favorites, 
      isItemAdded, 
      onAddToFavorite,
      setCartOpened,
      setCartItems,
   
   }}>
      <div className="wrapper">
      {cartOpened ?
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveCart}
        /> : null
      }
      <Header onClickCart={() => setCartOpened(true)} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              items={items}
              cartItems={cartItems}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAddToCart={onAddToCart}
              onAddToFavorite={onAddToFavorite}
              isLoading={isLoading}
            />}
          exact />

        <Route
          path="/favorites"
          element={<Favorites/>}
          exact />

          <Route 
            path="/orders"
            element={<Orders />}
          />
      </Routes>
    </div>
   </AppContext.Provider>
  );
}

export default App
