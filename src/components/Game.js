import React, { useEffect, useState, useRef } from 'react';
import { Home,RotateCcw } from 'lucide-react';

const Game = ({ setShowNavbarAndFooter }) => {
  const [timer, setTimer] = useState(5);
  const [showStart, setShowStart] = useState(false);
  const [paddleX, setPaddleX] = useState(0);
  const [ballX, setBallX] = useState(0); // Initial ball X position (in pixels)
  const [ballXSpeed, setBallXSpeed] = useState(4);
  const [ballY, setBallY] = useState(0); // Initial ball Y position
  const [ballYSpeed, setBallYSpeed] = useState(4);
  const [points, setPoints] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  
  const ballXRef = useRef(ballX);
  const ballYRef = useRef(ballY);
  const ballXSpeedRef = useRef(ballXSpeed);
  const ballYSpeedRef = useRef(ballYSpeed);
  
  const startGame = () => {
    setShowStart(true);

    const timerId = setTimeout(() => {
      setShowStart(false);
    }, 500);

    return timerId;
  };

  useEffect(() => {
    const moveBall = () => {
      let newBallX = ballXRef.current + ballXSpeedRef.current;
      let newBallY = ballYRef.current + ballYSpeedRef.current;


      const paddleElement = document.querySelector('.paddle');
      if (paddleElement) {
        const paddleRect = paddleElement.getBoundingClientRect();
        const paddleLeft = paddleRect.left;
        const paddleRight = paddleRect.right;
        const paddleTop = paddleRect.top;
        const paddleBottom = paddleRect.bottom;
        const ballDiameter = 15;

        if (
          newBallY + ballDiameter >= paddleTop &&
          newBallY <= paddleBottom &&
          newBallX + ballDiameter >= paddleLeft &&
          newBallX <= paddleRight
        ) {
          ballYSpeedRef.current = -ballYSpeedRef.current;
          newBallY = ballYRef.current - ballYSpeedRef.current;
          setBallYSpeed(newBallY);
          setPoints((prevPoints) => prevPoints + 1);
        }

      }

      const gameElement = document.querySelector('.game');
      if (gameElement) {
        const gameRect = gameElement.getBoundingClientRect();
        const gameBottom = gameRect.height;
        const gameRight = gameRect.width;
        const ballDiameter = 15;

        if (newBallX <= 0 || newBallX + ballDiameter >= gameRight) {
          ballXSpeedRef.current = -ballXSpeedRef.current;
          newBallX =  ballXRef.current - ballXSpeedRef.current;
          setBallXSpeed(newBallX);
        }

        if (newBallY <= 0) {
          ballYSpeedRef.current = -ballYSpeedRef.current;
          newBallY = ballYRef.current - ballYSpeedRef.current;
          setBallYSpeed(newBallY);
        }
        if (newBallY + ballDiameter >= gameBottom) {
          setGameOver(true);
          return;
        }
      }

      ballXRef.current = newBallX;
      ballYRef.current = newBallY;

      setBallX(newBallX);
      setBallY(newBallY);

      requestAnimationFrame(moveBall);
    };

    if (showStart && timer === 0) {
      moveBall(); // Start moving the ball when the game starts
    }

    return () => cancelAnimationFrame(moveBall);
  }, [showStart, timer]);

  useEffect(() => {
    setShowNavbarAndFooter(false);

    return () => {
      setShowNavbarAndFooter(true);
    };
  }, [setShowNavbarAndFooter]);

  useEffect(() => {
    if (timer > 0) {
      const countTime = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(countTime);
    } else {
      setShowStart(true);

      const setShowStartTimer = setTimeout(() => {
        setShowStart(false);
        startGame(); // Call startGame when the countdown finishes
      }, 500);

      return () => clearTimeout(setShowStartTimer);
    }
  }, [timer]);

  const handleMouseMove = (event) => {
    const gameArea = document.querySelector('.game');
    const gameAreaRect = gameArea.getBoundingClientRect();
    const mouseX = event.clientX - gameAreaRect.left;

    const paddleWidth = 250; // Assume the paddle width is 250px
    const maxPaddleX = gameAreaRect.width - paddleWidth;

    const newPaddleX = Math.max(0, Math.min(mouseX, maxPaddleX));

    setPaddleX(newPaddleX);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      const gameArea = document.querySelector('.game');
      const gameAreaRect = gameArea.getBoundingClientRect();
      const maxPaddleX = gameAreaRect.width - 250;
  
      if (event.key === 'ArrowLeft') {
        if (paddleX > 0) {
          setPaddleX((prevPaddleX) => Math.max(0, prevPaddleX - 30));
        }
      } else if (event.key === 'ArrowRight') {
        if (paddleX < maxPaddleX) {
          setPaddleX((prevPaddleX) => Math.min(maxPaddleX, prevPaddleX + 30));
        }
      }
    };
  
    document.addEventListener('keydown', handleKeyDown);
  
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [paddleX]);
  
  return (
    <div className="game" onMouseMove={handleMouseMove}>
      <div className="score-board">
        <h2><strong>Points:</strong>{points}</h2>
      </div>

      <div id="timer" className={`${!showStart && timer === 0 ? 'timer-hidden' : 'timer'}`}>
        {showStart ? <p>Go!</p> : <p>{timer}</p>}
      </div>

      <div className={`${!gameOver ? 'not-over' : 'game-over'}`}>
        <h2>Game Over</h2>
        <span>
          <a href="/">
            <Home />
          </a>
          <a href="/game">
          <RotateCcw />
          </a>
        </span>
      </div>

      <div className="paddle" style={{ left: `${paddleX}px` }}></div>

      <div className="ball" style={{ left: `${ballX}px`, top: `${ballY}px` }}></div>
    </div>
  );
};

export default Game;
