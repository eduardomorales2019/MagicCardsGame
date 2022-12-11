
import React from 'react';
import {useState, useEffect } from "react"
import {cardsImages} from "./utils/cardsImages"
import CardComponent from './components/CardComponent';
import './App.css';





function App() {

  //========================= add states==============================

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)

// SHUFFLE CARDS

const shuffleCards = ()=> {

const shuffleCards= [...cardsImages, ...cardsImages]
.sort(()=> Math.random() - 0.5 )
.map((card)=> ({...card, id: Math.random()}))
setCards(shuffleCards)
setTurns(0)
}


// HANDLE CHOICE WITH AN EVENT IN THE COMPONENT 

const handleChoice= (card)=> {
  choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
}


// COMPARE 2 CARDS =========================================

// useeffect it will fire  when the component first mount automatically  and then will  find the function  again whenever dependency changes 
// so if we want  to compare choice1 and choice 2 we must just do it , in the  function of useEffect

// we must need the prevCard so  we can make an new array and then we an change the new state of the match property to true 

useEffect(() => {

  if(choiceOne && choiceTwo){

    if(choiceOne.src === choiceTwo.src){
    setCards((prevCards)=> {
      return  prevCards.map((card)=> {
        if (card.src === choiceOne.src){
          return {...card, matched: true }
        }else {
          return card
        }
      })
    })
      resetTurn()
    } else {
      resetTurn()
    }
  }
}, [choiceOne, choiceTwo]);

// console.log(cards);
console.log(choiceOne, "CH1");
console.log(choiceTwo, "CH2");


// RESET CHOICES AND  INCREASE TURN 

const resetTurn=()=> {
  setChoiceOne(null)
  setChoiceTwo(null)
  setTurns(prevTurns =>  prevTurns + 1 ) // parameter (prevturns)this is just a prev state function!!! 
}
// =============================RETURN 
  return (


    <div className="App">
     <h2>Magic Match </h2>
     <button onClick={shuffleCards}>New game</button>
     
    <div className='card-grid'>
      {cards.map(card => (
        <div key={card.id}>
        <CardComponent 
          key={card.id} 
          cards={card}
          handleChoice={handleChoice}
          flipped={card === choiceOne || card === choiceTwo || card.matched}
          />
      </div>
      ))}
    </div>
    </div>

  );
}

export default App;
