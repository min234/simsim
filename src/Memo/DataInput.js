import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';  
import {  useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from "react-redux";
import { setLoading } from '../redux/actions/UserAction';

function DataInput({memos,title}) {
    const memo = memos.find(memo => memo.title === title);
    const [titles, setTitle] = useState(memo.title);
    const [content, setContent] = useState(memo.content);
    const [id,setId] = useState(memo.id)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading,login} = useSelector(state => state.user);
    

    const handleSubmit = async () => {
        dispatch(setLoading(true))
      
        const updateMemos = {
            title:titles,
            content:content,
            id:id
        }
       console.log(updateMemos)
        try {
            const response = await fetch(`http://localhost:5000/api/notes`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateMemos),
            });

            if (response.ok) {
                const updatedData = await response.json();
                console.log('Memo updated successfully:', updatedData);
                navigate('/memo');
                dispatch(setLoading(false))
                console.log(isLoading)
            } else {
                console.error('Failed to update memo');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    const handleUpdate = (e) => {
        e.preventDefault();
        if (typeof handleSubmit === 'function') {
            handleSubmit({ ...memo, title, content,id });
        } else {
            console.error('handleSubmit is not a function');
        }
    };

    
    if (!memo) {
        return <div>Memo not found</div>; // 해당 메모가 없을 때 처리
    }
  return (
    <>
     <div className='bar'>
                <Link to='/memo'>
                    <button className="w-btn w-btn-indigo" type="button">Back</button>
                </Link>
                <button className="w-btn w-btn-pink" onClick={handleUpdate} type="button">Update</button>
            </div>
          
                
                    <input 
                        className='text_title'
                       type='text'
                        value={titles} 
                        onChange={(e) => setTitle(e.target.value)} 
                    />
         
               
                    <textarea 
                    className='content'
                    placeholder='Content'
                        value={content} 
                        onChange={(e) => setContent(e.target.value)} 
                    />
              
        </>
  )
}

export default DataInput