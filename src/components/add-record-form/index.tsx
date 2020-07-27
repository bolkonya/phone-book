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
const TIPS = {
  nameInputTip: `Имя не должно быть пустым, состоять из пробельных символов или быть длиннее ${MAX_NAME_LEN} символов`,
  phoneInputTip: `Номер телефона должен включать в себя от ${MIN_PHONE_LEN} до ${MAX_PHONE_LEN} цифр, может начинаться с +`,
  existRecordTip: `В книге уже есть запись с таким именем и/или телефоном`,
};

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
    const phone = this.state.phoneValue.trim();

    event.preventDefault();

    if (!name || !/\S+/.test(name)) {
      this.setState({
        validationError: true,
        tip: TIPS.nameInputTip,
      });
    } else if (!phone || !/^(\+)?\d{2,14}$/.test(phone)) {
      this.setState({
        validationError: true,
        tip: TIPS.phoneInputTip,
      });
    } else if (
      this.props.records.findIndex(
        ({ name: rName, phoneNumber: rPhone }) =>
          rName === name || rPhone === phone
      ) !== -1
    ) {
      this.setState({
        validationError: true,
        tip: TIPS.existRecordTip,
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
    const { isOpened, changeVisibility } = this.props;
    const { nameValue, phoneValue, tip, validationError } = this.state;

    return (
      <Fragment>
        <form
          className={`add-record-form ${
            isOpened ? 'add-record-form_opened' : ''
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
                value={nameValue}
                placeholder={'Введите имя'}
                required={true}
                tabIndex={isOpened ? 0 : -1}
              />
            </label>
          </div>
          <div className="add-record-form__field">
            <label>
              Телефон
              <Input
                classNames={['add-record-form__input']}
                onChangeHandler={this.onPhoneInputChange}
                value={phoneValue}
                type={'tel'}
                placeholder={'Введите номер'}
                required={true}
                tabIndex={isOpened ? 0 : -1}
              />
            </label>
          </div>
          <button
            className="add-record-form__button"
            type="submit"
            tabIndex={isOpened ? 0 : -1}
          >
            Добавить
          </button>
          {validationError && <div className="add-record-form__tip">{tip}</div>}
        </form>
        <div
          className={`hide-content-layer ${
            isOpened ? 'hide-content-layer_active' : ''
          }`}
          onClick={changeVisibility}
        ></div>
      </Fragment>
    );
  }
}
