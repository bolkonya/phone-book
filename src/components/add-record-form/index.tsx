import React, { Component, FormEvent, Fragment, ReactNode } from 'react';

import Input from '../input';

import {
  IAddRecordFormProps,
  IAddRecordFormState,
} from '../../../common/types';

import './index.styl';

const MAX_NAME_LEN = 60;
const MAX_PHONE_LEN = 14;
const MIN_PHONE_LEN = 2;

export default class Record extends Component<
  IAddRecordFormProps,
  IAddRecordFormState
> {
  state = {
    nameValue: '',
    phoneValue: '',
    validationError: false,
    tip: '',
  };

  componentDidUpdate = ({
    isOpened: prevIsOpened,
  }: IAddRecordFormProps): void => {
    if (this.props.isOpened && !prevIsOpened) {
      this.hideTip();
      this.clearInputValues();
    }
  };

  onNameInputChange = (event: FormEvent<HTMLInputElement>): void => {
    this.setState({
      nameValue: (event.target as HTMLInputElement).value,
    });

    this.hideTip();
  };

  onPhoneInputChange = (event: FormEvent<HTMLInputElement>): void => {
    this.setState({
      phoneValue: (event.target as HTMLInputElement).value,
    });

    this.hideTip();
  };

  addRecord = (event: React.FormEvent<HTMLFormElement>): void => {
    const name = this.state.nameValue.trim();
    const phone = this.state.phoneValue;

    event.preventDefault();

    if (!name || !/\S+/.test(name)) {
      this.setState({
        validationError: true,
        tip: `Имя не должно быть пустым, состоять из пробельных символов или быть длиннее ${MAX_NAME_LEN} символов`,
      });
    } else if (!phone || !/^(\+)?\d{2,14}$/.test(phone)) {
      this.setState({
        validationError: true,
        tip: `Номер телефона должен включать в себя от ${MIN_PHONE_LEN} до ${MAX_PHONE_LEN} цифр, может начинаться с +`,
      });
    } else if (
      this.props.records.findIndex(
        ({ name: rName, phoneNumber: rPhone }) =>
          rName === name || rPhone === phone
      ) !== -1
    ) {
      this.setState({
        validationError: true,
        tip: `В книге уже есть запись с таким именем и/или телефоном`,
      });
    } else {
      this.props.addHandler(name, phone);
      this.props.changeVisibility();
    }
  };

  hideTip = (): void => {
    if (this.state.validationError) {
      this.setState({
        validationError: false,
        tip: '',
      });
    }
  };

  clearInputValues = (): void => {
    this.setState({
      nameValue: '',
      phoneValue: '',
    });
  };

  render(): ReactNode {
    return (
      <Fragment>
        <form
          className={`add-record-form ${
            this.props.isOpened ? 'add-record-form_opened' : ''
          }`}
          onSubmit={this.addRecord}
        >
          <h1>Добавить новую запись</h1>
          <div className="add-record-form__field">
            <label>
              Имя
              <Input
                classNames={['add-record-form__input']}
                onChangeHandler={this.onNameInputChange}
                value={this.state.nameValue}
                type={'text'}
                placeholder={'Введите имя'}
                required={true}
              />
            </label>
          </div>
          <div className="add-record-form__field">
            <label>
              Телефон
              <Input
                classNames={['add-record-form__input']}
                onChangeHandler={this.onPhoneInputChange}
                value={this.state.phoneValue}
                type={'tel'}
                placeholder={'Введите номер'}
                required={true}
              />
            </label>
          </div>
          <button className="add-record-form__button" type="submit">
            Добавить
          </button>
          {this.state.validationError && (
            <div className="add-record-form__tip">{this.state.tip}</div>
          )}
        </form>
        <div
          className={`hide-content-layer ${
            this.props.isOpened ? 'hide-content-layer_active' : ''
          }`}
          onClick={this.props.changeVisibility}
        ></div>
      </Fragment>
    );
  }
}
