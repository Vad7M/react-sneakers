
import Card from "../conponents/Card";
import React from 'react';
import axios from "axios";



function Orders() {
    const [orders, setOrders ] = React.useState([]);

    React.useEffect (() => {
        (async() => {
            const { data } =  axios.get('https://61eebe07d593d20017dbb107.mockapi.io/orders');
            console.log( data );
        })();
    }, [] ); 


    return(
        <div className="content">
        <div className="content-header">
          <h1>Мои заказы</h1>
        </div>
        <div className="card-main">
        { []
            .map( (item, index) =>( 
              <Card 
                key={index}
                {...item}
              />
        ))}
        </div>
      </div>
    )
}

export default Orders;