import React, { useState, useEffect } from 'react';
import './Slider.css';

function Slider({ image }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const slideCount = image.length;

  const nextButton = () => {
    if (currentIndex === slideCount - 1) {
      setIsTransitioning(false);
      setCurrentIndex(0);
    } else {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(nextButton, 2000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  useEffect(() => {
    if (!isTransitioning) {
      setTimeout(() => {
        setIsTransitioning(true);
      }, 0);
    }
  }, [isTransitioning]);


  return (
    <div className="slider-container">
      <div
        className="slider-wrapper"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none',
        }}
      >
        {image.map((img, index) => (
          <div key={index} className="slide">
            <img src={img} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Slider;
