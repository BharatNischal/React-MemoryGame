import React from 'react';
import Card from './Card';

const CardList = (props)=> {
  const {cardList} = props;
  const cards = cardList.map((c,i)=>(
    <Card key={i} visible={c.visible} color={c.color} id={c.id} guessed={c.guessed} checkPair={props.checkPair}/>
  ));
  return(<div>
          {cards}
        </div>)
}

export default CardList;
