import React, { useState, useRef } from 'react';
import { useSelector } from "react-redux";
import Canvas from './Canvas';

function Game() {
  const imgRefs = useRef([]);
  const { data } = useSelector((state) => state.data);
  const [texts, setTexts] = useState(data.map(() => ''));  // 각 input의 상태를 개별적으로 관리

  const handleInputChange = (index, value) => {
    const newTexts = [...texts];
    newTexts[index] = value;
    setTexts(newTexts);
  };

  return (
    <div className='parent_body'>
      <div className='data_container'>
        <div className='contetnt_1'>
          {data.map((imgs, index) => (
            <div className='item' key={index}>
              <img
                src={imgs.src}
                alt={imgs.alt}
                ref={el => imgRefs.current[index] = el}
                className='image'
              />
            </div>
          ))}
        </div>

        <div className='contetnt'>
          <Canvas data={data} imgRefs={imgRefs} />
        </div>

        <div className='contetnt_1'>
          {data.map((imgs, index) => (
            <div className='item' key={index}>
              <input
                type='text'
                value={texts[index]} 
                onChange={(e) => handleInputChange(index, e.target.value)}
                className='input'
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Game;
