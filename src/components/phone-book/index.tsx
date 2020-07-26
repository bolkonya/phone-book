import React, { Component, FormEvent, ReactNode } from 'react';

import PhoneBookApiWorker from '../../../common/fakeApi';

import AddRecordForm from '../add-record-form';
import RecordList from '../record-list';
import Input from '../input';

import { IPhoneBookProps, IPhoneBookState } from '../../../common/types';

import plusIconImage from '../../assets/svg/plus.svg';

import './index.styl';

const apiWorker = new PhoneBookApiWorker();

export default class PhoneBook extends Component<
  IPhoneBookProps,
  IPhoneBookState
> {
  state: IPhoneBookState = {
    addFormOpened: false,
    records: [],
    dataIsFetching: true,
    searchValue: '',
  };

  componentDidMount = (): void => {
    apiWorker
      .fetchGetRecordsRequest()
      .then((records) =>
        this.setState({
          records,
          dataIsFetching: false,
        })
      )
      .catch((error) => console.log(error));
  };

  addRecord = (name: string, phoneNumber: string): void => {
    this.setState({ dataIsFetching: true });

    apiWorker
      .fetchAddRecordRequest(name, phoneNumber)
      .then((records) =>
        this.setState({
          records,
          dataIsFetching: false,
        })
      )
      .catch((error) => console.log(error));
  };

  deleteRecord = (id: number): void => {
    this.setState({ dataIsFetching: true });

    apiWorker
      .fetchDeleteRequest(id)
      .then((records) =>
        this.setState({
          records,
          dataIsFetching: false,
        })
      )
      .catch((error) => console.log(error));
  };

  changeAddFormVisibility = (): void => {
    this.setState({
      searchValue: !this.state.addFormOpened ? '' : this.state.searchValue,
      addFormOpened: !this.state.addFormOpened,
    });
  };

  onSearchInputChange = (event: FormEvent<HTMLInputElement>): void => {
    const value = (event.target as HTMLInputElement).value;

    this.setState({
      searchValue: value,
    });
  };

  render(): ReactNode {
    return (
      <main className="phone-book">
        <div className="phone-book__control-panel">
          <div className="phone-book__buttons-bar">
            <button
              className={`button ${
                this.state.addFormOpened ? 'button_active' : ''
              }`}
              onClick={this.changeAddFormVisibility}
            >
              <img
                className="button__icon"
                src={plusIconImage}
                alt="Add new record"
              />
              Добавить
            </button>
          </div>
          <AddRecordForm
            changeVisibility={this.changeAddFormVisibility}
            addHandler={this.addRecord}
            records={this.state.records}
            isOpened={this.state.addFormOpened}
          />
          <Input
            classNames={['phone-book__search-input']}
            onChangeHandler={this.onSearchInputChange}
            value={this.state.searchValue}
            type={'text'}
            placeholder={'Поиск по имени или номеру'}
          />
        </div>
        {this.state.dataIsFetching ? (
          <div>Загрузка...</div>
        ) : (
          <RecordList
            deleteHandler={this.deleteRecord}
            records={this.state.records}
            searchString={this.state.searchValue}
          />
        )}
      </main>
    );
  }
}
