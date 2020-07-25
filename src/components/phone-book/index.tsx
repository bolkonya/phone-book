import React, {Component} from 'react';

import PhoneBookApiWorker from '../../../common/fakeApi';

import ControlPanel from '../control-panel';
import RecordList from '../record-list';

import {IPhoneBookProps, IPhoneBookState, IPhoneBookRecord} from '../../../common/types';

const apiWorker = new PhoneBookApiWorker();

export default class PhoneBook extends Component<IPhoneBookProps, IPhoneBookState> {
  state: IPhoneBookState = {
    records: [],
    dataIsFetching: true
  }

  componentDidMount = () => {
    apiWorker.fetchGetRecordsRequest()
      .then(records => this.setState({
        records,
        dataIsFetching: false
      }))
      .catch(error => console.log(error));
  }

  addRecord = (name: string, phoneNumber: string) => {
    this.setState({ dataIsFetching: true });

    apiWorker.fetchAddRecordRequest(name, phoneNumber)
      .then(records => this.setState({
        records,
        dataIsFetching: false
      }))
      .catch(error => console.log(error));
  }

  deleteRecord = (id: number) => {
    this.setState({ dataIsFetching: true });

    apiWorker.fetchDeleteRequest(id)
      .then(records => this.setState({
        records,
        dataIsFetching: false
      }))
      .catch(error => console.log(error));
  }

  render () {
    return (
      <main className='phone-book'>
        <ControlPanel addHandler={this.addRecord} records={this.state.records}/>
        {
          this.state.dataIsFetching ? 
            <div>Загрузка...</div> :
            <RecordList deleteHandler={this.deleteRecord} records={this.state.records} />
        }
      </main>
    );
  }
}