import React from 'react';
import './Nav.css';

const Nav = (props)=>{
  return (<nav className='nav'>
            <div className="heading">Memory Game</div>
            <div className='new-game' onClick={props.reset}>New Game</div>
         </nav>);
}

export default Nav;
