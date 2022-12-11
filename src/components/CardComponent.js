import React from 'react'
import { pokerImage } from '../utils/pokerimage'
// import "../App.css"
import "../components/CardComponent.css"
const CardComponent = ({cards, handleChoice,flipped}) => {

const handleClick=()=> {
  handleChoice(cards)
}




  return (
        <div className='card'>
          <div className={flipped ? "flipped" : ""}>
            <img className='front' 
                  src={cards.src} 
                  alt='card-front'></img>
            <img className='back'
                 src={pokerImage} 
                 alt='card-back' 
                 onClick={handleClick}></img>
          </div>
   
    </div>
  )
}

export default CardComponent