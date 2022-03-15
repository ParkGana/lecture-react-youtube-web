import React from 'react';

import LeftMenu from './Sections/LeftMenu';
import RightMenu from './Sections/RightMenu';

import '../../css/Navbar.css';


function Navbar() {
    return (
        <nav className="navbar">
            <div className="logo">
                <a href="/">Video</a>
            </div>
            <div className="menu">
                <div className="menu-left">
                    <LeftMenu/>
                </div>
                <div className="menu-right">
                    <RightMenu/>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;