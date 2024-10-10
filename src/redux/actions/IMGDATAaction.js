import { SET_IMGDATA, INC_PLAYERS, DEC_PLAYERS } from './types';

export const setIMGDATA = (imgdata) => ({
  type: SET_IMGDATA,
  payload: imgdata,
});
export const incrementPlayers = () => ({
  type: INC_PLAYERS,
});

// 플레이어 수 감소 액션 생성자
export const decrementPlayers = () => ({
  type: DEC_PLAYERS,
});
