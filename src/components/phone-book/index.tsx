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
  state = {
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
    if (!this.state.addFormOpened) {
      this.clearSearchValue();
    }

    this.setState({
      addFormOpened: !this.state.addFormOpened,
    });
  };

  onSearchInputChange = (event: FormEvent<HTMLInputElement>): void => {
    this.setState({
      searchValue: (event.target as HTMLInputElement).value,
    });
  };

  clearSearchValue = (): void => {
    this.setState({
      searchValue: '',
    });
  };

  render(): ReactNode {
    const { addFormOpened, records, searchValue } = this.state;

    return (
      <main className="phone-book">
        <div className="phone-book__control-panel">
          <div className="phone-book__buttons-bar">
            <button
              className={`button ${addFormOpened ? 'button_active' : ''}`}
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
            records={records}
            isOpened={addFormOpened}
          />
          <Input
            classNames={['phone-book__search-input']}
            onChangeHandler={this.onSearchInputChange}
            value={searchValue}
            placeholder={'Поиск по имени или номеру'}
          />
        </div>
        {this.state.dataIsFetching ? (
          <div>Загрузка...</div>
        ) : (
          <RecordList
            deleteHandler={this.deleteRecord}
            records={records}
            searchString={searchValue}
            disableFocus={addFormOpened}
          />
        )}
      </main>
    );
  }
}
