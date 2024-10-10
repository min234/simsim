import React, { useState } from 'react';
import Slider from '../Slider';
import { images } from '../imageFile/Home';

function Home() {
  const [imageList] = useState(images);

  const infinit = [...imageList, imageList[0]]; 

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Slider image={infinit} images={images} />
    </div>
  );
}

export default Home;
