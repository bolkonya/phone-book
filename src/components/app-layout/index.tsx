import React, { Component } from 'react';

import Header from '../header';
import PhoneBook from '../phone-book';

import './index.css';

export default class AppLayout extends Component {
    render() {
        return (
            <div className='app-layout'>
                <Header />
                <PhoneBook />
            </div>
        );
    }
}