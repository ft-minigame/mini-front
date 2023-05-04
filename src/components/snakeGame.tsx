import styled from 'styled-components';
import { useState, useEffect } from 'react';
import Background from './background';
import back from '../assets/images/character/back.png';
import front from '../assets/images/character/front.png';
import left from '../assets/images/character/left.png';
import right from '../assets/images/character/right.png';
import GFrame from '../assets/images/SnakeGame/Grid_Frame.png'
import itemImage from '../assets/images/SnakeGame/item.png';
import { SnakeGameType } from '../types/SnakeGameType';
import React from 'react';

const GAME_WIDTH = 680;
const GAME_HEIGHT = 440;
const CHARACTER_SIZE = 40;

const Game = () => {
  const [snake, setSnake] = useState<SnakeGameType[]>([{ x: 8, y: 5, image: back }]);
  const [direction, setDirection] = useState('back');
  const [gameOver, setGameOver] = useState(false);
  const [image, setImage] = useState(back);
  const [item, setItem] = useState({ x: 0, y: 0, visible: false });
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      moveSnake();
    }, 100);

    return () => clearInterval(intervalId);
  }, [snake]);

  const showScore = () => {
    const digits = score.toString().split("");
    const scoreImages = digits.map((digit, index) => {
      const leftPos = CHARACTER_SIZE * 7 + CHARACTER_SIZE * index;
      const opacity = (snake.some((block) => (block.x === index + 7 && block.y === 0) || (block.x === index + 8 && block.y === 0) || (block.x === index + 7 && block.y === 1) || (block.x === index + 8 && block.y === 1) ) ? 0.5 : 1); 
      return (
        <ScoreImg
          key={index}
          src={`${process.env.PUBLIC_URL}/Number/${digit}.png`}
          alt={`digit-${digit}`}
          style={{ left: leftPos, opacity: opacity }}
        />
      );
    });
    return <div style={{ position: "relative" }}>{scoreImages}</div>;
  };  

  const showItem = () => {
    const newItem = {
      x: Math.floor(Math.random() * (GAME_WIDTH / CHARACTER_SIZE)),
      y: Math.floor(Math.random() * (GAME_HEIGHT / CHARACTER_SIZE)),
      visible: true
    };
    setItem(newItem);
  };

  const moveSnake = () => {
    const head = { ...snake[0] };
    switch (direction) {
      case 'up':
        head.y -= 1;
        head.image = image;
        break;
      case 'down':
        head.y += 1;
        head.image = image;
        break;
      case 'left':
        head.x -= 1;
        head.image = image;
        break;
      case 'right':
        head.x += 1;
        head.image = image;
        break;
      default:
        break;
    }
  
    if (head.x < 0 || head.x * CHARACTER_SIZE >= GAME_WIDTH || head.y < 0 || head.y * CHARACTER_SIZE >= GAME_HEIGHT) {
      setGameOver(true);
      return;
    }
  
    const newSnake = [head, ...snake.slice(0, -1)];

    if (newSnake.length > 1 && newSnake.slice(1).some(block => block.x === head.x && block.y === head.y)) {
      setGameOver(true);
      return;
    }

    setSnake(newSnake);
  
    if (item.visible && item.x === head.x && item.y === head.y) {
      const newItem = {
        x: Math.floor(Math.random() * (GAME_WIDTH / CHARACTER_SIZE)),
        y: Math.floor(Math.random() * (GAME_HEIGHT / CHARACTER_SIZE)),
        visible: true
      };
      setItem(newItem);
      setSnake([...newSnake, snake[snake.length - 1]]);
      setScore(score + 1);
    }
  
    if (!item.visible) {
      showItem();
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!gameOver) {
      switch (event.key) {
        case 'ArrowUp':
          if (direction !== 'down') {
            setDirection('up');
            setImage(back);
          }
          break;
        case 'ArrowDown':
          if (direction !== 'up') {
            setDirection('down');
            setImage(front);
          }
          break;
        case 'ArrowLeft':
          if (direction !== 'right') {
            setDirection('left');
            setImage(left);
          }
          break;
        case 'ArrowRight':
          if (direction !== 'left') {
            setDirection('right');
            setImage(right);
          }
          break;
        default:
          break;
      }
    }
  };

  return (
    <Wrapper onKeyDown={handleKeyPress} tabIndex={0}>
      <Background />
      <GameFrame />
      <Canvas>
        {snake.map((block, index) => (
          <SnakeBlock src={block.image} key={index} style={{ left: block.x * CHARACTER_SIZE, top: block.y * CHARACTER_SIZE }} />
        ))}
        {item.visible && <SnakeBlock src={itemImage} style={{ left: item.x * CHARACTER_SIZE, top: item.y * CHARACTER_SIZE }} />}
        {showScore()}
      </Canvas>
      {gameOver && <GameOver>Game Over!</GameOver>}
    </Wrapper>
  );
};

export default Game;

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const GameFrame = styled.div`
  width: 700px;
  height: 460px;
  background: url(${GFrame});
  position: absolute;
`;

const Canvas = styled.div`
  width: ${GAME_WIDTH}px;
  height: ${GAME_HEIGHT}px;
  position: absolute;
`;

const SnakeBlock = styled.img`
  position: absolute;
  width: ${CHARACTER_SIZE}px;
  height: ${CHARACTER_SIZE}px;
`;

const GameOver = styled.div`
  position: absolute;
  font-size: 2rem;
  color: red;
  text-align: center;
`;

const ScoreImg = styled.img`
  position: absolute;
  width: ${CHARACTER_SIZE * 2}px;
  height: ${CHARACTER_SIZE * 2}px;
`;