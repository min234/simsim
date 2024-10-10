import React from 'react'
import * as S from './style'
import Spinner from '../image/spinner.gif'

function Loading() {
  return (
    <S.Background>
    <S.LoadingText>잠시만 기다려 주세요.</S.LoadingText>
    <img src={Spinner} alt='로딩중' width="5%"/>
    </S.Background>
  )
}

export default Loading