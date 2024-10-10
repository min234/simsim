import React from 'react'
import { AiFillCaretLeft,AiFillCaretRight} from "react-icons/ai";
import {  useNavigate } from 'react-router-dom';


function Start({playerCount,plus,miners,resetNumber}) {
  const navigate = useNavigate();
  const Start = () =>{
    if(playerCount >= 2){
      navigate('/Sadiri/Game')
    }
  }
  return (
    <><div className='Start'>
      <button onClick={miners} className='miners'><AiFillCaretLeft /></button>
      {playerCount}
      <button onClick={plus} className='plus'><AiFillCaretRight /></button>
      <button onClick={resetNumber} >reset</button>
    </div>
    <button onClick={Start} className='game'>Start</button>
    </>
  )
}

export default Start