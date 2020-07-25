import React, {Component, FormEvent} from 'react';

import {IAddRecordFormProps, IAddRecordFormState} from '../../../common/types';

import './index.styl';

const MAX_NAME_LEN = 60;
const MAX_PHONE_LEN = 14;
const MIN_PHONE_LEN = 2;

export default class Record extends Component<IAddRecordFormProps, IAddRecordFormState> {
  state = {
    nameValue: '',
    phoneValue: '',
    validationError: false,
    tip: ''
  }

  componentDidUpdate = ({isOpened: prevIsOpened}: IAddRecordFormProps) => {
    if (this.props.isOpened && !prevIsOpened) {
      this.hideTip();
      this.clearInputValues();
    }
  }

  onNameInputChange = (event: FormEvent<HTMLInputElement>) => {
    this.setState({
      nameValue: (event.target as HTMLInputElement).value
    });

    this.hideTip();
  }

  onPhoneInputChange = (event: FormEvent<HTMLInputElement>) => {
    this.setState({
      phoneValue: (event.target as HTMLInputElement).value
    });

    this.hideTip();
  }

  addRecord = (event: React.FormEvent<HTMLFormElement>) => {
    const name = this.state.nameValue.trim();
    const phone = this.state.phoneValue;

    event.preventDefault();
 
    if (!name || !/\S+/.test(name)) {
      this.setState({
        validationError: true,
        tip: `Имя не должно быть пустым, состоять из пробельных символов или быть длиннее ${MAX_NAME_LEN} символов`
      });
    } else if (!phone || !/^(\+)?\d{2,14}$/.test(phone)) {
      this.setState({
        validationError: true,
        tip: `Номер телефона должен включать в себя от ${MIN_PHONE_LEN} до ${MAX_PHONE_LEN} цифр, может начинаться с +`
      })
    } else if (this.props.records.findIndex(({name: rName, phoneNumber: rPhone}) => rName === name || rPhone === phone) !== -1) {
      this.setState({
        validationError: true,
        tip: `В книге уже есть запись с таким именем и/или телефоном`
      })
    } else {
      this.props.addHandler(name, phone);
      this.props.changeVisibility();
    }
  }

  hideTip = () => {
    if (this.state.validationError) {
      this.setState({
        validationError: false,
        tip: ''
      });
    }
  }

  clearInputValues = () => {
    this.setState({
      nameValue: '',
      phoneValue: ''
    })
  }

  render() {
    return (
      <form className={`add-record-form ${this.props.isOpened ? 'add-record-form_opened' : ''}`} onSubmit={this.addRecord}>
        <h1>Добавить новую запись</h1>
        <div className='add-record-form__field'>
          <label>
            Имя
            <input className='add-record-form__input' value={this.state.nameValue} onChange={this.onNameInputChange} type='text' placeholder='Введите имя' required />
          </label>
        </div>
        <div className='add-record-form__field'>
          <label>
            Телефон
            <input className='add-record-form__input' value={this.state.phoneValue} onChange={this.onPhoneInputChange} type='tel' placeholder='Введите номер' required />
          </label>
        </div>
        <button className='add-record-form__button' type='submit'>Добавить</button>
        {
          this.state.validationError &&
          <div className='add-record-form__tip'>
              {this.state.tip}
            </div>
        }
      </form>
    );
  }
}