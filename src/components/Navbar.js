import React from 'react';
import { useEffect } from "react";
import { Link,useLocation } from 'react-router-dom';

export default function Navbar() {
    const location = useLocation();

    useEffect(() => {
      document.title = `Pixel Pong - ${getPageTitle(location.pathname)}`;
    }, [location]);

    const getPageTitle = (path) => {
        switch (path) {
          case '/':
            return 'Home';
          case '/about':
            return 'About Us';
          default:
            return 'Game';
        }
      };
    
    return (
        <div className='navbar'>
            <div>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About Us</Link></li>
                    <li><a href="mailto:imurtaza97@gmail.com">Contact Us</a></li>
                </ul>
            </div>
        </div>
    )
}
