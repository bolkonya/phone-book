import React, { Component, ReactNode } from 'react';

import Header from '../header';
import PhoneBook from '../phone-book';

import './index.styl';

export default class AppLayout extends Component {
  render(): ReactNode {
    return (
      <div className="app-layout">
        <Header />
        <PhoneBook />
      </div>
    );
  }
}
