import React from 'react';
import * as S from './style';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails, setLoading, setError, setSuccess, setLogin } from '../redux/actions/UserAction';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userDetails } = useSelector(state => state.user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    dispatch(setUserDetails({ ...userDetails, [name]: value }));
  };

  
  const login = async () => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    const user_data = {
      user_email: userDetails.email,
      user_password: userDetails.password,
    };

    try {
      

      // 사용자 로그인 API 요청 보내기
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user_data),
      });

      const data = await response.json();
      

      if (response.ok && data.success) {
        // 로그인 성공 처리
       
        localStorage.setItem('token', data.token);
       
        dispatch(setUserDetails(data.user));
        dispatch(setSuccess(true));
        dispatch(setLogin(true));
        console.log('Login successful');
        setTimeout(()=>{
          navigate('/'); 
        },1000)
    
        
      } else {
        // 로그인 실패 처리
        dispatch(setError(data.message || 'Login failed'));
        alert('이게 아냐');
      }
    } catch (err) {
      dispatch(setError(err.message || 'An error occurred'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <S.Component>
      <div className='Login_body'>
        <div className='Login_input'>
          <input
            name="email"
            value={userDetails.email}
            type='text'
            placeholder="아이디"
            onChange={handleChange}
          />
          <input
            name="password"
            value={userDetails.password}
            type='password'
            placeholder="비밀번호"
            onChange={handleChange}
          />
          <button onClick={login} className='login'>로그인</button>
          <div className='joins'>
            <Link to={'/login/members'}>
              <div className='join_members'>회원가입</div>
            </Link>
            <div className='lookig_for'>비밀번호 찾기</div>
          </div>
        </div>
      </div>
    </S.Component>
  );
}

export default Login;
