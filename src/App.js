
import React from 'react';
import {useState} from "react"
import {cardsImages} from "./utils/cardsImages"
import CardComponent from './components/CardComponent';
import './App.css';



function App() {

  //========================= add states

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null )

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
  console.log(card );
}

// =============================
  return (
    <div className="App">
     <h2>Magic Match </h2>
     <button onClick={shuffleCards}>New game</button>
     
    <div className='card-grid'>
      {cards.map(card => (
       <div key={card.id}>
        <CardComponent key={card.id} cards={card} handleChoice={handleChoice}/>
      </div>
      ))}
    </div>
    </div>
  );
}

export default App;
