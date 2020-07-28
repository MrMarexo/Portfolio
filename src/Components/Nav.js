import React from 'react';

import { NavLink } from 'react-router-dom';

const Nav = (props) => {
    return (
    <div className="tops">
        <nav>
            <div className="logo">
                <h2>byMarexo</h2>
            </div>
            <ul>
                <NavLink to="/convert" className="navlink">
                    <li>Convert Currency</li>
                </NavLink>
                <NavLink to="/chuck" className="navlink">
                    <li>Chuck Jokes</li>
                </NavLink>
                <NavLink to="/" exact className="navlink">
                    <li>About Me</li>
                </NavLink>
                
            </ul>
        </nav>
    </div>
    );
};

export default Nav;