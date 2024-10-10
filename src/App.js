import './App.css';
import React ,{useEffect}from 'react';
import Naver from './Navbar/index';
import Home from './Home/index';
import Memo from './Memo';
import Loading from './Loading';
import { Routes, Route } from 'react-router-dom';
import {  setUserDetails,setLoading,setError } from './redux/actions/UserAction';
import { useDispatch, useSelector } from 'react-redux';
import Login from './Login';
import Members from './members';
import Sadari from './Sadari/Index'


function App() {
  const dispatch = useDispatch();
  const { isLoading,login } = useSelector(state => state.user) ;
  useEffect(() => {
    // 로컬 스토리지에서 사용자 정보를 읽어와 Redux 상태 초기화
    const token = localStorage.getItem('token');
    if (token) {
      // 사용자 세부 정보 요청
      fetchUserDetails(token);
    }else {
      console.error('No token found in local storage');
      return;
    }
  }, []);  // 로그인 상태가 변경될 때 호출

  const fetchUserDetails = async () => {
   
    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const response = await fetch('http://localhost:5000/api/login', { 
        method: 'GET',
        headers: {
         'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to fetch protected data:', errorData.message || 'Unknown error');
        dispatch(setError(errorData.message || 'Failed to fetch data'));
        return;
      }

      const data = await response.json();
      dispatch(setUserDetails(data.user));
     
    } catch (err) {
      console.error('Error fetching protected data:', err);
      dispatch(setError(err.message || 'An error occurred'));
    } finally {
      dispatch(setLoading(false));
    }
  };
  
  return (
    <div className='header'>
      <Naver />
      
      <div className='body'>
        
        {isLoading  ?<Loading/>: null} 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/memo/*" element={<Memo />} />
          <Route path="/login" element={<Login/>}/>
          <Route path='/login/members' element={<Members/>}/>
          <Route path='/Sadiri/*' element={<Sadari/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
