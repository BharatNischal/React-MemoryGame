import React from 'react';
import './Card.css';

const Card = (props)=>{
  return (<div className='card'
   style={props.visible ? {backgroundColor: props.color}:{backgroundColor: 'grey'}}
   onClick={props.guessed?()=>{console.log('AlreadyGuessed')}:()=>{props.checkPair(props.id)}
  }></div>);
}

export default Card;
