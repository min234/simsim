import React from 'react'
import { Link } from 'react-router-dom';  

function MemoList({memos,handleCheckboxChange,deleteMemos}) {
  return (
    <><div className='bar'>
          <Link to='/memo/input'>
              <button className="w-btn w-btn-indigo" type="button">memo</button>
          </Link>
          <button onClick={deleteMemos} className="w-btn w-btn-pink" type="button">Delete</button>
      </div><div className='memo'>
              {memos.length > 0 ? (
                  memos.map((memo, index) => (
                      <div key={index} className='memo-item'>
                          <ul>
                              <Link to={`/memo/${memo.title}`}> <li>

                                  <div className='front'>
                                      <input
                                          type='checkbox'
                                          checked={!!memo.checked}
                                          onChange={() => handleCheckboxChange(index)} />
                                      <div className='m_title'>{memo.title}</div>
                                  </div>

                                  <div className='m_time'>{memo.created_at}</div>

                              </li>
                              </Link>
                          </ul>
                      </div>
                  ))
              ) : (
                  "No memos available"
              )}
          </div></>
  )
}

export default MemoList