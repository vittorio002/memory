import "./singleCard.css";

function sCard({ card, HandleChoice, flipped, disabled }) {
   const handleClick = () => {
    !disabled && HandleChoice(card)
   }

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src}/>
        <img onClick={handleClick} className="back" src="/immagini/retro.png"/>
      </div>
    </div>
  );
}

export default sCard;
