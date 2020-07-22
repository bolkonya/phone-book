import React, { Component } from 'react';

import logoImage from '../../assets/svg/book.svg';

import './index.styl';


export default class Header extends Component {
  render() {
    return (
      <header className='header'>
        <img className='header__icon' src={logoImage} alt='Simple Phone Book logo' />
        <div className='header__app-name'>Simple Phone Book</div>
      </header>
    );
  }
}