import React, {Component} from 'react';

import ControlPanel from '../control-panel';

// import './index.css';

export default class PhoneBook extends Component {
    render () {
        return (
            <main className='phone-book'>
                <ControlPanel />
                <div className='record-list'>
                    list
                </div>
            </main>
        );
    }
}