import React, {Component, FormEvent} from 'react';

import AddRecordForm from '../add-record-form';

import {IControlPanelProps, IControlPanelState} from '../../../common/types';

import plusIconImage from '../../assets/svg/plus.svg';
import findIconImage from '../../assets/svg/find.svg';

import './index.styl';

export default class ControlPanel extends Component<IControlPanelProps, IControlPanelState> {
  state = {
    addFormOpened: false
  }

  changeAddFormVisibility = () => {
    this.setState({ addFormOpened: !this.state.addFormOpened });
  }

  render () {
    return (
      <div className='control-panel'>
        <div className='control-panel__buttons-bar'>
          <button className={`control-panel__button ${this.state.addFormOpened ? 'control-panel__button_active' : ''}`} onClick={this.changeAddFormVisibility}>
            <img className='button-icon' src={plusIconImage} alt='Add new record' />
            Добавить
          </button>
        </div>
        <AddRecordForm changeVisibility={this.changeAddFormVisibility} addHandler={this.props.addHandler} records={this.props.records} isOpened={this.state.addFormOpened} />
      </div>
    );
  }
}