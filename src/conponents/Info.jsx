import React from 'react';
import AppContext from '../context';

 const Info = ({ title, description, image }) => {
    const { setCartOpened } = React.useContext(AppContext);

  return (
     <div className="cartEmpty">
         <img src={image} />
         <h2>{ title }</h2>
         <p>{ description }</p>
         <button onClick={() => setCartOpened(false)} className="greenButton">
             <img src="/img/arrow.svg" />
             Вернуться назад
         </button>
     </div> 
  )
};

export default Info;