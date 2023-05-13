import styled from 'styled-components';
import React from 'react';
import { SnakeGameType } from '../../types/SnakeGameType';
import { ShowScoreProps } from '../../types/ShowScoreProps'

const CHARACTER_SIZE = 40;

const ShowScore = ({ snake, score, ...restProps }: ShowScoreProps) => {

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
    return <div style={{ position: "relative" }} {...restProps} >{scoreImages} </div>;
  };  

export default ShowScore;

const ScoreImg = styled.img`
  position: absolute;
  width: ${CHARACTER_SIZE * 2}px;
  height: ${CHARACTER_SIZE * 2}px;
`;