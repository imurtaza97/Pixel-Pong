import React from 'react';
import { Github,Instagram } from 'lucide-react';

export default function Footer() {
    return (
        <div className='footer'>
            <div className='social-icon'>
                <a href="https://github.com/imurtaza97">
                    <Github />
                </a>
                <a href="https://www.instagram.com/imurtaza97/">
                    <Instagram />
                </a>
            </div>
        </div>
    )
}
