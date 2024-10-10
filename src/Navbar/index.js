import React from 'react';
import * as S from './style';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUserDetails, setLogin, setSuccess } from '../redux/actions/UserAction';

function Naver() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userDetails, login, success } = useSelector(state => state.user);

  const handleLogout = () => {
    // 로컬 스토리지에서 토큰 삭제
    localStorage.removeItem('token');
    
    dispatch(setUserDetails({}));
    dispatch(setLogin(false));
    dispatch(setSuccess(false));

    // 홈으로 이동
    navigate('/');
  };

  return (
    <S.Component>
      <div className='body'>
        <Link to={'/'} onClick={() => navigate('/')}>
          <div className='Home_button'>Hangjj-gamble</div>
        </Link>
        
        <div className='List'>
         <Link to={'/Sadiri'}> <div>사다리</div></Link>
          <div>그래프</div>
          <div>룰렛</div>
          {login && success ? (
            <div className='login'>
              <span>{userDetails.user_name}</span>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <Link to={'/login'}>
              <div className='login'>Login</div>
            </Link>
          )}
        </div>
      </div>
    </S.Component>
  );
}

export default Naver;

