import React, { useState ,useEffect,} from 'react';
import {  useNavigate , useLocation} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { setMemo } from "../redux/actions/memoAction"; // 액션 생성자
import { Routes, Route} from 'react-router-dom';
import MemoList from './MemoList';
import MemoInput from './MemoInput';
import * as S from './style';
import DataInput from './DataInput';
import { setLoading } from '../redux/actions/UserAction';

function Memo() {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState("");
    const [textValue, setTextValue] = useState("");
    const { isLoading,login} = useSelector(state => state.user);
    const dispatch = useDispatch();
    const memos = useSelector(state => state.memo.memo) || [];
    const location = useLocation();

    console.log(isLoading)
    // 메모 상태 업데이트 함수
    const updateMemos = (newMemos) => {
        dispatch(setMemo(newMemos));
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);  
    };

    const handleTextChange = (e) => {
        setTextValue(e.target.value);  
    };

    const handleCheckboxChange = (index) => {
        const updatedMemos = memos.map((memo, i) =>
            i === index ? { ...memo, checked: !memo.checked } : memo
        );
        updateMemos(updatedMemos);
       
    };
   
    const uploadMemo = async () => {
        if(login === true){
        if (inputValue && textValue) {
            const memoTime = new Date().toLocaleString();
            const newMemo = { title: inputValue, content: textValue, name: textValue, created_at: memoTime };
           
            console.log('Sending data:', JSON.stringify(newMemo));
            try {
                const response = await fetch('http://localhost:5000/api/notes', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newMemo),
                });
    
                const responseData = await response.json();
                console.log('Response data:', responseData);
    
                if (response.ok) {
                    setInputValue('');
                    setTextValue('');
                    navigate('/memo');
                    
                    updateMemos([...memos, responseData]);
                } else {
                    console.error('Failed to upload memo:', responseData.message);
                    alert(responseData.message);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            console.log('err');
        }}else{
            alert('로그인 하십시오')
            navigate('/login')
        }
    
    };
    
    const deleteMemos = async () => {
        if(login === true){
        const idsToDelete = memos.filter(memo => memo.checked).map(memo => memo.id);

        for (const id of idsToDelete) {
            try {
                const response = await fetch(`http://localhost:5000/api/notes/${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    console.log(`Deleted memo with id ${id}`);
                } else {
                    console.error(`Failed to delete memo with id ${id}`);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
        updateMemos(memos.filter(memo => !memo.checked));
    }else{
        alert('로그인 하십시오')
        navigate('/login')
    }

       
    };
    
    useEffect(() => {
        dispatch(setLoading(true));
        
        const fetchMemos = async () => {
          try {
            const response = await fetch('http://localhost:5000/api/notes');
            const data = await response.json();
            dispatch(setMemo(data));
            
            console.log(isLoading)
          } catch (error) {
            console.error('Error fetching memos:', error);
          }finally{
            dispatch(setLoading(false));
          }
        };
    
        fetchMemos();
      }, [dispatch,location.pathname]);
      
      
    return (
        <S.Components>
            <div className='background'>
                <Routes>
                    <Route path='/' element={<MemoList memos={memos} deleteMemos={deleteMemos} handleCheckboxChange={handleCheckboxChange} 
                 
                    />}/>
                 <Route path='/input' element={<MemoInput
                 uploadMemo={uploadMemo}
                 inputValue={inputValue}
                 textValue={textValue}
                 handleInputChange={handleInputChange}
                 handleTextChange={handleTextChange}
                 />}/>
                   {memos.map((memo, index) => (
                        <Route 
                            key={index} 
                            path={`/${memo.title}`} 
                            element={<DataInput memos={memos}  title={memo.title}/>} 
                        />
                    ))}
                </Routes>
               
                </div>
        </S.Components>
    );
}

export default Memo;
