import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import SingleCard from './component/singleCard';

const imagecards=[
  {"src":"/immagini/img1.jpg", match:false},
  {"src":"/immagini/img2.jpg", match:false},
  {"src":"/immagini/img3.jpg", match:false},
  {"src":"/immagini/img4.jpg", match:false},
  {"src":"/immagini/img5.jpg", match:false},
  {"src":"/immagini/img6.jpg", match:false}
]

function App() {
const [cards, setCards] = useState([]);
const [turns, setTurns] = useState(0);
const [choiceOne, setChoiceOne] = useState(null);
const [choiceTwo, setChoiceTwo] = useState(null);
const [disabled, setDisabled] = useState(false)

  const shuffleCards=()=>{
    const shufflecards=[...imagecards, ...imagecards]
    .sort(()=> Math.random() - 0.5)
    .map(card=>({...card, id: Math.random() }))

    setCards(shufflecards)
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(0)
  }

  const HandleChoice= card=>{
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  useEffect(()=>{
    if(choiceOne && choiceTwo){
      setDisabled(true)
      if(choiceOne.src === choiceTwo.src){
        setCards(controlCards=>{
          return controlCards.map(card=>{
            if(card.src === choiceOne.src){
              return{...card, match : true};
            }else{
              return card;
            }
          })});
          resetTurn();
      }else{
        setTimeout(()=> resetTurn(), 1000);
      }
      
    }
  }, [choiceOne, choiceTwo]);

const resetTurn=()=>{
  setChoiceOne(null)
  setChoiceTwo(null)
  setDisabled(false)
  setTurns(turns => turns + 1)
}

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className='App'>
      <div className='text'>
        <h1>Memory Dell'Arca Di Noe</h1>
        <button onClick={shuffleCards} >Reset</button>
      </div>
      <div className='card-grid'>
        {cards.map(card=>(
          <SingleCard
          key={card.id}
          card={card}
          HandleChoice={HandleChoice}
          flipped={
            card === choiceOne ||
            card === choiceTwo ||
            card.match
          }
          disabled={disabled}
          />
        ))}
      </div>
      <h1 className='text'>Turno {turns}</h1>
    </div>
  );
}


export default App;
