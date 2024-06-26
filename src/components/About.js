import React from 'react';

function About() {
  return (
    <div className="about-container">
      <h1>About Pixel Pond</h1>
      <p>
        Welcome to our Pixel Pong Game! This game is a simple yet exciting way to challenge your reflexes and have some fun.
      </p>
      <div className="game-instructions">
        <h2>How to Play</h2>
        <ul>
          <li>Move your mouse or left right key to control the paddle.</li>
          <li>Hit the ball with the paddle to keep it in the air.</li>
          <li>Earn points for every successful hit.</li>
          <li>The game ends if the ball touches the bottom of the screen.</li>
        </ul>
      </div>
    </div>
  );
}

export default About;
