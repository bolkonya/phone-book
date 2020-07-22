import React, {Component} from 'react';

import ControlPanel from '../control-panel';
import RecordList from '../record-list';

import {IPhoneBookProps, IPhoneBookState} from '../../../common/types';

export default class PhoneBook extends Component<IPhoneBookProps, IPhoneBookState> {
  state: IPhoneBookState = {
    records: [
      {
        id: 0,
        name: 'Robo Bobo',
        phoneNumber: '+72322323232'
      },
      {
        id: 1,
        name: 'Bobo Robo',
        phoneNumber: '+72322321112'
      },
    ]
  }

  deleteRecord(id: number) {
    this.setState({
      records: this.state.records.filter(record => record.id !== id)
    })
  }

  render () {
    return (
      <main className='phone-book'>
        <ControlPanel />
        <RecordList deleteHandler={this.deleteRecord.bind(this)} records={this.state.records}/>
      </main>
    );
  }
}