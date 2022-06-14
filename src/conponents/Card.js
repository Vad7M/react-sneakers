import React from "react";
import ContentLoader from 'react-content-loader';
import AppContext from "../context";

function Card({
    title,
    price,
    imageUrl,
    id,
    onFavorite,
    onPlus,
    favorited = false,
    loading = false,
}) {
    const {isItemAdded} = React.useContext(AppContext);
    const [isFavorite, setIsFavorite] = React.useState(favorited);

    const onClickPlus = () => {
        onPlus({ id, parentId: id, title, price, imageUrl });
    }


    const onClickFavorite = () => {
        onFavorite({ id, title, price, imageUrl });
        setIsFavorite(!isFavorite);
    }

    return(
        <div className="card">
          {
              loading ? 
                <ContentLoader 
                  speed={2}
                  width={155}
                  height={260}
                  viewBox="0 0 155 280"
                  backgroundColor="#f3f3f3"
                  foregroundColor="#ecebeb"
                >
                  <rect x="131" y="115" rx="0" ry="0" width="14" height="3" /> 
                  <rect x="0" y="1" rx="15" ry="15" width="150" height="185" /> 
                  <rect x="113" y="133" rx="0" ry="0" width="2" height="1" /> 
                  <rect x="4" y="207" rx="0" ry="0" width="55" height="0" /> 
                  <rect x="0" y="192" rx="10" ry="10" width="150" height="15" /> 
                  <rect x="0" y="212" rx="10" ry="10" width="100" height="15" /> 
                  <rect x="0" y="255" rx="6" ry="6" width="70" height="25" /> 
                  <rect x="120" y="255" rx="6" ry="6" width="25" height="25" />
                </ContentLoader> : 
                <>
                    <div className="favorite">
                        <img 
                            onClick={onClickFavorite} 
                            src={isFavorite ? "/img/liked.svg" :"/img/unliked.svg" } 
                        />
                    </div>
                    <img width={133} height={112} src={imageUrl}/>
                     <p>{title}</p>
                    <div className="card-inner">
                    <div className="card-price">
                        <p>Цена:</p>
                        <b>{price} руб.</b>
                    </div>
                    <button  
                        onClick={onClickPlus}>
                    <img 
                        width={32} 
                        height={32} 
                        src={isItemAdded(id) ? '/img/cheked.svg' : '/img/btn-plus.svg'} /> 
                    </button>
                    </div>
                </>     
          }  
           
        </div>
    );
}

export default Card