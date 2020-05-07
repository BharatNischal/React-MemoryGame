import React, {Component} from 'react';
import CardList from './CardList';
import './CardApp.css';
import Nav from './Nav';

function randomColrs(){
  var cardList =[];
  var colors = ['red','green','yellow','blue','orange','black','purple','pink','red','green','yellow','blue','orange','black','purple','pink'];
  for(let i=0;i<16;i++){
      cardList.push({
       id:i,
       visible:false,
       guessed:false,
       color:colors.splice(Math.floor(Math.random()*colors.length),1)[0]
     });
  }
  return cardList;
}

class CardApp extends Component{
  constructor(props){
    super(props);
    const cardList = randomColrs();

   this.state = {
      cardList,
      pairSolved:0,
      prevColor:null,
      prevId:null,
      secondSelection:false
    }
    this.checkPair = this.checkPair.bind(this);
    this.reset = this.reset.bind(this);
  }

  reset(){
    this.setState({cardList:randomColrs(),prevColor:null,prevId:null,secondSelection:false,pairSolved:0});
  }

  checkPair(id){
    if(this.state.secondSelection === false){

      const prevColor = this.state.cardList[id].color;
      const prevId = id;
      const secondSelection = true;
      const cardList = this.state.cardList.map((c,i)=>{
        if(i===id){
          return {...c,visible:true};
        }else{
          return c;
        }
      });
      this.setState({cardList,prevColor,prevId,secondSelection});

    }else{
      // For reveiling color
        const newCardList = this.state.cardList.map((c,i)=>{
          if(i===id){
            return {...c,visible:true};
          }else{
            return c;
          }
        });
        this.setState({cardList:newCardList,prevColor,prevId,secondSelection});

      const secondSelection = false;
      var cardList = [];
      var temp = false;
      if((this.state.prevColor === this.state.cardList[id].color)&&(id!==this.state.prevId)){
        console.log('if is called');
        cardList = this.state.cardList.map((c,i)=>{
          if(i===id||i===this.state.prevId){
            return {...c,visible:true,guessed:true};
          }
          else{
            return c;
          }
        });
        temp = true;
      }else{
         cardList = this.state.cardList.map((c,i)=>{
          if(i===this.state.prevId){
            return {...c,visible:false};
          }
          else{
            return c;
          }
        });
      }
      const prevColor = null;
      const prevId = null;
      setTimeout(()=>{
        this.setState((prevState,props)=>{
          const pairSolved = temp?prevState.pairSolved+1:prevState.pairSolved;
          return {secondSelection,prevColor,prevId,cardList,pairSolved};
        });
      },500)
    }
  }
  render(){
    return (<div>
              <Nav reset={this.reset}/>
              <CardList {...this.state} checkPair={this.checkPair}/>
              {this.state.pairSolved===8?<h1 className='complete'>COMPLETED</h1>:null}
            </div>);
  }
}

export default CardApp;
