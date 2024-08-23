import React from 'react';
import './style.css'
import img from './free-icon-panda-6486150.png'

const Header = () => {
    return (
        <div className='header'>


            <h1><a className='author' href="#!">Mr.Domnichev</a></h1>

            <ul className='nav'>
                <li ><a className='link' href="!#">Accounting</a></li>
                <li ><a className='link' href="!#">Health</a></li>
                <li ><a className='link' href="!#">Savings</a></li>
                <li ><a className='link' href="!#">Growth Zone</a></li>
                <li ><a className='link' href="!#">Monthly Plan</a></li>
                <li ><a className='link' href="!#">Tasks</a></li>
            </ul>


            <img src={img} alt="panda" className='panda'/>


        </div>
    );
};

export default Header;