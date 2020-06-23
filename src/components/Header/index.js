import React from 'react';
import { Link } from 'react-router-dom';

import logout from 'api/logout';

import './Header.css';

function Header({ isLoggedIn, setIsLoggedIn }) {
    return (
        <header className='Header'>
            <Link to=''>
                <img src='https://app.eventos42.ru/images/default/logo--white.svg' alt='Логотип'/>
            </Link>
            {
                isLoggedIn &&
                <button className="Header__logout" onClick= {
                    () => {
                        logout()
                            .then(() => { setIsLoggedIn(false); });
                    }
                }>
                    <svg className="Header__logout-icon" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation" fill="white">
                        <path d="M21 3.01H3c-1.1 0-2 .9-2 2V9h2V4.99h18v14.03H3V15H1v4.01c0 1.1.9 1.98 2 1.98h18c1.1 0 2-.88 2-1.98v-14c0-1.11-.9-2-2-2zM11 16l4-4-4-4v3H1v2h10v3z">
                        </path>
                    </svg>
                </button>
            }

        </header>
    );
}

export default Header;
