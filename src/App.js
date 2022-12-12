
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
  const [disable, setDisable] = useState(false)

// SHUFFLE CARDS

const shuffleCards = ()=> {

const shuffleCards= [...cardsImages, ...cardsImages]
.sort(()=> Math.random() - 0.5 )
.map((card)=> ({...card, id: Math.random()}))

setChoiceOne(null)
setChoiceTwo(null)

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
  console.log(choiceOne, "CH1")
  console.log(choiceTwo, "CH2")

  if(choiceOne && choiceTwo){
    setDisable(true)

    if(choiceOne.src === choiceTwo.src){
    setCards((prevCards)=> {
      return  prevCards.map((card)=> {
        if (card.src === choiceTwo.src){
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




// RESET CHOICES AND  INCREASE TURN 

const resetTurn=()=> {
  setChoiceOne(null)
  setChoiceTwo(null)
  setTurns(prevTurns =>  prevTurns + 1 ) // parameter (prevturns)this is just a prev state function!!! 
  setDisable(false)
}



 // START A NEW GAME
 // ============================= 


useEffect(() => {
 shuffleCards()
}, []);

// =============================RETURN 
  return (
    <div className='App'>
      <h2>Magic Match </h2>
      <button style={{ marginTop: "50px" }} onClick={shuffleCards}>
        New game
      </button>

      <div className='card-grid'>
        {cards.map((card) => (
          <div key={card.id}>
            <CardComponent
              key={card.id}
              cards={card}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disable={disable}
            />
          </div>
        ))}
      </div>
      <h1 style={{fontSize:"3rem", color: "white"}}>Turns:{turns} </h1>
    </div>
  )
}

export default App;
