import React, { useState, useRef, useEffect } from 'react';

const Canvas = ({ data, imgRefs }) => {
  const canvasRef = useRef(null);
  const [width, setWidth] = useState(window.innerWidth - 100);
  const [animatedPaths, setAnimatedPaths] = useState([]);
  const [startYValues, setStartValues] = useState([]);
  const [imgPositions, setImgPositions] = useState([]);
  const [horizon,setHorizon] = useState([]);
  const animationFrameId = useRef(null);

  useEffect(() => {
    const updateCanvasSize = () => {
      setWidth(window.innerWidth - 100);
    };

    window.addEventListener('resize', updateCanvasSize);
    updateCanvasSize();
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
  
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
  
    const ladderHeight = 600;
    const ladderY = 50;
  
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    const newImgPositions = [];
    data.forEach((playerData, index) => {
      const img = imgRefs.current[index];
      if (img) {
        const rect = img.getBoundingClientRect();
        const canvasRect = canvas.getBoundingClientRect();
        const imgX = rect.left - canvasRect.left + img.width / 2;
        newImgPositions.push(imgX);
  
        // Draw vertical line
        ctx.beginPath();
        ctx.moveTo(imgX, 0);
        ctx.lineTo(imgX, ladderHeight);
        ctx.stroke();
      }
    });
  
    setImgPositions(newImgPositions);
  
    const minHorizontalLines = data.length - 1;
    const horizontalLineCount = minHorizontalLines + Math.ceil(Math.random() * 5);
    
    const horizontalLines = []; // 수평선 정보 저장
  
    const newAnimatedPaths = [];
    const newStartYValues = [];
    
    for (let i = 0; i < horizontalLineCount; i++) {
      const x1 = newImgPositions[i % newImgPositions.length];
      const x2 = newImgPositions[(i + 1) % newImgPositions.length];
      let startY = ladderY + Math.random() * ladderHeight;
  
      // Draw horizontal line
      ctx.beginPath();
      ctx.moveTo(x1, startY);
      ctx.lineTo(x2, startY);
      ctx.stroke();
  
      // 수평선 정보를 객체 형태로 저장
      horizontalLines.push({
        startX: Math.round(x1),
        endX: Math.round(x2),
        y: Math.round(startY)
      });
  
      newStartYValues.push(startY);
  
      if (newAnimatedPaths.length < data.length) {
        newAnimatedPaths.push({
          currentX: Math.round(x1),
          targetX: Math.round(x2),
          y: Math.round(startY),
          currentY: 0,
          stepSize: 5,
          horizontalStepSize: 5,
          endY: ladderHeight,
          completed: false,
          initialX: Math.round(x1),
          direction: 'down',
        });
      }
    }
  
    // 수평선 정보를 상태로 저장
    setHorizon(horizontalLines);
    setStartValues(newStartYValues);
    setAnimatedPaths(newAnimatedPaths);
  }, [width, data, imgRefs.current]);
  
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const colors = ['red', 'blue', 'green', 'orange', 'pink'];

    const animate = () => {
      let allPathsCompleted = true;
    
      setAnimatedPaths((prevPaths) =>
        prevPaths.map((path, index) => {
          if (path.completed) return path;
      
          let updatedPath = { ...path };
          const { currentX, currentY, direction, stepSize, horizontalStepSize, targetX, endY, initialX } = updatedPath;
      
          const nextY = startYValues.filter(yVal => yVal > currentY).sort((a, b) => a - b)[0] || endY;
      
          ctx.strokeStyle = colors[index % colors.length];
          ctx.lineWidth = 3;
      
          const horizontalLineAtCurrentY = horizon.find(line => Math.abs(line.y - updatedPath.currentY) < stepSize);
      
          if (direction === 'down') {
            ctx.beginPath();
            ctx.moveTo(currentX, currentY);
      
            updatedPath.currentY = Math.min(currentY + stepSize, nextY);
            ctx.lineTo(currentX, updatedPath.currentY);
            ctx.stroke();
      
            if (horizontalLineAtCurrentY && currentX >= horizontalLineAtCurrentY.startX && currentX <= horizontalLineAtCurrentY.endX) {
              updatedPath.direction = 'horizontal'; 
            }
          } else if (direction === 'horizontal') {
            ctx.beginPath();
            ctx.moveTo(currentX, updatedPath.currentY);
      
            const nextX = currentX < targetX
              ? Math.min(currentX + horizontalStepSize, targetX)
              : Math.max(currentX - horizontalStepSize, targetX);
      
            updatedPath.currentX = nextX;
            ctx.lineTo(nextX, updatedPath.currentY);
            ctx.stroke();
      
            if (horizontalLineAtCurrentY && updatedPath.currentX === horizontalLineAtCurrentY.endX) {
              updatedPath.direction = 'down';
              updatedPath.currentX = initialX; // 초기 X로 복귀
            }
          }
      
          if (updatedPath.currentY < endY) {
            allPathsCompleted = false;
          } else {
            updatedPath.completed = true;
          }
      
          return updatedPath; 
        })
      );
      
      if (!allPathsCompleted) {
        animationFrameId.current = requestAnimationFrame(animate);
      } else {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
    
    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId.current);
    };
  }, [animatedPaths, imgPositions, startYValues]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={600}
    />
  );
};

export default Canvas;
