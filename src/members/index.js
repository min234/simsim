import React from 'react';
import * as S from './style';
import { useDispatch, useSelector, } from 'react-redux';
import { setUserDetails, setLoading, setError, setSuccess } from '../redux/actions/UserAction';
import {  useNavigate } from 'react-router-dom';
function Members() {
    const dispatch = useDispatch();
    const { userDetails =[] } = useSelector(state => state.user) ;
    const navigate = useNavigate();
    const handleChange = (e) => {
      const { name, value } = e.target;
      
      dispatch(setUserDetails({ ...userDetails, [name]: value }));
    };


    const uploadUser = async () => {
    dispatch(setLoading(true));
    dispatch(setError(null));

    if (userDetails) {
        const user_data = {
            user_email: userDetails.email,
            user_password: userDetails.password,
            user_id: userDetails.id,
            user_name: userDetails.name
        };

        console.log('Sending data:', JSON.stringify(user_data));

        try {
            const response = await fetch('http://localhost:5000/api/member', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user_data),
            });

            const responseData = await response.json();
            console.log('Response data:', responseData);

            if (response.ok) {
                navigate('/login');
                dispatch(setSuccess(true));
                // Assuming `userDetails` is an object, not an array
                setUserDetails(responseData);
            } else {
                console.error('Failed to upload user:', responseData.message);
                alert(responseData.message);
            }
        } catch (err) {
            dispatch(setError(err.message));
        } finally {
            dispatch(setLoading(false));
        }
    } else {
        console.log('No user details provided');
    }
};

  return (
    <S.Component>
 <div className='members_body'>
 <div className='Member_input'>
 <input
  name="email"
  value={userDetails.email}
   type='text'
  placeholder="아이디"
  onChange={handleChange}
/>
<input
  name="password"
  type='password'
  value={userDetails.password}
  placeholder="비밀번호"
  onChange={handleChange}
/>
<input
  name="id"
  type='text'
  value={userDetails.id}
  placeholder="닉네임"
  onChange={handleChange}
/>
<input
  name="name"
  type='text'
  value={userDetails.name}
  placeholder="니 이름"
  onChange={handleChange}
/>
 <button onClick={uploadUser} className='login'>완료</button>
 
 </div>
 </div>
    </S.Component>
   
  )
}

export default Members