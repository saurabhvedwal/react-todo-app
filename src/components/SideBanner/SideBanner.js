import React from 'react';
import logo from './../../logo.svg';
import './SideBanner.css';

const SideBanner = (props) => {
    return (
        <div className={props.classes}>
            <img src={logo} className="App-logo" alt="logo" />
                React Todo App
        </div>
    );
};

export default SideBanner;