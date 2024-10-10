// Index.js
import React from 'react';
import Start from './Start'; 
import * as S from './style'; 
import { useSelector, useDispatch } from "react-redux";
import { setNumber} from '../redux/actions/NumberAction';
import { Routes, Route} from 'react-router-dom';
import { incrementPlayers, decrementPlayers } from '../redux/actions/IMGDATAaction';
import Game from './Game';

function Index() {
  const { playerCount } = useSelector((state) => state.data); 
  const dispatch = useDispatch();


  const plus = () => {
    if (playerCount < 5) {
      dispatch(incrementPlayers());
    } else {
      alert('숫자가 최대값에 도달했습니다.');
    }
  };

  const min = () => {
    if (playerCount > 2) {
      dispatch(decrementPlayers());
    } else {
      alert('숫자가 최소값에 도달했습니다.');
    }
  };

  const resetCounter = () => {
    dispatch(setNumber(0));
  };

  return (
    <S.components>
      <div className='body'>
        <Routes>
          <Route path='/' element={ 
          <Start 
          playerCount={playerCount} 
          plus={plus} 
          miners={min} 
          resetNumber={resetCounter} 
        />}/>
        <Route path='/Game' element={
          <Game players={playerCount} />
        }/>
        </Routes>
       
      </div>
    </S.components>
  );
}

export default Index;
