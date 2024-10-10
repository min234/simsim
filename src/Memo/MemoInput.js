import React from 'react'
import { Link } from 'react-router-dom';  

function MemoInput({ uploadMemo, inputValue, textValue, handleInputChange, handleTextChange }) {
  return (
    <>
    <div className='bar'>
        <Link to='/memo'>
            <button className="w-btn w-btn-indigo" type="button">back</button>
        </Link>
        <button onClick={uploadMemo} className="w-btn w-btn-pink" type="button">upload</button>
    </div>
    <div className='title'>
        <input
            className='text_title'
            type='text'
            placeholder='Title'
            value={inputValue}
            onChange={handleInputChange}
        />
        <textarea
            className='content'
            placeholder='Content'
            value={textValue}
            onChange={handleTextChange}
        />
        <div className='upload' onClick={uploadMemo}>Upload</div>
    </div>
</>
  )
}

export default MemoInput