import React from 'react'
import Home_slider from '../Home_slider/index'
import {  Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import * as S from './style'

function Home() {
  const memos = useSelector(state => state.memo.memo) || [];
  console.log(memos)
  return (
    <S.components>
    <div className='body'>
      <div className='background'>
        <div className='title'>best 5 Memo</div>
      <Link to="/memo"><div>{memos.slice(0,5).map((memo,index)=>(
        <div className='memo' key={index}>
          <div className='line'/>
          <div className='flex'>
            <div >제목:{memo.title}</div>
            <div>내용:{memo.content}</div>
          </div>
          </div>
      ))}</div></Link>
      </div>
         <Home_slider/>
         
    </div>
    </S.components>
  )
}

export default Home