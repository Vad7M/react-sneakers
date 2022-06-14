import Info from "./Info";
import React from "react";
import axios from 'axios'
import { useCart } from "../hooks/useCart";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms)) 

function Drawer({onClose, items = [], onRemove }) {
  const { cartItems, setCartItems, totalPrice} = useCart();
  const [orderId, setOrderId] = React.useState(false);
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);

  const onClickOrder = async () => {
    try {
      const { data } = await axios.post('https://61eebe07d593d20017dbb107.mockapi.io/orders', {
        items: cartItems,
      });
      setOrderId( data.id );
      setIsOrderComplete(true);
      setCartItems([]);

      for(let i = 0; i < cartItems.length; i++){
        const item = cartItems[i];
        await axios.delete('https://61eebe07d593d20017dbb107.mockapi.io/card/' + item.id);
        delay(3000);
      }
    } catch (error) {
      console.error()
    }
  }

    return(
        <div className="overlay" >
        <div className="drawer">
          <h2>Kорзина <img onClick={onClose} className="removeBtn" src="/img/btn-remove.svg" alt="Remove" /></h2>

          {
            items.length > 0 ? (
              <div>
                <div className="items">
              {items.map((obj) => (
                <div key={obj.id} className="cartItem">
                <img 
                  className="cartImg" 
                  width={80} 
                  height={80} 
                  src={obj.imageUrl} 
                />
                <div className="cartBlock">
                  <p>{obj.title}</p>
                  <b>{obj.price} руб. </b>
                </div>
                <img onClick={() => onRemove(obj.id)} className="removeBtn" src="/img/btn-remove.svg" alt="Remove" />
              </div> 
              ))}  
              </div> 
               <ul className="cartTotalBlock">
               <li>
                 <span>Итого: </span>
                 <div></div>
                 <b>{ totalPrice } руб. </b>
               </li>
               <li>
                 <span>Налог 5%: </span>
                 <div></div>
                 <b>{ totalPrice / 100 * 5} руб. </b>
               </li>
               <button onClick={ onClickOrder } className="greenButton">
                  Оформить заказ
                  <img
                   src="/img/arrow.svg"
                  />
               </button>
             </ul>
              </div>
            ) : (
              <Info
                title={isOrderComplete ?
                    "Заказ оформлен!" :
                    'Корзина пустая'}
                image={isOrderComplete ? '/img/complete-order.svg' :'/img/empty.svg'}
                description={isOrderComplete ?
                    `Ваш заказ #${orderId} скоро будет передан курьерской доставке`: 
                    'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'}
              />
            )
          }
    
        </div>
      </div>
    );
}

export default Drawer;