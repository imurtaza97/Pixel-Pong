import React from 'react'
import { Swords } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to Pixel Ping</h1>
      <Link to="/game">
        <button className="button-56">Play Now</button>
      </Link>

      <span>
        <Swords />
      </span>
      <p>Challenge yourself with this exciting ping pong game! Try to keep the ball in the air for as long as possible by hitting it with the paddle. Score points and have fun!</p>
    </div>
  )
}
